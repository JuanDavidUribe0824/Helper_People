import React, {useEffect, useState} from 'react';
import Layout from '../components/layout/Layout.js';
import Footer from '../components/Footer/Footer.js';
import { useRouter } from 'next/router.js';
import DetallesPublicacion from '../components/layout/DetallesPublicacion.js'
import usePublicaciones from '../hooks/usePublicaciones.js';


const Buscar = () => {

  const router = useRouter();
  const {query: { q }} = router;

  //Todas las Publicaciones
  const { publicaciones } = usePublicaciones('creado');
  const [ resultado, guardarResultado ] = useState([]);

  useEffect(() => {
    if (q && publicaciones) {
      const busqueda = q.toLowerCase();
      const filtro = publicaciones.filter(publicacion => {
        return (
          publicacion.nombre.toLowerCase().includes(busqueda) ||
          publicacion.descripcion.toLowerCase().includes(busqueda)
        );
      });
      guardarResultado(filtro);
    }
  }, [q, publicaciones]);

  return (
    <div>
      <Layout>
      <div className='listado-publicaciones'>
        <div className='contenedor'>
          <ul className='bg-white'>
            {resultado.map(publicacion => (
              <DetallesPublicacion
                key={publicacion.id}
                publicacion={publicacion}
              />
            ))}
          </ul>
        </div>
      </div>
      </Layout>
      <Footer />
    </div>
  )
}


export default  Buscar;
