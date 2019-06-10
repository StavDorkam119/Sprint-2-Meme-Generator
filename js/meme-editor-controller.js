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
    renderFamousKeywords();
    //Added Responsive Resizing to the Canvas:
    window.addEventListener('resize', setSizeOfCanvas);

    //drag the text
    gCanvas.addEventListener('mousemove',ev=>{ 
        let { offsetX, offsetY } = ev;
        if (ev.buttons!==1) return              
        checkClickedWord(offsetX, offsetY)
    })

    document.getElementById("keyword-search").addEventListener('input', onFilterGallery, event)
    document.getElementById("keyword-search-desktop").addEventListener('input', onFilterGallery, event)
    setSizeOfCanvas();
    initBackground();

    //--------------------------------------------
    saveToStorage('gImgs', gImgs);
    saveToStorage('gKeywords', gKeywords);
}

//-----------------------------------------------

//FUNCTION - USER EDIT MEME 

function onChangeText(elText){
    changeText(elText);
    renderCanvas()
}

function onChangeFontSize(elFontSize) {
    changeFontSize(elFontSize)
    renderCanvas()
}

function onChangeColor(elColor) {
    changeColor(elColor)
    renderCanvas()
}

function onChangeFont(elFont) {
    changeFont(elFont)
    renderCanvas()
}

function onImagePick(imgId) {
    document.querySelector('main').classList.toggle('main-editor-mode-padding');
    document.querySelector('.keyword-search-container').style.display = 'none';
    document.querySelector('.main-gallery').style.display = 'none';
    document.querySelector('.meme-editor-canvas').style.display = 'flex';
    let imgPath = getImgUrlById(imgId).imageUrl
    changeImage(imgPath)
    drawImage(imgPath)
}

function onBackToGallery() {
    document.querySelector('main').classList.toggle('main-editor-mode-padding');
    document.querySelector('.keyword-search-container').style.display = 'flex';
    document.querySelector('.main-gallery').style.display = 'grid';
    document.querySelector('.meme-editor-canvas').style.display = 'none';
}

function onChangeTextBorderColor(elColor) {
    changeTextBorderColor(elColor)
    renderCanvas()
}

function onaddText() {
    addText(gCanvas)
}

function onClickedWord(ev) {
    // let { offsetX, offsetY } = ev;

}

//------------------------------------------------

//FUNCTION - RENDER CAVAS

function renderCanvas() {
    clearCanvas()

    let meme = getMemeProp()
    let memeImageUrl = meme[0].selectedImgUrl;
    if (!memeImageUrl) return;
    drawImage(memeImageUrl);

    //array of word property
    let memeTxt = meme[0].txts;
    
    memeTxt.forEach(text => {       
        drawText(text)       
    })

}

function clearCanvas() {
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)

}

function drawImage(imgPath) {
    var img = new Image();
    img.src = imgPath;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function drawText(meme) {
    gCtx.fillStyle = meme.fontColor;
    gCtx.strokeStyle = meme.textBorderColor;
    gCtx.font = meme.fontSize + 'px ' + meme.fontFamily;

    //center the text
    gCtx.textAlign = 'center';
    gCtx.textBaseline = "middle";

    //print the text on canvas
    
    gCtx.fillText(meme.text, meme.textLocation.x, meme.textLocation.y);
    gCtx.strokeText(meme.text, meme.textLocation.x, meme.textLocation.y)

    let textWidth = gCtx.measureText(meme).width;
    setTextPosition(meme.textLocation.x, meme.textLocation.y, textWidth)   
}
    
//-----------------------------------------------

function downloadImg(elLink) {
    let data = gCanvas.toDataURL()
    elLink.href = data

    elLink.download = 'YourMeme.jpg'
}


//FUNCTION: Render Image Gallery 

function renderImageGallery() {
    let mainGallery = document.querySelector('.main-gallery');
    let strHTML = gImgs.map(img => {
        return `
        <li class="gallery-item"><a><img onclick="onImagePick('${img.id}')"src=${img.imageUrl} /></a></li>`
    });
    mainGallery.innerHTML = strHTML.join('');
}

function setSizeOfCanvas() {
    if (window.innerWidth <= 16 * 22) {
        gCanvas.width = window.innerWidth - 50;
        gCanvas.height = window.innerWidth - 50;
    }
    else if (window.innerWidth <= 16 * 32) {
        gCanvas.width = 300;
        gCanvas.height = 300;
    } else if (window.innerWidth >= 16 * 42 && window.innerWidth < 16 * 66) {
        gCanvas.width = 450;
        gCanvas.height = 450;
    } else if (window.innerWidth >= 16 * 66) {
        gCanvas.width = 600;
        gCanvas.height = 600;
    }
    renderCanvas()
}


function onFilterGallery(event) {
    //convert input str into a regex format

    let inputStr = event.currentTarget.value;
    if (!inputStr) {
        renderImageGallery();
        return;
    }
    if (inputStr[inputStr.length - 1] === ' ') return;
    inputStr = inputStr.split(' ');
    inputStr.forEach((word, index, thisArray) => { thisArray[index] = `(?=.*${word})` });
    inputStr = '^' + inputStr.join(''); + '.*$';
    let regex = new RegExp(inputStr, 'gi');
    let filteredImgs = gImgs.filter(img => {
        let imgKeywordsStr = img.keywords.join(' ');
        return regex.test(imgKeywordsStr);
    });
    if (!filteredImgs || !filteredImgs.length) {
        console.log('No images matched');
        renderImageGallery();
    }
    let mainGallery = document.querySelector('.main-gallery');
    let strHTML = filteredImgs.map(img => {
        return `
        <li class="gallery-item"><a><img onclick="drawImage('${img.imageUrl}')"src=${img.imageUrl} /></a></li>`
    });
    mainGallery.innerHTML = strHTML.join('');
}

function renderFamousKeywords() {
    const elFamousKeywordDisplay = document.querySelector('.famous-keyword-container');
    let strHTML;
    let sortedKeywords = sortKeywords();
    sortedKeywords = sortedKeywords.slice(0, 8);
    strHTML = sortedKeywords.map(item => {
        return `<h3 style="font-size: ${item[1]}em">${item[0]}</h3>`
    })
    elFamousKeywordDisplay.innerHTML = strHTML.join('');
}

//-------------------------------------------------------------

