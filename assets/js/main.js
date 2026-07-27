// Casa Nova Projetos — scripts do site

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Menu flyout ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var flyoutMenu = document.getElementById('flyoutMenu');
  var flyoutOverlay = document.getElementById('flyoutOverlay');
  var flyoutClose = document.getElementById('flyoutClose');

  function openMenu() {
    flyoutMenu.classList.add('active');
    flyoutOverlay.classList.add('active');
  }
  function closeMenu() {
    flyoutMenu.classList.remove('active');
    flyoutOverlay.classList.remove('active');
  }
  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (flyoutClose) flyoutClose.addEventListener('click', closeMenu);
  if (flyoutOverlay) flyoutOverlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.flyout-menu a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  /* ---------- Hero rotating headline ---------- */
  var rotator = document.getElementById('heroRotator');
  if (rotator) {
    var words = ['TRANSFORMAMOS', 'CONCRETIZAMOS', 'MATERIALIZAMOS'];
    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % words.length;
      rotator.style.animation = 'none';
      rotator.offsetHeight; // reflow
      rotator.style.animation = null;
      rotator.textContent = words[idx];
    }, 2500);
  }

  /* ---------- Espaços slider ---------- */
  var slider = document.getElementById('espacosSlider');
  if (slider) {
    var categories = [
      { title: 'Sala de Estar', desc: 'Ambiente único, acolhedor e sofisticado.' },
      { title: 'Cozinha', desc: 'Conjunto de funcionalidade, beleza e sofisticação.' },
      { title: 'Closet', desc: 'Organização, elegância e sofisticação ao guardar suas roupas.' },
      { title: 'Banheiro', desc: 'Sofisticação e beleza para seus momentos íntimos.' },
      { title: 'Espaço Gourmet', desc: 'Ambiente perfeito para reunir família e amigos.' },
      { title: 'Escritório', desc: 'Ambiente contemporâneo, unindo funcionalidade e flexibilidade.' }
    ];

    var bgImgs = document.querySelectorAll('#espacosBg img');
    var thumbs = document.querySelectorAll('#espacosThumbs button');
    var titleEl = document.getElementById('espacosTitle');
    var descEl = document.getElementById('espacosDesc');
    var current = 0;
    var timer;

    function goTo(i) {
      current = (i + categories.length) % categories.length;
      bgImgs.forEach(function (img, n) { img.classList.toggle('active', n === current); });
      thumbs.forEach(function (btn, n) { btn.classList.toggle('active', n === current); });
      titleEl.textContent = categories[current].title;
      descEl.textContent = categories[current].desc;
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
      clearInterval(timer);
      timer = setInterval(next, 5000);
    }

    document.getElementById('espacosNext').addEventListener('click', function () { next(); startAutoplay(); });
    document.getElementById('espacosPrev').addEventListener('click', function () { prev(); startAutoplay(); });
    thumbs.forEach(function (btn, n) {
      btn.addEventListener('click', function () { goTo(n); startAutoplay(); });
    });

    startAutoplay();
  }

  /* ---------- Portfolio: filters ---------- */
  var filterButtons = document.querySelectorAll('#galleryFilters button');
  var galleryItems = document.querySelectorAll('#galleryGrid .gallery-item');

  if (filterButtons.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          var show = filter === 'all' || item.getAttribute('data-cat') === filter;
          item.classList.toggle('hide', !show);
        });
      });
    });
  }

  /* ---------- Portfolio: lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxClose = document.getElementById('lightboxClose');
    var lightboxPrev = document.getElementById('lightboxPrev');
    var lightboxNext = document.getElementById('lightboxNext');
    var visibleItems = [];
    var lightboxIndex = 0;

    function getVisibleItems() {
      return Array.prototype.filter.call(galleryItems, function (item) {
        return !item.classList.contains('hide');
      });
    }

    function openLightbox(item) {
      visibleItems = getVisibleItems();
      lightboxIndex = visibleItems.indexOf(item);
      showLightboxImage();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function showLightboxImage() {
      var item = visibleItems[lightboxIndex];
      if (!item) return;
      lightboxImg.src = item.getAttribute('href');
      lightboxImg.alt = item.querySelector('img').alt;
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    galleryItems.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        openLightbox(item);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    lightboxNext.addEventListener('click', function () {
      lightboxIndex = (lightboxIndex + 1) % visibleItems.length;
      showLightboxImage();
    });
    lightboxPrev.addEventListener('click', function () {
      lightboxIndex = (lightboxIndex - 1 + visibleItems.length) % visibleItems.length;
      showLightboxImage();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') lightboxNext.click();
      if (e.key === 'ArrowLeft') lightboxPrev.click();
    });
  }

});
