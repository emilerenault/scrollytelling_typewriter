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
  // =========================
  // 1. MENU DROPDOWN
  // =========================
  const menuBtn = document.getElementById('menu-btn');
  const dropupContent = document.querySelector('.dropup-content');
  if (menuBtn && dropupContent) {
      menuBtn.addEventListener('click', function (e) {
          dropupContent.style.display = dropupContent.style.display === "block" ? "none" : "block";
          e.stopPropagation();
      });
      document.addEventListener('click', function (e) {
          if (!dropupContent.contains(e.target) && e.target !== menuBtn) {
              dropupContent.style.display = "none";
          }
      });
  }


  // =========================
  // 3. GSAP SCROLL HORIZONTAL ENTRE S02 ET S03
  // =========================
  if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(".horizontal-wrapper", {
          x: () => -(document.querySelector(".horizontal-wrapper").scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
              trigger: ".horizontal-section",
              start: "top top",
              end: () => "+=" + document.querySelector(".horizontal-wrapper").scrollWidth,
              scrub: true,
              pin: true,
              anticipatePin: 1
          }
      });
  }

  // =========================
  // 5. BARRE DE PROGRESSION GLOBALE
  // =========================
  window.addEventListener('scroll', function() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      const globalProgress = document.querySelector('.progress');
      if (globalProgress) globalProgress.style.width = progress + '%';
  });

  // =========================
  // 6. TOGGLE MENU BUTTON VISIBILITY
  // =========================
  const menuFixed = document.querySelector('.menu-fixed-bottom');
  const section2 = document.getElementById('s02');

  function toggleMenuBtnVisibility() {
      if (!menuFixed || !section2) return;
      const section2Top = section2.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY + window.innerHeight > section2Top) {
          menuFixed.style.display = "flex";
      } else {
          menuFixed.style.display = "none";
      }
  }

  window.addEventListener('scroll', toggleMenuBtnVisibility);
  toggleMenuBtnVisibility(); // Pour l'état initial au chargement

  // =========================
  // TYPEWRITER EFFECT BANNIERE (synchronisé au scroll)
  // =========================
  const banner = document.getElementById('typewriter-effect');
  const bannerText = "Art is not a thing<br>it is a way";
  const bannerTextPlain = "Art is not a thing\nit is a way"; // Pour le calcul sans balises HTML
  const intro = document.querySelector('.PhotoElbertPlusTexteIntro');

  function typewriterOnScroll() {
      if (!banner) return;
      const bannerRect = banner.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Commence l'effet quand la bannière entre dans le viewport
      if (bannerRect.top < windowHeight && bannerRect.bottom > 0) {
          // Pourcentage de scroll sur la bannière
          const percent = Math.min(1, Math.max(0, 1 - bannerRect.top / windowHeight));
          const totalChars = bannerTextPlain.length;
          const charsToShow = Math.floor(percent * totalChars);

          // Reconstruit le texte avec le <br>
          let displayText = bannerTextPlain.slice(0, charsToShow)
              .replace('\n', '<br>');
          banner.innerHTML = displayText;

          // Affiche le bloc suivant uniquement si tout le texte est écrit
          if (charsToShow >= totalChars) {
              if (intro) intro.classList.add('visible');
          }
          // On ne retire plus la classe ici !
      } else if (bannerRect.bottom <= 0) {
          // Si la bannière est complètement sortie par le haut, on ne fait rien (le bloc reste visible)
          banner.innerHTML = bannerText; // Affiche le texte complet si besoin
      } else {
          // Si on remonte et que la bannière n'est plus dans le viewport (trop haut), efface le texte et masque le bloc suivant
          banner.innerHTML = "";
          if (intro) intro.classList.remove('visible');
      }
  }

  window.addEventListener('scroll', typewriterOnScroll);
  typewriterOnScroll(); // Pour l'état initial
});

// Barre de progression dans le bouton Menu
window.addEventListener('scroll', function() {
  const section2 = document.getElementById("s02");
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar || !section2) return;
  const section2Top = section2.getBoundingClientRect().top + window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight - section2Top;
  const scrollTop = window.scrollY - section2Top;
  let progress = (scrollTop / docHeight) * 100;
  progress = Math.max(0, Math.min(100, progress));
  progressBar.style.width = progress + '%';
});


// Barre de progression globale (si besoin)
window.addEventListener('scroll', function() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  const globalProgress = document.querySelector('.progress');
  if (globalProgress) globalProgress.style.width = progress + '%';
});

