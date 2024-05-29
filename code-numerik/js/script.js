/***************************************************************************/
// Mendapatkan ID dari HTML
const matriks3x3 = document.getElementById("matriks3x3");
const matriks4x4 = document.getElementById("matriks4x4");
const formInput = document.getElementById("formInput");
const containerResult = document.getElementById("containerResult");
const solveGaussian = document.getElementById("solveGaussian");
const solveGaussJordan = document.getElementById("solveGaussJordan");
const result = document.getElementById("result");
const btnReset = document.getElementById("btnReset");

let matriks;

/***************************************************************************/
// FUNGSI //

// Fungsi input field berdasarkan ukuran matriks yang dipilih (3x3 atau 4x4).
function createInputanMatriks() {
  formInput.innerHTML = "";
  for (let row = 1; row <= matriks; row++) {
    for (let col = 1; col <= matriks + 1; col++) {
      const inputan = document.createElement("input");
      inputan.className = "inputan bg-2";
      inputan.type = "number";
      inputan.placeholder = `x${row} (${col})`;
      inputan.id = `input-${row}-${col}`;
      formInput.append(inputan);
    }
  }
}

// Fungsi menghapus angka desimal (jika ada)
function formatFloat(value) {
  let strValue = value.toString();
  if (strValue.includes(".00")) {
    return parseInt(value);
  }
  return value;
}

// Fungsi membuat tabel HTML untuk menampilkan matriks
function createTable(matrix, langkah) {
  let table = `<h3 class="pt-2">Langkah ke-${langkah}</h3><table><tr>`;

  // header tabel
  for (let i = 0; i <= matriks; i++) {
    table += `<th class="bg-4">${i === matriks ? "Result" : `x${i + 1}`}</th>`;
  }
  table += `</tr>`;

  // isi tabel
  for (let row of matrix) {
    table += `<tr>`;
    for (let cell of row) {
      table += `<td>${formatFloat(cell.toFixed(2))}</td>`;
    }
    table += `</tr>`;
  }

  table += `</table>`;
  result.innerHTML += table;
}

// Fungsi menghitung baris
function baris(val, multiplier, pivot) {
  return val + multiplier * pivot;
}

// Fungsi eliminasi Gauss pada matriks
function eliminasiGauss(matrix) {
  const n = matrix.length;
  let langkah = 1;

  for (let i = 0; i < n; i++) {
    createTable(matrix, langkah++);

    for (let k = i + 1; k < n; k++) {
      // cari rumus hitung
      let c = -matrix[k][i] / matrix[i][i];
      result.innerHTML += `Menghitung baris ${k + 1}<br>`;
      // menentukan Pivot
      result.innerHTML += `Pivot: ${matrix[i][i]}<br>`;
      result.innerHTML += `Pengali: c = -(${matrix[k][i]}) / ${
        matrix[i][i]
      } = ${c.toFixed(2)}<br>`;

      for (let j = i; j < n + 1; j++) {
        if (i === j) {
          matrix[k][j] = 0;
        } else {
          let originalValue = matrix[k][j];
          let pivotValue = matrix[i][j];
          // mengitung baris
          matrix[k][j] = baris(originalValue, c, pivotValue);
          // menampilkan perhitungan setiap baris
          result.innerHTML += `b${k + 1}${
            j + 1
          } = ${originalValue} + (${c.toFixed(2)} * ${pivotValue}) = ${matrix[
            k
          ][j].toFixed(2)}<br>`;
        }
      }
      createTable(matrix, langkah++);
    }
  }

  return matrix;
}

// Fungsi melanjutkan dari hasil eliminasi Gauss dan melakukan eliminasi Gauss-Jordan
function eliminasiGaussJordan(matrix) {
  const n = matrix.length;
  let langkah = 1;

  for (let i = n - 1; i >= 0; i--) {
    createTable(matrix, langkah++);

    for (let k = i - 1; k >= 0; k--) {
      // cari rumus hitung
      let c = -matrix[k][i] / matrix[i][i];
      result.innerHTML += `Menghitung baris ${k + 1}<br>`;
      // menentukan Pivot
      result.innerHTML += `Pivot: ${matrix[i][i]}<br>`;
      result.innerHTML += `Pengali: c = -(${matrix[k][i]}) / ${
        matrix[i][i]
      } = ${c.toFixed(2)}<br>`;

      for (let j = 0; j < n + 1; j++) {
        let originalValue = matrix[k][j];
        let pivotValue = matrix[i][j];
        // mengitung baris
        matrix[k][j] += c * pivotValue;
        result.innerHTML += `b${k + 1}${
          j + 1
        } = ${originalValue} + (${c.toFixed(2)} * ${pivotValue}) = ${matrix[k][
          j
        ].toFixed(2)}<br>`;
      }
      createTable(matrix, langkah++);
    }
  }

  for (let i = 0; i < n; i++) {
    let div = matrix[i][i];
    for (let j = 0; j < n + 1; j++) {
      matrix[i][j] /= div;
    }
  }

  const hasilEliminasi = new Array(n);
  for (let i = 0; i < n; i++) {
    hasilEliminasi[i] = matrix[i][n];
  }
  return hasilEliminasi;
}

// Fungsi mengambil nilai-nilai yang dimasukkan ke dalam inputan
function getMatrixValues() {
  const matrix = [];
  for (let row = 1; row <= matriks; row++) {
    const rowValues = [];
    for (let col = 1; col <= matriks + 1; col++) {
      const input = document.getElementById(`input-${row}-${col}`);
      const value = input.value;
      if (value.trim() === "" || isNaN(value)) {
        result.innerHTML = "Mohon isi semua inputan dengan nomor yang valid!";
        return null;
      }
      rowValues.push(parseFloat(value));
    }
    matrix.push(rowValues);
  }
  result.innerHTML = "";
  return matrix;
}

// Fungsi mereset form input dan hasil, serta menyembunyikan containerResult.
function resetForm() {
  formInput.innerHTML = "";
  result.innerHTML = "";
  containerResult.style.display = "none";
}

/***************************************************************************/

// Trigger //

// 3.1. Reset Button
btnReset.onclick = function () {
  resetForm();
};

// 3.2. 3x3 Button
matriks3x3.onclick = function () {
  matriks = 3;
  createInputanMatriks();
  formInput.style.display = "grid";
  formInput.style.gridTemplateColumns = "repeat(4, 1fr)";
  containerResult.style.display = "block";
};

// 3.3. 4x4 Button
matriks4x4.onclick = function () {
  matriks = 4;
  createInputanMatriks();
  formInput.style.display = "grid";
  formInput.style.gridTemplateColumns = "repeat(5, 1fr)";
  containerResult.style.display = "block";
};

// 3.4. Gaussian Button
solveGaussian.onclick = function () {
  const matrix = getMatrixValues();
  if (matrix) {
    result.innerHTML += `<h2 class="bg-1 p-2">Eliminasi Gauss</h2>`;
    const gaussMatrix = eliminasiGauss(matrix);
    // menghitung hasil gauss
    const solution = new Array(gaussMatrix.length);
    for (let i = gaussMatrix.length - 1; i >= 0; i--) {
      solution[i] = gaussMatrix[i][gaussMatrix.length] / gaussMatrix[i][i];
      for (let k = i - 1; k >= 0; k--) {
        gaussMatrix[k][gaussMatrix.length] -= gaussMatrix[k][i] * solution[i];
      }
    }
    // menampilkan solusi dari hasil eliminasi gauss
    result.innerHTML += `<h3>Solusi Eliminasi Gauss: <br>${solution
      .map(formatFloat)
      .join(", ")}</h3>`;
  }
};

// 3.5. Gauss-Jordan Button
solveGaussJordan.onclick = function () {
  const matrix = getMatrixValues();
  if (matrix) {
    result.innerHTML += `<h2 class="bg-1 p-2">Eliminasi Gauss</h2>`;
    // menampilkan tahapan dari eliminasi gauss
    const gaussMatrix = eliminasiGauss(matrix);
    result.innerHTML += `<hr><h2 class="bg-1 p-2">Eliminasi Gauss-Jordan</h2>`;
    // mendapatkan eliminasi gauss jordan
    const solution = eliminasiGaussJordan(gaussMatrix);
    // menampilkan solusi dari hasil eliminasi gauss jordan
    result.innerHTML += `<h3>Solusi Eliminasi Gauss-Jordan: <br>${solution
      .map(formatFloat)
      .join(", ")}</h3>`;
  }
};
