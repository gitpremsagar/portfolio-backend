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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserAdminOrOwner = exports.isUserAdmin = exports.verifyToken = exports.validateSignUpForm = void 0;
const allSchemas_1 = require("../schemas/allSchemas");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateSignUpForm = (req, res, next) => {
    try {
        allSchemas_1.userSignUpFormSchema.parse(req.body);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
exports.validateSignUpForm = validateSignUpForm;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // const token = req.header("Authorization");
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        console.log("No token provided");
        return res.status(401).send("Access Denied");
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        console.log("Invalid Token");
        res.status(400).send("Invalid Token");
    }
});
exports.verifyToken = verifyToken;
const isUserAdmin = (req, res, next) => {
    const user = req.user;
    if (user.userRoll !== "admin")
        return res.status(403).send("Access Denied");
    next();
};
exports.isUserAdmin = isUserAdmin;
const isUserAdminOrOwner = (req, res, next) => {
    const user = req.user;
    if (user.userRoll === "admin")
        return next();
    if (user.userId !== req.params.userId)
        return res.status(403).send("Access Denied");
};
exports.isUserAdminOrOwner = isUserAdminOrOwner;
