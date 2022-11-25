import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  orderBy,
  limit,
  query,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTU_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export const getAllFireStore = async () => {
  let result = {
    board: [],
    start: null,
    counter: 0
  };
  const boardRef = collection(db, "Board");
  let q = query(boardRef, orderBy("date", "desc"), limit(10));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const date = new Date(+doc.data().date).toLocaleDateString("zh");
    result.board.push({
      id: doc.id,
      data: { ...doc.data(), date: date },
    });
  });
  result.start = querySnapshot.docs[querySnapshot.docs.length - 1];
  const snapshot = await getCountFromServer(boardRef);
  result.counter = snapshot.data().count
  return result;
};

export const getAddAllFireStore = async (start, size) => {
  let result = {
    board: [],
    start: null,
  };
  const boardRef = collection(db, "Board");
  let q = query(
    boardRef,
    orderBy("date", "desc"),
    limit(size),
    startAfter(start)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const date = new Date(+doc.data().date).toLocaleDateString("zh");
    result.board.push({
      id: doc.id,
      data: { ...doc.data(), date: date },
    });
  });
  result.start = querySnapshot.docs[querySnapshot.docs.length - 1];
  return result;
};

export const getOneFireStore = async (id) => {
  const docRef = doc(db, "Board", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
};

export const postFireStore = async (data) => {
  await addDoc(collection(db, "Board"), data);
  return true;
};
