"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    async getList(req, res, next) {
        try {
            const result = await user_service_1.userService.getList();
            res.status(200).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const dto = req.body;
            const result = await user_service_1.userService.create(dto);
            res.status(201).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const userId = req.params.userId;
            const result = await user_service_1.userService.getById(userId);
            res.status(200).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const userId = Number(req.params.userId);
            await user_service_1.userService.delete(userId);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const userId = Number(req.params.userId);
            const dto = req.body;
            const result = await user_service_1.userService.update(userId, dto);
            res.status(201).json(result);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
