export const WELCOMED_KEY = "vv-welcomed";

/**
 * Runs before the page paints (inlined in <head>): first-time visitors to the
 * homepage get `data-welcome` on <html>, which reveals the splash overlay
 * without a flash of the page underneath.
 */
export const WELCOME_BOOT_SCRIPT = `try{if(location.pathname==="/"&&!localStorage.getItem("${WELCOMED_KEY}"))document.documentElement.dataset.welcome="1"}catch(e){}`;
