import axios from "axios";
import { Xendit, Invoice as InvoiceClient } from 'xendit-node';

const secretKey = "xnd_development_iKIA243m0jo05ZqseUT1M5pPgem6R3Jhe1zYXnE7IESu886VTUB9O9cPNevRN:";
const authToken = Buffer.from(secretKey).toString("Base64");
const baseUrl = "https://ems-backend-production.up.railway.app";
// const baseUrl = "http://127.0.0.1:8000";


class EMSApi {
    // Add Account Registration
    static async addAccount(data) {
        try {
            const response = await axios.post(`${baseUrl}/register/`, data);
            return response.data; // Axios automatically parses JSON
        } catch (error) {
            // Handle errors (e.g., network issues, server errors)
            return error; // Or return a custom error object
        }
    }

    // Add Account Penanggung Jawab
    static async addPJ(data) {
        try {
            const response = await axios.post(`${baseUrl}/register/pj`, data);
            return response.data; // Axios automatically parses JSON
        } catch (error) {
            // Handle errors (e.g., network issues, server errors)
            return error; // Or return a custom error object
        }
    }

    // Delete Account Penanggung Jawab
    static async deletePJ(uuid) {
        try {
            const response = await axios.delete(`${baseUrl}/register/pj?uuid=${uuid}`);
            return response.data; // Axios automatically parses JSON
        } catch (error) {
            // Handle errors (e.g., network issues, server errors)
            return error; // Or return a custom error object
        }
    }

    // Edit Account Penanggung Jawab
    static async editPJ(data) {
        try {
            const response = await axios.put(`${baseUrl}/register/pj`, data);
            return response.data; // Axios automatically parses JSON
        } catch (error) {
            // Handle errors (e.g., network issues, server errors)
            return error; // Or return a custom error object
        }
    }

    // Check Account Verification (Login)
    static async login(data) {
        try {
            const response = await axios.post(`${baseUrl}/login/`, data);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    // Get PJ Data
    static async getPenanggungJawab() {
        try {
            const response = await axios.get(`${baseUrl}/register/pj`);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    // Get PJ Data
    static async getPJRole(uuid) {
        try {
            const response = await axios.get(`${baseUrl}/pj/role/?uuid=${uuid}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    // Add Photography Registration
    static async addSingle(data) {
        try {
            const response = await axios.post(`${baseUrl}/single/`, data);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    // Get Photography Summary
    static async getSingle(data) {
        try {
            const response = await axios.get(`${baseUrl}/single/?id_user=${data}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    // Get Photography Data All
    static async getSingleAll() {
        try {
            const response = await axios.get(`${baseUrl}/single/all/`);
            return response.data;
        } catch (error) {
            return error;
        }
    }
   
    // Add Basketball Registration
    static async addTeam(data) {
        try {
            const response = await axios.post(`${baseUrl}/team/`, data);
            return response.data;
        } catch (error) {
            return error;
        }
    }
    
    // Get Team Summary
    static async getTeam(data) {
        try {
            const response = await axios.get(`${baseUrl}/team/?id_user=${data}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    // Get Team All
    static async getTeamAll() {
        try {
            const response = await axios.get(`${baseUrl}/team/all`);
            return response.data;
        } catch (error) {
            return error;
        }
    }
    
       // Get Jenjang Sekolah 
    static async getJenjang() {
        try {
            const response = await axios.get(`${baseUrl}/jenjang/`);
            return response.data;
        } catch (error) {
            return error;
        }
    }

     // Get Competition 
     static async getCountCompetition() {
        try {
            const response = await axios.get(`${baseUrl}/lomba/count`);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    // Get Sekolah (by ID)
    static async getSekolah(id) {
        try {
            const response = await axios.get(`${baseUrl}/sekolah/?id=${id}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }

     // Add Lomba
     static async addLomba(data) {
        try {
            const response = await axios.post(`${baseUrl}/lomba/`, data);
            return response.data; // Axios automatically parses JSON
        } catch (error) {
            // Handle errors (e.g., network issues, server errors)
            return error; // Or return a custom error object
        }
    }

    // Update Lomba  
    static async updateLomba(data) {
        try {
            const response = await axios.put(`${baseUrl}/lomba/`,data);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    // Delete Account Penanggung Jawab
    static async deleteLomba(id) {
        try {
            const response = await axios.delete(`${baseUrl}/lomba/?id_lomba=${id}`);
            return response.data; // Axios automatically parses JSON
        } catch (error) {
            // Handle errors (e.g., network issulomba/alles, server errors)
            return error; // Or return a custom error object
        }
    }

    // Get Lomba (by ID)
    static async getLomba(id) {
        try {
            const response = await axios.get(`${baseUrl}/lomba/?id=${id}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    // Get Lomba all 
    static async getLombaAll() {
        try {
            const response = await axios.get(`${baseUrl}/lomba/all`);
            return response.data;
        } catch (error) {
            return error;
        }
    }


    static async createInvoice(data) {
        const checkoutData = {
            external_id: data['uuid'], // Your unique identifier
            payer_email: data['username'],
            description: data['description'],
            amount: data['price'],
            success_redirect_url: `http://localhost:8080/payment/index.html`,
            failure_redirect_url: `http://localhost:8080/payment/index.html`,
            currency: "IDR",
        };

        const auth = `Basic ${authToken}`
        const headers = { 'Authorization': `${auth}` };
        try {
            const response = await axios.post(
                "https://api.xendit.co/v2/invoices", checkoutData, { headers }
            );
            
            const data = response.data;
            return data;
            // Redirect the user to the checkoutUrl or display it in your UI
        } catch (error) {
            console.log("Error creating checkout page:", error.response ? error.response.data : error.message);
            // Handle errors appropriately 
        }
        // return checkoutData
    }

    static async checkInvoice(id) {
        const auth = `Basic ${authToken}`
        const headers = { 'Authorization': `${auth}` };
        try {

            const response = await axios.get(
                `https://api.xendit.co/v2/invoices/?external_id=${id}`, { headers }
            );

            return response.data;

        } catch (error) {
            console.log("Error creating checkout page:", error.response ? error.response.data : error.message);
        }

    }

    static async addPayment(data) {

        const info = {
            "id_bayar": data.external_id,
            "uuid": data.id_pendaftaran,
            "metode_pembayaran": data.metode_pembayaran,
            "jumlah_bayar": data.jumlah_bayar
          };

        try {
            const response = await axios.post(`${baseUrl}/pay/`, info);
            return response.data; 
        } catch (error) {
            return error; 
        }

    }


}

export default EMSApi;
