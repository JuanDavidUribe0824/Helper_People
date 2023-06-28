import React from 'react';
import Layout from '../components/layout/Layout.js';
import DetallesPublicacion from '../components/layout/DetallesPublicacion.js'
import usePublicaciones from '../hooks/usePublicaciones.js';
import Footer from '../components/Footer/Footer.js';
import Header from '../components/layout/Header.js';

const Home = () => {

  const { publicaciones } = usePublicaciones('creado')

  return (
    <div>
      <Header />
      <Layout>
        <div className='listado-publicaciones'>
          <div className='contenedor'>
            <ul className='bg-white'>
              {publicaciones.map(publicacion => (
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

export default Home;
