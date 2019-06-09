'use strict'

let gImgs;
let gKeywords;
//the current word, the user edit 
let gTextCount;

let gMeme;

function addText(id){
    return {
        textValue: '',
        textId: id,
        fontSize: '40',
        fontColor: '#fff',
        fontFamily: 'Impact',
        textCoords: null,
        textBorderColor: '#000', 
        textAlign: 'center',
        textBaseLine: 'middle',
        textWidth: null,
        draw: function () {
            gCtx.fillStyle = this.fontColor;
            gCtx.strokeStyle = this.textBorderColor;
            if (this.textWidth.width > gCanvas.width - 50) this.fontSize *= 0.8;

            gCtx.font = this.fontSize + 'px ' + this.fontFamily;
    
            gCtx.textAlign = this.textAlign;
            gCtx.textBaseline = this.textBaseLine;
            gCtx.fillText(this.textValue, this.textCoords.x, this.textCoords.y);
            gCtx.strokeText(this.textValue, this.textCoords.x, this.textCoords.y);
        }
}
}

function getGMemeDefault () {
     return {
        selectedImgId: 0,
        txts: [addText('1')]
    }
}

function getImage(id) {
    return document.querySelector(`[data-img-id="${id}"]`);
}
//-----------------------------------------------

function createImgTemplate(imageUrl, keywords) {
    //Return image object to push into Img Service Data;
    return {
        id: makeId(),
        imageUrl: imageUrl,
        keywords: keywords.split(' '),
    }
}

function gImgsDefault() {
    return [
        createImgTemplate('imgs/2.jpg', 'look no fucks fuck given sound music'),
        createImgTemplate('imgs/003.jpg', 'trump Trump angry aggravated'),
        createImgTemplate('imgs/004.jpg', 'dogs cute lick happy puppy puppies'),
        createImgTemplate('imgs/005.jpg', 'cute puppy dog baby sleeping bed tired'),
        createImgTemplate('imgs/5.jpg', 'baby success awesome great'),
        createImgTemplate('imgs/006.jpg', 'cat sleeping cute laptop'),
        createImgTemplate('imgs/8.jpg', 'willy Willy wonka Wonka tell me more again problem'),
        createImgTemplate('imgs/9.jpg', 'baby laughing funny evil diabolical scheme mischevious'),
        createImgTemplate('imgs/12.jpg', 'pointing old do what would Haim Hacat haim hacat'),
        createImgTemplate('imgs/Ancient-Aliens.jpg', 'ancient aliens crazy hair history genius'),
        createImgTemplate('imgs/drevil.jpg', 'dr. evil sarcastic quotation marks'),
        createImgTemplate('imgs/meme1.jpg', 'lawrence fishburne matrix neo what if told you i I revelation'),
        createImgTemplate('imgs/One-Does-Not-Simply.jpg', 'lotr Lord of the Rings one does not simply walk into mordor Mordor'),
    ];
}


function getKeywordsData() {
    return gImgs.reduce((acc, img) => {
        img.keywords.forEach(keyword => {
            if (!acc[keyword]) acc[keyword] = 1;
            else acc[keyword]++;
        });
        return acc;
    }, {});
}
// function editorDefaults () {
//     return {

//     }
// }

//FUNCTION - USER EDIT MEME 

function setSelectedText(id) {
    gMeme.selectedText = id;
}

function changeImage(img) {
    gMeme.selectedImgId = img;
}

function changeText(str) {
    gMeme.txts[gCurrWord].text = str;
}

function changeTextSize(size) {
    let txt = gMeme.txts[+gMeme.selectedTxt]
    txt.fontSize = size;
    return txt;
}

function changeTextColor(color) {
    let txt = gMeme.txts[+gMeme.selectedTxt]
    txt.fontColor = `${color}`;
    return txt;
}

function changeFont(font) {
    let txt = gMeme.txts[+gMeme.selectedTxt]
    txt.fontFamily = `${font}`;
    return txt;
}

function changeTextBorderColor(borderColor) {
    let txt = gMeme.txts[+gMeme.selectedTxt]
    txt.textBorderColor = `${borderColor}`;
    return txt;
}


//------------------------------------------------

function getImgUrlById(imgId){
    var image = gImgs.find(img=>{
        if (imgId === img.id) return img.imageUrl
    })
    return image
}

function getImgIdByUrl(imgUrl){
    var image = gImgs.find(img=>{
        if (imgUrl === img.imageUrl) return img.id
    })
    return image
}

//------------------------------------------------

//FUNCTION - RENDER CAVAS

function setTextPosition(x, y, width, height) {
    let textCoords = {
        leftUp: { x: x, y: y + height },
        leftDown: {x: x, y: y},
        rightUp: {x: x + width, y: y + height},
        rightDown: {x: x+width, y: y}
    }   
    gMeme.txts[gCurrWord].textCoords = textCoords;
}

function sortKeywords() {
    let sortedKeywords = Object.entries(gKeywords);
    sortedKeywords.sort((a, b) => b[1] - a[1]);
    return sortedKeywords;
}