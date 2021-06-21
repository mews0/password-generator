// Declare object to store arrays of character types
let characterType = {
  lowercaseLetters: [],
  uppercaseLetters: [],
  numericCharacters: [],
  specialCharacters: [],
  meetsUserCriteria: [],
  
  writeAll: function() {
    for (i = 97; i < 123; i++) {
      this.lowercaseLetters.push(String.fromCharCode(i)); 
    }
  
    for (i = 65; i < 91; i++) {
      this.uppercaseLetters.push(String.fromCharCode(i));
    }
  
    for (i = 48; i < 58; i++) {
      this.numericCharacters.push(String.fromCharCode(i));
    }
  
    for (i = 33; i < 48; i++) {
      this.specialCharacters.push(String.fromCharCode(i));
    }
    for (i = 58; i < 65; i++) {
      this.specialCharacters.push(String.fromCharCode(i));
    }
    for (i = 91; i < 97; i++) {
      this.specialCharacters.push(String.fromCharCode(i));
    }
    for (i = 123; i < 127; i++) {
      this.specialCharacters.push(String.fromCharCode(i));
    }
  }
};

// Declare object to store password information
let password = {
  criteria: {
    length: 0,
    includeLowercaseLetters: false,
    includeUppercaseLetters: false,
    includeNumericCharacters: false,
    includeSpecialCharacters: false,
    get: function() {
      // Prompt user for password length and validate input
      while (password.criteria.length < 8 || password.criteria.length > 128) {
        password.criteria.length = parseInt(prompt(`Please enter a password length between 8 and 128 characters:`));
        if (isNaN(password.criteria.length)) {
          password.criteria.length = 0;
        }
      }

      // Prompt user regarding inclusion of various character types in password - at least one character type must be selected
      while (password.criteria.includeLowercaseLetters === false && password.criteria.includeUppercaseLetters === false && password.criteria.includeNumericCharacters === false && password.criteria.includeSpecialCharacters === false) {
        alert(`Please select at least one of the following character types to be included in your password.`);
        password.criteria.includeLowercaseLetters = confirm(`Would you like to include lowercase letters in your password?`);
        password.criteria.includeUppercaseLetters = confirm(`Would you like to include uppercase letters in your password?`);
        password.criteria.includeNumericCharacters = confirm(`Would you like to include numbers in your password?`);
        password.criteria.includeSpecialCharacters = confirm(`Would you like to include special characters in your password?`); 
      }
    }
  },
  
  asArray: [],
  asString: ``,

  // Function to create an array of random integers (Unicode values) that correspond to Basic Latin characters
  createNew: function(length, includeLowercaseLetters, includeUppercaseLetters, includeNumericCharacters, includeSpecialCharacters) {
    
    // Create an array of characters that meet the user-defined criteria
    if (includeLowercaseLetters === true) {
      for (i = 0; i < characterType.lowercaseLetters.length; i++) {
        characterType.meetsUserCriteria.push(characterType.lowercaseLetters[i]);
      }
    }

    if (includeUppercaseLetters === true) {
      for (i = 0; i < characterType.uppercaseLetters.length; i++) {
        characterType.meetsUserCriteria.push(characterType.uppercaseLetters[i]);
      }
    }

    if (includeNumericCharacters === true) {
      for (i = 0; i < characterType.numericCharacters.length; i++) {
        characterType.meetsUserCriteria.push(characterType.numericCharacters[i]);
      }
    }

    if (includeSpecialCharacters === true) {
      for (i = 0; i < characterType.specialCharacters.length; i++) {
        characterType.meetsUserCriteria.push(characterType.specialCharacters[i]);
      }
    }
    
    // Randomly select characters from the array of characters that meet the user-defined criteria
    for (let i = 0; i < password.criteria.length; i++) {
      password.asArray[i] = characterType.meetsUserCriteria[randomNumber(0, characterType.meetsUserCriteria.length - 1)];
    }

    // Convert array to single string
    password.asString = password.asArray.join(``);
  }
};

// Function to generate a random integer between a minimum and maximum value
let randomNumber = function(min, max) {
  let value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

// Function to generate random password that meets criteria
let generatePassword = function() {
  password.criteria.get();  
  password.createNew(password.criteria.length, password.criteria.includeLowercaseLetters, password.criteria.includeUppercaseLetters, password.criteria.includeNumericCharacters, password.criteria.includeSpecialCharacters);

  return password.asString;
}

// Get references to the #generate element
let generateBtn = document.querySelector("#generate");

// Write password to the #password input
let writePassword = function() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Write characters to corresponding character type in characterArray object
characterType.writeAll();

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
