'use strict'

var canvas;
var ctx;

function init() {
    canvas = document.getElementById('meme-canvas');
    ctx = canvas.getContext('2d');
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
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawImage(imgPath) {
    var img = new Image();
    img.src = imgPath;

    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}

function onDrawText(ev){
    console.log(ev);
    
    let {offsetX, offsetY} = ev;
    // let offsetY = ev.offsetY;
    // offsetX = offsetX*1.5;
    // offsetY = offsetY*1.5;
    drawText(offsetX,offsetY)
}

function drawText(x,y) {
    var meme = getMemeProp()
    ctx.fillStyle = meme.fontColor;
    if (meme.textBorder !=='none') ctx.strokeStyle = `${meme.textBorder}`
    ctx.textAlign ='center';
    ctx.textBaseline = "middle";
    ctx.font = `${meme.fontSize}px ${meme.fontFamily}`;
    ctx.fillText(`${meme.text}`, x,y);
    ctx.strokeText(`${meme.text}`,x,y)
    console.log(ctx.measureText(meme.text).width)
}


//-----------------------------------------------

function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}