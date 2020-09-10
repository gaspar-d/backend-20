import { Router } from "express";
import { UserController } from "../controller/UserController";
import { BandController } from "../controller/BandController";

const bandRouter = Router();

bandRouter.put("/", new BandController().registerBand);
bandRouter.get("/", new BandController().getBandDetail);

export default bandRouter;
