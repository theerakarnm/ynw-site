/**
 * /thanks page behavior: read t/pos/ref from the query string, show the
 * position, wire the referral link + copy button, and drive the optional
 * second-step profile form (skippable).
 */
import { submitProfile } from "@/lib/api";
import { thanks as c } from "@/data/content";

export function initThanksPage(): void {
  const posEl = document.querySelector<HTMLElement>("[data-thanks-pos]");
  const refEl = document.querySelector<HTMLInputElement>("[data-thanks-ref]");
  const copyBtn = document.querySelector<HTMLButtonElement>("[data-thanks-copy]");
  const form = document.querySelector<HTMLFormElement>("[data-profile-form]");

  const params = new URLSearchParams(location.search);
  const token = params.get("t") ?? "";
  const pos = params.get("pos");
  const ref = params.get("ref");

  if (posEl && pos) posEl.textContent = `#${pos}`;

  let link = "";
  if (refEl) {
    link = ref ? `${location.origin}/?ref=${encodeURIComponent(ref)}` : `${location.origin}/`;
    refEl.value = link;
  }
  copyBtn?.addEventListener("click", async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      copyBtn.textContent = c.copied;
      setTimeout(() => (copyBtn.textContent = c.copy), 1600);
    } catch {
      refEl?.select();
    }
  });

  // Without a profile token there is nothing to save, so the optional step is not offered.
  if (!token) {
    form?.remove();
    document.querySelector("[data-profile-intro]")?.remove();
    return;
  }
  if (!form) return;
  form.querySelector<HTMLInputElement>("[data-profile-token]")!.value = token;
  const busyBtn = form.querySelector<HTMLButtonElement>("[data-profile-save]")!;
  const errorEl = form.querySelector<HTMLElement>("[data-profile-error]")!;

  async function submit(): Promise<void> {
    if (form!.dataset.state === "submitting" || form!.dataset.state === "success") return;
    const company = form!.querySelector<HTMLInputElement>('input[name="company"]')!.value;
    if (company) {
      // honeypot: pretend success, send nothing
      markDone();
      return;
    }
    form!.dataset.state = "submitting";
    busyBtn.disabled = true;
    errorEl.textContent = "";
    try {
      await submitProfile({
        token: form!.querySelector<HTMLInputElement>("[data-profile-token]")!.value,
        name: optional("name"),
        role: optional("role"),
        use_case_text: optional("use_case_text"),
      });
      markDone();
    } catch {
      form!.dataset.state = "failure";
      busyBtn.disabled = false;
      errorEl.textContent = c.saveError;
    }
  }

  function optional(name: string): string | undefined {
    const el = form!.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[name="${name}"]`);
    const value = el?.value.trim();
    return value ? value : undefined;
  }

  function markDone(): void {
    form!.dataset.state = "success";
    busyBtn.disabled = false;
    const fields = form!.querySelectorAll<HTMLInputElement>("input, select, textarea, button");
    fields.forEach((el) => (el.disabled = true));
    errorEl.textContent = c.saved;
    errorEl.style.color = "var(--success)";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    void submit();
  });
  form.querySelector<HTMLButtonElement>("[data-profile-skip]")?.addEventListener("click", markDone);
}
