'use strict'

let gCanvas;
let gCtx;

function init() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
    gImgs = loadFromStorage('gImgs');
    if (!gImgs || !gImgs.length) {
        gImgs = gImgsDefault();
    }
    renderImageGallery();
    //Added Responsive Resizing to the Canvas:
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 16*22) {
            gCanvas.width = window.innerWidth - 50;
            gCanvas.height = window.innerWidth - 50;
        }
        else if (window.innerWidth <= 16*32) {
            gCanvas.width = 300;
            gCanvas.height = 300;
        } else if (window.innerWidth <= 16*42) {
            gCanvas.width = 450;
            gCanvas.height = 450;
        } 
    });
    //--------------------------------------------
    saveToStorage('gImgs', gImgs);
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
    gCtx.fillStyle = `${meme.fontColor}`;
    if (meme.textBorder !=='none') gCtx.strokeStyle = `${meme.textBorder}`
    gCtx.textAlign ='center';
    gCtx.textBaseline = "middle";
    gCtx.font = `${meme.fontSize}px ${meme.fontFamily}`;
    gCtx.fillText(`${meme.text}`, x,y);
    gCtx.strokeText(`${meme.text}`,x,y)
}


//-----------------------------------------------

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

//FUNCTION: Render Image Gallery 

function renderImageGallery () {
    let mainGallery = document.querySelector('.main-gallery');
    let strHTML = gImgs.map(img => {
        return `
        <li class="gallery-item"><a><img onclick="drawImage('${img.imageUrl}')"src=${img.imageUrl} /></a></li>`
    });
    mainGallery.innerHTML = strHTML.join('');
}


