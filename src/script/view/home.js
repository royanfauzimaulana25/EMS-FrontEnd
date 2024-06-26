import "../../styles/styles.css";
const baseUrl = "http://127.0.0.1:8000";
import EMSApi from "../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const home = () => {
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

    // Login
    const loginHandler = async (event) => {
        event.preventDefault();

        var formElement = document.getElementById("login-form");
        var data = new FormData (formElement);

        try {
            let response = await EMSApi.login(data); 
            var message = response.details;
            var status = response.status;
            ToastLogin(status, message);

            await setTimeout(() => {
                if (status = 'success') {
                    localStorage.setItem('uuid', response.data);
                    window.location.href = response.redirect;
                };
            },3000);            
            
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
    // Toats 
    const ToastLogin = (status, message) => {
        const toastElement = document.getElementById('toast');
        const toastBody = document.querySelector('.toast-body').innerText = message;
        if (status === 'error'){
            document.getElementById('toast-title').innerHTML = ' <i class="bi bi-x-circle-fill text-danger"></i> Gagal Login';
        } else {
            document.getElementById('toast-title').innerHTML = ' <i class="bi bi-check-circle-fill text-success"></i> Berhasil Login';
        }
        const toastBootstrap = Toast.getOrCreateInstance(toastElement);
        toastBootstrap.show();
    };

    // Event Handler ======================================================
    // Registration
    if (RegistrationForm) {
        RegistrationForm.addEventListener("submit", addAccountHandler);
    };

    // Login 
    if (LoginForm) {
        LoginForm.addEventListener("submit", loginHandler);
    };
};

export default home;