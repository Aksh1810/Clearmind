# ClearMind 🌿

> Write or speak. Get clarity. Grow.

ClearMind is a daily journaling web app that helps you process your thoughts and emotions. Type or speak about your day, and ClearMind reflects it back with a mood reading, a warm personal reflection, and one small actionable tip for tomorrow.

**🔗 Live Demo:** [clearmind-omega.vercel.app](https://clearmind-omega.vercel.app)

---

## ✨ Features

- **Voice Journaling** — Click 🎙 Speak and talk naturally. Your words are transcribed in real time using the browser's built-in Web Speech API. No microphone library needed.
- **Smart Mood Detection** — ClearMind analyzes your entry and classifies your mood into one of 7 categories: Joyful, Anxious, Low, Grateful, Calm, Stressed, or Excited.
- **Personal Reflections** — Each entry receives a warm, human-sounding reflection that feels like a thoughtful friend, not generic therapy-speak.
- **Tomorrow's Nudge** — Every reflection comes with one small, specific, actionable tip for tomorrow.
- **Entry History** — All your past entries are saved locally and browsable. Voice entries are marked with a 🎙 badge.
- **Mood Tracker** — Your 5 most recent moods are displayed in the sidebar so you can spot patterns at a glance.
- **No Account Needed** — No login, no signup, no backend. Everything lives in your browser's localStorage.
- **Works Offline** — No API calls, no external services. ClearMind runs entirely in your browser.

---

## 🎙 How to Use

### Writing an Entry

1. Open ClearMind
2. Type your thoughts in the text area
3. Click **"Get Reflection →"**
4. Read your mood, reflection, and tomorrow's tip

### Speaking an Entry

1. Click the **🎙 Speak** button
2. Grant microphone permission (first time only)
3. Speak naturally — your words appear in the text area in real time
4. Click **⏹ Stop** when you're done
5. Click **"Get Reflection →"**

### Viewing Past Entries

1. Click **"Past Entries"** in the sidebar
2. Browse your history — each card shows the date, mood emoji, and a preview
3. Click any card to read its full reflection again

> **Note:** Voice input works best in Chrome, Edge, and Safari (iOS 14.5+). Not supported in Firefox.

---

## 🎨 Mood Map

| Emoji | Mood |
|:---:|---|
| 🌤 | Joyful |
| 🌀 | Anxious |
| 🌧 | Low |
| 🌸 | Grateful |
| 🍃 | Calm |
| ⚡ | Stressed |
| ✨ | Excited |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Voice-to-Text | Web Speech API (built into browser) |
| Reflection Engine | Local keyword-based mood detection + curated responses |
| Storage | localStorage |
| Hosting | Vercel |
| Fonts | Playfair Display + Crimson Pro (Google Fonts) |

---

## 🚀 Setup

```bash
# Clone the repo
git clone https://github.com/Aksh1810/Clearmind.git
cd Clearmind

# Install dependencies
npm install

# Run locally
npm run dev
```

That's it — no `.env`, no API key, no configuration needed.

---

## 📁 Project Structure

```
clearmind/
├── src/
│   ├── App.jsx       ← Entire app (single component)
│   ├── main.jsx      ← Vite entry point
│   └── index.css     ← Full design system
├── index.html        ← Google Fonts + meta tags
├── package.json
└── vite.config.js
```

---

## 🧠 How the Reflection Engine Works

ClearMind uses a fully local, client-side reflection engine:

1. **Mood Detection** — Scans your entry for keywords across 7 mood categories (25+ keywords per mood)
2. **Reflection Selection** — Picks from a pool of 21 hand-written reflections (3 per mood)
3. **Tip Selection** — Picks from a pool of 28 specific, actionable tips (4 per mood)

No AI API. No network calls. Everything runs instantly in your browser.

---

## 💡 Why I Built This

Most people carry unprocessed thoughts and emotions through their day with no outlet. Traditional journaling feels like shouting into a void — you write, but nothing writes back. And for many people, typing out their feelings is a barrier — they'd rather just talk.

ClearMind removes every barrier between thought and reflection. Speak freely or type — whichever feels natural. Your words are reflected back with genuine warmth, a mood classification, and one small nudge for tomorrow.

---

## 📄 License

MIT
