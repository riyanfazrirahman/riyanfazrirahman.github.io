function applyTheme(theme) {
  document.body.classList.toggle("dark-mode", theme === "dark");
  document.body.classList.toggle("light-mode", theme === "light");

  // Ganti ikon toggle
  document.querySelector(".theme-toggle").innerHTML =
    theme === "dark"
      ? "<i class='bi bi-moon-fill'></i>"
      : "<i class='bi bi-sun-fill'></i>";

  // Ganti gambar about
  const aboutImg = document.querySelector("#about-img");
  if (aboutImg) {
    aboutImg.src =
      theme === "dark" ? "assets/image1-1.png" : "assets/image1-2.png";
  }

  // Bootstrap theme system (opsional)
  document.documentElement.setAttribute("data-bs-theme", theme);

  // Simpan ke localStorage
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  // Ambil tema saat ini dari localStorage atau deteksi sistem
  const currentTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  // Tentukan tema baru
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  // Terapkan
  applyTheme(newTheme);
}

// Deteksi tema dari sistem
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const savedTheme =
  localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");
applyTheme(savedTheme);
