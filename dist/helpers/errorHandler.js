"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logErrorHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const pino_1 = __importDefault(require("pino"));
const logErrorHandler = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message} \n`;
    (0, pino_1.default)().info(message);
    fs_1.default.appendFile("error.log", logMessage, (err) => {
        if (err) {
            console.error(`Error writing to the log file : ${err.message}`);
        }
    });
};
exports.logErrorHandler = logErrorHandler;
