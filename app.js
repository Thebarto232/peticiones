import { getUsuarios, getPost, getCommets, getAlbums, getPhotos,getTareas } from "./modulos/tareas/index.js"; // importamos los modulos   
// aplicamos la importación de los modulos para que se ejecute el código
const URL = "https://jsonplaceholder.typicode.com"; // url de la api

// const usuarioId=3; este código está diseñado para buscar los post específicos de un usuario

// const getusuarioId= async (usuarioId)=>{ 
//     let usuario= await getUsuarios(URL); 
//     let post =await getPost(URL,usuario[0])
// }

// getusuarioId(usuarioId);

//EJERCICIO 1 
const ListasPendientes = async () => {//accedemos al metodo lista el que nos va imprimir  las tareas de la funcion usuarios
    const usuarios = await getUsuarios(URL);//llamo todo los que contenga usuarios el objeto en este  caso 
    return await Promise.all(//se le colca retunr para al recorrer al funcion retorne  la promesa y se asignamos la funcion promise all para ue ciga su ciclo 
      //de manera que la promesa sega su ciclo
      usuarios.map(async (usuario) => {//recorremos con  usuarios.map donde nos va generar un estilo  de ciclo para poder interar dentro las pociones
        const tareas = await getTareas(URL, usuario);//aki obtenemos el objetpo que en esta caso es usuario y id de usuario
        return tareas//retornamos tara para que recorrar  en usuarios.map mostrandonos  todas las tareas pendientes
       //podemos imprimire de forma directac con un log para ver atreas pero como aplicamos retunr ella retornara usuarios.map
      })
    );
    };

//EJERCICIO 2
const encontrarUsuario = async (username) => {//accedemos al metodo  usuario que usamos para el promt que tendra un switch 
    const usuarios = await getUsuarios(URL);//accedemos  a getusuarios que tiene el objeto usuarios 
    let ListaUsers = new Array();//hacemos un aaray para que se almacene los usuarios ylos recorra
    usuarios.map(async (usuario) => { ListaUsers.push(usuario.username); });//utiliza un .map para recoorer  el username que es el apodo de cada usuario
    //y se almacena en el array ListaUsers
    return await Promise.all(usuarios.map(async (usuario) =>//se crea un promise all que luego se retorna automaticamente y se le ingresa como argumento
    //usuarioo que es el objeto para que retorne 
    {
      const filterUser = ListaUsers.filter((ListaUsers) => ListaUsers == username);//se realiza el filtro el cual devuelve si se encontro o no como si fuese
      //un array
      if (filterUser == usuario.username)//si el usuario.username se cumple si no se imprime constantemente  el acceso al album
      {
        const albums = await getAlbums(URL, usuario);//accdemos  a album con el id  y lo ahayamos con filter
        const photoAlbum = await Promise.all(//creamos photoalbums de forma que podamos retornarlo con las  fotos y el album
          albums.map(async (albums) => {//recorremos con albums.map para que nos retorne el album y las fotos
            const photos = await getPhotos(URL, albums);//accedemos alas fotos
            return { ...albums, photos };//se retorna album y fotos  de forma que podamos verlo
            //el cual retorna
          })
        );
        console.log({ ...usuario, photoAlbum });//Imprime el usuario con sus datos y el photoalbum el cual contiene los albumnes y las fotos solamente
      }
    }));
    };
const manejardatos = async () => { // creamos una promesa donde vamos validar varias tareas
    const usuariosData = await getUsuarios(URL); // usamos el método getUsuarios que nos retorna un objeto donde tiene los usuarios
    // aplicamos el await que sirve para que se cumpla la promesa
    // junto con el argumento URL que es la url de la api
    return await Promise.all(usuariosData.map(async (usuario) => {
        const postsData = await getPost(URL, usuario); // nos dirigimos al método post en el cual se necesita url y usuario
        const comentPostData = await Promise.all(postsData.map(async (post) => {
            const comentsData = await getCommets(URL, post); // accedemos a comments y usamos el url y el post
            return { ...post, coments: comentsData }; // retorna commentPost y los post y comentarios
        }));
        const albumsData = await getAlbums(URL, usuario); // hacemos lo mismo para albums
        const photoAlbumData = await Promise.all(albumsData.map(async (album) => {
            const photosData = await getPhotos(URL, album); // obtenemos las fotos
            return { ...album, photos: photosData };
        }));
        return { ...usuario, photoAlbum: photoAlbumData, comentPost: comentPostData }; // imprimimos todas las peticiones con el objeto
    }));
};
let usuarios = []; // declaramos las variables de forma global para poder acceder a ellas
let posts = [];
let comentPost = [];
let albums = [];
let photoAlbum = [];


const menu_opciones = async () => {
    let opcion = "";
    
    while (opcion !== "6") { // Continúa mostrando el menú hasta que el usuario elija "6" para salir
      console.log("1. Usuarios");
      console.log("2. Posts");
      console.log("3. Comentarios");
      console.log("4. Álbumes");
      console.log("5. Fotos");
      console.log("6. Salir");
  
      opcion = prompt("Seleccione una opción");
  
      switch (opcion) {
        case "1":
          console.log(usuarios); // imprime los usuarios
          break;
        case "2":
          console.log(posts); // imprime los posts
          break;
        case "3":
          console.log(comentPost); // imprime los comentarios
          break;
        case "4":
          console.log(albums); // imprime los álbumes
          break;
        case "5":
          console.log(photoAlbum); // imprime las fotos
          break;
        case "6":
          console.log("salir"); // imprime salir
          break;
        default:
          console.log("opcion no validad"); // imprime opción no válida
          break;
      }
    }
  };
  

manejardatos().then((data) => { // cuando se resuelven las promesas
    usuarios = data.map((item) => item); // extraemos los usuarios y los asignamos a la variable global
    posts = data.map((usuario) => usuario.comentPost); // extraemos los posts
    comentPost = data.map((usuario) => usuario.comentPost); // extraemos los comentarios de los posts
    albums = data.map((usuario) => usuario.photoAlbum); // extraemos los álbumes
    photoAlbum = data.map((usuario) => usuario.photoAlbum); // extraemos las fotos de los álbumes
    console.log(data); // muestra toda la información obtenida
    console.log(usuarios); // mostrar los usuarios
    console.log(posts);
    console.log(comentPost); // mostrar los comentarios
    console.log(albums); // mostrar los álbumes
   console.log(photoAlbum);
    console.log(photoAlbum);
    ListasPendientes().then((data) => { // cuando se resuelven las promesas
        console.log(data); // muestra la información obtenida
    }
    );

    encontrarUsuario("Samantha").then((data) => { // cuando se resuelven las promesas
        console.log(data); // muestra la información obtenida
    });
    // console.log(usuarios); // mostrar los usuarios
    // console.log(posts);  
    

     // mostrar los posts
    menu_opciones(); // llamamos  al menú de opciones
});

