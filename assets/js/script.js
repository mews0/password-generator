// Declare object to store arrays of character types
let characterArray = {
  lowercaseLetters: [],
  uppercaseLetters: [],
  numericCharacters: [],
  specialCharacters: []
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
  // Function to create an array of random integers (Unicode values) that correspond to Basic Latin characters
  create: function(length) {  
    for (let i = 0; i < password.length; i++) {
      password.array[i] = randomNumber(unicode.basicLatinLower, unicode.basicLatinUpper);
    }
  },
  array: [],
  validate: function(array, lowercase, uppercase, number, special) {
    // Functions to check array for an integer (Unicode value) that corresponds to a character type
    let checkArrayLowercase = function(lowercase) {
      return lowercase >= unicode.lowercaseA && lowercase <= unicode.lowercaseZ;
    }
    let checkArrayUppercase = function(uppercase) {
      return uppercase >= unicode.uppercaseA && uppercase <= unicode.uppercaseZ;
    }
    let checkArrayNumber = function(number) {
      return number >= unicode.zero && number <= unicode.nine;
    }
    let checkArraySpecial = function(special) {
      return (special >= 33 && special <= 47) || (special >= 58 && special <= 64) || (special >= 91 && special <= 96) || (special >= 123 && special <= 126);
    }

    // Reset password.valid variable
    password.valid = true;

    // Functions to determine if password matches criteria
    if (lowercase === true && Number.isInteger(array.find(checkArrayLowercase)) === false) {
      password.valid = false;
    }
    if (lowercase === false && Number.isInteger(array.find(checkArrayLowercase)) === true) {
      password.valid = false;
    }
    if (uppercase === true && Number.isInteger(array.find(checkArrayUppercase)) === false) {  
      password.valid = false;
    }
    if (uppercase === false && Number.isInteger(array.find(checkArrayUppercase)) === true) {  
      password.valid = false;
    }
    if (number === true && Number.isInteger(array.find(checkArrayNumber)) === false) {  
      password.valid = false;
    }
    if (number === false && Number.isInteger(array.find(checkArrayNumber)) === true) {  
      password.valid = false;
    }
    if (special === true && Number.isInteger(array.find(checkArraySpecial)) === false) {  
      password.valid = false;
    }
    if (special === false && Number.isInteger(array.find(checkArraySpecial)) === true) {  
      password.valid = false;
    }
  },
  valid: true,
  // Function to convert each element in password.array from integer (Unicode value) to Basic Latin character and convert entire array to single string
  toCharacters: function(array) {
    for (let i = 0; i < array.length; i++) {
      array[i] = String.fromCharCode(array[i]);
    }
  
    return array.join("");
  }
};

// Function to write characters to corresponding character type in characterArray object
let charactersToArray = function() {
  for (j = 97; j < 123; j++) {
    characterArray.lowercaseLetters.push(String.fromCharCode(j)); 
  }

  for (j = 65; j < 91; j++) {
    characterArray.uppercaseLetters.push(String.fromCharCode(j));
  }

  for (j = 48; j < 58; j++) {
    characterArray.numericCharacters.push(String.fromCharCode(j));
  }

  for (j = 33; j < 48; j++) {
    characterArray.specialCharacters.push(String.fromCharCode(j));
  }
  for (j = 58; j < 65; j++) {
    characterArray.specialCharacters.push(String.fromCharCode(j));
  }
  for (j = 91; j < 97; j++) {
    characterArray.specialCharacters.push(String.fromCharCode(j));
  }
  for (j = 123; j < 127; j++) {
    characterArray.specialCharacters.push(String.fromCharCode(j));
  }
}

const unicode = {
  basicLatinLower: 33,
  zero: 48,
  nine: 57,
  uppercaseA: 65,
  uppercaseZ: 90,
  lowercaseA: 97,
  lowercaseZ: 122,
  basicLatinUpper: 126
};

// Function to generate a random integer between a minimum and maximum value
let randomNumber = function(min, max) {
  let value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}



// Function to generate random password that meets criteria
let generatePassword = function() {
  // Prompt user to enter valid password criteria
  password.getCriteria();  

  do {
    // Create an array of random integers (Unicode values) that correspond to Basic Latin characters
    password.create(password.length);

    // validate array created against password criteria
    password.validate(password.array, password.includeLowercaseLetters, password.includeUppercaseLetters, password.includeNumericCharacters, password.includeSpecialCharacters);
  }
  while (password.valid === false);

  // Convert each element in array from Unicode value (integer) to character and convert entire array to single string
  return password.toCharacters(password.array);
}

// Write characters to corresponding character type in characterArray object
charactersToArray();

// Get references to the #generate element
let generateBtn = document.querySelector("#generate");

// Write password to the #password input
let writePassword = function() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
