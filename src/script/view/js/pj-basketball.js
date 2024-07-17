import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const penanggung_jawab_basketball = async () => {
  // Get Element ======================================================
  const counterBasketElement = document.getElementById("basket-counter-putra");

  const showCounter = async () => {
    const basketCount = await EMSApi.getBasketballCount();
    document.getElementById("basket-counter-putra").innerText = basketCount.data;
    // document.getElementById("basket-counter-putra").innerText = basketCount.data;
  };

  const showKelolaLomba = async () => {
    const response = await EMSApi.getBasketballAll();
    const bodyTable = document.getElementById("body-table-kelola-lomba");
    let count = 1;
    
    for (let item in response.data) {
      let id_pendaftaran = response.data[item].id_pendaftaran;
      let date = response.data[item].date;
      let jenjang_sekolah = response.data[item].jenjang;
      let nama_sekolah = response.data[item].nama_sekolah;
      let nama_tim = response.data[item].nama_tim;
      let pelatih = response.data[item].pelatih;
      let official = response.data[item].official;
      let kategori_tim = response.data[item].kategori_tim;
      let surat_tugas = response.data[item].surat_tugas;
      let no_telp = response.data[item].no_telp;
      let member = response.data[item].member;

      bodyTable.innerHTML += `
                            <tr>
                            <th scope="row">${count++}</th>
                            <td>${id_pendaftaran}</td>
                            <td>${date}</td>
                            <td>${nama_tim}</td>
                            <td>${nama_sekolah}</td>
                            <td><button type="button"
                                    class="btn btn-outline-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target='#modal_${id_pendaftaran}-surat'>
                                     Lihat File
                                </button></td>
                            <td>${no_telp}</td>
                            <td class="text-center">
                                <button type="button"
                                    class="btn btn-outline-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target='#modal_${id_pendaftaran}'>
                                     Lihat Details
                                </button>
                            </td>
                          </tr>
                                `;
     let footer = `
            <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
            `;

       let content_wrapper = `
        <h5 class="fw-bold  text-primary">General Information</h5>
                            <hr>
                            <table class="table table-borderless fs-5">
                                <tr>
                                    <td class="fw-bold">ID Pendaftaran</td>
                                    <td class="fw-bold">Waktu Pendaftaran</td>
                                </tr>
                                <tr>
                                    <td id="id_pendaftaran">${id_pendaftaran}</td>
                                    <td id="date">${date}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold">Jenjang Sekolah</td>
                                    <td class="fw-bold">Asal Sekolah</td>
                                </tr>
                                <tr>
                                    <td id="jenjang_sekolah">${jenjang_sekolah}</td>
                                    <td id="asal_sekolah">${nama_sekolah}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold" >Nama Pelatih</td>
                                    <td class="fw-bold" >Kategori Tim</td>
                                </tr>
                                <tr>
                                    <td id="pelatih">${pelatih}</td>
                                    <td id="kategori">${kategori_tim}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold">Nama Official</td>
                                    <td class="fw-bold">No Telp Tim</td>
                                </tr>
                                <tr>
                                    <td id="official">${official}</td>
                                    <td id="no_telp">${no_telp}</td>
                                </tr>
                            </table>
       `
    let counter = 1;
    for (let member_data in member) {
        let content = `
            <h5 class="fw-bold  text-primary mt-4">Team Member ${counter++} Information</h5>
                            <hr>
                            <table class="table table-borderless  fs-5">
                                <tr>
                                    <td class="fw-bold">Nama Lengkap Peserta</td>
                                    <td class="fw-bold">No Punggung Peserta</td>
                                    <td rowspan="2" class="align-middle align-center" align="center" id="pas_photo_${counter}"><img src="${member[member_data].pas_photo}" width="150vh"></td>
                                </tr>
                                <tr>
                                    <td id="nama_${counter}">${member[member_data].nama_lengkap}</td>
                                    <td id="no_punggung_${counter}">${member[member_data].no_punggung}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold" colspan="2" >Alamat Peserta</td>
                                    <td rowspan="2" class="align-middle align-center" align="center" id="kartu_pelajar_${counter}"><img src="${member[member_data].kartu_pelajar}" width="200vh"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" id="alamat_${counter}">${member[member_data].alamat}</td>
                                </tr>
                            </table>
            `;
            content_wrapper += content ;
    }

    //  Modal Detail
    await createModal(
      id_pendaftaran,
      "Detail Pendaftaran ",
      content_wrapper,
      footer
    )
        
      let content_surat = `
          <iframe src="${surat_tugas}" width="100%" height="500px"></iframe>
          `;

      await createModal(
        id_pendaftaran + '-surat',
        "Surat Tugas Peserta",
        content_surat,
        footer
      );
   
    }
  };

  const createModal = async (id, title, content, footer) => {
    const modalContainer = document.getElementById("modal-container");

    const modal = `
    <div
      class="modal fade"
      id="modal_${id}"
      tabindex="-1"
      aria-labelledby="modal_label_${id}"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">

            <h1 class="modal-title fs-5" id="modal_label_${id}">
              ${title}
            </h1>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">

            <!-- Content Modal -->
            ${content}
            <!-- End Content Modal -->

          </div>

          <div class="modal-footer">
          ${footer}            
          </div>

        </div>
      </div>
    </div>
    `;

    modalContainer.innerHTML += await modal;
  };

  // Event Listener
  if (counterBasketElement) {
    showCounter();
    showKelolaLomba();
  }
};

export default penanggung_jawab_basketball;
