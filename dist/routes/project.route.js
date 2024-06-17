"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("../controllers/project.controller.");
const router = express_1.default.Router();
router.post("/", project_controller_1.createProject);
router.get("/", project_controller_1.getAllProjects);
router.get("/:projectId", project_controller_1.getProjectById);
router.put("/:projectId", project_controller_1.updateProjectById); //TODO: protect this route
router.delete("/:projectId", project_controller_1.deleteProjectById); //TODO: protect this route
exports.default = router;
