function clearText() {
  document.getElementById("inputText").value = "";
  document.getElementById("outputText").value = "";
  showEmptyMessage();
  verifyEncode();
}

function speakText(source) {
  let text = document.getElementById(source).value;

  if ("speechSynthesis" in window) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "pt-BR";
    speech.pitch = 2.5;
    window.speechSynthesis.speak(speech);
  } else {
    alert("Seu navegador não suporta a funcionalidade de fala.");
  }
}

function copyToClipboard() {
  let text = document.getElementById("outputText").value;
  navigator.clipboard.writeText(text);
}

function removeAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

document.addEventListener("DOMContentLoaded", function () {
  let inputText = document.getElementById("inputText");
  let btnEncodeDecode = document.getElementById("btn-encode");
  btnEncodeDecode.innerText = "Codificar";

  inputText.addEventListener("input", function () {
    let text = inputText.value.toLowerCase();
    let isEncoded = isEncodedText(text);

    if (isEncoded) {
      btnEncodeDecode.innerText = "Decodificar";
    }
  });
});

function verifyEncode() {
  let inputText = document.getElementById("inputText").value.trim();
  let outputText = document.getElementById("outputText").value.trim();
  let btnClear = document.querySelector(".btn-clear");
  let btnSpeak = document.getElementById("btnSpeak");
  let btnSpeakOutput = document.getElementById("btnSpeakOutput");

  if (inputText !== "") {
    btnClear.classList.remove("btn-hidden");
    btnSpeak.classList.remove("btn-hidden");
  } else {
    btnClear.classList.add("btn-hidden");
    btnSpeak.classList.add("btn-hidden");
  }

  if (outputText !== "") {
    btnSpeakOutput.classList.remove("btn-hidden");
  } else {
    btnSpeakOutput.classList.add("btn-hidden");
  }
}

  

function showEmptyMessage() {
  let outputTextArea = document.getElementById("outputText");
  let outputEmptyMessage = document.getElementById("outputEmptyMessage");

  if (outputTextArea.value.trim() === "") {
    outputEmptyMessage.style.display = "block";
  } else {
    outputEmptyMessage.style.display = "none";
  }
}

function processText() {
  let inputText = document.getElementById("inputText").value;

  let isEncoded = isEncodedText(inputText);

  if (isEncoded) {
    let decodedTextResult = decodedText(inputText);
    document.getElementById("outputText").value = decodedTextResult;
  } else {
    let inputTextWithoutAccents = removeAccents(inputText.toLowerCase());
    let encodedTextResult = encodeText(inputTextWithoutAccents);
    document.getElementById("outputText").value = encodedTextResult;
  }

  verifyEncode();
  showEmptyMessage();
}

document.getElementById("inputText").addEventListener("input", processText);

function encodeText(text) {
  const VOWEL_REPLACEMENT = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };

  let encodedText = "";

  for (let i = 0; i < text.length; i++) {
    let currentChar = text[i];
    let replacement = VOWEL_REPLACEMENT[currentChar];
    encodedText += replacement !== undefined ? replacement : currentChar;
  }

  return encodedText;
}

function isEncodedText(text) {
  const ENCODED_CODE = ["ai", "enter", "imes", "ober", "ufat"];
  return ENCODED_CODE.some((code) => text.includes(code));
}

function decodedText(text) {
  const DECODE_VOWEL = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u",
  };

  let decodedText = text;

  for (const code in DECODE_VOWEL) {
    const regex = new RegExp(code, "g");
    decodedText = decodedText.replace(regex, DECODE_VOWEL[code]);
  }

  return decodedText;
}
