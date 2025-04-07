(function () {
    // Game data
    const hiraganaVocals = [
        { letter: 'あ', sound: '/levels/sounds/vocals/1/a.mp3', reading: 'a' },
        { letter: 'い', sound: '/levels/sounds/vocals/1/i.mp3', reading: 'i' },
        { letter: 'う', sound: '/levels/sounds/vocals/1/u.mp3', reading: 'u' },
        { letter: 'え', sound: '/levels/sounds/vocals/1/e.mp3', reading: 'e' },
        { letter: 'お', sound: '/levels/sounds/vocals/1/o.mp3', reading: 'o' }
    ];

    let currentQuestion = 0;
    let totalQuestions = 5;
    let currentSound = null;
    let questions = [];

    const startHiraganaLevel1 = () => {
        currentQuestion = 0;
        questions = [];

        // Shuffle the hiraganaVocals array to create a random order without repetition
        questions = [...hiraganaVocals].sort(() => Math.random() - 0.5);

        document.getElementById('levels-section').style.display = 'none';
        document.getElementById('game-section').style.display = 'block';
        document.getElementById('game-title').textContent = 'Hiragana Level 1';
        document.getElementById('game-question').textContent = currentQuestion;
        document.getElementById('total-questions').textContent = totalQuestions;

        const gameButtons = document.getElementById('game-buttons');
        gameButtons.innerHTML = '';
        hiraganaVocals.forEach(vocal => {
            const button = document.createElement('button');
            button.textContent = vocal.letter;
            button.onclick = () => checkAnswer(vocal.reading);
            gameButtons.appendChild(button);
        });

        playCurrentSound();
    }

    const playCurrentSound = () => {
        if (currentQuestion < totalQuestions) {
            // Stop the previous sound if it exists
            if (currentSound) {
                currentSound.pause();
                currentSound.currentTime = 0; // Reset the audio to the beginning
            }

            console.log('Attempting to play sound:', questions[currentQuestion].sound);
            currentSound = new Audio(questions[currentQuestion].sound);
            currentSound.play().catch(err => {
                console.error('Error playing sound:', err);
            });
        }
    }

    const returnToLevels = () => {
        // Stop the sound when returning to levels
        if (currentSound) {
            currentSound.pause();
            currentSound.currentTime = 0;
        }
        document.getElementById('game-section').style.display = 'none';
        document.getElementById('levels-section').style.display = 'block';
        showLevels('hiragana');
    }

    const checkAnswer = (selectedReading) => {
        const correctReading = questions[currentQuestion].reading;
        if (selectedReading === correctReading) {
            currentQuestion++;
            document.getElementById('game-question').textContent = currentQuestion;

            if (currentQuestion === totalQuestions) {
                setTimeout(() => {
                    alert('Correct!');
                    unlockLevel('hiragana', 2);
                    returnToLevels();
                }, 500);
            } else {
                playCurrentSound();
            }
        } else {
            alert(`Failed! The correct answer was ${questions[currentQuestion].letter} (${correctReading}).`);
            returnToLevels();
        }
    }

    // Expose startHiraganaLevel1 to the global scope
    window.startHiraganaLevel1 = startHiraganaLevel1;
})();