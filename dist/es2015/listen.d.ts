declare function listen(root?: HTMLElement): MutationObserver;
declare namespace listen {
    var runOnReady: (run: () => void) => void;
}
export default listen;
