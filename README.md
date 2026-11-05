# EduNerve AI – Placement Preparation Website

A hackathon-built, browser-only website that helps engineering students prepare for campus placements: quizzes with performance reports, a Gemini-powered DSA chatbot, a coding arena, a webcam and voice mock interview, and a resume analyzer.

It is built with plain HTML, CSS and JavaScript. There is no framework, no build step and no backend. Progress and results are saved in the browser's `localStorage`.

---

## Features

### Learning & Assessment
- **Dashboard** (`deshboard.html`): stat cards and topic progress bars built from your saved quiz history, plus links to the Learning and Interview Prep sections.
- **Smart Quiz Zone** (`ludo/quiz.html`): MCQ quizzes on Arrays, OOP, Operating Systems, Databases and NLP. You choose the topic, difficulty and number of questions. Before each quiz, it suggests your weakest topic based on past results. Each quiz is scored on four measures (Accuracy, Time, Concept, Consistency) and saved.
- **Assessment Report** (`ludo/assessment.html`): donut charts for the latest quiz's scores, plus Chart.js graphs of accuracy over time and average accuracy per topic.
- **Courses** (`ludo/courses.html`): seven course cards with progress bars and a syllabus pop-up for each.
- **AlgoBot – DSA Chatbot** (`chatbot.html`): a chat assistant that calls the Google Gemini API (`gemini-2.0-flash`). It includes:
  - a 13-topic DSA roadmap checklist with a progress bar
  - one-click prompts for each topic
  - a simple local profile (name, email, avatar)
  - chat history saved per user
  - a light/dark theme
  - code blocks with a copy button

### Interview Preparation
- **Interview Hub** (`Interview page/try.html`): the landing page for interview practice, with an animated particle background and 3D tilt cards.
- **Practice Questions** (`Practice/practice.html`): MCQs on JavaScript, HTML, CSS and DSA. Each question has a 30-second timer, a flip card with the explanation, and score and streak tracking.
- **Coding Arena** (`coding arena/coding.html`): timed coding challenges at Easy, Medium or Hard. Hints cost points, scoring is +100 for a correct answer and −30 for a wrong one, and the next difficulty adjusts to your speed and accuracy.
- **Mock Interview** (`camera1.html`): uses your webcam to run an interview.
  - Questions are read aloud with text-to-speech.
  - You answer by voice, using the browser's speech recognition.
  - face-api.js checks every few seconds that your face is in view.
  - You get simple feedback based on how long your answer is.
- **Schedule Interview** (`schedule/schedule-interview.html`): pick an interview type, mode, date and time. The booking is saved locally, and the Mock Interview page shows it as an upcoming-interview banner.
- **Resume Analyzer** (`Resume.html`): paste your resume text or upload a `.txt` file. It uses keyword rules to:
  - detect skills, projects and internships
  - suggest improvements and relevant certifications
  - give a readiness score
- **Interview Tips** (`interview-tips.html`): expandable sections with tips, do's and don'ts, and sample answers.

### Accounts
- **Sign In / Sign Up** (`xyz.html`): a demo login that keeps accounts in `localStorage` and then redirects to the dashboard.

---

## Tech Stack

| Area | Used |
|---|---|
| Markup & styling | HTML5, CSS3 (mostly in `<style>` blocks inside each page), Google Fonts (Poppins, Fira Code), Font Awesome 6 |
| Logic | Vanilla JavaScript (ES6+) |
| Charts | [Chart.js](https://www.chartjs.org/) (CDN) |
| Face detection | [face-api.js](https://github.com/justadudewhohacks/face-api.js) TinyFaceDetector (CDN) |
| Browser APIs | Web Speech API (speech synthesis and recognition), MediaDevices / `getUserMedia` (webcam), Canvas API, `localStorage`, Clipboard API |
| AI | Google Gemini API (`gemini-2.0-flash`) through the REST endpoint, used only by the DSA chatbot |

---

## Project Structure

```
Website-for-preparation-of-placement/
├── README.md
└── hackathon/
    ├── xyz.html                  # Sign in / sign up (entry point)
    ├── deshboard.html            # Main dashboard
    ├── run.html                  # Alternate copy of the dashboard
    ├── chatbot.html              # AlgoBot – Gemini-powered DSA chatbot + roadmap
    ├── Resume.html               # Resume analyzer
    ├── camera1.html              # Mock interview (webcam + voice + face detection)
    ├── camera.html               # Earlier version of the mock interview page
    ├── mock-interview.html       # Simple timed mock interview (uses mock.css / mock.js)
    ├── mock.css
    ├── mock.js
    ├── interview-tips.html       # Interview tips
    ├── Interview page/
    │   ├── try.html              # Interview Hub
    │   ├── index.html            # Earlier Interview Hub layout
    │   ├── script.js
    │   └── style.css
    ├── Practice/
    │   └── practice.html         # Timed MCQ practice with flip cards
    ├── coding arena/
    │   └── coding.html           # Coding Arena
    ├── schedule/
    │   └── schedule-interview.html
    ├── home page/
    │   ├── index.html            # Early home page prototype
    │   ├── script.js             # (empty)
    │   └── style.css             # (empty)
    └── ludo/                     # Learning & Assessment section
        ├── index.html            # Learning hub
        ├── quiz.html             # Smart Quiz Zone
        ├── assessment.html       # Assessment report (Chart.js)
        ├── courses.html          # Enrolled courses + syllabus modal
        ├── resourse_hub.html     # Resource hub (download cards)
        ├── tips.html             # Interview tips (copy)
        ├── extra.html            # Schedule interview form (prototype)
        └── script.js             # Face-expression interview prototype (not linked)
```

---

## How to Run

This is a static website, so there is nothing to install or build. Several pages use links that start from the site root, such as `/ludo/index.html`. Because of that, serve the **`hackathon/` folder as the web root**.

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tripti129/Website-for-preparation-of-placement.git
   cd Website-for-preparation-of-placement/hackathon
   ```

2. **Start a local server** from inside `hackathon/`. Use either option:
   ```bash
   # Python 3
   python -m http.server 8000
   ```
   ```bash
   # or Node.js
   npx serve .
   ```
   Opening the files over `http://localhost` rather than `file://` is also what lets the browser grant webcam and microphone access.

3. **Open the site**
   - Start at `http://localhost:8000/xyz.html`, create an account, then sign in.
   - You can also open any page directly, for example `http://localhost:8000/Interview%20page/try.html`.

4. **Optional: enable the DSA chatbot.** In `hackathon/chatbot.html`, set `GEMINI_API_KEY` to your own key from [Google AI Studio](https://aistudio.google.com/).

**Browser:** use Google Chrome or another Chromium-based browser. The voice features use `webkitSpeechRecognition`, which other browsers may not support.

---

## Current Limitations

This is a hackathon prototype, so some features are simplified:

- **No backend.** Logins, quiz history and schedules exist only in your browser's `localStorage`, and passwords are stored in plain text.
- **Coding Arena** does not run your code. It checks your answer by matching text against the expected output, and it has three sample problems.
- **Resume Analyzer** works by keyword rules. The "Analyze with LLM" button is a placeholder.
- **Mock Interview:**
  - The confidence score is a placeholder value.
  - The "eye contact" check only detects whether a face is visible.
- **Fixed content:** quiz questions, courses and some dashboard figures are hard-coded sample data.
- **Missing files:** the Resource Hub's download links point to a `notes/` folder that is not in the repo.

---

## Future Improvements

- Add a backend for real authentication and a database
- Move the Gemini API calls to a server so the API key stays private
- Run and judge code in a secure sandbox in the Coding Arena
- Generate quiz questions and coding problems with AI, and add a larger question bank
- Add company-wise mock tests, aptitude sections and a leaderboard
- Merge the duplicate prototype pages and add consistent navigation across the site

---

## Author

**Tripti Mittal**
- GitHub: [@Tripti129](https://github.com/Tripti129)
- LinkedIn: [Tripti Mittal](https://www.linkedin.com/in/-tripti-mittal)

If you find this project useful, consider giving it a ⭐.
