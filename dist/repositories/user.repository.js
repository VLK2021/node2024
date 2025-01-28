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
}
exports.userRepository = new UserRepository();
