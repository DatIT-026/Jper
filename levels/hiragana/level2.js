(function () {
    // Game data
    const hiraganaVocals = [
        { letter: 'か', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/2/ka.mp3', reading: 'ka' },
        { letter: 'き', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/2/ki.mp3', reading: 'ki' },
        { letter: 'く', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/2/ku.mp3', reading: 'ku' },
        { letter: 'け', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/2/ke.mp3', reading: 'ke' },
        { letter: 'こ', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/2/ko.mp3', reading: 'ko' },
        { letter: 'が', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/2/ga.mp3', reading: 'ga' },
        { letter: 'ぎ', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/2/gi.mp3', reading: 'gi' },
        { letter: 'ぐ', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/2/gu.mp3', reading: 'gu' },
        { letter: 'げ', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/2/ge.mp3', reading: 'ge' },
        { letter: 'ご', sound: 'https://datit-026.github.io/Jper/levels/sounds/vocals/2/go.mp3', reading: 'go' }
    ];

    let currentQuestion = 0;
    let totalQuestions = 10;
    let currentSound = null;
    let questions = [];

    const startHiraganaLevel2 = () => {
        currentQuestion = 0;
        questions = [];
        questions = [...hiraganaVocals].sort(() => Math.random() - 0.5);

        document.getElementById('levels-section').style.display = 'none';
        document.getElementById('game-section').style.display = 'block';
        document.getElementById('game-title').textContent = 'Hiragana Level 2';
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
                    unlockLevel('hiragana', 3);
                    returnToLevels();
                }, 50);
            } else {
                playCurrentSound();
            }
        } else {
            alert(`Failed! The correct answer was ${questions[currentQuestion].letter} (${correctReading}).`);
            returnToLevels();
        }
    }

    window.startHiraganaLevel2 = startHiraganaLevel2;
})();