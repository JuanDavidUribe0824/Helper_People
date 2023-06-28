
import moment from 'moment';
import Link from 'next/link';
import { useContext } from 'react';

import { FirebaseContext } from '../../firebase';

import styles from './Dashboard.module.css';

const Dashboard = () => {

  const { usuario, firebase, } = useContext(FirebaseContext);

  const currentDate = moment().format('DD-MM-YYYY');

  return (
    <section className={styles['dashboard']}>
      <div className={styles['dashboard__container']}>
        <div className={styles['dashboard__container__header']}>
          <h1 className={styles['dashboard__container__header__title']}>
            Hola <span>{usuario?.displayName}</span>, buen día.
          </h1>
          <span className={styles['dashboard__container__header__date']}>
            <i className={`bx bxs-time`}></i>
            { currentDate }
          </span>
        </div>
        <div className={styles['dashboard__container__metrics']}>
          <div className={styles['dashboard__container__metrics--element']}>
            <i className={`bx bxs-user ${styles['dashboard__container__metrics--element__icon']}`}></i>
            <div className={styles['dashboard__container__metrics--element__content']}>
              <span className={styles['dashboard__container__metrics--element__content--label']}>
                Usuarios
              </span>
              <span className={styles['dashboard__container__metrics--element__content--counter']}>
                10
              </span>
            </div>
          </div>
          <div className={styles['dashboard__container__metrics--element']}>
            <i className={`bx bxs-user ${styles['dashboard__container__metrics--element__icon']}`}></i>
            <div className={styles['dashboard__container__metrics--element__content']}>
              <span className={styles['dashboard__container__metrics--element__content--label']}>
                Reportes
              </span>
              <span className={styles['dashboard__container__metrics--element__content--counter']}>
                25
              </span>
            </div>
          </div>
          <div className={styles['dashboard__container__metrics--element']}>
            <i className={`bx bxs-user ${styles['dashboard__container__metrics--element__icon']}`}></i>
            <div className={styles['dashboard__container__metrics--element__content']}>
              <span className={styles['dashboard__container__metrics--element__content--label']}>
                Publicaciones
              </span>
              <span className={styles['dashboard__container__metrics--element__content--counter']}>
                100
              </span>
            </div>
          </div>
        </div>
        <div className={styles['dashboard__container__list']}>
          <h2 className={`${styles['dashboard__container__list__title']} ${styles['dashboard--title']}`}>
            Lista de reportes
          </h2>
          <article className={styles['dashboard__container__list--item']}>
            <div className={styles['dashboard__container__list--item__body']}>
              <div className={styles['dashboard__container__list--item__body__image']}>
                <img src='static/img/logo.png' alt='' className={styles['dashboard__container__list--item__body__image--photo']}/>
              </div>
              <div className={styles['dashboard__container__list--item__body__content']}>
                <span className={styles['report-number']}>
                  Reporte No. 1
                </span>
                <h3 className={styles['publication-title']}>
                  T&iacute;tulo de la publicación
                </h3>
                <p className={styles['publication-description']}>
                  Descripci&oacute;n de la publicaci&oacute;n
                </p>
              </div>
              <div className={styles['dashboard__container__list--item__body__counter']}>
                <span>10</span>
              </div>
            </div>
            <div className={styles['dashboard__container__list--item__footer']}>
              <i className={`bx bxs-down-arrow ${styles['dashboard__container__list--item__footer--more']}`}></i>
              <Link href='/' className={styles['dashboard__container__list--item__footer--link']}>
                Ir a la publicaci&oacute;n
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;