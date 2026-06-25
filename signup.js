import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSN5St9K01YK-A4BL6XmytJZAhZzVUY_8",
  authDomain: "login-test-63768.firebaseapp.com",
  projectId: "login-test-63768",
  storageBucket: "login-test-63768.firebasestorage.app",
  messagingSenderId: "709350837963",
  appId: "1:709350837963:web:afdf0bf76f98f76351954e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const ERROR_MESSAGES = {
  'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
  'auth/invalid-email':        '이메일 형식이 올바르지 않습니다.',
  'auth/weak-password':        '비밀번호는 6자 이상이어야 합니다.',
};

document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name            = document.getElementById('name').value.trim();
  const email           = document.getElementById('email').value.trim();
  const password        = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('passwordConfirm').value;
  const message         = document.getElementById('message');

  if (password !== passwordConfirm) {
    message.textContent = '비밀번호가 일치하지 않습니다.';
    message.className   = 'message error';
    return;
  }

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    alert(name + '님, 회원가입이 완료되었습니다!');
    window.location.href = 'index.html';
  } catch (error) {
    message.textContent = ERROR_MESSAGES[error.code] || '회원가입에 실패했습니다.';
    message.className   = 'message error';
  }
});
