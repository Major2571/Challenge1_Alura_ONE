// Function to remove accents from text
function removeAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Function to verify the state of buttons and hide or show them accordingly
function verifyButtons() {
  let inputText = INPUT_TEXT.value.trim();
  let outputText = OUTPUT_TEXT.value.trim();

  BTN_CLEAR.classList.toggle("btn-hidden", inputText === "");
  BTN_SPEAK.classList.toggle("btn-hidden", inputText === "");
  BTN_SPEAK_OUTPUT.classList.toggle("btn-hidden", outputText === "");
}

/**
 * Encodes or decodes the input text based on its content.
 * If the text contains predefined encoded codes, it decodes them;
 * otherwise, it encodes the text by replacing vowels with specific codes.
 *
 * @param {string} text - The input text to be processed.
 * @returns {string} The processed text, either encoded or decoded.
 */
function processText() {
  // Get the input text from the input field
  let inputText = INPUT_TEXT.value.trim();

  // Check if the input text is encoded
  let isEncoded = isEncodedText(inputText);

  // If the text is encoded, decode it; otherwise, encode it
  if (isEncoded) {
    // Decode the input text
    let decodedTextResult = decodedText(inputText);
    OUTPUT_TEXT.value = decodedTextResult;
  } else {
    // Normalize the input text by converting to lowercase and removing accents
    let inputTextWithoutAccents = removeAccents(inputText.toLowerCase());
    // Encode the normalized input text
    let encodedTextResult = encodeText(inputTextWithoutAccents);
    OUTPUT_TEXT.value = encodedTextResult;
  }

  // Verify the state of the buttons and display the empty message if necessary
  verifyButtons();
  showEmptyMessage();
}

// Add an event listener to the input text field to trigger text processing
INPUT_TEXT.addEventListener("input", processText);

/**
 * Encodes the input text based on a predefined mapping of characters.
 *
 * @param {string} text - The text to be encoded.
 * @returns {string} The encoded text.
 */
function encodeText(text) {
  // Initialize an empty string to store the encoded text
  let encodedText = "";

  // Iterate through each character in the input text
  for (let i = 0; i < text.length; i++) {
    // Get the current character
    let currentChar = text[i];

    // Retrieve the replacement for the current character from the VOWEL_REPLACEMENT object
    let replacement = VOWEL_REPLACEMENT[currentChar];

    // If a replacement exists, append it to the encoded text; otherwise, append the original character
    encodedText += replacement !== undefined ? replacement : currentChar;
  }

  // Return the encoded text
  return encodedText;
}

/**
 * Verifies if the input text contains encoded codes.
 *
 * @param {string} text - The input text to be verified.
 * @returns {boolean} True if the input text contains encoded codes, false otherwise.
 */
function isEncodedText(text) {
  const ENCODED_CODE = ["ai", "enter", "imes", "ober", "ufat"];
  return ENCODED_CODE.some((code) => text.includes(code));
}

/**
 * Decodes the input text by replacing encoded codes with vowels.
 *
 * @param {string} text - The input text to be decoded.
 * @returns {string} The decoded text.
 */
function decodedText(text) {
  // Initialize a variable to store the decoded text, initially set to the input text
  let decodedText = text;

  // Iterate through each encoded code in the DECODE_VOWEL object
  for (const code in DECODE_VOWEL) {
    // Create a regular expression to match all occurrences of the current code in the text
    const regex = new RegExp(code, "g");

    // Replace all occurrences of the current code with its corresponding vowel in the text
    decodedText = decodedText.replace(regex, DECODE_VOWEL[code]);
  }

  // Return the decoded text
  return decodedText;
}
