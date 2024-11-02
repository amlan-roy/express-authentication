/**
 * @description Sign up a user
 * @route POST /api/auth/signup
 * @access public
 */
const signup = (req, res) => {
  res.status(200).json({
    message: "Signup route",
  });
};

/**
 * @description Login a user
 * @route POST /api/auth/login
 * @access public
 */
const login = (req, res) => {
  res.status(200).json({
    message: "Login route",
  });
};

/**
 * @description Get current user
 * @route GET /api/auth/currentUser
 * @access public
 */
const getCurrentUser = (req, res) => {
  res.status(200).json({
    message: "Current user",
  });
};

export { signup, login, getCurrentUser };
