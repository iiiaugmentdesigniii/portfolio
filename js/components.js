const header = `
<header class="site-header">

  <nav class="site-nav" aria-label="Main navigation">

    <div class="nav-container">

      <a class="site-brand" href="/">
        <span class="brand-mark">III</span>
        <span class="brand-name">AUGMENT DESIGN</span>
      </a>

      <button
        class="nav-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="mainNav"
        aria-label="Open navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-menu" id="mainNav">

  <a class="nav-link" href="/">
    Home
  </a>

  <a class="nav-link" href="/#qa">
    QA
  </a>

  <a class="nav-link" href="/#web">
    Web
  </a>

  <a class="nav-link" href="/#react">
    React
  </a>

  <a class="nav-link" href="/#design">
    Design
  </a>

  <a class="nav-link" href="/#photo">
    Photo
  </a>

  <a class="nav-link" href="/#about">
    About
  </a>

  <a class="nav-contact" href="/#contact">
    Contact
  </a>

</div>

    </div>

  </nav>

</header>
`;


const footer = `
<footer class="site-footer">

  <div class="footer-container">

    <small>
      © 2026 iiiaugmentdesigniii
    </small>

  </div>

</footer>
`;


const headerContainer =
  document.getElementById("site-header");

const footerContainer =
  document.getElementById("site-footer");


if (headerContainer) {
  headerContainer.innerHTML = header;
}


if (footerContainer) {
  footerContainer.innerHTML = footer;
}


/* =========================
   MOBILE NAVIGATION
   ========================= */

function setupNavigation() {

  const toggle =
    document.querySelector(".nav-toggle");

  const menu =
    document.querySelector(".nav-menu");


  if (!toggle || !menu) {
    return;
  }


  toggle.addEventListener("click", () => {

    const isOpen =
      menu.classList.toggle("is-open");


    toggle.setAttribute(
      "aria-expanded",
      isOpen
    );


    toggle.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation"
        : "Open navigation"
    );

  });


  const links =
    menu.querySelectorAll("a");


  links.forEach((link) => {

    link.addEventListener("click", () => {

      menu.classList.remove("is-open");

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

      toggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

    });

  });

}


setupNavigation();