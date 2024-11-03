import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const penanggung_jawab_single = async () => {
  // Get Element ======================================================
  const counterSingleElement = document.getElementById("single-pj");

  const showCounter = async () => {
    const response = await EMSApi.getCountCompetition();
    const response_role = await EMSApi.getPJRole(localStorage.getItem("uuid"));

    for (let index in response.data) {
      if (response.data[index].id_lomba == response_role.data[0]["id_lomba"])
        document.getElementById("title-lomba-single").innerText =
          response.data[index].nama_lomba;
      document.getElementById("single-count").innerText =
        response.data[index].jumlah_pendaftar;
    }
  };

  const showKelolaLomba = async () => {
    const response = await EMSApi.getLombaAll();
    const response_role = await EMSApi.getPJRole(localStorage.getItem("uuid"));
    const bodyTable = document.getElementById("body-table-kelola-lomba-single");
    let count = 1;
    for (let item in response.data) {
      if (response.data[item].id_lomba === response_role.data[0]["id_lomba"]) {
        let idLomba = response.data[item].id_lomba;
        let namaLomba = response.data[item].nama_lomba;
        let biayaRegistrasi = response.data[item].biaya_registrasi;
        let startDate = response.data[item].start_date;
        let endtDate = response.data[item].end_date;
        let description = response.data[item].description;
        let kategoriLomba = response.data[item].kategori_lomba;

        let kategoriLombaSelected = "";
        if (kategoriLomba == "single") {
          kategoriLombaSelected = `
                  <option value="team">Team</option>
                  <option value="single" selected>Single</option>
                  `;
        } else {
          kategoriLombaSelected = `
                  <option value="team" selected>Team</option>
                  <option value="single">Single</option>
                  `;
        }

        bodyTable.innerHTML += `
                          <tr>
                              <th scope="row">${count++}</th>
                              <td>${namaLomba} Competition</td>
                              <td>${startDate}</td>
                              <td>${endtDate}</td>
                              <td class="text-center">
                                  <button type="button"
                                      class="btn btn-outline-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modal_${idLomba}"> Update
                                  </button>
                              </td>
                          <tr>
                              `;

        let content = `
        <form id="${idLomba}-form" class="row g-3">
                  <input
                    type="text"
                    class="form-control"
                    id="id_lomba"
                    name="id_lomba"
                    value="${idLomba}"
                    hidden
                  />              
                  <div class="col-md-6">
                    <label for="nama_lomba" class="form-label">Nama Lomba</label>
                    <input
                      type="text"
                      class="form-control"
                      id="nama_lomba"
                      name="nama_lomba"
                      value = "${namaLomba}"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="biaya" class="form-label">Biaya Registrasi</label>
                    <input
                      type="number"
                      class="form-control"
                      id="biaya"
                      name="biaya_registrasi"
                      value = "${biayaRegistrasi}"
                    />
                  </div>
  
                  <div class="col-md-6">
                    <label class="form-label" for="deskripsi"
                      >Deskripsi Lomba</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="deskripsi"
                      name="description"
                      value = "${description}"
                    />
                  </div>
  
                  <div class="col-md-6">
                    <label class="form-label" for="start_date"
                      >Waktu Mulai Pendaftaran</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="start_date"
                      name="date_start"
                      value = "${startDate}"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label" for="end_date"
                      >Waktu Berakhir Pendaftaran</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="end_date"
                      name="date_end"
                      value = "${endtDate}"
                    />
                  </div>
                  
                  <div class="col-md-6">
                    <label class="form-label" for="ilustrasi">Gambar Ilustrasi Lomba</label>
                    <input type="file" class="form-control" id="ilustrasi" name="ilustrasi" >
                  </div>

                  
                  <select
                    id="kategori_lomba"
                    class="form-select"
                    name="kategori_lomba"
                    hidden
                  >
                    ${kategoriLombaSelected}
                  </select>
              </form>
        `;

        let footer = `
        <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" class="btn btn-primary modal-action-button" data-item-id="${idLomba}">Save changes</button>
        `;

        await createModal(idLomba, "Ubah Lomba " + namaLomba, content, footer);

        // Modal Button Save Change Event Listener
        setTimeout(() => {
          const modalActionButton = document.querySelector(
            `#modal_${idLomba} .modal-action-button`
          );
          if (modalActionButton) {
            modalActionButton.addEventListener("click", async (event) => {
              modalActionButton.disabled = true;
              modalActionButton.innerHTML = `
                                     <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                      Memproses ...
                                  `;

              const form = document.getElementById(`${idLomba}-form`);

              var data = new FormData(form);
              let response = await EMSApi.updateLomba(data);
              // console.log(response.status);
              if (response.status === "success") {
                ToastModal("success", "berhasil update");
                document.querySelector(`#modal_${idLomba} .btn-close`).click();
                modalActionButton.disabled = false;
                modalActionButton.innerHTML = "Save Changes";
                setTimeout(location.reload(), 5000);
              }
            });
          }
        }, 1);
      }
    }
  };

  const showPendaftar = async () => {
    const response = await EMSApi.getSingleAll();
    const response_role = await EMSApi.getPJRole(localStorage.getItem("uuid"));
    const bodyTable = document.getElementById("body-table-pendaftar-single");
    let count = 1;
    console.log(response.data[0]);
    for (let item in response.data) {
      if (response.data[item].id_lomba === response_role.data[0]["id_lomba"]) {
        let id_pendaftaran = response.data[item].id_pendaftaran;
        let date = response.data[item].date;
        let jenjang_sekolah = response.data[item].jenjang_sekolah;
        let nama_sekolah = response.data[item].nama_sekolah;
        let no_telp = response.data[item].no_telp;
        let nama_peserta = response.data[item].nama_peserta;
        let alamat_peserta = response.data[item].alamat_peserta;
        let prestasi_peserta = response.data[item].prestasi_peserta;
        let pas_photo = response.data[item].pas_photo;
        let surat_tugas = response.data[item].surat_tugas;
        let kartu_pelajar = response.data[item].kartu_pelajar;

        bodyTable.innerHTML += `
                            <tr>
                            <th scope="row">${count++}</th>
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
                                    <td  class="fw-bold" >Alamat Peserta</td>
                                    <td  class="fw-bold" >Prestasi Peserta</td>
                                </tr>
                                <tr>
                                    <td id="alamat">${alamat_peserta}</td>
                                    <td id="prestasi">${prestasi_peserta}</td>
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
          id_pendaftaran + "-surat",
          "Surat Tugas Peserta",
          content_surat,
          footer
        );
      }
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

  // Toats
  const ToastModal = (status, message) => {
    const toastElement = document.getElementById("toast");
    const toastBody = (document.querySelector(".toast-body").innerText =
      message);
    if (status === "error") {
      document.getElementById("toast-title").innerHTML =
        ' <i class="bi bi-x-circle-fill text-danger"></i> Gagal ';
    } else {
      document.getElementById("toast-title").innerHTML =
        ' <i class="bi bi-check-circle-fill text-success"></i> Berhasil ';
    }
    const toastBootstrap = Toast.getOrCreateInstance(toastElement);
    toastBootstrap.show();
  };

  // Event Listener
  if (counterSingleElement) {
    showCounter();
    showKelolaLomba();
    showPendaftar();
  }
};

export default penanggung_jawab_single;
