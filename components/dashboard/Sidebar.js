import Link from 'next/link';
import { useContext } from 'react';

import { FirebaseContext } from '../../firebase';

import styles from './Sidebar.module.css';

const DashboardSidebar = () => {

  const { usuario, firebase, } = useContext(FirebaseContext);

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__wrapper']}>
        <a className={styles['sidebar__wrapper__brand']}>
          {/* <img src='static/img/' /> */}
          <img src='static/img/logo.png' alt='Logo principal de la aplicación' className={styles['sidebar__wrapper__brand__logo']}/>
          {/* <div className={styles['sidebar__wrapper__brand__name']}>
            <span>Helper</span>
            <span>People</span>
          </div> */}
        </a>
        <div className={styles['sidebar__wrapper__content']}>
          <Link href='/' className={styles['sidebar__wrapper__content__link']}>
            <i className={`bx bxs-home ${styles['sidebar__wrapper__content__link--icon']}`}></i>
            <span className={styles['sidebar__wrapper__content__link--label']}>
              Inicio
            </span>
          </Link>
          <Link href='/reports' className={styles['sidebar__wrapper__content__link']}>
            <i className={`bx bxs-report ${styles['sidebar__wrapper__content__link--icon']}`}></i>
            <span className={styles['sidebar__wrapper__content__link--label']}>
              Reportes
            </span>
          </Link>
          <Link href='/populares' className={styles['sidebar__wrapper__content__link']}>
            <i className={`bx bxs-star ${styles['sidebar__wrapper__content__link--icon']}`}></i>
            <span className={styles['sidebar__wrapper__content__link--label']}>
              Populares
            </span>
          </Link>
        </div>
        <div className={styles['sidebar__wrapper__footer']}>
          <a className={styles['sidebar__wrapper__footer__profile']}>
            <div className={styles['sidebar__wrapper__footer__profile--picture']}>
              <img src='static/img/user.png' alt={usuario?.displayName} className={styles['sidebar__wrapper__footer__profile--picture__photo']}></img>
            </div>
            <div className={styles['sidebar__wrapper__footer__profile--actions']}>
              <span className={styles['sidebar__wrapper__footer__profile--actions__username']}>
                { usuario ? usuario.displayName : 'Bienvenido' }
              </span>
              {
                usuario ? (
                <button className={styles['sidebar__wrapper__footer__profile--actions__logout']}>
                  Cerrar sesi&oacute;n
                </button>
                ) : (
                  <></>
                )
              }
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar;