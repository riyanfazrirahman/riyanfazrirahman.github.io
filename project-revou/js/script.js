// Menghitung Luas Segitiga
function hitungLuas() {
  var alas = parseFloat(document.getElementById("alas").value);
  var tinggi = parseFloat(document.getElementById("tinggi").value);

  if (isNaN(alas) || isNaN(tinggi)) {
    alert("Masukkan angka!");
    return;
  }

  var luas = (1 / 2) * alas * tinggi;

  var rumusElemen = document.getElementById("rumusLuas");
  rumusElemen.textContent = "1/2 x " + alas + " x " + tinggi;

  document.getElementById("hasilLuas").textContent = luas.toLocaleString();
  document.getElementById("boxHasilLuas").textContent = luas.toLocaleString();
  document.getElementById("jawaban").style.display = "block";
}

// Menghitung Keliling Segitiga
function hitungKeliling() {
  var sisiA = parseFloat(document.getElementById("sisiA").value);
  var sisiB = parseFloat(document.getElementById("sisiB").value);
  var sisiC = parseFloat(document.getElementById("sisiC").value);

  if (isNaN(sisiA) || isNaN(sisiB) || isNaN(sisiC)) {
    alert("Masukkan angka!");
    return;
  }

  var keliling = sisiA * sisiB * sisiC;

  var rumusElemen = document.getElementById("rumusKeliling");
  rumusElemen.textContent = sisiA + " x " + sisiB + " x " + sisiC;

  document.getElementById("hasilKeliling").textContent =
    keliling.toLocaleString();
  document.getElementById("boxHasilKeliling").textContent =
    keliling.toLocaleString();
  document.getElementById("jawaban").style.display = "block";
}

// Reset Hitung
function resetForm() {
  document.getElementById("jawaban").style.display = "none";
}
