const java =
    "%2F*%0A%2F%2F%20This%20is%20an%20online%20Java%20compiler.%20Write%20your%20code%20and%20click%20on%20%22Run%20My%20Code%22%20button%20to%20run%20it.%0A%2F%2F%20When%20defining%20a%20public%20class%2C%20use%20%22Solution%22%20as%20the%20class%20name.%0A%2F%2F%20Do%20not%20specify%20custom%20packages.%20Custom%20packages%20are%20not%20yet%20supported.%0A*%2F%0A%0Apublic%20class%20Solution%20%7B%0A%20%20%20%20public%20static%20void%20main(String%5B%5D%20args)%20%7B%0A%20%20%20%20%20%20%20%20System.out.println(%22Hello%2C%20World!%22)%3B%20%0A%20%20%20%20%7D%0A%7D";
const python =
    "%27%27%27%0A%23%20This%20is%20an%20online%20Python%20compiler.%20Write%20your%20code%20and%20click%20on%20%22Run%20My%20Code%22%20button%20to%20run%20it.%0A%27%27%27%0A%0Aprint(%27Hello%2C%20world!%27)";

var editor = ace.edit("editor");
editor.setTheme("ace/theme/xcode");
editor.session.setUseWrapMode(true);
editor.setHighlightActiveLine(true);
editor.setShowPrintMargin(false);

/* Save changes in local storage */
editor.session.on("change", function (delta) {
    // delta.start, delta.end, delta.lines, delta.action
    localStorage.code = editor.getValue(); // or session.getValue
    buttonEnableDisable(editor.getValue());
});



function resetCode() {
    if ($("#languageSelector").val() === "java") {
        editor.session.setMode("ace/mode/java");
        editor.setValue(decodeURIComponent(java));
    }
    if ($("#languageSelector").val() === "py") {
        editor.session.setMode("ace/mode/python");
        editor.setValue(decodeURIComponent(python));
    }
}

function languageSelectorUtil() {
    localStorage.language = $("#languageSelector").val();

    if ($("#languageSelector").val() === "java") {
        editor.session.setMode("ace/mode/java");
        if (localStorage.code === decodeURIComponent(python)) {
            editor.setValue(decodeURIComponent(java));
        }
    }
    if ($("#languageSelector").val() === "py") {
        editor.session.setMode("ace/mode/python");
        if (localStorage.code === decodeURIComponent(java)) {
            editor.setValue(decodeURIComponent(python));
        }
    }
    console.log(
        "Language Selector onchange event: " + $("#languageSelector").val()
    );
}
