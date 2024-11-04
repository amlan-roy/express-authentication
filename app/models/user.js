import { Schema, model } from "mongoose";
import {
  validateName,
  validateEmail,
  validateUsername,
} from "../utils/helpers/validators.js";

const userSchema = Schema({
  username: {
    type: String,
    required: [true, "Please add the username"],
    unique: [true, "Username already taken"],
    minLength: [4, "Please enter a username with atleast 4 characters"],
    maxLength: [18, "Please enter a username with at max 18 characters"],
    validate: {
      validator: validateUsername,
      message: (props) =>
        `${props.value} is not a valid username. Only Alphanumeric usernames and '-' is allowed in the username. Also the username should begin and end with a character`,
    },
  },
  name: {
    type: String,
    required: [true, "Please add the name"],
    minLength: [4, "Please enter a name with atleast 4 characters"],
    maxLength: [32, "Please enter a name with at max 32 characters"],
    validate: {
      validator: validateName,
      message: (props) =>
        `${props.value} is not a valid name. Only Alphabets and spaces is allowed in the username. Also the name should begin and end with a character`,
    },
  },
  email: {
    type: String,
    required: [true, "Please add the email"],
    unique: [true, "Account with email already exists"],
    minLength: [4, "Please enter an email with atleast 5 characters"],
    validate: {
      validator: validateEmail,
      message: (props) => `${props.value} is not a valid email.`,
    },
  },
  password: {
    // Password will be hashed
    type: String,
    required: [true, "Please add the password"],
  },
});

export default model("User", userSchema);
