var darkmode = true;

/* Initialize Application */
$(document).ready(function () {
    /* Set default language to Java */
    if (localStorage.language === undefined) {
        $("#languageSelector").val("java");
        localStorage.language = "java";
        editor.session.setMode("ace/mode/java");
        editor.setValue(decodeURIComponent(java));
    }
    $("#languageSelector").val(localStorage.language);

    /* Fill editor with sample code or saved code from localStorage */
    if (localStorage.language === "java") {
        editor.session.setMode("ace/mode/java");
        if (localStorage.code === decodeURIComponent(python)) {
            editor.setValue(decodeURIComponent(java));
        }
        else {
            editor.setValue(localStorage.code);
        }
    }
    if (localStorage.language === "py") {
        editor.session.setMode("ace/mode/python");
        if (localStorage.code === decodeURIComponent(java)) {
            editor.setValue(decodeURIComponent(python));
        }
        else {
            editor.setValue(localStorage.code);
        }
    }

    buttonEnableDisable(editor.getValue());

    toggleTheme();
});

function buttonEnableDisable(value) {
    if (value == "") {
        $("#download-btn").prop("disabled", true);
        $("#runbtn").prop("disabled", true);
    } else {
        $("#download-btn").prop("disabled", false);
        $("#runbtn").prop("disabled", false);
    }
}

function enableUserInput() {
    if ($("#checkbox").is(":checked")) {
        $("#userInput").prop("disabled", false);
    } else {
        $("#userInput").prop("disabled", true);
    }
}

function runCode() {
    $("#runbtn").prop("disabled", true);

    var hasuserinput = "false";
    if ($("#checkbox").is(":checked")) {
        hasuserinput = "true";
    }

    var jsondata = {
        language: $("#languageSelector").val(),
        code: editor.getValue(),
        hasuserinput: hasuserinput,
        inputs: $("#userInput").val(),
    };

    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "https://coders-playground.herokuapp.com/run",
        data: jsondata,
        dataType: "json",
        cache: false,
        timeout: 600000,
    }).then(function (data) {
        $("#runbtn").prop("disabled", false);
        var error = data.error;
        $("#output").val(data.result + error);
    });
}

function download() {
    var extension = $("#languageSelector").val();
    var filename = "download.";
    var file = filename.concat(extension);
    var text = $("#code").val();

    var element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", file);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function toggleTheme() {
    // switch to light mode
    if (darkmode) {
        darkmode = false;
        $("body").css("background-color", "#f5f5f5");
        $("label").removeClass("text-light");
        $(".fixed-bottom").css("background-color", "#f5f5f5");
        $(".nav-top").css("background-color", "#e3f2fd");
        $(".nav-top").removeClass("navbar-dark ");
        $(".nav-label").css("color", "rgb(28 104 166)");
        $("textarea").removeClass("text-light");
        $("textarea").css("background-color", "#f0f0f0");
        $("textarea").css("border", "1px solid #f5f5f5");
        $("#togglebtn").text("Light Mode");
        $(".normal-btn").css("background-color", "#f5f5f5");
        $(".normal-btn").addClass("text-dark");
        //$(".run-btn").css('background-color','#fccde2');
        //$(".run-btn").addClass("text-dark");
    }
    // switch to dark mode
    else {
        darkmode = true;
        $("body").css("background-color", "#364f6b");
        $(".fixed-bottom").css("background-color", "#364f6b");
        $(".nav-top").css("background-color", "#3E5B7B");
        $(".nav-top").addClass("navbar-dark ");
        $(".nav-label").css("color", "");
        $("textarea").css("background-color", "#304863");
        $("label").addClass("text-light");
        $("textarea").addClass("text-light");
        $("textarea").css("border", "1px solid #364f6b");
        $("#togglebtn").text("Dark Mode");
        $(".normal-btn").css("background-color", "#304863");
        $(".normal-btn").css("border-color", "#304863");
        $(".normal-btn").removeClass("text-dark");
        $(".normal-btn").addClass("text-light");
        //$(".run-btn").css('background-color','#c5454a');
        //$(".run-btn").removeClass("text-dark");
        //$(".run-btn").addClass("text-light");
    }
}
