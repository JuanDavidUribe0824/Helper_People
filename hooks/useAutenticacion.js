import React, {useEffect, useState} from "react";
import {
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";

import firebase from "../firebase";

function useAutenticacion(){
    const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(async (usuario) => {
            if (usuario) {
                const adminsRef = collection(firebase.db, "admins");
                const user = await getDocs(
                    query(adminsRef, where("uid", "==", usuario.uid))
                );
                usuario.isAdmin = !user.empty;
                guardarUsuarioAutenticado(usuario);
            }
            else {
                guardarUsuarioAutenticado(null);
            }
        });
        return() => unsuscribe();
    }, []);
    
    return usuarioAutenticado;
}

export default useAutenticacion;