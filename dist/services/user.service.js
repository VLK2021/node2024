"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_error_1 = require("../errors/api-error");
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    async getList() {
        return await user_repository_1.userRepository.getList();
    }
    async create(dto) {
        const { name, email, password } = dto;
        if (!name || name.length < 3) {
            throw new api_error_1.ApiError("Name is required and should be at least 3 characters", 400);
        }
        if (!email || !email.includes("@")) {
            throw new api_error_1.ApiError("Email is required and should be valid", 400);
        }
        if (!password || password.length < 6) {
            throw new api_error_1.ApiError("Password is required and should be at least 6 characters", 400);
        }
        return await user_repository_1.userRepository.create(dto);
    }
    async getById(userId) {
        return await user_repository_1.userRepository.getById(userId);
    }
    async delete(userId) {
        return await user_repository_1.userRepository.deleteById(userId);
    }
    async update(userId, dto) {
        return await user_repository_1.userRepository.updateById(userId, dto);
    }
}
exports.userService = new UserService();
