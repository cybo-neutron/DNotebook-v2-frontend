import axios from "axios"

const URL = "https://dnotebook-backend.onrender.com/"


export const verifyUser = async (email: string | undefined, password: string | undefined) => {
    
        const user = await axios.post(`${URL}api/users/login`, {
            email,
            password 
        });
    
    // console.log(user)
    return user;

        
    
}

export const createUser = async (name:string,email: string, password: string) => {
    const user = await axios.post(`${URL}api/users/register`, {
        name, email, password
    });
    return user;
}

export const verifyUserWithToken = async (token: string) => {
    // console.log("verifyUserWithToken : ", token);
    const user = await axios.post(`${URL}api/users/verify`, {},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    // console.log(user);
    return user;
}