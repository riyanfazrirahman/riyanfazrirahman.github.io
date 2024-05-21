function pilihGauss3x3(buttonElement) {
  document.getElementById("pilihGaus3x3").style.display = "block";
  document.getElementById("pilihGaus4x4").style.display = "none";

  buttonElement.classList.add("btn-pilih-active");
  document
    .querySelector("button[onclick='pilihGauss4x4(this)']")
    .classList.remove("btn-pilih-active");
}

function pilihGauss4x4(buttonElement) {
  document.getElementById("pilihGaus4x4").style.display = "block";
  document.getElementById("pilihGaus3x3").style.display = "none";

  buttonElement.classList.add("btn-pilih-active");
  document
    .querySelector("button[onclick='pilihGauss3x3(this)']")
    .classList.remove("btn-pilih-active");
}

function resetForm3x3() {
  document.getElementById("formGauss3x3").reset();
  document.getElementById("boxHasilGauss3x3").value = "";

  let jawabanSection_3x3 = document.getElementById("jawaban3x3");
  jawabanSection_3x3.style.display = "none";
}

function resetForm4x4() {
  document.getElementById("formGauss4x4").reset();
  document.getElementById("boxHasilGauss4x4").value = "";

  let jawabanSection_4x4 = document.getElementById("jawaban4x4");
  jawabanSection_4x4.style.display = "none";
}

function berapa(a, pivot) {
  return -a / pivot;
}

function baris(a, n, pivot) {
  return a + n * pivot;
}

function displayMatrix(matrix, id) {
  let matrixBody = document.getElementById(id);
  let content = "";
  matrix.forEach((row) => {
    let rowContent = row.map((element) => `<td>${element}</td>`).join("");
    content += `<tr>${rowContent}</tr>`;
  });
  matrixBody.innerHTML = content;
}

function padString(str, length) {
  return str.toString().padEnd(length, " ");
}
