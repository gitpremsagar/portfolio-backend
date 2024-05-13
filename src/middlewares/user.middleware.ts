import { Request, Response, NextFunction } from "express";
import { userSignUpFormSchema } from "../schemas/allSchemas"


  const validateSignUpForm = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        userSignUpFormSchema.parse(req.body);
      next();
    } catch (error) {
        console.log(error);
      res.status(400).send(error);
    }
  };

  export { validateSignUpForm };