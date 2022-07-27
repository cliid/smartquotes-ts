import replacements from "./replacements";
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
export default string;
