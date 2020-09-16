import { Router } from "express";
import { ImageController } from "../controller/ImageController";

const imageRouter = Router();

imageRouter.put("/", new ImageController().registerImage);
imageRouter.get("/", new ImageController().getImageDetail);

export default imageRouter;
