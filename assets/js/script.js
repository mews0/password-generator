// Declare variables
let passwordLength = 0;
let includeLowercaseLetters = false;
let includeUppercaseLetters = false;
let includeNumbers = false;
let includeSpecialCharacters = false;

// Function to prompt user to enter password criteria
let passwordCriteria = function() {

  // Prompt user for password length and validate input
  while (passwordLength < 8 || passwordLength > 128) {
    passwordLength = parseInt(prompt(`Please enter a password length between 8 and 128 characters:`));
    if (isNaN(passwordLength)) {
      passwordLength = 0;
    }
  };

  // Prompt user regarding inclusion of various character types in password - at least one character type must be selected
  while (includeLowercaseLetters === false && includeUppercaseLetters === false && includeNumbers === false && includeSpecialCharacters === false) {
    alert(`Please select at least one of the following character types to be included in your password.`);
    includeLowercaseLetters = confirm(`Would you like to include lowercase letters in your password?`);
    includeUppercaseLetters = confirm(`Would you like to include uppercase letters in your password?`);
    includeNumbers = confirm(`Would you like to include numbers in your password?`);
    includeSpecialCharacters = confirm(`Would you like to include special characters in your password?`);

    console.log(passwordLength, includeLowercaseLetters, includeUppercaseLetters, includeNumbers, includeSpecialCharacters);
  }
}
// *** WHERE DO I PUT passwordCriteria() FUNCTION CALL? ***

// Generate random password that meets criteria
let generatePassword = function() {
  // Arguments
    // length (integer)
    // includeLowercaseLetters (boolean)
    // includeUppercaseLetters (boolean)
    // includeNumbers (boolean)
    // includeSymbols (boolean)

  // While all character criteria are not met in generated array, generate array
    
    // For i to length entered by user, generate an array of random integers 33 - 126 (Unicode values for Basic Latin characters)

    // Validate array against password criteria
      // IF includeLowercaseLetters = 'true' THEN array must contain at least one integer between 97 and 122
      // IF includeUppercaseLetters = 'true' THEN array must contain at least one integer between 65 and 90
      // IF includeNumbers = 'true' THEN array must contain at least one integer between 48 and 57
      // IF includeSymbols = 'true' THEN array must contain at least one integer
        // between 33 and 47 OR
        // between 58 and 64 OR
        // between 91 and 96 OR
        // between 123 and 126

  // Convert each element in array from Unicode value (integer) to character

  // Convert array to string
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
