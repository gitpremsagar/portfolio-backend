import {Request, Response} from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTechnologies = async (req:Request, res: Response)=>{
    try {
        const technologies = await prisma.technology.findMany();
        res.send(technologies);
    } catch (error) {
        console.log("error getting technologies from db = ", error)
        res.status(500).send("Error getting technologies from db")
    }    
}

export const getTechnologyById = async (req:Request, res: Response)=>{
    try {
        const {id} = req.params;
        const technology = await prisma.technology.findUnique({
            where: {
                technologyId: id
            }
        });
        res.send(technology);
    } catch (error) {
        console.log("error getting technology by id from db = ", error)
        res.status(500).send("Error getting technology by id from db")
    }    
}

export const createTechnology = async (req:Request, res: Response)=>{
    try {
        const {technologyName, technologyDescription} = req.body;
        const technology = await prisma.technology.create({
            data: {
                technologyName,
                technologyDescription,
                
            }
        });
        res.send(technology);
    } catch (error) {
        console.log("error creating technology in db = ", error)
        res.status(500).send("Error creating technology in db")
    }    
}

export const updateTechnology = async (req:Request, res: Response)=>{
    try {
        const {technologyId} = req.params;
        const {technologyName, technologyDescription, } = req.body;
        const technology = await prisma.technology.update({
            where: {
                technologyId: technologyId
            },
            data: {
                technologyName,
                technologyDescription,
                
            }
        });
        res.send(technology);
    } catch (error) {
        console.log("error updating technology in db = ", error)
        res.status(500).send("Error updating technology in db")
    }    
}

export const deleteTechnology = async (req:Request, res: Response)=>{
    try {
        const {id} = req.params;
        await prisma.technology.delete({
            where: {
                technologyId: id
            }
        });
        res.send("Technology deleted successfully");
    } catch (error) {
        console.log("error deleting technology in db = ", error)
        res.status(500).send("Error deleting technology in db")
    }    
}

export const deleteAllTechnologies = async (req:Request, res: Response)=>{
    try {
        await prisma.technology.deleteMany();
        res.send("All Technologies deleted successfully");
    } catch (error) {
        console.log("error deleting all technologies in db = ", error)
        res.status(500).send("Error deleting all technologies in db")
    }    
}