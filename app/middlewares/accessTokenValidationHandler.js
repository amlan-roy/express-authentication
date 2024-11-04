import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

/**
 * Middleware that validates if a valid jwt token is available or not.
 * If yes, then decode the jwt token, extract and send the user information from it
 */
const validateJwtToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error(
        "User is not authorized or token is missing in the request!"
      );
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error(err.message || "User is not authorized");
      }
      res.user = decoded.user;
      next();
    });
  }
});

export { validateJwtToken };
