# Bike Rental Web Application

Production-ready full-stack bike rental platform with customer + admin flows.

## Stack
- Frontend: React + Vite + Tailwind
- Backend: Node.js + Express + MongoDB
- Auth: Firebase Phone OTP + Backend JWT
- Payments: Razorpay

## Setup
### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Key Features
- OTP login via Firebase mobile auth
- Browse/search/filter bikes, bike details, booking creation
- User dashboard (active/history)
- Admin dashboard analytics (bookings, revenue, active rentals)
- Bike CRUD, booking moderation, user management APIs
- Razorpay order + payment verification flow
- JWT + RBAC, validation, rate limiting, secure headers
- Dark/light mode and responsive mobile-first UI

## API Overview
- `POST /api/auth/otp-login`
- `GET /api/bikes`, `GET /api/bikes/:id`
- `POST/PUT/DELETE /api/bikes/:id` (admin)
- `POST /api/bookings`, `GET /api/bookings/me`
- `GET /api/admin/bookings`, `PATCH /api/admin/bookings/:id/status`
- `POST /api/payments/order`, `POST /api/payments/verify`
- `GET /api/users/me`, `GET /api/admin/users`

## Firebase OTP Setup
1. Create Firebase project and enable **Phone Authentication**.
2. Add web app, copy config into `frontend/.env`.
3. Create service account key and place values in `backend/.env`.
4. Configure authorized domain (localhost and deployed frontend domain).

## Razorpay Setup
1. Create Razorpay account and get key id/secret.
2. Add to `backend/.env`.
3. Use frontend checkout with returned `order.id`, then call `/payments/verify`.

## Deployment
### AWS EC2 (Backend)
1. Launch Ubuntu EC2, install Node 20+, Nginx, PM2.
2. Clone repo, configure `backend/.env`.
3. Run `npm ci && pm2 start src/server.js --name bikerental-api`.
4. Configure Nginx reverse proxy to port 5000 and TLS (LetsEncrypt).

### AWS Amplify (Frontend)
1. Connect repo in Amplify.
2. Build command: `npm ci && npm run build` (frontend root).
3. Output directory: `dist`.
4. Add environment variables from `frontend/.env.example`.
5. Set `VITE_API_URL` to EC2 public API URL.
