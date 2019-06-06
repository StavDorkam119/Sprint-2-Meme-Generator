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

function onChangeText(){
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

function onChangeFont(elFont){
    changeFont(elFont)
}

function onChangeStyle(style) {
    changeStyle(style)
}

function onImagePick(imgPath) {
    changeImage(imgPath)
    drawImage(imgPath)
}

function onToggleTextBorder(){
    let elBorderBtn = document.querySelector('.font-border-btn');
    let meme = getMemeProp()
    if (meme.textBorder === 'none'){
        changeBorder('border')
        elBorderBtn.innerText  ='Remove Font Border';
    } else {
        changeBorder('none')
        elBorderBtn.innerText  = 'Font Border'
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
    let {offsetX, offsetY} = ev;
    // let offsetY = ev.offsetY;
    // offsetX = offsetX*1.5;
    // offsetY = offsetY*1.5;
    drawText(offsetX,offsetY)
}

function drawText(x,y) {
    var meme = getMemeProp()
<<<<<<< HEAD
    gCtx.font = `${meme.fontSize}px,${meme.fontFamily}`;
    gCtx.fillText(`'${meme.text}'`, x,y);
    gCtx.strokeText(`'${meme.text}'`,x,y)
=======
    ctx.fillStyle = `${meme.fontColor}`;
    if (meme.textBorder !=='none') ctx.strokeStyle = `${meme.textBorder}`
    ctx.textAlign ='center';
    ctx.textBaseline = "middle";
    ctx.font = `${meme.fontSize}px ${meme.fontFamily}`;
    ctx.fillText(`${meme.text}`, x,y);
    ctx.strokeText(`${meme.text}`,x,y)
>>>>>>> 358c21949f457385c1e999d4f09e22e0c168bb98
}


//-----------------------------------------------

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}