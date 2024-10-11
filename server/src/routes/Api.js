const express = require("express");
const routerApi = express.Router();
const { getData, uploadData, uploadFile, deleteData, updateData } = require("../controllers/Api");
const { upload } = require("../../utils/multer");

// Menggunakan middleware untuk upload file
routerApi.post("/uploads", upload.fields([{ name: "lampiranKTP" }, { name: "lampiranKK" }, { name: "fotoDiri" }, { name: "paspor" }]), uploadData);
routerApi.get("/getdata", getData);
routerApi.delete("/deleteData/:nik", deleteData);
routerApi.put("/uploads", upload.fields([{ name: "lampiranKTP" }, { name: "lampiranKK" }, { name: "fotoDiri" }, { name: "paspor" }]), updateData);
module.exports = routerApi;
