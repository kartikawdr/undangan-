/* ============================================
     DATA UNDANGAN
     ============================================ */
const weddingData = {
  groomName: "Ridho Karnawan",
  brideName: "Helen Irnawati Tjandra",
  dateText: "Minggu, 20 September 2026",
  groomParents: "Putra dari<br>Bapak Herman Halim &amp; Almh. Ibu Rina",
  brideParents: "Putri dari<br>Alm. Bapak Tjioe Sak Men &amp; Almh. Ibu Veronica Irawan",

  quoteText: "Dalam sebuah pernikahan kalian disatukan demi sebuah kebahagiaan dengan janji hati untuk saling membahagiakan. Bersamaku engkau akan hidup selamanya karena Tuhan pasti akan memberikan karunia sebagai pelindung dan saksi dalam pernikahan ini. Untuk itulah kalian dipersatukan dalam satu keluarga.",
  quoteSource: "(Rgveda : X.85.36)",

  akad: {
    label: "Pemberkatan Nikah",
    dateTime: "Sabtu, 19 September 2026 &bull; 10.00 WIB",
    place: "Vihara Sad-Saddha",
    address: "Jl. Kp. Kahuripan, RT.001/RW.005, Mekarsari, Kec. Neglasari, Kota Tangerang, Banten 15129",
    mapsUrl: "https://maps.app.goo.gl/GgXsUWLMjg1VQyTa6"
  },

  resepsi: {
    label: "Resepsi",
    dateTime: "Minggu, 20 September 2026 &bull; 18.00 - 21.00 WIB",
    place: "Saung Ibu",
    address: "Jl. Pelor, Kampung Melayu Timur, Kec. Teluknaga, Kabupaten Tangerang, Banten 15510",
    mapsUrl: "https://maps.app.goo.gl/AQ7u5b1XUEig7it2A"
  },

  eventDateTime: "2026-09-19T10:00:00",
  whatsappNumber: "6281234567890"
};

// Helper aman untuk set textContent
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Helper aman untuk set innerHTML
function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

// Helper aman untuk set href
function setHref(id, href) {
  const el = document.getElementById(id);
  if (el) el.href = href;
}

// Mengisi Cover & Data Mempelai
setText('groom-name', weddingData.groomName);
setText('bride-name', weddingData.brideName);
setText('wedding-date-cover', weddingData.dateText);

setText('groom-name-bio', weddingData.groomName);
setText('bride-name-bio', weddingData.brideName);
const groomInit = document.getElementById('groom-initial');
if (groomInit) groomInit.textContent = weddingData.groomName.charAt(0);
const brideInit = document.getElementById('bride-initial');
if (brideInit) brideInit.textContent = weddingData.brideName.charAt(0);

setHTML('groom-parents', weddingData.groomParents);
setHTML('bride-parents', weddingData.brideParents);

// Mengisi elemen pada Home hero
setText('home-groom-name', weddingData.groomName);
setText('home-bride-name', weddingData.brideName);
setText('home-wedding-date', weddingData.dateText);

// Mengisi Quote & Acara
setText('quote-text', weddingData.quoteText);
setText('quote-source', weddingData.quoteSource);

setText('akad-label', weddingData.akad.label);
setHTML('akad-datetime', weddingData.akad.dateTime);
setText('akad-place', weddingData.akad.place);
setText('akad-address', weddingData.akad.address);
setHref('akad-maps', weddingData.akad.mapsUrl);

setText('resepsi-label', weddingData.resepsi.label);
setHTML('resepsi-datetime', weddingData.resepsi.dateTime);
setText('resepsi-place', weddingData.resepsi.place);
setText('resepsi-address', weddingData.resepsi.address);
setHref('resepsi-maps', weddingData.resepsi.mapsUrl);

setText('groom-name-closing', weddingData.groomName);
setText('bride-name-closing', weddingData.brideName);

/* ============================================
   TANGKAP NAMA TAMU DARI LINK (URL PARAMETER)
   ============================================ */
const urlParams = new URLSearchParams(window.location.search);
const guestFromUrl = urlParams.get('to');
setText('guest-name', guestFromUrl ? guestFromUrl : 'Bapak/Ibu/Saudara/i');

/* ============================================
   FUNGSI BUKA UNDANGAN & PEMUTAR MUSIK
   ============================================ */
const openBtn = document.getElementById('open-btn');
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

function playMusic() {
  if (bgMusic) {
    bgMusic.play().then(() => {
      if (musicBtn) musicBtn.classList.add('playing');
    }).catch(err => console.log('Autoplay blocked:', err));
  }
}

function toggleMusic() {
  if (bgMusic) {
    if (bgMusic.paused) {
      bgMusic.play();
      if (musicBtn) musicBtn.classList.add('playing');
    } else {
      bgMusic.pause();
      if (musicBtn) musicBtn.classList.remove('playing');
    }
  }
}

if (openBtn) {
  openBtn.addEventListener('click', function () {
    const wrapper = document.getElementById('wrapper');
    if (wrapper) wrapper.classList.add('opened');
    document.body.classList.add('scroll-unlocked');
    playMusic();
  });
}

if (musicBtn) {
  musicBtn.addEventListener('click', toggleMusic);
}

/* ============================================
   FUNGSI MODAL ZOOM FOTO MEMPELAI
   ============================================ */
/* ============================================
   FUNGSI MODAL ZOOM FOTO & CAROUSEL SLIDER GALERI
   ============================================ */
const photoModal = document.getElementById('photo-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const modalCounter = document.getElementById('modal-counter');
const modalClose = document.getElementById('modal-close');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');

let currentGalleryIndex = 0;
let galleryArray = [];

function updateGalleryList() {
  const clickablePhotos = document.querySelectorAll('.person-pure-photo, .gallery-photo');
  galleryArray = Array.from(clickablePhotos).map(img => ({
    src: img.src,
    alt: img.alt || 'Galeri Pernikahan'
  }));
}
updateGalleryList();

function showPhotoAtIndex(index) {
  if (galleryArray.length === 0) return;
  if (index < 0) index = galleryArray.length - 1;
  if (index >= galleryArray.length) index = 0;

  currentGalleryIndex = index;
  const item = galleryArray[currentGalleryIndex];

  if (photoModal && modalImg) {
    photoModal.classList.add('active');
    modalImg.src = item.src;
    modalImg.alt = item.alt;

    if (modalCaption) {
      modalCaption.textContent = (item.alt && item.alt !== 'Zoom Foto') ? item.alt : '';
    }
    if (modalCounter) {
      modalCounter.textContent = `${currentGalleryIndex + 1} / ${galleryArray.length}`;
    }
  }
}

// Event listener untuk setiap foto saat diklik
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('person-pure-photo') || e.target.classList.contains('gallery-photo')) {
    updateGalleryList();
    const clickedSrc = e.target.src;
    const foundIdx = galleryArray.findIndex(item => item.src === clickedSrc);
    showPhotoAtIndex(foundIdx !== -1 ? foundIdx : 0);
  }
});

if (modalPrev) {
  modalPrev.addEventListener('click', function (e) {
    e.stopPropagation();
    showPhotoAtIndex(currentGalleryIndex - 1);
  });
}

if (modalNext) {
  modalNext.addEventListener('click', function (e) {
    e.stopPropagation();
    showPhotoAtIndex(currentGalleryIndex + 1);
  });
}

if (modalClose) {
  modalClose.addEventListener('click', function () {
    if (photoModal) photoModal.classList.remove('active');
  });
}

if (photoModal) {
  photoModal.addEventListener('click', function (e) {
    if (e.target === photoModal || e.target.classList.contains('modal-wrapper')) {
      photoModal.classList.remove('active');
    }
  });
}

// Dukungan Navigasi Keyboard (Panah Kiri & Kanan & ESC)
document.addEventListener('keydown', function (e) {
  if (!photoModal || !photoModal.classList.contains('active')) return;

  if (e.key === 'ArrowLeft') {
    showPhotoAtIndex(currentGalleryIndex - 1);
  } else if (e.key === 'ArrowRight') {
    showPhotoAtIndex(currentGalleryIndex + 1);
  } else if (e.key === 'Escape') {
    photoModal.classList.remove('active');
  }
});

// Dukungan Swipe Touch / Usap Layar di HP
let touchStartX = 0;
let touchEndX = 0;

if (photoModal) {
  photoModal.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  photoModal.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
}

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) {
    // Swipe kiri -> Next photo
    showPhotoAtIndex(currentGalleryIndex + 1);
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    // Swipe kanan -> Prev photo
    showPhotoAtIndex(currentGalleryIndex - 1);
  }
}

/* ============================================
   EFEK FADE-IN SAAT SCROLL KE BAWAH
   ============================================ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
revealEls.forEach(el => revealObserver.observe(el));

/* ============================================
   FUNGSI HITUNG MUNDUR (COUNTDOWN)
   ============================================ */
function updateCountdown() {
  const target = new Date(weddingData.eventDateTime).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    setText('cd-days', '00');
    setText('cd-hours', '00');
    setText('cd-minutes', '00');
    setText('cd-seconds', '00');
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  setText('cd-days', String(days).padStart(2, '0'));
  setText('cd-hours', String(hours).padStart(2, '0'));
  setText('cd-minutes', String(minutes).padStart(2, '0'));
  setText('cd-seconds', String(seconds).padStart(2, '0'));
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ============================================
   SISTEM UCAPAN & GUESTBOOK (PAGINASI LIVE)
   ============================================ */
const defaultWishes = [
  {
    name: "Budi & Keluarga",
    status: "Hadir",
    message: "Selamat untuk Ridho & Helen! Semoga pernikahan kalian senantiasa dipenuhi kebahagiaan, kedamaian, dan cinta yang langgeng.",
    time: "19 Sep 2026 10:15"
  },
  {
    name: "Siska Wijaya",
    status: "Hadir",
    message: "Selamat menempuh hidup baru ya Ridho dan Helen. Semoga bahagia selalu sampai anak cucu!",
    time: "19 Sep 2026 10:45"
  },
  {
    name: "Dharma & Rina",
    status: "Tidak Hadir",
    message: "Selamat Ridho & Helen, mohon maaf belum bisa hadir secara langsung. Doa terbaik kami menyertai kalian berdua.",
    time: "19 Sep 2026 11:30"
  }
];

function getWishes() {
  const saved = localStorage.getItem('wedding_wishes_ridho_helen');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { }
  }
  return defaultWishes;
}

function saveWishes(wishes) {
  localStorage.setItem('wedding_wishes_ridho_helen', JSON.stringify(wishes));
}

let currentPage = 1;
const itemsPerPage = 3;

function renderWishes() {
  const wishes = getWishes();
  const wishesList = document.getElementById('wishes-list');
  const totalCountEl = document.getElementById('wishes-total-count');
  const pageInfoEl = document.getElementById('page-info');
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');

  if (totalCountEl) totalCountEl.textContent = wishes.length;

  const totalPages = Math.ceil(wishes.length / itemsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  if (pageInfoEl) pageInfoEl.textContent = `Halaman ${currentPage} dari ${totalPages}`;
  if (prevBtn) prevBtn.disabled = (currentPage === 1);
  if (nextBtn) nextBtn.disabled = (currentPage === totalPages);

  if (!wishesList) return;
  wishesList.innerHTML = '';

  const startIdx = (currentPage - 1) * itemsPerPage;
  const pageWishes = wishes.slice(startIdx, startIdx + itemsPerPage);

  if (pageWishes.length === 0) {
    wishesList.innerHTML = '<div class="no-wishes">Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</div>';
    return;
  }

  pageWishes.forEach(item => {
    const card = document.createElement('div');
    card.className = 'wish-card';

    const isHadir = (item.status === 'Hadir');
    const badgeClass = isHadir ? 'badge-hadir' : 'badge-absen';

    card.innerHTML = `
        <div class="wish-header">
          <strong class="wish-name">${escapeHTML(item.name)}</strong>
          <span class="wish-badge ${badgeClass}">${escapeHTML(item.status)}</span>
        </div>
        <p class="wish-text">${escapeHTML(item.message)}</p>
        <span class="wish-time">${escapeHTML(item.time)}</span>
      `;
    wishesList.appendChild(card);
  });
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, function (m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
}

const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const rsvpNameEl = document.getElementById('rsvp-name');
    const rsvpStatusEl = document.getElementById('rsvp-status');
    const rsvpMsgEl = document.getElementById('rsvp-message');

    const name = rsvpNameEl ? rsvpNameEl.value.trim() : '';
    const status = rsvpStatusEl ? rsvpStatusEl.value : 'Hadir';
    const message = rsvpMsgEl ? rsvpMsgEl.value.trim() : '';

    if (!name || !message) {
      alert('Mohon isi nama dan ucapan Anda.');
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' +
      now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const newWish = {
      name: name,
      status: status,
      message: message,
      time: timeStr
    };

    const wishes = getWishes();
    wishes.unshift(newWish);
    saveWishes(wishes);

    currentPage = 1;
    renderWishes();

    rsvpForm.reset();
    alert('Terima kasih! Ucapan & konfirmasi kehadiran Anda telah berhasil disampaikan.');
  });
}

const prevBtn = document.getElementById('prev-page-btn');
const nextBtn = document.getElementById('next-page-btn');

if (prevBtn) {
  prevBtn.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      renderWishes();
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', function () {
    const wishes = getWishes();
    const totalPages = Math.ceil(wishes.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderWishes();
    }
  });
}

// Muat ucapan awal saat halaman terbuka
renderWishes();