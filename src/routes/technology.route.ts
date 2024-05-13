import express from 'express';
import { getAllTechnologies, createTechnology,deleteAllTechnologies } from '../controllers/technology.controller';

const router = express.Router();

router.post("/", createTechnology);

router.get("/", getAllTechnologies);

router.delete("/", deleteAllTechnologies);

export default router;