$(document).ready(function () {
    loadData();
    buttonEnableDisable($("#code").val());
    // enableUserInput();
});

function saveData() {
    localStorage.code = $("#code").val();
    localStorage.inputs = $("#userInput").val();
    localStorage.checkedstate = $("#checkbox").is(":checked");
    buttonEnableDisable($("#code").val());
}

function loadData() {
    $("#code").val(localStorage.code);
}

function buttonEnableDisable(value) {
    if(value === "") {
        $("#download-btn").prop("disabled", true);
        $("#runbtn").prop("disabled", true);
    }
    else {
        $("#download-btn").prop("disabled", false);
        $("#runbtn").prop("disabled", false);
    }
}

function enableUserInput() {
    if ($("#checkbox").is(":checked")) {
        $("#userInput").fadeIn("slow");
        $("#userInput").prop("hidden", false)
    } else {
        $("#userInput").fadeOut("slow");
        $("#userInput").prop("hidden", true)
    }
}

function runCode() {
    
    $("#runbtn").prop("disabled", true)

    var hasuserinput = "false";
    if ($("#checkbox").is(":checked")) {
        hasuserinput = "true";
    }

    var jsondata = {
        "language": $("#languageSelector").val(),
        "code": $("#code").val(),
        "hasuserinput": hasuserinput,
        "inputs": $("#userInput").val()
    };

    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "http://localhost:8080/run",
        data: jsondata,
        dataType: 'json',
        cache: false,
        timeout: 600000,

    }).then(function (data) {
        $("#runbtn").prop("disabled", false);
        var error = data.error;
        $('#output').val(data.result + error);
    });

}

function download() {
    
    var extension = $("#languageSelector").val()
    var filename = "download.";
    var file = filename.concat(extension);
    var text = $("#code").val();

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', file);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function toggleMode() {
    // switch to light mode
    if ($("body").hasClass("bg-dark")) {
        $("#togglebtn").addClass("btn-outline-secondary");
        $("#togglebtn").removeClass("btn-secondary");
        $("body").removeClass("bg-dark");
        $("label").removeClass("text-light");
        $("textarea").removeClass("text-light");
        $("#togglebtn").text("Light Mode");
        $("#download-btn").addClass("btn-outline-secondary");
        $("#download-btn").removeClass("btn-secondary");
    }
    // switch to dark mode
    else {
        $("#togglebtn").removeClass("btn-outline-secondary");
        $("#togglebtn").addClass("btn-secondary");
        $("body").addClass("bg-dark");
        $("label").addClass("text-light");
        $("textarea").addClass("text-light");
        $("#togglebtn").text("Dark Mode");
        $("#download-btn").removeClass("btn-outline-secondary");
        $("#download-btn").addClass("btn-secondary");
    }
}
