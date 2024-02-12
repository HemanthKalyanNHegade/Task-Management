const AWS = require("aws-sdk");
const uuid = require("uuid");
AWS.config.update({ region: "us-east-1" });

const insertTask = async (req, res) => {
  try {
    const { title, description, completed, dueDate } = req.body;
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: "tasks",
      Item: {
        id: uuid.v4().toString(),
        title: title,
        completed: completed,
        userId: req.user._id,
        dueDate: dueDate,
        description: description,
      },
    };
    await dynamodb.put(params).promise();
    res.json({
      message: "Task added successfully!",
      statusCode: 201,
      task: params.Item,
    });
  } catch (error) {
    console.error("Insert Task: ", error);
    res.json({ message: "Failed to add new task!", statusCode: 400 });
  }
};

const getTasks = async (req, res) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: "tasks",
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": req.user._id,
      },
    };
    const response = await dynamodb.scan(params).promise();
    res.json({ tasks: response.Items, statusCode: 200 });
  } catch (error) {
    console.error("Get Tasks: ", error);
    res.json({ message: "Failed to retrieve tasks!", statusCode: 400 });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id, title, completed, description, dueDate } = req.body;
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: "tasks",
      Key: {
        id: id,
      },
      UpdateExpression:
        "set title = :t, completed = :c, description = :d, dueDate = :dd",
      ExpressionAttributeValues: {
        ":t": title,
        ":c": completed,
        ":d": description,
        ":dd": dueDate,
      },
    };
    await dynamodb.update(params).promise();
    res.json({
      message: "Task updated successfully!",
      statusCode: 200,
      task: { id, title, completed, description, dueDate },
    });
  } catch (error) {
    console.error("Update Task: ", error);
    res.json({ message: "Failed to update task!", statusCode: 400 });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: "tasks",
      Key: {
        id: id,
      },
    };
    await dynamodb.delete(params).promise();
    res.json({ message: "Task deleted successfully!", statusCode: 200 });
  } catch (error) {
    console.error("Delete Task: ", error);
    res.json({ message: "Failed to delete task!", statusCode: 400 });
  }
};

module.exports = {
  insertTask,
  getTasks,
  updateTask,
  deleteTask,
};
