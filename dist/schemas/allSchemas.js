"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologySchema = exports.ProjectSchema = exports.jwtTokenSchema = exports.userSignUpFormSchema = void 0;
const zod_1 = require("zod");
const userSignUpFormSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: zod_1.z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: zod_1.z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: zod_1.z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});
exports.userSignUpFormSchema = userSignUpFormSchema;
const TechnologySchema = zod_1.z.object({
    technologyName: zod_1.z.string().min(2, { message: "Technology name should be atleast 2 characters long" }).max(255, { message: "Technology name should be atmost 255 characters long" }).transform((data) => data.trim()),
    technologyId: zod_1.z.string(),
    technologyDescription: zod_1.z.string().min(2, { message: "Technology description should be atleast 2 characters long" }).max(255, { message: "Technology description should be atmost 255 characters long" }).transform((data) => data.trim()),
});
exports.TechnologySchema = TechnologySchema;
const ProjectSchema = zod_1.z.object({
    projectId: zod_1.z.string(),
    projectPosition: zod_1.z.number(),
    projectName: zod_1.z.string().min(2, { message: "Project name should be atleast 2 characters long" }).max(255, { message: "Project name should be atmost 255 characters long" }).transform((data) => data.trim()),
    projectDescription: zod_1.z.string(),
    projectLiveLink: zod_1.z.string(),
    frontendCodeLink: zod_1.z.string(),
    backendCodeLink: zod_1.z.string(),
    projectImageLink: zod_1.z.string(),
    projectMockupImageLink: zod_1.z.string(),
    // createdAt: z.date(),
    // updatedAt: z.date(),
    technologies: zod_1.z.array(TechnologySchema), // Assuming you have a TechnologySchema defined
});
exports.ProjectSchema = ProjectSchema;
const jwtTokenSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    userRoll: zod_1.z.string(),
    userId: zod_1.z.string(),
});
exports.jwtTokenSchema = jwtTokenSchema;
