"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_service_1 = require("./fs.service");
const user_router_1 = require("./routes/user.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", user_router_1.userRouter);
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
    console.log("Server is running on port 3000!");
});
