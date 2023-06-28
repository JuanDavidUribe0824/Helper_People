import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { redirect } from "next/navigation";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

import {
  collection,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Layout from "../../components/layout/Layout.js";
import Header from '../../components/layout/Header.js';
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404.js";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Campo, InputSubmit } from "../../components/ui/Formulario.js";
import Boton from "../../components/ui/Boton.js";
import Modal from "../../components/Modal/modal.js";

const ContenedorPublicacion = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const CreadorPublicacion = styled.p`
  padding: 0.5rem 2rem;
  background-color: var(--azul);
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

const Publicacion = () => {
  //State del componente
  const [publicacion, guardarPublicacion] = useState({});
  const [error, guardarError] = useState(false);
  const [comentario, guardarComentario] = useState({});
  const [consultarDB, guardarConsultarDB] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);

  //Routing para obtener el id Actual
  const router = useRouter();
  const {
    query: { id },
  } = router;
  //Context de Firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && consultarDB) {
      const obtenerPublicacion = async () => {
        const publicacionQuery = await doc(
          collection(firebase.db, "publicaciones"),
          id
        );
        const publicacion = await getDoc(publicacionQuery);
        //console.log(publicacion.data());
        if (publicacion.exists) {
          guardarPublicacion(publicacion.data());
          guardarConsultarDB(false);
        } else {
          guardarError(true);
          guardarConsultarDB(false);
        }
      };
      obtenerPublicacion();
    }
  }, [id]);

  if (!publicacion || (Object.keys(publicacion).length === 0 && !error))
    return "Cargando...";

  const {
    nombre,
    comentarios,
    creado,
    descripcion,
    empresa,
    url,
    urlimagen,
    votos,
    creador,
    haVotado,
  } = publicacion;

  // Administrar y validar los votos
  const votarPublicacion = () => {
    if (!usuario) {
      return redirect("/login");
    }
    // Obtener y sumar un nuevo Voto
    const nuevoTotal = votos + 1;

    // Verificar si el usuario actual ha votado
    if (haVotado.includes(usuario.uid)) return;

    // Guardar el ID del usuario que Ha Votado
    const nuevoHaVotado = [...haVotado, usuario.uid];

    // Actualizar en la BD
    const docRef = doc(collection(firebase.db, "publicaciones"), id);
    updateDoc(docRef, {
      votos: nuevoTotal,
      haVotado: nuevoHaVotado,
    });

    // Actualizar el State
    guardarPublicacion({
      ...publicacion,
      votos: nuevoTotal,
    });
    guardarConsultarDB(true); // Hay un voto, por lo tanto consultar a la BD
  };

  // Funciones para crear Comentarios
  const comentarioChange = (e) => {
    guardarComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  // Identificar si el Comentario es del creador del producto
  const esCreador = (id) => {
    return creador.id === id;
  };
  const agregarComentario = (e) => {
    e.preventDefault();

    if (!usuario) {
      return router.push("/login");
    }

    // Informacion Extra al Comentario
    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    // Tomar copia de Comentarios y agregarlos al arreglo

    const nuevosComentarios = [...comentarios, comentario];

    // Actualizar la BD
    const docRef = doc(collection(firebase.db, "publicaciones"), id);
    updateDoc(docRef, { comentarios: nuevosComentarios });

    // Actualizar el State
    guardarPublicacion({
      ...publicacion,
      comentarios: nuevosComentarios,
    });
    guardarConsultarDB(true); // Hay un Comentario, por lo tanto consultar a la BD
  };

  // Funcion que revisa que el creador del producto sea el mismo que esta autenticado

  const puedeBorrar = () => {
    if (!usuario) return false;

    if (creador.id === usuario.uid) {
      return true;
    }
  };

  // Eliminar una publicacion de la BD
  const eliminarPublicacion = async () => {
    if (!usuario) {
      return router.push("/login");
    }

    if (creador.id !== usuario.uid && !usuario.isAdmin) {
      return router.push("/");
    }
    try {
      // Eliminar Producto
      await deleteDoc(doc(firebase.db, "publicaciones", id));
      // Eliminar imagen
      const storage = getStorage();
      const imgRef = ref(storage, urlimagen);
      deleteObject(imgRef)
        .then(() => {
          // Imagen eliminada correctamente
        })
        .catch((error) => {
          console.log(error);
        });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <Layout>
        <>
          {error ? (
            <Error404 />
          ) : (
            <div className="contenedor">
              <h1
                css={css`
                text-align: center;
                margin-top: 5rem;
              `}
              >
                {" "}
                {nombre}{" "}
              </h1>

              <ContenedorPublicacion>
                <div>
                  <p>
                    Publicado hace{" "}
                    {formatDistanceToNow(new Date(creado), { locale: es })}
                  </p>
                  <p>
                    Por {creador.nombre} ° Servicio de {empresa}
                  </p>
                  <img src={urlimagen} />
                  <p>{descripcion}</p>

                  {usuario && (
                    <>
                      <h2>Agrega tu comentario</h2>
                      <form onSubmit={agregarComentario}>
                        <Campo>
                          <input
                            type="text"
                            name="mensaje"
                            onChange={comentarioChange}
                          />
                        </Campo>
                        <InputSubmit type="submit" value="Agregar Comentario" />
                      </form>
                    </>
                  )}

                  <h2
                    css={css`
                    margin: 2rem 0;
                  `}
                  >
                    Comentarios
                  </h2>

                  {comentarios.length === 0 ? (
                    "Aún no hay Comentarios"
                  ) : (
                    <ul>
                      {comentarios.map((comentario, i) => (
                        <li
                          key={`${comentario.usuarioId}-${i}`}
                          css={css`
                          border: 1px solid #e1e1e1;
                          padding: 2rem;
                        `}
                        >
                          <p>{comentario.mensaje}</p>
                          <p>
                            Escrito por:
                            <span
                              css={css`
                              font-weight: bold;
                            `}
                            >
                              {""} {comentario.usuarioNombre}
                            </span>
                          </p>
                          {esCreador(comentario.usuarioId) && (
                            <CreadorPublicacion>Es Creador</CreadorPublicacion>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <aside>
                  <Boton target="_blank" bgColor="true" href={url}>
                    Visitar URL
                  </Boton>

                  {usuario && (
                    <Link legacyBehavior href="/homeChat">
                      <Boton bgColor="true">Chat</Boton>
                    </Link>
                  )}

                  <div
                    css={css`
                    margin-top: 5rem;
                  `}
                  >
                    <p
                      css={css`
                      text-align: center;
                    `}
                    >
                      {votos} Votos
                    </p>

                    {usuario && <Boton onClick={votarPublicacion}>Votar</Boton>}
                    {usuario && !usuario.isAdmin && !esCreador(usuario.uid) && (
                      <Boton
                        bgColor="red"
                        onClick={() => setShowReportModal(true)}
                      >
                        Reportar
                      </Boton>
                    )}
                    {usuario && usuario.isAdmin && (
                      <Boton bgColor="red" onClick={() => eliminarPublicacion()}>
                        Eliminar Publicación
                      </Boton>
                    )}
                  </div>
                </aside>
              </ContenedorPublicacion>

              {puedeBorrar() && (
                <Boton onClick={eliminarPublicacion()}>
                  Eliminar Publicación
                </Boton>
              )}
            </div>
          )}
          <Modal
            isVisible={showReportModal}
            onClose={() => setShowReportModal(false)}
            publicationId={id}
          />
        </>
      </Layout>
    </>
  );
};

export default Publicacion;
