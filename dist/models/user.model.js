"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const role_enum_1 = require("../enums/role.enum");
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    role: {
        type: String,
        enum: role_enum_1.RoleEnum,
        required: true,
        default: role_enum_1.RoleEnum.USER,
    },
    isVerified: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = mongoose_1.default.model("users", userSchema);
