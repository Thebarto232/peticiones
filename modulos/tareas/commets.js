import solicitud from "../solicitud/solicitud.js"; //acceso a modulo solicitud
export const getCommets = async (URL, post) => {
  //usamos el getcomment para entrar al objeto post
  //obtenemos el commentario segun el id del post
  // y utilizamos URL http para acceder a los comentarios  de id
  return await solicitud(`${URL}/comments?postId=${post.id}`);
};
