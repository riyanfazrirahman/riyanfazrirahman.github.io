function loadComponent(id, file) {
  return fetch(file)
    .then((res) => {
      if (!res.ok) throw new Error(`Gagal load ${file}`);
      return res.text();
    })
    .then((html) => {
      document.getElementById(id).innerHTML = html;
    });
}

function loadScriptsSequentially(scripts) {
  if (!scripts?.length) return Promise.resolve();
  return scripts.reduce((p, src) => {
    return p.then(
      () =>
        new Promise((resolve) => {
          const s = document.createElement("script");
          s.src = src;
          s.onload = resolve;
          document.body.appendChild(s);
        })
    );
  }, Promise.resolve());
}

// Daftar komponen + scriptnya
const components = [
  { id: "comNavbar", file: "templates/navbar.html", scripts: ["js/theme.js"] },
  { id: "comResume", file: "components/resume.html", scripts: [] },
  { id: "comSpecialis", file: "components/specialis.html", scripts: [] },
  { id: "comAbout", file: "components/about.html", scripts: [] },
  { id: "comMainProject", file: "components/main_project.html", scripts: [] },
  { id: "comNewProject", file: "components/new_project.html", scripts: [] },
  {
    id: "comRepositories",
    file: "components/repositories.html",
    scripts: [
      "js/fetch-api.js",
      "js/script.js",
      "js/badge.js",
      "js/pagination.js",
    ],
  },
  { id: "comContact", file: "components/contact.html", scripts: [] },
  {
    id: "comFooter",
    file: "templates/footer.html",
    scripts: ["js/floatingButton.js", "js/scrollTop.js"],
  },
];

// Load tiap komponen + scriptnya
components.forEach((comp) => {
  loadComponent(comp.id, comp.file)
    .then(() => loadScriptsSequentially(comp.scripts))
    .catch((err) => console.error(err));
});
