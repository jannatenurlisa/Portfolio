// ── SPARKLE ──
const canvas = document.getElementById('sparkle-canvas');
const ctx = canvas.getContext('2d');
let W, H, P = [];
const COLS = [
    'rgba(192,21,42,',
    'rgba(232,25,122,',
    'rgba(184,184,204,',
    'rgba(210,228,240,',
    'rgba(196,22,110,',
    'rgba(123,47,160,',
    'rgba(232,92,138,'
];
function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
function mkP() { return { x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + 0.3, a: Math.random() * 0.55 + 0.1, s: Math.random() * 0.24 + 0.04, d: (Math.random() - 0.5) * 0.14, tw: Math.random() * 0.016 + 0.004, c: COLS[Math.floor(Math.random() * COLS.length)] }; }
function init() { P = Array.from({ length: 130 }, mkP); }
function draw() {
    ctx.clearRect(0, 0, W, H);
    P.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + p.a + ')'; ctx.fill();
        p.y -= p.s; p.x += p.d;
        p.a += (Math.random() - 0.5) * p.tw;
        p.a = Math.max(0.05, Math.min(0.72, p.a));
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
    });
    requestAnimationFrame(draw);
}
resize(); init(); draw();
addEventListener('resize', resize);

// ── SCROLL FADE ──
const obs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
}), { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

// ── TILT + cursor-tracked glow ──
document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('mousemove', e => {
        const r = box.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        box.style.transform = `perspective(700px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg) translate(${dx * 5}px,${dy * 5}px)`;
        box.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        box.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
    box.addEventListener('mouseleave', () => {
        box.style.transform = '';
        box.style.removeProperty('--gx');
        box.style.removeProperty('--gy');
    });
});