import { Router } from "express";

import { userController } from "../controlers/user.controller";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);

export const userRouter = router;
