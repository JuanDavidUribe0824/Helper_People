import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
    this.db = getFirestore(app);
    this.storage = getStorage(app);
    this.__adminsRef = collection(this.db, "admins");
  }

  // Registra un usuario
  async registrar(nombre, email, password, isAdmin = false) {
    const nuevoUsuario = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    // Se registra en la colección de admins dado el parámetro isAdmin
    if (isAdmin) addDoc(this.__adminsRef, { uid: nuevoUsuario.user.uid });
    return await updateProfile(nuevoUsuario.user, {
      displayName: nombre,
    });
  }

  // Inicia sesión del usuario
  async login(email, password) {
    const logged = await signInWithEmailAndPassword(this.auth, email, password);
    // Se indica si el usuario es admin o no
    const user = await getDocs(
      query(this.__adminsRef, where("uid", "==", logged.user.uid))
    );
    logged.user.isAdmin = !user.empty;
    return logged;
  }

  // Cierra la sesión del usuario
  async cerrarSesion() {
    await signOut(this.auth);
  }
}

const firebase = new Firebase();

export default firebase;
