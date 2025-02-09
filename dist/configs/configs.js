"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.configs = {
    APP_PORT: Number(process.env.APP_PORT),
    APP_HOST: process.env.APP_HOST,
    MONGO_URL: process.env.MONGO_URL,
};
