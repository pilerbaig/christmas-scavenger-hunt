document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("day-container");
    const openBtn = document.getElementById("open-btn");
    const nextHintBtn = document.getElementById("next-hint-btn");
    const hintsDiv = document.getElementById("hints");

    let hintIndex = 0;

    function showNextHint() {
        if (hintIndex < HINTS.length) {
            const p = document.createElement("p");
            p.innerHTML = HINTS[hintIndex];
            hintsDiv.appendChild(p);
            hintIndex++;
        }
        if (hintIndex >= HINTS.length) {
            nextHintBtn.disabled = true;
        }
    }

    openBtn.addEventListener("click", () => {
        container.classList.remove("closed");
        container.classList.add("open");
        showNextHint(); // first hint immediately
    });

    nextHintBtn.addEventListener("click", showNextHint);
});
