function applyTheme(theme) {
  document.body.classList.toggle("dark-mode", theme === "dark");
  document.body.classList.toggle("light-mode", theme === "light");
  document.querySelector(".theme-toggle").textContent =
    theme === "dark" ? "🌙" : "☀️";

  document.documentElement.setAttribute("data-bs-theme", theme); // Ubah tema di <html>
  document.querySelector(".theme-toggle").textContent =
    theme === "dark" ? "🌙" : "☀️";
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

const username = "riyanfazrirahman";
const apiUrl = `https://api.github.com/users/${username}/repos`;
const perPage = 10; // Jumlah data per halaman
let currentPage = 1;
let repositories = [];
let filteredRepos = [];

async function fetchRepos() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch data from GitHub");

    repositories = await response.json();
    filteredRepos = repositories;
    document.getElementById("loading").style.display = "none";

    if (repositories.length === 0) {
      document.getElementById("repo-table").innerHTML =
        "<tr><td colspan='4' class='text-center'>No repositories found.</td></tr>";
      return;
    }

    showPage(currentPage);
    setupPagination();
  } catch (error) {
    console.error(error);
    document.getElementById("loading").innerText = "Failed to retrieve data.";
  }
}

function searchRepos() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  filteredRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm)
  );

  currentPage = 1; // Reset ke halaman pertama saat mencari
  showPage(currentPage);
  setupPagination();
}

function showPage(page) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedRepos = filteredRepos.slice(start, end);
  const tableBody = document.getElementById("repo-table");

  tableBody.innerHTML = "";
  paginatedRepos.forEach(async (repo) => {
    const pagesUrl = `https://${username}.github.io/${repo.name}/`;
    const pagesActive = await checkGitHubPages(pagesUrl);
    const languageBadge = getLanguageBadge(repo.language);

    const row = document.createElement("tr");
    row.innerHTML = `
            <td><a href="${
              repo.html_url
            }" target="_blank" class="text-decoration-none">📂 ${
      repo.name
    }</a></td>
            <td>📆 ${repo.created_at.split("T")[0]}</td>
            <td>${languageBadge}</td>
            <td>${
              pagesActive
                ? `<a href="${pagesUrl}" target="_blank" class="badge text-bg-secondary text-decoration-none">Link</a>`
                : "-"
            }</td>
        `;
    tableBody.appendChild(row);
  });
}

function setupPagination() {
  const totalPages = Math.ceil(filteredRepos.length / perPage);
  const paginationElement = document.getElementById("pagination");
  paginationElement.innerHTML = "";

  // Tombol Sebelumnya
  const prevButton = document.createElement("li");
  prevButton.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevButton.innerHTML = `<a class="page-link" href="#" onclick="changePage(${
    currentPage - 1
  })">Previous</a>`;
  paginationElement.appendChild(prevButton);

  // Nomor Halaman
  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement("li");
    pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
    pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
    paginationElement.appendChild(pageItem);
  }

  // Tombol Selanjutnya
  const nextButton = document.createElement("li");
  nextButton.className = `page-item ${
    currentPage === totalPages ? "disabled" : ""
  }`;
  nextButton.innerHTML = `<a class="page-link" href="#" onclick="changePage(${
    currentPage + 1
  })">Next</a>`;
  paginationElement.appendChild(nextButton);
}

function changePage(page) {
  if (page < 1 || page > Math.ceil(filteredRepos.length / perPage)) return;
  currentPage = page;
  showPage(currentPage);
  setupPagination();
}

async function checkGitHubPages(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

function getLanguageBadge(language) {
  if (!language) return "-";

  const badges = {
    JavaScript:
      "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
    TypeScript:
      "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white",
    Python:
      "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
    Java: "https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white",
    "C++":
      "https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white",
    "C#": "https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white",
    PHP: "https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white",
    HTML: "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white",
    CSS: "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white",
    SCSS: "https://img.shields.io/badge/SCSS-C69?style=for-the-badge&logo=sass&logoColor=white",
    Kotlin:
      "https://img.shields.io/badge/Kotlin-0095D5?style=for-the-badge&logo=kotlin&logoColor=white",
    Swift:
      "https://img.shields.io/badge/Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white",
    Dart: "https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white",
    Go: "https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white",
    Rust: "https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white",
    R: "https://img.shields.io/badge/R-276DC3?style=for-the-badge&logo=r&logoColor=white",
    Julia:
      "https://img.shields.io/badge/Julia-9558B2?style=for-the-badge&logo=julia&logoColor=white",
    MATLAB:
      "https://img.shields.io/badge/MATLAB-0076A8?style=for-the-badge&logo=mathworks&logoColor=white",
    Lua: "https://img.shields.io/badge/Lua-2C2D72?style=for-the-badge&logo=lua&logoColor=white",
    Shell:
      "https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white",
    SQL: "https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white",
    C: "https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=white",
    Assembly:
      "https://img.shields.io/badge/Assembly-525252?style=for-the-badge&logo=assemblyscript&logoColor=white",
  };

  return `<img src="${
    badges[language] ||
    "https://img.shields.io/badge/Unknown-gray?style=for-the-badge"
  }" alt="${language}">`;
}

fetchRepos();
