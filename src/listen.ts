import element from "./element";

function listen(root?: HTMLElement) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      for (const node of mutation.addedNodes) {
        element(node);
      }
    });
  });

  listen.runOnReady(() => {
    observer.observe(root || document.body, {
      childList: true,
      subtree: true,
    });
  });
  return observer;
}

listen.runOnReady = (run: () => void) => {
  // if called without arguments, run on the entire body after the document has loaded
  if (document.readyState !== "loading") {
    // we're already ready
    run();
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", run, false);
  } else {
    const readyStateCheckInterval = setInterval(() => {
      if (document.readyState !== "loading") {
        clearInterval(readyStateCheckInterval);
        run();
      }
    }, 10);
  }
};

export default listen;
