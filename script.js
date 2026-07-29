    // CURSOR
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function animateCursor() {
      cursor.style.left = (mx - 5) + 'px'; cursor.style.top = (my - 5) + 'px';
      rx += (mx - rx - 18) * 0.12; ry += (my - ry - 18) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    document.querySelectorAll('a,button,.stat-card,.skill-item,.project-card,.social-btn').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2)'; ring.style.opacity = '0.2'; });
      el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; ring.style.opacity = '0.6'; });
    });

    // NAV SCROLL
    window.addEventListener('scroll', () => {
      document.getElementById('nav').style.background =
        window.scrollY > 50 ? 'rgba(10,10,15,0.97)' : 'rgba(10,10,15,0.85)';
    });

    // HAMBURGER
    function toggleNav() {
      document.getElementById('navLinks').classList.toggle('open');
    }
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
    });

    // TYPEWRITER
    const roles = ['RPL Student 🎓', 'Web Developer 💻', 'UI Designer 🎨', 'Problem Solver 🔧'];
    let ri = 0, ci = 0, del = false;
    const tw = document.getElementById('typewriter');
    function type() {
      const cur = roles[ri];
      tw.textContent = del ? cur.substring(0, ci--) : cur.substring(0, ci++);
      if (!del && ci === cur.length + 1) { del = true; setTimeout(type, 1800); return; }
      if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
      setTimeout(type, del ? 60 : 110);
    }
    type();

    // REVEAL ON SCROLL
    const observer = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // SKILL BARS
    const skillObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-fill').forEach(bar => {
            bar.style.width = bar.dataset.pct + '%';
          });
          skillObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    document.getElementById('skillsGrid') && skillObs.observe(document.getElementById('skillsGrid'));

    // FORM
    async function handleSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const btn  = document.getElementById('submitBtn');

      // Kumpulkan data form
      const data = {
        access_key: form.access_key.value,
        name:       form.name.value.trim(),
        email:      form.email.value.trim(),
        subject:    form.subject.value.trim(),
        message:    form.message.value.trim(),
      };

      console.log('📤 Mengirim data ke Web3Forms:', data);

      // State: Loading
      btn.disabled = true;
      btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Mengirim...';
      btn.style.background = '';
      btn.style.color = '';

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body:    JSON.stringify(data),
        });

        console.log('📥 HTTP Status:', res.status, res.statusText);

        // Cek apakah respons HTTP error (4xx, 5xx)
        if (!res.ok) {
          throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();
        console.log('✅ Response dari Web3Forms API:', json);

        // Cek apakah API mengembalikan success = true
        if (json.success === true) {
          // State: Sukses
          console.log('✅ Email berhasil dikirim!');
          btn.innerHTML = '<i class="fa fa-check"></i> Terkirim!';
          btn.style.background = 'var(--accent3)';
          btn.style.color = '#0a0a0f';
          form.reset();
          setTimeout(() => {
            btn.innerHTML = '<i class="fa fa-paper-plane"></i> Kirim Pesan';
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
          }, 3000);
        } else {
          // State: Gagal (respons dari server tapi success bukan true)
          console.error('❌ API mengembalikan success = false:', json);
          throw new Error(json.message || 'Gagal mengirim pesan.');
        }
      } catch (err) {
        // State: Error (network error atau throw di atas)
        console.error('❌ Error saat submit form:', err);
        console.error('❌ Error message:', err.message);
        btn.innerHTML = '<i class="fa fa-times-circle"></i> Gagal, coba lagi';
        btn.style.background = 'rgba(220,53,69,0.85)';
        btn.style.color = '#fff';
        btn.disabled = false;
        // Pulihkan tombol setelah 3 detik
        setTimeout(() => {
          btn.innerHTML = '<i class="fa fa-paper-plane"></i> Kirim Pesan';
          btn.style.background = '';
          btn.style.color = '';
        }, 3000);
      }
    }
