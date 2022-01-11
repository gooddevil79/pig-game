'use strict';
// selecting elements from dom
const score0EL = document.querySelector('#score-0');
const score1EL = document.getElementById('score-1');
const currentScore0 = document.getElementById('current-point-0');
const currentScore1 = document.getElementById('current-point-1');
const player1 = document.querySelector('.player-0');
const player2 = document.querySelector('.player-1');
const diceImage = document.querySelector('.dice-image');
const resetBtn = document.querySelector('.reset');
const rollBtn = document.querySelector('.roll');
const holdBtn = document.querySelector('.hold ');
// setting conditions

let currentScore, activePlayer, mainScores, playing, rotate;
// functions
const init = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentScore = 0;
  mainScores = [0, 0];
  activePlayer = 0;
  rotate = 360;
  playing = true;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  diceImage.classList.add('hidden');
  player1.classList.add('player-turn-active');
  player2.classList.remove('player-turn-active');
  player1.classList.remove('player-win');
  player2.classList.remove('player-win');
  document.getElementById(`current-point-${activePlayer}`).textContent =
    currentScore;
  document.querySelector(`.player-0-title`).textContent = `Player 1`;
  document.querySelector(`.player-1-title`).textContent = `Player 2`;
};
init();
const switchPlayer = function () {
  document.getElementById(`current-point-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1.classList.toggle('player-turn-active');
  player2.classList.toggle('player-turn-active');
};
// EVENTS

// roll a dice
rollBtn.addEventListener('click', function () {
  if (playing) {
    // creat randome dice
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // Didplay dice

    diceImage.classList.toggle('rolling-dice-animation');
    diceImage.classList.remove('hidden');
    diceImage.src = `img/dice-${diceNumber}.png`;
    // check for 1 in each dice roll :
    if (diceNumber !== 1) {
      // add to scores
      currentScore += diceNumber;
      document.getElementById(`current-point-${activePlayer}`).textContent =
        currentScore;
    } else {
      // change player
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  // put current score in main score
  if (playing) {
    mainScores[activePlayer] += currentScore;
    // show score
    document.getElementById(`score-${activePlayer}`).textContent =
      mainScores[activePlayer];
    if (mainScores[activePlayer] >= 100) {
      // end game
      // hide the dice
      diceImage.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-win');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-turn-active');
      document.querySelector(
        `.player-${activePlayer}-title`
      ).textContent = `Player Won!!`;
    } else {
      switchPlayer();
    }
  }
});
// reset the game
resetBtn.addEventListener('click', init);
