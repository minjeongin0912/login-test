import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

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

const loginView = document.getElementById('loginView');
const userView  = document.getElementById('userView');

// 로그인 상태 감지 → 화면 전환 (Firebase + 네이버 세션 모두 체크)
onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    document.getElementById('userName').textContent  = firebaseUser.displayName || '';
    document.getElementById('userEmail').textContent = firebaseUser.email || '';
    loginView.style.display = 'none';
    userView.style.display  = 'block';
    return;
  }

  const naverUser = JSON.parse(sessionStorage.getItem('naver_user') || 'null');
  if (naverUser) {
    document.getElementById('userName').textContent  = naverUser.name  || '';
    document.getElementById('userEmail').textContent = naverUser.email || '';
    loginView.style.display = 'none';
    userView.style.display  = 'block';
  } else {
    loginView.style.display = 'block';
    userView.style.display  = 'none';
  }
});

// 이메일/비밀번호 로그인
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const message  = document.getElementById('message');

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const name = user.displayName || user.email;
    alert(name + ' 로그인 성공');
  } catch (error) {
    message.textContent = '이메일 또는 비밀번호가 올바르지 않습니다.';
    message.className   = 'message error';
  }
});

// 구글 로그인
document.querySelector('.social-btn.google').addEventListener('click', async function () {
  try {
    const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
    const name = user.displayName || user.email;
    alert(name + ' 로그인 성공');
  } catch (error) {
    alert('Google 로그인에 실패했습니다.');
  }
});

// 로그아웃
document.getElementById('logoutBtn').addEventListener('click', async function () {
  sessionStorage.removeItem('naver_user');
  await signOut(auth);
});

// 네이버 로그인
const NAVER_CLIENT_ID    = 'b8CgWlvizKTVTuaTiDXY';
const NAVER_CALLBACK_URL = encodeURIComponent('http://127.0.0.1:5500/naver-callback.html');

document.querySelector('.social-btn.naver').addEventListener('click', function () {
  const state = Math.random().toString(36).slice(2);
  sessionStorage.setItem('naver_state', state);
  window.location.href =
    'https://nid.naver.com/oauth2.0/authorize' +
    '?response_type=code' +
    '&client_id=' + NAVER_CLIENT_ID +
    '&redirect_uri=' + NAVER_CALLBACK_URL +
    '&state=' + state;
});

document.querySelector('.social-btn.github').addEventListener('click', function () {
  alert('GitHub 로그인은 아직 연동되지 않았습니다.');
});
