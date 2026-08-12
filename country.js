/* ── NOXALIVING Country Selector ── */
(function () {
  var COUNTRIES = [
    { code:'CO', name:'Colombia',       flag:'🇨🇴' },
    { code:'AR', name:'Argentina',      flag:'🇦🇷' },
    { code:'MX', name:'México',         flag:'🇲🇽' },
    { code:'CL', name:'Chile',          flag:'🇨🇱' },
    { code:'PE', name:'Perú',           flag:'🇵🇪' },
    { code:'UY', name:'Uruguay',        flag:'🇺🇾' },
    { code:'EC', name:'Ecuador',        flag:'🇪🇨' },
    { code:'PA', name:'Panamá',         flag:'🇵🇦' },
    { code:'VE', name:'Venezuela',      flag:'🇻🇪' },
    { code:'BO', name:'Bolivia',        flag:'🇧🇴' },
    { code:'PY', name:'Paraguay',       flag:'🇵🇾' },
    { code:'US', name:'Estados Unidos', flag:'🇺🇸' },
    { code:'ES', name:'España',         flag:'🇪🇸' },
  ];

  var btn   = document.getElementById('countryBtn');
  var drop  = document.getElementById('countryDrop');
  var flagEl= document.getElementById('countryFlag');
  var codeEl= document.getElementById('countryCode');
  var listEl= document.getElementById('countryList');

  if (!btn) return; // safety

  /* Construir lista */
  COUNTRIES.forEach(function(c) {
    var item = document.createElement('div');
    item.className = 'country-item';
    item.dataset.code = c.code;
    item.innerHTML = '<span class="country-item__flag">' + c.flag + '</span><span>' + c.name + '</span>';
    item.addEventListener('click', function() {
      select(c);
      drop.classList.remove('open');
      localStorage.setItem('nx_country', JSON.stringify(c));
    });
    listEl.appendChild(item);
  });

  function select(c) {
    flagEl.textContent = c.flag;
    codeEl.textContent = c.code;
    listEl.querySelectorAll('.country-item').forEach(function(el) {
      el.classList.toggle('active', el.dataset.code === c.code);
    });
  }

  /* Toggle dropdown */
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    drop.classList.toggle('open');
  });
  document.addEventListener('click', function() { drop.classList.remove('open'); });
  drop.addEventListener('click', function(e) { e.stopPropagation(); });

  /* Auto-detectar o usar guardado */
  var saved = localStorage.getItem('nx_country');
  if (saved) {
    try { select(JSON.parse(saved)); } catch(e) { detect(); }
  } else {
    detect();
  }

  function detect() {
    fetch('https://ipapi.co/json/')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var found = COUNTRIES.find(function(c) { return c.code === data.country_code; });
        select(found || COUNTRIES[0]);
      })
      .catch(function() { select(COUNTRIES[0]); });
  }
})();
