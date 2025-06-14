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
//----------------------- CH1 /CHAPTER 1 : INTO THE TYPE/ CH1  -----------------------
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
// S03 /LIVRE 3D/ S03
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

// SCROLL HORIZONTAL GSAP ENTRE S03 ET S04
document.addEventListener("DOMContentLoaded", function () {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.horizontal-section').forEach(horizontalSection => {
      const wrapper = horizontalSection.querySelector('.horizontal-wrapper');
      if (!wrapper) return;

      function getScrollAmount() {
        return -(wrapper.scrollWidth - window.innerWidth);
      }

      // Hauteur adaptée pour chaque scroll horizontal
      horizontalSection.style.height = `${window.innerHeight + Math.abs(getScrollAmount())}px`;

      gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSection,
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
        horizontalSection.style.height = `${window.innerHeight + Math.abs(getScrollAmount())}px`;
        ScrollTrigger.refresh();
      });
    });
  }
});

//----------------------- CH2 /CHAPTER 2 : MECHANICAL BODY/ CH2  -----------------------
// S04 MECHANICAL BODY
// Gear dropdown button 
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Animation GSAP pour le gear-dropdown
document.addEventListener('DOMContentLoaded', () => {
  const dropdownBtn = document.querySelector('.gear-dropbtn');
  const dropdownIcon = dropdownBtn.querySelector('.svg-gear-btn-icon');
  const dropdownContent = document.getElementById('myDropdown');

  gsap.set(dropdownContent, {height: 0, opacity: 0, display: "none", overflow: "hidden"});
  gsap.set(dropdownIcon, {rotate: 0, transformOrigin: "50% 50%"});

  window.toggleDropdown = function() {
    const isOpen = dropdownContent.classList.contains('show');
    if (!isOpen) {
      dropdownContent.classList.add('show');
      gsap.set(dropdownContent, {display: "block"});
      gsap.to(dropdownIcon, {
        rotate: 180,
        duration: 0.5,
        ease: "expo.inOut"
      });
      gsap.to(dropdownContent, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "expo.inOut"
      });
    } else {
      gsap.to(dropdownIcon, {
        rotate: 0,
        duration: 0.4,
        ease: "expo.inOut"
      });
      gsap.to(dropdownContent, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "expo.inOut",
        onComplete: () => {
          dropdownContent.classList.remove('show');
          gsap.set(dropdownContent, {display: "none"});
        }
      });
    }
  };

  window.addEventListener('click', function(event) {
    if (
      !event.target.closest('.gear-dropdown-content') &&
      !event.target.closest('.gear-dropbtn')
    ) {
      if (dropdownContent.classList.contains('show')) {
        gsap.to(dropdownIcon, {
          rotate: 0,
          duration: 0.4,
          ease: "expo.inOut"
        });
        gsap.to(dropdownContent, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "expo.inOut",
          onComplete: () => {
            dropdownContent.classList.remove('show');
            gsap.set(dropdownContent, {display: "none"});
          }
        });
      }
    }
  });
});

// Lazy load vidéo quand elle entre dans le viewport
document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video[preload="none"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        if (!video.src) {
          const source = video.querySelector('source');
          video.src = source.getAttribute('src');
        }
        observer.unobserve(video);
      }
    });
  }, { threshold: 0.1 });

  videos.forEach(video => observer.observe(video));
});




