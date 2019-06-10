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
    gMeme = getGMemeDefault();
    gTextCount = gMeme.txts.length;
    renderImageGallery();
    renderFamousKeywords();
    renderMemeEditor();
    //Added Responsive Resizing to the Canvas:
    window.addEventListener('resize', setSizeOfCanvas);
    // document.querySelector.addEventListener('resize', setSizeOfCanvas);


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
    document.querySelector('main').classList.toggle('main-editor-mode-padding');
    document.querySelector('.keyword-search-container').style.display = 'none';
    document.querySelector('.main-gallery').style.display = 'none';
    document.querySelector('.meme-editor-canvas').style.display = 'flex';
    gMeme.selectedImgId = id;
    let elImage = getImage(id);
    drawImage(elImage);
}

function onBackToGallery() {
    document.querySelector('main').classList.toggle('main-editor-mode-padding');
    document.querySelector('.keyword-search-container').style.display = 'flex';
    document.querySelector('.main-gallery').style.display = 'grid';
    document.querySelector('.meme-editor-canvas').style.display = 'none';
}

function onChangeTextBorderColor(elColor) {
    let elImage = getImage(gMeme.selectedImgId);
    drawImage(elImage);
    let txt = changeTextBorderColor(elColor);
    txt.draw();
}

function onSetTxt(id) {
    setSelectedText(id);
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
    // debugger;
    const input = document.querySelector(`[data-input-id="${id}"]`)
    let text = gMeme.txts[+id - 1];
    gMeme.selectedTxt = text.textId;
    text.textValue = input.value;
    text.textWidth = gCtx.measureText(input.value);
    text.textCoords = {
        x: gCanvas.width / 2,
        y: 50
    };
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

function renderImageGallery() {
    let mainGallery = document.querySelector('.main-gallery');
    let strHTML = gImgs.map(img => {
        return `
        <li class="gallery-item"><a><img data-img-id="${img.id}" onclick="onImagePick('${img.id}')" src=${img.imageUrl} /></a></li>`
    });
    mainGallery.innerHTML = strHTML.join('');
}

function setSizeOfCanvas() {
    if (window.innerWidth <= 16 * 22) {
        gCanvas.width = window.innerWidth - 50;
        gCanvas.height = window.innerWidth - 50;
    } else if (window.innerWidth <= 16 * 32) {
        gCanvas.width = 300;
        gCanvas.height = 300;
    } else if (window.innerWidth >= 16 * 42 && window.innerWidth < 16 * 66) {
        gCanvas.width = 450;
        gCanvas.height = 450;
    } else if (window.innerWidth >= 16 * 66) {
        gCanvas.width = 600;
        gCanvas.height = 600;
    }
    if (gMeme.selectedImgId === 0) return;
    drawImage(getImage(gMeme.selectedImgId));
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
    inputStr.forEach((word, index, thisArray) => {
        thisArray[index] = `(?=.*${word})`
    });
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

function renderMemeEditor() {
    const elMemeEditor = document.querySelector('.meme-editor');
    let strHTML = gMeme.txts.map(txt => {
        return `<div class="text-wrapper">
        <div class="text-add-div" onclick="onSetTxt('${txt.textId}')">
                <label for="add-text"> Write Meme </label>
                <input type="text" class="add-text" data-input-id="${txt.textId}" oninput="onDrawText('${txt.textId}')">
                <button class="add-text" onclick="onaddText()">+</button>
            </div>
            <div class="font-size-div"> 
                <label for="font-size-change">Font Size: </label>
                <input type="number" class="font-size-change" onchange="onChangeFontSize(this.value)" placeholder="10" min="10">
            </div>
            <div class="font-color-div">
                <label for="font-color-change">Font Color: </label>
                <input type="color" class="font-color-change" onchange="onChangeTextColor(this.value)">
            </div>
            <div class="font-color-div">
                <label for="border-color-change">Font Border Color:</label>
                <input type="color" class="border-color-change" onchange="onChangeTextBorderColor(this.value)">
            </div>
            <div class="change-font-div">
                <label>Change Font:</label>
                <select onchange="onChangeFont(this.value)">
                    <option selected="Impact">Impact</option>
                    <option value="eurofurence">Eurofurence</option>
                    <option value="ariel">Ariel</option>
                    <option value="tahoma">Tahoma</option>
                    <option value="acme">Acme</option>
                    <option value="bangers">Bangers</option>
                    <option value="satisfy">Satisfy</option>
                    <option value="lato">Lato</option>
                </select>
            </div>
            <div class="clear-canvas">
                <button class="clear-canvas-btn" onclick="clearCanvas()">Clear Meme Editor</button>
            </div>
            <div class="download-meme">
                <a class="download-link" href="#" onclick="downloadImg(this)" download="">Download</a>
            </div>
    </div>`
    });
    elMemeEditor.innerHTML = strHTML.join('');
}

function onAddText () {
    gMeme.txts.push(addText(`${++gTextCount}`));
    renderMemeEditor();
}