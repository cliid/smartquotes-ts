"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var replacements_1 = __importDefault(require("./replacements"));
var string = function (str, options) {
    if (options === void 0) { options = { retainLength: false }; }
    replacements_1.default.forEach(function (replace) {
        var replacement = typeof replace[1] === "function"
            ? replace[1](options.retainLength)
            : replace[1];
        str = str.replace(replace[0], replacement);
    });
    return str;
};
exports.default = string;
