// Hiragana Levels
(function () {
    // Game data for all Hiragana levels
    const hiraganaLevels = {
        1: [
            { letter: 'あ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/1/a.mp3', reading: 'a' },
            { letter: 'い', sound: 'https://datit-026.github.io/Jper/sounds/vocals/1/i.mp3', reading: 'i' },
            { letter: 'う', sound: 'https://datit-026.github.io/Jper/sounds/vocals/1/u.mp3', reading: 'u' },
            { letter: 'え', sound: 'https://datit-026.github.io/Jper/sounds/vocals/1/e.mp3', reading: 'e' },
            { letter: 'お', sound: 'https://datit-026.github.io/Jper/sounds/vocals/1/o.mp3', reading: 'o' }
        ],
        2: [
            { letter: 'か', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ka.mp3', reading: 'ka' },
            { letter: 'き', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ki.mp3', reading: 'ki' },
            { letter: 'く', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ku.mp3', reading: 'ku' },
            { letter: 'け', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ke.mp3', reading: 'ke' },
            { letter: 'こ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ko.mp3', reading: 'ko' },
            { letter: 'が', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ga.mp3', reading: 'ga' },
            { letter: 'ぎ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/gi.mp3', reading: 'gi' },
            { letter: 'ぐ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/gu.mp3', reading: 'gu' },
            { letter: 'げ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ge.mp3', reading: 'ge' },
            { letter: 'ご', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/go.mp3', reading: 'go' }
        ],
        3: [
            { letter: 'さ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/sa.mp3', reading: 'sa' },
            { letter: 'し', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/shi.mp3', reading: 'shi' },
            { letter: 'す', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/su.mp3', reading: 'su' },
            { letter: 'せ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/se.mp3', reading: 'se' },
            { letter: 'そ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/so.mp3', reading: 'so' },
            { letter: 'ざ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/za.mp3', reading: 'za' },
            { letter: 'じ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/ji.mp3', reading: 'ji' },
            { letter: 'ず', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/zu.mp3', reading: 'zu' },
            { letter: 'ぜ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/ze.mp3', reading: 'ze' },
            { letter: 'ぞ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/zo.mp3', reading: 'zo' }
        ],
        4: [
            { letter: 'た', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/ta.mp3', reading: 'ta' },
            { letter: 'ち', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/chi.mp3', reading: 'chi' },
            { letter: 'つ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/tsu.mp3', reading: 'tsu' },
            { letter: 'て', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/te.mp3', reading: 'te' },
            { letter: 'と', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/to.mp3', reading: 'to' },
            { letter: 'だ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/da.mp3', reading: 'da' },
            { letter: 'ぢ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/gi.mp3', reading: 'gi' },
            { letter: 'づ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/giu.mp3', reading: 'giu' },
            { letter: 'で', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/de.mp3', reading: 'de' },
            { letter: 'ど', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/do.mp3', reading: 'do' }
        ],
        5: [
            { letter: 'な', sound: 'https://datit-026.github.io/Jper/sounds/vocals/5/na.mp3', reading: 'na' },
            { letter: 'に', sound: 'https://datit-026.github.io/Jper/sounds/vocals/5/ni.mp3', reading: 'ni' },
            { letter: 'ぬ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/5/nu.mp3', reading: 'nu' },
            { letter: 'ね', sound: 'https://datit-026.github.io/Jper/sounds/vocals/5/ne.mp3', reading: 'ne' },
            { letter: 'の', sound: 'https://datit-026.github.io/Jper/sounds/vocals/5/no.mp3', reading: 'no' }
        ],
        6: [
            { letter: 'は', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/ha.mp3', reading: 'ha' },
            { letter: 'ひ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/hi.mp3', reading: 'hi' },
            { letter: 'ふ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/fu.mp3', reading: 'fu' },
            { letter: 'へ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/he.mp3', reading: 'he' },
            { letter: 'ほ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/ho.mp3', reading: 'ho' },
            { letter: 'ば', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/ba.mp3', reading: 'ba' },
            { letter: 'び', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/bi.mp3', reading: 'bi' },
            { letter: 'ぶ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/bu.mp3', reading: 'bu' },
            { letter: 'べ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/be.mp3', reading: 'be' },
            { letter: 'ぼ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/bo.mp3', reading: 'bo' },
            { letter: 'ぱ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/pa.mp3', reading: 'pa' },
            { letter: 'ぴ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/pi.mp3', reading: 'pi' },
            { letter: 'ぷ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/pu.mp3', reading: 'pu' },
            { letter: 'ぺ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/pe.mp3', reading: 'pe' },
            { letter: 'ぽ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/po.mp3', reading: 'po' }
        ],
        7: [
            { letter: 'ま', sound: 'https://datit-026.github.io/Jper/sounds/vocals/7/ma.mp3', reading: 'ma' },
            { letter: 'み', sound: 'https://datit-026.github.io/Jper/sounds/vocals/7/mi.mp3', reading: 'mi' },
            { letter: 'む', sound: 'https://datit-026.github.io/Jper/sounds/vocals/7/mu.mp3', reading: 'mu' },
            { letter: 'め', sound: 'https://datit-026.github.io/Jper/sounds/vocals/7/me.mp3', reading: 'me' },
            { letter: 'も', sound: 'https://datit-026.github.io/Jper/sounds/vocals/7/mo.mp3', reading: 'mo' }
        ],
        8: [
            { letter: 'ら', sound: 'https://datit-026.github.io/Jper/sounds/vocals/8/ra.mp3', reading: 'ra' },
            { letter: 'り', sound: 'https://datit-026.github.io/Jper/sounds/vocals/8/ri.mp3', reading: 'ri' },
            { letter: 'る', sound: 'https://datit-026.github.io/Jper/sounds/vocals/8/ru.mp3', reading: 'ru' },
            { letter: 'れ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/8/re.mp3', reading: 're' },
            { letter: 'ろ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/8/ro.mp3', reading: 'ro' }
        ],
        9: [
            { letter: 'や', sound: 'https://datit-026.github.io/Jper/sounds/vocals/9/ya.mp3', reading: 'ya' },
            { letter: 'ゆ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/9/yu.mp3', reading: 'yu' },
            { letter: 'よ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/9/yo.mp3', reading: 'yo' },
            { letter: 'わ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/9/wa.mp3', reading: 'wa' },
            { letter: 'を', sound: 'https://datit-026.github.io/Jper/sounds/vocals/9/wo.mp3', reading: 'wo' },
            { letter: 'ん', sound: 'https://datit-026.github.io/Jper/sounds/vocals/9/n.mp3', reading: 'n' }
        ]
    };

    // Total questions per level
    const totalQuestionsPerLevel = {
        1: 5,
        2: 10,
        3: 10,
        4: 10,
        5: 5,
        6: 15,
        7: 5,
        8: 5,
        9: 6
    };

    let currentQuestion = 0;
    let totalQuestions = 0;
    let currentSound = null;
    let questions = [];

    const startHiraganaLevel = (level) => {
        currentQuestion = 0;
        questions = [];
        totalQuestions = totalQuestionsPerLevel[level] || 10; // Default to 10 if not specified
        questions = [...hiraganaLevels[level]].sort(() => Math.random() - 0.5);

        document.getElementById('levels-section').style.display = 'none';
        document.getElementById('game-section').style.display = 'block';
        document.getElementById('game-title').textContent = `Hiragana Level ${level}`;
        document.getElementById('game-question').textContent = currentQuestion;
        document.getElementById('total-questions').textContent = totalQuestions;

        const gameButtons = document.getElementById('game-buttons');
        gameButtons.innerHTML = '';
        hiraganaLevels[level].forEach(vocal => {
            const button = document.createElement('button');
            button.textContent = vocal.letter;
            button.onclick = () => checkAnswer(vocal.reading, level);
            gameButtons.appendChild(button);
        });

        // Set up the replay button
        const replayButton = document.getElementById('replay-button');
        replayButton.onclick = () => playCurrentSound();

        playCurrentSound();
        updateRomajiDisplay();
    };

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
    };

    const updateRomajiDisplay = () => {
        if (currentQuestion < totalQuestions) {
            document.getElementById('current-romaji').textContent = questions[currentQuestion].reading;
        } else {
            document.getElementById('current-romaji').textContent = '';
        }
    };

    const returnToLevels = () => {
        if (currentSound) {
            currentSound.pause();
            currentSound.currentTime = 0;
        }
        document.getElementById('game-section').style.display = 'none';
        document.getElementById('levels-section').style.display = 'block';
        document.getElementById('current-romaji').textContent = ''; // Clear romaji on exit
        showLevels('hiragana');
    };

    const checkAnswer = (selectedReading, level) => {
        const correctReading = questions[currentQuestion].reading;
        if (selectedReading === correctReading) {
            currentQuestion++;
            document.getElementById('game-question').textContent = currentQuestion;

            if (currentQuestion === totalQuestions) {
                setTimeout(() => {
                    alert('Congratulation! You did it 👏');
                    unlockLevel('hiragana', level + 1);
                    returnToLevels();
                }, 50);
            } else {
                playCurrentSound();
                updateRomajiDisplay();
            }
        } else {
            alert(`Wrong! The correct answer was ${questions[currentQuestion].letter} (${correctReading}).`);
            returnToLevels();
        }
    };

    // Expose start functions for each level
    window.startHiraganaLevel1 = () => startHiraganaLevel(1);
    window.startHiraganaLevel2 = () => startHiraganaLevel(2);
    window.startHiraganaLevel3 = () => startHiraganaLevel(3);
    window.startHiraganaLevel4 = () => startHiraganaLevel(4);
    window.startHiraganaLevel5 = () => startHiraganaLevel(5);
    window.startHiraganaLevel6 = () => startHiraganaLevel(6);
    window.startHiraganaLevel7 = () => startHiraganaLevel(7);
    window.startHiraganaLevel8 = () => startHiraganaLevel(8);
    window.startHiraganaLevel9 = () => startHiraganaLevel(9);
})();