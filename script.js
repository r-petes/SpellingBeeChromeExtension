function getWords() {

const letter2 = document.getElementById('letter2').value;
const letter3 = document.getElementById('letter3').value;
const letter4 = document.getElementById('letter4').value;
const letter5 = document.getElementById('letter5').value;
const letter6 = document.getElementById('letter6').value;
const letter7 = document.getElementById('letter7').value;

const centerLetter = document.getElementById('center-letter').value;

let beeLetters = [letter2, letter3, letter4, letter5, letter6, letter7, centerLetter];

let correctWords = [];
let hasCenterLetter = 1;
let hasCorrectLetter = 1;
let correctWord = "";

    fetch('dictionary.txt')
    .then((res) => res.text())
    .then((data) => {
        console.log(data);
        let words = data.split('\n');
        console.log(words);

        for (var i = 0; i < words.length; ++i) {
            for (var j = 0; j < words[i].length; ++j) {
                let letter = words[i][j]
                for (var k = 0; k < beeLetters.length; ++k) {
                    if (letter == beeLetters[k])
                    {
                        hasCorrectLetter = 0;
                        if (centerLetter == beeLetters[k]) {
                            hasCenterLetter = 0;
                            }   
                    }
                } 
                if (hasCorrectLetter == 1) {
                    correctWord = "";
                }
                else {
                    correctWord += letter;
                }
                hasCorrectLetter = 1;  
            }
            if (words[i].length == correctWord.length && hasCenterLetter == 0) { 
                correctWords.push(correctWord);
            }
            correctWord = "";
            hasCenterLetter = 1;
        }

    document.getElementById('other-answers').innerHTML += correctWords;

    })
    .catch((err) => console.log(err))
}


