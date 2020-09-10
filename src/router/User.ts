import { Router } from "express";
import { UserController } from "../controller/UserController";

const userRouter = Router();

userRouter.put("/signup", new UserController().signup);
userRouter.get("/login", new UserController().login);

export default userRouter;
