const hiraganaSet = [
    'あ', 'い', 'う', 'え', 'お', 
    'か', 'き', 'く', 'け', 'こ', 
    'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'な', 'に', 'ぬ', 'ね', 'の',
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も',
    'や', 'ゆ', 'よ',
    'ら', 'り', 'る', 'れ', 'ろ',
    'わ', 'を', 'ん'
];

const katakanaSet = [
    'ア', 'イ', 'ウ', 'エ', 'オ', 
    'カ', 'キ', 'ク', 'ケ', 'コ', 
    'サ', 'シ', 'ス', 'セ', 'ソ',
    'タ', 'チ', 'ツ', 'テ', 'ト',
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
    'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    'マ', 'ミ', 'ム', 'メ', 'モ',
    'ヤ', 'ユ', 'ヨ',
    'ラ', 'リ', 'ル', 'レ', 'ロ',
    'ワ', 'ヲ', 'ン'
];

const combinedSet = [...hiraganaSet, ...katakanaSet];
const romajiMap = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',

    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
    'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
    'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
    'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
    'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
    'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
    'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
    'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
    'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n'
};

let sequence = [];
let playerSequence = [];
let currentRound = 1;
let turnsPerRound = [3, 4, 5, 6, 7];
let retryCount = 0;
let currentTurn = 0;
let isPlayerTurn = false;
let usedRomaji = new Set(); // Tracking used romaji to avoid hiragana/katakana duplication
let gameTimer = null;
let timeRemaining = 150; // 150 seconds timer
let timerDisplay = null;
let backgroundMusicTimer = null;
let backgroundMusic = null;

// Function to stop background music
function stopBackgroundMusic() {
    if (backgroundMusic && !backgroundMusic.paused) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
    
    if (backgroundMusicTimer) {
        clearTimeout(backgroundMusicTimer);
    }
}

// Function to stop all audio
function stopAllAudio() {
    stopBackgroundMusic();
    const allAudio = document.querySelectorAll('audio');
    allAudio.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

function startBossLevel1() {
    // Stop background music when entering a level
    stopBackgroundMusic();
    
    // Play boss fight background music
    backgroundMusic = new Audio('https://datit-026.github.io/Jper/sounds/tracks/ppl2ost.mp3');
    backgroundMusic.volume = 0.3;
    backgroundMusic.loop = true; // Loop music during the boss fight
    backgroundMusic.play().catch(err => console.log("Error playing boss fight music:", err));

    document.getElementById('levels-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    document.getElementById('game-title').textContent = `Round ${currentRound}/5`;
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
    if (!document.getElementById('timer-display-container')) {
        // Create outer container
        const timerContainer = document.createElement('div');
        timerContainer.id = 'timer-display-container';
        timerContainer.style.margin = '10px 0';
        timerContainer.style.width = '100%';
        timerContainer.style.height = '40px';
        timerContainer.style.position = 'relative';
        timerContainer.style.backgroundColor = '#f0f0f0';
        timerContainer.style.borderRadius = '6px';
        timerContainer.style.overflow = 'hidden';
        timerContainer.style.border = '1px solid #ddd';
        
        // Create progress bar (starts empty, will grow)
        const progressBar = document.createElement('div');
        progressBar.id = 'timer-progress-bar';
        progressBar.style.height = '100%';
        progressBar.style.width = '0%'; // Starts at 0% and grows
        progressBar.style.backgroundColor = '#28a745'; // Green
        progressBar.style.position = 'absolute';
        progressBar.style.left = '0';
        progressBar.style.top = '0';
        progressBar.style.transition = 'width 1s linear';
        progressBar.style.zIndex = '1';
        
        // Create text display that's always visible (positioned on top of progress bar)
        const timerText = document.createElement('div');
        timerText.id = 'timer-text';
        timerText.style.position = 'absolute';
        timerText.style.zIndex = '2';
        timerText.style.width = '100%';
        timerText.style.height = '100%';
        timerText.style.display = 'flex';
        timerText.style.justifyContent = 'center';
        timerText.style.alignItems = 'center';
        timerText.style.fontSize = '1.2em';
        timerText.style.fontWeight = 'bold';
        timerText.style.color = '#333';
        timerText.textContent = `Time: ${timeRemaining}s`;
        
        // Assemble the components
        timerContainer.appendChild(progressBar);
        timerContainer.appendChild(timerText);
        
        // Insert timer before game buttons
        const gameButtons = document.getElementById('game-buttons');
        gameButtons.parentNode.insertBefore(timerContainer, gameButtons);
    } else {
        // Reset existing timer elements
        document.getElementById('timer-progress-bar').style.width = '0%';
        document.getElementById('timer-progress-bar').style.backgroundColor = '#28a745';
        document.getElementById('timer-text').textContent = `Time: ${timeRemaining}s`;
    }
}

function startTimer() {
    // Clear any existing timer
    if (gameTimer) {
        clearInterval(gameTimer);
    }
    
    // Reset time
    timeRemaining = 150;
    const totalTime = timeRemaining;
    
    // Get references to timer elements
    const progressBar = document.getElementById('timer-progress-bar');
    const timerText = document.getElementById('timer-text');
    
    // Initialize display
    progressBar.style.width = '0%';
    progressBar.style.backgroundColor = '#28a745'; // Green
    timerText.textContent = `Time: ${timeRemaining}s`;
    
    // Start new timer
    gameTimer = setInterval(() => {
        timeRemaining--;
        
        // Update text display
        timerText.textContent = `Time: ${timeRemaining}s`;
        
        // Update progress bar - increasing from left to right
        const percentElapsed = ((totalTime - timeRemaining) / totalTime) * 100;
        progressBar.style.width = `${percentElapsed}%`;
        
        // Change color when time is running low
        if (timeRemaining <= 30) {
            progressBar.style.backgroundColor = '#dc3545'; // Red
        }
        
        // Check if time is up
        if (timeRemaining <= 0) {
            clearInterval(gameTimer);
            document.getElementById('current-vocab').firstElementChild.textContent = 'Time is up!';
            document.getElementById('current-vocab').firstElementChild.style.color = 'red';
            playWrongSound();
            showFailedPopup("Time Out!");
        }
    }, 1000);
}

// Create custom popup for failure
function showFailedPopup(message) {
    // Stop all audio
    stopAllAudio();
    
    // Hide romaji
    document.getElementById('current-vocab').style.display = 'none';
    
    // Disable buttons
    toggleButtons(false);
    
    // Create the popup overlay
    const popupOverlay = document.createElement('div');
    popupOverlay.style.position = 'fixed';
    popupOverlay.style.top = '0';
    popupOverlay.style.left = '0';
    popupOverlay.style.width = '100%';
    popupOverlay.style.height = '100%';
    popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    popupOverlay.style.display = 'flex';
    popupOverlay.style.justifyContent = 'center';
    popupOverlay.style.alignItems = 'center';
    popupOverlay.style.zIndex = '1000';
    
    // Create the popup content
    const popupContent = document.createElement('div');
    popupContent.style.backgroundColor = 'white';
    popupContent.style.padding = '30px';
    popupContent.style.borderRadius = '15px';
    popupContent.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    popupContent.style.textAlign = 'center';
    popupContent.style.maxWidth = '400px';
    popupContent.style.width = '80%';
    
    // Create message
    const popupTitle = document.createElement('h2');
    popupTitle.textContent = 'You Failed! Practice more';
    popupTitle.style.color = '#dc3545';
    popupTitle.style.marginBottom = '15px';
    
    const popupMessage = document.createElement('p');
    popupMessage.textContent = message || 'Back to menu!';
    popupMessage.style.fontSize = '18px';
    popupMessage.style.marginBottom = '25px';
    
    // Create back to levels button
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to menu';
    backButton.style.padding = '12px 24px';
    backButton.style.fontSize = '16px';
    backButton.style.backgroundColor = '#007bff';
    backButton.style.color = 'white';
    backButton.style.border = 'none';
    backButton.style.borderRadius = '8px';
    backButton.style.cursor = 'pointer';
    backButton.style.transition = 'background-color 0.3s';
    
    backButton.addEventListener('mouseover', () => {
        backButton.style.backgroundColor = '#0056b3';
    });
    
    backButton.addEventListener('mouseout', () => {
        backButton.style.backgroundColor = '#007bff';
    });
    
    backButton.addEventListener('click', () => {
        document.body.removeChild(popupOverlay);
        backToMenu();
    });
    
    // Assemble popup
    popupContent.appendChild(popupTitle);
    popupContent.appendChild(popupMessage);
    popupContent.appendChild(backButton);
    popupOverlay.appendChild(popupContent);
    
    // Add popup to body
    document.body.appendChild(popupOverlay);
}

// Create custom popup for congratulations
function showCongratulationsPopup() {
    // Stop all audio
    stopAllAudio();
    
    // Hide romaji
    document.getElementById('current-vocab').style.display = 'none';
    
    // Disable buttons
    toggleButtons(false);
    
    // Create the popup overlay
    const popupOverlay = document.createElement('div');
    popupOverlay.style.position = 'fixed';
    popupOverlay.style.top = '0';
    popupOverlay.style.left = '0';
    popupOverlay.style.width = '100%';
    popupOverlay.style.height = '100%';
    popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    popupOverlay.style.display = 'flex';
    popupOverlay.style.justifyContent = 'center';
    popupOverlay.style.alignItems = 'center';
    popupOverlay.style.zIndex = '1000';
    
    // Create the popup content
    const popupContent = document.createElement('div');
    popupContent.style.backgroundColor = 'white';
    popupContent.style.padding = '30px';
    popupContent.style.borderRadius = '15px';
    popupContent.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    popupContent.style.textAlign = 'center';
    popupContent.style.maxWidth = '400px';
    popupContent.style.width = '80%';
    
    // Create congratulations message
    const popupTitle = document.createElement('h2');
    popupTitle.textContent = 'Congratulations!';
    popupTitle.style.color = '#28a745';
    popupTitle.style.marginBottom = '15px';
    
    const popupMessage = document.createElement('p');
    popupMessage.textContent = 'Wow! You did it!';
    popupMessage.style.fontSize = '18px';
    popupMessage.style.marginBottom = '25px';
    
    // Create back to levels button
    const backButton = document.createElement('button');
    backButton.textContent = 'Return to Level Selection';
    backButton.style.padding = '12px 24px';
    backButton.style.fontSize = '16px';
    backButton.style.backgroundColor = '#007bff';
    backButton.style.color = 'white';
    backButton.style.border = 'none';
    backButton.style.borderRadius = '8px';
    backButton.style.cursor = 'pointer';
    backButton.style.transition = 'background-color 0.3s';
    
    backButton.addEventListener('mouseover', () => {
        backButton.style.backgroundColor = '#0056b3';
    });
    
    backButton.addEventListener('mouseout', () => {
        backButton.style.backgroundColor = '#007bff';
    });
    
    backButton.addEventListener('click', () => {
        document.body.removeChild(popupOverlay);
        backToMenu();
    });
    
    // Assemble popup
    popupContent.appendChild(popupTitle);
    popupContent.appendChild(popupMessage);
    popupContent.appendChild(backButton);
    popupOverlay.appendChild(popupContent);
    
    // Add popup to body
    document.body.appendChild(popupOverlay);
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

// Modified to play sequence up to the current turn with faster timing in later rounds
function playSequence() {
    let index = 0;
    const sequenceToPlay = sequence.slice(0, currentTurn + 1); // Only play up to current turn + 1
    
    // Set the delay between characters - faster in rounds 3, 4, and 5
    const delay = currentRound >= 3 ? 500 : 1000;
    
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
    const audio = new Audio(`https://datit-026.github.io/Jper/sounds/vocals/special/${romaji}.mp3`);
    audio.play().catch(err => console.log(err));
}

function playRoundSound() {
    const audio = new Audio(`https://datit-026.github.io/Jper/sounds/tracks/round${currentRound}.mp3`);
    audio.play().catch(err => console.log(err));
}

function playCorrectSound() {
    const audio = new Audio(`https://datit-026.github.io/Jper/sounds/tracks/correctpattern.mp3`);
    audio.play().catch(err => console.log(err));
}

function playWrongSound() {
    const audio = new Audio(`https://datit-026.github.io/Jper/sounds/tracks/wrongpattern.mp3`);
    audio.play().catch(err => console.log(err));
}

// Modified to play both win.mp3 and correctpattern.mp3
function playWinSound() {
    const correctAudio = new Audio(`https://datit-026.github.io/Jper/sounds/tracks/correctpattern.mp3`);
    const winAudio = new Audio(`https://datit-026.github.io/Jper/sounds/tracks/win.mp3`);
    
    correctAudio.play().catch(err => console.log(err));
    setTimeout(() => {
        winAudio.play().catch(err => console.log(err));
    }, 100); // Small delay to slightly stagger the sounds
}

// New function to play both sounds at round completion
function playRoundCompleteSound() {
    const correctAudio = new Audio(`https://datit-026.github.io/Jper/sounds/tracks/correctpattern.mp3`);
    const winAudio = new Audio(`https://datit-026.github.io/Jper/sounds/tracks/win.mp3`);
    
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

// Modified to ensure fixed number of buttons for each round to increase difficulty
function setupGameButtons() {
    const gameButtons = document.getElementById('game-buttons');
    gameButtons.innerHTML = '';
    
    // Use the full sequence for the buttons
    let uniqueChars = [...new Set(sequence)];
    
    // Define target number of buttons for each round
    const targetButtonCounts = {
        1: 4, // Round 1
        2: 5, 
        3: 6, 
        4: 7, 
        5: 8  
    };
    
    const targetCount = targetButtonCounts[currentRound];
    
    // Add extra buttons if needed to reach the target count
    if (uniqueChars.length < targetCount) {
        const extraNeeded = targetCount - uniqueChars.length;
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
            document.getElementById('current-vocab').firstElementChild.textContent = 'You Failed! Aghhh! Is that you?';
            document.getElementById('current-vocab').firstElementChild.style.color = 'red';
            playWrongSound();
            
            // Clear the timer
            if (gameTimer) {
                clearInterval(gameTimer);
                gameTimer = null;
            }
            
            setTimeout(() => {
                showFailedPopup("You Failed! If you find this too difficult, just give up!");
            }, 1000);
        }
    } else if (playerSequence.length === sequenceToCheck.length) {
        retryCount = 0;
        
        // If we've completed the full sequence for this round
        if (currentTurn + 1 >= turnsPerRound[currentRound - 1]) {
            if (currentRound === 5) {
                // Clear the timer
                if (gameTimer) {
                    clearInterval(gameTimer);
                    gameTimer = null;
                }
                
                document.getElementById('current-vocab').firstElementChild.textContent = `Completed!`;
                document.getElementById('current-vocab').firstElementChild.style.color = 'green';
                playWinSound(); // Already plays both sounds
                
                // Show the custom congratulations popup
                setTimeout(() => {
                    showCongratulationsPopup();
                }, 1500);
                return;
            }
            
            document.getElementById('current-vocab').firstElementChild.textContent = `Finished Round ${currentRound}`;
            document.getElementById('current-vocab').firstElementChild.style.color = 'green';
            // Play both sounds when a round is completed
            playRoundCompleteSound();
            currentRound++;
            currentTurn = 0;
            setTimeout(() => {
                document.getElementById('game-title').textContent = `Round ${currentRound}/5`;
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
                document.getElementById('game-title').textContent = `Round ${currentRound}/5`;
                playSequence(); // Play the next part of the sequence
            }, 1000);
        }
    }
    updateUI();
}

function updateUI() {
    document.getElementById('game-title').textContent = `Round ${currentRound}/5`;
}

function cleanupGame() {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    
    // Stop boss fight background music
    stopBackgroundMusic();

    // Remove timer display container if it exists
    const timerContainer = document.getElementById('timer-display-container');
    if (timerContainer) {
        timerContainer.remove();
    }
}