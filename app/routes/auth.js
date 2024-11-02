import { Router } from "express";
import { signup, login, getCurrentUser } from "../controllers/auth";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/currentUser").get(getCurrentUser);

export default router;
