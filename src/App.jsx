import { useState, useEffect, useRef } from "react";

// --- Mood map ---
const MOODS = {
  happy: { emoji: "🌤", label: "Joyful" },
  anxious: { emoji: "🌀", label: "Anxious" },
  sad: { emoji: "🌧", label: "Low" },
  grateful: { emoji: "🌸", label: "Grateful" },
  neutral: { emoji: "🍃", label: "Calm" },
  stressed: { emoji: "⚡", label: "Stressed" },
  excited: { emoji: "✨", label: "Excited" },
};

// --- Local Reflection Engine (no API needed) ---
const MOOD_KEYWORDS = {
  happy: ["happy", "joy", "great", "wonderful", "amazing", "love", "loving", "smile", "laughed", "laughing", "fun", "good day", "best", "awesome", "fantastic", "delighted", "cheerful", "pleased", "content", "glad", "bright", "sunny", "beautiful day", "perfect", "blessed"],
  anxious: ["anxious", "anxiety", "worried", "worry", "nervous", "panic", "scared", "fear", "uneasy", "restless", "overthink", "racing thoughts", "can't stop thinking", "tense", "dread", "what if", "uncertain", "insecure", "on edge"],
  sad: ["sad", "unhappy", "depressed", "down", "lonely", "cry", "crying", "cried", "miss", "missing", "lost", "grief", "heartbreak", "hurt", "pain", "empty", "hopeless", "disappointed", "broke", "broken", "alone", "sorrow", "miserable", "gloomy"],
  grateful: ["grateful", "thankful", "appreciate", "blessed", "gratitude", "lucky", "fortunate", "thank", "thanks", "kind", "kindness", "generous", "gift", "helped", "support", "supported", "wonderful people", "meant a lot", "so glad"],
  stressed: ["stressed", "stress", "overwhelmed", "too much", "deadline", "pressure", "burnout", "exhausted", "tired", "drained", "overwork", "can't handle", "drowning", "swamped", "behind", "falling apart", "breaking point", "no time", "busy", "hectic"],
  excited: ["excited", "exciting", "can't wait", "thrilled", "pumped", "looking forward", "new beginning", "opportunity", "adventure", "celebrate", "celebration", "milestone", "achievement", "accomplished", "won", "succeed", "dream", "finally", "big news", "promotion"],
};

const REFLECTIONS = {
  happy: [
    "It's clear that today brought you genuine moments of joy. Those bright spots matter — they're not just fleeting, they build the foundation of a life well-lived. Hold onto that warmth as you move forward.",
    "Your happiness shines through your words today. It sounds like you were truly present for the good moments, and that's a rare and wonderful thing. These are the days that remind you what it's all about.",
    "What a beautiful snapshot of your day. There's something powerful about recognizing happiness while you're in it — so many people miss that. You didn't, and that says something about your awareness.",
  ],
  anxious: [
    "I can sense the weight of uncertainty in your words. Anxiety often tries to convince us that the worst will happen, but look at how many times it's been wrong. You're making an effort just by putting these thoughts down, and that takes real courage.",
    "Your mind sounds like it's been running at full speed today, trying to solve problems that haven't happened yet. That's exhausting. Take a deep breath — you've navigated uncertain waters before, and you made it through every single time.",
    "It sounds like your thoughts have been tangled today. Writing them out here is a powerful first step — it takes the swirl out of your head and puts it somewhere you can see it clearly. You're more capable than your anxiety lets you believe.",
  ],
  sad: [
    "There's a heaviness in your words today, and I want you to know that's okay. Sadness isn't a sign of weakness — it's a sign that something matters deeply to you. Give yourself the grace to feel this without judgment.",
    "Today was a tough one, and your honesty about it is genuinely brave. Not every day will feel like this. Sometimes the hardest days are the ones that quietly prepare us for something better ahead.",
    "I hear you. Some days are just hard, and there's no way to sugarcoat that. But you showed up and you wrote about it — that means a part of you is still fighting, still processing, still growing. That part matters.",
  ],
  grateful: [
    "Gratitude looks beautiful on you. The fact that you can notice the goodness around you — even on an ordinary day — is a quiet superpower. These moments of appreciation are what turn a regular life into a rich one.",
    "Your words radiate warmth today. It's powerful that you chose to focus on what went right instead of what went wrong. That perspective isn't automatic — you built it, and it's serving you well.",
    "There's something deeply grounding about the gratitude in your entry. You're not just passively going through life — you're actively noticing the beauty in it. That's a habit that compounds over time into real happiness.",
  ],
  neutral: [
    "Not every day needs to be dramatic or life-changing. Today sounds like it was steady, and there's quiet strength in that. The calm days are where we recharge and get ready for what's next.",
    "Your day sounds balanced and even-keeled, and honestly, that's underrated. Not every entry needs fireworks — sometimes the most important growth happens in the stillness between the big moments.",
    "A day of normalcy is a gift we often don't appreciate in the moment. You showed up, you did your thing, and you took the time to check in with yourself. That consistency is what builds lasting habits.",
  ],
  stressed: [
    "You're carrying a lot right now, and I can feel it through your words. The fact that you paused to write this down — even while overwhelmed — shows incredible self-awareness. You don't have to solve everything tonight.",
    "It sounds like you're being pulled in too many directions today. Remember: you're one person, and being overwhelmed doesn't mean you're failing. It means you care about doing things well, and that's admirable.",
    "When everything feels urgent, nothing gets the attention it deserves. You've identified the pressure you're under, and that's the first step toward managing it. You've handled hard stretches before — this one is no different.",
  ],
  excited: [
    "Your energy is absolutely contagious! It's clear that something has sparked real excitement in you, and that matters. Ride this momentum — it's the kind of fuel that turns ideas into reality.",
    "I love the enthusiasm coming through your words. There's nothing quite like that feeling of anticipation for something meaningful. Let this excitement remind you of what you're capable of; the best is ahead.",
    "Something wonderful is unfolding for you, and you can feel it. That spark of excitement isn't just emotion — it's your instincts telling you you're headed in the right direction. Lean into it.",
  ],
};

const TIPS = {
  happy: [
    "Tomorrow, take 2 minutes to write down three specific things that made today good — anchoring joy in detail makes it last longer.",
    "Send a quick message to someone who contributed to today's happiness — sharing joy doubles it.",
    "Start tomorrow by doing the one activity from today that made you smile the most, even briefly.",
    "Take a photo of something that represents today's mood and save it to a 'good days' folder.",
  ],
  anxious: [
    "Tomorrow morning, try the 5-4-3-2-1 grounding exercise: notice 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste.",
    "Write down your biggest worry on paper, then write the most realistic outcome next to it — anxiety inflates possibilities; reality rarely matches.",
    "Block 15 minutes of 'worry time' on your calendar tomorrow — give your mind a container so it doesn't spill into everything.",
    "Before bed tomorrow, place one hand on your chest and take 6 slow breaths — box breathing (4 in, 4 hold, 4 out, 4 hold) resets your nervous system.",
  ],
  sad: [
    "Tomorrow, reach out to one person — even a simple 'hey, thinking of you' text. Connection is the antidote to loneliness.",
    "Take a 10-minute walk outside tomorrow, even if you don't feel like it — movement and daylight shift your brain chemistry in real, measurable ways.",
    "Pick one small, comforting activity for tomorrow: your favorite coffee, a warm shower, or a song that feels like a hug. You deserve gentleness.",
    "Write a letter to your future self describing how you want to feel in a week — it gives your sadness an expiration date.",
  ],
  grateful: [
    "Tomorrow, express your gratitude directly to one person who was part of today — spoken gratitude strengthens bonds more than you'd expect.",
    "Start a 'gratitude chain' — tomorrow, find one new thing to be thankful for that you've never noticed before.",
    "Pay forward today's good energy: do one unexpected kind thing for someone tomorrow, however small.",
    "Before sleep tomorrow, whisper three things you're grateful for — studies show this rewires your brain for better sleep and positivity.",
  ],
  neutral: [
    "Tomorrow, try one thing slightly outside your routine — a different lunch spot, a new playlist, or a 5-minute sketch. Small novelty sparks big aliveness.",
    "Set one small intention for tomorrow morning — not a goal, just a feeling you want to invite into your day.",
    "Take a 'curiosity walk' tomorrow: head out with no destination and notice one thing you've never paid attention to before.",
    "Journal for just 3 minutes tomorrow with the prompt: 'What am I quietly looking forward to?' — it surfaces excitement hiding beneath the surface.",
  ],
  stressed: [
    "Tonight, write your top 3 priorities for tomorrow — if you can only do three things, which three matter most? Let everything else wait.",
    "Schedule a 10-minute 'do nothing' break tomorrow. Literally sit and stare at a wall. Your brain needs white space to function clearly.",
    "Tomorrow, say no to one thing that isn't essential. Protecting your energy is productive, not selfish.",
    "Before starting work tomorrow, spend 2 minutes tidying your workspace — a clear desk creates a surprisingly clear mind.",
  ],
  excited: [
    "Channel tomorrow's excitement into action: write down the single next step you can take toward what's exciting you, and do it first thing.",
    "Share your excitement with someone who'll genuinely celebrate it with you — spoken dreams become real faster.",
    "Tomorrow, spend 10 minutes mapping out what this excitement could look like in 30 days — vision plus action is unstoppable.",
    "Capture this moment in detail — write down exactly how this excitement feels so you can revisit it when you need a boost.",
  ],
};

const detectMood = (text) => {
  const lower = text.toLowerCase();
  const scores = {};

  for (const [mood, keywords] of Object.entries(MOOD_KEYWORDS)) {
    scores[mood] = 0;
    for (const keyword of keywords) {
      // count occurrences of each keyword
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "gi");
      const matches = lower.match(regex);
      if (matches) {
        scores[mood] += matches.length;
      }
    }
  }

  // find highest score
  let bestMood = "neutral";
  let bestScore = 0;
  for (const [mood, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestMood = mood;
    }
  }

  return bestMood;
};

const getLocalReflection = (text) => {
  const mood = detectMood(text);
  const reflections = REFLECTIONS[mood];
  const tips = TIPS[mood];

  // pick a random reflection and tip
  const reflection = reflections[Math.floor(Math.random() * reflections.length)];
  const tip = tips[Math.floor(Math.random() * tips.length)];

  return { mood, reflection, tip };
};

// --- Date formatting helpers ---
const formatDateShort = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const formatDateFull = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// ============================================================
// App Component
// ============================================================
export default function App() {
  // --- State ---
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("clearmind_entries");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentEntry, setCurrentEntry] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [currentView, setCurrentView] = useState("write"); // write | reflection | history
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [error, setError] = useState(null);
  const [isVoiceEntry, setIsVoiceEntry] = useState(false);

  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");

  // --- Persist entries ---
  useEffect(() => {
    localStorage.setItem("clearmind_entries", JSON.stringify(entries));
  }, [entries]);

  // --- Voice ---
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    finalTranscriptRef.current = currentEntry;

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += transcript + " ";
        } else {
          interim = transcript;
        }
      }
      const combined = finalTranscriptRef.current + interim;
      setCurrentEntry(combined);
      setCharCount(combined.length);
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setIsVoiceEntry(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // --- Submit entry ---
  const handleSubmit = () => {
    if (!currentEntry.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);

    // simulate brief "thinking" delay for better UX
    setTimeout(() => {
      try {
        const aiResult = getLocalReflection(currentEntry.trim());

        const newEntry = {
          id: Date.now(),
          date: formatDateShort(Date.now()),
          text: currentEntry.trim(),
          mood: aiResult.mood,
          reflection: aiResult.reflection,
          tip: aiResult.tip,
          isVoice: isVoiceEntry,
        };

        setEntries((prev) => [newEntry, ...prev]);
        setResult(newEntry);
        setCurrentView("reflection");
        setCurrentEntry("");
        setCharCount(0);
        setIsVoiceEntry(false);
        finalTranscriptRef.current = "";
      } catch (err) {
        console.error("Reflection error:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 1200);
  };

  // --- Navigation ---
  const goToWrite = () => {
    setCurrentView("write");
    setResult(null);
    setSelectedEntry(null);
    setError(null);
  };

  const goToHistory = () => {
    setCurrentView("history");
    setResult(null);
    setSelectedEntry(null);
  };

  const viewEntry = (entry) => {
    setSelectedEntry(entry);
    setResult(entry);
    setCurrentView("reflection");
  };

  // --- Derived ---
  const recentMoods = entries.slice(0, 5).map((e) => MOODS[e.mood]?.emoji || "🍃");

  // ============================================================
  // Render
  // ============================================================
  return (
    <div className="app-layout">
      {/* ---- Sidebar ---- */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-leaf">🌿</span>
          ClearMind
        </div>

        <div className="streak-card">
          <div className="streak-label">Day Streak</div>
          <div className="streak-count">
            {entries.length}
            <span>{entries.length === 1 ? "entry" : "entries"}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-btn ${currentView === "write" || currentView === "reflection" ? "active" : ""}`}
            onClick={goToWrite}
          >
            <span className="nav-icon">✏️</span>
            Today's Entry
          </button>
          <button
            className={`nav-btn ${currentView === "history" ? "active" : ""}`}
            onClick={goToHistory}
          >
            <span className="nav-icon">📖</span>
            Past Entries
          </button>
        </nav>

        {recentMoods.length > 0 && (
          <div className="sidebar-moods">
            <div className="moods-label">Recent Moods</div>
            <div className="moods-row">
              {recentMoods.map((emoji, i) => (
                <span key={i}>{emoji}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mood-legend">
          <div className="moods-label">Mood Map</div>
          <div className="mood-legend-list">
            {Object.entries(MOODS).map(([key, { emoji, label }]) => (
              <div key={key} className="mood-legend-item">
                <span>{emoji}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ---- Main ---- */}
      <main className="main-content">
        {/* ======== WRITE VIEW ======== */}
        {currentView === "write" && (
          <>
            <div className="date-header">{formatDateFull()}</div>
            <h1 className="page-title">How are you, really?</h1>
            <p className="page-subtitle">
              Write or speak freely. Your companion will reflect it back.
            </p>

            <div className="paper-card">
              {error && <div className="error-message">{error}</div>}

              <textarea
                className={`journal-textarea ${isListening ? "listening" : ""}`}
                placeholder="Start writing or press 🎙 to speak…"
                value={currentEntry}
                onChange={(e) => {
                  setCurrentEntry(e.target.value);
                  setCharCount(e.target.value.length);
                }}
                disabled={isLoading}
              />

              <div className="textarea-bottom-bar">
                <span className="char-count">{charCount} chars</span>

                <div className="bottom-bar-actions">
                  {!isListening ? (
                    <button
                      className="voice-btn"
                      onClick={startListening}
                      disabled={isLoading}
                      title="Start voice input"
                    >
                      🎙 Speak
                    </button>
                  ) : (
                    <button
                      className="voice-btn listening"
                      onClick={stopListening}
                    >
                      <span className="pulse-ring" />
                      Stop
                    </button>
                  )}

                  <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={!currentEntry.trim() || isLoading}
                  >
                    {isLoading ? "Reflecting…" : "Get Reflection →"}
                  </button>
                </div>
              </div>

              {isLoading && (
                <div className="loading-dots">
                  <span />
                  <span />
                  <span />
                </div>
              )}

              <p className="voice-note">
                🎙 Voice works best in Chrome.
              </p>
            </div>
          </>
        )}

        {/* ======== REFLECTION VIEW ======== */}
        {currentView === "reflection" && result && (
          <>
            <div className="date-header">{result.date}</div>
            <h1 className="page-title">Your Reflection</h1>
            <p className="page-subtitle">
              Here's what your words are telling you.
            </p>

            <div className="paper-card reflection-card">
              <div className={`mood-badge ${result.mood}`}>
                {MOODS[result.mood]?.emoji || "🍃"}{" "}
                {MOODS[result.mood]?.label || "Calm"}
              </div>

              <blockquote className="pull-quote">
                "{result.text.slice(0, 120)}
                {result.text.length > 120 ? "…" : ""}"
              </blockquote>

              <p className="reflection-text">{result.reflection}</p>

              <div className="tip-box">
                <div className="tip-label">🌱 Tomorrow's nudge</div>
                <p className="tip-text">{result.tip}</p>
              </div>

              <button className="back-btn" onClick={goToWrite}>
                ← Write another entry
              </button>
            </div>
          </>
        )}

        {/* ======== HISTORY VIEW ======== */}
        {currentView === "history" && (
          <>
            <h1 className="page-title">Past Entries</h1>
            <p className="page-subtitle">
              {entries.length} {entries.length === 1 ? "entry" : "entries"} so
              far — keep going.
            </p>

            {entries.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <p>No entries yet. Write your first one today.</p>
              </div>
            ) : (
              <div className="history-list">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="history-card"
                    onClick={() => viewEntry(entry)}
                  >
                    <span className="history-mood">
                      {MOODS[entry.mood]?.emoji || "🍃"}
                    </span>
                    <div className="history-info">
                      <div className="history-date">
                        {entry.date}
                        {entry.isVoice && (
                          <span className="voice-badge">🎙</span>
                        )}
                      </div>
                      <div className="history-preview">{entry.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
