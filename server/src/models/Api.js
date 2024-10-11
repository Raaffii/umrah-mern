const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://zzypyy:rafisukses@cluster0.lidkb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("Connected!"));

const dataJamaah = mongoose.model("dataJamaah", {
  nama: {
    type: String,
    required: true,
  },
  nik: {
    type: String,
  },
  tempatLahir: {
    type: String,
  },
  tanggalLahir: {
    type: String, // Jika ingin menyimpan sebagai tanggal
  },
  alamat: {
    type: String,
  },
  jenisKelamin: {
    type: String,
  },
  nomerPaspor: {
    type: String,
  },
  masaPaspor: {
    type: String,
  },
  paket: {
    type: String,
  },
  kamar: {
    type: String,
  },
  provinsi: {
    type: String,
  },
  kota: {
    type: String,
  },
  kecamatan: {
    type: String,
  },
  kelurahan: {
    type: String,
  },
  lampiranKTP: {
    type: String,
  },
  lampiranKK: {
    type: String,
  },
  fotoDiri: {
    type: String,
  },
  paspor: {
    type: String,
  },
});

module.exports = { dataJamaah };
