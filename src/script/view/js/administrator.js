import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const administrator = async () => {
  // Get Element ======================================================
  const administratorElement = document.getElementById("administrator");
  const modalActionTambahAkunButtonElement = document.getElementById("buttonAddPJ");
  const modalActionTambahLombaButtonElement = document.getElementById("buttonAddLomba");

  // Function =========================================================
  const showCounter = async () => {
    const counterContainer = document.getElementById('couter-container');
    const response = await EMSApi.getCountCompetition();
    console.log(response);
    for (let item in response.data) {
      if (response.data[item]["kategori_lomba"] === "team") {
        let content = `
        <div class="row bg-white shadow m-5 p-5 px-5 text-center rounded">
              <div class="fs-3 fw-bold bg-primary text-white p-2 rounded">
                Pendaftar ${response.data[item]["nama_lomba"]}
              </div>
              <div
                class="fs-1 my-5 text-primary fw-bold">
                ${response.data[item]["jumlah_pendaftar"]}
              </div>
              <div class="fs-3">Tim</div>
            </div>
        `
        counterContainer.innerHTML += content;

      } else {
        let content = `
        <div class="row bg-white shadow m-5 p-5 px-5 text-center rounded">
              <div class="fs-3 fw-bold bg-primary text-white p-2 rounded">
                Pendaftar ${response.data[item]["nama_lomba"]}
              </div>
              <div
                class="fs-1 my-5 text-primary fw-bold">
                ${response.data[item]["jumlah_pendaftar"]}
              </div>
              <div class="fs-3">Peserta</div>
            </div>
        `
        counterContainer.innerHTML += content;
      }
    }
  };

  const showKelolaLomba = async () => {
    const response = await EMSApi.getLombaAll();
    const bodyTable = document.getElementById("body-table-kelola-lomba");
    let count = 1;
    for (let item in response.data) {
      let idLomba = response.data[item].id_lomba;
      let namaLomba = response.data[item].nama_lomba;
      let biayaRegistrasi = response.data[item].biaya_registrasi;
      let startDate = response.data[item].start_date;
      let endtDate = response.data[item].end_date;
      let description = response.data[item].description;
      let kategoriLomba = response.data[item].kategori_lomba;

      let kategoriLombaSelected = '';
      if (kategoriLomba == 'single') {
        kategoriLombaSelected = `
                <option value="team">Team</option>
                <option value="single" selected>Single</option>
                `
      } else {
        kategoriLombaSelected = `
                <option value="team" selected>Team</option>
                <option value="single">Single</option>
                `
      };

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
                                <button type="button"
                                    class="btn btn-outline-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal_delete-${idLomba}"> Delete
                                </button>
                            </td>
                        <tr>
                            `;

      let content = `
      <form id="${idLomba}-form" class="row g-3">
            <div class="col-md-6">
                  <label for="id_lomba" class="form-label">ID Lomba</label>
                  <input
                    type="text"
                    class="form-control"
                    id="id_lomba"
                    name="id_lomba"
                    value="${idLomba}"
                    disabled
                  />
                </div>
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

                <div class="col-md-6">
                  <label for="kategori_lomba" class="form-label"
                    >Kategori Lomba</label
                  >
                  <select
                    id="kategori_lomba"
                    class="form-select"
                    name="kategori_lomba"
                  >
                    ${kategoriLombaSelected}
                  </select>
                </div>
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

      await createModal(
        idLomba,
        "Ubah Lomba " + namaLomba,
        content,
        footer
      );

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
            console.log(response.status);
            if (response.status === "success") {
              ToastModal("success", "berhasil update");
              document.querySelector(`#modal_${idLomba} .btn-close`).click();
              modalActionButton.disabled = false;
              modalActionButton.innerHTML = "Save Changes";
            }
          });
        }
      }, 1);


      // Modal Delete
      await createModal(
        `delete-${idLomba}`,
        "Delete Confirmation",
        `Anda Yakin ingin menghapus  <strong>${namaLomba}</strong>
        <form id="${idLomba}-form-delete">
        <input type="hidden" name="id_lomba" value="${idLomba}">
        </form>
        `,
        `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger modal-action-button">Delete</button>
        `
      );

      // Modal Button Delete Event Listener
      await setTimeout(() => {
        const modalActionButton = document.querySelector(
          `#modal_delete-${idLomba} .modal-action-button`
        );
        if (modalActionButton) {
          modalActionButton.addEventListener("click", async (event) => {
            modalActionButton.disabled = true;
            modalActionButton.innerHTML = `
                                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Menghapus ...
                                `;

            const form = document.getElementById(`${idLomba}-form-delete`);
            const id_lomba = (form.querySelector(`input[name="id_lomba"]`).value);
            
            console.log(id_lomba);
            let response = await EMSApi.deleteLomba(id_lomba);

            if (response.status === "success") {
              ToastModal("success", "berhasil menghapus");
              document.querySelector(`#modal_delete-${idLomba} .btn-close`).click();
              modalActionButton.disabled = false;
              modalActionButton.innerHTML = `Delete`;

              setTimeout(location.reload(),1000);

            }


          });
        }
      }, 1000);

    }
  };

  const showPenanggungJawab = async () => {
    const response = await EMSApi.getPenanggungJawab();
    const bodyTable = document.getElementById("body-table-kelola-pj");
    let count = 1;
    for (let item in response.data) {
      let uuid = response.data[item].uuid;
      let username = response.data[item].username;
      let password = response.data[item].password;
      let nama = response.data[item].nama;
      let jenis_Kelamin = response.data[item].jenis_Kelamin;
      let nama_lomba = response.data[item].nama_lomba;
      let jenis_Kelamin_selected = ''
      let lomba_selected = ''

      if (jenis_Kelamin == 'Laki-Laki') {
        jenis_Kelamin_selected = `
                <option selected value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
                `
      } else {
        jenis_Kelamin_selected = `
                <option value="Laki-Laki">Laki-Laki</option>
                <option selected value="Perempuan">Perempuan</option>
                `
      };

      if (nama_lomba == 'Photography') {
        lomba_selected = `
                <option value="150">Basketball</option>
                <option selected value="110">Photography</option>
                `
      } else {
        lomba_selected = `
                <option selected value="150">Basketball</option>
                <option  value="110">Photography</option>
                `
      };

      let content = `
      <form id="${uuid}-form" class="row g-3">
           <input type="text" id="uuid" class="d-none" name="uuid" value="${uuid}" hidden>
            <div class="col-md-6">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" name="username" value="${username}">
            </div>
            <div class="col-md-6">
              <label for="password" class="form-label">Password</label>
              <input type="text" class="form-control" id="password" name="password" value="${password}">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="nama">Nama Penanggung Jawab</label>
              <input type="text" class="form-control" id="nama" name="nama" value="${nama}">
            </div>
            <div class="col-md-6">
              <label for="jenis_kelamin" class="form-label">Jenis Kelamin</label>
              <select id="jenis_kelamin" class="form-select" name="jenis_kelamin">
              ${jenis_Kelamin_selected}
              </select>
            </div>
            <div class="col-md-12">
              <label for="lomba-pj" class="form-label">Penugasan</label>
              <select id="lomba-pj" class="form-select" name="lomba" >
              ${lomba_selected}
                </select>
            </div>
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
            <button type="button" class="btn btn-primary modal-action-button">Edit</button>
      `;

       // Modal Detail
      await createModal(uuid, "Details Penanggung Jawab", content, footer);
      
      bodyTable.innerHTML += `
                        <tr>
                            <th scope="row">${count++}</th>
                            <td>${nama_lomba} Competition</td>
                            <td>${nama}</td>
                            <td class="text-center">
                                <button type="button"
                                    class="btn btn-outline-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal_${uuid}"> Details
                                </button>
                                <button type="button"
                                    class="btn btn-outline-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target='#modal_delete-${uuid}'>
                                     Delete
                                </button>
                            </td>
                        <tr>
                            `;

      // Modal Button Edit Event Listener
      await setTimeout(() => {
        const modalActionButton = document.querySelector(
          `#modal_${uuid} .modal-action-button`
        );
        if (modalActionButton) {
          modalActionButton.addEventListener("click", async (event) => {
            modalActionButton.disabled = true;
            modalActionButton.innerHTML = `
                                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Mengedit ...
                                `;

            var form = document.getElementById(`${uuid}-form`);
            
            var data = new FormData(form);
            // console.log(form);
            let response = await EMSApi.editPJ(data);
            console.log(response);
            if (response.status === "success") {
              ToastModal("success", "berhasil mengedit");
              document.querySelector(`#modal_${uuid} .btn-close`).click();
              modalActionButton.disabled = false;
              modalActionButton.innerHTML = `Edit`;

              setTimeout(location.reload(),10000);

            }


          });
        }
      }, 1000);


      // Modal Delete
      await createModal(
        `delete-${uuid}`,
        "Delete Confirmation",
        `Anda Yakin ingin menghapus <strong>${nama}</strong> sebagai Penanggung Jawab <strong>${nama_lomba}</strong>
        <form id="${uuid}-form-delete">
        <input type="hidden" name="uuid" value="${uuid}">
        </form>
        `,
        `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger modal-action-button">Delete</button>
        `
      );

      // Modal Button Delete Event Listener
      await setTimeout(() => {
        const modalActionButton = document.querySelector(
          `#modal_delete-${uuid} .modal-action-button`
        );
        if (modalActionButton) {
          modalActionButton.addEventListener("click", async (event) => {
            modalActionButton.disabled = true;
            modalActionButton.innerHTML = `
                                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Menghapus ...
                                `;

            const form = document.getElementById(`${uuid}-form-delete`);
            const IdPJ = (form.querySelector(`input[name="uuid"]`).value);
            
            console.log(IdPJ);
            let response = await EMSApi.deletePJ(IdPJ);

            if (response.status === "success") {
              ToastModal("success", "berhasil menghapus");
              document.querySelector(`#modal_delete-${IdPJ} .btn-close`).click();
              modalActionButton.disabled = false;
              modalActionButton.innerHTML = `Delete`;

              setTimeout(location.reload(),10000);

            }


          });
        }
      }, 1000);




    }
  };

  const tambahAkunHandler = async (event) => {
    let button = document.getElementById("buttonAddPJ");
    button.addEventListener("click", async () => {
      button.disabled = true;
      button.innerHTML = `
                                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Memproses ...
                                `;

      const form = document.getElementById(`tambah-akun-form`);
      var data = new FormData(form);
      let response = await EMSApi.addPJ(data);
      console.log(response);
      if (response.status === "success") {
        ToastModal("success", "berhasil update");
        document.querySelector(`#modal-tambah-akun .btn-close`).click();
        button.disabled = false;
        button.innerHTML = `Tambah`;
        location.reload();
      }
    });
  };

  const tambahLombaHandler = async (event) => {
    let button = document.getElementById("buttonAddLomba");
    button.addEventListener("click", async () => {
      button.disabled = true;
      button.innerHTML = `
                                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Memproses ...
                                `;

      const form = document.getElementById(`tambah-lomba-form`);
      var data = new FormData(form);
      let response = await EMSApi.addLomba(data);
      if (response.status === "success") {
        ToastModal("success", "berhasil menambah lomba");
        document.querySelector(`#modal-tambah-lomba .btn-close`).click();
        button.disabled = false;
        button.innerHTML = `Tambah`;
        location.reload();
      }
    });
  };

  const visibilityForm = (form_id, condition) => {
    const form = document.getElementById(form_id);
    if (!form) return;

    const inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.disabled = condition;
    });
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

  // Event Handler ======================================================
  if (modalActionTambahAkunButtonElement) {
    const tambahAkunButton = document.getElementById("tambah-akun");
    tambahAkunButton.addEventListener("click", tambahAkunHandler);
  }

  if (modalActionTambahLombaButtonElement) {
    const tambahLombaButton = document.getElementById("tambah-lomba");
    tambahLombaButton.addEventListener("click", tambahLombaHandler);
  }

  if (administratorElement) {
    showPenanggungJawab();
    showKelolaLomba();
    showCounter();
  }
};

export default administrator;
