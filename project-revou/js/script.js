// Menampilkan Rumus Luas ketika buttom luas di klick
function luasSegitigaClick(buttonElement) {
  document.getElementById("showLuasSegitiga").style.display = "block";
  document.getElementById("showKelilingSegitiga").style.display = "none";

  buttonElement.classList.add("btn-active");
  document
    .querySelector("button[onclick='kelilingSegitigaClick(this)']")
    .classList.remove("btn-active");
}

// Menampilkan Rumus Keliling ketika buttom keling di klick
function kelilingSegitigaClick(buttonElement) {
  document.getElementById("showKelilingSegitiga").style.display = "block";
  document.getElementById("showLuasSegitiga").style.display = "none";

  buttonElement.classList.add("btn-active");
  document
    .querySelector("button[onclick='luasSegitigaClick(this)']")
    .classList.remove("btn-active");
}

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
  document.getElementById("boxHasilLuas").value = luas.toLocaleString();
  document.getElementById("jawabanLuas").style.display = "block";
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

  var keliling = sisiA + sisiB + sisiC;

  var rumusElemen = document.getElementById("rumusKeliling");
  rumusElemen.textContent = sisiA + " + " + sisiB + " + " + sisiC;

  document.getElementById("hasilKeliling").textContent =
    keliling.toLocaleString();
  document.getElementById("boxHasilKeliling").value = keliling.toLocaleString();
  document.getElementById("jawabanKeliling").style.display = "block";
}

// Reset Hitung
function resetForm() {
  document.getElementById("jawabanLuas").style.display = "none";
  document.getElementById("jawabanKeliling").style.display = "none";
}
