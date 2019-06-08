'use strict'

let gCanvas;
let gCtx;
let mouseHandle;

function init() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
    gImgs = loadFromStorage('gImgs');
    if (!gImgs || !gImgs.length) {
        gImgs = gImgsDefault();
    }
    gKeywords = loadFromStorage('gKeywords');
    if (!gKeywords) {
        gKeywords = getKeywordsData();
    }
    renderImageGallery();
    //Added Responsive Resizing to the Canvas:
    window.addEventListener('resize', setSizeOfCanvas);
    
    setSizeOfCanvas();
    //Added event listener for drag and drop:
    // mouseHandle = {
    //     x: gCanvas.width/2,
    //     y: gCanvas.height/2
    // };

    // util.
    //--------------------------------------------
    saveToStorage('gImgs', gImgs);
    saveToStorage('gKeywords', gKeywords);
} 

//-----------------------------------------------

//FUNCTION - USER EDIT MEME 

function onWriteText(){
    const elText = document.querySelector('.add-text').value;
    changeText(elText);
    clearCanvas()

    let meme = getMemeProp()
    let memeImg = meme[0].selectedImgId;
    drawImage(memeImg);
    changeText(elText);
    drawText(gCanvas.width/2, gCanvas.height/2)
}

function onChangeFontSize() {
    const elFontSize = document.querySelector('.font-size-change').value;
    changeFontSize(elFontSize)
    onWriteText()
}

function onChangeColor() {
    const elColor = document.querySelector('.font-color-change').value;
    changeColor(elColor)
    onWriteText()
}

function onChangeFont(elFont) {
    changeFont(elFont)
    onWriteText()
}

function onImagePick(id) {
    let imgPath = getImgUrlById(id).imageUrl
    changeImage(imgPath)
    drawImage(imgPath)
}

function onChangeTextBorderColor() {
    let elBorderColor = document.querySelector('.border-color-change').value
    changeTextBorderColor(elBorderColor)
    onWriteText()
}

//------------------------------------------------

//FUNCTION - RENDER CAVAS

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)

}

function drawImage(imgPath) {
    var img = new Image();
    img.src = imgPath;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onDrawText(ev) {
    let { offsetX, offsetY } = ev;
    drawText(offsetX, offsetY)
}

function drawText(x, y) {
    let meme = getMemeProp()    
    meme = meme[0].txts[meme[1]];

    //font style
    gCtx.fillStyle = meme.fontColor;
    gCtx.strokeStyle = meme.textBorderColor;
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
    // var imgContent = gCanvas.toDataURL('image/jpeg');
    let data = gCanvas.toDataURL()
    elLink.href = data
   
    elLink.download = 'YourMeme.jpg'
}


//FUNCTION: Render Image Gallery 

function renderImageGallery () {
    let mainGallery = document.querySelector('.main-gallery');
    let strHTML = gImgs.map(img => {
        return `
        <li class="gallery-item"><a><img onclick="onImagePick('${img.id}')"src=${img.imageUrl} /></a></li>`
    });
    mainGallery.innerHTML = strHTML.join('');
}

function setSizeOfCanvas() {
    if (window.innerWidth <= 16*22) {
        gCanvas.width = window.innerWidth - 50;
        gCanvas.height = window.innerWidth - 50;
    }
    else if (window.innerWidth <= 16*32) {
        gCanvas.width = 300;
        gCanvas.height = 300;
    } else if (window.innerWidth >= 16*42 && window.innerWidth < 16*66) {
        gCanvas.width = 450;
        gCanvas.height = 450;
    } else if (window.innerWidth >= 16*66) {
        gCanvas.width = 600;
        gCanvas.height = 600;
    }
}
    
