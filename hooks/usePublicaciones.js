import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';

const usePublicaciones = (orden) => {
  const [publicaciones, guardarPublicaciones] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerPublicaciones = async () => {
      const publicacionesRef = collection(firebase.db, 'publicaciones');
      const publicacionesQuery = query(publicacionesRef, orderBy(orden, 'desc'));

      const snapshot = await getDocs(publicacionesQuery);
      const publicacionesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      guardarPublicaciones(publicacionesData);

      const unsubscribe = onSnapshot(publicacionesQuery, (snapshot) => {
        const publicacionesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        guardarPublicaciones(publicacionesData);
      });

      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    };

    const unsubscribe = obtenerPublicaciones();

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [firebase.db, orden]);

  return {
    publicaciones,
  };
};

export default usePublicaciones;
