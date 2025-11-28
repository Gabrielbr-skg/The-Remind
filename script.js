// script.js — mantém a estrutura HTML exatamente igual, só adiciona efeitos (glitch, inversão, triggers)
if (body && body.style) body.style.display = isOpen ? 'none' : 'block';




// Form fake submission (preserva comportamento anterior)
const form = document.querySelector('form');
if (form) {
form.addEventListener('submit', (e) => {
e.preventDefault();
alert('Mensagem recebida. A equipe Remind responderá em breve.');
});
}


// ---------- VHS / GLOBAL GLITCH MODULE (não muda estrutura) ----------
// Duration of the global glitch (ms)
const GLITCH_DURATION = 1000; // 1 second


/**
* Applies the visual glitch to all panels (.card) and inverts the whole page
* for GLITCH_DURATION milliseconds. This function only toggles classes; it
* DOES NOT remove or add DOM elements or change structure.
*/
function globalGlitch() {
const cards = document.querySelectorAll('.card');
cards.forEach(c => c.classList.add('glitched'));
document.body.classList.add('glitching');


// remove after duration
setTimeout(() => {
cards.forEach(c => c.classList.remove('glitched'));
document.body.classList.remove('glitching');
}, GLITCH_DURATION);
}


// expose for manual triggering from console or buttons without altering structure
window.globalGlitch = globalGlitch;


// Try to synchronize glitch with the logo's flicker animation if present.
// We don't modify the logo element; we only listen to animation events.
function attachLogoSync() {
const logoImg = document.querySelector('.logo img');
if (!logoImg) return;


// If the logo image has an animation (logoFlicker), we listen for its iterations.
// We keep a high probability so it feels dramatic but not constant.
logoImg.addEventListener('animationiteration', () => {
// 80% chance to trigger when animation loops (keeps it dramatic)
if (Math.random() < 0.8) globalGlitch();
});
}


// Periodic random glitch loop (non-blocking, doesn't alter structure)
(function randomGlitchLoop() {
const min = 8000; // 8s
const max = 18000; // 18s
const delay = min + Math.random() * (max - min);
setTimeout(() => {
// 65% chance to trigger on each interval
if (Math.random() < 0.65) globalGlitch();
randomGlitchLoop();
}, delay);
})();


// Attach logo sync on DOM ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', attachLogoSync);
} else {
attachLogoSync();
}

setInterval(() => {
  document.body.classList.add("invert-flash");
  setTimeout(() => {
    document.body.classList.remove("invert-flash");
  }, 1000); // 1 segundo piscando
}, 4000); // intervalo
// Small developer helper: double-click on body to force a glitch while developing.
// This does not change structure and can be removed later. Keep commented for production.
// document.body.addEventListener('dblclick', globalGlitch);