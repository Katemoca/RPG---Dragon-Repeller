// These are the global variables that can be modified. Some are going to work as indexes and others will be values as numbers.

let xp = 0;
let gold = 50;
let health = 100;
let fuel = 100;
let currentWeapon = 0;
let fighting;
let inventory = ["laser"];
let alienHealth;

// We need to manipulate the DOM with the querySelector() method.
// We're using the CONST variable as these variables are not going to change their values.
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// We're going to arrange all our static data in arrays that are defined and passed through the constructor function below so that we can easily access.

const weapons = [
  { name: "laser", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 },
];

const locations = [
  {
    name: "space station",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goPlanet, fightAlien],
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
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightPixins, fightAlienBeast, goStation],
    text: "You enter the planet. You see some aliens.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goStation],
    text: "You are fighting a monster.",
  },
];

const aliens = [];

// We need to initialize the buttons with the onclick event.
button1.onclick = goStore;
button2.onclick = goPlanet;
button3.onclick = fightAlien;

// We need to use a function to update the location wer're at and display its text. This is to prevent code redundancy and to modularize our code.

const update = (location) => {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHtml = location.text;
};

// We start creating functions to make our game functional
const goStation = () => {
  update(locations[0]);
};

const goStore = () => {
  update(locations[1]);
};
const goPlanet = () => {
  update(locations[2]);
};
const fightAlien = () => {
  console.log("Fight alien.");
};

const buyHealth = () => {
  if (gold >= 5) {
    gold -= 5;
    health += 5;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerHTML = "You don't have enough gold to buy health.";
  }
};
const buyWeapon = () => {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 25) {
      gold -= 25;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon];
      text.innerHTML = "You now have a new weapon: " + newWeapon.name;
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerHTML = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
};

const sellWeapon = () => {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerHTML += " In your inventory you have: " + inventory;
  } else {
    text.innerHTML = "Don't sell your only weapon!";
  }
};
const fightPixins = () => {};
const fightAlienBeast = () => {};
const fightAlienDestructor = () => {};
const goFight = () => {};
const attack = () => {};
const dodge = () => {};
