const { upload, handleMulterError } = require("../../utils/multer");
const { setData, updateSetData, getDataJamaah, deleteDataJamaah } = require("../services/Api");

// Inisialisasi middleware untuk mengupload file
const uploadFile = upload.fields([{ name: "lampiranKTP" }, { name: "lampiranKK" }, { name: "fotoDiri" }, { name: "paspor" }]);
const handleMulterErrorController = handleMulterError; // Tambahkan const di sini

const uploadData = async (req, res) => {
  if (!req.files.lampiranKTP || !req.files.lampiranKK || !req.files.fotoDiri || !req.files.paspor) {
    return res.status(400).json({ error: "Both files are required!" });
  }

  try {
    const data = setData(req.body, req.files);

    return res.status(200).json({ message: "Files uploaded successfully!", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while uploading files." });
  }
};

const getData = async (req, res) => {
  const data = await getDataJamaah();
  res.status(200).json({ data });
};

const deleteData = async (req, res) => {
  const nik = req.params.nik; // Ambil NIK dari parameter URL
  console.log(nik);

  try {
    const result = await deleteDataJamaah(nik); // Pastikan fungsi ini mengembalikan status

    if (result) {
      // Jika penghapusan berhasil
      res.status(200).json({ message: "Data deleted successfully" });
    } else {
      // Jika tidak ada data yang ditemukan untuk dihapus
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateData = async (req, res) => {
  try {
    const data = updateSetData(req.body, req.files);

    return res.status(200).json({ message: "Files uploaded successfully!", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while uploading files." });
  }
};
module.exports = { uploadData, uploadFile, handleMulterErrorController, getData, deleteData, updateData };
