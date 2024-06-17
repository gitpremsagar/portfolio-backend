"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// route handlers
const user_route_1 = __importDefault(require("./routes/user.route"));
const project_route_1 = __importDefault(require("./routes/project.route"));
const technology_route_1 = __importDefault(require("./routes/technology.route"));
const message_route_1 = __importDefault(require("./routes/message.route"));
app.use("/public", express_1.default.static("public"));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/users", user_route_1.default);
app.use("/api/projects", project_route_1.default);
app.use("/api/technologies", technology_route_1.default);
app.use("/api/messages", message_route_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}`));
