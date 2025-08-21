const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart");

const emojis = ["🍎","🍌","🍓","🍇","🍒","🍉","🥝","🍍"];
let cards = [...emojis, ...emojis]; // duplicate for pairs
let flippedCards = [];
let matchedCards = [];

// Shuffle cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create board
function createBoard() {
  gameBoard.innerHTML = "";
  shuffle(cards).forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${emoji}</div>
      </div>
    `;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (this.classList.contains("flip") || flippedCards.length === 2) return;
  this.classList.add("flip");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === cards.length) {
      setTimeout(() => alert("🎉 You Won!"), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      flippedCards = [];
    }, 1000);
  }
}

// Restart game
restartBtn.addEventListener("click", () => {
  flippedCards = [];
  matchedCards = [];
  createBoard();
});

// Initialize game
createBoard();
