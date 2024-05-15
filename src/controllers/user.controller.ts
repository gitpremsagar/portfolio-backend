import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();

const getAllUsers = async (req: Request, res: Response) => {
    const allUsers = await prisma.user.findMany()
    res.send(allUsers);
}

const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists
    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
    
        if (userExists) return res.status(400).send('User already exists');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS!));
    const hashedPassword = await bcrypt.hash(password, salt);   

    // insert user into database
    try {
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            }
        });
        const newUserData = {
            userId: newUser.userId,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
        }
        res.status(201).send(newUserData);
    } catch (error) {
        res.status(400).send(error);
    }   
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
    
        if (!user) return res.status(401).send('Invalid email or password');
    
        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).send('Invalid email or password');
    
        // check if the user is an admin
        let userRoll = "visitor";
        if (user.email === process.env.ADMIN_EMAIL) {
            userRoll = "admin";
        }
    
        // Create and assign a token
        const token = jwt.sign({ 
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userRoll: userRoll,
            userId: user.userId 
        }, 
        process.env.JWT_SECRET_KEY!);
        res.send(token);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                userId: userId,
            }
        });
    
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const updateUserbyId = async (req:Request, res:Response)=>{
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
        res.status(500).send(error);
    }
}

const getDecodedToken = (req: Request, res: Response, next: any) => {
    res.send(req.user);
}

export { getAllUsers, getUserById, createUser, updateUserbyId, loginUser, getDecodedToken };
