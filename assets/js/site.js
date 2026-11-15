// Language switch (EN/FR) — the CSS does the showing and hiding, this only sets <html lang>.
(function () {
  var root = document.documentElement;
  var title = document.querySelector("title");
  var description = document.querySelector('meta[name="description"]');
  var enTitle = title.textContent;
  var enDescription = description.getAttribute("content");

  function apply(lang) {
    root.lang = lang;
    title.textContent = lang === "fr" ? title.dataset.fr : enTitle;
    description.setAttribute("content", lang === "fr" ? description.dataset.fr : enDescription);
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.setLang === lang));
    });
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (b) {
    b.addEventListener("click", function () {
      apply(b.dataset.setLang);
      try { localStorage.setItem("preferredLanguage", b.dataset.setLang); } catch (e) {}
    });
  });
  apply(root.lang === "fr" ? "fr" : "en");

  // Open the contact form when linked to directly.
  var contact = document.getElementById("contact");
  if (contact && location.hash === "#contact") contact.open = true;
})();
