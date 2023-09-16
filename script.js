// getting each button from the html 
document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock'); 
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors');
    });

document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
        resetScore();
    });

document.querySelector('.js-auto-play')
    .addEventListener('click', () => {
        autoPlay();
    });

// sets 'r', 'p', and 's' as alternatives for the buttons presented on the screen
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
});

// sets the local storage to preserve the score before clicking 'reset score'
let score = JSON.parse(localStorage.getItem('scoreStorage')) || {
    wins: 0,  
    losses: 0,
    ties: 0
};

// calls updatescore function to update the score on the screen once the page loads
updateScoreElement();

let isAutoPlay = false; // sets autoplay to false to indicate that it is turned off once the page loads
let intervalID; // sets a variable to the id returned by setInterval()

// function used for autoplaying the game
function autoPlay() {
    if (!isAutoPlay) {
        intervalID = setInterval(() => {
            playGame(pickComputerMove());
        }, 1000);

        isAutoPlay = true; 
        const autoPlayEle = getAutoPlayElement();
        autoPlayEle.classList.add('css-auto-on');
    } else {
        clearInterval(intervalID); // clears the interval which stops the autoplay

        isAutoPlay = false;  
        const autoPlayEle = getAutoPlayElement();
        autoPlayEle.classList.remove('css-auto-on');
    }
}

// just made this to avoid typing '.querySelector' over and over
function getAutoPlayElement() {
    const autoPlayElement = document.querySelector('.js-auto-play');
    return autoPlayElement;
}

// function for the entire rock, paper, and scissors game
function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';
    
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose!';
        } else if (computerMove === 'paper') {
            result = 'You win!';
        } else if (computerMove === 'scissors') {
            result = 'Tie!';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win!';
        } else if (computerMove === 'paper') {
            result = 'Tie!';
        } else if (computerMove === 'scissors') {
            result = 'You lose!';
        }
    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie!';
        } else if (computerMove === 'paper') {
            result = 'You lose!';
        } else if (computerMove === 'scissors') {
            result = 'You win!';
        }
    } 

    if (result === 'You win!') {
        score.wins += 1;
    } else if (result === 'You lose!') {
        score.losses += 1;
    } else if (result === 'Tie!') {
        score.ties += 1;
    }

    // this sets the local storage where scores are stored
    localStorage.setItem('scoreStorage', JSON.stringify(score)); 

    updateScoreElement(); // updates the score and shows it on the webpage
    
    displayResult(result); // calls the function to display the result of the game

    document.querySelector('.js-moves').innerHTML = 
        `You     <img src="image-${playerMove}.png" class="css-move-icon">
        <img src="image-${computerMove}.png" class="css-move-icon">     Computer`;
}

// function which updates the score on the webpage
function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = 
        `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// function for randomly picking the move of the computer
function pickComputerMove() {
    const randomNumber = Math.random();
    let randomMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        randomMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        randomMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        randomMove = 'scissors';
    }

    return randomMove;
}

// function for displaying different results with diff colors
function displayResult(result) {
    let resultElement = document.querySelector('.js-result');

    resultElement.innerHTML = result; 
    
    // removes any possible classes existing inside the html element before updating the result
    resultElement.classList.remove('css-win', 'css-lose', 'css-tie');
  
    if (result === 'You win!') {
        resultElement.classList.add('css-win');
    } else if (result === 'You lose!') {
        resultElement.classList.add('css-lose');
    } else if (result === 'Tie!') {
        resultElement.classList.add('css-tie');
    }
}

// function for resetting the score both from the local storage and the webpage
function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('scoreStorage');
    updateScoreElement();
}