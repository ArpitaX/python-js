var java = "class%20Solution%20%7B%0A%20%20%20%20public%20static%20void%20main(String%5B%5D%20args)%20%7B%0A%20%20%20%20%20%20%20%20System.out.println(%22Hello%2C%20World!%22)%3B%20%0A%20%20%20%20%7D%0A%7D";
var python = "print(%27Hello%2C%20world!%27)";
var darkmode = true;

$(document).ready(function () {
    loadData();
    buttonEnableDisable($("#code").val());
    // enableUserInput();
    if(localStorage.code == "") {
        resetCode();
    }
    languageSelectorUtil();
    toggleMode();
});

function saveData() {
    localStorage.code = $("#code").val();
    localStorage.inputs = $("#userInput").val();
    localStorage.checkedstate = $("#checkbox").is(":checked");
    buttonEnableDisable($("#code").val());
}

function loadData() {
    $("#code").val(localStorage.code);
    $("#languageSelector").val(localStorage.language);
}

function buttonEnableDisable(value) {
    if (value === "") {
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
    if (darkmode == true) {
        darkmode = false;
        $('body').css('background-color','#f5f5f5');
        $("label").removeClass("text-light");
        $('.fixed-bottom').css('background-color','#f5f5f5');
        $('.nav-top').css('background-color','#e1e1e1');
        $(".nav-top").addClass("navbar-light ");
        $(".nav-top").removeClass("navbar-dark ");
        $("textarea").removeClass("text-light");
        $('textarea').css('background-color','#f0f0f0');
        $('textarea').css('border','1px solid #f5f5f5');
        $("#togglebtn").text("Light Mode");
        $(".normal-btn").css('background-color','#f5f5f5');
        $(".normal-btn").addClass("text-dark");
        $(".run-btn").css('background-color','#fccde2');
        $(".run-btn").addClass("text-dark");
    }
    // switch to dark mode
    else {
        darkmode = true;
        $('body').css('background-color','#364f6b');
        $('.fixed-bottom').css('background-color','#364f6b');
        $('.nav-top').css('background-color','#3E5B7B');
        $(".nav-top").addClass("navbar-dark ");
        $('textarea').css('background-color','#304863');
        $("label").addClass("text-light");
        $("textarea").addClass("text-light");
        $('textarea').css('border','1px solid #364f6b');
        $("#togglebtn").text("Dark Mode");
        $(".normal-btn").css('background-color','#304863');
        $(".normal-btn").css('border-color','#304863');
        $(".normal-btn").removeClass("text-dark");
        $(".normal-btn").addClass("text-light");
        $(".run-btn").css('background-color','#c5454a');
        $(".run-btn").removeClass("text-dark");
        $(".run-btn").addClass("text-light");
    }
}

function resetCode() {
    if ($("#languageSelector").val() === "java") {
        $("#code").val(decodeURIComponent(java));
    }
    if ($("#languageSelector").val() === "py") {
        $("#code").val(decodeURIComponent(python));
    }
    saveData();
}

function languageSelectorUtil() {
    localStorage.language = $("#languageSelector").val();
    if(localStorage.code == "" || localStorage.code == decodeURIComponent(java) || localStorage.code == decodeURIComponent(python)) {
        resetCode();
    }
    
}

