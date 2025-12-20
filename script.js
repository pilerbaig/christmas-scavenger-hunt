// ================= CONFIG =================

// CHANGE THIS for real use
const START_DATE = new Date("2025-12-15T00:00:00"); // past = unlocked for testing

// Time source
const TIME_API =
    "https://worldtimeapi.org/api/timezone/America/New_York";

// ================= LOGIC =================

async function fetchOnlineDate() {
    const res = await fetch(TIME_API);
    const data = await res.json();
    return new Date(data.datetime);
}

function getUnlockedDays(today) {
    const diffMs = today - START_DATE;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
}

function renderCalendar(unlockedDays) {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    for (let day = 1; day <= 5; day++) {
        const btn = document.createElement("button");
        btn.innerHTML = `
        <div class="door">
            <span>${day}</span>
            <div class="knob"></div>
            <div class="panel"></div>
        </div>
        `;
        btn.setAttribute("data-day", day);


        if (day <= unlockedDays) {
            btn.onclick = () => {
                window.location.href = `day${day}.html`;
            };
        } else {
            btn.classList.add("locked");
            btn.onclick = () => { }; // block click
        }


        calendar.appendChild(btn);
    }
}

// ================= INIT =================

fetchOnlineDate()
    .then(today => {
        const unlocked = Math.max(0, Math.min(5, getUnlockedDays(today)));
        renderCalendar(unlocked);
    })
    .catch(err => {
        alert("Could not fetch online time.");
        console.error(err);
    });
