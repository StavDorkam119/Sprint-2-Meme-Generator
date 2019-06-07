'use strict'

let gImgs;


let gMeme = {
    image: 'imgs/004.jpg',
    text: 'text',
    fontSize: '16',
    fontColor: 'rgb(0, 0, 0)',
    fontFamily: 'eurofurence',
    fontStyle: 'none',
    textLocation: {x:'0', y:'0'},
    textBorder: 'none',
}

function createMeme(){
    var meme = {
        image: 'imgs/004.jpg',
        text: 'text',
        fontSize: '16',
        fontColor: 'rgb(0, 0, 0)',
        fontFamily: 'eurofurence',
        fontStyle: 'none',
        textLocation: {x:'0', y:'0'},
        textBorder: 'none',
    }
    return meme;
}
//-----------------------------------------------

function createImgTemplate(imageUrl, keywords) {
    //Return image object to push into Img Service Data;
    return  {
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

//FUNCTION - USER EDIT MEME 

function changeImage(img) {
    gMeme.image = img;

}

function changeText(str) {
    gMeme.text = str;
}

function changeFontSize(size){
    gMeme.fontSize = size;

}

function changeColor(color){ 
    gMeme.fontColor = color;
}

function changeFont(font) {
    gMeme.fontFamily = font;
}

function changeStyle(style) {
    gMeme.fontStyle = style;
}

function changeBorder(border) {
    gMeme.textBorder = border;
    console.log(gMeme)
}

function getMemeProp(){
    return gMeme;
}

function changeImage(imgPath){
    gMeme.image = imgPath;
}

//------------------------------------------------

//FUNCTION - RENDER CAVAS

