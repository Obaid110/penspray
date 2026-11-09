// ===== EDIT THESE =====
const WHATSAPP = '923001234567'; // country code + number, no "+"
const EMAIL = 'hello@example.com';
const PRICE = 500;
// ======================
gsap.registerPlugin(ScrollTrigger);
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;

// split text into characters
$$('[data-split]').forEach(el => { el.innerHTML = [...el.textContent].map(c => `<span class="ch">${c === ' ' ? '&nbsp;' : c}</span>`).join(''); });

$('#contact').innerHTML = `${EMAIL}<br>+${WHATSAPP}`;
$('#wa').href = `https://wa.me/${WHATSAPP}`;
$('#yr').textContent = new Date().getFullYear();

// ===== loader -> hero =====
function heroIn() {
  gsap.set('.hero-in', { visibility: 'visible' });
  if (reduced) return;
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.h-label', { opacity: 0, y: 20 })
    .from('.h-title .ch', { yPercent: 120, opacity: 0, stagger: .025, duration: .8 }, '-=.2')
    .from('.h-sub', { opacity: 0, y: 20 }, '-=.4')
    .from('.h-price', { scale: 0, ease: 'back.out(2)' }, '-=.3')
    .from('.h-btns .btn', { y: 30, opacity: 0, stagger: .12 }, '-=.3')
    .from('.h-pen', { clipPath: 'inset(0 0 100% 0)', scale: 1.15, duration: 1.3 }, 0.3);
  gsap.to('.h-pen', { y: -14, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  gsap.to('.sweep', { xPercent: 60, opacity: .9, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  gsap.to('.orb', { y: 'random(-30,30)', x: 'random(-30,30)', duration: 5, repeat: -1, yoyo: true, stagger: .6, ease: 'sine.inOut' });
  gsap.to('.hero-bg', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: true, start: 'top top', end: 'bottom top' } });
  gsap.from('.logo, .dl a, .nav .mag, .burger', { y: -24, opacity: 0, stagger: .08, duration: .7, ease: 'power3.out' });
}
const d = reduced ? .01 : 1;
gsap.timeline({ onComplete: () => { $('#loader').style.display = 'none'; ScrollTrigger.refresh(); } })
  .from('.ld-brand .ch', { yPercent: 110, opacity: 0, stagger: .05 * d, duration: .5 * d })
  .to('.ld-line', { scaleX: 1, duration: .9 * d, ease: 'power2.inOut' }, .2)
  .to('.ld-img', { opacity: .55, scale: 1, duration: .8 * d }, .4)
  .to('#loader', { yPercent: -100, duration: .8 * d, ease: 'power4.inOut' }, '+=.15')
  .add(heroIn, '-=.5');

// ===== navbar =====
ScrollTrigger.create({ start: 60, end: 'max', toggleClass: { targets: '#nav', className: 'solid' } });
const mm = $('#mm'), burger = $('#burger');
function toggleMenu(open) {
  mm.classList.toggle('open', open); document.body.style.overflow = open ? 'hidden' : '';
  burger.textContent = open ? '✕' : '☰';
  if (open) gsap.from('#mm a', { y: 40, opacity: 0, stagger: .07 });
}
burger.onclick = () => toggleMenu(!mm.classList.contains('open'));
$$('#mm a').forEach(a => a.onclick = () => toggleMenu(false));

// ===== desktop-only: magnetic buttons + cursor =====
if (fine && !reduced) {
  document.body.classList.add('has-cursor');
  $$('.mag').forEach(b => {
    b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .3, y: (e.clientY - r.top - r.height / 2) * .3, duration: .3 }); });
    b.addEventListener('mouseleave', () => gsap.to(b, { x: 0, y: 0, ease: 'elastic.out(1,.4)', duration: .8 }));
  });
  const x = gsap.quickTo('.cursor', 'x', { duration: .25 }), y = gsap.quickTo('.cursor', 'y', { duration: .25 });
  addEventListener('mousemove', e => { x(e.clientX); y(e.clientY); });
  addEventListener('mouseover', e => gsap.to('.cursor', { scale: e.target.closest('a,button') ? 1.8 : 1, duration: .25 }));
}

// ===== progress + back to top =====
gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { scrub: .2, start: 0, end: 'max' } });
ScrollTrigger.create({ start: 600, end: 'max', onToggle: s => gsap.to('#top-btn', { opacity: s.isActive ? 1 : 0, pointerEvents: s.isActive ? 'auto' : 'none' }) });
$('#top-btn').onclick = () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

// ===== scroll animations =====
if (!reduced) {
  gsap.timeline({ scrollTrigger: { trigger: '.showcase', start: 'top 65%' } })
    .from('.sc-img', { clipPath: 'inset(100% 0 0 0)', scale: 1.2, duration: 1.2, ease: 'power3.out' })
    .from('.sc-h', { x: 60, opacity: 0 }, .2).from('.sc-d', { x: 40, opacity: 0, stagger: .12 }, .5);
  gsap.to('.spot', { opacity: 1, scrollTrigger: { trigger: '.showcase', scrub: true, start: 'top 80%', end: 'center center' } });
  gsap.from('.fc', { y: 60, opacity: 0, stagger: .12, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.fgrid', start: 'top 80%' } });
  $$('.fc').forEach(c => c.addEventListener('mouseenter', () => gsap.fromTo($('.ic', c), { rotate: -15, scale: .8 }, { rotate: 0, scale: 1.1, duration: .5, ease: 'back.out(3)' })));
  gsap.from('.w-line', { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'power3.inOut', scrollTrigger: { trigger: '.why', start: 'top 70%' } });
  gsap.from('.w-big span', { xPercent: -40, opacity: 0, stagger: .2, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.why', start: 'top 65%' } });
  gsap.from('.w-p', { y: 40, opacity: 0, duration: .9, scrollTrigger: { trigger: '.w-p', start: 'top 85%' } });
  gsap.timeline({ scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 60%', scrub: 1 } })
    .from('.step', { opacity: .15, y: 30, stagger: .6 }, 0).from('.track i', { scaleX: 0, duration: 1.8, ease: 'none' }, 0);
  gsap.from('.of > *', { y: 40, opacity: 0, stagger: .08, duration: .7, scrollTrigger: { trigger: '.of', start: 'top 80%' } });
  gsap.from('.ft > *', { y: 30, opacity: 0, stagger: .1, scrollTrigger: { trigger: '.foot', start: 'top 90%' } });
}

// ===== order form =====
const form = $('#form'), fb = $('#fb'), qtyOf = () => Math.min(100, Math.max(1, parseInt(form.qty.value) || 1));
function updateTotal() { $('#tl').textContent = `Pen Spray × ${qtyOf()} · Rs. ${PRICE} each`; $('#tt').textContent = `Rs. ${qtyOf() * PRICE} PKR`; }
form.qty.addEventListener('input', updateTotal);
form.addEventListener('submit', e => {
  e.preventDefault();
  const v = Object.fromEntries(new FormData(form)), err = {};
  if (v.name.trim().length < 3) err.name = 'Enter your full name.';
  if (!/^(\+92|0092|92|0)?3\d{9}$/.test(v.phone.replace(/[\s-]/g, ''))) err.phone = 'Enter a valid Pakistani mobile number, e.g. 03001234567.';
  if (v.city.trim().length < 2) err.city = 'Enter your city.';
  if (v.address.trim().length < 10) err.address = 'Enter your complete address.';
  if (!(+v.qty >= 1 && +v.qty <= 100)) err.qty = 'Quantity must be 1–100.';
  ['name', 'phone', 'city', 'address', 'qty'].forEach(k => { const f = form[k]; f.classList.toggle('bad', !!err[k]); f.nextElementSibling.textContent = err[k] || ''; });
  if (Object.keys(err).length) { fb.className = 'fb error'; fb.textContent = 'Please fix the highlighted fields.'; return; }
  const btn = $('#sub'); btn.disabled = true; btn.textContent = 'OPENING WHATSAPP…';
  const msg = `New order — Pen Spray\nName: ${v.name}\nPhone: ${v.phone}\nCity: ${v.city}\nAddress: ${v.address}\nQuantity: ${qtyOf()}\nTotal: Rs. ${qtyOf() * PRICE} PKR`;
  // No backend: the order is only placed once the message is sent in WhatsApp.
  const w = open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  fb.className = 'fb ' + (w ? 'success' : 'error');
  fb.textContent = w ? 'WhatsApp opened. Send the message there to confirm your order.' : 'Pop-up blocked. Allow pop-ups for this site and try again.';
  btn.disabled = false; btn.textContent = 'PLACE YOUR ORDER';
});
