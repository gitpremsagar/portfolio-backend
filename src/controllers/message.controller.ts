import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Message } from "@prisma/client";

const prisma = new PrismaClient();
const getMessages = (req: Request, res: Response) => {
  try {
    const messages = prisma.message.findMany();
    res.json(messages);
  } catch (error) {
    console.log("error in getting messages = ", error);
    res.status(500).json({ message: error });
  }
};

const insertMessage = async (req: Request, res: Response) => {
  // console.log("message recieved = ", req.body);
  try {
    const message: Message = req.body;
    const newMessage = await prisma.message.create({
      data: {
        message: message.message,
        senderEmail: message.senderEmail,
        senderName: message.senderName,
        senderContactNumber: message.senderContactNumber,
      },
    });
    // console.log("new message = ", newMessage);
    res.json(newMessage);
  } catch (error) {
    console.log("error in inserting message = ", error);
    res.status(500).json({ message: error });
  }
};

const deleteMessage = (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const message = prisma.message.delete({
      where: {
        messageId: messageId,
      },
    });
    res.json(message);
  } catch (error) {
    console.log("error in deleting message = ", error);
    res.status(500).json({ message: error });
  }
};

export { getMessages, insertMessage, deleteMessage };
