// These are the global variables that can be modified. Some are going to work as indexes and others will be values as numbers.

let xp = 0;
let gold = 50;
let health = 100;
let fuel = 100;
let currentWeapon = 0; // The value of the currentWeapon variable corresponds to an index in the weapons array.
let alienHealth;
let fighting; // The value of this is the index of the current alien.
let inventory = ["laser"];

// We need to manipulate the DOM with the querySelector() method.
// We're using the CONST variable as these variables are not going to change their values.
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const alienStats = document.querySelector("#alienStats");
const alienName = document.querySelector("#alienName");
const alienHealthText = document.querySelector("#alienHealth");

// We're going to arrange all our static data in arrays that are defined and passed through the constructor function below so that we can easily get access.

const weapons = [
  { name: "laser", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 },
];

// This is an array of the aliens we need to fight against.
const aliens = [
  {
    name: "muguls",
    level: 2,
    health: 15,
  },
  {
    name: "alien beast",
    level: 8,
    health: 60,
  },
  {
    name: "alien destructor",
    level: 20,
    health: 300,
  },
];

// This is an array of the locations with the information that each one needs.
const locations = [
  {
    name: "space station",
    "button text": ["Go to space store", "Go to planet", "Fight alien"],
    "button functions": [goStore, goPlanet, fightAlienDestructor],
    text: 'You are in the space station. You see a sign that says "Space Store".',
  },
  {
    name: "space store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to station",
    ],
    "button functions": [buyHealth, buyWeapon, goStation],
    text: "You enter the store.",
  },
  {
    name: "planet",
    "button text": ["Fight muguls", "Fight alien beast", "Go to town square"],
    "button functions": [fightMuguls, fightAlienBeast, goStation],
    text: "You enter the planet. You see some aliens.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goStation],
    text: "You are fighting an alien.",
  },
  {
    name: "kill alien",
    "button text": [
      "Go to space station",
      "Go to space station",
      "Go to space station",
    ],
    "button functions": [goStation, goStation, easterEgg],
    text: 'The alien screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to space station?"],
    "button functions": [pickTwo, pickEight, goStation],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
];

// We need to initialize the buttons with the onclick event. We're defining FUNCTIONS for these button actions.
button1.onclick = goStore; // Buying
button2.onclick = goPlanet; // Fighting aliens
button3.onclick = fightAlienDestructor; // Fighting ultimate alien

// We need to use a function to update the location wer're at and display its text. This is to prevent code redundancy and to modularize our code.
function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

// We start creating functions to UTILIZE the ARRAY "locations" to set the place where the actions are going to occur.
function goStation() {
  update(locations[0]);
}
function goStore() {
  update(locations[1]);
}
function goPlanet() {
  update(locations[2]);
}

// These are the functions to control the ACTIONS the player is allowed to perform.
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerHTML = "You don't have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerHTML = "You now have a new weapon: " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory + ".";
    } else {
      text.innerHTML = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerHTML += " In your inventory you have: " + inventory;
  } else {
    text.innerHTML = "Don't sell your only weapon!";
  }
}

// Player actions to fight against a specific ALIEN from the array of aliens.
function fightMuguls() {
  fighting = 0;
  goFight();
}

function fightAlienBeast() {
  fighting = 1;
  goFight();
}

function fightAlienDestructor() {
  fighting = 2;
  goFight();
}

// Helper functions of the fighting actions
function goFight() {
  update(locations[3]);
  alienHealth = aliens[fighting].health;
  alienStats.style.display = "block";
  alienName.innerText = aliens[fighting].name;
  alienHealthText.innerText = alienHealth;
}

function attack() {
  text.innerText = "You're being attacked by" + aliens[fighting].name + "!";
  text.innerText = " You attack with your " + weapons[currentWeapon].name + ".";
  health -= getAlienAttackValue(aliens[fighting].level);
  if (isAlienHit()) {
    alienHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  alienHealthText.innerText = alienHealth;
  if (health <= 0) {
    lose();
  } else if (alienHealth <= 0) {
    if (fighting === 2) {
      winGame();
    }
  } else {
    defeatAlien();
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

// This will set the monster's attack to five times their level minus a random number between 0 and the player's xp.
function getAlienAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isAlienHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + aliens[fighting].name;
}
function defeatAlien() {
  gold += Math.floor(aliens[fighting].level * 6.7);
  xp += aliens[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

// Implement win and lose conditions to determine the outcome of the game based on player actions.
function lose() {
  update(locations[5]);
}
function winGame() {
  update(locations[6]);
}

// Define a function to reset player stats and restart the game.
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["laser"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goStation();
}

// This is a HIDDEN feature of the game.

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}
function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];

  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerHTML += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerHTML += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
