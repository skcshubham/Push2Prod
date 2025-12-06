const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req;

  if (!firstName) {
    throw new Error("First name is not valid");
  } else if (!lastName) {
    throw new Error("Last name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is weak.");
  }
};

const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  const data = req.body;

  const isEditAllowed = Object.keys(data).every((field) => allowedEditFields.includes(field));

  if (!isEditAllowed) {
    throw new Error("One or more fields are not editable.");
  }

  const { firstName, lastName, emailId, age, gender, photoUrl, about, skills } = data;

  if (firstName && typeof firstName !== "string") {
    throw new Error("First name must be a string.");
  } else if (lastName && typeof lastName !== "string") {
    throw new Error("Last name must be a string.");
  } else if (emailId && !validator.isEmail(emailId)) {
    throw new Error("Email is not valid.");
  } else if (age && (!Number.isInteger(age) || age < 0 || age > 120)) {
    throw new Error("Age must be a valid number between 0 and 120.");
  } else if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
    throw new Error("Gender must be male, female, or other.");
  } else if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error("Photo URL is not valid.");
  } else if (about && typeof about !== "string") {
    throw new Error("About must be a string.");
  } else if (skills && !Array.isArray(skills)) {
    throw new Error("Skills must be an array.");
  }

  return true;
};

module.exports = {
  validateSignUpData,
  validateProfileEditData,
};
