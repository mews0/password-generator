// Declare object to store arrays of character types
let characterType = {
  lowercaseLetters: [],
  uppercaseLetters: [],
  numericCharacters: [],
  specialCharacters: [],
  meetsUserCriteria: [],
  
  writeAll: function() {
    for (j = 97; j < 123; j++) {
      characterType.lowercaseLetters.push(String.fromCharCode(j)); 
    }
  
    for (j = 65; j < 91; j++) {
      characterType.uppercaseLetters.push(String.fromCharCode(j));
    }
  
    for (j = 48; j < 58; j++) {
      characterType.numericCharacters.push(String.fromCharCode(j));
    }
  
    for (j = 33; j < 48; j++) {
      characterType.specialCharacters.push(String.fromCharCode(j));
    }
    for (j = 58; j < 65; j++) {
      characterType.specialCharacters.push(String.fromCharCode(j));
    }
    for (j = 91; j < 97; j++) {
      characterType.specialCharacters.push(String.fromCharCode(j));
    }
    for (j = 123; j < 127; j++) {
      characterType.specialCharacters.push(String.fromCharCode(j));
    }
  }
};

// Declare object to store password information
let password = {
  length: 0,
  includeLowercaseLetters: false,
  includeUppercaseLetters: false,
  includeNumericCharacters: false,
  includeSpecialCharacters: false,
  getCriteria: function() {
    // Prompt user for password length and validate input
    while (password.length < 8 || password.length > 128) {
      password.length = parseInt(prompt(`Please enter a password length between 8 and 128 characters:`));
      if (isNaN(password.length)) {
        password.length = 0;
      }
    }

    // Prompt user regarding inclusion of various character types in password - at least one character type must be selected
    while (password.includeLowercaseLetters === false && password.includeUppercaseLetters === false && password.includeNumericCharacters === false && password.includeSpecialCharacters === false) {
      alert(`Please select at least one of the following character types to be included in your password.`);
      password.includeLowercaseLetters = confirm(`Would you like to include lowercase letters in your password?`);
      password.includeUppercaseLetters = confirm(`Would you like to include uppercase letters in your password?`);
      password.includeNumericCharacters = confirm(`Would you like to include numbers in your password?`);
      password.includeSpecialCharacters = confirm(`Would you like to include special characters in your password?`); 
    }
  },
  
  array: [],
  text: ``,

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
    for (let i = 0; i < password.length; i++) {
      password.array[i] = characterType.meetsUserCriteria[randomNumber(0, characterType.meetsUserCriteria.length - 1)];
    }

    // Convert array to single string
    password.text = password.array.join(``);
  }
};

// Function to generate a random integer between a minimum and maximum value
let randomNumber = function(min, max) {
  let value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

// Function to generate random password that meets criteria
let generatePassword = function() {
  password.getCriteria();  
  password.createNew(password.length, password.includeLowercaseLetters, password.includeUppercaseLetters, password.includeNumericCharacters, password.includeSpecialCharacters);

  return password.text;
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
