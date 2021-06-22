// Declare object to store arrays of character types
let characterType = {
  lowercaseLetters: [],
  uppercaseLetters: [],
  numericCharacters: [],
  specialCharacters: [],
  
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
    asArray: [],  // Password criteria represented as an array of characters
    get: function() {
      // Prompt user for password length and validate input
      while (this.length < 8 || this.length > 128) {
        this.length = parseInt(prompt(`Please enter a password length between 8 and 128 characters:`));
        if (isNaN(this.length)) {
          this.length = 0;
        }
      }

      // Prompt user regarding inclusion of various character types in password - at least one character type must be selected
      while (this.includeLowercaseLetters === false && this.includeUppercaseLetters === false && this.includeNumericCharacters === false && this.includeSpecialCharacters === false) {
        alert(`Please select at least one of the following character types to be included in your password.`);
        this.includeLowercaseLetters = confirm(`Would you like to include lowercase letters in your password?`);
        this.includeUppercaseLetters = confirm(`Would you like to include uppercase letters in your password?`);
        this.includeNumericCharacters = confirm(`Would you like to include numbers in your password?`);
        this.includeSpecialCharacters = confirm(`Would you like to include special characters in your password?`); 
      }
    }
  },
  
  asArray: [],  // Password text represented as an array of characters

  // Function to create an array of random integers (Unicode values) that correspond to Basic Latin characters
  createNew: function(length, includeLowercaseLetters, includeUppercaseLetters, includeNumericCharacters, includeSpecialCharacters) {
    
    // Create an array of characters that meet the user-defined criteria
    if (includeLowercaseLetters === true) {
      for (i = 0; i < characterType.lowercaseLetters.length; i++) {
        this.criteria.asArray.push(characterType.lowercaseLetters[i]);
      }
    }

    if (includeUppercaseLetters === true) {
      for (i = 0; i < characterType.uppercaseLetters.length; i++) {
        this.criteria.asArray.push(characterType.uppercaseLetters[i]);
      }
    }

    if (includeNumericCharacters === true) {
      for (i = 0; i < characterType.numericCharacters.length; i++) {
        this.criteria.asArray.push(characterType.numericCharacters[i]);
      }
    }

    if (includeSpecialCharacters === true) {
      for (i = 0; i < characterType.specialCharacters.length; i++) {
        this.criteria.asArray.push(characterType.specialCharacters[i]);
      }
    }
    
    // Randomly select characters from the array of characters that meet the user-defined criteria
    for (let i = 0; i < this.criteria.length; i++) {
      this.asArray[i] = this.criteria.asArray[randomNumber(0, this.criteria.asArray.length - 1)];
    }
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

  return password.asArray.join(``);
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
