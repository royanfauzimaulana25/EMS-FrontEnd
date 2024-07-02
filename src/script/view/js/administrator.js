import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const administrator = () => {
    // Get Element ======================================================
    const counterBasketElement = document.getElementById('basket-count-admin');

    // Function =========================================================
    const showCounter = async () => { 
        const basketCount = await EMSApi.getBasketballCount();
        const photoCount = await EMSApi.getPhotographyCount();
        document.getElementById('basket-count-admin').innerText = basketCount.data;
        document.getElementById('photography-count-admin').innerText = photoCount.data;        
    }

    const showKelolaLomba = async () => {
        const response = await EMSApi.getLombaAll();
        const bodyTable = document.getElementById('body-table-kelola-lomba');
        let count = 1;
        for (let item in response.data){
            bodyTable.innerHTML += `
                        <tr>
                            <th scope="row">${count++}</th>
                            <td>${response.data[item].nama_lomba} Competition</td>
                            <td>${response.data[item].start_date}</td>
                            <td>${response.data[item].end_date}</td>
                            <td class="text-center">
                                <a href="" class="btn btn-outline-primary"> Ubah Jadwal</a>
                            </td>
                        <tr>
                            `;
        } 
    }

    // Event Handler ======================================================
    
    if (counterBasketElement) {
        showCounter();
        showKelolaLomba();
    }


};

export default administrator;