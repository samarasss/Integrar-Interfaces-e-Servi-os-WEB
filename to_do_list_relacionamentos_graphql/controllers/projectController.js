const Project = require("../models/project.js");
const Task = require("../models/task.js");

const createProject = async (
  name,
  description,
  startDate,
  endDate,
  tasksIds
) => {
  try {
    if (
      !name ||
      !description ||
      !startDate ||
      !endDate ||
      !tasksIds ||
      tasksIds.length === 0
    ) {
      throw new Error(
        "All fields (name, description, startDate, endDate, tasksIds) are required"
      );
    }

    const tasks = await Task.find({ _id: { $in: tasksIds } });
    if (tasks.length !== tasksIds.length) {
      throw new Error("One or more task IDs are invalid");
    }

    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      tasks: tasksIds,
    });

    await newProject.save();

    await Task.updateMany(
      { _id: { $in: tasksIds } },
      { $push: { projects: newProject._id } }
    );

    return newProject;
  } catch (error) {
    return error.message;
  }
};

const getAllProjects = async () => {
  try {
    const projects = await Project.find().populate("tasks");

    if (!projects || projects.length === 0) {
      throw new Error("No projects found");
    }

    return projects;
  } catch (error) {
    return error.message;
  }
};

const deleteProject = async (id) => {
  try {
    if (!id) {
      throw new Error("Project ID is required");
    }
    const project = await Project.findById(id);

    if (!project) {
      throw new Error("Project not found");
    }
    await Project.deleteOne({ _id: id });
    return true;
  } catch (error) {
    return error.message;
  }
};

const editProject = async (
  id,
  name,
  description,
  startDate,
  endDate,
  tasks
) => {
  try {
    if (!id || !name || !description || !startDate || !endDate || !tasks) {
      throw new Error(
        "All fields (id, name, description, startDate, endDate, tasks) are required"
      );
    }

    let project = await Project.findByIdAndUpdate(
      id,
      { name, description, startDate, endDate, tasks },
      { new: true }
    );

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    return error.message;
  }
};

module.exports = { createProject, getAllProjects, deleteProject, editProject };
