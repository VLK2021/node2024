"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_service_1 = require("./fs.service");
const api_error_1 = require("./errors/api-error");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/users", async (req, res) => {
    try {
        const users = await fs_service_1.fsService.read();
        res.json(users);
    }
    catch (e) {
        res.status(500).json(e.message);
    }
});
app.post("/users", async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || name.length < 3) {
            throw new api_error_1.ApiError("Name is required and should be at least 3 characters", 400);
        }
        if (!email || !email.includes("@")) {
            return res.status(400).json("Email is required and should be valid");
        }
        if (!password || password.length < 6) {
            throw new api_error_1.ApiError("Password is requaired and should be at least 6 characters", 400);
        }
        const users = await fs_service_1.fsService.read();
        const index = users.findIndex((user) => user.email === email);
        if (index !== -1) {
            throw new api_error_1.ApiError("User with this email already exists", 409);
        }
        const newUser = {
            id: users[users.length - 1].id + 1,
            name,
            email,
            password,
        };
        users.push(newUser);
        await fs_service_1.fsService.write(users);
        res.status(201).json(newUser);
    }
    catch (e) {
        next(e);
    }
});
app.get("/users/:userId", async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const users = await fs_service_1.fsService.read();
        const user = users.find((user) => user.id === userId);
        if (!user) {
            return res.status(404).json("User not found");
        }
        res.json(user);
    }
    catch (e) {
        res.status(500).json(e.message);
    }
});
app.put("/users/:userId", async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const { name, email, password } = req.body;
        const users = await fs_service_1.fsService.read();
        const user = users.find((user) => user.id === userId);
        if (!user) {
            return res.status(404).json("User not found");
        }
        if (name)
            user.name = name;
        if (email)
            user.email = email;
        if (password)
            user.password = password;
        await fs_service_1.fsService.write(users);
        res.status(201).json(user);
    }
    catch (e) {
        res.status(500).json(e.message);
    }
});
app.delete("/users/:userId", async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const users = await fs_service_1.fsService.read();
        const index = users.findIndex((user) => user.id === userId);
        if (index === -1) {
            return res.status(404).json("User not found");
        }
        users.splice(index, 1);
        await fs_service_1.fsService.write(users);
        res.sendStatus(204);
    }
    catch (e) {
        res.status(500).json(e.message);
    }
});
app.use("*", (err, req, res, next) => {
    res.status(err.status || 500).json(err.message);
});
process.on("uncaughtException", (e) => {
    console.error("uncaughtException", e.message, e.stack);
    process.exit(1);
});
app.listen(3000, () => {
    console.log("Server is runing on port 3000!");
});
