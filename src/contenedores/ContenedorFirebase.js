import admin from "firebase-admin";
import config from "../config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  databaseURL: "https://coderhouse32065-ed079.firebaseio.com"
});

const db = admin.firestore();

class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
  }

  async getItemById(id) {
    const doc = this.coleccion.doc(`${id}`);
    const item = await doc.get();
    const response = { id: item.id, ...item.data() };
    return response;
  }

  async getAllItems() {
    const querySnapshot = await this.coleccion.get();
    let docs = querySnapshot.docs;
    const response = docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return response;
  }

  async createNewItem(nuevoElem) {
    const res = await this.coleccion.add({ ...nuevoElem });
    return this.getItemById(res.id);
  }

  async updateItem(id, nuevoElem) {
    const doc = this.coleccion.doc(`${id}`);
    const item = await doc.update({ ...nuevoElem });
    return this.getItemById(id);
  }

  async deleteItem(id) {
    const doc = this.coleccion.doc(`${id}`);
    await doc.delete();
  }

  async deleteAll() {
    const querySnapshot = await this.coleccion.get();
    querySnapshot.docs.forEach(async (snapshot) => {
      await snapshot.ref.delete();
    });
  }
}

export default ContenedorFirebase;
