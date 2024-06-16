import upload from "../configs/multerConfig";
import { Request, Response, NextFunction } from "express";
import multer from "multer";

export const uploadImages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("uploadProjectImage middleware");

  upload.fields([
    { name: "projectImage", maxCount: 1 },
    { name: "projectMockupImage", maxCount: 1 },
  ])(req, res, function (err: any) {
    if (err instanceof multer.MulterError) {
      console.log("A Multer error occurred when uploading project image");
      return res
        .status(500)
        .send("A Multer error occurred when uploading project image");
    } else if (err) {
      console.log("An unknown error occurred when uploading project image");
      return res
        .status(500)
        .send("An unknown error occurred when uploading project image");
    }
    next();
  });
};
