import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const login = () => {
    // Get Element ======================================================
    const LoginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("login-button")


    // Function =========================================================
    // Login
    const loginHandler = async (event) => {
        event.preventDefault();

        loginButton.disabled = true;
        loginButton.innerHTML = `
                                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Memproses ...
                                `;

        var formElement = document.getElementById("login-form");
        var data = new FormData (formElement);

        try {
            let response = await EMSApi.login(data); 
            console.log(response);
            var message = response.details;
            var status = response.status;
            console.log(response);
            if (status == 'success') {
                ToastLogin(status, message);
                localStorage.setItem('uuid', response.data[0]);
                localStorage.setItem('user', response.data[1]);
                await setTimeout(() => {
                    window.location.href = response.redirect;                
                },3000);  
            } else  {
                ToastLogin(status, message);
                loginButton.disabled = false;
                loginButton.innerHTML = `
                               Login
                            `;
            } ;                    
            
        } catch (error) {
            console.error(error);
        };
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
    // Login 
    if (LoginForm) {
        LoginForm.addEventListener("submit", loginHandler);
    };
};

export default login;