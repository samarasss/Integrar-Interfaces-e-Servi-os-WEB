const Person = require("../models/person.js");

const createPerson = async (name, age) => {
  try {
    if (!name || !age) {
      throw new Error("Name and age are required");
    }

    const newPerson = new Person({
      name,
      age,
    });

    await newPerson.save();

    return newPerson;
  } catch (error) {
    return error.message;
  }
};

const getAllPerson = async () => {
  try {
    const people = await Person.find().populate("profile");
    if (!people || people.length === 0) {
      throw new Error("No people found");
    }
    return people;
  } catch (error) {
    return error.message;
  }
};

const deletePerson = async (id) => {
  try {
    if (!id) {
      throw new Error("Person ID is required");
    }

    const person = await Person.findById(id);

    if (!person) {
      throw new Error("Person not found");
    }

    await Person.deleteOne({ _id: id });
    return true;
  } catch (error) {
    return error.message;
  }
};

const editPerson = async (id, name, age) => {
  try {
    if (!id || !name || !age) {
      throw new Error("ID, name, and age are required");
    }

    let person = await Person.findByIdAndUpdate(
      id,
      { name, age },
      { new: true }
    );

    if (!person) {
      throw new Error("Person not found");
    }

    return person;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getAllPerson, createPerson, editPerson, deletePerson };
