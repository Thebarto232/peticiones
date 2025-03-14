import solicitud from "./solicitud.js";
export const getPost= async(URL,usuario)=>{
    return  await    solicitud(`${URL}/posts?userId=${usuario.id}`) 
    
}