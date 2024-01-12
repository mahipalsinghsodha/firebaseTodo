import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvBoztZROMVHpY16HHK9nWx9ncbcbD9As",
  authDomain: "todo-8e209.firebaseapp.com",
  projectId: "todo-8e209",
  storageBucket: "todo-8e209.appspot.com",
  messagingSenderId: "913744396041",
  appId: "1:913744396041:web:5d6e447d8cc2d99a511dd8",
  measurementId: "G-GVQ3G2P4F9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const fetchTodos = async () => {
  const todosRef = collection(db, "todos");
  const snapshot = await getDocs(todosRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    task: doc.data().task,
    timestamp: doc.data().timestamp?.toDate(),
  }));
};

export const addTodo = async (data) => {
  const todosRef = collection(db, "todos");
  await addDoc(todosRef, data);
};

export const deleteTodo = async (id) => {
  const todoRef = doc(db, "todos", id);
  await deleteDoc(todoRef);
};

export const updateTodo = async (id, data) => {
  const todoRef = doc(db, "todos", id);
  await updateDoc(todoRef, data);
};
