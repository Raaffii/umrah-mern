const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rraaafffii:eeobUIh30OXMGWGB@mern-vercel.dez87.mongodb.net/umroh?retryWrites=true&w=majority&appName=mern-vercel").then(() => console.log("Connected!"));

const dataJamaah = mongoose.model("jamaah", {
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
