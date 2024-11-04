import { Router } from "express";
import { signup, login, getCurrentUser } from "../controllers/auth.js";
import { validateJwtToken } from "./../middlewares/accessTokenValidationHandler.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/currentUser").get(validateJwtToken, getCurrentUser);

export default router;
