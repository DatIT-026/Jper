const hiraganaSet = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ'];
const katakanaSet = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ'];
const combinedSet = [...hiraganaSet, ...katakanaSet];
const romajiMap = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
    'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so'
};
let sequence = [];
let playerSequence = [];
let currentRound = 1;
let turnsPerRound = [3, 4, 5];
let retryCount = 0;
let currentTurn = 0;
let isPlayerTurn = false;
let usedRomaji = new Set(); // Tracking used romaji to avoid hiragana/katakana duplication
let gameTimer = null;
let timeRemaining = 120; // 120 seconds timer for level 1
let timerDisplay = null;

function startBossLevel1() {
    document.getElementById('levels-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    document.getElementById('game-title').textContent = `Round ${currentRound}/3`;
    document.getElementById('current-vocab').style.display = 'block';
    document.getElementById('current-romaji').style.display = 'none';
    document.getElementById('replay-button').style.display = 'none';
    
    // Reset message to avoid "You Failed!" persisting
    document.getElementById('current-vocab').firstElementChild.textContent = '';
    document.getElementById('current-vocab').firstElementChild.style.color = '#555';
    
    // Remove question counter display
    document.querySelector('#game-section p').style.display = 'none';

    // Create timer display
    createTimerDisplay();
    
    resetGame();
    generateSequence();
    setupGameButtons();
    playRoundSound();
    
    // Start the timer
    startTimer();
    
    setTimeout(playSequence, 1000);
}

function createTimerDisplay() {
    // Check if timer display already exists
    if (!document.getElementById('timer-display')) {
        timerDisplay = document.createElement('div');
        timerDisplay.id = 'timer-display';
        timerDisplay.style.fontSize = '1.2em';
        timerDisplay.style.fontWeight = 'bold';
        timerDisplay.style.color = '#333';
        timerDisplay.style.margin = '10px 0';
        timerDisplay.style.padding = '5px';
        timerDisplay.style.borderRadius = '5px';
        timerDisplay.style.backgroundColor = '#f0f0f0';
        timerDisplay.textContent = `Time: ${timeRemaining}s`;
        
        // Insert timer before game buttons
        const gameButtons = document.getElementById('game-buttons');
        gameButtons.parentNode.insertBefore(timerDisplay, gameButtons);
    } else {
        timerDisplay = document.getElementById('timer-display');
        timerDisplay.textContent = `Time: ${timeRemaining}s`;
    }
}

function startTimer() {
    // Clear any existing timer
    if (gameTimer) {
        clearInterval(gameTimer);
    }
    
    // Reset time
    timeRemaining = 120;
    timerDisplay.textContent = `Time: ${timeRemaining}s`;
    
    // Start new timer
    gameTimer = setInterval(() => {
        timeRemaining--;
        
        // Update display
        timerDisplay.textContent = `Time: ${timeRemaining}s`;
        
        // Change color when time is running low
        if (timeRemaining <= 30) {
            timerDisplay.style.color = 'red';
        }
        
        // Check if time is up
        if (timeRemaining <= 0) {
            clearInterval(gameTimer);
            document.getElementById('current-vocab').firstElementChild.textContent = 'Time is up! You failed!';
            document.getElementById('current-vocab').firstElementChild.style.color = 'red';
            playWrongSound();
            setTimeout(() => {
                backToMenu();
            }, 2000);
        }
    }, 1000);
}

function resetGame() {
    sequence = [];
    playerSequence = [];
    currentRound = 1;
    currentTurn = 0;
    retryCount = 0;
    isPlayerTurn = false;
    usedRomaji.clear(); // Clear the set of used romaji
    
    // Reset timer if it exists
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    
    updateUI();
}

// Get a character that doesn't share romaji with any already used character
function getUniqueCharacter() {
    // Create a pool of available characters that don't have romaji already used
    let availableChars = combinedSet.filter(char => !usedRomaji.has(romajiMap[char]));
    
    // If all romaji are used, reset the usedRomaji set
    if (availableChars.length === 0) {
        usedRomaji.clear();
        availableChars = combinedSet;
    }
    
    // Pick a random character from available ones
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    const selectedChar = availableChars[randomIndex];
    
    // Add its romaji to the used set
    usedRomaji.add(romajiMap[selectedChar]);
    
    return selectedChar;
}

// Get extra characters that are unique for final round
function getExtraCharacters(count) {
    const extras = [];
    for (let i = 0; i < count; i++) {
        extras.push(getUniqueCharacter());
    }
    return extras;
}

// Modified to generate full sequence at the start of each round
function generateSequence() {
    sequence = [];
    
    // Generate full sequence for the round with unique romaji characters
    const turnCount = turnsPerRound[currentRound - 1];
    for (let i = 0; i < turnCount; i++) {
        sequence.push(getUniqueCharacter());
    }
}

// Modified to play sequence up to the current turn with faster timing in the final round
function playSequence() {
    let index = 0;
    const sequenceToPlay = sequence.slice(0, currentTurn + 1); // Only play up to current turn + 1
    
    // Set the delay between characters - faster in the final round
    const delay = currentRound === 3 ? 900 : 1000; // 10% faster in the final round
    
    document.getElementById('current-vocab').firstElementChild.textContent = '';
    const displayInterval = setInterval(() => {
        if (index >= sequenceToPlay.length) {
            clearInterval(displayInterval);
            isPlayerTurn = true;
            document.getElementById('current-vocab').firstElementChild.textContent = 'Your turn! Enter the sequence.';
            document.getElementById('current-vocab').firstElementChild.style.color = '#555';
            toggleButtons(true);
            return;
        }
        document.getElementById('current-vocab').firstElementChild.textContent = romajiMap[sequenceToPlay[index]];
        document.getElementById('current-vocab').firstElementChild.style.color = '#555';
        playSound(sequenceToPlay[index]);
        index++;
    }, delay);
}

function playSound(character) {
    const romaji = romajiMap[character];
    const audio = new Audio(`sounds/vocals/special/${romaji}.mp3`);
    audio.play().catch(err => console.log(err));
}

function playRoundSound() {
    const audio = new Audio(`sounds/tracks/round${currentRound}.mp3`);
    audio.play().catch(err => console.log(err));
}

function playCorrectSound() {
    const audio = new Audio(`sounds/tracks/correctpattern.mp3`);
    audio.play().catch(err => console.log(err));
}

function playWrongSound() {
    const audio = new Audio(`sounds/tracks/wrongpattern.mp3`);
    audio.play().catch(err => console.log(err));
}

// Modified to play both win.mp3 and correctpattern.mp3
function playWinSound() {
    const correctAudio = new Audio(`sounds/tracks/correctpattern.mp3`);
    const winAudio = new Audio(`sounds/tracks/win.mp3`);
    
    correctAudio.play().catch(err => console.log(err));
    setTimeout(() => {
        winAudio.play().catch(err => console.log(err));
    }, 100); // Small delay to slightly stagger the sounds
}

// New function to play both sounds at round completion
function playRoundCompleteSound() {
    const correctAudio = new Audio(`sounds/tracks/correctpattern.mp3`);
    const winAudio = new Audio(`sounds/tracks/win.mp3`);
    
    correctAudio.play().catch(err => console.log(err));
    setTimeout(() => {
        winAudio.play().catch(err => console.log(err));
    }, 100);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Modified to include all characters from the full sequence and extra buttons in final round
function setupGameButtons() {
    const gameButtons = document.getElementById('game-buttons');
    gameButtons.innerHTML = '';
    
    // Use the full sequence for the buttons
    let uniqueChars = [...new Set(sequence)];
    
    // Add extra buttons in the final round (total 6 buttons)
    if (currentRound === 3 && uniqueChars.length < 6) {
        const extraNeeded = 6 - uniqueChars.length;
        const extraChars = getExtraCharacters(extraNeeded);
        uniqueChars = [...uniqueChars, ...extraChars];
    }
    
    const shuffledChars = shuffleArray(uniqueChars);
    
    // Create buttons for each unique character
    shuffledChars.forEach(character => {
        const button = document.createElement('button');
        button.textContent = character;
        button.disabled = true;
        
        // Add visual feedback for button press
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
            button.style.boxShadow = '0 1px 2px rgba(0,0,0,0.3)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
        
        button.addEventListener('click', () => playerInput(character));
        gameButtons.appendChild(button);
    });
}

function toggleButtons(enabled) {
    const buttons = document.querySelectorAll('#game-buttons button');
    buttons.forEach(button => {
        button.disabled = !enabled;
    });
}

// Modified to check only the current turn's sequence
function playerInput(character) {
    if (!isPlayerTurn) return;

    playerSequence.push(character);
    const sequenceToCheck = sequence.slice(0, currentTurn + 1);
    const currentIndex = playerSequence.length - 1;

    if (playerSequence[currentIndex] !== sequenceToCheck[currentIndex]) {
        if (retryCount === 0) {
            document.getElementById('current-vocab').firstElementChild.textContent = 'Wrong!';
            document.getElementById('current-vocab').firstElementChild.style.color = 'red';
            playWrongSound();
            retryCount++;
            playerSequence = [];
            isPlayerTurn = false;
            toggleButtons(false);
            setTimeout(playSequence, 1000);
        } else {
            document.getElementById('current-vocab').firstElementChild.textContent = 'You failed';
            document.getElementById('current-vocab').firstElementChild.style.color = 'red';
            playWrongSound();
            
            // Clear the timer
            if (gameTimer) {
                clearInterval(gameTimer);
                gameTimer = null;
            }
            
            setTimeout(() => {
                backToMenu();
            }, 2000);
        }
    } else if (playerSequence.length === sequenceToCheck.length) {
        retryCount = 0;
        
        // If we've completed the full sequence for this round
        if (currentTurn + 1 >= turnsPerRound[currentRound - 1]) {
            if (currentRound === 3) {
                // Clear the timer
                if (gameTimer) {
                    clearInterval(gameTimer);
                    gameTimer = null;
                }
                
                document.getElementById('current-vocab').firstElementChild.textContent = `Congratulations! You defeated the Boss!`;
                document.getElementById('current-vocab').firstElementChild.style.color = 'green';
                playWinSound(); // Already plays both sounds
                unlockLevel('boss', 2);
                setTimeout(() => {
                    backToMenu();
                }, 2000);
                return;
            }
            
            document.getElementById('current-vocab').firstElementChild.textContent = `Finished Round ${currentRound}`;
            document.getElementById('current-vocab').firstElementChild.style.color = 'green';
            // Play both sounds when a round is completed
            playRoundCompleteSound();
            currentRound++;
            currentTurn = 0;
            setTimeout(() => {
                document.getElementById('game-title').textContent = `Round ${currentRound}/3`;
                playerSequence = [];
                isPlayerTurn = false;
                toggleButtons(false);
                usedRomaji.clear(); // Reset used romaji for new round
                generateSequence();
                setupGameButtons();
                playRoundSound();
                setTimeout(playSequence, 1000);
            }, 1000);
        } else {
            // Move to next turn within the same round
            document.getElementById('current-vocab').firstElementChild.textContent = 'Correct';
            document.getElementById('current-vocab').firstElementChild.style.color = 'green';
            playCorrectSound();
            currentTurn++;
            playerSequence = [];
            isPlayerTurn = false;
            toggleButtons(false);
            setTimeout(() => {
                document.getElementById('game-title').textContent = `Round ${currentRound}/3`;
                playSequence(); // Play the next part of the sequence
            }, 1000);
        }
    }
    updateUI();
}

function updateUI() {
    document.getElementById('game-title').textContent = `Round ${currentRound}/3`;
}

// Clean up when leaving the game
function cleanupGame() {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}