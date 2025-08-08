function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(allRepos.length / perPage);
  const maxVisible = 5; // jumlah tombol aktif di tengah
  const range = 2; // jumlah kiri-kanan dari currentPage

  function createPageItem(
    label,
    page = null,
    isActive = false,
    isDisabled = false
  ) {
    const li = document.createElement("li");
    li.className = `page-item ${isActive ? "active" : ""} ${
      isDisabled ? "disabled" : ""
    }`;

    li.innerHTML = `<a class="page-link" href="#">${label}</a>`;

    if (!isDisabled && page !== null) {
      li.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = page;
        renderTable();
        renderPagination();
      });
    }

    return li;
  }

  // << Previous
  pagination.appendChild(
    createPageItem("&laquo;", currentPage - 1, false, currentPage === 1)
  );

  let startPage = Math.max(1, currentPage - range);
  let endPage = Math.min(totalPages, currentPage + range);

  // Tambahkan ...
  if (startPage > 2) {
    pagination.appendChild(createPageItem("1", 1));
    pagination.appendChild(createPageItem("...", null, false, true));
  } else {
    for (let i = 1; i < startPage; i++) {
      pagination.appendChild(createPageItem(i, i));
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pagination.appendChild(createPageItem(i, i, i === currentPage));
  }

  if (endPage < totalPages - 1) {
    pagination.appendChild(createPageItem("...", null, false, true));
    pagination.appendChild(createPageItem(totalPages, totalPages));
  } else {
    for (let i = endPage + 1; i <= totalPages; i++) {
      pagination.appendChild(createPageItem(i, i));
    }
  }

  // >> Next
  pagination.appendChild(
    createPageItem(
      "&raquo;",
      currentPage + 1,
      false,
      currentPage === totalPages
    )
  );
}
