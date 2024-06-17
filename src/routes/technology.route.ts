import express from "express";
import {
  getAllTechnologies,
  createTechnology,
  deleteAllTechnologies,
  updateTechnology,
  deleteTechnology,
} from "../controllers/technology.controller";
import { verifyToken } from "../middlewares/user.middleware";

const router = express.Router();

router.post("/", createTechnology);

router.get("/", getAllTechnologies);

router.delete("/", deleteAllTechnologies);

router.put("/:technologyId", updateTechnology);

router.delete("/:technologyId", deleteTechnology); // TODO:protect route

export default router;
