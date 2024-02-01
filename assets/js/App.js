function clearText() {
  document.getElementById("inputText").value = "";
  document.getElementById("outputText").value = "";
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

function showEmptyMessage() {
  let outputTextArea = document.getElementById("outputText");
  let outputEmptyMessage = document.getElementById("outputEmptyMessage");

  if (outputTextArea.value.trim() === "") {
    outputEmptyMessage.style.display = "block";
  } else {
    outputEmptyMessage.style.display = "none";
  }
}
