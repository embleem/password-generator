// passwordCharacterOptions contains all necessary string data needed to generate the password
const passwordCharacterOptions = {
    num: "1234567890",
    specialChar: "!@#$%&'()*+,^-./:;<=>?[]_`{~}|",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  };
  
// Password Generate function 
  let passwordGenerate = function () {
    // empty variable to store password information
    let passwordInfo = "";
  
    // list of chosen characters
    const passwordCharactors = [];
  
    // ask user for the length of their password
    let howManyCharacters = window.prompt(
      "Enter the amount of characters you want for your password. NOTE: Must be between 8-128 characters"
    );
  
    // If the character length doesn't match requirements, alert the user
    if (howManyCharacters >= 8 && howManyCharacters < 129) {
      // ask if user wants to include integers
      const getInteger = window.confirm("Would you like to include NUMBERS?");
  
      // if user wants to include numbers
      if (getInteger) {
        // add numerical characters to password data
        passwordInfo += passwordCharacterOptions.num;
        // add a number to the array of chosen characters
        passwordCharactors.push(getRandomChar(passwordCharacterOptions.num));
      }
  
      // ask if user wants to include special characters
      const ifSpecialCharacters = window.confirm(
        "Would you like to include SPECIAL characters?"
      );
  
      // if user wants to include special characters
      if (ifSpecialCharacters) {
        // add special characters to password data
        passwordInfo += passwordCharacterOptions.specialChar;
        // add a special character to the array of chosen characters
        passwordCharactors.push(getRandomChar(passwordCharacterOptions.specialChar));
      }
  
      // ask if user wants to include lowercase characters
      const ifLowerCase = window.confirm(
        "Would you like to include LOWERCASE characters?"
      );
  
      // if user wants to include lowercase characters
      if (ifLowerCase) {
        // add lowercase characters to password data
        passwordInfo += passwordCharacterOptions.lowerCase;
        // add a lowercase character to the list of chosen characters
        passwordCharactors.push(getRandomChar(passwordCharacterOptions.lowerCase));
      }
  
      // ask if user wants to include uppercase characters
      const ifUpperCase = window.confirm(
        "Would you like to include UPPERCASE characters?"
      );
  
      // if user wants to include uppercase characters
      if (ifUpperCase) {
        // add uppercase characters to password data
        passwordInfo += passwordCharacterOptions.upperCase;
        // add a uppercase character to the list of chosen characters
        passwordCharactors.push(getRandomChar(passwordCharacterOptions.upperCase));
      }
  
      // if passwordInfo is empty then ensure the user chooses at least one option
      if (!passwordInfo) {
        // notify user needs to select at least one option
        window.alert("You need to select at least one option, please try again!");
        // return user back to their questions
        return passwordGenerate();
      }
  
      // while/if there aren't enough characters
      while (passwordCharactors.length < howManyCharacters) {
        // pick a random character from passwordInfo
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
    // Take the password data from passwordGenerate(); and store it into a variable
    let password = passwordGenerate();
    // passwordText contains data that's connected to the css file
    let passwordText = document.querySelector("#password");
  
    // The data within the password variable is then stored into passwordText.value, so the stringed data can be displayed
    passwordText.value = password;
  }
  
  // The event listener looks for a click to then look at the function writePassword
  generateBtn.addEventListener("click", writePassword);
  
  // Connected to Add To Clipboard button, will copy any text within the textarea
  let copyPass = function () {
    // textarea's id value is tied to copyPass
    const copyPass = document.getElementById("password");
    // Add the value of copyPass into clipboard
    navigator.clipboard.writeText(copyPass.value);
    // Notify user
    window.alert("Your password has been copied!");
  };