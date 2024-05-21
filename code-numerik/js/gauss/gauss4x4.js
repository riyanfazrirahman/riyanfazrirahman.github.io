function hitungGauss4x4() {
  // Ambil nilai dari inputan
  let a11 = parseFloat(document.getElementById("a11_4x4").value);
  let a12 = parseFloat(document.getElementById("a12_4x4").value);
  let a13 = parseFloat(document.getElementById("a13_4x4").value);
  let a14 = parseFloat(document.getElementById("a14_4x4").value);
  let x1 = parseFloat(document.getElementById("x1_4x4").value);

  let a21 = parseFloat(document.getElementById("a21_4x4").value);
  let a22 = parseFloat(document.getElementById("a22_4x4").value);
  let a23 = parseFloat(document.getElementById("a23_4x4").value);
  let a24 = parseFloat(document.getElementById("a24_4x4").value);
  let x2 = parseFloat(document.getElementById("x2_4x4").value);

  let a31 = parseFloat(document.getElementById("a31_4x4").value);
  let a32 = parseFloat(document.getElementById("a32_4x4").value);
  let a33 = parseFloat(document.getElementById("a33_4x4").value);
  let a34 = parseFloat(document.getElementById("a34_4x4").value);
  let x3 = parseFloat(document.getElementById("x3_4x4").value);

  let a41 = parseFloat(document.getElementById("a41_4x4").value);
  let a42 = parseFloat(document.getElementById("a42_4x4").value);
  let a43 = parseFloat(document.getElementById("a43_4x4").value);
  let a44 = parseFloat(document.getElementById("a44_4x4").value);
  let x4 = parseFloat(document.getElementById("x4_4x4").value);

  // Periksa apakah input adalah angka
  if (
    isNaN(a11) ||
    isNaN(a12) ||
    isNaN(a13) ||
    isNaN(a14) ||
    isNaN(x1) ||
    isNaN(a21) ||
    isNaN(a22) ||
    isNaN(a23) ||
    isNaN(a24) ||
    isNaN(x2) ||
    isNaN(a31) ||
    isNaN(a32) ||
    isNaN(a33) ||
    isNaN(a34) ||
    isNaN(x3) ||
    isNaN(a41) ||
    isNaN(a42) ||
    isNaN(a43) ||
    isNaN(a44) ||
    isNaN(x4)
  ) {
    alert("Masukkan angka untuk semua input!");
    return;
  }

  // Lakukan eliminasi Gauss
  let matrices = [
    [a11, a12, a13, a14, x1],
    [a21, a22, a23, a24, x2],
    [a31, a32, a33, a34, x3],
    [a41, a42, a43, a44, x4],
  ];

  // Tampilkan matriks awal
  displayMatrix(matrices, "matrixBody1_4x4");

  // ******************************************************************* //

  let stepCalculation1 = document.getElementById("stepCalculation1_4x4");
  stepCalculation1.innerHTML = ""; // Bersihkan konten lama
  stepCalculation1.innerHTML += `----------------------------------------<br>`;

  // Langkah perhitungan
  stepCalculation1.innerHTML += "<br><h4># Langkah ke 1 #</h4><br>";
  let pivot1 = matrices[0];

  // Baris 2
  stepCalculation1.innerHTML += "# Baris 2 <br>";
  stepCalculation1.innerHTML += `# Menentukan rumus:<br>`;
  stepCalculation1.innerHTML += `Pivot = [${pivot1[0]}] <br>`;

  // Mencari rumus baris2
  let n2 = berapa(matrices[1][0], pivot1[0]);
  stepCalculation1.innerHTML += `berapa( a21 + ... * [pivot] ) = 0 <br>`;
  stepCalculation1.innerHTML += `berapa( ${matrices[1][0]} + ${n2} * [${pivot1[0]}] ) = 0 <br><br>`;

  // Mendapatkan rumus baris2
  stepCalculation1.innerHTML += `# Menghitung baris 2 <br>`;
  let newRow2 = matrices[1].map((val, idx) => {
    let result = baris(val, n2, pivot1[idx]);
    stepCalculation1.innerHTML += `b2${idx + 1} = baris( ${val} + ${n2} * 
        [${pivot1[idx]}] ) = ${result}<br>`;
    return result;
  });
  matrices[1] = newRow2;
  stepCalculation1.innerHTML += `<br>`;

  // ******************************************************************* //

  // Baris 3
  stepCalculation1.innerHTML += "# Baris 3 #<br>";
  stepCalculation1.innerHTML += `# Menentukan rumus:<br>`;

  // Mencari rumus baris3
  let n3 = berapa(matrices[2][0], pivot1[0]);
  stepCalculation1.innerHTML += `berapa( a31 + ... * [pivot] ) = 0 <br>`;
  stepCalculation1.innerHTML += `berapa( ${matrices[2][0]} +  ${n3} * [${pivot1[0]}] ) = 0 <br><br>`;

  stepCalculation1.innerHTML += `# Menghitung baris 3<br>`;
  let newRow3 = matrices[2].map((val, idx) => {
    let result = baris(val, n3, pivot1[idx]);
    stepCalculation1.innerHTML += `b3${idx + 1} = baris( ${val} + ${n3} * 
        [${pivot1[idx]}] ) = ${result}<br>`;
    return result;
  });
  matrices[2] = newRow3;
  stepCalculation1.innerHTML += `<br>`;

  // ******************************************************************* //

  // Baris 4
  stepCalculation1.innerHTML += "# Baris 4 #<br>";
  stepCalculation1.innerHTML += `# Menentukan rumus:<br>`;

  // Mencari rumus baris4
  let n4 = berapa(matrices[3][0], pivot1[0]);
  stepCalculation1.innerHTML += `berapa( a41 + ... * [pivot] ) = 0 <br>`;
  stepCalculation1.innerHTML += `berapa( ${matrices[3][0]} +  ${n4} * [${pivot1[0]}] ) = 0 <br><br>`;

  stepCalculation1.innerHTML += `# Menghitung baris 4<br>`;
  let newRow4 = matrices[3].map((val, idx) => {
    let result = baris(val, n4, pivot1[idx]);
    stepCalculation1.innerHTML += `b4${idx + 1} = baris( ${val} + ${n4} * 
        [${pivot1[idx]}] ) = ${result}<br>`;
    return result;
  });
  matrices[3] = newRow4;
  stepCalculation1.innerHTML += `<br>`;

  // ******************************************************************* //

  if (matrices[2][1] || matrices[3][1] != 0) {
    // Tampilkan matriks setelah eliminasi baris 3
    displayMatrix(matrices, "matrixBody2_4x4");

    // Pivot baru untuk langkah berikutnya
    let pivot2 = matrices[1];
    let stepCalculation2 = document.getElementById("stepCalculation2_4x4");
    stepCalculation2.innerHTML = ""; // Bersihkan konten lama

    stepCalculation2.innerHTML += `----------------------------------------<br>`;

    // Mencari rumus baris3
    stepCalculation2.innerHTML += "<br><h4># Langkah ke 2 #</h4><br>";
    stepCalculation2.innerHTML += "# Baris 3 #<br>";
    stepCalculation2.innerHTML += `# Menentukan rumus:<br>`;
    stepCalculation2.innerHTML += `Pivot = [${pivot2[1]}] <br>`;

    let n3_2 = berapa(matrices[2][1], pivot2[1]);
    stepCalculation2.innerHTML += `berapa( a32 + ... * [pivot] ) = 0 <br>`;
    stepCalculation2.innerHTML += `berapa( ${matrices[2][1]} + ${n3_2} * [${pivot2[1]}] ) = 0<br><br>`;

    stepCalculation2.innerHTML += `# Menghitung baris 3<br>`;
    matrices[2] = matrices[2].map((val, idx) => {
      let result = baris(val, n3_2, pivot2[idx]);
      stepCalculation2.innerHTML += `b3${idx + 1} = baris( ${val} + ${n3_2} * 
          ${pivot2[idx]} ) = ${result}<br>`;
      return result;
    });
    stepCalculation2.innerHTML += `<br>`;

    // Mencari rumus baris4
    stepCalculation2.innerHTML += "# Baris 4 #<br>";
    stepCalculation2.innerHTML += `# Menentukan rumus:<br>`;
    stepCalculation2.innerHTML += `Pivot = [${pivot2[1]}] <br>`;

    let n4_2 = berapa(matrices[3][1], pivot2[1]);
    stepCalculation2.innerHTML += `berapa( a42 + ... * [pivot] ) = 0 <br>`;
    stepCalculation2.innerHTML += `berapa( ${matrices[3][1]} + ${n4_2} * [${pivot2[1]}] ) = 0<br><br>`;

    stepCalculation2.innerHTML += `# Menghitung baris 4<br>`;
    matrices[3] = matrices[3].map((val, idx) => {
      let result = baris(val, n4_2, pivot2[idx]);
      stepCalculation2.innerHTML += `b4${idx + 1} = baris( ${val} + ${n4_2} * 
          ${pivot2[idx]} ) = ${result}<br>`;
      return result;
    });
    stepCalculation2.innerHTML += `<br>`;
  }

  if (matrices[3][2] != 0) {
    // Tampilkan matriks setelah eliminasi baris 4
    displayMatrix(matrices, "matrixBody3_4x4");

    // Pivot baru untuk langkah berikutnya
    let pivot3 = matrices[2];
    let stepCalculation3 = document.getElementById("stepCalculation3_4x4");
    stepCalculation3.innerHTML = ""; // Bersihkan konten lama

    stepCalculation3.innerHTML += `----------------------------------------<br>`;

    // Mencari rumus baris4
    stepCalculation3.innerHTML += "<br><h4># Langkah ke 3 #</h4><br>";
    stepCalculation3.innerHTML += `# Baris 4 #<br>`;
    stepCalculation3.innerHTML += `# Menentukan rumus:<br>`;
    stepCalculation3.innerHTML += `Pivot = [${pivot3[2]}] <br>`;

    let n4_3 = berapa(matrices[3][2], pivot3[2]);
    stepCalculation3.innerHTML += `berapa( a43 + ... * [pivot] ) = 0 <br>`;
    stepCalculation3.innerHTML += `berapa( ${matrices[3][2]} + ${n4_3} * [${pivot3[2]}] ) = 0<br><br>`;

    stepCalculation3.innerHTML += `# Menghitung baris4<br>`;
    matrices[3] = matrices[3].map((val, idx) => {
      let result = baris(val, n4_3, pivot3[idx]);
      stepCalculation3.innerHTML += `b4${idx + 1} = baris( ${val} + ${n4_3} * 
          ${pivot3[idx]} ) = ${result}<br>`;
      return result;
    });
    stepCalculation3.innerHTML += `<br>`;
  }

  // Tampilkan matriks Akhir
  displayMatrix(matrices, "matrixBodyAkhir_4x4");

  document.getElementById("jawaban4x4").style.display = "block";

  // ******************************************************************* //

  // Menghitung hasil eliminasi
  let b11 = matrices[0][0];
  let b12 = matrices[0][1];
  let b13 = matrices[0][2];
  let b14 = matrices[0][3];
  let bx1 = matrices[0][4];

  let b22 = matrices[1][1];
  let b23 = matrices[1][2];
  let b24 = matrices[1][3];
  let bx2 = matrices[1][4];

  let b33 = matrices[2][2];
  let b34 = matrices[2][3];
  let bx3 = matrices[2][4];

  let b44 = matrices[3][3];
  let bx4 = matrices[3][4];

  let z = bx4 / b44;
  let y = (bx3 - b34 * z) / b33;
  let x = (bx2 - b23 * y - b24 * z) / b22;
  let w = (bx1 - b12 * x - b13 * y - b14 * z) / b11;

  document.getElementById(
    "boxHasilGauss4x4"
  ).value = `w = ${w}, x = ${x}, y = ${y}, z = ${z}`; // Tampilkan langkah perhitungan
  let stepCalculation = document.getElementById("stepCalculation_4x4");
  let colWidth = 3;
  stepCalculation.innerHTML = ` `;
  stepCalculation.innerHTML += `----------------------------------------<br>`;

  let bb00 = padString(" ", colWidth);

  let bb11 = padString(b11 + "w", colWidth);
  let bb111 = padString("w", colWidth);
  let bb12 = padString(b12 + "x", colWidth);
  let bb121 = padString(b12 + "(" + x + ")", colWidth);
  let b12x = b12 * x;
  let bb122 = padString("(" + b12x + ")", colWidth);
  let bb13 = padString(b13 + "y", colWidth);
  let bb131 = padString(b13 + "(" + y + ")", colWidth);
  let b13y = b13 * y;
  let bb132 = padString("(" + b13y + ")", colWidth);
  let bb14 = padString(b14 + "z", colWidth);
  let bb141 = padString(b14 + "(" + z + ")", colWidth);
  let b14z = b14 * z;
  let bb142 = padString("(" + b14z + ")", colWidth);
  let b12x_b13y_b14z = b12x + b13y + b14z;
  let bb143 = padString("(" + b12x_b13y_b14z + ")", colWidth);
  let bbx1 = padString(bx1, colWidth);
  let bbx11 = padString(bx1 + " + (" + -b12x_b13y_b14z + ")", colWidth);
  let bx1_b12x_b13y_b14z = bx1 + -b12x_b13y_b14z;
  let bbx12 = padString("(" + bx1_b12x_b13y_b14z + ")", colWidth);
  let bbx13 = padString("(" + bx1_b12x_b13y_b14z + ")/" + b11, colWidth);

  let bb22 = padString(b22 + "x", colWidth);
  let bb221 = padString("x", colWidth);
  let bb23 = padString(b23 + "y", colWidth);
  let bb231 = padString(b23 + "(" + y + ")", colWidth);
  let bb232 = padString("(" + b23 * y + ")", colWidth);
  let bb24 = padString(b24 + "z", colWidth);
  let bb241 = padString(b24 + "(" + z + ")", colWidth);
  let bb242 = padString("(" + b24 * z + ")", colWidth);
  let bb243 = padString(b23 * y + b24 * z, colWidth);
  let bbx2 = padString(bx2, colWidth);
  let bx2b23yb24z = bx2 + -(b23 * y + b24 * z);
  let bbx21 = padString(bx2b23yb24z, colWidth);
  let bbx22 = padString(bx2b23yb24z + "/" + b22, colWidth);

  let bb33 = padString(b33 + "y", colWidth);
  let bb331 = padString("y", colWidth);
  let bb34 = padString(b34 + "z", colWidth);
  let bb341 = padString(b34 + "(" + z + ")", colWidth);
  let b34z = b34 * z;
  let bb342 = padString("(" + b34z + ")", colWidth);
  let bbx3 = padString(bx3, colWidth);
  let bbx31 = padString(bx3 + " + (" + -b34z + ")", colWidth);
  let bx3b34z = bx3 + -b34z;
  let bbx32 = padString("(" + bx3b34z + ")", colWidth);
  let bbx33 = padString("(" + bx3b34z + ") / " + b33, colWidth);

  let bb44 = padString(b44 + "z", colWidth);
  let bb441 = padString("z", colWidth);
  let bbx4 = padString(bx4, colWidth);
  let bbx41 = padString(bx4 + " / " + b44, colWidth);

  stepCalculation.innerHTML += `
    <h4>Langkah Perhitungan</h4>
    <pre>
${bb11} + ${bb12} + ${bb13} + ${bb14}  = ${bbx1}
${bb00}   ${bb22} + ${bb23} + ${bb24}  = ${bbx2}
${bb00}   ${bb00}   ${bb33} + ${bb34}  = ${bbx3}
${bb00}   ${bb00}   ${bb00}   ${bb44}  = ${bbx4}
${bb00}   ${bb00}   ${bb00}   ${bb441}  = ${bbx41}
${bb00}   ${bb00}   ${bb00}   ${bb441}  = <span class="red">${z}</span>
${bb00}   ${bb00}   ${bb33} + ${bb34}  = ${bbx3}
${bb00}   ${bb00}   ${bb33} + ${bb341}  = ${bbx3}
${bb00}   ${bb00}   ${bb33} + ${bb342}  = ${bbx3}
${bb00}   ${bb00}   ${bb00}   ${bb33}  = ${bbx31}
${bb00}   ${bb00}   ${bb00}   ${bb33}  = ${bbx32}
${bb00}   ${bb00}   ${bb00}   ${bb331}  = ${bbx33}
${bb00}   ${bb00}   ${bb00}   ${bb331}  = <span class="red">${y}</span>
${bb00}   ${bb22} + ${bb23} + ${bb24}  = ${bbx2}
${bb00}   ${bb22} + ${bb231} + ${bb241}  = ${bbx2}
${bb00}   ${bb22} + ${bb232} + ${bb242}  = ${bbx2}
${bb00}   ${bb00}   ${bb22} + ${bb243}  = ${bbx2}
${bb00}   ${bb00}   ${bb00}   ${bb22}  = ${bbx2} + ${-bb243}
${bb00}   ${bb00}   ${bb00}   ${bb22}  = ${bbx21}
${bb00}   ${bb00}   ${bb00}   ${bb221}  = ${bbx22}
${bb00}   ${bb00}   ${bb00}   ${bb221}  = <span class="red">${x}</span>
${bb11} + ${bb12} + ${bb13} + ${bb14}  = ${bbx1}
${bb11} + ${bb121} + ${bb131} + ${bb141}  = ${bbx1}
${bb11} + ${bb122} + ${bb132} + ${bb142}  = ${bbx1}
${bb00}   ${bb00}   ${bb11} + ${bb143}  = ${bbx1}
${bb00}   ${bb00}   ${bb00}   ${bb11}  = ${bbx11}
${bb00}   ${bb00}   ${bb00}   ${bb11}  = ${bbx12}
${bb00}   ${bb00}   ${bb00}   ${bb111}  = ${bbx13}
${bb00}   ${bb00}   ${bb00}   ${bb111}  = <span class="red">${w}</span>
</pre>
----------------------------------------<br>
    <h4>Jadi, hasil perhitungan adalah: </h4>
    w = ${w} <br>
    x = ${x} <br>
    y = ${y} <br>
    z = ${z} <br>
  `;
}
