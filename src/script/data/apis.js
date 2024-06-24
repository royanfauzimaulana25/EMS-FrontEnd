const baseUrl = "http://127.0.0.1:8000";

class EMSApi {    
    // Add Account Registration
    static async addAccount(data) {
        const response = await fetch(`${baseUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();

        alert(responseJson);
    }    
}

export default EMSApi;