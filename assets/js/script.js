// Assignment code here

// Prompt user for password criteria and validate input
  // Length (8 - 128 characters)?
  // Include lowercase letters?
  // Include uppercase letters?
  // Include numbers?
  // Include special characters?

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
