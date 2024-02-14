// Constants for input and output text elements, as well as buttons
const INPUT_TEXT = document.getElementById("inputText");
const OUTPUT_TEXT = document.getElementById("outputText");

// Constants for buttons
const BTN_CLEAR = document.querySelector(".btn-clear");
const BTN_SPEAK = document.getElementById("btnSpeak");
const BTN_SPEAK_OUTPUT = document.getElementById("btnSpeakOutput");
const BTN_CODE = document.getElementById("btn-encode");
const BTN_COPY = document.querySelector(".btn-copy");

// Constant for the output empty message element
const OUTPUT_EMPTY_MESSAGE = document.getElementById("outputEmptyMessage");

const MODAL = document.getElementById("myModal");

// Object mapping vowels to their encoded versions
const VOWEL_REPLACEMENT = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

// Object mapping encoded versions to their respective vowels
const DECODE_VOWEL = {
  ai: "a",
  enter: "e",
  imes: "i",
  ober: "o",
  ufat: "u",
};

// Function to clear input and output text fields
function clearText() {
  INPUT_TEXT.value = "";
  OUTPUT_TEXT.value = "";
  BTN_CODE.innerText = "Codificar";
  showEmptyMessage();
  verifyButtons();
}

// Function to speak the text
function speakText(source) {
  let text = document.getElementById(source).value;

  // Check if the browser supports speech synthesis
  if ("speechSynthesis" in window) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "pt-BR";
    speech.pitch = 2.5;
    window.speechSynthesis.speak(speech);
  } else {
    alert("Seu navegador não suporta a funcionalidade de fala.");
  }
}

// Function to copy text to clipboard
function copyToClipboard() {
  let text = OUTPUT_TEXT.value;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showCopiedModal(); // Exibe o modal após o texto ser copiado com sucesso
    })
    .catch((error) => {
      console.error(
        "Erro ao copiar texto para a área de transferência:",
        error
      );
    });
}

function showCopiedModal() {
  MODAL.style.display = "flex";

  const displayTime = 1200;

  setTimeout(() => {
    MODAL.style.display = "none";
  }, displayTime);
}

// Event listener when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  BTN_CODE.innerText = "Codificar";
  OUTPUT_TEXT.style.display = "none";
  BTN_COPY.style.display = "none";

  // Add input event listener to toggle button text between 'Encode' and 'Decode'
  INPUT_TEXT.addEventListener("input", function () {
    let text = INPUT_TEXT.value.toLowerCase();
    let isEncoded = isEncodedText(text);

    if (isEncoded) {
      BTN_CODE.innerText = "Decodificar";
    }
  });
});

// Function to display empty message if output text is empty
function showEmptyMessage() {
  if (OUTPUT_TEXT.value.trim() === "") {
    OUTPUT_TEXT.style.display = "none";
    BTN_COPY.style.display = "none";
    OUTPUT_EMPTY_MESSAGE.style.display = "flex";
  } else {
    OUTPUT_EMPTY_MESSAGE.style.display = "none";
    OUTPUT_TEXT.style.display = "block";
    BTN_COPY.style.display = "";
  }
}

function changeTextareaHeightDynamically() {
  if (window.matchMedia("(max-width:1020px)").matches) {
    INPUT_TEXT.style.height = "";
    INPUT_TEXT.style.height = INPUT_TEXT.scrollHeight + "px";
    OUTPUT_TEXT.style.height = "";
    OUTPUT_TEXT.style.height = OUTPUT_TEXT.scrollHeight + "px";
  } else {
    INPUT_TEXT.style.height = "";
    OUTPUT_TEXT.style.height = "";
  }
}

INPUT_TEXT.oninput = changeTextareaHeightDynamically;
OUTPUT_TEXT.oninput = changeTextareaHeightDynamically;
window.addEventListener(
  "resize",
  function (event) {
    changeTextareaHeightDynamically();
  },
  true
);

document.getElementById("currentYear").textContent = new Date().getFullYear();
