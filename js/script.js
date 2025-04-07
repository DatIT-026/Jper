let unlockedLevels = JSON.parse(localStorage.getItem('unlockedLevels')) || {
    hiragana: [1],
    katakana: [],
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

    const numLevels = mode === 'boss' ? 2 : 10;
    levelsList.innerHTML = '';

    const isHiraganaLevel10Unlocked = unlockedLevels.hiragana.includes(10);
    const isKatakanaLevel10Unlocked = unlockedLevels.katakana.includes(10);

    for (let i = 1; i <= numLevels; i++) {
        const button = document.createElement('button');
        button.textContent = `Level ${i}`;
        
        // Determine if the level should be enabled
        let isLevelEnabled = false;
        if (mode === 'hiragana') {
            isLevelEnabled = unlockedLevels.hiragana.includes(i);
        } else if (mode === 'katakana') {
            if (isHiraganaLevel10Unlocked) {
                isLevelEnabled = unlockedLevels.katakana.includes(i);
            }
        } else if (mode === 'boss') {
            if (isHiraganaLevel10Unlocked && isKatakanaLevel10Unlocked) {
                isLevelEnabled = unlockedLevels.boss.includes(i);
            }
        }

        if (isLevelEnabled) {
            button.onclick = () => startLevel(mode, i);
        } else {
            button.disabled = true;
            if (mode === 'katakana' && !isHiraganaLevel10Unlocked) {
                button.title = 'Complete Hiragana Level 10 to unlock Katakana levels';
            } else if (mode === 'boss' && (!isHiraganaLevel10Unlocked || !isKatakanaLevel10Unlocked)) {
                button.title = 'Complete Hiragana Level 10 and Katakana Level 10 to unlock Boss Fight levels';
            }
        }
        levelsList.appendChild(button);
    }
}

const backToMenu = () => {
    document.getElementById('levels-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'none';
    document.querySelector('.menu').style.display = 'flex';
    document.querySelector('h2').style.display = 'block';
    document.querySelector('p').style.display = 'block';
}

const startLevel = (mode, level) => {
    if (mode === 'hiragana') {
        if (level === 1) {
            startHiraganaLevel1();
        } else if (level === 2) {
            startHiraganaLevel2();
        } else if (level === 3) {
            startHiraganaLevel3();
        } else {
            alert(`Starting ${mode} Level ${level}! (Feature coming soon)`);
        }
    } else {
        alert(`Starting ${mode} Level ${level}! (Feature coming soon)`);
    }
}

const unlockLevel = (mode, level) => {
    if (!unlockedLevels[mode].includes(level)) {
        unlockedLevels[mode].push(level);
        // Save progress to localStorage
        localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));

        if (mode === 'hiragana' && level === 10) {
            if (!unlockedLevels.katakana.includes(1)) {
                unlockedLevels.katakana.push(1);
                localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));
            }
        }

        if (mode === 'katakana' && level === 10) {
            if (unlockedLevels.hiragana.includes(10) && !unlockedLevels.boss.includes(1)) {
                unlockedLevels.boss.push(1);
                localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));
            }
        }
    }
}