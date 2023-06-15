import React from 'react';
import Layout from '../components/layout/Layout.js';
import DetallesPublicacion from '../components/layout/DetallesPublicacion.js'
import usePublicaciones from '../hooks/usePublicaciones.js';
import Footer from '../components/Footer/Footer.js';

const Home = () => {

  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
       {/* <Hero />
       */}
      </div>
    {/*  <Residencies />
      <Value />
      <GetStarted />
    */}
      <Footer />

    </div>
);
}

export default  Home;
