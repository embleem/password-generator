// passwordCharacterOptions contains all necessary string data needed to generate the password
const passwordCharacterOptions = {
  num: "1234567890",
  specialChar: "!@#$%&'()*+,^-./:;<=>?[]_`{~}|",
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
};

// Password Generate function
let passwordGenerate = function () {
  let passwordInfo = "";

  // list of chosen characters
  const passwordCharactors = [];

  // Asking Users if they would like to add numbers/special characters/ lower and upper case characters
  let howManyCharacters = window.prompt(
    "Enter the amount of characters you want for your password. NOTE: Must be between 8-128 characters"
  );

  if (howManyCharacters >= 8 && howManyCharacters < 129) {
    const ifNumbers = window.confirm("Would you like to include NUMBERS?");

    if (ifNumbers) {
      passwordInfo += passwordCharacterOptions.num;
      passwordCharactors.push(getRandomChar(passwordCharacterOptions.num));
    }

    const ifSpecialCharacters = window.confirm(
      "Would you like to include SPECIAL characters?"
    );

    if (ifSpecialCharacters) {
      passwordInfo += passwordCharacterOptions.specialChar;
      passwordCharactors.push(
        getRandomChar(passwordCharacterOptions.specialChar)
      );
    }

    const ifLowerCase = window.confirm(
      "Would you like to include LOWERCASE characters?"
    );

    if (ifLowerCase) {
      passwordInfo += passwordCharacterOptions.lowerCase;
      passwordCharactors.push(
        getRandomChar(passwordCharacterOptions.lowerCase)
      );
    }

    const ifUpperCase = window.confirm(
      "Would you like to include UPPERCASE characters?"
    );

    if (ifUpperCase) {
      passwordInfo += passwordCharacterOptions.upperCase;
      passwordCharactors.push(
        getRandomChar(passwordCharacterOptions.upperCase)
      );
    }

    // if passwordInfo is empty then ensure the user chooses at least one option
    if (!passwordInfo) {
      window.alert("You need to select at least one option, please try again!");
      return passwordGenerate();
    }

    while (passwordCharactors.length < howManyCharacters) {
      passwordCharactors.push(getRandomChar(passwordInfo));
    }

    // shuffling the list of characters using Fisher-Yates algorithm
    for (let i = passwordCharactors.length - 1; i > 0; i--) {
      const swapIndex = Math.floor(Math.random() * (i + 1));
      const temp = passwordCharactors[i];
      passwordCharactors[i] = passwordCharactors[swapIndex];
      passwordCharactors[swapIndex] = temp;
    }

    // return the password character array concatenated to a string
    return passwordCharactors.join("");
  }
  // if user's response is invalid
  else {
    // alert user
    window.alert("You need to provide a valid length!");
    // return user back to initialState
    return initialState;
  }
};

// getRandomChar pulls from the passwordCharactors array, fromString processes the value
let getRandomChar = function (fromString) {
  return fromString[Math.floor(Math.random() * fromString.length)];
};

// References to the #generate element
let generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  let password = passwordGenerate();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// The event listener looks for a click to then look at the function writePassword
generateBtn.addEventListener("click", writePassword);

// Connected to Add To Clipboard button, will copy any text within the textarea
let copyPass = function () {
  const copyPass = document.getElementById("password");
  navigator.clipboard.writeText(copyPass.value);
  window.alert("Your password has been copied!");
};
