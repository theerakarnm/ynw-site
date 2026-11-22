/**
 * Accounts scene marking. No GSAP: hover, focus or click on a card or a column header sets
 * data-account on the scene (CSS marks the card and the table column) and aria-pressed on the cards.
 */
export function initAccounts(): void {
  const scene = document.querySelector<HTMLElement>("[data-accounts]");
  if (!scene) return;
  const cards = scene.querySelectorAll<HTMLElement>(".acc-card");

  scene.querySelectorAll<HTMLElement>("[data-account-pick]").forEach((el) => {
    const pick = () => {
      scene.dataset.account = el.dataset.accountPick;
      cards.forEach((card) => card.setAttribute("aria-pressed", String(card.dataset.accountPick === el.dataset.accountPick)));
    };
    el.addEventListener("pointerenter", pick);
    el.addEventListener("focus", pick);
    el.addEventListener("click", pick);
  });
}
