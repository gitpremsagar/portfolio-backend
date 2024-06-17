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
exports.deleteAllTechnologies = exports.deleteTechnology = exports.updateTechnology = exports.createTechnology = exports.getTechnologyById = exports.getAllTechnologies = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllTechnologies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const technologies = yield prisma.technology.findMany();
        res.send(technologies);
    }
    catch (error) {
        console.log("error getting technologies from db = ", error);
        res.status(500).send("Error getting technologies from db");
    }
});
exports.getAllTechnologies = getAllTechnologies;
const getTechnologyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const technology = yield prisma.technology.findUnique({
            where: {
                technologyId: id
            }
        });
        res.send(technology);
    }
    catch (error) {
        console.log("error getting technology by id from db = ", error);
        res.status(500).send("Error getting technology by id from db");
    }
});
exports.getTechnologyById = getTechnologyById;
const createTechnology = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { technologyName, technologyDescription } = req.body;
        const technology = yield prisma.technology.create({
            data: {
                technologyName,
                technologyDescription,
            }
        });
        res.send(technology);
    }
    catch (error) {
        console.log("error creating technology in db = ", error);
        res.status(500).send("Error creating technology in db");
    }
});
exports.createTechnology = createTechnology;
const updateTechnology = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { technologyId } = req.params;
        const { technologyName, technologyDescription, } = req.body;
        const technology = yield prisma.technology.update({
            where: {
                technologyId: technologyId
            },
            data: {
                technologyName,
                technologyDescription,
            }
        });
        res.send(technology);
    }
    catch (error) {
        console.log("error updating technology in db = ", error);
        res.status(500).send("Error updating technology in db");
    }
});
exports.updateTechnology = updateTechnology;
const deleteTechnology = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { technologyId } = req.params;
        yield prisma.technology.delete({
            where: {
                technologyId: technologyId
            }
        });
        res.send("Technology deleted successfully");
    }
    catch (error) {
        console.log("error deleting technology in db = ", error);
        res.status(500).send("Error deleting technology in db");
    }
});
exports.deleteTechnology = deleteTechnology;
const deleteAllTechnologies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.technology.deleteMany();
        res.send("All Technologies deleted successfully");
    }
    catch (error) {
        console.log("error deleting all technologies in db = ", error);
        res.status(500).send("Error deleting all technologies in db");
    }
});
exports.deleteAllTechnologies = deleteAllTechnologies;
