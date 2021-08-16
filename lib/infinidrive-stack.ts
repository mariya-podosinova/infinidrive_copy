import * as path from "path";
import * as _ from "lodash";
import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";
import * as apigw from "@aws-cdk/aws-apigatewayv2";
import * as apigwIntegrations from "@aws-cdk/aws-apigatewayv2-integrations";
import * as nodejsLambda from "@aws-cdk/aws-lambda-nodejs";
import * as lambda from "@aws-cdk/aws-lambda";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as route53 from "@aws-cdk/aws-route53";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as ddb from "@aws-cdk/aws-dynamodb";
import * as ddbInit from "./ddb-initialization";

export class PermissionsBoundary implements cdk.IAspect {
  private readonly permissionsBoundaryArn: string;

  constructor(permissionBoundaryArn: string) {
    this.permissionsBoundaryArn = permissionBoundaryArn;
  }

  public visit(node: cdk.IConstruct): void {
    if (
      cdk.CfnResource.isCfnResource(node) &&
      node.cfnResourceType === "AWS::IAM::Role"
    ) {
      node.addPropertyOverride(
        "PermissionsBoundary",
        this.permissionsBoundaryArn
      );
    }
  }
}

export class InfinidriveStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domainName = "infinityworks.academy";

    new cdk.CfnOutput(this, "SiteUrl", {
      value: "https://infinidrive." + domainName,
    });

    const bucket = new s3.Bucket(this, "InfinidriveBucket", {
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const zone = route53.HostedZone.fromLookup(this, "Zone", { domainName });

    const certificate = acm.Certificate.fromCertificateArn(
      this,
      "SiteCertificate",
      `arn:aws:acm:us-east-1:${this.account}:certificate/bf59109c-3ecb-4eac-a2a8-b5befef26dc9`
    );

    // Defines API
    const api = new apigw.HttpApi(this, "InfinidriveApi", {
      corsPreflight: {
        allowMethods: [
          apigw.CorsHttpMethod.GET,
          apigw.CorsHttpMethod.PUT,
          apigw.CorsHttpMethod.OPTIONS,
          apigw.CorsHttpMethod.POST,
        ],
        allowOrigins: ["https://infinidrive." + domainName], // The frontend URL
      },
    });

    new cdk.CfnOutput(this, "Api Url", {
      value: api.url ?? "No API Endpoint URL",
    });

    const urlRewriteFunction = new cloudfront.Function(
      this,
      "UrlRewriteFunction",
      {
        functionName: "UrlRewriteFunction",
        comment:
          "Rewrites request from /api/* to API gateway endpoint, otherwise to /index.html",
        code: cloudfront.FunctionCode.fromFile({
          filePath: path.join(__dirname, "../", "functions", "urlRewrite.js"),
        }),
      }
    );

    const apiCachePolicy = new cloudfront.CachePolicy(this, "ApiCachePolicy", {
      defaultTtl: cdk.Duration.minutes(10),
    });

    // CloudFront Functions: ViewerRequest, ViewerResponse
    // Lambda@Edge: OriginRequest, OriginResponse

    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            function: urlRewriteFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      additionalBehaviors: {
        "/api/*": {
          origin: new origins.HttpOrigin(
            api.url?.split("//")[1].replace("/", "") ?? ""
          ),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachePolicy: apiCachePolicy,
        },
      },
      defaultRootObject: "index.html",
      domainNames: ["infinidrive." + domainName],
      certificate: certificate,
    });

    new s3Deployment.BucketDeployment(this, "InfinidriveBucketDeployment", {
      destinationBucket: bucket,
      sources: [s3Deployment.Source.asset("./frontend/build")],

      // Permission denied for creating invalidations
      distribution,
      distributionPaths: ["/*"],
    });

    //Create Table for Vehicles
    const vehiclesTableName = "InfinidriveVehicles";

    const vehiclesTable = new ddb.Table(this, "VehiclesTable", {
      tableName: vehiclesTableName,
      partitionKey: { name: "id", type: ddb.AttributeType.STRING },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const vehiclesTableInit = new ddbInit.DdbInitializationConstruct(
      this,
      "VehiclesTableInit",
      {
        tableName: vehiclesTableName,
        tableArn: vehiclesTable.tableArn,
        path: path.join(__dirname, "../", "vehicles.json"),
      }
    );

    vehiclesTableInit.node.addDependency(vehiclesTable);

    //Create Table for Questions

    const questionsTableName = "InfinidriveQuestions";

    const questionsTable = new ddb.Table(this, "QuestionsTable", {
      tableName: questionsTableName,
      partitionKey: { name: "id", type: ddb.AttributeType.STRING },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const functionProps: nodejsLambda.NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment: {
        DDB_REGION: this.region,
      },
      runtime: lambda.Runtime.NODEJS_14_X,
    };

    const questionsTableInit = new ddbInit.DdbInitializationConstruct(
      this,
      "QuestionsTableInit",
      {
        tableName: questionsTableName,
        tableArn: questionsTable.tableArn,
        path: path.join(__dirname, "../", "questions.json"),
      }
    );

    questionsTableInit.node.addDependency(questionsTable);

    //Node Lambda Functions
    const getVehiclesFunction = new nodejsLambda.NodejsFunction(
      this,
      "GetVehicles",
      {
        entry: path.join(__dirname, "../", "functions", "getItems.js"),
        ..._.merge(
          { ...functionProps },
          {
            environment: { DDB_TABLE: vehiclesTableName },
          }
        ),
      }
    );

    const getQuestionsFunction = new nodejsLambda.NodejsFunction(
      this,
      "GetQuestions",
      {
        entry: path.join(__dirname, "../", "functions", "getItems.js"),
        ..._.merge(
          { ...functionProps },
          {
            environment: { DDB_TABLE: questionsTableName },
          }
        ),
      }
    );

    questionsTable.grantReadData(getQuestionsFunction);
    vehiclesTable.grantReadData(getVehiclesFunction);

    api.addRoutes({
      path: "/api/questions",
      methods: [apigw.HttpMethod.GET],
      integration: new apigwIntegrations.LambdaProxyIntegration({
        handler: getQuestionsFunction,
      }),
    });

    api.addRoutes({
      path: "/api/vehicles",
      methods: [apigw.HttpMethod.GET],
      integration: new apigwIntegrations.LambdaProxyIntegration({
        handler: getVehiclesFunction,
      }),
    });

    // Create the Cname record pointing to the cloudfront domain
    new route53.CnameRecord(this, "SiteCnameRecord", {
      zone,
      recordName: "infinidrive",
      domainName: distribution.domainName,
    });

    // Issue: https://github.com/aws/aws-cdk/issues/3242#issuecomment-561064190
    // Merged PR: https://github.com/aws/aws-cdk/commit/f36feb52a750a326842903ac4dc23be83e4aee1a
    cdk.Aspects.of(this).add(
      new PermissionsBoundary(
        `arn:aws:iam::${process.env.AWS_ACCOUNT}:policy/ScopePermissions`
      )
    );
  }
}
