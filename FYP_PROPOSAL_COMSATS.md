# COMSATS FYP Proposal Submission (Online Portal Inputs)
### Form Code: FYP/CUI/CS-WAH/015

> [!IMPORTANT]
> All word counts below have been strictly calculated and verified against the COMSATS Wah portal limits. Section (b) is calibrated to **491 words** (fulfilling the 480–500 words requirement without exceeding the limit).

---

### Field 1: Project Title
*(Constraint: Strict word limit, 10 words / 150 chars max)*
```text
IntelliKids: Adaptive Learning Platform with Explainable Evaluation and Visual Analytics
```
*(Exact count: 10 words, 88 characters — Will NOT show "Limit exceeded")*

---

### Field 2: Which real world problem shall be solved by this FYP?
*(Constraint: 150 words limit)*
```text
Subjective Assessment and Engagement Deficit: Foundational primary education demands conceptual explanations through short written or spoken answers, yet existing digital platforms either restrict assessments to rote multiple-choice questions or rely on uninterpretable black-box models lacking transparent partial credit.

Passive Video Learning and Integrity Gaps: During digital lectures, young students frequently succumb to visual distractions, abandon screens, or switch browser tabs to external media. Existing learning systems cannot audit real-time student attention or track tab departures during video instruction.

Disconnected Insights and Fragmented Discovery: Current systems lack bite-sized, safe STEM exploration (such as educational short-form feeds) and fail to synthesize lecture focus telemetry with quiz performance. Consequently, educators and parents receive disjointed scorecards rather than actionable, unified diagnostic reports that pinpoint when and why a child lost comprehension.
```
*(Exact count: 127 words — leaves safe buffer under 150-word limit)*

---

### Field 3: Is it an industrial project?
- **No**

---

### Field 4: Detail of Project Members
1. `CIIT/FA23-BCS-096/WAH` — **ANIS NASIR**
2. `CIIT/FA23-BCS-133/WAH` — **ABDUL HADI**

**Supervised By:**
`Dr. Nadir Shah`

---

### Field 5: Project Description

#### (a) What is the overall working/summary of this FYP?
*(Constraint: 250 words limit — High-impact NLP, Vision & Resource integration)*
```text
IntelliKids is an intelligent tutoring platform engineered to revolutionize autonomous digital primary education. The platform unites structured classroom instruction with engaging, bite-sized discovery and continuous behavioral awareness. Teachers curate grade-aligned learning resources, including educational lecture videos and interactive blogs, complemented by a dedicated, kid-safe STEM reels section delivering short-form educational videos inspired by TikTok. As students engage with video lectures, an integrated dual-signal focus auditing system actively monitors attention: a lightweight Computer Vision pipeline utilizes OpenCV Haar Cascades and a Convolutional Neural Network (CNN) to evaluate eye gaze and face pose at one Hertz without saving private video, while an automated tab-change auditor tracks browser visibility and off-task navigation. Immediately following or during lectures, comprehension is evaluated through integrated checkpoint quizzes. For subjective answers, an explainable Natural Language Processing (NLP) pipeline transcribes oral input via OpenAI Whisper, maps responses into dense semantic vectors using Sentence-Transformers, and applies symbolic rubric keypoint matching to award transparent partial credit with child-friendly justifications. A dynamic recommendation engine algorithmically synthesizes lecture attention telemetry, tab-switch frequency, and quiz accuracy to personalize learning pathways. Finally, the platform generates granular parent and teacher diagnostic dashboards, translating lecture distraction timelines, tab audit logs, and conceptual mastery trajectories into actionable developmental reports with bilingual English and Urdu accessibility.
```
*(Exact count: 208 words — leaves ~42 words buffer under the 250-word limit)*

---

#### (b) Write name and detail of each module in your FYP.
*(Constraint: 500 words limit — Target: 480–500 words)*
```text
(i) Teacher Learning Resources and Student Streaming Module (Angular 16, Bootstrap 5, HTML5 Video): A responsive web interface enabling educators to upload and organize curriculum-mapped lecture videos, reading materials, and educational blogs. For students, it provides an interactive video classroom and an engaging STEM Reels feed featuring bite-sized vertical educational videos inspired by TikTok. It embeds client-side webcam frame capture sampling at one Hertz during video playback and incorporates an automated tab-switch monitor leveraging the Page Visibility API to log window blurring and off-task browser navigation without recording private streams. Child-friendly video controls and instant checkpoint prompts reinforce self-paced comprehension throughout each session.

(ii) Headless CMS and Resource Management Module (Strapi v4 and Node.js): A centralized backend coordinating relational data schemas, JWT authentication, and secure RESTful endpoints. It manages grade-segregated lecture video repositories, educational articles, STEM reels metadata, and relational question banks. The module securely records historical student telemetry, persisting lecture completion times, checkpoint quiz submissions, tab-switch incident counts, duration spent away from active tabs, and continuous attention percentages to establish a comprehensive data layer for pedagogical analytics. Granular role-based access controls maintain strict boundaries between teacher content authoring and student learning activities.

(iii) Visual Attention and Focus Auditing Module (Python 3, Flask, OpenCV, tf-keras): An artificial intelligence microservice dedicated to real-time student engagement tracking during both video lectures and quizzes. Utilizing OpenCV Haar Cascade classifiers, it extracts facial bounding boxes and isolates eye regions. A custom Convolutional Neural Network classifies normalized 64x64 grayscale patches into focused and distracted states. The service computes aggregate session metrics including visual distraction duration, head-pose deviations, eye-closure rates, and off-screen glances, producing an objective attention profile per learning activity.

(iv) Explainable Short-Answer Evaluation Module (Sentence-Transformers and Whisper): An automated natural language processing pipeline evaluating conceptual short answers linked to lecture topics without relying on opaque black-box models. Spoken responses are transcribed using OpenAI Whisper, while written inputs are mapped into dense semantic vectors via Sentence-Transformers. By calculating cosine similarity against instructor benchmarks and applying rule-based keypoint rubric extraction, the module awards transparent partial credit, identifies omitted concepts, and generates constructive feedback explaining exact grading rationales.

(v) Multi-Signal Adaptive Recommendation Engine: A personalized sequencing subsystem that algorithmically formulates remedial or advanced pathways for each learner. The engine dynamically correlates conceptual quiz comprehension with visual attention and tab-audit telemetry gathered during prerequisite lectures. When a student demonstrates low quiz scores accompanied by elevated lecture distraction or repeated tab switches, it assigns interactive concept recaps. If high lecture focus yields low test scores, it directs learners toward alternative explanatory lessons.

(vi) Multi-Stakeholder Diagnostic Analytics and Reporting Module: A comprehensive visualization portal for parents and teachers. It translates granular session logs into actionable diagnostic reports, featuring lecture focus timelines, distraction heatmaps, tab-switch violation logs, and conceptual growth curves. It correlates lecture attentiveness directly with quiz mastery, generates automated exportable PDF report cards, and provides bilingual English and Urdu interfaces to keep parents actively engaged in their child's academic development.
```
*(Exact count: 491 words — exactly meets the >=480 words requirement without exceeding 500 words)*

---

#### (c) Member-wise Module Information

**1: Which module shall be developed by ANIS NASIR (CIIT/FA23-BCS-096/WAH)?**
*(Constraint: Min 25 words, Max 150 words)*
```text
Anis Nasir will develop the Core Web Architecture, Resource CMS, and Explainable NLP Evaluation Pipeline. He will engineer the Strapi v4 backend on Node.js with relational data schemas, implementing JWT authentication, grade-segregated course repositories, educational blog storage, and STEM reels metadata. On the frontend, he will build the Angular 16 single-page application, developing the teacher resource upload portal, multimedia lecture streaming player, and vertical STEM reels feed. For subjective assessment, he will implement the explainable NLP pipeline integrating OpenAI Whisper for speech-to-text transcription and local Sentence-Transformers for semantic vector matching. He will develop cosine similarity algorithms and rubric keypoint extractors to award transparent partial credit and provide explanatory feedback. Finally, he will implement bilingual Urdu localization and automated PDF report generation.
```
*(Exact count: 121 words)*

**2: Which module shall be developed by ABDUL HADI (CIIT/FA23-BCS-133/WAH)?**
*(Constraint: Min 25 words, Max 150 words)*
```text
Abdul Hadi will develop the AI-Powered Visual Attention Subsystem, Tab-Switch Proctoring Engine, and Multi-Signal Adaptive Recommender. He will engineer the computer vision pipeline using Python, Flask, and OpenCV, implementing Haar Cascade classifiers for facial and eye-region localization from one Hertz webcam frame streams during lectures and quizzes. He will train, optimize, and deploy the Convolutional Neural Network (tf-keras) operating on normalized 64x64 grayscale patches to classify momentary focus and distraction. Additionally, he will develop the browser tab-switch auditor utilizing the Page Visibility API to log window blurring and off-task intervals. He will architect the adaptive engine synthesizing quiz accuracy, lecture focus ratios, and tab telemetry to dynamically personalize learning paths. Finally, he will build interactive Angular dashboards featuring focus heatmaps and distraction timelines for parents and educators.
```
*(Exact count: 127 words)*

---

### Field 6: Were similar FYPs already developed on the same topic in your department?
- Select: **No**

*(If section d-2 is required on your form:)*
**(d-2) Mention below the three (3) new, but main, functionalities you are adding to this FYP (600 characters limit):**
```text
1. Multi-Modal Lecture Focus & Tab Audit: Extends OpenCV Haar Cascades and CNN eye-gaze tracking to video lectures, fusing visual attention with Page Visibility API tab-switch audits.
2. Explainable Subjective Evaluation & Checkpoints: Couples lecture checkpoint quizzes with Sentence-Transformers and rubric extractors for transparent partial credit without LLMs.
3. STEM Reels & Diagnostic Analytics: Introduces an educator-curated short-form STEM feed alongside parent/teacher dashboards that correlate lecture attentiveness with academic mastery.
```
*(Exact count: 550 characters — strictly within 600 characters limit)*

---

### Field 7: Form Dropdowns & Checkboxes Checklist
- **Choose Domain:** Select `Artificial Intelligence`
- **Choose Stream:** Check `Web Application`
- **Choose Tools:**
  - ☑ `Node.js (Backend JavaScript Framework)`
  - ☑ `Angular.js (Frontend JavaScript Framework)`
  - ☑ `JSON (JavaScript Object Notation, File and Data Interchange Format)`
  - ☑ `Flask (Python Based Micro Web Framework)`
  - ☑ `Visual Studio Code (IDE)` and/or `Pycharm (Python IDE)`
- **Choose DBMS:**
  - ☑ `SQLite` (or `MySQL` / `PostgreSQL`)
- **Choose Platforms:**
  - ☑ `Windows`
  - ☑ `Linux`
- **Choose Hardwares:**
  - *(Leave unchecked — standard client camera/microphone used)*

---

# COMSATS UNIVERSITY ISLAMABAD
### Department of Computer Science
**Final Year Project (CS-400) Proposal Draft**

---

| Field | Details |
| :--- | :--- |
| **Project Title** | **IntelliKids:** AI-Powered Adaptive Learning Platform with Explainable Short-Answer Evaluation, Visual Attention Proctoring, and Interactive STEM Media |
| **Domain / Area** | Artificial Intelligence, Computer Vision, Natural Language Processing, Web Engineering |
| **Target Users** | Primary School Children (Grades 1–5), Parents, and Teachers |
| **Institution** | COMSATS University Islamabad (CUI) |
| **Academic Session** | 2026–2027 |

---

## 1. Introduction & Background

Digital e-learning platforms have become essential supplementary learning channels globally. While benchmarks like Khan Academy provide structured video lessons and multiple-choice questions (MCQs), modern primary education demands three vital pedagogical capabilities:
1. **Explainable Conceptual Assessment:** Evaluating a student’s understanding through open-ended written or spoken short answers (e.g., *"Why do birds fly south for winter?"*), moving beyond rote guessing.
2. **Continuous Focus & Integrity Auditing:** Maintaining observation during video lectures to detect when a child drifts away, becomes visually distracted, or navigates away from the lesson tab.
3. **Engaging, Bite-Sized STEM Discovery:** Capturing young learners' curiosity through short-form educational content (inspired by TikTok's STEM feed) and interactive blogs within a strictly curated, safe ecosystem.

In autonomous, self-paced learning environments, these elements are traditionally missing. Standard platforms permit unmonitored video playback, lack real-time distraction auditing, omit short-form educational discovery, and report only basic completion timestamps. **IntelliKids** transforms autonomous learning by combining teacher-curated lecture resources, computer vision distraction tracking, browser tab-change auditing, explainable NLP grading, kid-safe STEM reels, and multi-stakeholder parent/teacher diagnostic analytics.

---

## 2. Problem Statement

Existing digital learning platforms suffer from four fundamental deficiencies:
* **Subjective Assessment Bottleneck:** Foundational primary learning requires conceptual short-answer explanations. Current solutions either avoid subjective grading altogether or rely on third-party black-box LLMs whose scoring cannot be audited or awarded transparent partial credit.
* **Passive Video Learning & Distraction Deficit:** During video lectures, young learners frequently lose visual focus, stare away from the screen, or leave their workspace entirely. Conventional video players log 100% completion merely because a video played in the background.
* **Browser Tab-Switching Integrity Gaps:** Students routinely minimize study tabs or browse social entertainment during instructional videos. Existing learning management systems lack automated mechanisms to detect window blurring or tab switches.
* **Fragmented Discovery & Disconnected Reporting:** Children increasingly consume unmoderated short-form video on external apps without pedagogical structure. Concurrently, parents and teachers receive isolated scorecards that fail to correlate lecture engagement with test performance.

---

## 3. Benchmark Analysis (Industry Benchmark vs. IntelliKids)

| Evaluation Dimension | Traditional Benchmark (Khan Academy) | Social Media / Streaming (TikTok STEM / YouTube Kids) | Proposed System (IntelliKids) |
| :--- | :--- | :--- | :--- |
| **Curriculum Delivery** | Static video player and article text. | Uncurated, addictive algorithmic video feed. | **Structured Lecture Hub + Curated 9:16 STEM Reels & Blogs.** |
| **Teacher Resource Authoring** | Centralized, restricted platform content. | Open public upload without grade tagging. | **Teacher Resource Manager with grade, subject, and checkpoint quiz linking.** |
| **Lecture Attention Tracking** | None. Only tracks play/pause and timestamp. | None. Tracks watch-time for advertising metrics. | **Computer Vision Eye/Face Attention Model (OpenCV + CNN at 1 Hz).** |
| **Browser Tab-Switch Audit** | None. Videos run silently in hidden tabs. | None. | **HTML5 Page Visibility API logs tab departures and pauses video.** |
| **Question Types & Grading** | Multiple-Choice & deterministic numeric inputs. | No formal assessment. | **Explainable Hybrid NLP (Sentence-Transformers + Whisper + Rubric Matcher).** |
| **Adaptive Learning Loop** | Score-based skill trees. | Engagement-only recommender. | **Multi-Signal Adaptation: Fuses lecture focus, tab switches, and quiz mastery.** |
| **Stakeholder Diagnostics** | High-level percentages and gradebooks. | Basic screen time analytics. | **Granular Diagnostic Reports: Lecture attention heatmaps, tab logs, and PDF summaries.** |
| **Regional Language Access** | English-centric. | Generic auto-captions. | **Bilingual English and Urdu localization.** |

---

## 4. Project Objectives

1. **Develop a Multi-Tier Learning & Resource Management Portal:** Engineer a responsive Angular 16 application allowing teachers to upload lecture videos, curate educational blogs, and organize resources by grade and subject.
2. **Implement Real-Time Lecture Attention Tracking:** Deploy an edge-friendly Computer Vision pipeline using OpenCV Haar Cascades and a CNN to detect facial orientation and eye gaze at 1 Hz during video lectures.
3. **Engineer a Browser Tab-Switch Integrity Auditor:** Implement the HTML5 Page Visibility API to detect, log, and alert on browser window switches, tab changes, and off-task intervals during learning sessions.
4. **Design an Explainable NLP Subjective Evaluation Pipeline:** Transcribe oral student responses using OpenAI Whisper and assess written/spoken answers via Sentence-Transformers and rubric keypoint extractors for transparent partial credit.
5. **Create a Safe, Educational STEM Reels Section:** Build a vertical, bite-sized short-form video feed (TikTok style) curated exclusively for kids' science, technology, engineering, and mathematics exploration.
6. **Deploy a Multi-Stakeholder Diagnostic Dashboard:** Provide parents and educators with synchronized reports correlating lecture focus, tab departures, and quiz scores into actionable developmental trajectories.

---

## 5. System Architecture & Methodology

```
+---------------------------------------------------------------------------------------------------+
|                                     STUDENT CLIENT (ANGULAR 16 SPA)                               |
|  [ Lecture Video Player ]      [ 9:16 STEM Reels Feed ]      [ Educational Blog Reader ]          |
|  [ 1 Hz Webcam Frame Grabber ] [ Tab Visibility Monitor ]    [ Voice/Text Quiz Assessment UI ]    |
+---------------------------------------+----------------------------------+------------------------+
                                        | HTTP / REST                      | HTTP / Multipart (1 Hz)
                                        v                                  v
+----------------------------------------------------+   +------------------------------------------+
|                 STRAPI CMS BACKEND                 |   |      PYTHON COMPUTER VISION ENGINE       |
|  - Headless RESTful API & Relational DB            |   |  - OpenCV Haar Cascade Face/Eye Locators |
|  - Role-Based Auth (JWT) & Teacher Resource Mgmt   |   |  - Normalized 64x64 Eye-Patch CNN Model  |
|  - Lecture & STEM Reel Metadata Store              |   |  - Real-Time Attention Classifier        |
|  - Session Telemetry (Focus %, Tab Switch Logs)    |   |  - Distraction Duration Aggregator       |
|  - Relational Question Bank & Attempt History      |   +------------------------------------------+
+-------------------------+--------------------------+
                          |
                          v
+---------------------------------------------------------------------------------------------------+
|                                EXPLAINABLE AI EVALUATION SUBSYSTEM                                |
|  1. Audio Stream Transcription: OpenAI Whisper acoustic models convert speech to text.            |
|  2. Semantic Embedding: Sentence-Transformers map student responses to dense vector embeddings.   |
|  3. Concept Rubric Verification: Rule-based symbolic NLP checks presence of essential concepts.   |
|  4. Transparent Scoring: Computes cosine similarity and assigns auditable partial credit.          |
+---------------------------------------------------------------------------------------------------+
                          |
                          v
+---------------------------------------------------------------------------------------------------+
|                             DIAGNOSTIC ANALYTICS & ADAPTIVE ENGINE                                |
|  - Correlates Lecture Distraction Timestamps with Failed Quiz Concepts                            |
|  - Dynamic Route: Assigns Video Recaps for Distracted Students or Deep Concepts for Focused Ones  |
|  - Stakeholder Dashboards: Parent & Teacher Progress Heatmaps, Tab Audit Logs, and PDF Exports    |
+---------------------------------------------------------------------------------------------------+
```

### Module Breakdown:
1. **Frontend Presentation Tier (Angular 16 & Bootstrap 5):** Handles lecture streaming, interactive blog rendering, vertical STEM reels, client-side webcam frame capture (1 Hz), microphone recording, and tab visibility monitoring.
2. **CMS & Business Logic Tier (Strapi v4 & Node.js):** Manages grade-specific lecture repositories, question banks, STEM reels, student progress, tab-switch audit logs, and focus telemetry over a relational database.
3. **Computer Vision Attention Subsystem (Python 3, Flask, OpenCV, tf-keras):** Processes eye patches and facial bounds to classify focused vs. distracted states during lectures and quizzes, logging session-level attention ratios.
4. **Browser Tab-Switch & Focus Auditor:** Leverages the Page Visibility API to record tab departure counts and total inactive durations, automatically pausing lecture playback when students navigate away.
5. **Explainable Grading Pipeline:** Evaluates short-answer conceptual questions using sentence embedding similarity and rubric keypoint extractors, providing transparent justifications.
6. **Multi-Stakeholder Diagnostic Analytics:** Renders interactive engagement curves, distraction timelines, and bilingual Urdu reports for parents and teachers.

---

## 6. Software & Hardware Specifications

### Software Stack:
* **Frontend:** Angular 16, TypeScript, HTML5 Video, Page Visibility API, Bootstrap 5, RxJS, Chart.js.
* **Backend CMS:** Strapi v4.13.4, Node.js, Express, RESTful APIs.
* **Database:** SQLite (Development) / PostgreSQL (Production).
* **Machine Learning / Vision:** Python 3, Flask, OpenCV (cv2), tf-keras / TensorFlow 2.x, NumPy.
* **NLP & Speech Tools:** Sentence-Transformers (Local Embeddings), OpenAI Whisper (Speech-to-Text).

### Hardware Requirements:
* Standard workstation or laptop with webcam and microphone.
* Minimum 8 GB RAM (16 GB recommended for concurrent neural model execution and frontend serving).

---

## 7. Work Breakdown & Agile Sprint Schedule

```
Sprint 1-2: Foundation, Teacher Resource CMS & Lecture Streaming (Weeks 1-4)
Sprint 3-4: Computer Vision Attention Pipeline & Tab-Switch Audit (Weeks 5-8)
Sprint 5-6: Explainable NLP Grading Pipeline & Lecture Checkpoints (Weeks 9-12)
Sprint 7:   STEM Reels Vertical Player & Educational Blog Hub (Weeks 13-14)
Sprint 8:   Multi-Signal Adaptive Recommendation Engine (Weeks 15-16)
Sprint 9:   Parent/Teacher Diagnostic Dashboards & Urdu Support (Weeks 17-18)
Sprint 10:  System Integration, Pilot Evaluation & Final Thesis (Weeks 19-20)
```

| Sprint | Phase | Deliverables |
| :--- | :--- | :--- |
| **Sprints 1–2** | Foundation & CMS | Teacher resource upload portal, lecture video models, role-based JWT auth, and video player. |
| **Sprints 3–4** | Vision & Tab Audit | Webcam 1 Hz frame streaming during lectures, CNN focus inference, and Page Visibility tab auditor. |
| **Sprints 5–6** | NLP & Quizzes | Speech-to-text pipeline, Sentence-Transformer semantic scoring, and lecture-linked quizzes. |
| **Sprint 7** | Media & Discovery | Vertical 9:16 STEM reels feed, interactive educational blogs, and bookmarking features. |
| **Sprint 8** | Adaptive Engine | Fusing lecture focus ratios, tab-switch counts, and quiz mastery to route personalized learning paths. |
| **Sprint 9** | Reporting | Parent/teacher portals with lecture attention timelines, tab audit summaries, and Urdu localization. |
| **Sprint 10** | Finalization | End-to-end usability testing with primary students, system tuning, and IEEE project thesis. |

---

## 8. Team Structure & Division of Responsibilities (2-Member Team)

### Student 1: Anis Nasir (CIIT/FA23-BCS-096/WAH)
* **Core Web Architecture & Headless CMS:**
  * Strapi v4 headless architecture, relational database schema design, and JWT authentication.
  * Content models for teacher lectures, educational blogs, STEM reels metadata, and relational question banks.
* **Frontend Presentation & Media Streaming:**
  * Angular 16 single-page application, teacher resource upload dashboard, and responsive lecture video player.
  * TikTok-style vertical 9:16 STEM reels feed and educational blog reader.
* **Explainable NLP Grading Pipeline:**
  * Client-side audio recording and OpenAI Whisper speech-to-text integration.
  * Sentence-Transformer semantic embedding generation and rubric keypoint rule-matching service.
  * Bilingual Urdu language localization and automated PDF report generation.

### Student 2: Abdul Hadi (CIIT/FA23-BCS-133/WAH)
* **Computer Vision Engagement Subsystem:**
  * Python/Flask vision pipeline capturing webcam frame streams at 1 Hz during lectures and quizzes.
  * OpenCV Haar Cascade face detection and eye-region localization and normalization (64x64 matrices).
  * Convolutional Neural Network (CNN with tf-keras) focus/distraction classification.
* **Browser Tab-Switch & Focus Proctoring Engine:**
  * HTML5 Page Visibility API integration to log tab departures, off-task intervals, and video auto-pause events.
  * Session-level telemetry aggregation combining focus percentages and tab-switch counts.
* **Multi-Signal Adaptive Recommendation Engine:**
  * Personalization algorithm synthesizing lecture attention ratios, tab violations, and quiz accuracy.
* **Visual Analytics Dashboards:**
  * Parent and teacher Angular dashboards featuring lecture attention heatmaps, tab audit logs, and progress graphs.

---

## 9. Expected Outcomes & Deliverables

1. **A Full-Stack Educational Web Portal:** A fully functional platform supporting teacher resource management, lecture streaming, STEM reels, and interactive blogs.
2. **Real-Time Lecture Attention & Tab Audit Engine:** A validated computer vision and browser proctoring system tracking student focus and tab departures during instructional sessions.
3. **Explainable Subjective Grading Subsystem:** An NLP pipeline providing auditable partial credit and constructive justifications for open-ended answers.
4. **Integrated STEM Discovery Feed:** An engaging, age-appropriate short video and blog discovery section.
5. **Comprehensive Diagnostic Dashboards:** Actionable parent and teacher reports with attention timelines, tab audit metrics, and bilingual accessibility.
6. **Complete Academic Documentation:** IEEE-compliant final project report, user evaluation study, and presentation deliverables.

---