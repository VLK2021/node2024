"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controlers/user.controller");
const router = (0, express_1.Router)();
router.get("/", user_controller_1.userController.getList);
router.post("/", user_controller_1.userController.create);
exports.userRouter = router;
