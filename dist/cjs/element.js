"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = __importDefault(require("./string"));
function element(root) {
    handleElement(root);
    return root;
}
exports.default = element;
var isText = function (node) {
    if ("nodeType" in node)
        return node.nodeType === 3;
    return false;
};
var isTextNode = function (node) {
    if (!("nodeType" in node) && "nodeName" in node)
        return node.nodeName === "#text";
    return false;
};
function handleElement(el) {
    if (["CODE", "PRE", "SCRIPT", "STYLE", "NOSCRIPT"].indexOf(el.nodeName.toUpperCase()) !== -1) {
        return;
    }
    var text = "";
    var childNodes = "childNodes" in el ? el.childNodes : [];
    var textNodes = [];
    // compile all text first so we handle working around child nodes
    for (var i = 0; i < childNodes.length; i++) {
        var node = childNodes[i];
        if (isTextNode(node) || isText(node)) {
            textNodes.push({ node: node, length: text.length });
            text += "nodeValue" in node ? node.nodeValue : node.value;
        }
        else if ("childNodes" in node &&
            node.childNodes &&
            node.childNodes.length) {
            text += handleElement(node);
        }
    }
    text = (0, string_1.default)(text, { retainLength: true });
    for (var i = 0; i < textNodes.length; i++) {
        var nodeInfo = textNodes[i];
        if (isText(nodeInfo.node)) {
            nodeInfo.node.nodeValue = substring(text, nodeInfo.node.nodeValue || "", nodeInfo.length);
        }
        else if (isTextNode(nodeInfo.node)) {
            nodeInfo.node.value = substring(text, nodeInfo.node.value, nodeInfo.length);
        }
    }
    return text;
}
function substring(text, value, position) {
    return text
        .substring(position, position + value.length)
        .replace("\u2063", "");
}
