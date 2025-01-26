"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsService = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const pathToDB = node_path_1.default.join(process.cwd(), "db.json");
class FsService {
    async read() {
        const json = await promises_1.default.readFile(pathToDB, "utf-8");
        return json ? JSON.parse(json) : [];
    }
    async write(users) {
        await promises_1.default.writeFile(pathToDB, JSON.stringify(users));
    }
}
exports.fsService = new FsService();
