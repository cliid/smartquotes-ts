"use strict";
var __values = (this && this.__values) || function(o) {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var element_1 = __importDefault(require("./element"));
function listen(root) {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            var e_1, _a;
            try {
                for (var _b = __values(mutation.addedNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var node = _c.value;
                    (0, element_1.default)(node);
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
exports.default = listen;
