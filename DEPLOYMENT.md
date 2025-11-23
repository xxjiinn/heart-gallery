# 🚀 Heart Gallery 배포 가이드

## 배포 아키텍처

```
Frontend (Vercel) → Backend (Railway) → MySQL (Railway) + AWS S3
```

---

## 📋 사전 준비사항

### 1. GitHub 저장소

- ✅ 이미 완료: https://github.com/xxjiinn/heart-gallery.git

### 2. 필요한 계정

- [ ] Railway 계정 (https://railway.app)
- [ ] Vercel 계정 (https://vercel.com)
- [x] AWS 계정 (S3 설정 완료)

### 3. 준비된 정보

- AWS Access Key ID
- AWS Secret Access Key
- AWS S3 Bucket Name
- AWS Region

---

## 🛤️ 1단계: Railway 백엔드 배포

### 1.1 Railway 프로젝트 생성

1. **Railway 가입**

   - https://railway.app 접속
   - "Start a New Project" 클릭

2. **GitHub 연동**
   - "Deploy from GitHub repo" 선택
   - `xxjiinn/heart-gallery` 저장소 선택
   - **Root Directory**: `backend` 입력 ⚠️ 중요!

### 1.2 MySQL 데이터베이스 추가

1. **Railway 프로젝트 내에서**

   - "+ New" 버튼 클릭
   - "Database" → "Add MySQL" 선택

2. **연결 확인**
   - MySQL 서비스가 생성되면 `DATABASE_URL` 자동 생성됨

### 1.3 환경 변수 설정

Railway 프로젝트 → Backend 서비스 → "Variables" 탭에서 다음 변수 추가:

```bash
# Database (자동 생성되지만 확인)
DATABASE_URL=mysql://railway_user:password@host:port/railway

# AWS S3 Configuration (기존 값 입력)
AWS_ACCESS_KEY_ID=actual_access_key
AWS_SECRET_ACCESS_KEY=actual_secret_key
AWS_REGION=ap-northeast-2
AWS_S3_BUCKET=bucket_name

# CORS Configuration (나중에 Vercel URL로 업데이트
CORS_ORIGIN=https://app-name.vercel.app

# Node Environment
NODE_ENV=production
```

### 1.4 배포 확인

- Railway가 자동으로 빌드 및 배포 시작
- "Deployments" 탭에서 진행 상황 확인
- 성공하면 Railway가 URL 제공 (예: `https://backend-production-xxxx.up.railway.app`)
  (Settings > Networking > Public Networking 탭에서 확인 가능)

**⚠️ 이 URL을 메모하세요! 프론트엔드에서 사용합니다.**

---

## 🔷 2단계: Vercel 프론트엔드 배포

### 2.1 Vercel 프로젝트 생성

1. **Vercel 가입**

   - https://vercel.com 접속
   - "Add New..." → "Project" 클릭

2. **GitHub 저장소 선택**
   - `xxjiinn/heart-gallery` 선택
   - **Root Directory**: `frontend` 입력 ⚠️ 중요!

### 2.2 환경 변수 설정

Build & Development Settings에서:

```bash
# API URL (Railway에서 받은 백엔드 URL)
VITE_API_URL=https://backend-production-xxxx.up.railway.app
```

### 2.3 배포 설정 확인

- **Framework Preset**: Vite (자동 감지)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2.4 배포 실행

- "Deploy" 버튼 클릭
- 배포 완료되면 Vercel이 URL 제공 (예: `https://heart-gallery.vercel.app`)

---

## 🔄 3단계: CORS 설정 업데이트

### Vercel URL을 Railway에 추가

1. Railway → Backend 서비스 → "Variables" 탭
2. `CORS_ORIGIN` 변수 업데이트:
   ```
   CORS_ORIGIN=https://heart-gallery.vercel.app
   ```
3. Railway가 자동으로 재배포

---

## ✅ 4단계: 배포 테스트

### 4.1 기본 접속 테스트

1. Vercel URL로 접속 (예: https://heart-gallery.vercel.app)
2. 페이지가 로드되는지 확인

### 4.2 기능 테스트

1. **이미지 업로드**

   - 이미지 선택
   - 메시지 입력
   - "Save Memory" 클릭

2. **갤러리 확인**

   - 페이지2로 자동 이동
   - 업로드한 이미지와 메시지가 표시되는지 확인

3. **모바일 테스트**
   - 스마트폰에서도 동일하게 테스트

---

## 🐛 문제 해결

### Railway 배포 실패

```bash
# Railway 로그 확인
Railway Dashboard → Backend 서비스 → Deployments → 최신 배포 클릭
```

**일반적인 문제:**

- ❌ DATABASE_URL 누락: MySQL 서비스 추가 확인
- ❌ Prisma 마이그레이션 실패: `railway.json` 설정 확인
- ❌ 환경 변수 오타: Variables 탭에서 재확인

### Vercel 배포 실패

```bash
# Vercel 로그 확인
Vercel Dashboard → 프로젝트 → Deployments → 최신 배포 클릭
```

**일반적인 문제:**

- ❌ Root Directory 잘못 설정: `frontend` 확인
- ❌ VITE_API_URL 누락: Environment Variables 확인

### CORS 에러

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**해결:**

- Railway의 `CORS_ORIGIN`에 Vercel URL 정확히 입력
- 프로토콜 확인 (https://)
- 재배포 확인

### 이미지 업로드 실패

```
Failed to save memory: 500
```

**해결:**

- AWS S3 환경 변수 확인
- S3 버킷 권한 확인 (Public Access)
- Railway 로그에서 AWS 에러 확인

---

## 📊 배포 후 모니터링

### Railway

- Dashboard에서 CPU, 메모리 사용량 확인
- Logs 탭에서 실시간 로그 확인
- 무료 플랜: $5/월 크레딧 제공

### Vercel

- Analytics에서 트래픽 확인
- 무료 플랜: 무제한 배포

---

## 🔐 보안 체크리스트

- [x] `.env` 파일이 `.gitignore`에 포함됨
- [ ] AWS IAM 사용자 권한 최소화 (S3만)
- [ ] S3 버킷 CORS 설정 확인
- [ ] Railway 환경 변수에 민감 정보 저장
- [ ] Vercel 환경 변수에 민감 정보 저장

---

## 🔄 업데이트 방법

### 코드 업데이트

```bash
git add .
git commit -m "Update feature"
git push origin main
```

→ Railway와 Vercel이 자동으로 재배포

### 환경 변수 업데이트

- Railway/Vercel Dashboard에서 변수 수정
- 수동으로 "Redeploy" 클릭 (또는 자동 재배포)

---

## 📞 배포 완료 후 확인사항

- [ ] Frontend URL 작동: **\*\*\*\***\_\_\_\_**\*\*\*\***
- [ ] Backend URL 작동: **\*\*\*\***\_\_\_\_**\*\*\*\***
- [ ] 이미지 업로드 성공
- [ ] 갤러리 페이지 표시
- [ ] 모바일에서 정상 작동
- [ ] S3에 이미지 저장 확인

---

## 🎉 배포 성공!

배포가 완료되면:

1. Frontend URL을 다른 사람과 공유
2. 모바일/데스크탑 모두에서 접근 가능
3. 전 세계 어디서든 빠른 속도

**예상 배포 시간**: 15-30분
