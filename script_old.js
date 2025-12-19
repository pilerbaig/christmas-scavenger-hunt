// ================= CONFIG =================

// Set Day 1 date here (local midnight is fine)
const START_DATE = new Date("2025-12-15T00:00:00");

// Timezone for online time check
const TIME_API =
    "https://worldtimeapi.org/api/timezone/America/New_York";

// Day data
const DAYS = {
    1: {
        title: "Day 1",
        hints: [
            "Kitty, kitty, on the wall, who's the fairest of them all?",
            "When stretching is over, I’m tucked away tight, unroll what you rolled to see what's inside.",
            "For balance, breath, and mindful flow, check where your yoga gets packed to go."
        ]
    },
    2: {
        title: "Day 2",
        hints: [
            "Soft things guard this one.",
            "Comfort is nearby.",
            "Look beneath what you sink into at night."
        ]
    },
    3: {
        title: "Day 3",
        hints: [
            "You pass this place often.",
            "It's not a room, but it connects them.",
            "Check where shoes rest."
        ]
    },
    4: {
        title: "Day 4",
        hints: [
            "Cold things surround this gift.",
            "You open it every day.",
            "Behind what keeps food fresh."
        ]
    },
    5: {
        title: "Day 5",
        hints: [
            "The final gift is hidden high.",
            "You look up to see it.",
            "Check above where stories are stored."
        ]
    }
};

// ================= STATE =================

let todayDate = null;
let currentDay = null;
let hintIndex = 0;

// ================= TIME =================

async function fetchOnlineDate() {
    const res = await fetch(TIME_API);
    const data = await res.json();
    return new Date(data.datetime);
}

function getUnlockedDayCount(today) {
    const diffMs = today - START_DATE;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
}

// ================= CALENDAR =================

function renderCalendar(unlockedDays) {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    for (let day = 1; day <= 5; day++) {
        const btn = document.createElement("button");
        btn.textContent = `Day ${day}`;

        if (day <= unlockedDays) {
            btn.onclick = () => openDay(day);
        } else {
            btn.disabled = true;
            btn.textContent += " 🔒";
        }

        calendar.appendChild(btn);
    }
}

// ================= DAY CONTENT =================

function openDay(dayNumber) {
    currentDay = dayNumber;
    hintIndex = 0;

    document.getElementById("day-title").textContent =
        DAYS[dayNumber].title;

    const hintsDiv = document.getElementById("hints");
    hintsDiv.innerHTML = "";

    document.getElementById("day-content").classList.remove("hidden");

    showNextHint();
}

function showNextHint() {
    const hints = DAYS[currentDay].hints;
    if (hintIndex < hints.length) {
        const p = document.createElement("p");
        p.textContent = hints[hintIndex];
        document.getElementById("hints").appendChild(p);
        hintIndex++;
    }
}

// ================= INIT =================

document.getElementById("next-hint-btn").onclick = showNextHint;
document.getElementById("close-btn").onclick = () => {
    document.getElementById("day-content").classList.add("hidden");
};

fetchOnlineDate()
    .then(date => {
        todayDate = date;
        const unlocked = Math.max(
            0,
            Math.min(5, getUnlockedDayCount(todayDate))
        );
        renderCalendar(unlocked);
    })
    .catch(err => {
        alert("Could not fetch online time. Try again later.");
        console.error(err);
    });
