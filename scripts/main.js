// Redirection automatique vers #s01 au chargement de la page si pas de hash dans l'URL
document.addEventListener("DOMContentLoaded", function () {
  // Si on est sur la page d'accueil ou si le hash est #s00, scroll vers #s01
  if (location.hash === "#s00" || !location.hash) {
    // Utilise scrollIntoView pour un scroll immédiat et fiable
    const s01 = document.getElementById("s01");
    if (s01) {
      s01.scrollIntoView({ behavior: "auto" });
      // Met à jour le hash dans l'URL
      history.replaceState(null, null, "#s01");
    }
  }
});

// S00 /SCROLLY VIDEO SUPPLÉMENTAIRE/
if (window.ScrollyVideo) {
  new ScrollyVideo({
    scrollyVideoContainer: "scrolly-video-00", // ID du conteneur de S00
    src: "./assets/videos/Galerie_V1.mp4", // Chemin vers ta vidéo S00
  });
}

// S01 /VIDEO INTRODUCTION TYPEWRITER/ S01
if (window.ScrollyVideo) {
  new ScrollyVideo({
    scrollyVideoContainer: "scrolly-video", // ID du conteneur de S01
    src: "./assets/videos/intro_typewriter_v1.3-12s.mp4", // Chemin vers ta vidéo S01
  });
}

// S02 /ELBERT HUBBARD/ S02
// Effet typewriter sur chapter-1-title
document.addEventListener('DOMContentLoaded', () => {
  const chapterTitle = document.querySelector('.chapter-1-title__text');
  if (!chapterTitle) return;

  const titleFull = chapterTitle.dataset.fulltext || chapterTitle.textContent.trim();
  const speedFactor = 1.5; // adapte si besoin
  const totalChars = Math.floor(titleFull.length * speedFactor);

  function typewriterTitleOnScroll() {
    const titleRect = chapterTitle.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const percent = Math.min(1, Math.max(0, 1 - titleRect.top / windowHeight));
    const charsToShow = Math.floor(percent * totalChars);

    chapterTitle.textContent = titleFull.slice(0, charsToShow);
  }

  window.addEventListener('scroll', typewriterTitleOnScroll);
  typewriterTitleOnScroll();
});
// effet typewriter sur citation-banner
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('typewriter-effect');
  const line1Span = banner.querySelector('.citation-banner-line1');
  const line2Span = banner.querySelector('.citation-banner-line2');
  const line1Full = "Art is not a thing";
  const line2Full = "it is a way";
  const speedFactor = 2; // 0.5 = deux fois plus lent, 2 = deux fois plus rapide
  const totalChars = Math.floor((line1Full.length + line2Full.length) * speedFactor);
  const triggerPercent = 1; // effet typewriter qui commence sur la seconde ligne à 90% de la première ligne

  function typewriterOnScroll() {
    const bannerRect = banner.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const percent = Math.min(1, Math.max(0, 1 - bannerRect.top / windowHeight));
    const charsToShow = Math.floor(percent * totalChars);

    let line1 = "";
    let line2 = "";

    const line1Trigger = Math.floor(line1Full.length * triggerPercent);

    if (charsToShow <= line1Trigger) {
      line1 = line1Full.slice(0, charsToShow);
      line2 = "";
    } else {
      line1 = line1Full.slice(0, Math.min(charsToShow, line1Full.length));
      const line2Chars = charsToShow - line1Trigger;
      line2 = line2Full.slice(0, Math.max(0, line2Chars));
    }

    line1Span.textContent = line1;
    line2Span.textContent = line2;
  }

  window.addEventListener('scroll', typewriterOnScroll);
  typewriterOnScroll();
});

// Effet typewriter sur #chapter-2-title__text
document.addEventListener('DOMContentLoaded', () => {
  const chapterTitle = document.querySelector('.chapter-2-title__text');
  if (!chapterTitle) return;

  const titleFull = chapterTitle.dataset.fulltext || "";
  let animationStarted = false;

  // Le texte n'est pas visible au départ
  chapterTitle.textContent = "";

  ScrollTrigger.create({
    trigger: ".horizontal-section",
    start: "top top",
    end: () => "+=" + (document.querySelector('.horizontal-wrapper').scrollWidth - window.innerWidth),
    scrub: true,
    onUpdate: self => {
      if (self.progress >= 0.99 && !animationStarted) {
        animationStarted = true;
        let i = 0;
        function typeWriter() {
          if (i < titleFull.length) {
            chapterTitle.textContent += titleFull.charAt(i);
            i++;
            setTimeout(typeWriter, 70); //vitesse ms entre chaque lettre
          }
        }
        typeWriter();
      }
    }
  });
});

// Livre 3D
document.addEventListener("DOMContentLoaded", function () {
    const book = document.querySelector('.book3d-book figure.book3d-book');
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const triggerPoint = window.innerHeight / 3;
        return (
            rect.top < triggerPoint && rect.bottom > triggerPoint
        );
    }
    function checkScroll() {
        if (isInViewport(book)) {
            book.classList.add('open');
        } else {
            book.classList.remove('open');
        }
    }
    window.addEventListener('scroll', checkScroll);
    checkScroll();
});

// SCROLL HORIZONTAL GSAP
document.addEventListener("DOMContentLoaded", function () {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = document.querySelector('.horizontal-wrapper');
    if (!wrapper) return;

    // Correction : calcule le nombre de sections et adapte la hauteur de la section horizontale
    const sectionCount = wrapper.children.length;
    const horizontalSection = document.querySelector('.horizontal-section');
    if (horizontalSection) {
      horizontalSection.style.height = `${window.innerHeight * sectionCount}px`;
    }

    function getScrollAmount() {
      return -(wrapper.scrollWidth - window.innerWidth);
    }

    const tween = gsap.to(wrapper, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-section",
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // markers: true
      }
    });

    // Recalcule à chaque resize
    window.addEventListener('resize', () => {
      if (horizontalSection) {
        horizontalSection.style.height = `${window.innerHeight * sectionCount}px`;
      }
      ScrollTrigger.refresh();
    });
  }
});

// Dropdown menu
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Ferme le dropdown si on clique ailleurs
window.onclick = function(event) {
  if (!event.target.closest('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}




