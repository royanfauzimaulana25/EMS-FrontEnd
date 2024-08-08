import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Buffer } from "buffer";

const singleRegistration = () => {
  // Get Element ======================================================
  const RegistrationFormSingleElement = document.getElementById("single-form");
  const JenjangElement = document.getElementById("jenjang-single");
  const SekolahElement = document.getElementById("asal");
  const buttonSubmitsingle = document.getElementById("button-submit-single");
  const LombaSingleElement = document.getElementById("lomba-single");

  // Function =========================================================
  // Add single Registration
  const addSingleHandler = async (event) => {
    event.preventDefault();

    buttonSubmitsingle.disabled = true;
    buttonSubmitsingle.innerHTML = `
                                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Memproses ...
                                `;

    const id_user = localStorage.getItem("uuid");
    const id = (document.getElementById("uuid").value = id_user);
    var formElement = document.getElementById("single-form");
    var data = new FormData(formElement);

    try {
      let response = await EMSApi.addSingle(data);
      console.log(response);
      if (response.status == "error") {
        ToastMessage(response.status, response.details);
      } else {
        ModalSucces();

        await setTimeout(() => {
          window.location.href = `${window.location.origin}/payment/index.html`;
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Jenjang Handler
  const showInfoHandler = async (event) => {
    SekolahElement.innerHTML = '<option selected value="">Pilih...</option>';
    showSekolah();
  };

  // Show Jenjang Sekolah
  const showJenjang = async () => {
    let response = await EMSApi.getJenjang();
    console.log(response);
    for (let item in response.data) {
      const option = document.createElement("option");

      option.value = response.data[item]["id_jenjang"];
      option.text = response.data[item]["jenjang"];
      JenjangElement.add(option);
    }
  };

  // Show Sekolah
  const showSekolah = async () => {
    if (JenjangElement.value !== "") {
      SekolahElement.disabled = false;
      let id_jenjang = JenjangElement.value;
      let response = await EMSApi.getSekolah(id_jenjang);

      for (let item in response.data) {
        const option = document.createElement("option");

        option.value = response.data[item]["npsn"];
        option.text = response.data[item]["nama_sekolah"];
        SekolahElement.add(option);
      }
    } else {
      SekolahElement.disabled = true;
    }
  };

  // Show Lomba
  const showLomba = async () => {
    let response = await EMSApi.getLombaAll();

    for (let item in response.data) {
      if (response.data[item]["kategori_lomba"] === "single") {
        const option = document.createElement("option");

        option.value = response.data[item]["id_lomba"];
        option.text = response.data[item]["nama_lomba"];
        LombaSingleElement.add(option);
      }
    }
  };

  // Modal Succes
  const ModalSucces = () => {
    const modal = document.getElementById("modal-success");
    const modalInstance = new Modal(modal);
    modalInstance.show();
    modal.addEventListener("shown.bs.modal", function (event) {});
  };

  // Toats
  const ToastMessage = (status, message) => {
    const toastElement = document.getElementById("toast");
    const toastBody = (document.querySelector(".toast-body").innerText =
      message);
    if (status === "error") {
      document.getElementById("toast-title").innerHTML =
        ' <i class="bi bi-x-circle-fill text-danger"></i> Gagal Mendaftarkan';
    } else {
      document.getElementById("toast-title").innerHTML =
        ' <i class="bi bi-check-circle-fill text-success"></i> Berhasil Login';
    }
    const toastBootstrap = Toast.getOrCreateInstance(toastElement);
    toastBootstrap.show();
  };

  // Event Handler ======================================================
  // Registration single
  if (RegistrationFormSingleElement) {
    RegistrationFormSingleElement.addEventListener("submit", addSingleHandler);
    showLomba();
  }

  // Jenjang
  if (JenjangElement) {
    showJenjang();
    JenjangElement.addEventListener("change", showInfoHandler);
    showSekolah();
    
  }
};

export default singleRegistration;
