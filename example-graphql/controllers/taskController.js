const Task = require("../models/Task.js");

const createTask = async (title) => {
  const finished = false;

  const newTask = new Task({
    title,
    finished,
  });

  await newTask.save();

  return newTask; 
};

const getAllTasks = async () => {
  return await Task.find(); 
};

const getTaskById = async (id) => {
  try {
    const task = await Task.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }
    return task; 
  } catch (error) {
    throw new Error("Error retrieving task");
  }
};

const deleteTask = async (id) => {
  const task = await Task.findById(id);

  if (!task) {
    throw new Error("Task not found");
  }

  await Task.deleteOne({ _id: id });
  return true; 
};

const editTask = async (id, title, finished) => {
  let task = await Task.findByIdAndUpdate(id, { title, finished }, { new: true });

  if (!task) {
    throw new Error("Task not found");
  }

  return task; 
};

module.exports = { getAllTasks, createTask, editTask, deleteTask, getTaskById };
