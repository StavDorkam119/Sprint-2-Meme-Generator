'use strict'

let gImgs;
let gKeywords;
//the current word, the user edit 
let gCurrTextIdx = 0;


let gMeme = {
    selectedImgUrl: 0,
    txts: [{
        text: '',
        fontSize: '50',
        fontColor: '#fff',
        fontFamily: 'eurofurence',
        textLocation: { x: '', y: '', textWidth: '' },
        textBorderColor: 'rgb(0, 0, 0)',
    }]
}

function addText(canvas) {
    var text = {
        text: '',
        fontSize: '50',
        fontColor: '#fff',
        fontFamily: 'eurofurence',
        textLocation: { x: canvas.width / 2, y: canvas.height / 2, textWidth: '' },
        textBorderColor: 'rgb(0, 0, 0)',
    }

    gCurrTextIdx++
    gMeme.txts.push(text);
}

function resetMeme(canvas) {
    gMeme = {
        selectedImgUrl: 0,
        txts: [{
            text: '',
            fontSize: '50',
            fontColor: '#fff',
            fontFamily: 'eurofurence',
            textLocation: { x: canvas.width / 2, y: canvas.height / 2, textWidth: '' },
            textBorderColor: 'rgb(0, 0, 0)',
        }]
    }
    gCurrTextIdx = 0;
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
        createImgTemplate('imgs/3.jpg', 'trump world leader angry aggravated president'),
        createImgTemplate('imgs/4.jpg', 'dogs cute lick happy puppy puppies'),
        createImgTemplate('imgs/5.jpg', 'cute puppy dog baby sleeping bed tired'),
        createImgTemplate('imgs/6.jpg', 'baby success awesome great'),
        createImgTemplate('imgs/7.jpg', 'cat sleeping cute laptop'),
        createImgTemplate('imgs/8.jpg', 'willy Willy wonka Wonka tell me again problem'),
        createImgTemplate('imgs/9.jpg', 'baby laughing funny evil diabolical scheme mischevious'),
        createImgTemplate('imgs/10.jpg', 'pointing old haim hacat what would you do'),
        createImgTemplate('imgs/11.jpg', 'jersey shore douchbag stupid why come on'),
        createImgTemplate('imgs/12.jpg', 'ancient aliens crazy hair history genius'),
        createImgTemplate('imgs/13.jpg', 'dr. evil sarcastic quotation marks'),
        createImgTemplate('imgs/14.jpg', 'african children young dancing starving funny hahaha face baby'),
        createImgTemplate('imgs/15.jpg', 'trump world leader damn grind grinds my gears president angry aggravated finger in air'),
        createImgTemplate('imgs/16.jpg', 'baby cute big eyes funny adorable haha'),
        createImgTemplate('imgs/17.jpg', 'dog puppy funny strecth streching french bulldog ugly cute adorable'),
        createImgTemplate('imgs/18.jpg', 'barack obama laughing tears joke inside president world leader'),
        createImgTemplate('imgs/19.jpg', 'basketball guys kissing awkward okay nba player players'),
        createImgTemplate('imgs/20.jpg', 'leo leonardo di caprio great gatsby cheers congrats congratulations toast'),
        createImgTemplate('imgs/21.jpg', 'lawrence fishburne matrix neo what if told you revelation'),
        createImgTemplate('imgs/22.jpg', 'lotr Lord of the Rings one does not simply walk into mordor'),
        createImgTemplate('imgs/23.jpg', 'oprah winfrey get a car show the talkshow excited ecstatic'),
        createImgTemplate('imgs/24.jpg', 'captain kirk picard star trek oh snap you\'re trouble screwed comeback'),
        createImgTemplate('imgs/25.jpg', 'putin president russia manly man bearkiller world leader are in trouble you\'re'),
        createImgTemplate('imgs/26.jpg', 'buzz lightyear woody tom hanks tim allen toy story everywhere'),
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

//---------------------------------------------

//FUNCTION - USER EDIT MEME 

function changeImage(img) {
    gMeme.selectedImgUrl = img;
}

function changeText(str) {
    gMeme.txts[gCurrTextIdx].text = str;
}

function changeFontSize(size) {
    gMeme.txts[gCurrTextIdx].fontSize = size;
}

function changeColor(color) {
    gMeme.txts[gCurrTextIdx].fontColor = color;
}

function changeFont(font) {
    gMeme.txts[gCurrTextIdx].fontFamily = font;
}

function changeTextBorderColor(borderColor) {
    gMeme.txts[gCurrTextIdx].textBorderColor = borderColor;
}

function getMemeProp() {
    return [gMeme, gCurrTextIdx];
}

//------------------------------------------------

//FUNCTIONS FIND IMAGE BY ID/URL 

function getImgUrlById(imgId) {
    var image = gImgs.find(img => {
        if (imgId === img.id) return img.imageUrl
    })
    return image
}

function getImgIdByUrl(imgUrl) {
    var image = gImgs.find(img => {
        if (imgUrl === img.imageUrl) return img.id
    })
    return image
}

//------------------------------------------------

//FUNCTION - RENDER CAVAS

function setTextPosition(x, y, textWidth, text) {
    text = text || gMeme.txts[gCurrTextIdx]
    console.log(gMeme.txts[gCurrTextIdx]);
    console.log(text);
    console.log(gMeme);
    
    
    
    let textLocation = { x: x, y: y, width: textWidth }
    text.textLocation = textLocation;
}

function checkClickedWord(x, y) {
    let selectedWord = gMeme.txts.find(text => {

        let leftUp = { x: (text.textLocation.x - text.textLocation.width / 2), y: (text.textLocation.y + text.fontSize / 2) }
        let rightDown = { x: (text.textLocation.x + text.textLocation.width / 2), y: (text.textLocation.y - text.fontSize / 2) }

        if (leftUp.x <= x && x <= rightDown.x && leftUp.y >= y && rightDown.y <= y) return text;
    })

    if (selectedWord) {
        selectedWord.textLocation.x = x;
        selectedWord.textLocation.y = y;
        renderCanvas()
    }
}

function sortKeywords() {
    let sortedKeywords = Object.entries(gKeywords);
    sortedKeywords.sort((a, b) => b[1] - a[1]);
    return sortedKeywords;
}