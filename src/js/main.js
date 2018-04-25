"use strict";

/*************************background video*************************/
$(document).ready(function() {
    var videobackground = new $.backgroundVideo($('body'), {
        "align": "centerXY",
        "width": 1280,
        "height": 720,
        "path": "../video/",
        "filename": "Film-set",
        "types": ["mp4","ogg","webm"],
        "preload": true,
        "autoplay": true,
        "loop": true
    });
});

/*************************username*************************/
var userName = function userName() {
    var reg = /^[a-zA-Z]+$/;
    var name = document.fname.name.value;
    var field = document.getElementById('error_field');
    if (name === "") {
        field.innerHTML = "Enter Your Name";
        field.style.color = 'red';
        document.fname.name.focus();
        return false;
    } else if (reg.test(name) !== true) {
        field.innerHTML = "Only Characters";
        field.style.color = 'red';
        document.fname.name.focus();
        return false;
    } else {
        field.innerHTML = "ok";
        field.style.color = 'green';
        return true;
    }
};
/*************************secondname*************************/
var userSecondname = function userSecondname() {
    var reg = /^[a-zA-Z]+$/;
    var name = document.fname.secondname.value;
    var field = document.getElementById('error_field-sn');
    if (name === "") {
        field.innerHTML = "Enter Your Secondname";
        field.style.color = 'red';
        document.fname.firstname.focus();
        return false;
    } else if (reg.test(name) !== true) {
        field.innerHTML = "Only Characters";
        field.style.color = 'red';
        document.fname.firstname.focus();
        return false;
    } else {
        field.innerHTML = "ok";
        field.style.color = 'green';
        return true;
    }
};
/*************************password*************************/
var pattern1 = /[0-9]/;
var pattern2 = /[a-z]/;
var pattern3 = /[A-Z]/;
var pattern4 = /.*[!@#$%^&*() =+_-]/;

var userPassword = function userPassword() {
    var pwd = document.fname.pass.value;
    var error = document.getElementById('error_pass');
    if (pwd === "") {
        error.innerHTML = "Enter your password";
        document.fname.pass.focus();
        return false;
    } else if (pwd.length < 5) {
        error.innerHTML = "mimum 5";
        error.style.color = 'red';
        return false;
    } else if (pattern1.test(pwd) !== true) {
        error.innerHTML = "atleast one no";
        error.style.color = 'red';
        return false;
    } else if (pattern2.test(pwd) !== true) {
        error.innerHTML = "atleast one lowercase";
        error.style.color = 'red';
        return false;
    } else if (pattern3.test(pwd) !== true) {
        error.innerHTML = "atleast one uppercase";
        error.style.color = 'red';
        return false;
    } else if (pattern4.test(pwd) !== true) {
        error.innerHTML = "atleast one Special";
        error.style.color = 'red';
        return false;
    } else {
        error.innerHTML = "ok";
        error.style.color = 'green';
        return true;
    }
};

/*************************confirm*************************/
var confirm = function confirm() {
    var pwd = document.fname.pass.value;
    var cp = document.fname.passcon.value;
    var error = document.getElementById('error_cp');
    if (cp === "") {
        error.innerHTML = "Enter UR Password";
        error.style.color = 'red';
        return false;
    } else if (cp !== pwd) {
        error.innerHTML = "Password Not Matched";
        error.style.color = 'red';
        return false;
    } else {
        error.innerHTML = "ok";
        error.style.color = 'green';
        return true;
    }
};

/*************************Email*************************/
var email = function email() {

    var email = document.fname.email.value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var error = document.getElementById("error_email");
    if (email === "") {
        error.innerHTML = "please enter the email id";
        document.fname.email.focus();
        error.style.color = 'red';
        return false;
    } else if (!email.match(mailformat)) {
        error.innerHTML = "please enter the correct format";
        document.fname.email.focus();
        error.style.color = 'red';
        return false;
    } else {
        error.innerHTML = "ok";
        error.style.color = 'green';
        return true;
    }
};

/*************************checkbox*************************/
var checbox = function checbox() {
    var error = document.getElementById("error_check");
    if (document.fname.checkbox.checked === false) {
        error.innerHTML = "select the checkbox";
        error.style.color = 'red';
        return false;
    } else {
        error.innerHTML = "ok";
        error.style.color = 'green';
        return true;
    }
};

document.querySelector(".btn").onclick = function formValidation() {
        var arr = [];
        var objSend = new Object();
        arr.push(userName());
        arr.push(userSecondname());
        arr.push(userPassword());
        arr.push(confirm());
        arr.push(email());
        arr.push(checbox());
        if(arr[0] && arr[1] && arr[2] && arr[3] && arr[4]) {
            objSend = {
                url: "http://codeit.pro/codeitCandidates/serverFrontendTest/user/registration",
                data: $("form").serialize()
            }
            $.post(objSend.url, objSend.data, responseServer);
            console.log(objSend.data);
        }
}

function responseServer(resp){
    alert(resp.message);

}