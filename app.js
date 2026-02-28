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
// State & Elements
// ============================================================

let entries = [];
let currentEntry = "";
let isListening = false;
let isLoading = false;
let isVoiceEntry = false;

// DOM Elements
const views = {
    write: document.getElementById("view-write"),
    reflection: document.getElementById("view-reflection"),
    history: document.getElementById("view-history"),
};

const navBtns = {
    write: document.getElementById("nav-write"),
    history: document.getElementById("nav-history"),
};

const ui = {
    streakCount: document.getElementById("streak-count"),
    recentMoodsContainer: document.getElementById("recent-moods-container"),
    recentMoods: document.getElementById("recent-moods"),
    currentDateFull: document.getElementById("current-date-full"),
    errorMessage: document.getElementById("error-message"),
    textarea: document.getElementById("journal-textarea"),
    charCount: document.getElementById("char-count"),
    voiceBtn: document.getElementById("voice-btn"),
    submitBtn: document.getElementById("submit-btn"),
    loadingDots: document.getElementById("loading-dots"),

    // Reflection view elements
    reflectionDate: document.getElementById("reflection-date"),
    reflectionMoodBadge: document.getElementById("reflection-mood-badge"),
    reflectionPullQuote: document.getElementById("reflection-pull-quote"),
    reflectionText: document.getElementById("reflection-text"),
    reflectionTip: document.getElementById("reflection-tip"),

    // History view elements
    historySubtitle: document.getElementById("history-subtitle"),
    historyEmpty: document.getElementById("history-empty"),
    historyList: document.getElementById("history-list"),
};

let recognition = null;
let finalTranscript = "";

// ============================================================
// Initialization
// ============================================================

function init() {
    ui.currentDateFull.textContent = formatDateFull();

    // Load saved entries
    const saved = localStorage.getItem("clearmind_entries");
    if (saved) {
        entries = JSON.parse(saved);
    }

    updateSidebar();
    goToWrite(); // Default view
}

// ============================================================
// Core Functions
// ============================================================

function saveEntries() {
    localStorage.setItem("clearmind_entries", JSON.stringify(entries));
    updateSidebar();
}

function updateSidebar() {
    // Streak count
    const count = entries.length;
    ui.streakCount.innerHTML = `${count}<span>${count === 1 ? 'entry' : 'entries'}</span>`;

    // Recent moods
    const recentMoods = entries.slice(0, 5).map((e) => MOODS[e.mood]?.emoji || "🍃");
    if (recentMoods.length > 0) {
        ui.recentMoodsContainer.classList.remove("hidden");
        ui.recentMoods.innerHTML = recentMoods.map(emoji => `<span>${emoji}</span>`).join("");
    } else {
        ui.recentMoodsContainer.classList.add("hidden");
    }
}

function handleTextInput(element) {
    currentEntry = element.value;
    ui.charCount.textContent = `${currentEntry.length} chars`;
    ui.submitBtn.disabled = !currentEntry.trim() || isLoading;
}

// --- Voice Recognition ---
function toggleListening() {
    if (isListening) {
        stopListening();
    } else {
        startListening();
    }
}

function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Voice input is not supported in this browser. Please use Chrome.");
        return;
    }

    if (!recognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            let interim = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + " ";
                } else {
                    interim = transcript;
                }
            }

            const combined = finalTranscript + interim;
            ui.textarea.value = combined;
            handleTextInput(ui.textarea);
        };

        recognition.onerror = (event) => {
            console.error("Speech error:", event.error);
            stopListening();
        };

        recognition.onend = () => {
            stopListening();
        };
    }

    finalTranscript = currentEntry;
    recognition.start();
    isListening = true;
    isVoiceEntry = true;

    // Update UI
    ui.voiceBtn.classList.add("listening");
    ui.voiceBtn.innerHTML = '<span class="pulse-ring"></span>Stop';
    ui.textarea.classList.add("listening");
}

function stopListening() {
    if (recognition) {
        try { recognition.stop(); } catch (e) { }
    }
    isListening = false;

    // Update UI
    ui.voiceBtn.classList.remove("listening");
    ui.voiceBtn.innerHTML = '🎙 Speak';
    ui.textarea.classList.remove("listening");
}

// --- Submit ---
function handleSubmit() {
    if (!currentEntry.trim() || isLoading) return;

    isLoading = true;
    ui.errorMessage.classList.add("hidden");
    ui.loadingDots.classList.remove("hidden");
    ui.submitBtn.disabled = true;
    ui.submitBtn.textContent = "Reflecting…";
    ui.textarea.disabled = true;
    ui.voiceBtn.disabled = true;

    if (isListening) stopListening();

    // Simulate network delay
    setTimeout(() => {
        try {
            const trimmed = currentEntry.trim();
            const aiResult = getLocalReflection(trimmed);

            const newEntry = {
                id: Date.now(),
                date: formatDateShort(Date.now()),
                text: trimmed,
                mood: aiResult.mood,
                reflection: aiResult.reflection,
                tip: aiResult.tip,
                isVoice: isVoiceEntry,
            };

            entries.unshift(newEntry);
            saveEntries();
            viewEntry(newEntry);

            // Reset
            ui.textarea.value = "";
            currentEntry = "";
            handleTextInput(ui.textarea);
            isVoiceEntry = false;
            finalTranscript = "";

        } catch (err) {
            console.error("Reflection error:", err);
            ui.errorMessage.textContent = "Something went wrong. Please try again.";
            ui.errorMessage.classList.remove("hidden");
        } finally {
            isLoading = false;
            ui.loadingDots.classList.add("hidden");
            ui.textarea.disabled = false;
            ui.voiceBtn.disabled = false;
            ui.submitBtn.textContent = "Get Reflection →";
            ui.submitBtn.disabled = !currentEntry.trim();
        }
    }, 1200);
}

// ============================================================
// View Navigation
// ============================================================

function hideAllViews() {
    Object.values(views).forEach(v => v.classList.add("hidden"));
    Object.values(navBtns).forEach(btn => btn.classList.remove("active"));
}

function goToWrite() {
    hideAllViews();
    views.write.classList.remove("hidden");
    navBtns.write.classList.add("active");
    ui.errorMessage.classList.add("hidden");
}

function goToHistory() {
    hideAllViews();
    views.history.classList.remove("hidden");
    navBtns.history.classList.add("active");

    // Render history list
    ui.historySubtitle.textContent = `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} so far — keep going.`;

    if (entries.length === 0) {
        ui.historyEmpty.classList.remove("hidden");
        ui.historyList.innerHTML = "";
    } else {
        ui.historyEmpty.classList.add("hidden");
        ui.historyList.innerHTML = entries.map(entry => `
      <div class="history-card" onclick='viewEntryFromId(${entry.id})'>
        <span class="history-mood">
          ${MOODS[entry.mood]?.emoji || "🍃"}
        </span>
        <div class="history-info">
          <div class="history-date">
            ${entry.date}
            ${entry.isVoice ? '<span class="voice-badge">🎙</span>' : ''}
          </div>
          <div class="history-preview">${escapeHtml(entry.text)}</div>
        </div>
      </div>
    `).join("");
    }
}

function viewEntryFromId(id) {
    const entry = entries.find(e => e.id === id);
    if (entry) viewEntry(entry);
}

function viewEntry(entry) {
    hideAllViews();
    views.reflection.classList.remove("hidden");
    navBtns.write.classList.add("active"); // Reflection sits underneath the "Today's Entry" tab conceptually

    // Populate reflection card
    ui.reflectionDate.textContent = entry.date;

    const moodData = MOODS[entry.mood] || MOODS.neutral;
    ui.reflectionMoodBadge.className = `mood-badge ${entry.mood}`;
    ui.reflectionMoodBadge.innerHTML = `${moodData.emoji} ${moodData.label}`;

    const truncatedText = entry.text.length > 120
        ? entry.text.slice(0, 120) + "…"
        : entry.text;
    ui.reflectionPullQuote.textContent = `"${truncatedText}"`;

    ui.reflectionText.textContent = entry.reflection;
    ui.reflectionTip.textContent = entry.tip;
}

// Security Helper to prevent xss when rendering history
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Start app
document.addEventListener("DOMContentLoaded", init);
