"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_model_1 = require("../models/user.model");
class UserRepository {
    async getList() {
        const arr = await user_model_1.User.find();
        console.log(arr);
        return arr;
    }
    async create(dto) {
        return await user_model_1.User.create(dto);
    }
    async getById(userId) {
        return await user_model_1.User.findById(userId);
    }
    async updateById(userId, dto) {
    }
    async deleteById(userId) {
    }
}
exports.userRepository = new UserRepository();
