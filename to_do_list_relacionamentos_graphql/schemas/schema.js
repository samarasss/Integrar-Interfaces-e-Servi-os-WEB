const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Tipo para Pessoa
  type Person {
    id: ID!
    name: String!
    age: Int!
    profile: Profile
  }

  # Tipo para Perfil
  type Profile {
    id: ID!
    occupation: String!
    phone: String!
    address: String!
    person: Person
  }

  # Tipo para Projeto
  type Project {
    id: ID!
    name: String!
    description: String!
    startDate: String!
    endDate: String!
    tasks: [Task]
  }

  # Tipo para Tarefa
  type Task {
    id: ID!
    title: String!
    finished: Boolean!
    person: Person
    projects: [Project]
  }

  # Queries
  type Query {

    people: [Person]    
    person(id: ID!): Person

    profiles: [Profile]

    projects: [Project]

    tasks: [Task]
    getTasksByTitle(title: String): [Task]
  }

  # Mutations
  type Mutation {

    createPerson(name: String!, age: Int!): Person
    updatePerson(id: ID!, name: String, age: Int): Person
    deletePerson(id: ID!): Boolean

    createProfile(
      occupation: String!
      phone: String!
      address: String!
      personId: ID!
    ): Profile
    updateProfile(
      id: ID!
      occupation: String
      phone: String
      address: String
      personId: ID
    ): Profile
    deleteProfile(id: ID!): Boolean

    createProject(
      name: String!
      description: String!
      startDate: String!
      endDate: String!
      tasksIds: [ID]!
    ): Project
    updateProject(
      id: ID!
      name: String
      description: String
      startDate: String
      endDate: String
      tasks: [ID]
    ): Project
    deleteProject(id: ID!): Boolean

    createTask(title: String!, personId: ID!): Task
    updateTask(id: ID!, title: String, finished: Boolean): Task
    deleteTask(id: ID!): Boolean
  }
`;

module.exports = { typeDefs };
