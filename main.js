

const word = 'supersmelter'

const wordArray = word.split('').map(letter => letter.toLocaleUpperCase())
const guessArray = wordArray.map(letter => letter.toLocaleUpperCase())
// console.log('guessArray: ', guessArray)

const wordInputs = document.getElementById('guessword')
const alfhabetletters = document.getElementById('alfhabetletters')
// console.log('wordInputs: ', wordInputs);

function displayCharectors() {
    wordArray.forEach((value, index) => {
        const input = `<input type="text" maxlength="1" minlength="1" style="width: 2ch" oninput="verifyLetter(this)" onkeydown="goBackonDelte(event, this)" data-index="${index}" required pattern="[a-zA-Z]*" title="letter">`
        wordInputs.insertAdjacentHTML('beforeend', input)
    });
}

function displayLetters() {
    const danishLetters = ['A','B', 'C', 'D','E','F','G','H','I','J','K','L','M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Æ', 'Ø', 'Å']
    danishLetters.forEach((value) => {
        const input = `<button title="${value}" onclick="checkLetter(this)">${value}</button>`
        alfhabetletters.insertAdjacentHTML('beforeend', input)
    });
}


function verifyLetter(letter) {

    if (wordArray[letter.dataset.index] === letter.value) {
        console.log('Correct', letter.value)
        message(`${letter.value} findes x gange i ordet`)
        letter?.nextSibling?.focus?.()
    } else if(!isEmpty(letter.value) && wordArray[letter.dataset.index] !== letter.value) {
        letter.classList.add('invalid-letter')
        message(`${letter.value} fandtes ikke i ordet`)
    } else {
        letter.classList.remove('invalid-letter')
    }
}

function checkLetter(letter) {
    if (hasLetter(letter.textContent)) {
        (wordArray.reduce((acc, value, index) => {
            if (letter.textContent === value) acc.push(index)
            return acc 
        }, []))
        .forEach(indexItem => {
            console.log('indexItem: ', indexItem);
            console.log('letter.textContent: ', letter.textContent);
            wordInputs.children[indexItem].value = letter.textContent
        })

        
        wordInputs
    } else {
        disableElement(letter)
    }
}

function disableElement(element) {
    element.setAttribute('disabled', '')
}

function hasLetter(letter) {
    console.log('letter: ', wordArray.includes(letter), wordArray)
    return wordArray.includes(letter)
}

function goBackonDelte(e, element) {
    if (!isEmpty(element.value)) return
    if (e.code === 'Backspace' || e.which === 8) {
        element?.previousSibling?.focus?.()
    }
}

function isEmpty(value) {
    return !!value == false
}

function message(txt) {
    console.log('txt: ', txt);
    const message = document.getElementById('message')
    message.textContent = txt
}

//  Init
displayCharectors()
displayLetters()
