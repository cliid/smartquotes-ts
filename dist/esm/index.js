import element from "./element";
import listen from "./listen";
import replacements from "./replacements";
import string from "./string";
// The smartquotes function should just delegate to the other functions
function smartquotes(context) {
    if (typeof document !== "undefined" && typeof context === "undefined") {
        listen.runOnReady(function () { return element(document.body); });
        return smartquotes;
    }
    else if (typeof context === "string") {
        return string(context);
    }
    else if (context) {
        return element(context);
    }
}
smartquotes.element = element;
smartquotes.listen = listen;
smartquotes.replacements = replacements;
smartquotes.string = string;
export default smartquotes;
export { element, listen, replacements, string };
