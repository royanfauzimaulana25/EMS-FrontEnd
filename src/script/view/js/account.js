import { Alert, Modal, Toast } from "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const account = () => {
    // Protect Page without login
    const uuid = localStorage.getItem('uuid');
    const currentUrl = window.location.href;
    const basePath = window.location.origin;

    const listUrl = [
        `${basePath}/registration/competition-option.html`,
        `${basePath}/registration/basketball/basketball-registration.html`,
        `${basePath}/registration/basketball/basketball-summary.html`,
        `${basePath}/registration/photography/photography-registration.html`,
        `${basePath}/registration/photography/photography-summary.html`,
        ];

    if (!uuid && listUrl.includes(currentUrl)) {        
    // Redirect to login page if no user is found
        window.location.pathname = '../auth/login.html'; 
    };


    // Get Element ======================================================
    const accountNameElement = document.getElementById("person-name");
    const logoutElement = document.getElementById("logout");


    // Function =========================================================
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

    
};

export default account;