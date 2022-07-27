import { DefaultTreeAdapterMap } from "parse5";
declare type Document = DefaultTreeAdapterMap["document"];
declare type Parse5Node = DefaultTreeAdapterMap["node"];
export default function element(root: Node | Parse5Node | Document): import("parse5/dist/tree-adapters/default").Node | Node;
export {};
