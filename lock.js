const START_DATE = new Date("2025-12-19T00:00:00"); // keep same as index
const TIME_API =
    "https://worldtimeapi.org/api/timezone/America/New_York";

async function enforceDayLock(dayNumber) {
    try {
        const res = await fetch(TIME_API);
        const data = await res.json();
        const today = new Date(data.datetime);

        const diffMs = today - START_DATE;
        const unlockedDays =
            Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

        if (dayNumber > unlockedDays) {
            document.body.innerHTML = `
        <h1>🔒 Not Yet!</h1>
        <p>This page unlocks on Day ${dayNumber}.</p>
        <a href="index.html">Back to calendar</a>
      `;
        }
    } catch (err) {
        document.body.innerHTML = `
      <h1>Error</h1>
      <p>Could not verify the date.</p>
    `;
        console.error(err);
    }
}
