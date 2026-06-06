# 🏋️‍♂️ FitForge — Elite Athletic Hybrid Gym & AI Coach

FitForge is a premium high-performance athletic training platform based in Piplan, Pakistan. It seamlessly bridges real-world premium fitness facilities with **ForgeOS**, a digital bio-analytics platform, and an interactive **AI Sports Performance Coach** powered by Gemini.

---

## 🌟 Key Features

### 1. Dynamic Public Landing Page
*   **Programs Overview:** Comprehensive details of elite programs including *Strength & Power*, *Weight Optimization*, *Mobility & Flow*, *HIIT Intervals*, and *Sports Nutrition*.
*   **Flexible Membership Plans:** Clear tiered pricing options from *Basics* to *Lifestyle* tier (rates in PKR).
*   **Performance Metrics Showcase:** Live simulated widgets displaying biometric metrics (VO2 Max, cardiac efficiency, etc.) to show prospective members how the app tracks data.

### 2. Elite Member Dashboard
*   **Biometrics Dashboard:** Live tracking of biological parameters:
    *   **VO2 Max:** Estimated aerobic capacity with bracket-based feedback.
    *   **CNS Recovery Score:** Central nervous system readiness scale (0–100%).
    *   **Resting Heart Rate (HR):** Real-time pulse monitoring.
    *   **Calories Burned & Streak Tracking:** Keeping track of daily goals and attendance streaks.
*   **Custom Activity Logger:** Log strength, cardio, and mobility exercises. Logging a workout dynamically updates your biometrics (lowers recovery score while increasing calories and VO2 max trend).
*   **Biometric Simulator:** Simulate sleep cycles and rest states (e.g. restoring CNS recovery score back to 98% via an simulated 8-hour REM sleep).

### 3. Integrated AI Performance Coach
*   **Conversational Assistant:** Chat directly with the AI coach inside the dashboard.
*   **Tailored Advice:** Powered by `gemini-3.5-flash`, the coach functions as an elite sports scientist. It reads your current real-time biometrics, goal, and chat history to provide localized workout intensities, heart rate zones, and nutritional guidelines.
*   **Offline Fallback Mode:** If the `GEMINI_API_KEY` is not configured, the application falls back gracefully to a science-backed offline coaching simulator to ensure uninterrupted service.

---

## 🛠 Tech Stack

### Frontend (Client-Side)
*   **Framework:** [React 19](https://react.dev) with [TypeScript](https://www.typescriptlang.org)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (providing next-gen native imports and CSS variables)
*   **Animations:** [Motion](https://motion.dev) (for high-fidelity fluid transitions and micro-animations)
*   **Icons:** [Material Symbols Outlined](https://fonts.google.com/icons) & [Lucide React](https://lucide.dev)

### Backend (Server-Side)
*   **Server Engine:** [Express](https://expressjs.com) (Node.js)
*   **Dev Runner:** [tsx](https://github.com/privatenumber/tsx) (TypeScript execute)
*   **Build Bundler:** [esbuild](https://esbuild.github.io) (compiles typescript server into light-weight CommonJS code)
*   **AI Engine SDK:** `@google/genai` (v2.4.0) communicating directly with `gemini-3.5-flash`.

---

## 📂 Project Structure

```bash
fitforge/
├── .env.example            # Environment template configuration
├── package.json            # Scripts, dependencies and dev dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite bundling configuration
├── server.ts               # Express backend hosting + Gemini API gateway
├── index.html              # Frontend page entry point
├── src/
│   ├── main.tsx            # React application entry point
│   ├── App.tsx             # State manager for routing, dark mode and session auth
│   ├── types.ts            # Type definitions for workouts, progress, coaching messages
│   ├── data.ts             # Static page data (testimonials, trainers, pricing, services)
│   ├── index.css           # Global stylesheet with custom variables and Tailwind imports
│   └── components/
│       ├── AuthPage.tsx        # Split-screen premium portal for member registration/login
│       ├── LandingPage.tsx     # Feature-rich public marketing page
│       └── MemberDashboard.tsx # Dynamic athletic dashboard + interactive AI coach panel
```

---

## 🚀 Setup & Local Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### 1. Clone & Install Dependencies
Navigate to your project folder and run:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` into a new `.env.local` or `.env` file:
```bash
cp .env.example .env.local
```
Edit `.env.local` to configure your API keys:
*   `GEMINI_API_KEY`: Set this to your Google Gemini API key to activate live sports analytics advice.
*   `APP_URL`: Set to your local dev URL (e.g., `http://localhost:3000`).

> [!NOTE]
> If `GEMINI_API_KEY` is not provided, the application will automatically activate the **Offline Coach Mode**, displaying biometric-based offline mock predictions without crashing.

### 3. Run in Development Mode
Start the Vite frontend bundler and Express backend concurrently:
```bash
npm run dev
```
Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

### 4. Build & Run in Production
To compile and run the optimized build:
```bash
# Clean previous builds and compile files
npm run build

# Start the Node.js production server
npm run start
```

---

## 📖 Key Code References

For developers looking to inspect or modify the application:

*   **API Routing & Gemini Integration:** The backend endpoint, system prompts, and SDK implementation reside in [server.ts](file:///home/abdul-qadeer-khan/Downloads/ai%20studio/fitforge/server.ts).
*   **Coaching Logic & UI:** The chat history management and frontend biometrics components are located in [MemberDashboard.tsx](file:///home/abdul-qadeer-khan/Downloads/ai%20studio/fitforge/src/components/MemberDashboard.tsx).
*   **App Routing:** Theme toggles, auth redirects, and views are managed in [App.tsx](file:///home/abdul-qadeer-khan/Downloads/ai%20studio/fitforge/src/App.tsx).
*   **Styling & Custom Themes:** Standard brand palettes and fonts are imported inside [index.css](file:///home/abdul-qadeer-khan/Downloads/ai%20studio/fitforge/src/index.css).
