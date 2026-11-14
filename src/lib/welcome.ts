export const WELCOMED_KEY = "vv-welcomed";
export const STAGE_COMPLETED_KEY = "vv-stage-completed";

/**
 * Runs before the page paints (inlined in <head>):
 * 1. First-time visitors get `data-welcome` on <html> to reveal the splash overlay.
 * 2. If the user previously completed the sticky stage, `data-stage-completed` is set
 *    so it never flashes or reappears on page visits.
 */
export const WELCOME_BOOT_SCRIPT = `try{if(location.pathname==="/"&&!localStorage.getItem("${WELCOMED_KEY}"))document.documentElement.dataset.welcome="1";if(sessionStorage.getItem("${STAGE_COMPLETED_KEY}")==="1")document.documentElement.dataset.stageCompleted="1"}catch(e){}`;
