//necessary for project

//1) build the deck of cards
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "A", "J", "Q", "K"];
const suits = ["S", "H", "C", "D"];
let deck = createDeck();
let playerHand = [];
let dealerHand = [];
let pscore = 0;
let dscore = 0;
const img = new Image();
img.src= '/cards';

// create code for ace to equal 11 at first then one once 11 makes hand over 21

function createDeck() {
  var deck = new Array();
  for (var i = 0; i < values.length; i++) {
    for (var x = 0; x < suits.length; x++) {
      var weight = values[i];
      if (weight == "J" || weight == "Q" || weight == "K") weight = 10;
      if (weight == "A") weight = 11;
      var card = {
        Value: values[i],
        Suit: suits[x],
        Weight: weight,
        image: `./cards/${values[i]}${suits[x]}.png`,
      };
      deck.push(card);
    }
  }
  return deck;
};
let random = () => Math.floor(deck.length * Math.random());
deck.forEach((card, index) => {
  const randomIndex = random();
  // const randomCard = deck[randomIndex];
  // deck[randomIndex] = card;
  // deck[index] = randomCard;
  [deck[randomIndex], deck[index]] = [deck[index], deck[randomIndex]];
});
const card = deck[0];

//2) create a deal function

window.onload = () => {
  document.querySelector("#start").onclick = () => {
    startGame();
  };
};
function startGame() {
  console.log("starting game");
  createDeck();
  setHandforPlayers();
  dealCards();
};
function setHandforPlayers() {
  for (i = 0; i < 2; i++) {
    drawCard(playerHand); // add to hit function may need to add a conditional as well
    drawCard(dealerHand);
  }
};

function drawCard(hand) {
  const theCard = deck.splice(0, 1)[0];
  hand.push(theCard);
}

function dealCards() {
  console.log(playerHand, dealerHand)
  const playerHandCard = document.getElementById(`phand`);
  playerHandCard.innerHTML = "";
  pscore = 0;
  playerHand.forEach((card, i) => {
    pscore += card.Weight;
    addCardImage(playerHandCard, card);
  });

  const dealerHandCard = document.getElementById(`dhand`);
  dealerHandCard.innerHTML = "";
  console.log(dealerHand);
  dscore = 0;
  dealerHand.forEach((card, i) => {
    dscore += card.Weight;
    addCardImage(dealerHandCard, card);
  }); 
  displayScore(dscore, 'dscore');
  displayScore(pscore, 'pscore');

};
function displayScore(score, who) {
  let scoreElement = document.getElementById(who);
  scoreElement.innerText = score;
}

function addCardImage(listLocation, card) {
  let img = document.createElement("img");
  img.src = card.image;
  img.style.height = '125px'
  listLocation.appendChild(img);
};

document.querySelector('#reset').onclick = () => {
  location.reload();
  return false;
};

// suggestion logic:
//f suggestAMove ()
//document.getElementById("#suggestion")

//3) create a hit me function
document.querySelector("#hit").onclick = () => {
  drawCard(playerHand);
  dealCards()
  playerLoss();
};
function playerLoss(){
  if (pscore > 21)
  alert("Player loses");

};

//4) create a stay function


  document.querySelector('#stay').onclick = () => {
    dealersMove();
  };
//then proceed to dealer turn

//4.5) dealer rules
//dealer hand =< 16- dealer must hit
function dealersMove() {
  if (dscore <= 16) {
    drawCard(dealerHand);
    dealCards();
    dealersMove();
  } else if (dscore > 21) {
    return alert('Dealer busts'); }
    else{return endOfGame(); } 
};
function endOfGame() {
  if (dscore == 21) {
    alert("The Dealer has 21. You lose!");
  } else if (dscore > pscore) {
    alert("The Dealer wins.");
  } else if(dscore== pscore) {
    alert("Tie");
  } else {
    alert ("You beat the Dealer");
  }
};

//dealer hand >= 17 dealer must stay

// extra stuff if I have time:
// add split and double down features
// start w/ fixed amount of money
// create chips to bet
