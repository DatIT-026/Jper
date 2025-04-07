(function () {
    // Game data
    const hiraganaVocals = [
        { letter: 'さ', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/3/sa.mp3', reading: 'sa' },
        { letter: 'し', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/3/shi.mp3', reading: 'shi' },
        { letter: 'す', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/3/su.mp3', reading: 'su' },
        { letter: 'せ', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/3/se.mp3', reading: 'se' },
        { letter: 'そ', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/3/so.mp3', reading: 'so' },
        { letter: 'ざ', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/3/za.mp3', reading: 'za' },
        { letter: 'じ', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/3/ji.mp3', reading: 'ji' },
        { letter: 'ず', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/3/zu.mp3', reading: 'zu' },
        { letter: 'ぜ', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/3/ze.mp3', reading: 'ze' },
        { letter: 'ぞ', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/3/zo.mp3', reading: 'zo' }
    ];

    let currentQuestion = 0;
    let totalQuestions = 10;
    let currentSound = null;
    let questions = [];

    const startHiraganaLevel3 = () => {
        currentQuestion = 0;
        questions = [];
        questions = [...hiraganaVocals].sort(() => Math.random() - 0.5);

        document.getElementById('levels-section').style.display = 'none';
        document.getElementById('game-section').style.display = 'block';
        document.getElementById('game-title').textContent = 'Hiragana Level 3';
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
            if (currentSound) {
                currentSound.pause();
                currentSound.currentTime = 0;
            }

            console.log('Attempting to play sound:', questions[currentQuestion].sound);
            currentSound = new Audio(questions[currentQuestion].sound);
            currentSound.play().catch(err => {
                console.error('Error playing sound:', err);
            });
        }
    }

    const returnToLevels = () => {
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
                    unlockLevel('hiragana', 4);
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

    window.startHiraganaLevel3 = startHiraganaLevel3;
})();