document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const html = document.documentElement;

  // Check localStorage for dark mode preference
  if (localStorage.getItem("darkMode") === "enabled") {
    html.classList.add("dark");
    darkModeToggle.checked = true; // Ensure toggle switch matches state
  }

  // Event listener for toggle switch
  darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
      html.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
  });
});