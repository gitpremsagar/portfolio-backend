import express from "express";
import {
  getAllProjects,
  createProject,
  getProjectById,
  deleteProjectById,
  updateProjectById,
} from "../controllers/project.controller.";

const router = express.Router();

router.post("/", createProject);

router.get("/", getAllProjects);

router.get("/:projectId", getProjectById);

router.put("/:projectId", updateProjectById); //TODO: protect this route

router.delete("/:projectId", deleteProjectById); //TODO: protect this route

export default router;
