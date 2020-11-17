// DOM Elements
const wrongLetters = document.getElementById("wrong-letters");
const word = document.getElementById("word");
const finalMessage = document.getElementById("final-message");
const playBtn = document.getElementById("play-button");
const notification = document.getElementById("notification-container");
const popup = document.getElementById("popup-container");
const bodyParts = document.querySelectorAll(".body-part");

const wordsArr = ["apple", "labyrinth", "juice", "hammer", "ball", "red"];
const correctLettersArr = [];
const wrongLettersArr = [];

const randomNum = Math.floor(Math.random() * wordsArr.length);
let selectedWord = wordsArr[randomNum];

// Functions
function displayWord() {
  selectedWord.split("").map((letter) => {
    const span = document.createElement("span");
    span.classList.add("letter");
    span.innerText = correctLettersArr.includes(letter) ? letter : "";
    word.appendChild(span);
  });
  const innerword = word.innerText.replace(/\n/g, "");
  if (selectedWord === innerword) {
    finalMessage.innerText = "You Won!";
    popup.style.display = "flex";
  }
}

function drawBody() {
  for (i = 0; i < wrongLettersArr.length; i++) {
    bodyParts[i].style.display = "block";
    if (bodyParts.length === wrongLettersArr.length) {
      finalMessage.innerText = "You Have lost!";
      popup.style.display = "flex";
      bodyParts[5].style.display = "block";
      // window.removeEventListener("keydown", test(), true);
    }
  }
}

function clearWord() {
  while (word.firstChild) {
    word.firstChild.remove();
  }
}

function displayWrongLetters() {
  const test = wrongLettersArr.join();
  wrongLetters.innerText = test;
  drawBody();
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Event Listeners
window.addEventListener("keydown", function test(key) {
  if (key.keyCode >= 65 && key.keyCode <= 90) {
    if (
      selectedWord.includes(key.key) &&
      !correctLettersArr.includes(key.key)
    ) {
      correctLettersArr.push(key.key);
    } else if (correctLettersArr.includes(key.key)) {
      showNotification();
    }
    if (!selectedWord.includes(key.key) && !wrongLettersArr.includes(key.key)) {
      wrongLettersArr.push(key.key);
      displayWrongLetters();
    } else if (wrongLettersArr.includes(key.key)) {
      showNotification();
    }
  }
  clearWord();
  displayWord();
});

playBtn.addEventListener("click", () => {
  clearWord();
  selectedWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
  wrongLettersArr.length = 0;
  correctLettersArr.length = 0;
  displayWord();
  displayWrongLetters();
  bodyParts.forEach((e) => (e.style.display = "none"));
  popup.style.display = "none";
});

// Start
displayWord();
