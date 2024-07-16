import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const penanggung_jawab_photography = async () => {
  // Get Element ======================================================
  const counterPhotographyElement = document.getElementById("photography-count");

  const showCounter = async () => {
    const photoCount = await EMSApi.getPhotographyCount();
    document.getElementById("photography-count").innerText = photoCount.data;
  };

  const showKelolaLomba = async () => {
    const response = await EMSApi.getPhotographyAll();
    const bodyTable = document.getElementById("body-table-kelola-lomba");
    let count = 1;
    
    for (let item in response.data) {
      let id_pendaftaran = response.data[item].id_pendaftaran;
      let date = response.data[item].date;
      let jenjang_sekolah = response.data[item].jenjang_sekolah;
      let nama_sekolah = response.data[item].nama_sekolah;
      let no_telp = response.data[item].no_telp;
      let nama_peserta = response.data[item].nama_peserta;
      let alamat_peserta = response.data[item].alamat_peserta;
      let pas_photo = response.data[item].pas_photo;
      let surat_tugas = response.data[item].surat_tugas;
      let kartu_pelajar = response.data[item].kartu_pelajar;

      bodyTable.innerHTML += `
                            <tr>
                            <th scope="row">${count}</th>
                            <td>${id_pendaftaran}</td>
                            <td>${date}</td>
                            <td>${nama_peserta}</td>
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

      let content = `
          <table class="table table-borderless fs-5">
                                <tr>
                                    <td class="fw-bold">ID Pendaftaran</td>
                                    <td class="fw-bold">Waktu Pendaftaran</td>
                                    <td rowspan="4" class="align-middle align-center" align="center" id="pas_photo"><img class="rounded" src="${pas_photo}" height= 200vh></td>
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
                                    <td class="fw-bold">Nama Lengkap Peserta</td>
                                    <td class="fw-bold">No Telp Peserta</td>
                                </tr>
                                <tr>
                                    <td id="nama_lengkap">${nama_peserta}</td>
                                    <td id="no_telp">${no_telp}</td>
                                    <td rowspan="3" class="align-middle align-center" align="center" id="kartu_pelajar"><img class="rounded" src="${kartu_pelajar}" height= 200vh></td>
                                </tr>
                                <tr>
                                    <td colspan="3" class="fw-bold" >Alamat Peserta</td>
                                </tr>
                                <tr>
                                    <td colspan="3" id="alamat">${alamat_peserta}</td>
                                </tr>
                            </table>
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
      
      //  Modal Detail
      await createModal(
        id_pendaftaran,
        "Detail Pendaftaran ",
        content,
        footer
      );

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
  if (counterPhotographyElement) {
    showCounter();
    showKelolaLomba();
  }
};

export default penanggung_jawab_photography;
