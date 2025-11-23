# Heart Gallery

사랑을 느낀 순간을 사진과 메시지로 저장하고 공유하는 추억 갤러리 서비스

## 📁 프로젝트 구조

```
HeartGallery/
├── backend/          # NestJS 백엔드
├── frontend/         # React + Vite 프론트엔드
└── frontend_raw/     # 원본 프론트엔드 파일
```

## 🛠 기술 스택

### Backend

- NestJS
- Prisma ORM
- MySQL
- AWS S3
- TypeScript

### Frontend

- React 19
- TypeScript
- Vite
- TailwindCSS
- Framer Motion

## 🚀 시작하기

### 1. 환경 변수 설정

#### Backend

`backend/.env` 파일을 생성하고 `.env.example`을 참고하여 설정:

```bash
cd backend
cp .env.example .env
# .env 파일을 편집하여 실제 값 입력
```

#### Frontend

`frontend/.env` 파일을 생성하고 백엔드 API URL 설정:

```bash
cd frontend
echo "VITE_API_URL=http://localhost:3000" > .env
```

### 2. 의존성 설치

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. 데이터베이스 설정

```bash
cd backend
npx prisma migrate dev
```

### 4. 실행

```bash
# Backend (터미널 1)
cd backend
npm run start:dev

# Frontend (터미널 2)
cd frontend
npm run dev
```

## 📝 주요 기능

- ✅ 이미지 업로드 (하트 모양)
- ✅ 메시지 입력 (최대 30자)
- ✅ S3 스토리지 저장
- ✅ 갤러리 뷰 (이미지↔메시지 자동 전환)
- ✅ 반응형 디자인

## 🔒 보안

- 민감한 정보는 `.env` 파일에 저장
- `.gitignore`에 의해 환경 변수 파일 제외
- AWS 자격 증명은 반드시 안전하게 관리

## 📦 배포

배포 시 각 환경의 `.env` 파일에 프로덕션 환경 변수를 설정해야 합니다.

## 📄 라이센스

Private
