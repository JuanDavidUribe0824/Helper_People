import React from 'react';
import styles from '../Footer/Footer.module.css';

const Footer = () => {
  return (
    <section className={styles['f-wrapper']}>
      <div className={`paddings innerWidth flexCenter ${styles['f-container']}`}>
        {/* Left Side */}
        <div className={`flexColStart ${styles['f-left']}`}>
          <div className={styles['logo-two']}>
            <div className={styles['circle-orange']}></div>
            <h2 className="primaryText">HELPER PEOPLE</h2>
          </div>
          <span className="secondaryText">
            Siempre estamos dispuestos
            <br />
            a ayudar a nuestros usuarios
          </span>
        </div>

        {/* Right Side */}
        <div className={`flexColStart ${styles['f-right']}`}>
          <span className="primaryText">Información</span>
          <span className="secondaryText">Armenia, Quindío</span>
          <div className={`flexCenter ${styles['f-menu']}`}>
            <span>Términos y Condiciones</span>
            <span>Servicios</span>
            <span>Planes</span>
            <span>Acerca de</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
