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
document.addEventListener('DOMContentLoaded', () => {
  // --- Sélection des éléments ---
  const chapterTitle1 = document.querySelector('.chapter-1-title__text');
  const chapterTitle2 = document.querySelector('.chapter-2-title__text');
  const chapterTitle3 = document.querySelector('.chapter-3-title__text');
  const citationLine1 = document.querySelector('.citation-banner-line1');
  const citationLine2 = document.querySelector('.citation-banner-line2');
  const audio = document.getElementById('typewriter-audio');

  // --- Textes complets ---
  const titleFull1 = chapterTitle1?.dataset.fulltext || chapterTitle1?.textContent.trim() || "";
  const titleFull2 = chapterTitle2?.dataset.fulltext || chapterTitle2?.textContent.trim() || "";
  const titleFull3 = chapterTitle3?.dataset.fulltext || chapterTitle3?.textContent.trim() || "";
  const citationText1 = citationLine1?.dataset.fulltext || citationLine1?.textContent.trim() || "Art is not a thing";
  const citationText2 = citationLine2?.dataset.fulltext || citationLine2?.textContent.trim() || "it is a way.";

  // --- Reset les contenus ---
  if (chapterTitle1) chapterTitle1.textContent = "";
  if (chapterTitle2) chapterTitle2.textContent = "";
  if (chapterTitle3) chapterTitle3.textContent = "";
  if (citationLine1) citationLine1.textContent = "";
  if (citationLine2) citationLine2.textContent = "";

  // --- Pour éviter de relancer une animation déjà faite ---
  let done = {
    chapter1: false,
    chapter2: false,
    chapter3: false,
    citation: false
  };

  // --- Fonction utilitaire pour savoir si un élément est visible à l'écran ---
  function isInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  }

  // --- Fonction typewriter générique avec audio ---
  function typeWriterWithAudio(el, fullText, speed, cb) {
    let i = 0;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
    function write() {
      if (i < fullText.length) {
        el.textContent += fullText.charAt(i);
        i++;
        setTimeout(write, speed);
      } else {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
        if (cb) cb();
      }
    }
    write();
  }

  // --- Fonction typewriter pour la citation (joue l'audio sur la première ligne) ---
  function typeWriterCitation(line1, line2, text1, text2, speed) {
    let j = 0, k = 0;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
    function write1() {
      if (j < text1.length) {
        line1.textContent += text1.charAt(j);
        j++;
        setTimeout(write1, speed);
      } else {
        write2();
      }
    }
    function write2() {
      if (k < text2.length) {
        line2.textContent += text2.charAt(k);
        k++;
        setTimeout(write2, speed);
      } else {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    }
    write1();
  }

  // --- Handler du clic ---
  function handleTypewriterClick() {
    // Chapter 1
    if (!done.chapter1 && isInViewport(chapterTitle1)) {
      done.chapter1 = true;
      typeWriterWithAudio(chapterTitle1, titleFull1, 70);
      return;
    }
    // Citation banner
    if (!done.citation && isInViewport(citationLine1)) {
      done.citation = true;
      typeWriterCitation(citationLine1, citationLine2, citationText1, citationText2, 50);
      return;
    }
    // Chapter 2
    if (!done.chapter2 && isInViewport(chapterTitle2)) {
      done.chapter2 = true;
      typeWriterWithAudio(chapterTitle2, titleFull2, 70);
      return;
    }
    // Chapter 3
    if (!done.chapter3 && isInViewport(chapterTitle3)) {
      done.chapter3 = true;
      typeWriterWithAudio(chapterTitle3, titleFull3, 70);
      return;
    }
  }

  // --- Ajoute l'écouteur de clic ---
  window.addEventListener('click', handleTypewriterClick);
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
document.querySelectorAll('.horizontal-section').forEach(horizontalSection => {
  const wrapper = horizontalSection.querySelector('.horizontal-wrapper');
  if (!wrapper) return;

  function getScrollAmount() {
    return -(wrapper.scrollWidth - window.innerWidth);
  }
  const scrollAmount = Math.abs(getScrollAmount());
  const minHeight = Math.max(window.innerHeight, scrollAmount + window.innerHeight);
  horizontalSection.style.height = `${minHeight}px`;

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
    const scrollAmount = Math.abs(getScrollAmount());
    const minHeight = Math.max(window.innerHeight, scrollAmount + window.innerHeight);
    horizontalSection.style.height = `${minHeight}px`;
    ScrollTrigger.refresh();
  });
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

// Animation GSAP de rotation continue et douce du bouton gear
if (window.gsap) {
  gsap.to('.svg-gear-btn-icon', {
    rotation: 360,
    repeat: -1,
    ease: "linear",
    duration: 15, // 4 secondes pour un tour complet, ajuste pour la vitesse
    transformOrigin: "50% 50%"
  });
}

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

// Dropdown pour TheOriginalArtTypingPieceElements
document.addEventListener('DOMContentLoaded', () => {
  const artDropdownBtn = document.querySelector('.art-dropbtn');
  const artDropdownContent = document.getElementById('artDropdown');

  window.toggleArtDropdown = function() {
    if (!artDropdownContent) return;
    artDropdownContent.classList.toggle('show');
  };

  // Ferme le dropdown si on clique ailleurs
  window.addEventListener('click', function(event) {
    if (
      !event.target.closest('.art-dropdown-content') &&
      !event.target.closest('.art-dropbtn')
    ) {
      artDropdownContent && artDropdownContent.classList.remove('show');
    }
  });
});

// Effet typewriter sur le premier keystroke
document.addEventListener('DOMContentLoaded', () => {
  const firstKeystroke = document.querySelector('.first-keystroke-typewriter');
  if (!firstKeystroke || !window.ScrollTrigger) return;

  const fullText = firstKeystroke.dataset.fulltext || firstKeystroke.textContent.trim();
  let started = false;
  firstKeystroke.textContent = "";

  ScrollTrigger.create({
    trigger: "#s06",
    start: "top center", // quand le haut de S06 atteint le centre du viewport
    onEnter: () => {
      if (!started) {
        started = true;
        let i = 0;
        function typeWriter() {
          if (i < fullText.length) {
            firstKeystroke.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
          }
        }
        typeWriter();
      }
    }
  });
});

// Activation de l'audio par un bouton
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('enable-audio-btn');
  const chapterTitle1 = document.querySelector('.chapter-1-title__text');
  const audio = document.getElementById('typewriter-audio');
  if (!btn || !chapterTitle1 || !audio) return;

  const titleFull1 = chapterTitle1.dataset.fulltext || chapterTitle1.textContent.trim();
  chapterTitle1.textContent = "";

  btn.addEventListener('click', () => {
    btn.style.display = 'none'; // cache le bouton après clic
    audio.currentTime = 0;
    audio.play().then(() => {
      let i = 0;
      function typeWriter1() {
        if (i < titleFull1.length) {
          chapterTitle1.textContent += titleFull1.charAt(i);
          i++;
          setTimeout(typeWriter1, 70);
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
      }
      typeWriter1();
    });
  });
});

// ajout images cliquables

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.toggle-img-on-click').forEach(function(img) {
    const originalSrc = img.getAttribute('src');
    const newSrc = img.getAttribute('data-new-src');
    img.addEventListener('click', function() {
      if (img.getAttribute('src') === originalSrc) {
        img.setAttribute('src', newSrc);
      } else {
        img.setAttribute('src', originalSrc);
      }
    });
  });
});







