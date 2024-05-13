import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
    const allUsers = await prisma.user.findMany()
    res.send(allUsers);
}

export const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists
    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (userExists) return res.status(400).send('User already exists');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);   

    try {
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            }
        })
        res.send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }   
}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            userId: id,
        }
    });

    if (!user) return res.status(404).send('User not found');
    res.send(user);
}

export const updateUserbyId = async (req:Request, res:Response)=>{
    const {userId} = req.params;
    const {firstName,lastName} =req.body;

    try {
        
        const upDatedUser = await prisma.user.update({
            data:{
                firstName,
                lastName,
            },
            where:{
                userId:userId
            }
        });

        res.status(200).send(upDatedUser);

    } catch(error) {

        console.log(error);
        res.status(500).send(error)

    }
}

