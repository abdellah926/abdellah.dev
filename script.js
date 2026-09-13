// 1. Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}

// 2. Cursor Glow Follower
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
  window.addEventListener('pointermove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

// 3. Scroll & Interactions
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Roadmap Spine Scroll Progress
      const spineGlow = document.getElementById('spineGlow');
      if (spineGlow) {
        ScrollTrigger.create({
          trigger: '.timeline-container',
          start: 'top 75%',
          end: 'bottom 60%',
          onUpdate: (self) => {
            spineGlow.style.height = `${(self.progress * 100).toFixed(1)}%`;
          }
        });
      }

      // Timeline Nodes Stagger & Fade-in
      const nodes = document.querySelectorAll('.timeline-node');
      nodes.forEach((node) => {
        const isLeft = node.classList.contains('left');
        const card = node.querySelector('.roadmap-card');
        const anchor = node.querySelector('.node-anchor');

        if (card) {
          gsap.fromTo(card,
            { opacity: 0, x: isLeft ? -40 : 40, y: 20 },
            {
              scrollTrigger: {
                trigger: node,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
                onEnter: () => node.classList.add('active-node'),
                onLeaveBack: () => node.classList.remove('active-node')
              },
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.8,
              ease: 'power3.out'
            }
          );
        }

        if (anchor) {
          gsap.fromTo(anchor,
            { scale: 0, opacity: 0 },
            {
              scrollTrigger: {
                trigger: node,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
              },
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: 'back.out(1.7)'
            }
          );
        }
      });

      // Contact Card Entrance
      gsap.fromTo('.contact-card',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    }
  }

  // 4. Vanilla Tilt
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      reverse: true,
      max: 8,
      speed: 800,
      glare: true,
      "max-glare": 0.2,
      perspective: 1200
    });
  }

  // 5. Image Lightbox (Keyframe Zoom Focus)
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

  function openLightbox(imgSrc, captionText) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = captionText || '';
    lightbox.classList.remove('closing');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    lightbox.classList.add('closing');
    setTimeout(() => {
      lightbox.classList.remove('active');
      lightbox.classList.remove('closing');
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }, 320);
  }

  // Click on zoomable box or image
  document.querySelectorAll('.zoomable-box').forEach(box => {
    box.addEventListener('click', () => {
      const img = box.querySelector('img');
      if (img) {
        openLightbox(img.currentSrc || img.src, img.alt);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
});
