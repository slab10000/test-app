/* ==========================================================================
   Nimbus — shared front-end behaviour
   Loaded on every page. Page-specific logic lives in each page's own <script>.
   ========================================================================== */
(function () {
  "use strict";

  /* ----- Theme (dark / light), persisted in localStorage ----- */
  var THEME_KEY = "nimbus-theme";
  var saved = localStorage.getItem(THEME_KEY);
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    var next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
    updateThemeButton();
  }
  function updateThemeButton() {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.textContent = dark ? "☀️" : "🌙";
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    btn.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
  }

  /* ----- Toast notifications ----- */
  window.toast = function (msg) {
    var stack = document.getElementById("toastStack");
    if (!stack) {
      stack = document.createElement("div");
      stack.id = "toastStack";
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    var el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.textContent = msg;
    stack.appendChild(el);
    setTimeout(function () {
      el.style.transition = "opacity .3s ease";
      el.style.opacity = "0";
      setTimeout(function () { el.remove(); }, 300);
    }, 2400);
  };

  /* ----- Cart count (shared across pages via localStorage) ----- */
  var CART_KEY = "nimbus-cart-count";
  window.nimbusCart = {
    get: function () { return parseInt(localStorage.getItem(CART_KEY) || "0", 10); },
    set: function (n) { localStorage.setItem(CART_KEY, String(Math.max(0, n))); updateCartBadge(); },
    add: function (n) { this.set(this.get() + (n || 1)); }
  };
  function updateCartBadge() {
    var badge = document.getElementById("cartBadge");
    if (!badge) return;
    var n = window.nimbusCart.get();
    badge.textContent = String(n);
    badge.style.display = n > 0 ? "grid" : "none";
  }

  /* ----- Wire everything up after DOM is ready ----- */
  function init() {
    // Highlight the active nav link based on <body data-page="...">
    var page = document.body.getAttribute("data-page");
    if (page) {
      document.querySelectorAll(".nav__link").forEach(function (link) {
        if (link.getAttribute("data-nav") === page) link.classList.add("is-active");
      });
    }

    var themeBtn = document.getElementById("themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
    updateThemeButton();

    var menuBtn = document.getElementById("menuToggle");
    var links = document.querySelector(".nav__links");
    if (menuBtn && links) {
      menuBtn.addEventListener("click", function () { links.classList.toggle("is-open"); });
    }

    updateCartBadge();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
