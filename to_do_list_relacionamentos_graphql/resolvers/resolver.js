const personController = require('../controllers/personController');
const profileController = require('../controllers/profileController');
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');

const resolvers = {
  Query: {
    // Consultar todas as pessoas
    people: async () => await personController.getAllPerson(),

    // Consultar todos os perfis
    profiles: async () => await profileController.getAllProfiles(),

    // Consultar todos os projetos
    projects: async () => await projectController.getAllProjects(),

    // Consultar todas as tarefas
    tasks: async () => await taskController.getAllTasks(),

    getTasksByTitle: async (_, { title }) => await taskController.getTasksByTitle(title),
  },

  Mutation: {
    // Criar uma nova pessoa
    createPerson: async (_, { name, age }) => {
      return await personController.createPerson(name, age); 
    },
    // Editar uma pessoa existente
    updatePerson: async (_, { id, name, age }) => {
      return await personController.editPerson(id, name, age); 
    },
    // Deletar uma pessoa
    deletePerson: async (_, { id }) => {
      return await personController.deletePerson(id); 
    },

    // Criar um novo perfil
    createProfile: async (_, { occupation, phone, address, personId }) => {
      return await profileController.createProfile(occupation, phone, address, personId); 
    },
    // Editar um perfil existente
    updateProfile: async (_, { id, occupation, phone, address, personId }) => {
      return await profileController.editProfile(id, occupation, phone, address, personId); 
    },
    // Deletar um perfil
    deleteProfile: async (_, { id }) => {
      return await profileController.deleteProfile(id); 
    },

    // Criar um novo projeto
    createProject: async (_, { name, description, startDate, endDate, tasksIds }) => {
      return await projectController.createProject(name, description, startDate, endDate, tasksIds); 
    },
    // Editar um projeto existente
    updateProject: async (_, { id, name, description, startDate, endDate, tasks }) => {
      return await projectController.editProject(id, name, description, startDate, endDate, tasks); 
    },
    // Deletar um projeto
    deleteProject: async (_, { id }) => {
      return await projectController.deleteProject(id); 
    },

    // Criar uma nova tarefa
    createTask: async (_, { title }) => {
      return await taskController.createTask(title); 
    },
    // Editar uma tarefa existente
    updateTask: async (_, { id, title, finished }) => {
      return await taskController.editTask(id, title, finished); 
    },
    // Deletar uma tarefa
    deleteTask: async (_, { id }) => {
      return await taskController.deleteTask(id); 
    },
  },
};

module.exports = resolvers;