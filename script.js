// Ensure that when the etension is closed and reopened, the letters persist
document.addEventListener("DOMContentLoaded", () => {
	persist();
})

// Check dictionary text file for possible words and sort by word length
document.getElementById('enter').onclick = () => {
	getWords();
}

// Populate HTML with one random word
document.getElementById('getRandom').onclick = () => {
	getRandom();
}

// Populate HTML with all possible four-lettered words
document.getElementById('getFourLettered').onclick = () => {
	getFourLettered();
}

// Populate HTML with all possible five-lettered words
document.getElementById('getFiveLettered').onclick = () => {
	getFiveLettered();
}

// Populate HTML with all possible six-lettered words
document.getElementById('getSixLettered').onclick = () => {
	getSixLettered();
}

// Reset local storage with reset button
document.getElementById('reset').onclick = () => {
	clearData();
}



function persist() {

	let beeLetters = JSON.parse(window.localStorage.getItem('beeletters'));

	document.getElementById('letter2').value = beeLetters[0];
	document.getElementById('letter3').value = beeLetters[1];
	document.getElementById('letter4').value = beeLetters[2];
	document.getElementById('letter5').value = beeLetters[3];
	document.getElementById('letter6').value = beeLetters[4];
	document.getElementById('letter7').value = beeLetters[5];
	const centerLetter = document.getElementById('center-letter').value = beeLetters[6];

}


function getWords() {

	const letter2 = document.getElementById('letter2').value;
	const letter3 = document.getElementById('letter3').value;
	const letter4 = document.getElementById('letter4').value;
	const letter5 = document.getElementById('letter5').value;
	const letter6 = document.getElementById('letter6').value;
	const letter7 = document.getElementById('letter7').value;
	const centerLetter = document.getElementById('center-letter').value;

	let beeLetters = [letter2, letter3, letter4, letter5, letter6, letter7, centerLetter];

	window.localStorage.setItem('beeletters', JSON.stringify(beeLetters));

	let hasCenterLetter = 1;
	let hasCorrectLetter = 1;
	let correctWord = "";
	four_letters = [];
	five_letters = [];
	six_letters = [];

	fetch('dictionary.txt')
		.then((res) => res.text())
		.then((data) => {
			let words = data.split('\n');
			for (var i = 0; i < words.length; ++i) {
				for (var j = 0; j < words[i].length; ++j) {
					let letter = words[i][j]
					for (var k = 0; k < beeLetters.length; ++k) {
						if (letter == beeLetters[k]) {
							hasCorrectLetter = 0;
							if (centerLetter == beeLetters[k]) {
								hasCenterLetter = 0;
							}
						}
					}
					if (hasCorrectLetter == 1) {
						correctWord = "";
					} else {
						correctWord += letter;
					}
					hasCorrectLetter = 1;
				}
				if (words[i].length == correctWord.length && hasCenterLetter == 0) {
					if (correctWord.length == 4) {
						four_letters.push(correctWord);
					} else if (correctWord.length == 5) {
						five_letters.push(correctWord);
					} else {
						six_letters.push(correctWord);
					}
				}
				correctWord = "";
				hasCenterLetter = 1;
			}
			
			// Add possible words to local storage by word length
			window.localStorage.setItem('4letterword', JSON.stringify(four_letters));
			window.localStorage.setItem('5letterword', JSON.stringify(five_letters));
			window.localStorage.setItem('6letterword', JSON.stringify(six_letters));

		})
		.catch((err) => console.log(err))

}

// Retrieve current four, five and six lettered word arrays from storage
function parseJSON() {
	// Initialize arrays of four, five and six letter words
	let four_letters = [];
	let five_letters = [];
	let six_letters = [];
	four_letters = JSON.parse(window.localStorage.getItem('4letterword'));
	five_letters = JSON.parse(window.localStorage.getItem('5letterword'));
	six_letters = JSON.parse(window.localStorage.getItem('6letterword'));
}

function getRandom() {
	parseJSON();
	document.getElementById('randomWord').innerHTML = " ";
	allWords = four_letters.concat(five_letters, six_letters);
	let randomElement = allWords[Math.floor(Math.random() * allWords.length)];
	if (randomElement == undefined) {
		return;
	}
	document.getElementById('randomWord').innerHTML += `<p>${randomElement} </p>`;
}

function getFourLettered() {
	parseJSON();
	document.getElementById('fourLetters').innerHTML = " ";
	for (var m in four_letters) {
		document.getElementById('fourLetters').innerHTML += `<li> ${four_letters[m]} </li>`;
	}
}

function getFiveLettered() {
	parseJSON();
	document.getElementById('fiveLetters').innerHTML = " ";
	console.log(five_letters);
	for (var m = 0; m < five_letters.length; ++m) {
		document.getElementById('fiveLetters').innerHTML += `<li> ${five_letters[m]} </li>`;
	}
}

function getSixLettered() {
	parseJSON();
	document.getElementById('sixPlusLetters').innerHTML = " ";
	for (var m = 0; m < six_letters.length; ++m) {
		document.getElementById('sixPlusLetters').innerHTML += `<li> ${six_letters[m]} </li>`;
	}
}

function clearData() {

	window.localStorage.clear();

	four_letters = [];
	five_letters = [];
	six_letters = [];

	document.getElementById('randomWord').innerHTML = ``;

	document.getElementById('letter2').value = '';
	document.getElementById('letter3').value = '';
	document.getElementById('letter4').value = '';
	document.getElementById('letter5').value = '';
	document.getElementById('letter6').value = '';
	document.getElementById('letter7').value = '';
	document.getElementById('center-letter').value = '';

	document.getElementById('fourLetters').innerHTML = ``;
	document.getElementById('fiveLetters').innerHTML = ``;
	document.getElementById('sixPlusLetters').innerHTML = ``;
}