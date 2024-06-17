"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("../controllers/user.controller");
const user_middleware_1 = require("../middlewares/user.middleware");
router.get("/", user_middleware_1.verifyToken, user_middleware_1.isUserAdmin, user_controller_1.getAllUsers);
router.post("/", user_middleware_1.validateSignUpForm, user_controller_1.createUser);
router.post("/login", user_controller_1.loginUser);
router.put("/:userId", user_middleware_1.verifyToken, user_middleware_1.isUserAdminOrOwner, user_controller_1.updateUserbyId);
router.get("/:userId", user_middleware_1.verifyToken, user_middleware_1.isUserAdminOrOwner, user_controller_1.getUserById);
router.post("/decode-token", user_middleware_1.verifyToken, user_controller_1.getDecodedToken);
exports.default = router;
