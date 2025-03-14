import {getUsuarios,getPost,getCommets,getAlbums,getPhotos} from "./modulos/index.js";
   //aplicamos la importacion de los modulos para que se ejecute el codigo
const URL = "https://jsonplaceholder.typicode.com";//url de la api


// const usuarioId=3; este codigo esta diseñado para buscar los post especificos de un usuario

// const getusuarioId= async (usuarioId)=>{
//     let usuario= await getUsuarios(URL,usuarioId);
//     let post =await getPost(URL,usuario[0])
// }

// getusuarioId(usuarioId);

const manejardatos = async () => {//creamos una promesa donde vamos validar varias tereas
    const usuarios =  await getUsuarios(URL);//usamos el  metodo getusuarios que nos retorna un
    //objeto donde tiene los usuarios aplicamos el await que srive para que se cumpla la promesa
    //junto con el argumento URL que es la url de la api
    return await Promise.all(usuarios.map(async(usuario)=>{
        //retorna la promesa para poder imprimir la peticion  que se ejecuta
        //utiliamos promis all paraq indicar que continuen las demas consultas
        //recorremos con map y lo volvemos un areglo para poder interactua peticion
        // del asyn y el await
        const posts = await getPost(URL,usuario);//nos dirigimos al metodo post en el cual se nececsita url y usuario
        //el url  que es http lo necesitmaos para acceder al usuario junto con  el id para ver los post
        //dejamos el await para que se cumpla la promesa
        const comentPost = await Promise.all( posts.map(async(post)=>{
        //el commetpost usamos la  promesa a que se cumpla y utiliza prome all para que continue con las demas peticiones
        //usamos el id para sacar cada coment
            const coments = await getCommets(URL,post);//accedemos a commet y usamos el url y el post
            //aki aplicamos el post donde necesitamos  el id del post
            return {...post,coments};//retorna  comentPost y  los post y comentarios
            //enel orden de las pociones   ya que en este caso lo hicmos {}
        }));
        const albums = await getAlbums(URL,usuario);//aki hacemmos el miso proceso de comets
        //aki aplicamos el  post usa albunes es el mismo proceso accedemos  al id usuario
        //ppara ver las  photos con el id de albumnes par ver las fotos
        const photoAlbum = await Promise.all( albums.map(async(albums)=>{
            const photos = await getPhotos(URL,albums);
            return {...albums,photos};
        }));
        return {...usuario,photoAlbum,comentPost};//aki imprimomos todas las peticiones
        //el objeto  el cual posee albumes y photos juto con su post
        
    }));
};
manejardatos().then((data)=>{//llamamos la funcion  de la promesa con .then y llamamos data para  imprimir el
    //return de la prom
    console.log(data);//aki mostramos data que es el resultado de la promesa
});