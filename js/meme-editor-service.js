'use strict'

let gCurrMeme = {
    image: '01',
    text: 'text',
    fontSize: '16',
    fontColor: 'rgb(0, 0, 0)',
    fontFamily: '',
    fontStyle: 'inherit',
    textLocation: '0,0',
    textBorder: 'none',
}

//-----------------------------------------------

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

function fontChange(font) {
    gCurrMeme.fontFamily = font;
}
//------------------------------------------------

//FUNCTION - RENDER CAVAS