import UserModel from "./../models/user.js";
import { ERROR_CODES } from "../utils/constants/constants.js";
import { JWT_EXPIRY_TIME } from "../utils/constants/encryption.js";
import {
  encryptPassword,
  pwdAndEncryptedPwdSame,
} from "../utils/helpers/encyption.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

/**
 * @description Sign up a user
 * @route POST /api/auth/signup
 * @access public
 */
const signup = asyncHandler(async (req, res) => {
  // check if all the fields required for signup is available in the req body

  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    res.status(ERROR_CODES.VALIDATION_ERROR);
    throw new Error("All fields are mandatory!");
  }
  const emailTaken = await UserModel.findOne({
    email,
  });
  const usernameTaken = await UserModel.findOne({
    username,
  });

  if (emailTaken) {
    res.status(400);
    throw new Error("User already registered with the email!");
  }
  if (usernameTaken) {
    res.status(400);
    throw new Error("Username already taken!");
  }

  const hashedPassword = await encryptPassword(password.trim());

  const user = await UserModel.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

/**
 * @description Login a user
 * @route POST /api/auth/login
 * @access public
 */
const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const identifier = email || username;

  if (!identifier || !password) {
    res.status(ERROR_CODES.VALIDATION_ERROR);
    throw new Error("All fields are mandatory!");
  }
  const user = await UserModel.findOne({
    ...(email ? { email } : { username }),
  });

  if (user && (await pwdAndEncryptedPwdSame(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: JWT_EXPIRY_TIME }
    );
    res.status(201).json({
      message: "User logged in successfully",
      accessToken,
    });
  } else {
    res.status(400);
    throw new Error("User username, email or password is not correct");
  }
});

/**
 * @description Get current user
 * @route GET /api/auth/currentUser
 * @access public
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const identifier = email || username;

  if (!identifier || !password) {
    res.status(ERROR_CODES.VALIDATION_ERROR);
    throw new Error("All fields are mandatory!");
  }
  const user = await UserModel.findOne({
    ...(email ? { email } : { username }),
  });

  if (user && (await pwdAndEncryptedPwdSame(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: JWT_EXPIRY_TIME }
    );
    res.status(201).json({
      message: "User logged in successfully",
      accessToken,
    });
  } else {
    res.status(400);
    throw new Error("User username, email or password is not correct");
  }
});

export { signup, login, getCurrentUser };
