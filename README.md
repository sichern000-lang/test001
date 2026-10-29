# 제주 이미지 찾기

Vite + React + Supabase Auth(이메일 회원가입/로그인) + Pixabay 이미지 검색 사이트. Vercel 배포용.

## 로컬 실행

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev
```

## 환경 변수

| 이름 | 위치 |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase > Project Settings > API > Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase > Project Settings > API > anon / publishable key |
| `PIXABAY_API_KEY` | pixabay.com/api/docs 의 API key (서버 전용, `VITE_` 붙이지 않음) |

`service_role` 키는 절대 `VITE_` 변수로 넣지 마세요 (브라우저에 노출됩니다).
