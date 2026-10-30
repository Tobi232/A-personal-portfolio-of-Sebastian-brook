// Live clock in the navigation bar
const navTime = document.getElementById("nav-time");

function updateNavTime() {
    if (!navTime) return;
    const now = new Date();
    navTime.dateTime = now.toISOString();
    navTime.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

updateNavTime();
setInterval(updateNavTime, 1000);

// Highlight the link for the current page
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});

// Mobile menu toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

function setMenu(open) {
    navLinks.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    navToggle.querySelector("i").className = open ? "bi bi-x-lg" : "bi bi-list";
}

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
    navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".nav-bar")) setMenu(false);
    });
    window.addEventListener("resize", () => window.innerWidth > 820 && setMenu(false));
}

// Project filter (projects page only)
const filterButtons = document.querySelectorAll(".filter-btn");
const filterCards = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        filterButtons.forEach((b) => b.classList.toggle("active", b === button));
        filterCards.forEach((card) => {
            card.hidden = filter !== "all" && card.dataset.category !== filter;
        });
    });
});

// FAQ: keep only one answer open at a time (contact page only)
document.querySelectorAll(".faq details").forEach((item, _, all) => {
    item.addEventListener("toggle", () => {
        if (item.open) all.forEach((other) => other !== item && (other.open = false));
    });
});

// Contact form: friendly confirmation instead of a page reload
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const status = contactForm.querySelector(".form-status");
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }
        status.textContent = "Thanks! Your inquiry has been received. I'll reply within 24 hours.";
        contactForm.reset();
    });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
