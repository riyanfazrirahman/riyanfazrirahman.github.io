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
// Trigger //

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

/***************************************************************************/
// TRIGGER BTN PENYELESAIAN //

// 3.4. Gaussian Button
solveGaussian.onclick = function () {
  const matrix = getMatrixValues();

  if (matrix) {
    result.innerHTML += `<h2 class="bg-1 p-2">Eliminasi Gauss</h2>`;
    eliminasiGauss(matrix);
    subtitusi(matrix);
  }
};

// 3.5. Gauss-Jordan Button
solveGaussJordan.onclick = function () {
  const matrix = getMatrixValues();
  if (matrix) {
    result.innerHTML += `<h2 class="bg-1 p-2">Eliminasi Gauss</h2>`;
    eliminasiGauss(matrix);
    result.innerHTML += `<hr><h2 class="bg-1 p-2">Eliminasi Gauss-Jordan</h2>`;
    eliminasiGaussJordan(matrix);
    subtitusi(matrix);
  }
};

/***************************************************************************/
// FUNGSI ELIMINASI //

// Fungsi eliminasi Gauss pada matriks
function eliminasiGauss(matrix) {
  const n = matrix.length;
  let langkah = 1;

  // mulai langkah
  createTable(matrix, langkah++);
  for (let i = 0; i < n; i++) {
    // mulai perhitungan pada baris ke 2 isi baris yg pertama
    for (let k = i + 1; k < n; k++) {
      // cari rumus hitung
      let c = -matrix[k][i] / matrix[i][i];
      result.innerHTML += `Menghitung baris ${k + 1}<br>`;
      // menentukan Pivot
      result.innerHTML += `Pivot: ${matrix[i][i]}<br>`;
      result.innerHTML += `Pengali: c = -(${matrix[k][i]}) / ${
        matrix[i][i]
      } = ${formatFloat(c)}<br>`;

      // mengeliminasi per baris
      for (let j = i; j < n + 1; j++) {
        let originalValue = matrix[k][j];
        let pivotValue = matrix[i][j];
        // mengitung baris
        matrix[k][j] = baris(originalValue, c, pivotValue);
        // menampilkan perhitungan setiap baris
        result.innerHTML += `b${k + 1}${
          j + 1
        } = ${originalValue} + (${formatFloat(
          c
        )} * ${pivotValue}) = ${formatFloat(matrix[k][j])}<br>`;
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

  // Mulai dari paling bawah
  for (let i = n - 1; i >= 0; i--) {
    createTable(matrix, langkah++);

    // mulai dari isi baris paling akhir -1 sebelum hasil
    for (let k = i - 1; k >= 0; k--) {
      // cari rumus hitung
      let c = -matrix[k][i] / matrix[i][i];
      result.innerHTML += `Menghitung baris ${k + 1}<br>`;
      // menentukan Pivot
      result.innerHTML += `Pivot: ${matrix[i][i]}<br>`;
      result.innerHTML += `Pengali: c = -(${matrix[k][i]}) / ${
        matrix[i][i]
      } = ${formatFloat(c)}<br>`;

      // mengitung baris
      for (let j = 0; j < n + 1; j++) {
        let originalValue = matrix[k][j];
        let pivotValue = matrix[i][j];
        matrix[k][j] += c * pivotValue;
        result.innerHTML += `b${k + 1}${
          j + 1
        } = ${originalValue} + (${formatFloat(
          c
        )} * ${pivotValue}) = ${formatFloat(matrix[k][j])}<br>`;
      }
      createTable(matrix, langkah++);
    }
  }

  return matrix;
}

/***************************************************************************/
// FUNGSI TABEL //

// Fungsi membuat tabel HTML untuk menampilkan matriks
function createTable(matrix, langkah) {
  let table = `<h3 class="pt-2">Langkah ke-${langkah}</h3>`;

  // Tabel
  table += `<table><tr>`;
  for (let i = 0; i <= matriks; i++) {
    table += `<th class="bg-4">${i === matriks ? "Result" : `x${i + 1}`}</th>`;
  }
  table += `</tr>`;
  for (let row of matrix) {
    table += `<tr>`;
    for (let cell of row) {
      table += `<td>${formatFloat(cell)}</td>`;
    }
    table += `</tr>`;
  }
  table += `</table>`;
  result.innerHTML += table;
}

// Fungsi menghapus angka desimal (jika ada)
function formatFloat(value) {
  let strValue = value.toString();
  if (strValue.includes(".00000")) {
    return parseInt(value);
  }
  return value;
}

// Fungsi menghitung baris
function baris(val, multiplier, pivot) {
  return val + multiplier * pivot;
}

function subtitusi(matrix) {
  const n = matrix.length;
  let resultValues = new Array(n).fill(0);

  // Substitusi mundur dari baris terakhir ke baris pertama
  result.innerHTML += `<h3 class="pt-2">Proses Substitusi:</h3><br>`;
  for (let i = n - 1; i >= 0; i--) {
    resultValues[i] = matrix[i][n] / matrix[i][i];
    result.innerHTML += `Menghitung x${i + 1}:<br>`;
    result.innerHTML += `x${i + 1} = ${matrix[i][n]} / ${
      matrix[i][i]
    } = ${formatFloat(resultValues[i])}<br>`;

    for (let k = i - 1; k >= 0; k--) {
      matrix[k][n] -= matrix[k][i] * resultValues[i];
      result.innerHTML += `b${k + 1}${n + 1} = ${
        matrix[k][n] + matrix[k][i] * resultValues[i]
      } - (${matrix[k][i]} * ${formatFloat(resultValues[i])}) = ${formatFloat(
        matrix[k][n]
      )}<br>`;
    }
  }

  // Menampilkan hasil substitusi akhir
  result.innerHTML += `<h3 class="pt-2">Hasil Substitusi:</h3><br>`;
  for (let i = 0; i < n; i++) {
    result.innerHTML += `x${i + 1} = ${formatFloat(resultValues[i])}<br>`;
  }
  return resultValues;
}

/***************************************************************************/
// FUNSI RESET //
function resetForm() {
  formInput.innerHTML = "";
  result.innerHTML = "";
  containerResult.style.display = "none";
}

// Reset Button
btnReset.onclick = function () {
  resetForm();
};
