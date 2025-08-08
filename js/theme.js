function applyTheme(theme) {
  document.body.classList.toggle("dark-mode", theme === "dark");
  document.body.classList.toggle("light-mode", theme === "light");

  // Ganti ikon toggle
  document.querySelector(".theme-toggle").innerHTML =
    theme === "dark"
      ? "<i class='bi bi-moon-fill'></i>"
      : "<i class='bi bi-sun-fill'></i>";

  // Bootstrap theme system (opsional)
  document.documentElement.setAttribute("data-bs-theme", theme);

  // Simpan ke localStorage
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const currentTheme = document.body.classList.contains("dark-mode")
    ? "light"
    : "dark";
  applyTheme(currentTheme);
}

// Deteksi tema dari sistem
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const savedTheme =
  localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");
applyTheme(savedTheme);
