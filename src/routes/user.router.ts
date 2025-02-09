import { Router } from "express";

import { userController } from "../controlers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.delete,
);

router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.update,
);

export const userRouter = router;
