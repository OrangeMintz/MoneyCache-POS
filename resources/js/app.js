import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


// LOCK SCREEN
let inactivityTime = 1 * 5 * 1000; // 5 seconds for testing
let timer;

function resetTimer() {
    if (sessionStorage.getItem("locked") === "true") {
        document.getElementById("lockscreen").classList.remove("hidden");
        return; // Don't reset if already locked
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
        sessionStorage.setItem("locked", "true"); // Persist lock state
        document.getElementById("lockscreen").classList.remove("hidden");
    }, inactivityTime);
}

document.addEventListener("mousemove", resetTimer);
document.addEventListener("keypress", resetTimer);
document.addEventListener("click", resetTimer);
document.addEventListener("scroll", resetTimer);
resetTimer();

// Unlock Function
document.getElementById("unlock-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let password = document.getElementById("password").value;

    fetch("/unlock", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
        },
        body: JSON.stringify({ password: password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                sessionStorage.removeItem("locked"); // Remove lock state
                document.getElementById("lockscreen").classList.add("hidden");
            }
        })
        .catch(error => console.error("Error:", error));
});
