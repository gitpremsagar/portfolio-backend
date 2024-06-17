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
exports.deleteProjectById = exports.updateProjectById = exports.createProject = exports.getProjectById = exports.getAllProjects = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma.project.findMany({
            include: {
                technologies: true,
            },
        });
        res.send(projects);
    }
    catch (error) {
        console.log("error getting projects from db = ", error);
        res.status(500).send("Error getting projects from db");
    }
});
exports.getAllProjects = getAllProjects;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const project = yield prisma.project.findUnique({
            where: {
                projectId: id,
            },
            include: {
                technologies: true,
            },
        });
        res.send(project);
    }
    catch (error) {
        console.log("error getting project by id from db = ", error);
        res.status(500).send("Error getting project by id from db");
    }
});
exports.getProjectById = getProjectById;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("files = ", req.files);
    // console.log("body = ", req.body);
    try {
        const { projectName, projectDescription, technologies, projectLiveLink, frontendCodeLink, backendCodeLink, projectPosition, } = req.body;
        // const technologiesAsJson = JSON.parse(technologies);
        const projPosition = parseInt(projectPosition);
        let projectImageLink = "https://via.placeholder.com/150";
        // if (
        //   req.files &&
        //   "projectImage" in req.files &&
        //   req.files["projectImage"].length > 0
        // ) {
        //   projectImageLink = req.files["projectImage"][0].path;
        // } else {
        //   return res.status(400).send("projectImage is required");
        // }
        let projectMockupImageLink = "https://via.placeholder.com/150";
        // if (
        //   req.files &&
        //   "projectMockupImage" in req.files &&
        //   req.files["projectMockupImage"].length > 0
        // ) {
        //   projectMockupImageLink = req.files["projectMockupImage"][0].path;
        // } else {
        //   return res.status(400).send("projectMockupImage is required");
        // }
        const project = yield prisma.project.create({
            data: {
                projectName,
                projectDescription,
                projectLiveLink,
                frontendCodeLink,
                backendCodeLink,
                projectImageLink: projectImageLink,
                projectMockupImageLink: projectMockupImageLink,
                projectPosition: projPosition,
                technologies: {
                    connect: technologies.map((technologyId) => ({
                        technologyId: technologyId,
                    })),
                },
            },
            include: {
                technologies: true,
            },
        });
        res.send(project);
    }
    catch (error) {
        console.log("error creating project in db = ", error);
        res.status(500).send("Error creating project in db");
    }
});
exports.createProject = createProject;
const updateProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const { projectName, projectDescription, technologies, projectLiveLink, frontendCodeLink, backendCodeLink, projectImageLink, projectMockupImageLink, } = req.body;
        const techIds = technologies.map((tech) => tech.technologyId);
        const project = yield prisma.project.update({
            where: {
                projectId: projectId,
            },
            data: {
                projectName,
                projectDescription,
                projectLiveLink,
                frontendCodeLink,
                backendCodeLink,
                projectImageLink,
                projectMockupImageLink,
                technologies: {
                    connect: techIds.map((techId) => ({ technologyId: techId })),
                },
            },
        });
        res.send(project);
    }
    catch (error) {
        console.log("error updating project in db = ", error);
        res.status(500).send("Error updating project in db");
    }
});
exports.updateProjectById = updateProjectById;
const deleteProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const project = yield prisma.project.delete({
            where: {
                projectId: projectId,
            },
        });
        res.send(project);
    }
    catch (error) {
        console.log("error deleting project in db = ", error);
        res.status(500).send("Error deleting project in db");
    }
});
exports.deleteProjectById = deleteProjectById;
