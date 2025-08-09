const sections = [
  "comNavbar",
  "comResume",
  "comSpecialis",
  "comAbout",
  "comMainProject",
  "comNewProject",
  "comRepositories",
  "comContact",
  "comFooter",
];

const btn = document.getElementById("scroll-btn");

function getCurrentSectionIndex() {
  let index = 0;
  let scrollY = window.scrollY + window.innerHeight / 2;
  const bottomThreshold = 10; // px toleransi

  if (
    window.scrollY + window.innerHeight >=
    document.body.offsetHeight - bottomThreshold
  ) {
    return sections.length - 1;
  }

  sections.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) {
      index = i;
    }
  });

  return index;
}

btn.addEventListener("click", () => {
  let currentIndex = getCurrentSectionIndex();
  if (currentIndex < sections.length - 1) {
    // Scroll ke bawah
    document.getElementById(sections[currentIndex + 1]).scrollIntoView({
      behavior: "smooth",
    });
  } else {
    // Scroll ke atas
    document.getElementById(sections[0]).scrollIntoView({
      behavior: "smooth",
    });
  }
});

// Ubah ikon sesuai posisi
window.addEventListener("scroll", () => {
  let currentIndex = getCurrentSectionIndex();
  if (currentIndex >= sections.length - 1) {
    btn.innerHTML = `<i class="bi bi-caret-up-fill"></i>`;
  } else {
    btn.innerHTML = `<i class="bi bi-caret-down-fill"></i>`;
  }
});
