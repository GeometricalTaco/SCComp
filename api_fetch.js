import axios from "axios";

const BASE_URL = "https://portal.uexcorp.space/api";
const API_TOKEN = "a3a08dbdef7381816b204bb212d8a62a9d059751";

const fetchShipData = async () => {
    try {
        const response = await axios.get(`https://portal.uexcorp.space/api/ships/`, {
            headers: {
                "api_key": API_TOKEN,
            }
        });
        //console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching ship data:", error);
        throw error;
    }
};

export { fetchShipData }