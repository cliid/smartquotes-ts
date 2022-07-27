(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.smartquotes = {}));
})(this, (function (exports) { 'use strict';

    var pL = "a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ";
    var word = "[".concat(pL, "_0-9]");
    var nonWord = "[^".concat(pL, "_0-9]");
    var replacements = [
        // triple prime
        [
            /'''/g,
            function (retainLength) { return "\u2034" + (retainLength ? "\u2063\u2063" : ""); },
        ],
        // beginning "
        [new RegExp("(".concat(nonWord, "|^)\"(").concat(word, ")"), "g"), "$1\u201c$2"],
        // ending "
        [/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, "$1\u201d$2"],
        // remaining " at end of word
        [/([^0-9])"/g, "$1\u201d"],
        // double prime as two single quotes
        [/''/g, function (retainLength) { return "\u2033" + (retainLength ? "\u2063" : ""); }],
        // beginning '
        [new RegExp("(".concat(nonWord, "|^)'(\\S)"), "g"), "$1\u2018$2"],
        // conjunction's possession
        [new RegExp("(".concat(word, ")'([").concat(pL, "])"), "ig"), "$1\u2019$2"],
        // abbrev. years like '93
        [
            new RegExp("(\\u2018)([0-9]{2}[^\\u2019]*)(\\u2018([^0-9]|$)|$|\\u2019[".concat(pL, "])"), "ig"),
            "\u2019$2$3",
        ],
        // ending '
        [new RegExp("((\\u2018[^']*)|[".concat(pL, "])'([^0-9]|$)"), "ig"), "$1\u2019$3"],
        // backwards apostrophe
        [
            new RegExp("(\\B|^)\\u2018(?=([^\\u2018\\u2019]*\\u2019\\b)*([^\\u2018\\u2019]*\\B".concat(nonWord, "[\\u2018\\u2019]\\b|[^\\u2018\\u2019]*$))"), "ig"),
            "$1\u2019",
        ],
        // double prime
        [/"/g, "\u2033"],
        // prime
        [/'/g, "\u2032"],
    ];

    var string = function (str, options) {
        if (options === void 0) { options = { retainLength: false }; }
        replacements.forEach(function (replace) {
            var replacement = typeof replace[1] === "function"
                ? replace[1](options.retainLength)
                : replace[1];
            str = str.replace(replace[0], replacement);
        });
        return str;
    };

    function element(root) {
        handleElement(root);
        return root;
    }
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
        text = string(text, { retainLength: true });
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

    var __values = (undefined && undefined.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    function listen(root) {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var e_1, _a;
                try {
                    for (var _b = __values(mutation.addedNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var node = _c.value;
                        element(node);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
        });
        listen.runOnReady(function () {
            observer.observe(root || document.body, {
                childList: true,
                subtree: true,
            });
        });
        return observer;
    }
    listen.runOnReady = function (run) {
        // if called without arguments, run on the entire body after the document has loaded
        if (document.readyState !== "loading") {
            // we're already ready
            run();
        }
        else if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", run, false);
        }
        else {
            var readyStateCheckInterval_1 = setInterval(function () {
                if (document.readyState !== "loading") {
                    clearInterval(readyStateCheckInterval_1);
                    run();
                }
            }, 10);
        }
    };

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

    exports["default"] = smartquotes;
    exports.element = element;
    exports.listen = listen;
    exports.replacements = replacements;
    exports.string = string;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=smartquotes.js.map
