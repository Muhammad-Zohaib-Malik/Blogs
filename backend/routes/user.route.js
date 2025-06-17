import express from "express";
import { signup, signin } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/users/signup", signup);
router.post("/users/signin", signin);
// router.post('/users/logout', logout);

export default router;
