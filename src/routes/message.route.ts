import express from "express";
import {
  getMessages,
  insertMessage,
  deleteMessage,
} from "../controllers/message.controller";

const router = express.Router();

router.get("/", getMessages);

router.post("/", insertMessage);

router.delete("/:messageId", deleteMessage);

export default router;
