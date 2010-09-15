interactive("open-greader", "Go to google reader", "follow-new-buffer",
            $browser_object = "http://reader.google.com/");
define_key(content_buffer_normal_keymap, "f1", "open-greader");

interactive("open-gmail", "Go to gmail", "follow-new-buffer",
            $browser_object = "http://gmail.com/");
define_key(content_buffer_normal_keymap, "f2", "open-gmail");

interactive("open-gdocs", "Go to google docs", "follow-new-buffer",
            $browser_object = "http://docs.google.com/");
define_key(content_buffer_normal_keymap, "f3", "open-gdocs");

interactive("open-gcal", "Go to google calendar", "follow-new-buffer",
            $browser_object = "http://calendar.google.com/");
define_key(content_buffer_normal_keymap, "f4", "open-gcal");

interactive("open-transmission", "Go to transmission", "follow-new-buffer",
            $browser_object = "http://localhost:9091/transmission/web");
define_key(content_buffer_normal_keymap, "f9", "open-transmission");

