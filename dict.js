function dict_definition(I){
    check_buffer(I.buffer, content_buffer);
    let dict_url = 'http://dictd.xdsl.by/cgi-bin/dict.cgi?strategy=definitions&database=*&.submit=Submit+Query&q='+
        encodeURIComponent(
            yield I.minibuffer.read(
                $prompt = "Dict: ",
                $initial_value = I.buffer.top_frame.getSelection()));
    browser_object_follow(I.buffer, OPEN_NEW_BUFFER, dict_url);
    unfocus(I.window, I.buffer);
}
function dict_substring(I){
    check_buffer(I.buffer, content_buffer);
    let dict_url = 'http://86.57.151.109/cgi-bin/dict.cgi?Form=Dict2&Strategy=substring&Database=*&Query='+
        encodeURIComponent(
            yield I.minibuffer.read(
                $prompt = "Dict (substring): ",
                $initial_value = I.buffer.top_frame.getSelection()));
    browser_object_follow(I.buffer, OPEN_NEW_BUFFER, dict_url);
    unfocus(I.window, I.buffer);
}
function dict_Levenshtein(I){
    check_buffer(I.buffer, content_buffer);
    let dict_url = 'http://86.57.151.109/cgi-bin/dict.cgi?Form=Dict2&Strategy=lev&Database=*&Query='+
        encodeURIComponent(
            yield I.minibuffer.read(
                $prompt = "Dict (Levenshtein): ",
                $initial_value = I.buffer.top_frame.getSelection()));
    browser_object_follow(I.buffer, OPEN_NEW_BUFFER, dict_url);
    unfocus(I.window, I.buffer);
}

interactive("dict",
            "Definitions of the word from dict.org in all supported dictionaries."
            + "C-u triggers lookup for words with Levenshtein distance 1."
            + "C-u C-u triggers lookup for words which contain the given word as a substring.",
            alternates(dict_definition, dict_Levenshtein, dict_substring)
            );

define_key(default_global_keymap, "f5", "dict");
