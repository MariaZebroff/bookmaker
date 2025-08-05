import { fetchTopBK } from "./data.js";

fetchTopBK("exclusive").then((data) => console.log("Exclusive:", data));
fetchTopBK("no-deposit").then((data) => console.log("No-deposit:", data));

const bookmakerList = document.getElementById("bookmaker-list");

fetchTopBK("all").then((data) => {
  bookmakerList.innerHTML = data
    .map((bk) => {
      const verified = bk.verified ? "verified" : "";
      const amount = +(bk.bonus_amount || 0);
      const thousands = amount / 1000;

      const formattedThousands =
        thousands % 1 === 0 ? thousands.toString() : thousands.toFixed(1);
      const maxStars = 5;
      const stars = Math.round(+(bk.rating || 0));
      let starsHTML = "";
      for (let i = 1; i <= maxStars; i++) {
        const fillClass = i <= stars ? "fill" : "";
        starsHTML += `<div class="star-obj ${fillClass}"></div>`;
      }

      let badge = { class: "display-none", text: "" };

      switch (bk.badge) {
        case "exclusive":
          badge.class = "excl";
          badge.text = "Эксклюзив";
          break;
        case "no-deposit":
          badge.class = "no-dep";
          badge.text = "Без депозита";
          break;
        case "no-bonus":
          badge.class = "no-bonus";
          badge.text = "Нет бонуса";
          break;
        default:
          break;
      }

      return `
        <li class="bookmaker-item border-outline-main">
              <div class="bookmaker-logo-wrapper ${verified}">
                <img
                  src="${bk.logo}"
                  alt="Логотип букмекера"
                  class="bookmaker-logo"
                />
              </div>
              <a href="#">
                <div class="stars item-font" aria-label="Рейтинг: ${bk.rating} из 5">
                  ${starsHTML}
                  <div class="star-rate">${bk.rating}</div>
                </div>
              </a>
              <div class="messages item-font">
                <i></i>
                <div>${bk.review_count}</div>
              </div>

              <div class="bonuses item-font">
                <p class="badge ${badge.class}">${badge.text}</p>
                <div class="bonus-total">
                  <i></i>
                  <div>${formattedThousands}K ₽</div>
                </div>
              </div>

              <div class="button-wrapper">
                <a href="${bk.internal_link}" class="internal-link btn">Обзор</a>
                <a
                  href="${bk.external_link}"
                  target="_blank"
                  rel="noopener"
                  class="external-link btn"
                  >Сайт</a
                >
              </div>
            </li>
      `;
    })
    .join("");
});

function setupTabSwitching() {
  const tabNav = document.querySelector(".tabs.border-outline-main");
  const tabLinks = tabNav.querySelectorAll("ul li a");

  tabLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      tabLinks.forEach((link) => {
        link.parentElement.classList.remove("active");
      });

      e.target.parentElement.classList.add("active");

      const tabType = e.target.dataset.type;
      console.log("Switched to tab:", tabType);
    });
  });
}

document.addEventListener("DOMContentLoaded", setupTabSwitching);
