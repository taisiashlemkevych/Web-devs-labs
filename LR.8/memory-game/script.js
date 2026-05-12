function createCards(count) {
  let arr = [];

  for (let i = 0; i < count / 2; i++) {
    arr.push(i, i);
  }

  return shuffle(arr);
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function createState(rows, cols, time) {
  const total = rows * cols;

  return {
    cards: createCards(total),
    flipped: [],
    moves: 0,
    player: 1,
    score1: 0,
    score2: 0,
    found: 0,
    totalPairs: total / 2,
    time: getTimeByDifficulty(level) 
  };
}

function flipCard(state, index) {
  if (state.flipped.length === 2) return state;

  return {
    ...state,
    flipped: [...state.flipped, index]
  };
}

function checkMatch(state) {
  if (state.flipped.length < 2) return state;

  const [i1, i2] = state.flipped;
  const match = state.cards[i1] === state.cards[i2];

  if (match) {
    return {
      ...state,
      found: state.found + 1,
      score1: state.player === 1 ? state.score1 + 1 : state.score1,
      score2: state.player === 2 ? state.score2 + 1 : state.score2,
      flipped: []
    };
  } else {
    return {
      ...state,
      player: state.player === 1 ? 2 : 1,
      flipped: []
    };
  }
}

function addMove(state) {
  return {
    ...state,
    moves: state.moves + 1
  };
}

function isGameOver(state) {
  return state.found === state.totalPairs;
}

function getTimeByDifficulty(level) {
  if (level === "easy") return 180;
  if (level === "medium") return 120;
  if (level === "hard") return 60;
  return 120;
}

const game = document.getElementById('game');
const info = document.getElementById('info');
const timerText = document.getElementById('timer');

let state;
let timer;

function render(state, cols) {
  game.innerHTML = "";
  game.style.gridTemplateColumns = `repeat(${cols}, 80px)`;

  state.cards.forEach((val, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;

    const isFlipped = state.flipped.includes(index);

    card.innerHTML = `
      <div class="front"></div>
      <div class="back">${isFlipped ? val : ""}</div>
    `;

    if (isFlipped) card.classList.add('flip');

    game.appendChild(card);
  });
}

function renderInfo(state) {
  info.innerText =
    `Ходи: ${state.moves} | Гравець: ${state.player} | ${state.score1}:${state.score2}`;
}

function startTimer() {
  timer = setInterval(() => {
    state = { ...state, time: state.time - 1 };
    timerText.innerText = "Час: " + state.time;

    if (state.time <= 0) {
      clearInterval(timer);
      alert("Час вийшов");
    }
  }, 1000);
}

game.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;

  const index = +card.dataset.index;

  state = flipCard(state, index);

  if (state.flipped.length === 2) {
    state = addMove(state);
    render(state, cols);

    setTimeout(() => {
      state = checkMatch(state);

      render(state, cols);
      renderInfo(state);

      if (isGameOver(state)) {
        clearInterval(timer);
        alert("Гра завершена!");
      }

    }, 700);
  }

  render(state, cols);
  renderInfo(state);
});

let cols;

function startGame() {
  clearInterval(timer);

  const rows = +document.getElementById('rows').value;
  cols = +document.getElementById('cols').value;
  const time = +document.getElementById('difficulty').value;

  if ((rows * cols) % 2 !== 0) {
    alert("Парна кількість!");
    return;
  }

  state = createState(rows, cols, time);

  render(state, cols);
  renderInfo(state);
  startTimer();
}

document.getElementById('start').addEventListener('click', startGame);