let unlockedLevels = JSON.parse(localStorage.getItem('unlockedLevels')) || {
    hiragana: [1],
    katakana: [1],
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

    modeTitle.textContent = mode === 'hiragana' ? 'Hiragana Levels' : mode === 'katakana' ? 'Katakana Levels' : 'Jper Level';

    const numLevels = mode === 'boss' ? 1 : 9; // 9 levels for Hiragana and Katakana, 1 for Boss
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
            // For boss mode, check if level is in unlockedLevels.boss
            isLevelEnabled = unlockedLevels.boss.includes(i);
            
            // Additional check for prerequisites for Boss level 1
            if (i === 1 && (!isHiraganaLevel9Unlocked || !isKatakanaLevel9Unlocked)) {
                isLevelEnabled = false;
            }
        }

        if (isLevelEnabled) {
            button.onclick = () => startLevel(mode, i);
            
            // Add active button styling for visual feedback
            button.classList.add('active-level');
        } else {
            button.disabled = true;
            if (mode === 'boss') {
                if (i === 1 && (!isHiraganaLevel9Unlocked || !isKatakanaLevel9Unlocked)) {
                    button.title = 'Complete Hiragana Level 9 and Katakana Level 9 to unlock Jper Level';
                }
            }
        }
        levelsList.appendChild(button);
    }
};

const backToMenu = () => {
    // Reset any UI elements before going back to menu
    if (document.getElementById('current-vocab') && document.getElementById('current-vocab').firstElementChild) {
        document.getElementById('current-vocab').firstElementChild.textContent = '';
        document.getElementById('current-vocab').firstElementChild.style.color = '#555';
    }
    
    // Clean up any game resources
    if (typeof cleanupGame === 'function') {
        cleanupGame();
    }
    
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
            startKatakanaLevel9();
        }
    } else if (mode === 'boss') {
        if (level === 1) startBossLevel1();
    } else {
        alert(`Starting ${mode} Level ${level}! (Feature coming soon)`);
    }
};

const unlockLevel = (mode, level) => {
    if (!unlockedLevels[mode].includes(level)) {
        unlockedLevels[mode].push(level);
        localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));

        if (unlockedLevels.hiragana.includes(8) && unlockedLevels.katakana.includes(8) && !unlockedLevels.boss.includes(1)) {
            unlockedLevels.boss.push(1);
            localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));
        }
    }
};




const isFullUnlocked = () => {
    const data = JSON.parse(localStorage.getItem('unlockedLevels')) || { hiragana: [], katakana: [], boss: [] };
    return data.boss.includes(1) && data.hiragana.includes(9) && data.katakana.includes(9);
};

const updateToggleButton = () => {
    const btn = document.getElementById('toggle-level-btn');
    if (!btn) return;

    if (isFullUnlocked()) {
        btn.innerHTML = '<span class="btn-icon">🔒</span> Lock All (Reset)';
        btn.style.color = '#cc0000';
    } else {
        btn.innerHTML = '<span class="btn-icon">💡</span> Unlock All Levels';
        btn.style.color = '#000';
    }
};

const toggleGameStatus = () => {
    if (isFullUnlocked()) {
        if (confirm("⚠️ RESET GAME: Are you sure you want to lock all levels and start over?")) {
            const defaultLevels = {
                hiragana: [1],
                katakana: [1],
                boss: []
            };
            localStorage.setItem('unlockedLevels', JSON.stringify(defaultLevels));
            localStorage.removeItem('maxLevel'); 
            alert("Reset complete! Game will reload...");
            location.reload();
        }
    } else {
        const allLevelsUnlocked = {
            hiragana: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            katakana: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            boss: [1]
        };
        localStorage.setItem('unlockedLevels', JSON.stringify(allLevelsUnlocked));
        alert("All levels unlocked! Reloading...");
        location.reload();
    }
};

updateToggleButton();

window.addEventListener('load', updateToggleButton);