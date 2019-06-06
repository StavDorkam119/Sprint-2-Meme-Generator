'use strict'

const gCanvas;
const gCtx;

function init() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
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

function onChangeFont(elFont){
    changeFont(elFont)
}

function onChangeStyle(style) {
    changeStyle(style)
}

function onToggleTextBorder(){
    let elBorderBtn = document.querySelector('.font-border-btn').innerText;

    if (elBorderBtn === 'Font Border'){
        changeBorder('1px solid black')
        elBorderBtn ='Remove Font Border';
    } else {
        changeBorder('none')
        elBorderBtn = 'Font Border'
    }
    
}

//------------------------------------------------

//FUNCTION - RENDER CAVAS

function clearCanvas() {
    gCtx.fillStyle = 'white';
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}


function drawImage(imgPath) {
    var img = new Image();
    img.src = imgPath;

    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    };
}


function onDrawText(ev){
    let offsetX = ev.offsetX;
    let offsetY = ev.offsetY;

    drawText(offsetX,offsetY)
}


function drawText(x,y) {
    var meme = getMemeProp()
    gCtx.font = `${meme.fontSize}px,${meme.fontFamily}`;
    gCtx.fillText(`'${meme.text}'`, x,y);
    gCtx.strokeText(`'${meme.text}'`,x,y)
}



//-----------------------------------------------

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}