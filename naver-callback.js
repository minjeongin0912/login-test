const params = new URLSearchParams(window.location.search);
const code   = params.get('code');
const state  = params.get('state');

function showError(msg) {
  document.getElementById('loadingView').style.display = 'none';
  document.getElementById('errorView').style.display   = 'flex';
  document.getElementById('errorMessage').textContent  = msg;
}

function showSuccess(name) {
  document.getElementById('loadingView').style.display = 'none';
  document.getElementById('successView').style.display = 'flex';
  document.getElementById('successName').textContent   = name + '님, 환영합니다!';
  alert(name + ' 로그인 성공');
  setTimeout(() => { window.location.href = 'index.html'; }, 1500);
}

if (!code) {
  showError('인증 코드가 없습니다. 다시 시도해주세요.');
} else {
  const isLocal    = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const SERVER_URL = isLocal ? 'http://127.0.0.1:3000' : 'https://login-ecru-chi.vercel.app';

  fetch(SERVER_URL + '/naver-token?code=' + code + '&state=' + state)
    .then(res => res.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      sessionStorage.setItem('naver_user', JSON.stringify({ name: data.name, email: data.email }));
      showSuccess(data.name);
    })
    .catch(err => {
      if (err.message === 'Failed to fetch') {
        showError('서버에 연결할 수 없습니다. 터미널에서 node server.js를 실행해주세요.');
      } else {
        showError(err.message || '로그인 처리 중 오류가 발생했습니다.');
      }
    });
}
