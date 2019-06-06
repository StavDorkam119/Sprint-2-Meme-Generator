'use strict'

let gCanvas;
let gCtx;

function init() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
}

//-----------------------------------------------

//FUNCTION - USER EDIT MEME 

function onChooseImage(img) {
    changeImage(img)
}

function onChangeText() {
    const elText = document.querySelector('.text-add').value;
    changeText(elText)
}

function onChangeFontSize() {
    const elFontSize = document.querySelector('.font-size-change').value;
    changeFontSize(elFontSize)
}

function onChangeColor() {
    const elColor = document.querySelector('.font-color-change').value;
    changeColor(elColor)
}

function onChangeFont(elFont) {
    changeFont(elFont)
}

function onChangeStyle(style) {
    changeStyle(style)
}

function onImagePick(imgPath) {
    changeImage(imgPath)
    drawImage(imgPath)
}

function onToggleTextBorder() {
    let elBorderBtn = document.querySelector('.font-border-btn');
    let meme = getMemeProp()
    if (meme.textBorder === 'none') {
        changeBorder('border')
        elBorderBtn.innerText = 'Remove Font Border';
    } else {
        changeBorder('none')
        elBorderBtn.innerText = 'Font Border'
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

function onDrawText(ev) {
    let { offsetX, offsetY } = ev;

    drawText(offsetX, offsetY)
}

function drawText(x, y) {
    var meme = getMemeProp()

    //font style
    //to do - add input border color
    gCtx.fillStyle = meme.fontColor;
    if (meme.textBorder !== 'none') gCtx.strokeStyle = meme.textBorder;
    gCtx.font = meme.fontSize + 'px ' + meme.fontFamily;

    //center the text
    gCtx.textAlign ='center';
    gCtx.textBaseline = "middle";

    //print the text on canvas
    gCtx.fillText(meme.text, x, y);
    gCtx.strokeText(meme.text, x, y)

    let textWidth = gCtx.measureText(meme.text).width;
    setTextPosition(x, y, textWidth, parseInt(meme.fontSize))
}


//-----------------------------------------------

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}