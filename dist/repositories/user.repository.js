"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const api_error_1 = require("../errors/api-error");
const fs_service_1 = require("../fs.service");
class UserRepository {
    async getList() {
        return await fs_service_1.fsService.read();
    }
    async create(dto) {
        const users = await fs_service_1.fsService.read();
        const index = users.findIndex((user) => user.email === dto.email);
        if (index !== -1) {
            throw new api_error_1.ApiError("User with this email already exists", 409);
        }
        const newUser = {
            id: users[users.length - 1].id + 1,
            name: dto.name,
            email: dto.email,
            password: dto.password,
        };
        users.push(newUser);
        await fs_service_1.fsService.write(users);
        return newUser;
    }
    async getById(userId) {
        const users = await fs_service_1.fsService.read();
        const user = users.find((user) => user.id === userId);
        if (!user) {
            throw new api_error_1.ApiError("User with this email already exists", 409);
        }
        return user;
    }
    async delete(userId) {
        const users = await fs_service_1.fsService.read();
        const index = users.findIndex((user) => user.id === userId);
        if (index === -1) {
            throw new api_error_1.ApiError("error", 409);
        }
        users.splice(index, 1);
        return await fs_service_1.fsService.write(users);
    }
    async updateById(userId, dto) {
        const users = await fs_service_1.fsService.read();
        const user = users.find((user) => user.id === userId);
        if (!user) {
            throw new api_error_1.ApiError("User not found", 422);
        }
        if (dto.name)
            user.name = dto.name;
        if (dto.email)
            user.email = dto.email;
        if (dto.password)
            user.password = dto.password;
        await fs_service_1.fsService.write(users);
        return user;
    }
}
exports.userRepository = new UserRepository();
