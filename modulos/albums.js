import solicitud from "./solicitud.js";//accede al modulo solitictud y pregunta por el usuario
export const getAlbums = async(URL,usuario)=>{//el usuario se utiliza para indagar todos
    //las solicitud segune l id del usuario en especifico
    return  await solicitud(`${URL}/albums?userId=${usuario.id}`) 
}