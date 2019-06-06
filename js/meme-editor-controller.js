'use strict'

var canvas;
var ctx;

function init() {
    canvas = document.getElementById('#meme-canvas');
    ctx = canvas.getContext('2d');
} 

//-----------------------------------------------

//FUNCTION - USER EDIT MEME 

function onChooseImage(img){
    changeImage(img)
}

function onChangeText(str){
    changeText(str)
}

function onChangeFontSize() {
    const elFontSize = document.querySelector('.font-size-change').value;
    changeFontSize(elFontSize)
}

function onChangeColor() {
    const elColor = document.querySelector('.font-color-change').value;   
    changeColor(elColor)
}

function onFontChange(){
    fontChange(font)
}


//------------------------------------------------

//FUNCTION - RENDER CAVAS

function drawImage() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    var img = new Image();
    img.src = "img/koala.jpg";

    img.onload = function () {
        context.drawImage(img, 0, 0, 400, 360);
    };
}


//-----------------------------------------------

function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}