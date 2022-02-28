import { passwordStrength } from "check-password-strength";
const d = document;
const length = d.getElementById("length");
const lengthText = d.getElementById("lengthText");
const password = d.getElementById("password");
const strength = d.getElementById("strength");
const generateBtn = d.getElementById("generate");

//numbrs?? symbols
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "+",
  "=",
  "{",
  "}",
  "[",
  "]",
  "|",
  "\\",
  ":",
  ";",
  '"',
  "'",
  "<",
  ">",
  ",",
  ".",
  "?",
  "/",
  "~",
  "`",
];
//Event list generate pass btn

const utils = {
  getRandomNumBetween: (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min),
  getCharsFromArray: (array, num) => {
    let chars = "";
    for (let i = 0; i < num; i++) {
      const randNumber = utils.getRandomNumBetween(0, array.length - 1);
      //chars += array[randNumber];
      randNumber % 2 === 0
        ? (chars += array[randNumber])
        : (chars += array[randNumber].toUpperCase());
    }
    return chars;
  },
};

function generatePassword() {
  const passLength = length.value;
  const includeNums = document.querySelector("#includeNumbers").checked;
  const includeSymb = document.querySelector("#includeSymbols").checked;
  //console.log(passLength, includeNums, includeSymb);
  let tempPassword = "";
  if (includeNums) {
    tempPassword += utils.getCharsFromArray(
      numbers,
      utils.getRandomNumBetween(3, passLength / 3)
    );
    //console.log(tempPassword);
  }
  if (includeSymb) {
    tempPassword += utils.getCharsFromArray(
      symbols,
      utils.getRandomNumBetween(3, passLength / 3)
    );
  }
  tempPassword += utils.getCharsFromArray(
    letters,
    passLength - tempPassword.length
  );
  password.value = tempPassword
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
  const passwordQuality = passwordStrength(tempPassword, [
    {
      id: 0,
      value: "Too weak",
      minDiversity: 0,
      minLength: 8,
    },
    {
      id: 1,
      value: "Weak",
      minDiversity: 2,
      minLength: 8,
    },
    {
      id: 2,
      value: "Medium",
      minDiversity: 4,
      minLength: 12,
    },
    {
      id: 3,
      value: "Strong",
      minDiversity: 4,
      minLength: 16,
    },
  ]);
  switch (passwordQuality.value) {
    case "Too weak":
      strength.value = utils.getRandomNumBetween(0, 10);
      break;
    case "Weak":
      strength.value = utils.getRandomNumBetween(10, 30);
      break;
    case "Medium":
      strength.value = utils.getRandomNumBetween(30, 74);
      break;
    case "Strong":
      strength.value = utils.getRandomNumBetween(75, 100);
      break;
  }
}

//upadate the meter tag (check pw strength)

//set up copying to the clipboard
function handlePwClick(e) {
  if (e.currentTarget.value === "") return;
  const pwToCopy = password.value;
  //console.log(psToCopy);
  navigator.clipboard.writeText(pwToCopy);
  password.value = "Copied!!";
  setTimeout(() => {
    password.value = pwToCopy;
  }, 2000);
}

password.addEventListener("click", handlePwClick);
generateBtn.addEventListener("click", generatePassword);
//Update the character number when we drag the slider
length.addEventListener("change", (e) => {
  lengthText.textContent = e.currentTarget.value;
});
