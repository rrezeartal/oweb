const words = ['mama', 'just', 'killed', 'man', 'gun', 'head', 'pulled', 'trigger', 'now', 'dead']; 
let chosenWord;
let displayedWord;
let attemptsLeft = 5;
let guessedLetters = [];

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function revealTwoLetters() {
    const wordLength = chosenWord.length;
    const randomIndexes = [];

    while (randomIndexes.length < 2) {
        const randIndex = Math.floor(Math.random() * wordLength);
        if (!randomIndexes.includes(randIndex)) {
            randomIndexes.push(randIndex);
        }
    }

    return randomIndexes;
}

function initializeGame() {
    chosenWord = getRandomWord();
    const randomIndexes = revealTwoLetters(); 
    
    displayedWord = chosenWord.split('').map((letter, index) => {
        return randomIndexes.includes(index) ? letter : '_'; 
    }).join(' '); 

    attemptsLeft = 5;
    guessedLetters = [];
    document.getElementById('word-display').textContent = displayedWord;
    document.getElementById('attempts').textContent = attemptsLeft;
    document.getElementById('result').textContent = '';
    document.getElementById('letter-input').value = '';
    document.getElementById('check-btn').disabled = false;
    document.getElementById('restart-btn').style.display = 'none';
}

function checkGuess() {
    const letter = document.getElementById('letter-input').value.toLowerCase();

    if (letter === '') {
        alert('Type in a letter!');
        return;
    }

    if (guessedLetters.includes(letter)) {
        alert('Oopsie! You already guessed that letter. Try again!');
        return;
    }

    guessedLetters.push(letter);

    if (chosenWord.includes(letter)) {
        let updatedWord = '';
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter) {
                updatedWord += letter;
            } else {
                updatedWord += displayedWord[i * 2]; 
            }
        }
        displayedWord = updatedWord.split('').join(' '); 
        document.getElementById('word-display').textContent = displayedWord;

        if (displayedWord.replace(/ /g, '') === chosenWord) { 
            setTimeout(() => {
                alert('Ding ding ding! You cracked the word!');
                document.getElementById('check-btn').disabled = true;
                document.getElementById('restart-btn').style.display = 'block';
            }, 100);
        }
    } else {
        attemptsLeft--;
        document.getElementById('attempts').textContent = attemptsLeft;
        if (attemptsLeft === 0) {
            setTimeout(() => {
                alert(`Better luck next time! The word was: ${chosenWord}`); 
                document.getElementById('check-btn').disabled = true;
                document.getElementById('restart-btn').style.display = 'block';
            }, 100);
        }
    }

    document.getElementById('letter-input').value = '';
}

document.getElementById('check-btn').addEventListener('click', checkGuess, false);

document.getElementById('restart-btn').addEventListener('click', initializeGame, false);

initializeGame();
