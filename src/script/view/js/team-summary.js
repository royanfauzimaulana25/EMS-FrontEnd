import { data } from "autoprefixer";
import EMSApi from "../../data/apis.js";
import { Alert, Modal, Toast } from "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

import { jsPDF } from 'jspdf';

const basketball_summary = () => {
    // Get Element ======================================================
    const teamMainElement = document.getElementById("team");
    const downloadButtonElement = document.getElementById("download-team");
    

    // function
    const getSummaryData = async (id) => {
        const response = await EMSApi.getTeam(id);

        // General Information 
        document.getElementById('lomba-team').innerText = response.data.general['nama_lomba'];
        document.getElementById('id_pendaftaran').innerText = response.data.general['id_pendaftaran'];
        document.getElementById('date').innerText = response.data.general['date'];
        document.getElementById('jenjang_sekolah').innerText = response.data.general['jenjang_sekolah']
        document.getElementById('asal_sekolah').innerText = response.data.general['nama_sekolah'];
        document.getElementById('pendamping').innerText = response.data.general['nama_pendamping'];
        document.getElementById('no_telp').innerText = response.data.general['no_telp'];
        
        // Member Information
        document.getElementById('nama_1').innerText = response.data.member[0]['nama_lengkap'];
        document.getElementById('jenis_kelamin_1').innerText = response.data.member[0]['jenis_kelamin'];
        document.getElementById('pas_photo_1').innerHTML = `<img class="rounded" src="${response.data.member[0]['pas_photo']}" height= 200vh>`;
        document.getElementById('alamat_1').innerText = response.data.member[0]['alamat'];
        document.getElementById('prestasi_1').innerText = response.data.member[0]['prestasi'];
        
        document.getElementById('nama_2').innerText = response.data.member[1]['nama_lengkap'];
        document.getElementById('jenis_kelamin_2').innerText = response.data.member[1]['jenis_kelamin'];
        document.getElementById('pas_photo_2').innerHTML = `<img class="rounded" src="${response.data.member[1]['pas_photo']}" height= 200vh>`;
        document.getElementById('alamat_2').innerText = response.data.member[1]['alamat'];
        document.getElementById('prestasi_2').innerText = response.data.member[1]['prestasi'];
        
        document.getElementById('nama_3').innerText = response.data.member[2]['nama_lengkap'];
        document.getElementById('jenis_kelamin_3').innerText = response.data.member[2]['jenis_kelamin'];
        document.getElementById('pas_photo_3').innerHTML = `<img class="rounded" src="${response.data.member[2]['pas_photo']}" height= 200vh>`;
        document.getElementById('alamat_3').innerText = response.data.member[2]['alamat'];
        document.getElementById('prestasi_3').innerText = response.data.member[2]['prestasi'];
        
        document.getElementById('nama_4').innerText = response.data.member[3]['nama_lengkap'];
        document.getElementById('jenis_kelamin_4').innerText = response.data.member[3]['jenis_kelamin'];
        document.getElementById('pas_photo_4').innerHTML = `<img class="rounded" src="${response.data.member[3]['pas_photo']}" height= 200vh>`;
        document.getElementById('alamat_4').innerText = response.data.member[3]['alamat'];
        document.getElementById('prestasi_4').innerText = response.data.member[3]['prestasi'];

        var linkElement = document.getElementById('penilaian-team');
        linkElement.setAttribute("href", `${response.data.general['scoring_link']}`);
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
            unit: 'pt', // Points (match your HTML content units)
            format: 'a4'
        });
        document.getElementById('verified').hidden = false;
        document.getElementById('header').hidden = true;
        document.getElementById('download-team').hidden = true;

        await doc.html(document.getElementById('body'), {
            callback: function (doc) {
                doc.setPage(1)
                doc.save('output.pdf');
            },
            // autoPaging: 'text',
            margin: [40,40, 40, 40], // Example margins
            width: 450, // Adjust content width
            windowWidth: 1000, // Adjust virtual window width
        });

        downloadButtonElement.disabled = false;
        downloadButtonElement.innerHTML = `
                                    Download Bukti Pendaftaran
                                `;

        document.getElementById('verified').hidden = true;
        document.getElementById('header').hidden = false;
        document.getElementById('download-team').hidden = false;
    }

    // Event Handler
    if (teamMainElement) {
        const id_user = localStorage.getItem('uuid');
        getSummaryData(id_user);
        document.getElementById('verified').hidden = true;
    }

    if (downloadButtonElement) {
        downloadButtonElement.addEventListener('click', donwloadBuktiHandler);
    }

}

export default basketball_summary;