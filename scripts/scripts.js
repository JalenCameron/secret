// Storing the game status in a variable
const displayStatus = document.querySelector(".game-status");

// Creating a variable to be used to check if the game is over
let gameActive = true;

// Creating a variable to store the current player (who will use X)
let currentPlayer = "X";

// Starting with an empty game state in order to track which cells are empty and which will be taken
let gameState = ["", "", "", "", "", "", "", "", ""];

// Creating variables to hold dynamic messages related to the game
const winningMessage = () =>
  `Congratulations, Player ${currentPlayer} has won!`;
const tieMessage = () => `Unfortunately the game has ended in a draw`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Setting the initial message to let the players know who's turn it is
displayStatus.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
  // Updating the game state to reflect the player's move
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;

  // Changing the colour of the Current Player
  if (currentPlayer == "X") {
    document.querySelectorAll(".player")[clickedCellIndex].style.color =
      "#7f96BB";
  } else {
    document.querySelectorAll(".player")[clickedCellIndex].style.color =
      "#FFB6C1";
  }
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  displayStatus.innerHTML = currentPlayerTurn();
}

// Determing the conditions that need to be met in order to win
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleResults() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    displayStatus.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  // Also checking whether there are any cells that haven't been chosen yet
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    displayStatus.innerHTML = tieMessage();
    gameActive = false;
    return;
  }

  // Handling the player change if there hasn't been a determined winner
  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  // Creating a variable so I don't have to type clickedCellEvent every time
  const clickedCell = clickedCellEvent.target;

  /* Grabbing the 'data-cell-index' to identify which cell was clicked on the grid. Then returning that value as an integer using parseint (because it's being returned as a string value currently) */
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  // Now creating an if statement to check if the game has already been played or if it's been paused
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  // As long as those conditions aren't met the gameplay can continue
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResults();
}

function handleRestartGame() {
  // Resetting the gameActive back to true so a new game can initialize
  gameActive = true;
  // Resetting the Current Player back to X if they're on O
  currentPlayer = "X";
  // Resetting the state so each cell will come up as empty
  gameState = ["", "", "", "", "", "", "", "", ""];
  // Resetting the current Display status
  displayStatus.innerHTML = currentPlayerTurn();
  // Resetting the Game Board so all cells are empty
  document.querySelectorAll(".player").forEach((cell) => (cell.innerHTML = ""));
}

// Adding event listeners to the cells and restart button for functionality
document
  .querySelectorAll(".player")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game-reset")
  .addEventListener("click", handleRestartGame);
