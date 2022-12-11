import axios, { AxiosError } from "axios"

const URL = "http://localhost:5000/"

export default class NotesService{


    public static async  fetchAllNotes(user_id: string,authToken:string) {
        
        const res = await axios.get(`${URL}api/notes`,  {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return res;
    }



}

