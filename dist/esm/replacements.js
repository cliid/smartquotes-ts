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
export default replacements;
