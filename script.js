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

document.addEventListener("DOMContentLoaded", function () {
  // Affichage du bouton menu à partir de la section 2, puis il reste affiché
  const dropup = document.querySelector(".dropup");
  const section2 = document.getElementById("s02");

  function toggleMenuButton() {
    if (!section2 || !dropup) return;
    const section2Top = section2.getBoundingClientRect().top + window.scrollY;
    const triggerScroll = section2Top - window.innerHeight / 2;

    if (window.scrollY >= triggerScroll) {
      dropup.style.display = "flex";
    } else {
      dropup.style.display = "none";
    }
  }

  window.addEventListener("scroll", toggleMenuButton);
  toggleMenuButton(); // Pour gérer l'affichage dès le chargement

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