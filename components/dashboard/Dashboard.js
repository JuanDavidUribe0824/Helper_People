import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { useContext, } from 'react';

import { FirebaseContext } from '../../firebase';
import { useReports } from '../../hooks/useReports';

import styles from './Dashboard.module.css';
import usePublicaciones from '../../hooks/usePublicaciones';

const Dashboard = () => {

  const { reports, } = useReports();
  const { publicaciones, } = usePublicaciones('creado');
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
            {currentDate}
          </span>
        </div>
        <div className={styles['dashboard__container__metrics']}>
          <div className={styles['dashboard__container__metrics--element']}>
            <i className={`bx bxs-user ${styles['dashboard__container__metrics--element__icon']}`}></i>
            <div className={styles['dashboard__container__metrics--element__content']}>
              <span className={styles['dashboard__container__metrics--element__content--label']}>
                Reportes
              </span>
              <span className={styles['dashboard__container__metrics--element__content--counter']}>
                { reports?.length }
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
                { publicaciones.length }
              </span>
            </div>
          </div>
        </div>
        <div className={styles['dashboard__container__list']}>
          <h2 className={`${styles['dashboard__container__list__title']} ${styles['dashboard--title']}`}>
            Lista de reportes
          </h2>
          {
            (reports || []).map((report, index) => {
              return (
                <article className={styles['dashboard__container__list--item']}>
                  <div className={styles['dashboard__container__list--item__body']}>
                    <div className={styles['dashboard__container__list--item__body__image']}>
                      <img src={publicaciones.find(p => p.id === report.publicationId).urlimagen} alt={publicaciones.find(p => p.id === report.publicationId).empresa} className={styles['dashboard__container__list--item__body__image--photo']} />
                    </div>
                    <div className={styles['dashboard__container__list--item__body__content']}>
                      <span className={styles['report-number']}>
                        Reporte No. {index + 1}
                      </span>
                      <h3 className={styles['publication-title']}>
                        { publicaciones.find(p => p.id === report.publicationId).nombre }
                      </h3>
                      <h4 className={styles['publication-company']}>
                        { publicaciones.find(p => p.id === report.publicationId).empresa }
                      </h4>
                      <p className={styles['publication-description']}>
                        { publicaciones.find(p => p.id === report.publicationId).descripcion }
                      </p>
                    </div>
                    <div className={styles['dashboard__container__list--item__body__counter']}>
                      <span>{ report?.reasons?.length }</span>
                    </div>
                  </div>
                  <div className={styles['dashboard__container__list--item__footer']}>
                    <div className={styles['dashboard__container__list--item__footer--more']}>
                      <i className={`bx bxs-user ${styles['dashboard__container__list--item__footer--more__icon']}`}></i>
                      <span className={styles['dashboard__container__list--item__footer--more__icon']}>
                        { publicaciones.find(p => p.id === report.publicationId).creador.nombre }
                      </span>
                    </div>
                    <Link href={report.publicationUrl} className={styles['dashboard__container__list--item__footer--link']}>
                      Ir a la publicaci&oacute;n
                    </Link>
                  </div>
                </article>
              );
            })
          }
          {
            !reports || reports.length < 1 ? (
              <span>No hay reportes</span>
            ) : (
              <></>
            )
          }
        </div>
      </div>
    </section>
  );
}

export default Dashboard;