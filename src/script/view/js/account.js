import { Alert, Modal, Toast } from "bootstrap";
import EMSApi from "../../data/apis.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ResponseError } from "xendit-node";

const account = () => {
    // Protect Page without login
    const uuid = localStorage.getItem('uuid');
    const currentUrl = window.location.href;
    const basePath = window.location.origin;

    const listUrl = [
        `${basePath}/registration/competition-option.html`,
        `${basePath}/registration/team/team-registration.html`,
        `${basePath}/registration/team/team-summary.html`,
        `${basePath}/registration/single/single-registration.html`,
        `${basePath}/registration/single/single-summary.html`,
        ];

    // Get Element ======================================================
    const accountNameElement = document.getElementById("person-name");
    const logoutElement = document.getElementById("logout");


    // Function =========================================================
    // Cek Registration Status
    const cekRegistrationStatus = async () => {
        const response = await EMSApi.cekRegistration(uuid);
        
        if (response['data'] === 'team'){
            window.location.pathname = 'registration/team/team-summary.html'; 
        } 

        if (response['data'] === 'single'){
            window.location.pathname = 'registration/single/single-summary.html'; 
        }
        // console.log(response['data']);
    };  

    // Logout
    const logoutHandler = async (event) => {
        event.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem('uuid');
        
        window.location.href = `${basePath}/auth/login.html`;
    };  

    // Event Handler ======================================================
    // Account 
    if (accountNameElement) {
        const accountName = localStorage.getItem('user');
        accountNameElement.innerText = accountName;
    };

    // Logut 
    if (logoutElement) {
        logoutElement.addEventListener("click", logoutHandler);
    };
    
    if (!uuid && listUrl.includes(currentUrl)) {        
        // Redirect to login page if no user is found
            window.location.pathname = '../auth/login.html'; 
        };

    if (uuid && currentUrl == `${basePath}/registration/competition-option.html` ) {        
        // Redirect to Summary page if user already registered
            cekRegistrationStatus();
        };
    
};

export default account;