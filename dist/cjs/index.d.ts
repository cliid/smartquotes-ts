import element from "./element";
import listen from "./listen";
import replacements from "./replacements";
import string from "./string";
declare function smartquotes(context?: string | Node | Document | HTMLElement | null): string | import("parse5/dist/tree-adapters/default").Document | import("parse5/dist/tree-adapters/default").DocumentFragment | import("parse5/dist/tree-adapters/default").Element | import("parse5/dist/tree-adapters/default").CommentNode | import("parse5/dist/tree-adapters/default").TextNode | import("parse5/dist/tree-adapters/default").DocumentType | Node | typeof smartquotes | undefined;
declare namespace smartquotes {
    var element: typeof import("./element").default;
    var listen: typeof import("./listen").default;
    var replacements: [regexp: RegExp, replace: string | ((retainLength: boolean) => string)][];
    var string: (str: string, options?: {
        retainLength: boolean;
    }) => string;
}
export default smartquotes;
export { element, listen, replacements, string };
