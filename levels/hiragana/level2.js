(function () {
    // Game data
    const hiraganaVocals = [
        { letter: 'か', sound: '/levels/sounds/vocals/2/ka.mp3', reading: 'ka' },
        { letter: 'き', sound: '/levels/sounds/vocals/2/ki.mp3', reading: 'ki' },
        { letter: 'く', sound: '/levels/sounds/vocals/2/ku.mp3', reading: 'ku' },
        { letter: 'け', sound: '/levels/sounds/vocals/2/ke.mp3', reading: 'ke' },
        { letter: 'こ', sound: '/levels/sounds/vocals/2/ko.mp3', reading: 'ko' },
        { letter: 'が', sound: '/levels/sounds/vocals/2/ga.mp3', reading: 'ga' },
        { letter: 'ぎ', sound: '/levels/sounds/vocals/2/gi.mp3', reading: 'gi' },
        { letter: 'ぐ', sound: '/levels/sounds/vocals/2/gu.mp3', reading: 'gu' },
        { letter: 'げ', sound: '/levels/sounds/vocals/2/ge.mp3', reading: 'ge' },
        { letter: 'ご', sound: '/levels/sounds/vocals/2/go.mp3', reading: 'go' }
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
            console.log('Attempting to play sound:', questions[currentQuestion].sound);
            currentSound = new Audio(questions[currentQuestion].sound);
            currentSound.play().catch(err => {
                console.error('Error playing sound:', err);
            });
        }
    }

    const returnToLevels = () => {
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
                    alert('You finished the Level 2! Ready for the level 3?');
                    unlockLevel('hiragana', 3);
                    returnToLevels();
                }, 100);
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