import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const registration = () => {
    // Get Element ======================================================
    const RegistrationForm = document.getElementById("register-form");
    const LoginForm = document.getElementById("login-form");


    // Function =========================================================
    // Add Account
    const addAccountHandler = async (event) => {
        event.preventDefault();

        var formElement = document.getElementById("register-form");
        var data = new FormData (formElement);

        try {
            let response = await EMSApi.addAccount(data); 
            ModalSucces();
        } catch (error) {
            console.error(error);
        };
    };

    
    // Modal Succes
    const ModalSucces = () => {
        const modal = document.getElementById('modal-success');
        const modalInstance = new Modal(modal);
        modalInstance.show();
        modal.addEventListener('shown.bs.modal', function(event) {})

    };    

    // Event Handler ======================================================
    // Registration
    if (RegistrationForm) {
        RegistrationForm.addEventListener("submit", addAccountHandler);
    };

};

export default registration;