import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Thay thế bằng cấu hình dự án Firebase của bạn
// Hướng dẫn: https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyBJ_4lI9l-81b9PESTc-kZMFKXehMBzBUQ",
  authDomain: "thiepmoi-2ba7b.firebaseapp.com",
  projectId: "thiepmoi-2ba7b",
  storageBucket: "thiepmoi-2ba7b.firebasestorage.app",
  messagingSenderId: "565926157521",
  appId: "1:565926157521:web:fa4865539f0cab2ba3f9f0",
  measurementId: "G-YXM71QVQSP"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Cloud Firestore và lấy tham chiếu đến dịch vụ
const db = getFirestore(app);

export { db };
