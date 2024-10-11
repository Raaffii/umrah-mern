import Input from "../../Shared/Form/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/Util/validator";
import CascadingOption from "../../Shared/Form/CascadingOption";
import { useState } from "react";

export default function FormJamaah({ toggleModal, setMessage, setList, list }) {
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [nomerPaspor, setNomerPaspor] = useState("");
  const [masaPaspor, setMasaPaspor] = useState("");
  const [paket, setPaket] = useState("");
  const [kamar, setKamar] = useState("");
  const [lampiranKTP, setLampiranKTP] = useState(null);
  const [lampiranKK, setLampiranKK] = useState(null);
  const [fotoDiri, setFotoDiri] = useState(null);
  const [paspor, setPaspor] = useState(null);
  const [asal, setAsal] = useState(null);

  const submitHandler = async (e) => {
    toggleModal();
    e.preventDefault();
    try {
      const formData = new FormData();
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
      formData.append("provinsi", asal.province);
      formData.append("kota", asal.city);
      formData.append("kecamatan", asal.district);
      formData.append("kelurahan", asal.village);

      // Pastikan lampiranKTP, lampiranKK, fotoDiri, dan paspor adalah file
      formData.append("lampiranKTP", lampiranKTP); // Pastikan ini adalah File
      formData.append("lampiranKK", lampiranKK); // Pastikan ini adalah File
      formData.append("fotoDiri", fotoDiri); // Pastikan ini adalah File
      formData.append("paspor", paspor); // Pastikan ini adalah File

      const response = await fetch("http://localhost:3000/api/uploads", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(2);

        const fetchProducts = async () => {
          const response = await fetch("http://localhost:3000/api/getdata");

          const responseData = await response.json();

          setList(responseData.data);
        };

        fetchProducts();
      } else {
        console.error("Upload failed:", response.statusText);
        setMessage(3);
      }
    } catch (error) {
      console.error("Upload failed:");
      setMessage(3);
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
                  <Input type='text' placeholder='Nama Lengkap' name='Nama' validators={[VALIDATOR_REQUIRE()]} errorText='Nama Harus Diisi' onChanges={setNama} />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <Input type='number' placeholder='NIK' name='nik' validators={[VALIDATOR_REQUIRE()]} errorText='NIK Harus Diisi (Number)' onChanges={setNik} />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <Input type='text' placeholder='Tempat Lahir' name='tempatLahir' validators={[VALIDATOR_REQUIRE()]} errorText='Tempat Lahir Harus Diisi' onChanges={setTempatLahir} />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <Input type='date' placeholder='Tanggal Lahir' name='tanggalLahir' validators={[VALIDATOR_REQUIRE()]} errorText='Tanggal Lahir Harus Diisi' onChanges={setTanggalLahir} />
                </div>
              </div>
            </div>

            <div className='form-group'>
              <Input type='textarea' placeholder='Alamat' name='alamat' validators={[VALIDATOR_REQUIRE()]} errorText='Alamat Harus Diisi' onChanges={setAlamat} />
            </div>

            <div className='form-group'>
              <label htmlFor='exampleFormControlSelect1'>Asal</label>
              <CascadingOption setAsal={setAsal} />
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='exampleSelectGender'>Paket Umroh</label>
                  <select className='form-control' id='exampleSelectGender' onChange={(e) => setPaket(e.target.value)}>
                    <option value='Paket iktikaf'>Paket iktikaf</option>
                    <option value='Paket 30 Hari'>Paket 30 Hari</option>
                    <option value='Paket Plus Alquds'>Paket Plus Alquds</option>
                  </select>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='exampleSelectGender'>Kamar</label>
                  <select className='form-control' id='exampleSelectGender' onChange={(e) => setKamar(e.target.value)}>
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
                <input type='radio' id='laki-laki' name='jenisKelamin' value='laki-laki' onChange={(e) => setJenisKelamin(e.target.value)} />
                <label htmlFor='laki-laki'>Laki-laki</label>
              </div>
              <div>
                <input type='radio' id='perempuan' name='jenisKelamin' value='perempuan' onChange={(e) => setJenisKelamin(e.target.value)} />
                <label htmlFor='perempuan'>Perempuan</label>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <Input type='text' placeholder='Nomer Paspor' name='nomerPaspor' validators={[VALIDATOR_REQUIRE()]} errorText='Nomer Paspor Harus Diisi' onChanges={setNomerPaspor} />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <Input type='date' placeholder='Masa Paspor' name='masaPaspor' validators={[VALIDATOR_REQUIRE()]} errorText='Masa Paspor Harus Diisi' onChanges={setMasaPaspor} />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='KTP'>KTP</label>
                  {/* <Input type='file' placeholder='Lampiran KTP' name='lampiranKTP' validators={[VALIDATOR_REQUIRE()]} errorText='KTP Harus Diisi' onChanges={(file) => setLampiranKTP(file)} /> */}
                  <input type='file' placeholder='Lampiran KTP' name='lampiranKTP' onChange={(e) => setLampiranKTP(e.target.files[0])} className='form-control' />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='KK'>Kartu Keluarga</label>
                  {/* <Input type='file' placeholder='Lampiran KK' name='lampiranKK' validators={[VALIDATOR_REQUIRE()]} errorText='KK Harus Diisi' onChanges={(file) => setLampiranKK(file)} /> */}
                  <input type='file' placeholder='Lampiran KK' name='lampiranKK' onChange={(e) => setLampiranKK(e.target.files[0])} className='form-control' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='foto'>Foto</label>
                  {/* <Input type='file' placeholder='Foto Diri' name='fotoDiri' validators={[VALIDATOR_REQUIRE()]} errorText='Foto Harus Diisi' onChanges={(file) => setFotoDiri(file)} /> */}
                  <input type='file' placeholder='Foto Diri' name='fotoDiri' onChange={(e) => setFotoDiri(e.target.files[0])} className='form-control' />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='paspor'>Paspor</label>
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
