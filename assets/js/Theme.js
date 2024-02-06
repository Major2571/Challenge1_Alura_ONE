// Constants for the toggle switch and theme text elements
const TOGGLE_SWITCH = document.getElementById("mode");
const THEME_TEXT = document.getElementById("theme");

// Function to switch between light and dark themes
function switchTheme() {
  // Check if the toggle switch is checked
  const isDarkMode = TOGGLE_SWITCH.checked;

  // Apply classes and update text content based on the selected mode
  if (isDarkMode) {
    applyDarkMode();
    saveThemeToLocalStorage("dark");
  } else {
    applyLightMode();
    saveThemeToLocalStorage("light");
  }
}

// Apply dark mode classes and update theme text
function applyDarkMode() {
  document.body.classList.add("dark-theme");
  document.body.classList.remove("light-theme");
  THEME_TEXT.textContent = "Dark Mode";
}

// Apply light mode classes and update theme text
function applyLightMode() {
  document.body.classList.remove("dark-theme");
  document.body.classList.add("light-theme");
  THEME_TEXT.textContent = "Light Mode";
}

// Save the selected theme in localStorage
function saveThemeToLocalStorage(theme) {
  localStorage.setItem("theme", theme);
}

// Event listener for the theme toggle switch
TOGGLE_SWITCH.addEventListener("change", switchTheme);

// Check the current theme on page load and set the toggle switch accordingly
document.addEventListener("DOMContentLoaded", function () {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    TOGGLE_SWITCH.checked = true;
    applyDarkMode();
  } else {
    TOGGLE_SWITCH.checked = false;
    applyLightMode();
  }
});
