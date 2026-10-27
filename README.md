# IntelliKids: Adaptive Learning Platform with Explainable Evaluation and Visual Analytics

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Angular](https://img.shields.io/badge/Angular-v16+-red.svg)](https://angular.io/)
[![Strapi](https://img.shields.io/badge/Strapi-v4-blue.svg)](https://strapi.io/)
[![FastAPI](https://img.shields.io/badge/FastAPI-v0.95+-teal.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-yellow.svg)](https://python.org/)

IntelliKids is an intelligent, full-stack educational ecosystem tailored for young learners. It integrates interactive video lectures, bite-sized STEM exploration, an adaptive quiz evaluation engine, and a real-time computer vision distraction detection system.

---

## 🌟 Key Highlights

- **Adaptive Frontend (Angular 16)**: Engaging kid-friendly UI, interactive video learning player, responsive dashboard, and real-time quiz assessments.
- **Robust Headless CMS (Strapi v4)**: REST API managing educational content, dynamic quizzes, student progress records, and authenticated user profiles.
- **AI Distraction Detector (OpenCV & Keras CNN)**: Real-time gaze and head-pose monitoring using Haar cascades and lightweight CNN models to detect distraction or screen departure during lectures.
- **Detailed Evaluation & Telemetry**: Synthesizes student focus metrics with conceptual assessment performance for teachers and parents.

---

## 🏗️ System Architecture

```text
IntelliKids/
├── frontend/             # Angular 16 web application
│   ├── src/app/          # Components (dashboard, quizzes, video player, auth)
│   └── src/assets/       # Static assets, themes, icons, questions
├── backend/              # Strapi v4 Headless CMS
│   ├── config/           # Database, security, and middleware configuration
│   └── src/api/          # Content, Quiz, Question, Progress & Quiz-Attempt APIs
├── distractionModel/     # AI / Computer Vision Attention Tracking
│   ├── cnn/              # Distraction classification model & training script
│   ├── haarcascade_files/# Haar cascades for face & eye tracking
│   ├── distraction_detector.py # OpenCV video stream processor
│   └── distraction_api.py      # FastAPI service for frame/gaze analysis
├── FYP_PROPOSAL_COMSATS.md     # Academic proposal & project documentation
└── TESTING_GUIDE.md            # Comprehensive end-to-end testing suite
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.x recommended) and **npm**
- **Python** 3.8+ with pip
- **Git**

---

### 2. Backend Setup (Strapi CMS)

```bash
cd backend
npm install
npm run build
npm run develop
```
- Strapi Admin Panel: `http://localhost:1337/admin`
- REST API endpoint: `http://localhost:1337/api`

---

### 3. Frontend Setup (Angular)

```bash
cd frontend
npm install
ng serve
```
- Web Application: `http://localhost:4200`

---

### 4. AI Distraction Model Service

```bash
cd distractionModel
pip install fastapi uvicorn opencv-python tensorflow numpy
python distraction_api.py
```
- Real-time API runs on `http://localhost:8000`

---

## 🧪 Testing & Quality Assurance

Refer to [`TESTING_GUIDE.md`](./TESTING_GUIDE.md) for detailed verification steps, mock test scenarios, and expected results across all three tiers (Frontend, Strapi API, and Distraction Detection Service).

---

## 👥 Contributors

- **Abdul Hadi** (`CIIT/FA23-BCS-133/WAH`)
- **Anis Nasir** (`CIIT/FA23-BCS-096/WAH`)
