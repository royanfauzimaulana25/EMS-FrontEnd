import { data } from "autoprefixer";
import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const payment = () => {
    // Get Element ======================================================
    const PaymentButton = document.getElementById("payment-button");
    const ItemElement = document.getElementById('item');
    const PriceElement = document.getElementById('price');

    // Function =========================================================
    // Add Account
    const addPaymentHandler = async (event) => {
        event.preventDefault();
        PaymentButton.disabled = true;
        PaymentButton.innerHTML = `
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Memproses ...
                                `;

        let id_user = localStorage.getItem('uuid');
        const response = await EMSApi.getLomba(id_user);

        const lomba = response.data['nama'];
        const price = response.data['price']; 

        try {
            data = {
                uuid : localStorage.getItem('uuid') + '-payment',
                username : localStorage.getItem('user'),
                description : 'Biaya Registrasi ' + lomba + ' Competition',
                price : price,
                competition : lomba.toLowerCase()
            }
            let response = await EMSApi.createInvoice(data); 
            console.log(response);
            ModalSucces();
            await setTimeout(() => {
                window.location.href = response.invoice_url;
            },3000); 
            
        } catch (error) {
            console.error(error);
        };
    };
    

    const getCompetition = async (id) => {
        const response = await EMSApi.getLomba(id);

        const lomba = response.data['nama'];
        const price = response.data['price'];     

        let RP = Intl.NumberFormat('en-ID', {
            style: 'currency',
            currency: 'IDR',
        });

        ItemElement.innerText = `Biaya Registrasi ${lomba}`;
        PriceElement.innerText = `${RP.format(price)}`;
    }

    const checkInvoiceStatus = async () => {

        const response = await EMSApi.checkInvoice(localStorage.getItem('uuid') + '-payment');


        // console.log(JSON.stringify(response) === '[]');
        if (JSON.stringify(response) !== '[]'){
            if (response[0].status == 'SETTLED') {
    
                const Data = await EMSApi.getLomba(localStorage.getItem('uuid'));
                const price = Data.data['price']; 
                const lomba = Data.data['nama'].toLowerCase(); 
    
                const info = {
                    external_id: localStorage.getItem('uuid') + '-payment', 
                    id_pendaftaran: localStorage.getItem('uuid'), 
                    metode_pembayaran: response[0].payment_method , 
                    jumlah_bayar: price               
                };
    
                const responsePay = await EMSApi.addPayment(info)
                ModalSucces();
                await setTimeout(() => {
                    window.location.href = `http://localhost:8080/registration/${lomba}/${lomba}-summary.html`;
                },3000); 
    
            }
        }
    }
    
    // Modal Succes
    const ModalSucces = () => {
        const modal = document.getElementById('modal-success');
        const modalInstance = new Modal(modal);
        modalInstance.show();
        modal.addEventListener('shown.bs.modal', function(event) {})

    };    

    // Event Handler ======================================================
    // Registration
    if (PaymentButton) {
        PaymentButton.addEventListener("click", addPaymentHandler);
    };

    if(ItemElement){
        let id_user = localStorage.getItem('uuid');
        getCompetition(id_user);
        checkInvoiceStatus();
    }

};

export default payment;