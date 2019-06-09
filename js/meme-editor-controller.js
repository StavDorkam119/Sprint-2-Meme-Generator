'use strict'

let gCanvas;
let gCtx;
let mouseHandle;

function init() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
    //Get Data From Local Storage and set to default if not avaliable:
    gImgs = loadFromStorage('gImgs');
    if (!gImgs || !gImgs.length) {
        gImgs = gImgsDefault();
    }
    gKeywords = loadFromStorage('gKeywords');
    if (!gKeywords) {
        gKeywords = getKeywordsData();
    }
    //--------------------------------------------
    renderImageGallery();
    renderFamousKeywords();
    //Added Responsive Resizing to the Canvas:
    window.addEventListener('resize', setSizeOfCanvas);
    // document.querySelector.addEventListener('resize', setSizeOfCanvas);


    document.getElementById("keyword-search").addEventListener('input', onFilterGallery, event)
    document.getElementById("keyword-search-desktop").addEventListener('input', onFilterGallery, event)
    setSizeOfCanvas();

    //--------------------------------------------
    saveToStorage('gImgs', gImgs);
    saveToStorage('gKeywords', gKeywords);
} 

//-----------------------------------------------

//FUNCTION - USER EDIT MEME 

// function renderCanvas(){
//     const elText = document.querySelector('.add-text').value;
//     changeText(elText);
//     clearCanvas()

//     let meme = getMemeProp()
//     let memeImg = meme[0].selectedImgId;
    
//     drawImage(memeImg);
//     changeText(elText);
//     drawText(gCanvas.width/2, gCanvas.height/2)
// }

function onChangeFontSize(elFontSizeVal) {
    let elImage = getImage(gMeme.selectedImgId);
    drawImage(elImage);
    let txt = changeTextSize(elFontSizeVal);
    txt.draw();
}

function onChangeTextColor(elColor) {
    let elImage = getImage(gMeme.selectedImgId);
    drawImage(elImage);
    let txt = changeTextColor(elColor);
    txt.draw();
}

function onChangeFont(elFont) {
    let elImage = getImage(gMeme.selectedImgId);
    drawImage(elImage);
    let txt = changeFont(elFont);
    txt.draw();
}

function onImagePick(id) {
    gMeme.selectedImgId = id;
    let elImage = getImage(id);
    drawImage(elImage);
}

function onChangeTextBorderColor(elColor) {
    let elImage = getImage(gMeme.selectedImgId);
    drawImage(elImage);
    let txt = changeTextBorderColor(elColor);
    txt.draw();
}

function onaddText() {
    addText()
}

//------------------------------------------------

//FUNCTION - RENDER CAVAS

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

}

function drawImage(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}


function onDrawText(id) {
    clearCanvas();
    let image = getImage(gMeme.selectedImgId);
    drawImage(image);
    const input = document.querySelector('[data-input-id="0"]')
    let text = gMeme.txts[+id];
    gMeme.selectedTxt = text.textId;
    text.textValue = input.value;
    text.textWidth = gCtx.measureText(input.value);
    text.textCoords = {x: gCanvas.width/2, y: 50};
    text.draw();

    //print the text on canvas
    

    // let textWidth = gCtx.measureText(meme.text).width;
    // setTextPosition(x, y, textWidth, parseInt(meme.fontSize))
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
        <li class="gallery-item"><a><img data-img-id="${img.id}" onclick="onImagePick('${img.id}')" src=${img.imageUrl} /></a></li>`
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
    drawImage(getImage(gMeme.selectedImgId));
}


function onFilterGallery(event) {
    //convert input str into a regex format

    let inputStr = event.currentTarget.value;
    if (!inputStr) {
        renderImageGallery();
        return;
    }
    if (inputStr[inputStr.length-1] === ' ') return;
    inputStr = inputStr.split(' ');
    inputStr.forEach((word, index, thisArray)=> {thisArray[index] = `(?=.*${word})`});
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
        <li class="gallery-item"><a><img data-id="${img.id}" onclick="onImagePick('${img.id}')" src=${img.imageUrl} /></a></li>`
    });
    mainGallery.innerHTML = strHTML.join('');
}

function renderFamousKeywords() {
    const elFamousKeywordDisplay = document.querySelector('.famous-keyword-container');
    const dataList = document.querySelector('#keywords');
    let strHTML, dataListStr;
    let sortedKeywords = sortKeywords();
    sortedKeywords = sortedKeywords.slice(0, 8);
    strHTML = sortedKeywords.map(item => {
        return `<h3 style="font-size: ${item[1]}em">${item[0]}</h3>`
    })
    elFamousKeywordDisplay.innerHTML = strHTML.join('');
    dataListStr = sortedKeywords.map(item => {
        return `<option value="${item[0]}">`
    });
    dataList.innerHTML = dataListStr.join('');
}