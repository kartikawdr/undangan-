/* ============================================
     DATA UNDANGAN
     ============================================ */
  const weddingData = {
    groomName: "Ridho Karnawan",
    brideName: "Helen Irnawati Tjandra",
    dateText: "Minggu, 20 September 2026",
    groomParents: "Putra dari<br>Bapak Herman Wijaya &amp; Ibu Sri Lestari",
    brideParents: "Putri dari<br>Bapak Agus Santoso &amp; Ibu Rita Amelia",

    quoteText: "Dalam sebuah pernikahan kalian disatukan demi sebuah kebahagiaan dengan janji hati untuk saling membahagiakan. Bersamaku engkau akan hidup selamanya karena Tuhan pasti akan memberikan karunia sebagai pelindung dan saksi dalam pernikahan ini. Untuk itulah kalian dipersatukan dalam satu keluarga.",
    quoteSource: "(Rgveda : X.85.36)",

    akad: {
      label: "Akad Nikah",
      dateTime: "Minggu, 20 September 2026 &bull; 08.00 - 10.00 WIB",
      place: "Masjid Al-Ikhlas",
      address: "Jl. Melati No. 12, Yogyakarta",
      mapsUrl: "https://maps.google.com/?q=Masjid+Al+Ikhlas+Yogyakarta"
    },
    
    resepsi: {
      label: "Resepsi",
      dateTime: "Minggu, 20 September 2026 &bull; 11.00 - 14.00 WIB",
      place: "Grand Ballroom Hotel",
      address: "Jl. Malioboro No. 45, Yogyakarta",
      mapsUrl: "https://maps.google.com/?q=Grand+Ballroom+Yogyakarta"
    },

    eventDateTime: "2026-09-20T08:00:00",
    whatsappNumber: "6281234567890"
  };

  // Menghubungkan teks kutipan dari script ke HTML
  const quoteTextEl = document.getElementById('quote-text');
  const quoteSourceEl = document.getElementById('quote-source');

  if (quoteTextEl) quoteTextEl.innerText = weddingData.quoteText;
  if (quoteSourceEl) quoteSourceEl.innerText = weddingData.quoteSource;

  // Mengisi Cover & Data Mempelai
  document.getElementById('groom-name').textContent = weddingData.groomName;
  document.getElementById('bride-name').textContent = weddingData.brideName;
  document.getElementById('wedding-date-cover').textContent = weddingData.dateText;

  document.getElementById('groom-name-bio').textContent = weddingData.groomName;
  document.getElementById('bride-name-bio').textContent = weddingData.brideName;
  document.getElementById('groom-initial').textContent = weddingData.groomName.charAt(0);
  document.getElementById('bride-initial').textContent = weddingData.brideName.charAt(0);
  document.getElementById('groom-parents').innerHTML = weddingData.groomParents;
  document.getElementById('bride-parents').innerHTML = weddingData.brideParents;

  // Mengisi elemen pada Home hero jika ada
  const homeGroom = document.getElementById('home-groom-name');
  const homeBride = document.getElementById('home-bride-name');
  const homeDate = document.getElementById('home-wedding-date');
  if (homeGroom) homeGroom.textContent = weddingData.groomName;
  if (homeBride) homeBride.textContent = weddingData.brideName;
  if (homeDate) homeDate.textContent = weddingData.dateText;

  // Mengisi Quote & Acara
  document.getElementById('quote-text').textContent = weddingData.quoteText;
  document.getElementById('quote-source').textContent = weddingData.quoteSource;

  document.getElementById('akad-label').textContent = weddingData.akad.label;
  document.getElementById('akad-datetime').innerHTML = weddingData.akad.dateTime;
  document.getElementById('akad-place').textContent = weddingData.akad.place;
  document.getElementById('akad-address').textContent = weddingData.akad.address;
  document.getElementById('akad-maps').href = weddingData.akad.mapsUrl;

  document.getElementById('resepsi-label').textContent = weddingData.resepsi.label;
  document.getElementById('resepsi-datetime').innerHTML = weddingData.resepsi.dateTime;
  document.getElementById('resepsi-place').textContent = weddingData.resepsi.place;
  document.getElementById('resepsi-address').textContent = weddingData.resepsi.address;
  document.getElementById('resepsi-maps').href = weddingData.resepsi.mapsUrl;

  document.getElementById('groom-name-closing').textContent = weddingData.groomName;
  document.getElementById('bride-name-closing').textContent = weddingData.brideName;

  /* ============================================
     TANGKAP NAMA TAMU DARI LINK (URL PARAMETER)
     ============================================ */
  const urlParams = new URLSearchParams(window.location.search);
  const guestFromUrl = urlParams.get('to');
  // Menaruh nama tamu di dalam Box pada Cover
  document.getElementById('guest-name').textContent = guestFromUrl ? guestFromUrl : 'Bapak/Ibu/Saudara/i';

  /* ============================================
     FUNGSI BUKA UNDANGAN & UNLOCK SCROLL
     ============================================ */
  document.getElementById('open-btn').addEventListener('click', function(){
    // 1. Menggeser layar cover ke atas
    document.getElementById('wrapper').classList.add('opened');
    
    // 2. Membuka kuncian scroll pada body
    document.body.classList.add('scroll-unlocked');
  });

  /* ============================================
     EFEK FADE-IN SAAT SCROLL KE BAWAH
     ============================================ */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ============================================
     FUNGSI HITUNG MUNDUR (COUNTDOWN)
     ============================================ */
  function updateCountdown(){
    const target = new Date(weddingData.eventDateTime).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0){
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-minutes').textContent = '00';
      document.getElementById('cd-seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ============================================
     KIRIM RSVP KE WHATSAPP
     ============================================ */
  document.getElementById('rsvp-submit').addEventListener('click', function(){
    const name = document.getElementById('rsvp-name').value.trim();
    const status = document.getElementById('rsvp-status').value;
    const message = document.getElementById('rsvp-message').value.trim();

    if (!name){
      alert('Mohon isi nama Anda terlebih dahulu.');
      return;
    }

    let text = 'Assalamualaikum, saya ' + name + ' ingin mengonfirmasi kehadiran: ' + status + '.';
    if (message){
      text += '\n\nUcapan & doa: ' + message;
    }

    const waUrl = 'https://wa.me/' + weddingData.whatsappNumber + '?text=' + encodeURIComponent(text);
    window.open(waUrl, '_blank');
  });