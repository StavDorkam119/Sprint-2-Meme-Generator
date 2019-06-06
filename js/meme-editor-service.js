'use strict'

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

