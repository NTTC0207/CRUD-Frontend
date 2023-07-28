import {Profile} from "../Interface/userInterface";


export const fetchUserProfiles = async (): Promise<Profile> => {
 try{
    const response = await fetch('/api/profile');
    const json = await response.json();
    return json;
 }
 catch(err){
    console.log(err)
    return {
        email: "",
        name: "",
        given_name: "",
        family_name: "",
        picture: "",
    }
 }

}