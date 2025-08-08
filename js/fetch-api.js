const API_REPO = "https://riyanfazrirahman-backend.vercel.app/api/repos/all";

let allRepos = [];

async function fetchRepos() {
  try {
    document.getElementById("loading").textContent = "Fetching data...";
    const [allRes] = await Promise.all([fetch(API_REPO)]);

    const allData = await allRes.json();

    allRepos = [...allData];
    allRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    renderTable();
    renderPagination();
    document.getElementById("loading").style.display = "none";
  } catch (error) {
    document.getElementById("loading").textContent = "Gagal ambil data.";
    console.error(error);
  }
}

fetchRepos();
