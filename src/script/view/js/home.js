import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const home = () => {
    const homePageElement = document.getElementById('home-page');

    // Function
    const showLomba = async () => {
        const response = await EMSApi.getLombaAll();

        const formatter = new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'long',
            day:'2-digit',
            weekday: 'long'
        });
        
        const CompetitionContainerElement = document.getElementById('Competition')
        for (let item in response.data) {
            console.log(response.data[item])

            if (item % 2 === 0) {
                let content = `
                    <div class="row my-5">
                    <div class="col-6">
                        <img src="${response.data[item].ilustrasi}" class="rounded mx-auto d-block" alt="Event Basketball Logo" width="400px">
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <h1 class="title fw-bold">${response.data[item].nama_lomba} Competition!</h1>
                            <p class="card-text fs-5">${response.data[item].description}</p>
                            <span class="bg-primary rounded px-3 py-3 fs-5" style="color: white;" > <strong>Periode Pendaftaran : </strong>${formatter.format(new Date(response.data[item].start_date))} - ${formatter.format(new Date(response.data[item].end_date))}</span>
                        </div>
                    </div>
                </div>
                `

                CompetitionContainerElement.innerHTML += content;
            } else {
                let content = `
                    <div class="row my-5">
                <div class="col-6">
                    <div class="row">
                        <h1 class="title fw-bold">${response.data[item].nama_lomba} Competition !</h1>
                        <p class="card-text fs-5">${response.data[item].description}</p>
                        <span class="bg-primary rounded px-3 py-3 fs-5" style="color: white;"> <strong>Periode Pendaftaran : </strong>${formatter.format(new Date(response.data[item].start_date))} - ${formatter.format(new Date(response.data[item].end_date))}</span>
                    </div>
                </div>
                <div class="col-6 ">
                    <img src="${response.data[item].ilustrasi}" class="rounded mx-auto d-block" alt="Event Photography Logo" width="400px">
                </div>
            </div>
                `

                CompetitionContainerElement.innerHTML += content;
            } ;

        } 

        // const formatedData = formatter.format(response.data[0].start_date);
        // const formatedData = formatter.format(new Date(response.data[0].start_date));
        // console.log(formatedData);


        // document.getElementById('photography-period').innerHTML =`
        //                             <strong>Periode Pendaftaran : </strong>${formatter.format(new Date(response.data[0].start_date))} - ${formatter.format(new Date(response.data[0].end_date))}
        //                             `
        // document.getElementById('basketball-period').innerHTML =`
        //                             <strong>Periode Pendaftaran : </strong>${formatter.format(new Date(response.data[1].start_date))} - ${formatter.format(new Date(response.data[1].end_date))}
        //                             `
    }

    // Handler
    if (homePageElement){
        showLomba();
    }

    
};

export default home;