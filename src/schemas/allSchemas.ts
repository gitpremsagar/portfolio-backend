import {z} from 'zod';

const userSignUpFormSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

const TechnologySchema = z.object({
    technologyName: z.string().min(2,{message:"Technology name should be atleast 2 characters long"}).max(255,{message:"Technology name should be atmost 255 characters long"}).transform((data)=>data.trim()),
    technologyId: z.string(),
    technologyDescription: z.string().min(2,{message:"Technology description should be atleast 2 characters long"}).max(255,{message:"Technology description should be atmost 255 characters long"}).transform((data)=>data.trim()),
});

const ProjectSchema = z.object({
    projectId: z.string(),
    projectPosition: z.number(),
    projectName: z.string().min(2,{message:"Project name should be atleast 2 characters long"}).max(255,{message:"Project name should be atmost 255 characters long"}).transform((data)=>data.trim()),
    projectDescription: z.string(),
    projectLiveLink: z.string(),
    frontendCodeLink: z.string(),
    backendCodeLink: z.string(),
    projectImageLink: z.string(),
    projectMockupImageLink: z.string(),
    // createdAt: z.date(),
    // updatedAt: z.date(),
    technologies: z.array(TechnologySchema), // Assuming you have a TechnologySchema defined
  });

const jwtTokenSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    userRoll: z.string(),
    userId: z.string(),
});

export { userSignUpFormSchema, jwtTokenSchema, ProjectSchema, TechnologySchema};