require("opensearch.js");

define_keymap("x_dict_keymap");
var xdict_style = "position: fixed; border: 3px solid #DDDDDD; z-index: 999999; "

function dict_hide(I) {
    var dict = I.buffer.document.getElementById("x-dict");
    if (dict != null) {
        dict.parentNode.removeChild(dict);
    }
    x_dict_mode.disable(I.buffer);
}

function dict_show(url, style, prompt) {
    let open_search = opensearch_read_file(make_file(get_pref("conkeror.rcfile") + "/search-engines/yandex-dict.xml"));
    return function (I) {
        check_buffer(I.buffer, content_buffer);
        let dict_url = url.replace("$$", encodeURIComponent(
            yield I.minibuffer.read(
                $prompt = prompt,
                $completer = open_search.completer,
                $auto_complete = "buffer",
                $auto_complete_initial = true,
                $auto_complete_delay = 0,
                $initial_value = I.buffer.top_frame.getSelection())
        ));
        var dict = I.buffer.document.getElementById("x-dict");
        if (dict == null) {
            var dict = I.buffer.document.createElement("iframe");
            dict.setAttribute("id", "x-dict");
        }
        dict.setAttribute("src", dict_url);
        dict.setAttribute("style", xdict_style + style);
        I.buffer.document.documentElement.appendChild(dict);
        x_dict_mode.enable(I.buffer);
    }
};

interactive("x-dict", "Translate selected word. C-u translate selected phrase."
            , alternates(
                dict_show("http://m.slovari.yandex.ru/translate.xml?text=$$",
                        "top: 2%; right: 10px; height: 96%; width: 50%;",
                        "Translate word: "),
                dict_show("http://translate.yandex.ru?text=$$", 
                        "top: 60%; left: 10%; height: 35%; width: 80%", 
                        "Translate text: ")
            ));

interactive("x-dict-definition", "Define word."
            , dict_show( "http://m.slovari.yandex.ru/meaning.xml?text=$$&mode=full", 
                       "top: 2%; left: 67%; height: 96%; width: 30%", 
                       "Define word: "));

interactive("x-dict-hide", "Hide opened dictionary article", dict_hide);

define_key(default_global_keymap, "f5", "x-dict");
define_key(default_global_keymap, "f6", "x-dict-definition");

define_key(x_dict_keymap, "escape", "x-dict-hide");
define_key(x_dict_keymap, "C-g", "x-dict-hide");
define_key(x_dict_keymap, "q", "x-dict-hide");

define_keymaps_page_mode("x-dict-mode",
    function () {return false;},
    { normal: x_dict_keymap },
    $display_name = "Dict mode");

add_hook(
    "content_buffer_location_change_hook", 
    function(buffer) { 
        if (buffer.document.getElementById("x-dict") != null) {
            x_dict_mode.enable(buffer);
        } else {
            x_dict_mode.disable(buffer);
        }
    });
