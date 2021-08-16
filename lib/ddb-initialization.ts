import * as fs from "fs";
import * as cdk from "@aws-cdk/core";
import * as cr from "@aws-cdk/custom-resources";
import * as iam from "@aws-cdk/aws-iam";
import * as logs from "@aws-cdk/aws-logs";
import * as util from "@aws-sdk/util-dynamodb";

export interface DdbInitializationConstructProps {
  tableName: string;
  tableArn: string;
  path: string;
}

export class DdbInitializationConstruct extends cdk.Construct {
  constructor(
    scope: cdk.Construct,
    id: string,
    props: DdbInitializationConstructProps
  ) {
    super(scope, id);

    fs.readFile(props.path, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      const parsed = JSON.parse(data);
      for (let i = 0; i < parsed.length; i += 5) {
        this.insertRecords(
          props.tableName,
          props.tableArn,
          i,
          parsed.slice(i, i + 5)
        );
      }
    });
  }

  // TODO Interface for the items type so that it must contain the id key
  private insertRecords = (
    tableName: string,
    tableArn: string,
    offset: number,
    items: any[],
  ) => {
    let records: any[] = [];
    items.forEach((item) => {
      console.log(item);
      records.push({
        PutRequest: {
          Item: util.marshall(item),
        },
      });
    });

    const batch = { RequestItems: { [tableName]: records } };

    const awsSdkCall: cr.AwsSdkCall = {
      service: "DynamoDB",
      action: "batchWriteItem",
      physicalResourceId: cr.PhysicalResourceId.of(tableName + "Insert"),
      parameters: batch,
    };

    new cr.AwsCustomResource(
      this,
      tableName + "CustomResource" + offset.toString(),
      {
        onCreate: awsSdkCall,
        onUpdate: awsSdkCall,
        logRetention: logs.RetentionDays.ONE_WEEK,
        policy: cr.AwsCustomResourcePolicy.fromStatements([
          new iam.PolicyStatement({
            sid: "DynamoWriteAccess",
            effect: iam.Effect.ALLOW,
            actions: ["dynamodb:BatchWriteItem"],
            resources: [tableArn],
          }),
        ]),
        timeout: cdk.Duration.minutes(5),
      }
    );
  };
}
