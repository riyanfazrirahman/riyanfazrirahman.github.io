function hitungGauss3x3() {
  // Ambil nilai dari inputan
  let a11 = parseFloat(document.getElementById("a11_3x3").value);
  let a12 = parseFloat(document.getElementById("a12_3x3").value);
  let a13 = parseFloat(document.getElementById("a13_3x3").value);
  let x1 = parseFloat(document.getElementById("x1_3x3").value);

  let a21 = parseFloat(document.getElementById("a21_3x3").value);
  let a22 = parseFloat(document.getElementById("a22_3x3").value);
  let a23 = parseFloat(document.getElementById("a23_3x3").value);
  let x2 = parseFloat(document.getElementById("x2_3x3").value);

  let a31 = parseFloat(document.getElementById("a31_3x3").value);
  let a32 = parseFloat(document.getElementById("a32_3x3").value);
  let a33 = parseFloat(document.getElementById("a33_3x3").value);
  let x3 = parseFloat(document.getElementById("x3_3x3").value);

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

  // Tampilkan matriks awal
  displayMatrix(matrices, "matrixBody1_3x3");

  // ******************************************************************* //

  let stepCalculation1 = document.getElementById("stepCalculation1_3x3");
  stepCalculation1.innerHTML = ""; // Bersihkan konten lama
  stepCalculation1.innerHTML += `----------------------------------------<br>`;

  // Langkah perhitungan
  let pivot1 = matrices[0];

  // Baris 2
  stepCalculation1.innerHTML += "<br># Baris 2 <br>";
  stepCalculation1.innerHTML += `# Menentukan rumus:<br>`;
  stepCalculation1.innerHTML += `Pivot = [${pivot1[0]}] <br>`;

  // Mencari rumus baris2
  let n2 = berapa(matrices[1][0], pivot1[0]);
  stepCalculation1.innerHTML += `berapa( a21 + ... * [pivot] ) = 0 <br>`;
  stepCalculation1.innerHTML += `berapa( ${matrices[1][0]} + ${n2} * [${pivot1[0]}] ) = 0 <br><br>`;

  // Mendapatkan rumus baris2
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

  // Mencari rumus baris3
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
    displayMatrix(matrices, "matrixBody2_3x3");

    // Pivot baru untuk langkah berikutnya
    let pivot2 = matrices[1];
    let stepCalculation2 = document.getElementById("stepCalculation2_3x3");
    stepCalculation2.innerHTML = ""; // Bersihkan konten lama

    stepCalculation2.innerHTML += `----------------------------------------<br>`;

    // Mencari rumus baris3
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
  }

  // Tampilkan matriks Akhir
  displayMatrix(matrices, "matrixBodyAkhir_3x3");

  document.getElementById("jawaban3x3").style.display = "block";

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
    "boxHasilGauss3x3"
  ).value = `x = ${x}, y = ${y}, z = ${z}`;

  // Tampilkan langkah perhitungan
  let stepCalculation = document.getElementById("stepCalculation_3x3");
  let colWidth = 3;
  stepCalculation.innerHTML = `----------------------------------------<br>`;

  let bb00 = padString(" ", colWidth);

  let bb11 = padString(b11 + "x", colWidth);
  let bb111 = padString("x", colWidth);
  let bb12 = padString(b12 + "y", colWidth);
  let bb121 = padString(b12 + "(" + y + ")", colWidth);
  let b12y = b12 * y;
  let bb122 = padString("(" + b12y + ")", colWidth);
  let bb13 = padString(b13 + "z", colWidth);
  let bb131 = padString(b13 + "(" + z + ")", colWidth);
  let b13z = b13 * z;
  let bb132 = padString("(" + b13z + ")", colWidth);
  let b13zb12y = b12y + b13z;
  let bb133 = padString("(" + b13zb12y + ")", colWidth);
  let bb14 = padString(b14, colWidth);
  let bb141 = padString(b14 + "+" + "(" + -b13zb12y + ")", colWidth);
  let b14b13zb12y = b14 + -b13zb12y;
  let bb142 = padString("(" + b14b13zb12y + ")", colWidth);
  let bb143 = padString("(" + b14b13zb12y + ")/" + b11, colWidth);
  let b14b13zb12yb11 = b14b13zb12y / b11;
  let bb144 = padString(b14b13zb12yb11, colWidth);

  let bb22 = padString(b22 + "y", colWidth);
  let bb221 = padString("y", colWidth);
  let bb23 = padString(b23 + "z", colWidth);
  let bb231 = padString(b23 + "(" + z + ")", colWidth);
  let b23z = b23 * z;
  let bb232 = padString("(" + b23z + ")", colWidth);
  let bb24 = padString(b24, colWidth);
  let bb241 = padString(b24 + "+" + "(" + -b23z + ")", colWidth);
  let b24b23z = b24 + -b23z;
  let bb242 = padString("(" + b24b23z + ")", colWidth);
  let bb243 = padString("(" + b24b23z + ")/" + b22, colWidth);
  let b24b23zb22 = b24b23z / b22;
  let bb244 = padString(b24b23zb22, colWidth);

  let bb33 = padString(b33 + "z", colWidth);
  let bb331 = padString("z", colWidth);
  let bb34 = padString(b34, colWidth);
  let bb341 = padString(b34 + "/" + b33, colWidth);

  stepCalculation.innerHTML += `
    <h4>Langkah Perhitungan</h4>
    <pre>
  ${bb11} + ${bb12} + ${bb13} = ${bb14}
  ${bb00}   ${bb22} + ${bb23} = ${bb24}
  ${bb00}   ${bb00}   ${bb33} = ${bb34}
  ${bb00}   ${bb00}   ${bb331} = ${bb341}
  ${bb00}   ${bb00}   ${bb331} = <span class="red">${z}</span>
  ${bb00}   ${bb22} + ${bb23} = ${bb24}
  ${bb00}   ${bb22} + ${bb231} = ${bb24}
  ${bb00}   ${bb22} + ${bb232} = ${bb24}
  ${bb00}   ${bb00}   ${bb22} = ${bb241}
  ${bb00}   ${bb00}   ${bb22} = ${bb242}
  ${bb00}   ${bb00}   ${bb221} = ${bb243}
  ${bb00}   ${bb00}   ${bb221} = <span class="red">${bb244}</span>
  ${bb11} + ${bb12} + ${bb13} = ${bb14}
  ${bb11} + ${bb121} + ${bb131} = ${bb14}
  ${bb11} + ${bb122} + ${bb132} = ${bb14}
  ${bb00}   ${bb11} + ${bb133} = ${bb14}
  ${bb00}   ${bb00}   ${bb11} = ${bb141}
  ${bb00}   ${bb00}   ${bb11} = ${bb142}
  ${bb00}   ${bb00}   ${bb111} = ${bb143}
  ${bb00}   ${bb00}   ${bb111} = <span class="red">${bb144}</span>
  </pre>
  ----------------------------------------<br>
  <h4>Jadi, hasil perhitungan adalah: </h4>
  x = ${x} <br>
  y = ${y} <br>
  z = ${z} <br>
    `;
}
