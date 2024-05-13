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

const jwtTokenSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    userRoll: z.string(),
    userId: z.string(),
});

export { userSignUpFormSchema, jwtTokenSchema };