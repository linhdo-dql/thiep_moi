import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// LƯU Ý QUAN TRỌNG:
// Bạn cần phải kích hoạt Realtime Database trong Firebase console của bạn.
// Truy cập: Build -> Realtime Database -> Create database.
// Bắt đầu ở chế độ Test Mode để dễ dàng phát triển.

// TODO: Thay thế bằng cấu hình dự án Firebase của bạn
// Hướng dẫn: https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyBJ_4lI9l-81b9PESTc-kZMFKXehMBzBUQ",
  authDomain: "thiepmoi-2ba7b.firebaseapp.com",
  // Thêm databaseURL cho Realtime Database
  databaseURL: "https://thiepmoi-2ba7b-default-rtdb.firebaseio.com",
  projectId: "thiepmoi-2ba7b",
  storageBucket: "thiepmoi-2ba7b.firebasestorage.app",
  messagingSenderId: "565926157521",
  appId: "1:565926157521:web:fa4865539f0cab2ba3f9f0",
  measurementId: "G-YXM71QVQSP"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Realtime Database và lấy tham chiếu đến dịch vụ
const db = getDatabase(app);

export { db };