import express,{ Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();

app.use(cors());

app.use(express.json());

// route handlers
import userRouteHandlers from "./routes/routes.user";
import projectRouteHandler from "./routes/project.route";
import technologyRouteHandler from "./routes/technology.route";

app.get("/",(req: Request, res: Response) =>{
    res.send("Hello World");
});

app.use("/api/users", userRouteHandlers);
app.use("/api/projects",projectRouteHandler);
app.use("/api/technologies",technologyRouteHandler);

const PORT : string | number = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}`));