/*=============== SMALL PROJECTS JS ===============*/
/*wheels of fortune*/
let wheel = document.querySelector('.wheel');
let spinButton = document.querySelector('.spin-button');
let value = Math.ceil(Math.random() * 3600);

// Define the winning segments
const winningSegments = [
  { i: 1, prize: "100" },
  { i: 2, prize: "1" },
  { i: 3, prize: "50" },
  { i: 4, prize: "0"},
  { i: 5, prize: "1000"},
  { i: 6, prize: "10"},
  { i: 7, prize: "5"},
  { i: 8, prize: "20"},
  // Define more segments as needed
];

spinButton.onclick = function() {
  // Disable the button while the wheel is spinning
  spinButton.disabled = true;

  // Calculate the final rotation angle
  const finalRotation = value + Math.ceil(Math.random() * 3600);

  // Apply the rotation to the wheel
  wheel.style.transition = 'transform 5s ease-in-out';
  wheel.style.transform = "rotate(" + finalRotation + "deg)";

  // After the wheel stops spinning (5 seconds), check the winning segment
  setTimeout(() => {
    // Normalize the angle to a value between 0 and 360
    const normalizedAngle = finalRotation % 360;
    console.log("Normalized Angle:", normalizedAngle);

    // Check if the wheel landed on a winning segment
    const winningSegment = winningSegments.find(segment => {
      const segmentAngle = (segment.i - 1) * 45;
      console.log("Segment Angle:", segmentAngle);
      return normalizedAngle >= segmentAngle && normalizedAngle < segmentAngle + 45;
    });

    // // Show an alert with the result
    // if (winningSegment) {
    //   alert("Congrats, you won " + winningSegment.prize + "!");
    // } else {
    //   alert("Sorry, try again!");
    // }

    // Re-enable the spin button
    spinButton.disabled = false;
  }, 5000); // Wait 5 seconds for the wheel to stop spinning
};

/* calculator */
let calculation = localStorage.getItem('savedCalc') || '';
      
displayCalculation();

function updateCalculation(value) {
calculation += value;
console.log(calculation);
displayCalculation();
localStorage.setItem('savedCalc', calculation);
}

function saveCalculation() {
localStorage.setItem('savedCalc', calculation);
}

function displayCalculation() {
document.querySelector('.js-display')
  .innerHTML = calculation;
}

/*stopwatch*/
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const startStopButton = document.getElementById("startStopButton");
const resetButton = document.getElementById("resetButton");

let startTime;
let pausedTime = 0;
let intervalId;

function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime + pausedTime;
  
  const minutes = Math.floor(elapsedTime / (60 * 1000));
  const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  
  minutesDisplay.textContent = formatTime(`${minutes.toString().padStart(2, "0")} :`);
  secondsDisplay.textContent = formatTime(`${seconds.toString().padStart(2, "0")} :`);
  millisecondsDisplay.textContent = formatTime(milliseconds);
}

function formatTime(time) {
  return time.toString().padStart(2, "0");
}

function startStopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    pausedTime += new Date().getTime() - startTime;
    startStopButton.textContent = "Start";
  } else {
    startTime = new Date().getTime();
    intervalId = setInterval(updateTimer, 10);
    startStopButton.textContent = "Pause";
  }
}

function resetTimer() {
  clearInterval(intervalId);
  intervalId = null;
  pausedTime = 0;
  startStopButton.textContent = "Start";
  minutesDisplay.textContent = "00 :";
  secondsDisplay.textContent = "00 :";
  millisecondsDisplay.textContent = "00";
}

startStopButton.addEventListener("click", startStopTimer);
resetButton.addEventListener("click", resetTimer);

/*tic-tac-toe*/
const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let gameActive = true;

function checkGameStatus() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      gameActive = false;
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      const message = document.querySelector(".message");
      if (currentPlayer === "X") {
        message.textContent = "X Wins!";
      } else {
        message.textContent = "O Wins!";
      }
      break;
    }
  }
}

function checkTie() {
  for (const cell of cells) {
    if (cell.textContent === "") {
      return false;
    }
  }
  return true;
}

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.getAttribute("data-cell"));

  if (cell.textContent === "" && gameActive) {
    cell.textContent = currentPlayer;
    checkGameStatus();

    if (!gameActive) {
      return; // Don't allow further moves after the game is won
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (checkTie()) {
      gameActive = false;
      const message = document.querySelector(".message");
      message.textContent = "It's a Tie!";
    }
  }
}

function restartGame() {
  for (const cell of cells) {
    cell.textContent = "";
    cell.classList.remove("win");
  }
  const message = document.querySelector(".message");
  message.textContent = "";
  currentPlayer = "X";
  gameActive = true;
}

for (const cell of cells) {
  cell.addEventListener("click", handleCellClick);
}

const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", restartGame);

/*todojs*/
const todoList = [{
  name: 'To do list Example#1',
  dueDate: '2023-12-22'},
  {
    name: 'To do list Example#2',
    dueDate: '2023-09-22'
  }
    
];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject; 
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
    `; 
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
      })
    })
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // If the user does not input any date, set the due date to today's date.
  // if (!dueDate) {
  //   dueDate = new Date().toISOString().split('T')[0];
  // }

  // if (!dueDate) {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  //   const day = String(today.getDate()).padStart(2, '0');
  //   dueDate = `${year}-${month}-${day}`;
  // }

  todoList.push({
    name: name,
    dueDate: dueDate
  });

  inputElement.value = '';

  renderTodoList();
}

/* rock paper scissor*/
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
} */

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if(playerMove === 'scissors')
  {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper' ) {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
    
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper' ) {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper' ) {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You <img class="move-icon" src="assets/img/${playerMove}-emoji.png"><img class="move-icon" src="assets/img/${computerMove}-emoji.png"> Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losess: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  }
  else if (randomNumber >= 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = 'paper';
  }
  else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}