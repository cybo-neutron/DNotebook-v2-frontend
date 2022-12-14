import axios, { AxiosError } from "axios"
import { Note } from "../utils/types";

const URL = "https://dnotebook-backend.onrender.com/"

export default class NotesService{


    public static async  fetchAllNotes(authToken:string) {
        
        const res = await axios.get(`${URL}api/notes`,  {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return res;
    }

    public static async createNewNote(authToken:string) {
        
        //Creates empty note
        const res = await axios.post(`${URL}api/notes/create`,{title:"title",description:""} ,{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })

        return res;
    }

    public static async deleteNote(note_id: string, authToken: string) {

        const res = await axios.delete(`${URL}api/notes/delete/${note_id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return res;
    }

    public static async updatNote(note_id:string,authToken:string,name:string,value:string) {
        
        const res = await axios.patch(`${URL}api/notes/update/${note_id}`,
            {
                [name]:value
            },
            {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        return res;
    }

}

