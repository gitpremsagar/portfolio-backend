import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        technologies: true,
      },
    });
    res.send(projects);
  } catch (error) {
    console.log("error getting projects from db = ", error);
    res.status(500).send("Error getting projects from db");
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: {
        projectId: id,
      },
      include: {
        technologies: true,
      },
    });
    res.send(project);
  } catch (error) {
    console.log("error getting project by id from db = ", error);
    res.status(500).send("Error getting project by id from db");
  }
};

export const createProject = async (req: Request, res: Response) => {
  // console.log("files = ", req.files);
  // console.log("body = ", req.body);
  try {
    const {
      projectName,
      projectDescription,
      technologies,
      projectLiveLink,
      frontendCodeLink,
      backendCodeLink,
      projectPosition,
    } = req.body;
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
    const project = await prisma.project.create({
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
          connect: technologies.map((technologyId: String) => ({
            technologyId: technologyId,
          })),
        },
      },
      include: {
        technologies: true,
      },
    });
    res.send(project);
  } catch (error) {
    console.log("error creating project in db = ", error);
    res.status(500).send("Error creating project in db");
  }
};

export const updateProjectById = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const {
      projectName,
      projectDescription,
      technologies,
      projectLiveLink,
      frontendCodeLink,
      backendCodeLink,
      projectImageLink,
      projectMockupImageLink,
    } = req.body;
    const techIds = technologies.map((tech: any) => tech.technologyId);
    const project = await prisma.project.update({
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
          connect: techIds.map((techId: string) => ({ technologyId: techId })),
        },
      },
    });
    res.send(project);
  } catch (error) {
    console.log("error updating project in db = ", error);
    res.status(500).send("Error updating project in db");
  }
};

export const deleteProjectById = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const project = await prisma.project.delete({
      where: {
        projectId: projectId,
      },
    });
    res.send(project);
  } catch (error) {
    console.log("error deleting project in db = ", error);
    res.status(500).send("Error deleting project in db");
  }
};
