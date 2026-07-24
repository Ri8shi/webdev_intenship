
(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const navOverlay = document.getElementById('nav-overlay');
  const categoryStrip = document.getElementById('category-strip');
  const bentoGrid = document.getElementById('bento-grid');
  const workCount = document.getElementById('work-count');
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightbox-content');
  const lightboxClose = document.getElementById('lightbox-close');

  let lastScrollY = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  function openMobileNav() {
    navToggle.classList.add('active');
    navMobile.classList.add('open');
    navOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    navToggle.classList.remove('active');
    navMobile.classList.remove('open');
    navOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    if (navMobile.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  navOverlay.addEventListener('click', closeMobileNav);

  navMobile.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        var offsetTop = targetEl.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  var pills = categoryStrip.querySelectorAll('.category-pill');
  var cards = bentoGrid.querySelectorAll('.bento-card');

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {

      pills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');

      var category = pill.getAttribute('data-category');
      var visibleCount = 0;

      cards.forEach(function (card) {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      workCount.textContent = 'Showing ' + visibleCount + ' project' + (visibleCount !== 1 ? 's' : '');
    });
  });

  var isDragging = false;
  var startX = 0;
  var scrollLeft = 0;

  categoryStrip.addEventListener('mousedown', function (e) {
    isDragging = true;
    categoryStrip.classList.add('dragging');
    startX = e.pageX - categoryStrip.offsetLeft;
    scrollLeft = categoryStrip.scrollLeft;
  });

  categoryStrip.addEventListener('mouseleave', function () {
    isDragging = false;
    categoryStrip.classList.remove('dragging');
  });

  categoryStrip.addEventListener('mouseup', function () {
    isDragging = false;
    categoryStrip.classList.remove('dragging');
  });

  categoryStrip.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    e.preventDefault();
    var x = e.pageX - categoryStrip.offsetLeft;
    var walk = (x - startX) * 1.5;
    categoryStrip.scrollLeft = scrollLeft - walk;
  });

  function openLightbox(videoId) {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    lightboxContent.innerHTML = '';
    lightboxContent.appendChild(iframe);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(function () {
      lightboxContent.innerHTML = '';
    }, 400);
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      var videoId = card.getAttribute('data-video');
      if (videoId) {
        openLightbox(videoId);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMobileNav();
    }
  });

  var revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  var heroVideoWrap = document.querySelector('.hero-video-wrap');

  if (heroVideoWrap) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      var heroBottom = document.querySelector('.hero').offsetHeight;
      if (scrollY < heroBottom) {
        var translateY = scrollY * 0.08;
        heroVideoWrap.style.transform = 'translateY(' + translateY + 'px)';
      }
    }, { passive: true });
  }

})();
