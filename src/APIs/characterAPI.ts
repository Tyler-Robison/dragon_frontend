import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** contains all API calls related to character endpoints.  */

export class CharacterAPI {

       /** GETS all character data  */
       static async findAll() {
        try {
            // const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get(`${BASE_URL}/characters`)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

}