import express from "express";
const router = express.Router();
import { getAllUsers,getUserById,createUser,updateUserbyId,loginUser,getDecodedToken } from "../controllers/user.controller";
import {validateSignUpForm,verifyToken,isUserAdmin,isUserAdminOrOwner} from "../middlewares/user.middleware";

router.get("/", verifyToken, isUserAdmin, getAllUsers);

router.post("/", validateSignUpForm, createUser);

router.post("/login", loginUser);

router.put("/:userId", verifyToken, isUserAdminOrOwner, updateUserbyId);

router.get("/:userId", verifyToken, isUserAdminOrOwner, getUserById);

router.post("/decode-token",verifyToken, getDecodedToken );

export default router;