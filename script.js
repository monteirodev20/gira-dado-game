'use strict';

//----------------SELECIONANDO ELEMENTOS ID-----------------//
//1 E novamente, agora usamos esse hashtag [#...] porque esse é o Selecter para o ID e o DOT que costumávamos usar

// 2 isso funciona exatamente da mesma forma. Mas o getElementById deve ser um pouco mais rápido do que o seletor de consulta (querySelector), mas acho que isso só é relevante se você estiver selecionando milhares de elementos de uma vez.

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // jogador 1
const score1El = document.getElementById('score--1'); // jogador 2
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, pontoAtual, activePlayer, jogando, dice;

const inic = function () {
  // Condições inicias

  scores = [0, 0];
  pontoAtual = 0;
  activePlayer = 0;

  jogando = true;

  score0El.textContent = 0; //--Zerar a pontuação--//
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden'); //--Esconder o dado--//
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

inic();

const switchPlayer = function () {
  // mude para o proximo jogador
  pontoAtual += dice;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  pontoAtual = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); //método de alternância
  player1El.classList.toggle('player--active'); //método de alternância
};
// Girar o dado Funcionalidade
btnRoll.addEventListener('click', function () {
  if (jogando) {
    // 1. Gerando o número aleatorio girando o dado
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. Dado no Display
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. chekar se o resultado é 1: if ture,
    if (dice !== 1) {
      // adiciona para apontuação atual (score)
      // pontuacaoAtual = pontuacaoAtual + dice;
      pontoAtual += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = pontoAtual;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (jogando) {
    // 1. Adiciona os pontos Atuais no jogador ativo
    scores[activePlayer] += pontoAtual;
    // scores[1] = scores[1] + pontoAtual;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Verifica se o jogador já tem pelo menos 100 pontos (>=100)

    if (scores[activePlayer] >= 100) {
      // Termina o jogo
      jogando = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Mude para o proximo jogador
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', inic);
