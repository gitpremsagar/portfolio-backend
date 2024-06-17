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
exports.getDecodedToken = exports.loginUser = exports.updateUserbyId = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield prisma.user.findMany();
    res.send(allUsers);
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    // Check if the user already exists
    try {
        const userExists = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (userExists)
            return res.status(400).send('User already exists');
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
    // Hash the password
    const salt = yield bcrypt_1.default.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    // insert user into database
    try {
        const newUser = yield prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            }
        });
        const newUserData = {
            userId: newUser.userId,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
        };
        res.status(201).send(newUserData);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Check if the user exists
        const user = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user)
            return res.status(401).send('Invalid email or password');
        // Check if the password is correct
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword)
            return res.status(401).send('Invalid email or password');
        // check if the user is an admin
        let userRoll = "visitor";
        if (user.email === process.env.ADMIN_EMAIL) {
            userRoll = "admin";
        }
        // Create and assign a token
        const token = jsonwebtoken_1.default.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userRoll: userRoll,
            userId: user.userId
        }, process.env.JWT_SECRET_KEY);
        res.send(token);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.loginUser = loginUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield prisma.user.findUnique({
            where: {
                userId: userId,
            }
        });
        if (!user)
            return res.status(404).send('User not found');
        res.send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.getUserById = getUserById;
const updateUserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { firstName, lastName } = req.body;
    try {
        const upDatedUser = yield prisma.user.update({
            data: {
                firstName,
                lastName,
            },
            where: {
                userId: userId
            }
        });
        res.status(200).send(upDatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.updateUserbyId = updateUserbyId;
const getDecodedToken = (req, res, next) => {
    res.send(req.user);
};
exports.getDecodedToken = getDecodedToken;
