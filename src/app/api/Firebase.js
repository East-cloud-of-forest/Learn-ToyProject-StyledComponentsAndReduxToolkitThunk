import { initializeApp } from 'firebase/app'
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
  setDoc,
  increment,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTU_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
const db = getFirestore(app)

// 게시글 전체 받아오기
export const getAllFireStore = async () => {
  let result = {
    board: [],
    start: null,
    counter: 0,
  }
  const boardRef = collection(db, 'Board')
  let q = query(boardRef, orderBy('date', 'desc'), limit(10))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(async (doc) => {
    const date = new Date(+doc.data().date).toLocaleDateString('zh')
    const ip = doc.data().ip.split('.')
    result.board.push({
      id: doc.id,
      data: {
        ...doc.data(),
        date: date,
        ip: ip[0] + '.' + ip[1],
        password: '',
      },
    })
  })
  // 덧글 수 받아오기
  for (const boardIndex in result.board) {
    const comment = await getCommentCounterFirestore(
      result.board[boardIndex].id,
    )
    result.board[boardIndex].data = {
      ...result.board[boardIndex].data,
      comment,
    }
  }
  // 페이지네이션
  result.start = querySnapshot.docs[querySnapshot.docs.length - 1]
  // 게시글 총 갯수
  const snapshot = await getCountFromServer(boardRef)
  result.counter = snapshot.data().count
  return result
}

// 게시글 추가 받아오기
export const getAddAllFireStore = async (start, size) => {
  let result = {
    board: [],
    start: null,
  }
  const boardRef = collection(db, 'Board')
  let q = query(
    boardRef,
    orderBy('date', 'desc'),
    limit(size),
    startAfter(start),
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const date = new Date(+doc.data().date).toLocaleDateString('zh')
    const ip = doc.data().ip.split('.')
    result.board.push({
      id: doc.id,
      data: {
        ...doc.data(),
        date: date,
        ip: ip[0] + '.' + ip[1],
        password: '',
      },
    })
  })
  // 덧글 수 받아오기
  for (const boardIndex in result.board) {
    const comment = await getCommentCounterFirestore(
      result.board[boardIndex].id,
    )
    result.board[boardIndex].data = {
      ...result.board[boardIndex].data,
      comment,
    }
  }
  // 페이지네이션
  result.start = querySnapshot.docs[querySnapshot.docs.length - 1]
  return result
}

// 게시글 내용 및 덧글 받아오기
export const getOneFireStore = async (id) => {
  let ip
  const docRef = doc(db, 'Board', id)
  const fetch = [
    [getDoc, docRef],
    [getCommentFireStore, id],
  ]
  const requests = fetch.map((x) => x[0](x[1]))
  const [docSnap, comments] = await Promise.all(requests)

  // 조회수 올리기
  if (docSnap.exists()) {
    updateDoc(docRef, {
      view: increment(1),
    })
    ip = docSnap.data().ip.split('.')
  }

  return {
    ...docSnap.data(),
    ip: ip[0] + '.' + ip[1],
    view: docSnap.data().view + 1,
    password: '',
    comments,
  }
}

// 게시글의 비밀번호 맞는지 확인
export const loginPostFirebase = async (id, password) => {
  const docRef = doc(db, 'Board', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data().password === password
  }
}

// 좋아요 누르기
export const postAddLike = async (id, like) => {
  const docRef = doc(db, 'Board', id)
  await updateDoc(docRef, {
    like: like + 1,
  })
  return like + 1
}

// 게시글 쓰기
export const postFireStore = async (data) => {
  await addDoc(collection(db, 'Board'), data)
  return true
}

// 게시글 수정
export const editFireStore = async (data, id) => {
  await setDoc(doc(db, 'Board', id), data)
  return true
}

// 게시글 삭제
export const postDelete = async (id) => {
  const commentsSnap = await getDocs(collection(db, 'Board', id + '/comment'))
  commentsSnap.forEach((comment) => {
    deleteDoc(doc(db, `Board/${id}/comment`, comment.id))
  })
  await deleteDoc(doc(db, 'Board', id))
  return true
}

// 덧글 쓰기
export const postCommentFireStore = async (data, id) => {
  await addDoc(collection(db, 'Board', id + '/comment'), data)
  const comments = await getCommentFireStore(id)
  return comments
}

// 덧글 삭제
export const commentDelete = async (id, commentId, password) => {
  const docRef = doc(db, `Board/${id}/comment`, commentId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    if (docSnap.data().password === password) {
      await deleteDoc(docRef)
      const comments = await getCommentFireStore(id)
      return comments
    } else {
      throw new Error()
    }
  }
}

// 덧글 읽기
const getCommentFireStore = async (id) => {
  let comments = []
  let ip
  const q = query(
    collection(db, 'Board', id + '/comment'),
    orderBy('date', 'asc'),
  )
  const commentsSnap = await getDocs(q)
  commentsSnap.forEach((doc) => {
    ip = doc.data().ip.split('.')
    comments.push({
      ...doc.data(),
      id: doc.id,
      ip: ip[0] + '.' + ip[1],
    })
  })
  return comments
}

const getCommentCounterFirestore = async (id) => {
  const commentsSnapshot = await getCountFromServer(
    collection(db, 'Board', id + '/comment'),
  )
  const comments = commentsSnapshot.data().count
  return comments
}
