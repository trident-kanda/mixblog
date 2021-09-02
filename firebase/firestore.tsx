import { db } from "./util";
import firebase from "firebase/app";
const createdb = (id: string) => {
  db.collection("data")
    .doc(id)
    .set({
      id: id,
      access: 1,
    })
    .then(() => {})
    .catch((error) => {});
};

const updatedb = (id: string) => {
  db.collection("data")
    .doc(id)
    .update({
      access: firebase.firestore.FieldValue.increment(1),
    });
};

export const countdb = (id: string) => {
  db.collection("data")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        updatedb(id);
      } else {
        createdb(id);
      }
    })
    .catch((error) => {});
};

export const getPopularData = async () => {
  const data: string[] = [];
  const snapshot = await db
    .collection("data")
    .orderBy("access", "desc")
    .limit(3)
    .get();
  snapshot.forEach((doc) => {
    data.push(doc.id);
  });
  return data;
};
