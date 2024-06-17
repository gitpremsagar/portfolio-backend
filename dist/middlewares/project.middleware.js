"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = void 0;
const multerConfig_1 = __importDefault(require("../configs/multerConfig"));
const multer_1 = __importDefault(require("multer"));
const uploadImages = (req, res, next) => {
    // console.log("uploadProjectImage middleware");
    multerConfig_1.default.fields([
        { name: "projectImage", maxCount: 1 },
        { name: "projectMockupImage", maxCount: 1 },
    ])(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            console.log("A Multer error occurred when uploading project image");
            return res
                .status(500)
                .send("A Multer error occurred when uploading project image");
        }
        else if (err) {
            console.log("An unknown error occurred when uploading project image");
            return res
                .status(500)
                .send("An unknown error occurred when uploading project image");
        }
        next();
    });
};
exports.uploadImages = uploadImages;
