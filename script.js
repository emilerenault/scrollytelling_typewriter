// Initialisation de ScrollyVideo (le script doit être inclus dans le HTML via <script src="..."></script>)
if (window.ScrollyVideo) {
  new ScrollyVideo({
    scrollyVideoContainer: "scrolly-video", // ID du conteneur
    src: "./videos/ecran_1_v1.3(12s).mp4", // Chemin vers votre vidéo
    autoplay: false,
    muted: true,
    loop: false,
    scrollBased: true,
    pauseWhenNotScrolling: true,
  });
}

// Affichage des boutons sticky à la section 3
document.addEventListener("DOMContentLoaded", function () {
  const stickyButtons = document.querySelectorAll(".sticky-button");
  const section3 = document.getElementById("s03");

  function toggleStickyButtons() {
    if (!section3) return;
    const section3Top = section3.getBoundingClientRect().top;
    const section3Bottom = section3.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    // Affiche les boutons si la section 3 est visible à l'écran
    if (section3Top < windowHeight && section3Bottom > 0) {
      stickyButtons.forEach((button) => {
        button.style.display = "block";
      });
    } else {
      stickyButtons.forEach((button) => {
        button.style.display = "none";
      });
    }
  }

  window.addEventListener("scroll", toggleStickyButtons);
  toggleStickyButtons(); // Pour gérer l'affichage dès le chargement

  // Activation du bouton Article si sur index.html
  const articleButton = document.getElementById("article-button");
  if (articleButton && window.location.pathname.includes("index.html")) {
    articleButton.classList.add("active");
  }

  // Progression dans le bouton Menu
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', function() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
  });
});

// Initialisation de AOS (le script doit être inclus dans le HTML)
if (window.AOS) {
  AOS.init();
}

window.addEventListener('scroll', function() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.querySelector('.progress').style.width = progress + '%';
});