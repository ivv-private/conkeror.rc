require("string.js");

function dict_mini_buffer_init (buffer) {
    // TODO: make singleton
    buffer.dict_mouseclick = function (event) {
        let selected = trim_whitespace(buffer.top_frame.getSelection().toString());
        if (event.button == 0 || !selected) {
            return;
        }

        let request = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"]
            .createInstance(Ci.nsIXMLHttpRequest);

        request.onload = function(aEvent) {
            response = aEvent.target.responseXML;

            let xslt = make_file(get_pref("conkeror.rcfile") + "/dict/yandex.xslt");
            let domParser = Cc["@mozilla.org/xmlextras/domparser;1"]
                .createInstance(Ci.nsIDOMParser);
            let xsltProc = Cc["@mozilla.org/document-transformer;1?type=xslt"]
                .createInstance(Ci.nsIXSLTProcessor);
            let serializer = Cc["@mozilla.org/xmlextras/xmlserializer;1"]
                .createInstance(Ci.nsIDOMSerializer);
            let xslDocument = domParser.parseFromString(read_text_file(xslt), "text/xml");
            xsltProc.importStylesheet(xslDocument);

            let out = xsltProc.transformToDocument(response);
            buffer.window.minibuffer.show(serializer.serializeToString(out.documentElement.firstChild));
        };

        request.onerror = function(aEvent) {
            I.window.alert("Error Status: " + aEvent.target.status);
        };

        request.open("GET", "http://m.slovari.yandex.ru/translate.xml?text=" + selected, true);
        request.overrideMimeType("text/xml");
        request.send(null);
    };
    buffer.browser.addEventListener("click", buffer.dict_mouseclick, true);
}

define_global_mode(
    "dict_mini_buffer",
    
    function enable () {
        add_hook("create_buffer_hook", dict_mini_buffer_init);
        for_each_buffer(dict_mini_buffer_init);
    },
    
    function disable () {
        remove_hook("create_buffer_hook", dict_popup_init);
        for_each_buffer(function (b) {
            b.browser.removeEventListener("click", b.dict_mouseclick, true);
        });
    },
    
    $doc = "Double click on word to select it and press right button" +
	"to get its description or translation."
);

dict_mini_buffer(true);
