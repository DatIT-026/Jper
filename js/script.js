let unlockedLevels = JSON.parse(localStorage.getItem('unlockedLevels')) || {
    hiragana: [1],
    katakana: [1], // Unlock Katakana Level 1 by default
    boss: []
};

const showLevels = (mode) => {
    const levelsSection = document.getElementById('levels-section');
    const levelsList = document.getElementById('levels-list');
    const modeTitle = document.getElementById('mode-title');

    document.querySelector('.menu').style.display = 'none';
    document.querySelector('h2').style.display = 'none';
    document.querySelector('p').style.display = 'none';
    levelsSection.style.display = 'block';

    modeTitle.textContent = mode === 'hiragana' ? 'Hiragana Levels' : mode === 'katakana' ? 'Katakana Levels' : 'Boss Fight Levels';

    const numLevels = mode === 'boss' ? 2 : 9; // 9 levels for Hiragana and Katakana, 2 for Boss
    levelsList.innerHTML = '';

    const isHiraganaLevel9Unlocked = unlockedLevels.hiragana.includes(9);
    const isKatakanaLevel9Unlocked = unlockedLevels.katakana.includes(9);

    for (let i = 1; i <= numLevels; i++) {
        const button = document.createElement('button');
        button.textContent = `Level ${i}`;
        
        // Determine if the level should be enabled
        let isLevelEnabled = false;
        if (mode === 'hiragana') {
            isLevelEnabled = unlockedLevels.hiragana.includes(i);
        } else if (mode === 'katakana') {
            isLevelEnabled = unlockedLevels.katakana.includes(i);
        } else if (mode === 'boss') {
            if (isHiraganaLevel9Unlocked && isKatakanaLevel9Unlocked) {
                isLevelEnabled = unlockedLevels.boss.includes(i);
            }
        }

        if (isLevelEnabled) {
            button.onclick = () => startLevel(mode, i);
        } else {
            button.disabled = true;
            if (mode === 'boss' && (!isHiraganaLevel9Unlocked || !isKatakanaLevel9Unlocked)) {
                button.title = 'Complete Hiragana Level 9 and Katakana Level 9 to unlock Boss Fight levels';
            }
        }
        levelsList.appendChild(button);
    }
};

const backToMenu = () => {
    document.getElementById('levels-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'none';
    document.querySelector('.menu').style.display = 'flex';
    document.querySelector('h2').style.display = 'block';
    document.querySelector('p').style.display = 'block';
};

const startLevel = (mode, level) => {
    if (mode === 'hiragana') {
        if (level === 1) {
            startHiraganaLevel1();
        } else if (level === 2) {
            startHiraganaLevel2();
        } else if (level === 3) {
            startHiraganaLevel3();
        } else if (level === 4) {
            startHiraganaLevel4();
        } else if (level === 5) {
            startHiraganaLevel5();
        } else if (level === 6) {
            startHiraganaLevel6();
        } else if (level === 7) {
            startHiraganaLevel7();
        } else if (level === 8) {
            startHiraganaLevel8();
        } else if (level === 9) {
            startHiraganaLevel9();
        }
    } else if (mode === 'katakana') {
        if (level === 1) {
            startKatakanaLevel1();
        } else if (level === 2) {
            startKatakanaLevel2();
        } else if (level === 3) {
            startKatakanaLevel3();
        } else if (level === 4) {
            startKatakanaLevel4();
        } else if (level === 5) {
            startKatakanaLevel5();
        } else if (level === 6) {
            startKatakanaLevel6();
        } else if (level === 7) {
            startKatakanaLevel7();
        } else if (level === 8) {
            startKatakanaLevel8();
        } else if (level === 9) {
            startHiraganaLevel9();
        }
    } else {
        alert(`Starting ${mode} Level ${level}! (Feature coming soon)`);
    }
};

const unlockLevel = (mode, level) => {
    if (!unlockedLevels[mode].includes(level)) {
        unlockedLevels[mode].push(level);
        // Save progress to localStorage
        localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));

        if (unlockedLevels.hiragana.includes(8) && unlockedLevels.katakana.includes(8) && !unlockedLevels.boss.includes(1)) {
            unlockedLevels.boss.push(1);
            localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));
        }
    }
};