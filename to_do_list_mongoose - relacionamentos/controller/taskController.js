const Task = require("../model/task.js");
const Person = require("../model/person.js");

const createTask = async (req, res) => {
  const { title, personId } = req.body;
  const finished = false;

  const newTask = new Task({
    title,
    person: personId,
    finished,
  });

  await newTask.save();

  res.json({
    message: "Tarefa criada com sucesso!",
    task: newTask,
  });
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.find().populate("person");
  res.json(tasks);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  await Task.deleteOne({ _id: id });
  res.json({ message: "Task removed successfully!" });
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { title, finished } = req.body;

  let task = await Task.findByIdAndUpdate(id, { title, finished });
  res.status(200).json({
    message: "Tarefa atualizada com sucesso!",
    task,
  });
};

module.exports = { getAllTasks, createTask, editTask, deleteTask };
