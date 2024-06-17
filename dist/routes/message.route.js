"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message.controller");
const router = express_1.default.Router();
router.get("/", message_controller_1.getMessages);
router.post("/", message_controller_1.insertMessage);
router.delete("/:messageId", message_controller_1.deleteMessage);
exports.default = router;
