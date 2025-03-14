import solicitud from "./solicitud.js";
export  const getUsuarios=async(URL,id)=>{
    let ruta="";
    if(id){
     ruta=`${URL}/users?id=${id}`;
    }else{
        ruta=`${URL}/users`;
    }
  
    const usuarios = await solicitud(ruta);
    return usuarios;

}
    