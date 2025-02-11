const taskModel = require("../model/task.js");

const getAllTasks = (req, res) => {
  const tasks = taskModel.getTasks();
  res.json(tasks);
};  

const createTask = (req, res) => {
  const { title } = req.body;
  taskModel.addTask(title);
  res.json({ message: 'Task created successfully!' });
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  taskModel.deleteTask(id);
  res.json({ message: 'Task removed successfully!' });
};

const editTask = (req, res) => {
  const { id } = req.params;
  const { title, finished } = req.body;

  const success = taskModel.editTask(Number(id), title, finished);
  if (success) {
    res.json({ message: 'Task updated successfully!' });
  } else {
    res.status(404).json({ message: 'Task not found!' });
  }
};


module.exports = { getAllTasks, createTask, deleteTask, editTask };
