import { Request, Response, NextFunction } from "express";
import { userSignUpFormSchema } from "../schemas/allSchemas";
import jwt, { JwtPayload } from "jsonwebtoken";

const validateSignUpForm = (
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


declare global {
  namespace Express {
    interface Request {
      user: string | JwtPayload;
    }
  }
}
const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const token = req.header("Authorization");
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    console.log("No token provided");
    return res.status(401).send("Access Denied");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    req.user = decodedToken;
    
    next();
  } catch (error) {
    console.log("Invalid Token");
    res.status(400).send("Invalid Token");
  }
};

const isUserAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as JwtPayload;
  if (user.userRoll !== "admin") return res.status(403).send("Access Denied");
  next();
};

const isUserAdminOrOwner = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as JwtPayload;
  if (user.userRoll === "admin") return next();
  if (user.userId !== req.params.userId) return res.status(403).send("Access Denied");
}

export { validateSignUpForm,verifyToken, isUserAdmin, isUserAdminOrOwner };