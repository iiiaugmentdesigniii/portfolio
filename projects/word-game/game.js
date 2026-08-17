const words = [
{
  word: "nostalgia",
  definition: "A sentimental longing for the past.",
  hints: ["memories", "past", "sentimental"]
},
{
  word: "meticulous",
  definition: "Showing great attention to detail.",
  hints: ["careful", "precise", "thorough"]
},
{
  word: "ambiguous",
  definition: "Having more than one possible meaning.",
  hints: ["unclear", "uncertain", "multiple meanings"]
}
];

let currentWord;
let score = 0;

const scoreDisplay = document.getElementById("score");
const definition = document.getElementById("definition");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const hintButton = document.getElementById("hintButton");
const hintText = document.getElementById("hintText");
const showButton = document.getElementById("showButton");
const nextButton = document.getElementById
("nextButton");
const result = document.getElementById("result");
const addWordButton = document.getElementById("addWordButton");
const addWordForm = document.getElementById("addWordForm");

const newWord = document.getElementById("newWord");
const newDefinition = document.getElementById("newDefinition");
const newHints = document.getElementById("newHints");

const saveWordButton = document.getElementById("saveWordButton");
const cancelWordButton = document.getElementById("cancelWordButton");

guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});


function loadRandomWord() {
  const randomNumber = Math.floor(Math.random() * words.length);

  currentWord = words[randomNumber];

  definition.textContent = currentWord.definition;
  guessInput.value = "";
  result.textContent = "";
  hintText.textContent = "";
}

function checkGuess() {
  const playerGuess = guessInput.value.toLowerCase().trim();

  if (playerGuess === currentWord.word.toLowerCase()) {
    result.textContent = "Correct!";

    score = score + 1;
    scoreDisplay.textContent = score;
  } else {
    result.textContent = "Try again.";
  }
}

function showHint() {
  hintText.textContent = "Hints: " + currentWord.hints.join(", ");
}

function showWord() {
  guessInput.value = currentWord.word;
}

function openAddWordForm() {
  addWordForm.style.display = "block";
}

function closeAddWordForm() {
  addWordForm.style.display = "none";
}

function saveNewWord() {
  const word = newWord.value.trim();
  const definition = newDefinition.value.trim();

  const hints = newHints.value.split(",").map(function (hint) {
    return hint.trim();
  });

  const wordObject = {
    word: word,
    definition: definition,
    hints: hints,
  };

  // words.push(wordObject);
  await fetch("/api/words", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(wordObject)
});

  console.log(words);

  newWord.value = "";
  newDefinition.value = "";
  newHints.value = "";

  addWordForm.style.display = "none";
}

guessButton.addEventListener("click", checkGuess);
nextButton.addEventListener("click", loadRandomWord);
hintButton.addEventListener("click", showHint);
showButton.addEventListener("click", showWord);
addWordButton.addEventListener("click", openAddWordForm);
cancelWordButton.addEventListener("click", closeAddWordForm);
saveWordButton.addEventListener("click", saveNewWord);

loadRandomWord();
