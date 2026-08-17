const header = `
<header class="hero">
  <nav class="navbar navbar-expand-lg navbar-dark py-4">
    <div class="container-fluid px-4 px-lg-5">

      <a class="navbar-brand d-flex align-items-center" href="../../index.html">
        <span class="brand-mark">III</span>
        <span class="brand-name ms-2">AUGMENT DESIGN</span>
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-3">

          <li class="nav-item">
            <a class="nav-link" href="../../index.html#work">Work</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="../../index.html#web">Web</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="../../index.html#qa">QA</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="../../index.html#design">Design</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="../../index.html#photo">Photo</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="../../index.html#about">About</a>
          </li>

          <li class="nav-item ms-lg-2">
            <a class="btn btn-light contact-btn" href="../../index.html#contact">
              Contact
            </a>
          </li>

        </ul>
      </div>

    </div>
  </nav>
</header>
`;

const footer = `
<footer class="site-footer py-4">
  <div class="container text-center">
    <small>
      © 2026 iiiaugmentdesigniii
    </small>
  </div>
</footer>
`;

const headerContainer = document.getElementById("site-header");
const footerContainer = document.getElementById("site-footer");

if (headerContainer) {
  headerContainer.innerHTML = header;
}

if (footerContainer) {
  footerContainer.innerHTML = footer;
}
