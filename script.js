// 1. Topographic contour lines in the hero
(function () {
  var svg = document.getElementById('topo');
  var NS = 'http://www.w3.org/2000/svg';
  var g = document.createElementNS(NS, 'g');
  for (var r = 30; r <= 520; r += 26) {
    var d = '';
    for (var i = 0; i <= 72; i++) {
      var a = (i / 72) * Math.PI * 2;
      var w = 1 + 0.16 * Math.sin(a * 3 + r / 70) + 0.09 * Math.sin(a * 5 - r / 45) + 0.05 * Math.cos(a * 2 + r / 90);
      var x = 860 + Math.cos(a) * r * w * 1.35;
      var y = 300 + Math.sin(a) * r * w * 0.82;
      d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    var p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d + 'Z');
    p.setAttribute('class', (r / 26 | 0) % 5 === 0 ? 'm' : 'n');
    g.appendChild(p);
  }
  svg.appendChild(g);
})();

// 2. Highlight the nav link of the section in view
(function () {
  var links = document.querySelectorAll('#menu a');
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section').forEach(function (s) { io.observe(s); });
})();

// 3. Footer year
document.getElementById('year').textContent = new Date().getFullYear();
