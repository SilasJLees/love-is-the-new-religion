// Love Is The New Religion — site behaviour
// Nav toggle, region toggle, and lightweight form UX.
// Newsletter/contact forms currently no-op locally — see README "Wiring up email" section.

(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Region toggle (Buy page)
  var regionButtons = document.querySelectorAll('[data-region-btn]');
  var regionPanels = document.querySelectorAll('[data-region-panel]');
  regionButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var region = btn.getAttribute('data-region-btn');
      regionButtons.forEach(function (b) { b.classList.toggle('active', b === btn); });
      regionPanels.forEach(function (p) {
        p.classList.toggle('active', p.getAttribute('data-region-panel') === region);
      });
    });
  });

  // Form UX: prevent default, show inline confirmation.
  // Replace this with a real POST to your email provider once one is connected (see README).
  document.querySelectorAll('form[data-signup]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = form.querySelector('.form-success');
      var email = form.querySelector('input[type="email"]');
      if (email && !email.value) return;
      form.querySelectorAll('input, button').forEach(function (el) { el.disabled = true; });
      if (success) success.style.display = 'block';
    });
  });
})();
