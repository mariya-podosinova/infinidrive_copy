const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

const getItems = (params) => {
  return client.scan(params).promise();
};

exports.handler = async (event, context) => {
  console.log("Event", JSON.stringify(event, null, 2));
  console.log("Context", JSON.stringify(context, null, 2));

  const params = {
    TableName: process.env.DDB_TABLE,
  };

  const data = await getItems(params);

  return { statusCode: 200, body: JSON.stringify(data.Items) };
};
