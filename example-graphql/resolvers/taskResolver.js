const taskController = require('../controllers/taskController');

const resolvers = {
  Query: {
    tasks: async () => await taskController.getAllTasks(),
    task: async (_, { id }) => await taskController.getTaskById(id),
  },
  Mutation: {
    createTask: async (_, { title }) => {
      return await taskController.createTask(title); 
    },
    updateTask: async (_, { id, title, finished }) => {
      return await taskController.editTask(id, title, finished); 
    },
    deleteTask: async (_, { id }) => {
      return await taskController.deleteTask(id); 
    },
  },
};

module.exports = resolvers;