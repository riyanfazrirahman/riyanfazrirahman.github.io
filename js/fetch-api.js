const API_REPO = "https://riyanfazrirahman-backend.vercel.app/api/repos/all";

let allRepos = [];

async function fetchRepos() {
  try {
    document.getElementById("refresh-btn").classList.add("d-none");
    document.getElementById("loading").textContent = "Fetching data...";
    document.getElementById("loading").style.display = "block";

    const [allRes] = await Promise.all([fetch(API_REPO)]);
    const allData = await allRes.json();

    allRepos = [...allData];
    allRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    renderTable();
    renderPagination();
    document.getElementById("loading").style.display = "none";
  } catch (error) {
    document.getElementById("loading").textContent = "Gagal ambil data.";
    document.getElementById("refresh-btn").classList.remove("d-none"); // munculkan tombol refresh
    console.error(error);
  }
}

fetchRepos();
