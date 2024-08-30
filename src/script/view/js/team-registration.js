import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const teamRegistration = () => {
    // Get Element ======================================================
    const RegistrationFormTeamElement = document.getElementById("team-form");
    const JenjangElement = document.getElementById('jenjang-team');
    const SekolahElement = document.getElementById('asal');
    const buttonSubmitTeam = document.getElementById('button-submit-team')
    const LombaTeamElement = document.getElementById("lomba-team");

    // Function =========================================================
    // Add Team Registration
    const addTeamHandler = async (event) => {
        event.preventDefault();

        buttonSubmitTeam.disabled = true;
        buttonSubmitTeam.innerHTML = `
                                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Memproses ...
                                `;

        const id_user = localStorage.getItem('uuid');
        const id = document.getElementById('uuid').value = id_user;
        var formElement = document.getElementById("team-form");
        var data = new FormData (formElement);

        try {
            let response = await EMSApi.addTeam(data); 
            console.log(response);
            if(response.status == 'error') {
                ToastMessage(response.status, response.details)
            } else {
                ModalSucces();
                console.log(response);
                await setTimeout(() => {
                    window.location.href = `${window.location.origin}/payment/index.html`
                },3000); 

            }; 
        } catch (error) {
            console.error(error);
        };
    };

    // Jenjang Handler
    const showJenjangHandler = async (event) => {
        SekolahElement.innerHTML = '<option selected value="">Pilih...</option>';
        showSekolah();
    };
    
    // Show Jenjang Sekolah 
    const showJenjang = async () => {
        let response = await EMSApi.getJenjang();
        for (let item in response.data){
            const option = document.createElement('option');
            
            option.value = response.data[item]['id_jenjang'];
            option.text = response.data[item]['jenjang'];
            JenjangElement.add(option);
        };        
    };


    // Show Sekolah 
    const showSekolah= async () => {
        if (JenjangElement.value !==""){
            SekolahElement.disabled = false;
            let id_jenjang = JenjangElement.value;          
            let response = await EMSApi.getSekolah(id_jenjang);

            for (let item in response.data){
                const option = document.createElement('option');
                
                option.value = response.data[item]['npsn'];
                option.text = response.data[item]['nama_sekolah'];
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
      if (response.data[item]["kategori_lomba"] === "team") {
        const option = document.createElement("option");

        option.value = response.data[item]["id_lomba"];
        option.text = response.data[item]["nama_lomba"];
        LombaTeamElement.add(option);
      }
    }
  };

    
    // Modal Succes
    const ModalSucces = () => {
        const modal = document.getElementById('modal-success');
        const modalInstance = new Modal(modal);
        modalInstance.show();
        modal.addEventListener('shown.bs.modal', function(event) {})
    };   
    
    // Toats 
    const ToastMessage = (status, message) => {
        const toastElement = document.getElementById('toast');
        const toastBody = document.querySelector('.toast-body').innerText = message;
        if (status === 'error'){
            document.getElementById('toast-title').innerHTML = ' <i class="bi bi-x-circle-fill text-danger"></i> Gagal Mendaftarkan';
        } else {
            document.getElementById('toast-title').innerHTML = ' <i class="bi bi-check-circle-fill text-success"></i> Berhasil Login';
        }
        const toastBootstrap = Toast.getOrCreateInstance(toastElement);
        toastBootstrap.show();
    };

    // Event Handler ======================================================
    // Registration Team
    if (RegistrationFormTeamElement) {
        RegistrationFormTeamElement.addEventListener("submit", addTeamHandler);
        showLomba();
    };

    // Jenjang 
    if (JenjangElement) {
        showJenjang();
        JenjangElement.addEventListener('change', showJenjangHandler);
        showSekolah();
    };


};

export default teamRegistration;