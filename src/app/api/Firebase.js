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
  updateDoc,
  deleteDoc,
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

// 게시글 전체 받아오기
export const getAllFireStore = async () => {
  let result = {
    board: [],
    start: null,
    counter: 0,
  };
  const boardRef = collection(db, "Board");
  let q = query(boardRef, orderBy("date", "desc"), limit(10));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const date = new Date(+doc.data().date).toLocaleDateString("zh");
    const ip = doc.data().ip.split(".");
    result.board.push({
      id: doc.id,
      data: { ...doc.data(), date: date, ip: ip[0] + "." + ip[1], password: '' },
    });
  });
  result.start = querySnapshot.docs[querySnapshot.docs.length - 1];
  // 게시글 총 갯수
  const snapshot = await getCountFromServer(boardRef);
  result.counter = snapshot.data().count;
  return result;
};

// 게시글 추가 받아오기
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
    const ip = doc.data().ip.split(".");
    result.board.push({
      id: doc.id,
      data: { ...doc.data(), date: date, ip: ip[0] + "." + ip[1], password: '' },
    });
  });
  result.start = querySnapshot.docs[querySnapshot.docs.length - 1];
  return result;
};

// 게시글 내용 받아오기
export const getOneFireStore = async (id) => {
  const docRef = doc(db, "Board", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // 조회수 올리기
    await updateDoc(docRef, {
      view: docSnap.data().view + 1,
    });
    const date = new Date(+docSnap.data().date).toLocaleString();
    const ip = docSnap.data().ip.split(".");
    return {
      ...docSnap.data(),
      date: date,
      ip: ip[0] + "." + ip[1],
      view: docSnap.data().view + 1,
      password: ''
    };
  }
};

// 게시글의 비밀번호 맞는지 확인
export const loginPostFirebase = async (id, password) => {
  const docRef = doc(db, "Board", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().password === password
  }
}

// 좋아요 누르기
export const postAddLike = async (id, like) => {
  const docRef = doc(db, "Board", id);
  await updateDoc(docRef, {
    like: like + 1,
  });
  return like + 1
}

// 게시글 쓰기
export const postFireStore = async (data) => {
  await addDoc(collection(db, "Board"), data);
  return true;
};

// 게시글 삭제
export const postDelete = async (id) => {
  await deleteDoc(doc(db, "Board", id));
  return true
}