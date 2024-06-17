"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.insertMessage = exports.getMessages = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getMessages = (req, res) => {
    try {
        const messages = prisma.message.findMany();
        res.json(messages);
    }
    catch (error) {
        console.log("error in getting messages = ", error);
        res.status(500).json({ message: error });
    }
};
exports.getMessages = getMessages;
const insertMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("message recieved = ", req.body);
    try {
        const message = req.body;
        const newMessage = yield prisma.message.create({
            data: {
                message: message.message,
                senderEmail: message.senderEmail,
                senderName: message.senderName,
                senderContactNumber: message.senderContactNumber,
            },
        });
        // console.log("new message = ", newMessage);
        res.json(newMessage);
    }
    catch (error) {
        console.log("error in inserting message = ", error);
        res.status(500).json({ message: error });
    }
});
exports.insertMessage = insertMessage;
const deleteMessage = (req, res) => {
    try {
        const { messageId } = req.params;
        const message = prisma.message.delete({
            where: {
                messageId: messageId,
            },
        });
        res.json(message);
    }
    catch (error) {
        console.log("error in deleting message = ", error);
        res.status(500).json({ message: error });
    }
};
exports.deleteMessage = deleteMessage;
