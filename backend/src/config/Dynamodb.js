const AWS = require("aws-sdk");
const uuid = require("uuid");

// AWS.config.update({ region: "us-east-1" });

// AWS.config.getCredentials(function (err) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log("Region: ", AWS.config.region);
//     console.log("Access key:", AWS.config.credentials.accessKeyId);
//   }
// });

const createTasksTable = async () => {
  const dynamodb = new AWS.DynamoDB();
  const params = {
    TableName: "tasks",
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" }, // Partition key
    ],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  const res = await dynamodb.createTable(params).promise();
  console.log(res);
};

// createTasksTable();

const insertTask = async (task) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "tasks",
    Item: {
      id: task.id,
      title: task.title,
      completed: task.completed,
      userId: task.userId,
      dueDate: task.dueDate,
      description: task.description,
    },
  };
  console.log(params);
  const res = await dynamodb.put(params).promise();
  console.log(res);
};

// insertTask({
//   title: "Do the laundry",
//   completed: false,
//   id: uuid.v4().toString(),
//   userId: uuid.v4().toString(),
//   dueDate: "2021-12-31",
//   description: "Wash, dry, and fold the laundry",
// });

const getTasks = async () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "tasks",
  };
  const res = await dynamodb.scan(params).promise();
  console.log(res);
};

getTasks();

const updateTask = async (task) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "tasks",
    Key: {
      id: task.id,
    },
    UpdateExpression: "set title = :t, completed = :c",
    ExpressionAttributeValues: {
      ":t": task.title,
      ":c": task.completed,
    },
    ReturnValues: "UPDATED_NEW",
  };
  const res = await dynamodb.update(params).promise();
  console.log(res);
};

// updateTask({
//   title: "Do the laundry",
//   completed: true,
//   id: "99669f12-064b-4444-87ed-a095e8cbae4a",
// });

const deleteTask = async (id) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "tasks",
    Key: {
      id: id,
    },
  };
  const res = await dynamodb.delete(params).promise();
  console.log(res);
};

// deleteTask("99669f12-064b-4444-87ed-a095e8cbae4a");
