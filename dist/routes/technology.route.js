"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const technology_controller_1 = require("../controllers/technology.controller");
const router = express_1.default.Router();
router.post("/", technology_controller_1.createTechnology);
router.get("/", technology_controller_1.getAllTechnologies);
router.delete("/", technology_controller_1.deleteAllTechnologies);
router.put("/:technologyId", technology_controller_1.updateTechnology);
router.delete("/:technologyId", technology_controller_1.deleteTechnology); // TODO:protect route
exports.default = router;
