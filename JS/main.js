
// ========================================
// NOMA — INTERACTIONS
// ========================================

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const navigationLinks = document.querySelectorAll(".navigation a");

// MOBILE NAVIGATION

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation" : "Close navigation"
  );

  navigation.classList.toggle("is-open", !isOpen);
});

// CLOSE MENU AFTER CLICKING A LINK

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  });
});

// AUTOMATIC FOOTER YEAR

const yearElement = document.querySelector("#year");

yearElement.textContent = new Date().getFullYear();

// ========================================
// NOMA — MOUSE LIGHT EFFECT
// ========================================

const hero = document.querySelector(".hero");

if (hero && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    hero.style.setProperty("--mouse-x", `${x}px`);
    hero.style.setProperty("--mouse-y", `${y}px`);
  });
}


// ========================================
// NOMA — SEQUENTIAL CARD REVEAL
// ========================================

const cards = document.querySelectorAll(".feature-card");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!reduceMotion && "IntersectionObserver" in window) {

  cards.forEach((card, index) => {
    card.classList.add("reveal");
    card.style.transitionDelay = `${index * 250}ms`;
  });

  const cardObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");
          });

          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.1
    }
  );

  cards.forEach((card) => {
    cardObserver.observe(card);
  });

}

/* NOMA — Efeito 3D interativo nos cartões */

const tiltCards = document.querySelectorAll(".feature-card");

const supportsTilt = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
);

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (!supportsTilt.matches) return;

    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * 12;
    const rotateY = (x - 0.5) * 12;

    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  });
});

/* NOMA — Reveal do manifesto */

const manifestoSection = document.querySelector(".manifesto");

if (manifestoSection) {
  const manifestoObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.25
    }
  );

  manifestoObserver.observe(manifestoSection);
}

/* NOMA — Luz interativa no manifesto */

const manifestoGlow = document.querySelector(".manifesto");

if (manifestoGlow) {
  manifestoGlow.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;

    const rect = manifestoGlow.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    manifestoGlow.style.setProperty("--glow-x", `${x}px`);
    manifestoGlow.style.setProperty("--glow-y", `${y}px`);
  });

  manifestoGlow.addEventListener("pointerleave", () => {
    manifestoGlow.style.removeProperty("--glow-x");
    manifestoGlow.style.removeProperty("--glow-y");
  });
}
