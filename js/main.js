// Initialize CodeMirror editor with a nice html5 canvas demo.
var delay;
var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    mode: 'javascript',
    tabMode: 'indent',
	lineNumbers: true
});

editor.on(
    'change', function() {
        clearTimeout(delay);
        delay = setTimeout(updatePreview, 300);
    }
);

function updatePreview() {
    // remove iframe
    $('#live-preview-frame').remove();
    $('<iframe id="live-preview-frame"></iframe>').appendTo('#live-preview');
    var previewFrame = document.getElementById('live-preview-frame');

    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    previewFrame.setAttribute("src", "blank.html");
    preview.location.href = "blank.html?time=" + Date.now();

    preview.open();
    preview.write('');
    preview.close();

    preview.open();
    preview.write('<!doctype html>');
    preview.write('<html><head><script src="enchantjs/enchant.js"></script></head><body style="margin:0; padding: 0;"><script>');
    preview.write(editor.getValue());
    preview.write('</script></body></html>');
    preview.close();
}

delay = setTimeout(updatePreview, 300);
