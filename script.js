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
        let dictionary = data.split('\n');
        dictionary.forEach(iterateWords);

        function iterateWords (dictionary) {
            let letters = dictionary.split('');
            letters.forEach(checkLetters);

            function checkLetters (letters) {
           
                beeLetters.forEach(checkForMatch);

                function checkForMatch (beeLetters) {
                    console.log(beeLetters);
                    console.log(letters);
                    // if includes correct letter 
                    if (beeLetters == letters) {
                        hasCorrectLetter = 0;
                        if (centerLetter == letters) {
                            hasCenterLetter = 0;
                        }   
                    }
                }
                if (hasCorrectLetter == 1) {
                    let correctWord = "";
                    return;
                }

                else {
                    correctWord += letters;
                }
                hasCorrectLetter = 1;
                }
            
            if (letters.length >= 4 && letters.length == correctWord.length && hasCenterLetter == 0) { 
                correctWords.push(correctWord);
            }
            correctWord = "";
            hasCenterLetter = 1;
        }
        let answers = document.getElementById('other-answers').innerHTML = correctWords;
    })
    .catch((err) => console.log(err))

}
