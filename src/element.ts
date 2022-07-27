import { DefaultTreeAdapterMap } from "parse5";

import string from "./string";

type Document = DefaultTreeAdapterMap["document"];
type Parse5Node = DefaultTreeAdapterMap["node"];
type TextNode = DefaultTreeAdapterMap["textNode"];

export default function element(root: Node | Parse5Node | Document) {
  handleElement(root);
  return root;
}

const isText = (node: Node | Parse5Node): node is Text => {
  if ("nodeType" in node) return node.nodeType === 3;

  return false;
};

const isTextNode = (node: Node | Parse5Node): node is TextNode => {
  if (!("nodeType" in node) && "nodeName" in node)
    return node.nodeName === "#text";

  return false;
};

function handleElement(el: Node | Parse5Node | Document) {
  if (
    ["CODE", "PRE", "SCRIPT", "STYLE", "NOSCRIPT"].indexOf(
      el.nodeName.toUpperCase()
    ) !== -1
  ) {
    return;
  }

  let text = "";

  const childNodes = "childNodes" in el ? el.childNodes : [];

  const textNodes: {
    node: Text | TextNode;
    length: number;
  }[] = [];

  // compile all text first so we handle working around child nodes
  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i];

    if (isTextNode(node) || isText(node)) {
      textNodes.push({ node: node, length: text.length });
      text += "nodeValue" in node ? node.nodeValue : node.value;
    } else if (
      "childNodes" in node &&
      node.childNodes &&
      node.childNodes.length
    ) {
      text += handleElement(node);
    }
  }

  text = string(text, { retainLength: true });

  for (let i = 0; i < textNodes.length; i++) {
    const nodeInfo = textNodes[i];
    if (isText(nodeInfo.node)) {
      nodeInfo.node.nodeValue = substring(
        text,
        nodeInfo.node.nodeValue || "",
        nodeInfo.length
      );
    } else if (isTextNode(nodeInfo.node)) {
      nodeInfo.node.value = substring(
        text,
        nodeInfo.node.value,
        nodeInfo.length
      );
    }
  }

  return text;
}

function substring(text: string, value: string, position: number) {
  return text
    .substring(position, position + value.length)
    .replace("\u2063", "");
}
