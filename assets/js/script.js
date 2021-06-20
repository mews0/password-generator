// Password criteria variables
let passwordLength = 0;
let includeLowercaseLetters = false;
let includeUppercaseLetters = false;
let includeNumbers = false;
let includeSpecialCharacters = false;

// Password array variables
let passwordArray = [];
let passwordArrayValid = true;

// Unicode value constants
const basicLatinLower = 33;
const unicodeZero = 48;
const unicodeNine = 57;
const unicodeUppercaseA = 65;
const unicodeUppercaseZ = 90;
const unicodeLowercaseA = 97;
const unicodeLowercaseZ = 122;
const basicLatinUpper = 126;

// Function to prompt user to enter valid password criteria
let passwordCriteria = function() {
  // Prompt user for password length and validate input
  while (passwordLength < 8 || passwordLength > 128) {
    passwordLength = parseInt(prompt(`Please enter a password length between 8 and 128 characters:`));
    if (isNaN(passwordLength)) {
      passwordLength = 0;
    }
  }

  // Prompt user regarding inclusion of various character types in password - at least one character type must be selected
  while (includeLowercaseLetters === false && includeUppercaseLetters === false && includeNumbers === false && includeSpecialCharacters === false) {
    alert(`Please select at least one of the following character types to be included in your password.`);
    includeLowercaseLetters = confirm(`Would you like to include lowercase letters in your password?`);
    includeUppercaseLetters = confirm(`Would you like to include uppercase letters in your password?`);
    includeNumbers = confirm(`Would you like to include numbers in your password?`);
    includeSpecialCharacters = confirm(`Would you like to include special characters in your password?`); 
  }
}

// Function to generate a random integer between a minimum and maximum value
let randomNumber = function(min, max) {
  let value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

// Function to create an array of random integers (Unicode values) that correspond to Basic Latin characters
let createPasswordArray = function(length) {
  for (let i = 0; i < passwordLength; i++) {
    passwordArray[i] = randomNumber(basicLatinLower, basicLatinUpper);
  }
}

// Function to validate array created against password criteria
let validatePasswordArray = function(array, lowercase, uppercase, number, special) {

  // Functions to check array for an integer (Unicode value) that corresponds to a character type
  let checkArrayLowercase = function(lowercase) {
    return lowercase >= unicodeLowercaseA && lowercase <= unicodeLowercaseZ;
  }
  let checkArrayUppercase = function(uppercase) {
    return uppercase >= unicodeUppercaseA && uppercase <= unicodeUppercaseZ;
  }
  let checkArrayNumber = function(number) {
    return number >= unicodeZero && number <= unicodeNine;
  }
  let checkArraySpecial = function(special) {
    return (special >= 33 && special <= 47) || (special >= 58 && special <= 64) || (special >= 91 && special <= 96) || (special >= 123 && special <= 126);
  }

  // Reset passwordArrayValid variable
  passwordArrayValid = true;

  // Functions to determine if password matches criteria
  if (lowercase === true && Number.isInteger(array.find(checkArrayLowercase)) === false) {
    passwordArrayValid = false;
  }
  if (lowercase === false && Number.isInteger(array.find(checkArrayLowercase)) === true) {
    passwordArrayValid = false;
  }
  if (uppercase === true && Number.isInteger(array.find(checkArrayUppercase)) === false) {  
    passwordArrayValid = false;
  }
  if (uppercase === false && Number.isInteger(array.find(checkArrayUppercase)) === true) {  
    passwordArrayValid = false;
  }
  if (number === true && Number.isInteger(array.find(checkArrayNumber)) === false) {  
    passwordArrayValid = false;
  }
  if (number === false && Number.isInteger(array.find(checkArrayNumber)) === true) {  
    passwordArrayValid = false;
  }
  if (special === true && Number.isInteger(array.find(checkArraySpecial)) === false) {  
    passwordArrayValid = false;
  }
  if (special === false && Number.isInteger(array.find(checkArraySpecial)) === true) {  
    passwordArrayValid = false;
  }
}

// Function to convert each element in passwordArray from integer (Unicode value) to Basic Latin character and convert entire array to single string
let arrayToCharacters = function(array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = String.fromCharCode(array[i]);
  }

  return array.join("");
}

// Function to generate random password that meets criteria
let generatePassword = function() {
  // Prompt user to enter valid password criteria
  passwordCriteria();  

  do {
    // Create an array of random integers (Unicode values) that correspond to Basic Latin characters
    createPasswordArray(passwordLength);

    // validate array created against password criteria
    validatePasswordArray(passwordArray, includeLowercaseLetters, includeUppercaseLetters, includeNumbers, includeSpecialCharacters);
  }
  while (passwordArrayValid === false);

  // Convert each element in array from Unicode value (integer) to character and convert entire array to single string
  return arrayToCharacters(passwordArray);
}

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
