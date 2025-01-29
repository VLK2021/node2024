import { Router } from "express";

import { userController } from "../controlers/user.controller";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);

router.get("/:userId", userController.getById);
router.delete("/:userId", userController.delete);
router.put("/:userId", userController.update);

export const userRouter = router;
