import React, { useContext, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import firebase, { FirebaseContext } from '../firebase';

const useReports = () => {
  const [ reports, setReports ] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getReports = async () => {
      const reportsRef = collection(firebase.db, 'reports');
      const reportsQuery = query(reportsRef);

      const snapshot = await getDocs(reportsQuery);
      const reportsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReports(reportsData);

      const unsubscribe = onSnapshot(reportsQuery, (snapshot) => {
        const reportsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(reportsData);
      });

      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    };

    const unsubscribe = getReports();

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [firebase.db]);

  return {
    reports,
  };
};

export { useReports };