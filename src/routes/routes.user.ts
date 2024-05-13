import express from "express";
const router = express.Router();
import { getAllUsers,createUser,updateUserbyId } from "../controllers/user.controller";
import {validateSignUpForm} from "../middlewares/user.middleware";

router.get("/", getAllUsers);

router.post("/", validateSignUpForm, createUser);

router.put("/:userId",updateUserbyId);

export default router;