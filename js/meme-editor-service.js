'use strict'

let gCurrMeme = {
    image: '01',
    text: 'text',
    fontSize: '16',
    fontColor: 'rgb(0, 0, 0)',
    fontFamily: 'eurofurence',
    fontStyle: 'none',
    textLocation: {x:'0', y:'0'},
    textBorder: 'none',
}

let gImgs = [
    createImgTemplate()
];


//-----------------------------------------------

function createImgTemplate(image) {
    return  {
        id: makeId(),
        image: '01',
        text: 'text',
        fontSize: '16',
        fontColor: 'rgb(0, 0, 0)',
        fontFamily: 'eurofurence',
        fontStyle: 'none',
        textLocation: {x:'0', y:'0'},
        textBorder: 'none',
    }
}


//FUNCTION - USER EDIT MEME 

function changeImage(img) {
    gCurrMeme.image = img;
}

function changeText(str) {
    gCurrMeme.text = str;
}

function changeFontSize(size){
    gCurrMeme.fontSize = size;
}

function changeColor(color){ 
    gCurrMeme.fontColor = color;
}

function changeFont(font) {
    gCurrMeme.fontFamily = font;
}

function changeStyle(style) {
    gCurrMeme.fontStyle = style;
}

function changeBorder(border) {
    gCurrMeme.textBorder = border;
}

function getMemeProp(){
    return gCurrMeme;
}


//------------------------------------------------

//FUNCTION - RENDER CAVAS

