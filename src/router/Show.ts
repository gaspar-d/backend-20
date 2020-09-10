import { Router } from "express";
import { ShowController } from "../controller/ShowController";

const showRouter = Router();

showRouter.put("/", new ShowController().registerShow);
showRouter.get("/", new ShowController().getShowsByDay);

export default showRouter;
