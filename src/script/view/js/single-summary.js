import { data } from "autoprefixer";
import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

import { jsPDF } from 'jspdf';

const single_summary = () => {
    // Get Element ======================================================
    const photographyMainElement = document.getElementById("single");
    const downloadButtonElement = document.getElementById("download-single");
    

    // function
    const getSummaryData = async (id) => {
        const response = await EMSApi.getSingle(id);
        document.getElementById('lomba').innerText = response.data[9];
        document.getElementById('id_pendaftaran').innerText = response.data[0];
        document.getElementById('date').innerText = response.data[1];

        document.getElementById('pas_photo').innerHTML = `<img class="rounded" src="${response.data[8]}" height= 200vh>`;

        document.getElementById('jenjang_sekolah').innerText = response.data[2];
        document.getElementById('asal_sekolah').innerText = response.data[3];
        document.getElementById('nama_lengkap').innerText = response.data[5];
        document.getElementById('no_telp').innerText = response.data[4];
        document.getElementById('alamat').innerText = response.data[6];
        document.getElementById('prestasi').innerText = response.data[7];
        // return response;
    }

    const donwloadBuktiHandler = async (event) => {
        event.preventDefault();

        downloadButtonElement.innerHTML = `
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Mengunduh ...
                                `;
        downloadButtonElement.disabled = true;

        let doc = new jsPDF({
            orientation: 'p', // Portrait
            unit: 'px', // Points (match your HTML content units)
            format: 'a4'
        });
        document.getElementById('verified').hidden = false;
        document.getElementById('header').hidden = true;
        document.getElementById('download-single').hidden = true;

        // Add your HTML content using doc.html() or doc.fromHTML()
        await doc.html(document.getElementById('body'), {
            callback: function (doc) {
                doc.save('output.pdf');
            },
            // autoPaging: 'text',
            margin: [40, 40, 40, 40], // Example margins
            width: 360, // Adjust content width
            windowWidth: 1080, // Adjust virtual window width
        });

        downloadButtonElement.disabled = false;
        downloadButtonElement.innerHTML = `
                                    Download Bukti Pendaftaran
                                `;

        document.getElementById('verified').hidden = true;
        document.getElementById('header').hidden = false;
        document.getElementById('download-single').hidden = false;
    }

    // Event Handler
    if (photographyMainElement) {
        const id_user = localStorage.getItem('uuid');
        getSummaryData(id_user);
        document.getElementById('verified').hidden = true;
    }

    if (downloadButtonElement) {
        downloadButtonElement.addEventListener('click', donwloadBuktiHandler);
    }

}

export default single_summary;