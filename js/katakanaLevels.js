// Katakana Levels
(function () {
    // Game data for all Katakana levels
    const katakanaLevels = {
        1: [
            { letter: 'ア', sound: 'https://datit-026.github.io/Jper/sounds/vocals/1/a.mp3', reading: 'a' },
            { letter: 'イ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/1/i.mp3', reading: 'i' },
            { letter: 'ウ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/1/u.mp3', reading: 'u' },
            { letter: 'エ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/1/e.mp3', reading: 'e' },
            { letter: 'オ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/1/o.mp3', reading: 'o' }
        ],
        2: [
            { letter: 'カ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ka.mp3', reading: 'ka' },
            { letter: 'キ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ki.mp3', reading: 'ki' },
            { letter: 'ク', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ku.mp3', reading: 'ku' },
            { letter: 'ケ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ke.mp3', reading: 'ke' },
            { letter: 'コ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ko.mp3', reading: 'ko' },
            { letter: 'ガ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ga.mp3', reading: 'ga' },
            { letter: 'ギ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/gi.mp3', reading: 'gi' },
            { letter: 'グ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/gu.mp3', reading: 'gu' },
            { letter: 'ゲ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/ge.mp3', reading: 'ge' },
            { letter: 'ゴ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/2/go.mp3', reading: 'go' }
        ],
        3: [
            { letter: 'サ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/sa.mp3', reading: 'sa' },
            { letter: 'シ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/shi.mp3', reading: 'shi' },
            { letter: 'ス', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/su.mp3', reading: 'su' },
            { letter: 'セ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/se.mp3', reading: 'se' },
            { letter: 'ソ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/so.mp3', reading: 'so' },
            { letter: 'ザ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/za.mp3', reading: 'za' },
            { letter: 'ジ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/ji.mp3', reading: 'ji' },
            { letter: 'ズ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/zu.mp3', reading: 'zu' },
            { letter: 'ゼ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/ze.mp3', reading: 'ze' },
            { letter: 'ゾ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/3/zo.mp3', reading: 'zo' }
        ],
        4: [
            { letter: 'タ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/ta.mp3', reading: 'ta' },
            { letter: 'チ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/chi.mp3', reading: 'chi' },
            { letter: 'ツ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/tsu.mp3', reading: 'tsu' },
            { letter: 'テ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/te.mp3', reading: 'te' },
            { letter: 'ト', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/to.mp3', reading: 'to' },
            { letter: 'ダ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/da.mp3', reading: 'da' },
            { letter: 'ヂ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/gi.mp3', reading: 'gi' },
            { letter: 'ヅ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/giu.mp3', reading: 'giu' },
            { letter: 'デ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/de.mp3', reading: 'de' },
            { letter: 'ド', sound: 'https://datit-026.github.io/Jper/sounds/vocals/4/do.mp3', reading: 'do' }
        ],
        5: [
            { letter: 'ナ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/5/na.mp3', reading: 'na' },
            { letter: 'ニ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/5/ni.mp3', reading: 'ni' },
            { letter: 'ヌ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/5/nu.mp3', reading: 'nu' },
            { letter: 'ネ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/5/ne.mp3', reading: 'ne' },
            { letter: 'ノ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/5/no.mp3', reading: 'no' }
        ],
        6: [
            { letter: 'ハ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/ha.mp3', reading: 'ha' },
            { letter: 'ヒ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/hi.mp3', reading: 'hi' },
            { letter: 'フ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/fu.mp3', reading: 'fu' },
            { letter: 'ヘ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/he.mp3', reading: 'he' },
            { letter: 'ホ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/ho.mp3', reading: 'ho' },
            { letter: 'バ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/ba.mp3', reading: 'ba' },
            { letter: 'ビ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/bi.mp3', reading: 'bi' },
            { letter: 'ブ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/bu.mp3', reading: 'bu' },
            { letter: 'ベ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/be.mp3', reading: 'be' },
            { letter: 'ボ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/bo.mp3', reading: 'bo' },
            { letter: 'パ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/pa.mp3', reading: 'pa' },
            { letter: 'ピ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/pi.mp3', reading: 'pi' },
            { letter: 'プ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/pu.mp3', reading: 'pu' },
            { letter: 'ペ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/pe.mp3', reading: 'pe' },
            { letter: 'ポ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/6/po.mp3', reading: 'po' }
        ],
        7: [
            { letter: 'マ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/7/ma.mp3', reading: 'ma' },
            { letter: 'ミ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/7/mi.mp3', reading: 'mi' },
            { letter: 'ム', sound: 'https://datit-026.github.io/Jper/sounds/vocals/7/mu.mp3', reading: 'mu' },
            { letter: 'メ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/7/me.mp3', reading: 'me' },
            { letter: 'モ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/7/mo.mp3', reading: 'mo' }
        ],
        8: [
            { letter: 'ラ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/8/ra.mp3', reading: 'ra' },
            { letter: 'リ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/8/ri.mp3', reading: 'ri' },
            { letter: 'ル', sound: 'https://datit-026.github.io/Jper/sounds/vocals/8/ru.mp3', reading: 'ru' },
            { letter: 'レ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/8/re.mp3', reading: 're' },
            { letter: 'ロ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/8/ro.mp3', reading: 'ro' }
        ],
        9: [
            { letter: 'ヤ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/9/ya.mp3', reading: 'ya' },
            { letter: 'ユ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/9/yu.mp3', reading: 'yu' },
            { letter: 'ヨ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/9/yo.mp3', reading: 'yo' },
            { letter: 'ワ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/9/wa.mp3', reading: 'wa' },
            { letter: 'ヲ', sound: 'https://datit-026.github.io/Jper/sounds/vocals/9/wo.mp3', reading: 'wo' },
            { letter: 'ン', sound: 'https://datit-026.github.io/Jper/sounds/vocals/9/n.mp3', reading: 'n' }
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

    const startKatakanaLevel = (level) => {
        currentQuestion = 0;
        questions = [];
        totalQuestions = totalQuestionsPerLevel[level] || 10; // Default to 10 if not specified
        questions = [...katakanaLevels[level]].sort(() => Math.random() - 0.5);

        document.getElementById('levels-section').style.display = 'none';
        document.getElementById('game-section').style.display = 'block';
        document.getElementById('game-title').textContent = `Katakana Level ${level}`;
        document.getElementById('game-question').textContent = currentQuestion;
        document.getElementById('total-questions').textContent = totalQuestions;

        const gameButtons = document.getElementById('game-buttons');
        gameButtons.innerHTML = '';
        katakanaLevels[level].forEach(vocal => {
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
        showLevels('katakana');
    };

    const checkAnswer = (selectedReading, level) => {
        const correctReading = questions[currentQuestion].reading;
        if (selectedReading === correctReading) {
            currentQuestion++;
            document.getElementById('game-question').textContent = currentQuestion;

            if (currentQuestion === totalQuestions) {
                setTimeout(() => {
                    alert('Congratulation! You did it 👏');
                    unlockLevel('katakana', level + 1);
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
    window.startKatakanaLevel1 = () => startKatakanaLevel(1);
    window.startKatakanaLevel2 = () => startKatakanaLevel(2);
    window.startKatakanaLevel3 = () => startKatakanaLevel(3);
    window.startKatakanaLevel4 = () => startKatakanaLevel(4);
    window.startKatakanaLevel5 = () => startKatakanaLevel(5);
    window.startKatakanaLevel6 = () => startKatakanaLevel(6);
    window.startKatakanaLevel7 = () => startKatakanaLevel(7);
    window.startKatakanaLevel8 = () => startKatakanaLevel(8);
    window.startKatakanaLevel9 = () => startKatakanaLevel(9);
})();