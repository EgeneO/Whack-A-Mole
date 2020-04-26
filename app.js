"use strict"

const squares = document.querySelectorAll('.square');
const moles = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');

let result = 0;
let currentTime = timeLeft.textContent;
let hitPosition = null;

function moveMole() {
  squares.forEach(sqr => {
    sqr.classList.remove('mole');
  })

  let randomPosition = squares[Math.floor(Math.random() * squares.length)];
  randomPosition.classList.add('mole');

  //assign the id of the randomPosition to hitPosition for us to use later
  hitPosition = randomPosition.id;
}

squares.forEach(sqr => {
  sqr.addEventListener('mouseup', () => {
    if(sqr.id === hitPosition) {
      result += 1;
      score.textContent = result;
      // prevent player player from scoring more than one point for
      // mole in current position
      hitPosition = null;
      updateMoleSpeed();
      moveMole();
    }
  })
})

let moveMoleInt = 1000;
let moveMoleIntId = setInterval(moveMole, moveMoleInt);

// Increase mole speed by 5%
function updateMoleSpeed() {
  moveMoleInt = Math.max(100, Math.floor(moveMoleInt * 0.9));
  clearInterval(moveMoleIntId);
  moveMoleIntId = setInterval(moveMole, moveMoleInt);
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(countDownIntId);
    clearInterval(moveMoleIntId);
    alert('GAME OVER! Your final score is ' + result);
  }
}

let countDownIntId = setInterval(countDown, 1000);
