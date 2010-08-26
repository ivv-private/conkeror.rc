session_pref("signon.rememberSignons", true);
session_pref("signon.expireMasterPassword", false);
session_pref("signon.SignonFileName", "signons.txt");
Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);
session_pref("cwd", "~/Download");

// conkeror.loadModule("tab-bar.js");
// conkeror.loadModule("clicks-in-new-buffer.js");
// define_webjump("jira", "http://195.26.167.94:5470/browse/%s");

define_key(content_buffer_normal_keymap, "d", "follow-new-buffer");