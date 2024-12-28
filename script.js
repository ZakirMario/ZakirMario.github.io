function submitForm() {
    var nama = document.getElementById("nama").value;
    var dendaTotal = 0;
    var penjaraTotal = 0;
    var history = document.getElementById('history');

    // Inisialisasi string untuk riwayat
    var historyEntry = '';

    // Menghitung jumlah denda dan penjara yang dicentang
    var checkboxes = document.querySelectorAll('.CEKLIS:checked');
    checkboxes.forEach(function(checkbox) {
        var row = checkbox.parentNode.parentNode;
        var uuText = row.cells[0].innerText;
        var nilaiDenda = parseInt(row.cells[3].innerText);
        var nilaiPenjara = parseInt(row.cells[4].innerText);
        dendaTotal += nilaiDenda;
        penjaraTotal += nilaiPenjara;

        // Menambahkan UU ke string riwayat
        if (historyEntry !== '') {
            historyEntry += ', ';
        }
        historyEntry += uuText;
    });

    // Menambahkan denda total dan penjara total ke dalam string riwayat
    historyEntry += ' ' + nama + ' ' + dendaTotal + ' ' + penjaraTotal;

    // Menyimpan entri ke dalam Local Storage
    var currentHistory = JSON.parse(localStorage.getItem('history')) || [];
    currentHistory.unshift(historyEntry);
    localStorage.setItem('history', JSON.stringify(currentHistory));

    // Menambahkan entri ke dalam riwayat di bawah yang sebelumnya
    var newEntry = document.createElement('div');
    newEntry.textContent = historyEntry;
    history.prepend(newEntry);

    // Menambahkan nama ke historyNames jika belum ada
    if (!historyNames.includes(nama)) {
        historyNames.push(nama);
    }

    // Menampilkan nama di history

    document.getElementById("nama").value = "";

    // Memperbarui nilai input nama, denda dan penjara
    document.getElementById("nama").value = "";
    document.getElementById('denda').value = dendaTotal;
    document.getElementById('penjara').value = penjaraTotal;

    // Mereset centangannya
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}

// Fungsi untuk memuat history dari Local Storage saat halaman dimuat
function loadHistory() {
    var history = document.getElementById('history');
    var storedHistory = JSON.parse(localStorage.getItem('history')) || [];

    storedHistory.forEach(function(entry) {
        var newEntry = document.createElement('div');
        newEntry.textContent = entry;
        history.appendChild(newEntry);
    });
}

// Panggil fungsi loadHistory saat halaman dimuat
window.onload = loadHistory;

function resetHistory() {
    // Menghapus history dari Local Storage
    localStorage.removeItem('history');

    // Mengosongkan elemen history pada halaman
    var history = document.getElementById('history');
    history.innerHTML = '';

    // Mengosongkan array historyNames
    historyNames = [];
}
