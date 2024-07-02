import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const home = () => {
    const homePageElement = document.getElementById('home-page');

    // Function
    const showDateLomba = async () => {
        const response = await EMSApi.getLombaAll();

        const formatter = new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'long',
            day:'2-digit',
            weekday: 'long'
        });

        // const formatedData = formatter.format(response.data[0].start_date);
        const formatedData = formatter.format(new Date(response.data[0].start_date));
        console.log(formatedData);


        document.getElementById('photography-period').innerHTML =`
                                    <strong>Periode Pendaftaran : </strong>${formatter.format(new Date(response.data[0].start_date))} - ${formatter.format(new Date(response.data[0].end_date))}
                                    `
        document.getElementById('basketball-period').innerHTML =`
                                    <strong>Periode Pendaftaran : </strong>${formatter.format(new Date(response.data[1].start_date))} - ${formatter.format(new Date(response.data[1].end_date))}
                                    `
    }

    // Handler
    if (homePageElement){
        showDateLomba();
    }

    
};

export default home;