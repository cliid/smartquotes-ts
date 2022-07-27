"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = exports.replacements = exports.listen = exports.element = void 0;
var element_1 = __importDefault(require("./element"));
exports.element = element_1.default;
var listen_1 = __importDefault(require("./listen"));
exports.listen = listen_1.default;
var replacements_1 = __importDefault(require("./replacements"));
exports.replacements = replacements_1.default;
var string_1 = __importDefault(require("./string"));
exports.string = string_1.default;
// The smartquotes function should just delegate to the other functions
function smartquotes(context) {
    if (typeof document !== "undefined" && typeof context === "undefined") {
        listen_1.default.runOnReady(function () { return (0, element_1.default)(document.body); });
        return smartquotes;
    }
    else if (typeof context === "string") {
        return (0, string_1.default)(context);
    }
    else if (context) {
        return (0, element_1.default)(context);
    }
}
smartquotes.element = element_1.default;
smartquotes.listen = listen_1.default;
smartquotes.replacements = replacements_1.default;
smartquotes.string = string_1.default;
exports.default = smartquotes;
