declare const replacements: [
    regexp: RegExp,
    replace: ((retainLength: boolean) => string) | string
][];
export default replacements;
