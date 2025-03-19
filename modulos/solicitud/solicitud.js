const solicitud = async url => {
    const peticion = await fetch(url);
    const data = await peticion.json();
    return data
}

export default solicitud ;
