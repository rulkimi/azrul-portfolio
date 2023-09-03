/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SWIPER PROJECTS ===============*/
let swiperProjects = new Swiper(".projects__container", {
    loop: true,
    spaceBetween: 24,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },

    breakpoints: {
        1200: {
          slidesPerView: 2,
          spaceBetween: -56,
        },
    },

  });

/*=============== SWIPER TESTIMONIAL ===============*/
let swiperTestimonial = new Swiper(".testimonial__container", {
  grabCursor: true,
  
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactName = document.getElementById('contact-name'),
      contactEmail = document.getElementById('contact-email'),
      contactProject = document.getElementById('contact-project'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
  e.preventDefault();

  //check if the field has a value
  if(contactName.value === '' || contactEmail.value === '' || contactProject.value === '') {
    //add and remove color
    contactMessage.classList.remove('color-blue');
    contactMessage.classList.add('color-red');

    //show message
    contactMessage.textContent = 'Write alll the input fields 📩';
  } else {
    //service ID - templateID - #form - publicKey
    emailjs.sendForm('service_nx7k3vf','template_odz16mo','#contact-form','k5BkLOy7WtDX1bqQm')
      .then(() => {
        //show message and add color
        contactMessage.classList.add('color-blue')
        contactMessage.textContent = 'Message sent ✅'

        //remove message after five seconds
        setTimeout(() => {
          contactMessage.textContent = ''
        }, 5000)
      }, (error) => {
        alert('Errors occured!', error)
      })

    //to clear an input field
    contactName.value = ''
    contactEmail.value = ''
    contactProject.value = ''
  }

}
contactForm.addEventListener('submit', sendEmail)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
      if(sectionsClass) {
        sectionsClass.classList.add('active-link')
      }
		}else{
      if (sectionsClass) {
        sectionsClass.classList.remove('active-link');
      }
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)


/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})



/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
  const header = document.getElementById('header')
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  this.scrollY >= 50 ? header.classList.add('bg-header') 
                     : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 300,
  reset: true /* animations repeat */
})

sr.reveal(`.home__data, .projects__container, .testimonial__container, .footer__container`)
sr.reveal(`.home__info div`, {delay: 600, origin: 'bottom', interval: 100})
sr.reveal(`.skills__content:nth-child(1), .contact__content:nth-child(1)`, {origin: 'left'})
sr.reveal(`.skills__content:nth-child(2), .contact__content:nth-child(2)`, {origin: 'right'})
sr.reveal(`.qualification__content, .aspirations__card`, {interval: 100})


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