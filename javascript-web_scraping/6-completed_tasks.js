#!/usr/bin/node

const request = require('request');

const url = process.argv[2];

request(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }

  if (response.statusCode !== 200) {
    console.error('Failed to retrieve data. Status code:', response.statusCode);
    return;
  }

  try {
    const todos = JSON.parse(body);
    const completedTasks = {};
    todos.forEach((todo) => {
      if (todo.completed) {
        if (completedTasks[todo.userId]) {
          completedTasks[todo.userId]++;
        } else {
          completedTasks[todo.userId] = 1;
        }
      }
    });
    for (const userId in completedTasks) {
      console.log(`${userId}: ${completedTasks[userId]}`);
    }
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError.message);
  }
});
