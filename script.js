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
  // Sélection des éléments
  const dropup = document.querySelector(".dropup");
  const switchBtn = document.getElementById("switch-article-oeuvre");
  const section2 = document.getElementById("s02");
  const menuBtn = document.getElementById("menu-btn");
  const dropupContent = document.querySelector(".dropup-content");
  const progressBar = document.getElementById('progress-bar');

  function toggleMenuButtons() {
    if (!section2 || !dropup || !switchBtn) return;
    const section2Top = section2.getBoundingClientRect().top + window.scrollY;
    const triggerScroll = section2Top - window.innerHeight / 2;

    if (window.scrollY >= triggerScroll) {
      dropup.style.display = "flex";
      switchBtn.style.display = "flex";
    } else {
      dropup.style.display = "none";
      switchBtn.style.display = "none";
      if (dropupContent) dropupContent.style.display = "none";
    }
  }

  window.addEventListener("scroll", toggleMenuButtons);
  toggleMenuButtons();

  // Progression dans le bouton Menu
  window.addEventListener('scroll', function() {
    if (!progressBar || !section2) return;
    const section2Top = section2.getBoundingClientRect().top + window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight - section2Top;
    const scrollTop = window.scrollY - section2Top;
    let progress = (scrollTop / docHeight) * 100;
    progress = Math.max(0, Math.min(100, progress));
    progressBar.style.width = progress + '%';
  });

  // Toggle du menu déroulant au clic sur le bouton menu
  if (menuBtn && dropupContent) {
    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (dropupContent.style.display === "block") {
        dropupContent.style.display = "none";
      } else {
        dropupContent.style.display = "block";
      }
    });

    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', function (e) {
      if (!dropupContent.contains(e.target) && e.target !== menuBtn) {
        dropupContent.style.display = "none";
      }
    });
  }

  // Toggle effet bouton switch
  if (switchBtn) {
    switchBtn.addEventListener('click', function() {
      switchBtn.classList.toggle('active');
    });
  }

  // Fonction typewriter qui conserve le style HTML
  function typeWriterHTML(element, html, i, speed = 70) {
      if (i <= html.length) {
          element.innerHTML = html.slice(0, i);
          i++;
          setTimeout(() => typeWriterHTML(element, html, i, speed), speed);
      }
  }

  // Applique l'effet typewriter à tous les éléments avec la classe ou l'id "typewriter-effect"
  document.querySelectorAll('#typewriter-effect, .typewriter-effect').forEach(typewriterTarget => {
      const originalHTML = typewriterTarget.innerHTML;
      typewriterTarget.innerHTML = ""; // Vide le conteneur

      let typewriterStarted = false;

      // Observer pour déclencher l'effet quand l'élément devient visible
      const observer = new IntersectionObserver(function(entries, observer) {
          entries.forEach(entry => {
              if (entry.isIntersecting && !typewriterStarted) {
                  typewriterStarted = true;
                  typeWriterHTML(typewriterTarget, originalHTML, 0, 70); // 70ms par caractère
                  observer.disconnect();
              }
          });
      }, { threshold: 0.2 }); // 20% du bloc visible

      observer.observe(typewriterTarget);
  });
});

// Initialisation de AOS (le script doit être inclus dans le HTML)
if (window.AOS) {
  AOS.init();
}

// Barre de progression globale (si besoin)
window.addEventListener('scroll', function() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  const globalProgress = document.querySelector('.progress');
  if (globalProgress) globalProgress.style.width = progress + '%';
});

