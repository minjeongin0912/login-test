require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const axios   = require('axios');

const app = express();
app.use(cors());

// 네이버 인가 코드 → 사용자 정보
app.get('/naver-token', async (req, res) => {
  const { code, state } = req.query;
  if (!code || !state) {
    return res.status(400).json({ error: 'code 또는 state가 없습니다.' });
  }

  try {
    // 1단계: 인가 코드 → 액세스 토큰
    const tokenRes = await axios.get('https://nid.naver.com/oauth2.0/token', {
      params: {
        grant_type:    'authorization_code',
        client_id:     process.env.NAVER_CLIENT_ID,
        client_secret: process.env.NAVER_CLIENT_SECRET,
        code,
        state,
      },
    });

    const accessToken = tokenRes.data.access_token;
    if (!accessToken) {
      return res.status(400).json({ error: '액세스 토큰 발급 실패' });
    }

    // 2단계: 액세스 토큰 → 사용자 정보
    const profileRes = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: 'Bearer ' + accessToken },
    });

    const { name, email, id, profile_image } = profileRes.data.response;
    res.json({ name, email, id, profile_image });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: '네이버 로그인 처리 실패' });
  }
});

app.listen(3000, () => {
  console.log('서버 실행 중 → http://localhost:3000');
});
