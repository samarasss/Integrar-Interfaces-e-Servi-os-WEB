const Profile = require("../models/profile.js");
const Person = require("../models/person.js");

const createProfile = async (occupation, phone, address, personId) => {
  try {
    if (!occupation || !phone || !address || !personId) {
      throw new Error(
        "All fields (occupation, phone, address, personId) are required"
      );
    }

    const newProfile = new Profile({
      occupation,
      phone,
      address,
      person: personId,
    });

    await newProfile.save();

    // Atualiza o perfil da pessoa associada
    await Person.updateOne(
      { _id: personId },
      { $set: { profile: newProfile._id } }
    );

    return newProfile;
  } catch (error) {
    return error.message;
  }
};

const getAllProfiles = async () => {
  try {
    const profiles = await Profile.find().populate("person");

    if (!profiles || profiles.length === 0) {
      throw new Error("No profiles found");
    }

    return profiles;
  } catch (error) {
    return error.message;
  }
};

const deleteProfile = async (id) => {
  try {
    if (!id) {
      throw new Error("Profile ID is required");
    }

    const profile = await Profile.findById(id);

    if (!profile) {
      throw new Error("Profile not found");
    }

    await Profile.deleteOne({ _id: id });
    return true;
  } catch (error) {
    return error.message;
  }
};

const editProfile = async (id, occupation, phone, address, personId) => {
  try {
    if (!id || !occupation || !phone || !address || !personId) {
      throw new Error("All fields (id, occupation, phone, address, personId) are required");
    }

    // Atualiza o perfil com as novas informações
    let profile = await Profile.findByIdAndUpdate(
      id,
      {
        occupation,
        phone,
        address,
        personId,
      },
      { new: true }
    );

    // Se o perfil não for encontrado após o update, lança um erro
    if (!profile) {
      throw new Error("Profile not found");
    }

    return profile;
  } catch (error) {
    return error.message;
  }
};

module.exports = { createProfile, getAllProfiles, deleteProfile, editProfile };
