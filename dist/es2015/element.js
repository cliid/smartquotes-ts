import string from "./string";
export default function element(root) {
    handleElement(root);
    return root;
}
const isText = (node) => {
    if ("nodeType" in node)
        return node.nodeType === 3;
    return false;
};
const isTextNode = (node) => {
    if (!("nodeType" in node) && "nodeName" in node)
        return node.nodeName === "#text";
    return false;
};
function handleElement(el) {
    if (["CODE", "PRE", "SCRIPT", "STYLE", "NOSCRIPT"].indexOf(el.nodeName.toUpperCase()) !== -1) {
        return;
    }
    let text = "";
    const childNodes = "childNodes" in el ? el.childNodes : [];
    const textNodes = [];
    // compile all text first so we handle working around child nodes
    for (let i = 0; i < childNodes.length; i++) {
        const node = childNodes[i];
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
    text = string(text, { retainLength: true });
    for (let i = 0; i < textNodes.length; i++) {
        const nodeInfo = textNodes[i];
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
