let currentPage = 1;
const perPage = 5;

function renderTable() {
  const tbody = document.getElementById("repo-table");
  tbody.innerHTML = "";

  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filteredRepos = allRepos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm)
  );

  const paginatedRepos = filteredRepos.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  for (const repo of paginatedRepos) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="p-2">
        <a href="${
          repo.html_url
        }" class="text-decoration-none link-body-emphasis" target="_blank">${
      repo.name
    }</a>
        <div class="text-muted small"> 
          <img src="${repo.avatar_url}" width="16" class="me-1"> 
          by ${repo.owner}
        </div>
      </td>

      <td><i class="bi bi-clock-history"></i> ${repo.updated_at}</td>

      <td class="text-wrap">
        ${repo.languages
          .map(
            (lang) =>
              `<img src="https://img.shields.io/badge${getLanguageBadge(
                lang
              )}" alt="${lang.name}" /> `
          )
          .join("")}
      </td>
      
      <td class="text-center">
      ${
        repo.homepage
          ? `<a href="${repo.homepage}" class="badge text-bg-secondary text-decoration-none" target="_blank">Link</a>`
          : "-"
      }
      </td>
      
      <td><i class="bi bi-calendar-week"></i> ${repo.created_at}</td>
    `;
    tbody.appendChild(tr);
  }
}

function searchRepos() {
  currentPage = 1;
  renderTable();
  renderPagination();
}
