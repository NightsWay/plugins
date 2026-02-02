(function () {
  "use strict";

  function applyRatingColors() {
    const elements = document.querySelectorAll(
      ".card__vote, .full-start__rate > div, .info__rate > span"
    );

    for (const el of elements) {
      let text = el.textContent
        .trim()
        .replace(",", ".")
        .replace(/\s+/g, "")
        .replace(/из10/gi, "");

      const rating = parseFloat(text);

      if (
        isNaN(rating) ||
        rating < 0 ||
        rating > 10 ||
        /[a-zа-яё]/i.test(text)
      ) {
        continue;
      }

      const isCard = el.classList.contains("card__vote");

      // Фон
      el.style.background = isCard ? "rgba(0, 0, 0, 0.8)" : "transparent";
      el.style.transition = "color 0.3s ease";

      // Цвета рейтинга
      if (rating === 0 || rating === 0.0) {
        el.style.color = "#ffffff"; // Белый для 0.0
      } else if (rating <= 3) {
        el.style.color = "#e74c3c";
      } else if (rating <= 5) {
        el.style.color = "#e67e22";
      } else if (rating <= 6.5) {
        el.style.color = "#f1c40f";
      } else if (rating < 8) {
        el.style.color = "#3498db";
      } else {
        el.style.color = "#2ecc71";
      }
    }
  }

  function init() {
    setTimeout(applyRatingColors, 500);
    new MutationObserver(applyRatingColors).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  if (window.appready) init();
  else {
    Lampa.Listener.follow("app", (e) => {
      if (e.type === "ready") init();
    });
  }
})();
