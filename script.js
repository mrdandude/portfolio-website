const revealTargets = document.querySelectorAll(
  ".work-item, .side-section, .showcase-card"
);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const tagline = document.querySelector(".tagline");

if (tagline) {
  const fullText = tagline.dataset.text || "";

  if (prefersReducedMotion) {
    tagline.textContent = fullText;
  } else {
    let index = 0;
    tagline.classList.add("is-typing");

    const typeText = () => {
      tagline.textContent = fullText.slice(0, index);
      index += 1;

      if (index <= fullText.length) {
        window.setTimeout(typeText, 28);
      } else {
        window.setTimeout(() => {
          tagline.classList.remove("is-typing");
        }, 700);
      }
    };

    typeText();
  }
}

revealTargets.forEach((element) => {
  element.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealTargets.forEach((element) => observer.observe(element));

const showcaseTabs = document.querySelectorAll(".showcase-tab");
const showcaseCards = document.querySelectorAll(".showcase-card");

showcaseTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    showcaseTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    showcaseCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});
