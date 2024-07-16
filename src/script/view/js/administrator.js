import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const administrator = async () => {
  // Get Element ======================================================
  const counterBasketElement = document.getElementById("basket-count-admin");
  const modalActionTambahAkunButtonElement =
    document.getElementById("buttonAddPJ");

  // Function =========================================================
  const showCounter = async () => {
    const basketCount = await EMSApi.getBasketballCount();
    const photoCount = await EMSApi.getPhotographyCount();
    document.getElementById("basket-count-admin").innerText = basketCount.data;
    document.getElementById("photography-count-admin").innerText =
      photoCount.data;
  };

  const showKelolaLomba = async () => {
    const response = await EMSApi.getLombaAll();
    const bodyTable = document.getElementById("body-table-kelola-lomba");
    let count = 1;
    for (let item in response.data) {
      let idLomba = response.data[item].id_lomba;
      let namaLomba = response.data[item].nama_lomba;
      let startDate = response.data[item].start_date;
      let endtDate = response.data[item].end_date;
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
                                    data-bs-target="#modal_${idLomba}"> Ubah Jadwal
                                </button>
                            </td>
                        <tr>
                            `;

      let content = `
      <form id="${idLomba}-form" class="row g-3">
            <input type="text" name="id_lomba" id="id_lomba" hidden>
              <div class="col-md-6">
                <label for="date_start" class="form-label"
                  > Tanggal Mulai Pendaftaran </label
                >
                <input
                  type="date"
                  name="date_start"
                  id="date_start"
                  class="form-control"
                  value="${startDate}"
                />
              </div>
              <div class="col-md-6">
                <label for="date_end" class="form-label"
                  >Tanggal Akhir Pendaftaran</label
                >
                <input
                  type="date"
                  name="date_end"
                  id="date_end"
                  class="form-control"
                  value="${endtDate}"
                />
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
        "Ubah Jadwal Pendaftaran " + namaLomba,
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
            const dataId = (form.querySelector(`input[name="id_lomba"]`).value =
              idLomba);
            var data = new FormData(form);
            let response = await EMSApi.updateLomba(data);
            if (response.status === "success") {
              ToastModal("success", "berhasil update");
              document.querySelector(`#modal_${idLomba} .btn-close`).click();
              modalActionButton.disabled = false;
              modalActionButton.innerHTML = "Save Changes";
            }
          });
        }
      }, 1);
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
                                    data-bs-target='#modal_delete-${uuid}'
                                    data-item-id="123">
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

  if (counterBasketElement) {
    showPenanggungJawab();
    showKelolaLomba();
    showCounter();
  }
};

export default administrator;
