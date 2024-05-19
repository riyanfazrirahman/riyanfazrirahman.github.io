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
    let rowContent = row
      .map(
        (element) => `
    <td>${element}</td>`
      )
      .join("");
    content += `<tr>${rowContent}</tr>`;
  });
  matrixBody.innerHTML = content;
}

function hitungGauss() {
  // Ambil nilai dari inputan
  let a11 = parseFloat(document.getElementById("a11").value);
  let a12 = parseFloat(document.getElementById("a12").value);
  let a13 = parseFloat(document.getElementById("a13").value);
  let x1 = parseFloat(document.getElementById("x1").value);

  let a21 = parseFloat(document.getElementById("a21").value);
  let a22 = parseFloat(document.getElementById("a22").value);
  let a23 = parseFloat(document.getElementById("a23").value);
  let x2 = parseFloat(document.getElementById("x2").value);

  let a31 = parseFloat(document.getElementById("a31").value);
  let a32 = parseFloat(document.getElementById("a32").value);
  let a33 = parseFloat(document.getElementById("a33").value);
  let x3 = parseFloat(document.getElementById("x3").value);

  // Periksa apakah input adalah angka
  if (
    isNaN(a11) ||
    isNaN(a12) ||
    isNaN(a13) ||
    isNaN(x1) ||
    isNaN(a21) ||
    isNaN(a22) ||
    isNaN(a23) ||
    isNaN(x2) ||
    isNaN(a31) ||
    isNaN(a32) ||
    isNaN(a33) ||
    isNaN(x3)
  ) {
    alert("Masukkan angka untuk semua input!");
    return;
  }

  // Lakukan eliminasi Gauss
  let matrices = [
    [a11, a12, a13, x1],
    [a21, a22, a23, x2],
    [a31, a32, a33, x3],
  ];

  let pivot1 = matrices[0];

  // Tampilkan matriks awal
  displayMatrix(matrices, "matrixBody1");

  // ******************************************************************* //

  // Langkah perhitungan
  let stepCalculation1 = document.getElementById("stepCalculation1");
  stepCalculation1.innerHTML += `----------------------------------------<br>`;

  // Baris 2
  stepCalculation1.innerHTML += "<br># Baris 2 <br>";
  stepCalculation1.innerHTML += `# Menentukan rumus:<br>`;
  stepCalculation1.innerHTML += `Pivot = [${pivot1[0]}] <br>`;
  let n2 = berapa(matrices[1][0], pivot1[0]);
  stepCalculation1.innerHTML += `berapa( a21 + ... * [pivot] ) = 0 <br>`;
  stepCalculation1.innerHTML += `berapa( ${matrices[1][0]} + ${n2} * [${pivot1[0]}] ) = 0 <br><br>`;

  stepCalculation1.innerHTML += `# Menghitung baris2 <br>`;
  let newRow2 = matrices[1].map((val, idx) => {
    let result = baris(val, n2, pivot1[idx]);
    stepCalculation1.innerHTML += `b2${idx + 1} = baris( ${val} + ${n2} * 
      [${pivot1[idx]}] ) = ${result}<br>`;
    return result;
  });
  matrices[1] = newRow2;
  stepCalculation1.innerHTML += `<br>`;

  // Baris 3
  stepCalculation1.innerHTML += "# Baris 3 #<br>";
  stepCalculation1.innerHTML += `# Menentukan rumus:<br>`;
  let n3 = berapa(matrices[2][0], pivot1[0]);
  stepCalculation1.innerHTML += `berapa( a31 + ... * [pivot] ) = 0 <br>`;
  stepCalculation1.innerHTML += `berapa( ${matrices[2][0]} +  ${n3} * [${pivot1[0]}] ) = 0 <br><br>`;

  stepCalculation1.innerHTML += `# Menghitung baris3<br>`;
  let newRow3 = matrices[2].map((val, idx) => {
    let result = baris(val, n3, pivot1[idx]);
    stepCalculation1.innerHTML += `b3${idx + 1} = baris( ${val} + ${n3} * 
      [${pivot1[idx]}] ) = ${result}<br>`;
    return result;
  });
  matrices[2] = newRow3;
  stepCalculation1.innerHTML += `<br>`;

  // ******************************************************************* //

  if (matrices[2][1] != 0) {
    // Tampilkan matriks setelah eliminasi baris 3
    displayMatrix(matrices, "matrixBody2");

    // Pivot baru untuk langkah berikutnya
    let pivot2 = matrices[1];
    let stepCalculation2 = document.getElementById("stepCalculation2");
    stepCalculation2.innerHTML += `----------------------------------------<br>`;

    stepCalculation2.innerHTML += "<br># Langkah berikutnya #<br><br>";
    stepCalculation2.innerHTML += `# Menentukan rumus:<br>`;
    stepCalculation2.innerHTML += `Pivot = [${pivot2[1]}] <br>`;
    let n3_2 = berapa(matrices[2][1], pivot2[1]);
    stepCalculation2.innerHTML += `berapa( a32 + ... * [pivot] ) = 0 <br>`;
    stepCalculation2.innerHTML += `berapa( ${matrices[2][1]} + ${n3_2} * [${pivot2[1]}] ) = 0<br><br>`;

    stepCalculation2.innerHTML += `# Menghitung baris3<br>`;
    matrices[2] = matrices[2].map((val, idx) => {
      let result = baris(val, n3_2, pivot2[idx]);
      stepCalculation2.innerHTML += `b3${idx + 1} = baris( ${val} + ${n3_2} * 
        ${pivot2[idx]} ) = ${result}<br>`;
      return result;
    });
    stepCalculation2.innerHTML += `<br>`;

    // let n3_2 = berapa(matrices[2][1], pivot2[1]);
    // matrices[2] = matrices[2].map((val, idx) => baris(val, n3_2, pivot2[idx]));
  }

  // Tampilkan matriks Akhir
  displayMatrix(matrices, "matrixBodyAkhir");

  document.getElementById("jawaban").style.display = "block";

  // ******************************************************************* //

  // Menghitung hasil eliminasi
  let b11 = matrices[0][0];
  let b12 = matrices[0][1];
  let b13 = matrices[0][2];
  let b14 = matrices[0][3];

  let b22 = matrices[1][1];
  let b23 = matrices[1][2];
  let b24 = matrices[1][3];

  let b33 = matrices[2][2];
  let b34 = matrices[2][3];

  let z = b34 / b33;
  let y = (b24 - b23 * z) / b22;
  let x = (b14 - b12 * y - b13 * z) / b11;

  document.getElementById(
    "boxHasilGauss"
  ).value = `x = ${x}, y = ${y}, z = ${z}`;

  // Tampilkan langkah perhitungan
  let stepCalculation = document.getElementById("stepCalculation");
  stepCalculation.innerHTML = `----------------------------------------<br>`;
  stepCalculation.innerHTML += `
  <h4>Langkah Perhitungan</h4>
  z = ${b34} / ${b33} = <b>${z}</b> <br>
  y = (${b24} - ${b23} * ${z}) / ${b22} = <b>${y}<b> <br>
  x = (${b14} - ${b12} * ${y} - ${b13} * ${z}) / ${b11} = <b>${x}</b>;
  `;
}

function resetForm() {
  let form = document.getElementById("formGauss");
  form.reset();

  let jawabanSection = document.getElementById("jawaban");

  jawabanSection.style.display = "none";
}
