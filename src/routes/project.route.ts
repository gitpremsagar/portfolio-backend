import express from "express"
import { getAllProjects,createProject,getProjectById } from "../controllers/project.controller."

const router = express.Router();

router.post("/", createProject);

router.get("/", getAllProjects);

router.get("/:id", getProjectById);

export default router;