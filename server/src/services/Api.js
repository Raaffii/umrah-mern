const { dataJamaah } = require("../models/Api");

const setData = async (reqData, reqFiles) => {
  // Ambil file berdasarkan field name
  const lampiranKTP = reqFiles.lampiranKTP ? reqFiles.lampiranKTP[0].filename : null;
  const lampiranKK = reqFiles.lampiranKK ? reqFiles.lampiranKK[0].filename : null;
  const fotoDiri = reqFiles.fotoDiri ? reqFiles.fotoDiri[0].filename : null;
  const paspor = reqFiles.paspor ? reqFiles.paspor[0].filename : null;

  const uplo = {
    nama: reqData.nama,
    nik: reqData.nik,
    tempatLahir: reqData.tempatLahir,
    tanggalLahir: reqData.tanggalLahir,
    alamat: reqData.alamat,
    jenisKelamin: reqData.jenisKelamin,
    nomerPaspor: reqData.nomerPaspor,
    masaPaspor: reqData.masaPaspor,
    paket: reqData.paket,
    kamar: reqData.kamar,
    provinsi: reqData.provinsi,
    kota: reqData.kota,
    kecamatan: reqData.kecamatan,
    kelurahan: reqData.kelurahan,
    lampiranKTP: lampiranKTP,
    lampiranKK: lampiranKK,
    fotoDiri: fotoDiri,
    paspor: paspor,
  };
  console.log(uplo);
  await dataJamaah.insertMany(uplo);

  return uplo;
};

const updateSetData = async (reqData, reqFiles) => {
  // Ambil file berdasarkan field name
  const lampiranKTP = reqFiles.lampiranKTP ? reqFiles.lampiranKTP[0].filename : null;
  const lampiranKK = reqFiles.lampiranKK ? reqFiles.lampiranKK[0].filename : null;
  const fotoDiri = reqFiles.fotoDiri ? reqFiles.fotoDiri[0].filename : null;
  const paspor = reqFiles.paspor ? reqFiles.paspor[0].filename : null;

  // Ambil data lama dari database
  console.log(reqData.id);
  const existingData = await dataJamaah.findOne({ _id: reqData.id });

  if (!existingData) {
    throw new Error("Data tidak ditemukan.");
  }

  // Data yang akan diupdate
  const updateData = {
    nama: reqData.nama || existingData.nama,
    nik: reqData.nik || existingData.nik,
    tempatLahir: reqData.tempatLahir || existingData.tempatLahir,
    tanggalLahir: reqData.tanggalLahir || existingData.tanggalLahir,
    alamat: reqData.alamat || existingData.alamat,
    jenisKelamin: reqData.jenisKelamin || existingData.jenisKelamin,
    nomerPaspor: reqData.nomerPaspor || existingData.nomerPaspor,
    masaPaspor: reqData.masaPaspor || existingData.masaPaspor,
    paket: reqData.paket || existingData.paket,
    kamar: reqData.kamar || existingData.kamar,
    provinsi: reqData.provinsi || existingData.provinsi,
    kota: reqData.kota || existingData.kota,
    kecamatan: reqData.kecamatan || existingData.kecamatan,
    kelurahan: reqData.kelurahan || existingData.kelurahan,
    lampiranKTP: lampiranKTP || existingData.lampiranKTP,
    lampiranKK: lampiranKK || existingData.lampiranKK,
    fotoDiri: fotoDiri || existingData.fotoDiri,
    paspor: paspor || existingData.paspor,
  };

  console.log("Update Data:", updateData);

  // Mengupdate dokumen berdasarkan nik
  const result = await dataJamaah.updateOne({ _id: reqData.id }, { $set: updateData });

  if (result.nModified === 0) {
    console.log("Tidak ada dokumen yang diperbarui.");
  } else {
    console.log("Dokumen berhasil diperbarui:", result);
  }

  return updateData;
};

const getDataJamaah = async () => {
  const dataJamaahUmroh = await dataJamaah.find({});

  return dataJamaahUmroh;
};

const deleteDataJamaah = async (inputNik) => {
  await dataJamaah.deleteOne({ nik: inputNik });
};

module.exports = { setData, getDataJamaah, deleteDataJamaah, updateSetData };
