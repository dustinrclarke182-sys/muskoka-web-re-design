// Mobile dropdown menu for the Heart of Muskoka redesign concept.
// No libraries: just a button that shows/hides the nav and keeps
// aria-expanded in sync so screen readers know the menu's state.

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  // Same width as the desktop breakpoint in styles.css.
  var desktop = window.matchMedia('(min-width: 900px)');

  function openMenu() {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu(returnFocus) {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    // Put keyboard focus back on the button so the user isn't "lost".
    if (returnFocus) toggle.focus();
  }

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  toggle.addEventListener('click', function () {
    if (isOpen()) {
      closeMenu(false);
    } else {
      openMenu();
    }
  });

  // Escape closes the menu (a standard keyboard expectation).
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      closeMenu(true);
    }
  });

  // Choosing a link jumps to that section, so close the menu.
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu(false);
  });

  // Tapping or clicking anywhere outside the header closes it too.
  document.addEventListener('click', function (event) {
    if (isOpen() && !event.target.closest('.site-header')) closeMenu(false);
  });

  // If the window is resized to desktop width, reset to a clean state.
  desktop.addEventListener('change', function () {
    closeMenu(false);
  });
});
