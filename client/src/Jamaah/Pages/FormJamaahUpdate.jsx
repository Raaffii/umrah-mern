import Input from "../../Shared/Form/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/Util/validator";
import CascadingOption from "../../Shared/Form/CascadingOption";
import { useState, useEffect } from "react";

export default function FormJamaahUpdate({ data, setList, setModalUpdate, setMessage }) {
  const [nama, setNama] = useState();
  const [nik, setNik] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [nomerPaspor, setNomerPaspor] = useState("");
  const [masaPaspor, setMasaPaspor] = useState("");
  const [paket, setPaket] = useState(data.paket);
  const [kamar, setKamar] = useState(data.kamar);
  const [lampiranKTP, setLampiranKTP] = useState(null);
  const [lampiranKK, setLampiranKK] = useState(null);
  const [fotoDiri, setFotoDiri] = useState(null);
  const [paspor, setPaspor] = useState(null);
  const [asal, setAsal] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", data._id);
      formData.append("nama", nama);
      formData.append("nik", nik);
      formData.append("tempatLahir", tempatLahir);
      formData.append("tanggalLahir", tanggalLahir);
      formData.append("alamat", alamat);
      formData.append("jenisKelamin", jenisKelamin);
      formData.append("nomerPaspor", nomerPaspor);
      formData.append("masaPaspor", masaPaspor);
      formData.append("paket", paket);
      formData.append("kamar", kamar);
      formData.append("provinsi", asal ? asal.province : data.provinsi);
      formData.append("kota", asal ? asal.city : data.kota);
      formData.append("kecamatan", asal ? asal.district : data.kecamatan);
      formData.append("kelurahan", asal ? asal.village : data.kelurahan);

      // Tambahkan file ke formData hanya jika ada
      formData.append("lampiranKTP", lampiranKTP);

      formData.append("lampiranKK", lampiranKK);

      formData.append("fotoDiri", fotoDiri);

      formData.append("paspor", paspor);

      const response = await fetch("https://umrah-mern-api.vercel.app/api/uploads", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        const fetchProducts = async () => {
          const response = await fetch("https://umrah-mern-api.vercel.app/api/getdata");

          const responseData = await response.json();

          setList(responseData.data);
          setMessage(4);
        };

        fetchProducts();

        setModalUpdate(false);
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className='col-12 grid-margin'>
      <div className='card'>
        <div className='card-body'>
          <h4 className='card-title'>Horizontal Two column</h4>
          <form className='form-sample' onSubmit={submitHandler}>
            <p className='card-description'>Personal info</p>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <Input type='text' placeholder='Nama Lengkap' name='Nama' validators={[VALIDATOR_REQUIRE()]} errorText='Nama Harus Diisi' onChanges={setNama} setValueSet={data.nama} />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <Input type='number' placeholder='NIK' name='nik' validators={[VALIDATOR_REQUIRE()]} errorText='NIK Harus Diisi (Number)' onChanges={setNik} setValueSet={data.nik} />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <Input type='text' placeholder='Tempat Lahir' name='tempatLahir' validators={[VALIDATOR_REQUIRE()]} errorText='Tempat Lahir Harus Diisi' onChanges={setTempatLahir} setValueSet={data.tempatLahir} />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <Input type='date' placeholder='Tanggal Lahir' name='tanggalLahir' validators={[VALIDATOR_REQUIRE()]} errorText='Tanggal Lahir Harus Diisi' onChanges={setTanggalLahir} setValueSet={data.tanggalLahir} />
                </div>
              </div>
            </div>

            <div className='form-group'>
              <Input type='textarea' placeholder='Alamat' name='alamat' validators={[VALIDATOR_REQUIRE()]} errorText='Alamat Harus Diisi' onChanges={setAlamat} setValueSet={data.alamat} />
            </div>

            <div className='form-group'>
              <label htmlFor='exampleFormControlSelect1'>Asal</label>
              <CascadingOption setAsal={setAsal} data={data} update={true} />
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='exampleSelectGender'>Paket Umroh</label>
                  <select className='form-control' id='exampleSelectGender' onChange={(e) => setPaket(e.target.value)} value={paket ? paket : data.paket}>
                    <option value='Paket iktikaf'>Paket iktikaf</option>
                    <option value='Paket 30 Hari'>Paket 30 Hari</option>
                    <option value='Paket Plus Alquds'>Paket Plus Alquds</option>
                  </select>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='exampleSelectGender'>Kamar</label>
                  <select className='form-control' id='exampleSelectGender' onChange={(e) => setKamar(e.target.value)} value={kamar ? kamar : data.kamar}>
                    <option value='Quint'>Quint</option>
                    <option value='Quad'>Quad</option>
                    <option value='Triple'>Triple</option>
                    <option value='Double'>Double</option>
                    <option value='Single'>Single</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='form-group'>
              <label>Jenis Kelamin</label>
              <div>
                <input
                  type='radio'
                  id='laki-laki'
                  name='jenisKelamin'
                  value='laki-laki'
                  onChange={(e) => setJenisKelamin(e.target.value)}
                  checked={data.jenisKelamin === "laki-laki"} // Menggunakan ekspresi Boolean
                />
                <label htmlFor='laki-laki'>Laki-laki</label>
              </div>
              <div>
                <input type='radio' id='perempuan' name='jenisKelamin' value='perempuan' onChange={(e) => setJenisKelamin(e.target.value)} checked={data.jenisKelamin === "perempuan"} />
                <label htmlFor='perempuan'>Perempuan</label>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <Input type='text' placeholder='Nomer Paspor' name='nomerPaspor' validators={[VALIDATOR_REQUIRE()]} errorText='Nomer Paspor Harus Diisi' onChanges={setNomerPaspor} setValueSet={data.nomerPaspor} />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <Input type='date' placeholder='Masa Paspor' name='masaPaspor' validators={[VALIDATOR_REQUIRE()]} errorText='Masa Paspor Harus Diisi' onChanges={setMasaPaspor} setValueSet={data.masaPaspor} />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='KTP'>KTP</label>
                  {/* <Input type='file' placeholder='Lampiran KTP' name='lampiranKTP' validators={[VALIDATOR_REQUIRE()]} errorText='KTP Harus Diisi' onChanges={(file) => setLampiranKTP(file)} /> */}
                  <p style={{ color: "green" }}>
                    <i className='icon-check'></i> {data.lampiranKTP}
                  </p>
                  <input type='file' placeholder='Lampiran KTP' name='lampiranKTP' onChange={(e) => setLampiranKTP(e.target.files[0])} className='form-control' />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='KK'>Kartu Keluarga</label>
                  <p style={{ color: "green" }}>
                    <i className='icon-check'></i> {data.lampiranKK}
                  </p>
                  {/* <Input type='file' placeholder='Lampiran KK' name='lampiranKK' validators={[VALIDATOR_REQUIRE()]} errorText='KK Harus Diisi' onChanges={(file) => setLampiranKK(file)} /> */}
                  <input type='file' placeholder='Lampiran KK' name='lampiranKK' onChange={(e) => setLampiranKK(e.target.files[0])} className='form-control' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='foto'>Foto</label>
                  <p style={{ color: "green" }}>
                    <i className='icon-check'></i> {data.fotoDiri}
                  </p>
                  {/* <Input type='file' placeholder='Foto Diri' name='fotoDiri' validators={[VALIDATOR_REQUIRE()]} errorText='Foto Harus Diisi' onChanges={(file) => setFotoDiri(file)} /> */}
                  <input type='file' placeholder='Foto Diri' name='fotoDiri' onChange={(e) => setFotoDiri(e.target.files[0])} className='form-control' />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='paspor'>Paspor</label>
                  <p style={{ color: "green" }}>
                    <i className='icon-check'></i> {data.paspor}
                  </p>
                  {/* <Input type='file' placeholder='Paspor' name='paspor' validators={[VALIDATOR_REQUIRE()]} errorText='Paspor Harus Diisi' onChanges={(file) => setPaspor(file)} /> */}
                  <input type='file' placeholder='Paspor' name='paspor' onChange={(e) => setPaspor(e.target.files[0])} className='form-control' />
                </div>
              </div>
            </div>

            <button type='submit' className='btn btn-dark'>
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
