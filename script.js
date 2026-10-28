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

const hero = document.querySelector(".hero");

if (hero && !prefersReducedMotion) {
  let heroFrameRequested = false;

  const updateHeroBackground = () => {
    const scrollRange = Math.max(hero.offsetHeight, window.innerHeight * 0.45);
    const progress = Math.min(Math.max(window.scrollY / scrollRange, 0), 1);
    const backgroundPosition = 33 + progress * 67;

    hero.style.setProperty("--hero-bg-y", `${backgroundPosition.toFixed(2)}%`);
    heroFrameRequested = false;
  };

  const requestHeroBackgroundUpdate = () => {
    if (!heroFrameRequested) {
      window.requestAnimationFrame(updateHeroBackground);
      heroFrameRequested = true;
    }
  };

  window.addEventListener("scroll", requestHeroBackgroundUpdate, { passive: true });
  window.addEventListener("resize", requestHeroBackgroundUpdate);
  updateHeroBackground();
}

const footerName = document.querySelector(".site-footer-name");

if (footerName && !prefersReducedMotion) {
  let footerFrameRequested = false;

  const updateFooterBackground = () => {
    const rect = footerName.getBoundingClientRect();
    const travel = window.innerHeight + rect.height;
    const progress = Math.min(
      Math.max((window.innerHeight - rect.top) / travel, 0),
      1
    );
    const backgroundPosition = 5 + progress * 90;

    footerName.style.setProperty(
      "--footer-bg-y",
      `${backgroundPosition.toFixed(2)}%`
    );
    footerFrameRequested = false;
  };

  const requestFooterBackgroundUpdate = () => {
    if (!footerFrameRequested) {
      window.requestAnimationFrame(updateFooterBackground);
      footerFrameRequested = true;
    }
  };

  window.addEventListener("scroll", requestFooterBackgroundUpdate, { passive: true });
  window.addEventListener("resize", requestFooterBackgroundUpdate);
  updateFooterBackground();
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
