/* =====================================================================
   PickTrash — Pusat Kendali Admin & Mitra Pabrik
   Aplikasi real-time dua arah dengan website warga (Supabase).
   ===================================================================== */

const SUPA_URL = 'https://svlsqojuhfwmeilvsdmk.supabase.co';
const SUPA_KEY = 'sb_publishable_x_jn9aRjPhYEH3aEIGn3nQ_fHZj-Edx';

const sb = window.supabase.createClient(SUPA_URL, SUPA_KEY, {
  realtime: { params: { eventsPerSecond: 10 } },
});

/* ---------- IKON SVG (tanpa emoji) ---------- */
const P = {
  truck:   '<path d="M3 17h13M14 17l3-9 4 9M5 17V9h5l3 3h3"/><circle cx="7.5" cy="19.5" r="1.6"/><circle cx="17.5" cy="19.5" r="1.6"/>',
  box:     '<path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
  wallet:  '<path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
  check:   '<path d="M20 6 9 17l-5-5"/>',
  checkC:  '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  clock:   '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  x:       '<path d="M18 6 6 18M6 6l12 12"/>',
  xC:      '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>',
  play:    '<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4Z"/>',
  phone:   '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
  mapPin:  '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  user:    '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  bell:    '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
  logout:  '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  factory: '<path d="M3 21V8l6-4v17M9 21V4l6 4v13M15 21V10l6 3v8"/><path d="M3 21h18"/>',
  chart:   '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
  shield:  '<path d="M12 2 4 6v6c0 5 3.4 9.1 8 10 4.6-.9 8-5 8-10V6z"/><path d="M9 12l2 2 4-4"/>',
  alert:   '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  scale:   '<path d="M12 3v18M7 7l-4 8a4 4 0 0 0 8 0ZM17 7l-4 8a4 4 0 0 0 8 0Z"/><path d="M5 7h14"/>',
  cal:     '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  tag:     '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-8.2-8.2V3h9.4l8.8 8.8a2 2 0 0 1 0 2.6Z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  inbox:   '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.4 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.4-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.8 1.1Z"/>',
  note:    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  eye:     '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  info:    '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  save:    '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
};
const ico = (n, w = '') => `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${w ? ` style="${w}"` : ''}>${P[n] || P.info}</svg>`;

/* ---------- AKUN ---------- */
const ACCOUNTS = {
  ADMIN: { email: 'admin@angkutaja.id', pass: 'admin123', name: 'Super Admin PickTrash' },
  MITRA: { email: 'mitra@angkutaja.id', pass: 'mitra123', name: 'Mitra Pabrik & Daur Ulang' },
};

const STATUS_LABEL = {
  PENDING: 'Menunggu', CONFIRMED: 'Dikonfirmasi', IN_PROGRESS: 'Dijemput',
  COMPLETED: 'Selesai', CANCELLED: 'Dibatalkan',
};
const STATUS_ICON = { PENDING: 'clock', CONFIRMED: 'checkC', IN_PROGRESS: 'truck', COMPLETED: 'checkC', CANCELLED: 'xC' };

const WASTE_LABEL = {
  CAMPUR: 'Sampah Campur', RUMAH_TANGGA: 'Rumah Tangga & Perabot', PUING: 'Puing Renovasi',
  DAUR_ULANG: 'Daur Ulang', ORGANIK: 'Limbah Organik', ELEKTRONIK: 'Elektronik & Logam',
};

/* ---------- STATE ---------- */
let S = {
  role: 'ADMIN', user: null, tab: 'orders',
  orders: [], inventory: [], bookings: [], notifs: [],
  filter: 'all', openId: null, seen: new Set(), ready: false, live: false,
};

const $ = (s) => document.querySelector(s);
const rupiah = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const waktu = (t) => { if (!t) return '-'; const d = new Date(t); const m = Math.floor((Date.now() - d) / 60000);
  if (m < 1) return 'baru saja'; if (m < 60) return m + ' menit lalu'; if (m < 1440) return Math.floor(m / 60) + ' jam lalu';
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }); };

/* ---------- TOAST ---------- */
function toast(title, sub, kind = 'ok') {
  const el = document.createElement('div');
  el.className = 'toast ' + kind;
  el.innerHTML = `<div class="toast-ico">${ico(kind === 'ok' ? 'checkC' : kind === 'warn' ? 'alert' : 'info')}</div>
    <div class="toast-body"><b>${esc(title)}</b>${sub ? `<span>${esc(sub)}</span>` : ''}</div>`;
  $('#toasts').appendChild(el);
  setTimeout(() => { el.style.transition = '.3s'; el.style.opacity = '0'; el.style.transform = 'translateY(-10px)'; setTimeout(() => el.remove(), 300); }, 3400);
}

/* ---------- SUARA ---------- */
let AC = null;
function beep(kind = 'order') {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === 'suspended') AC.resume();
    const seq = kind === 'order' ? [[880, 0], [1180, .14], [1560, .28]] : [[660, 0], [990, .12]];
    seq.forEach(([f, t]) => {
      const o = AC.createOscillator(), g = AC.createGain();
      o.type = 'sine'; o.frequency.value = f;
      o.connect(g); g.connect(AC.destination);
      const s = AC.currentTime + t;
      g.gain.setValueAtTime(.0001, s);
      g.gain.exponentialRampToValueAtTime(.28, s + .02);
      g.gain.exponentialRampToValueAtTime(.0001, s + .3);
      o.start(s); o.stop(s + .32);
    });
  } catch (e) { /* audio tidak tersedia */ }
}

/* ---------- LOGIN ---------- */
let pickRole = 'ADMIN';
function setRole(r) {
  pickRole = r;
  $('#roleAdmin').classList.toggle('on', r === 'ADMIN');
  $('#roleMitra').classList.toggle('on', r === 'MITRA');
  const btn = $('#loginBtn');
  btn.dataset.role = r;
  $('#loginBtnTxt').textContent = r === 'ADMIN' ? 'Masuk Sebagai Admin' : 'Masuk Sebagai Mitra';
  $('#email').value = ACCOUNTS[r].email;
}
$('#roleAdmin').onclick = () => setRole('ADMIN');
$('#roleMitra').onclick = () => setRole('MITRA');
$('#eye').onclick = () => { const p = $('#pass'); p.type = p.type === 'password' ? 'text' : 'password'; };

function showErr(msg) { $('#loginErrTxt').textContent = msg; $('#loginErr').classList.add('show'); }
function hideErr() { $('#loginErr').classList.remove('show'); }

$('#loginBtn').onclick = async () => {
  const email = $('#email').value.trim().toLowerCase();
  const pass = $('#pass').value;
  const acc = ACCOUNTS[pickRole];
  hideErr();
  if (!email || !pass) return showErr('Email dan kata sandi wajib diisi.');
  if (email !== acc.email || pass !== acc.pass) return showErr('Email atau kata sandi salah untuk peran ' + pickRole + '.');
  $('#loginBtn').disabled = true;
  beep('login');
  S.role = pickRole;
  S.user = { role: pickRole, name: acc.name, email: acc.email };
  try { localStorage.setItem('angkutaja_admin_session', JSON.stringify(S.user)); } catch (e) {}
  await boot();
  $('#loginBtn').disabled = false;
};

/* ---------- BOOT ---------- */
async function boot() {
  $('#login').style.display = 'none';
  $('#app').classList.add('on');
  $('#userName').textContent = S.user.name;
  $('#avatar').dataset.role = S.role;
  buildTabs();
  await refreshAll();
  S.ready = true;
  subscribeRealtime();
  checkNotifs();
}

function buildTabs() {
  const all = [
    ['orders', 'Pesanan', 'truck', 'ADMIN'],
    ['mitra', 'Mitra Pabrik', 'factory', 'BOTH'],
    ['inventory', 'Inventori', 'box', 'ADMIN'],
    ['notif', 'Notifikasi', 'bell', 'BOTH'],
    ['profil', 'Profil', 'user', 'BOTH'],
  ];
  const list = all.filter((t) => t[3] === 'BOTH' || t[3] === S.role);
  $('#tabs').innerHTML = list.map(([id, label, icon]) =>
    `<button class="tab${S.tab === id ? ' on' : ''}" data-tab="${id}">${ico(icon)}<span>${label}</span></button>`).join('');
  $('#tabs').querySelectorAll('.tab').forEach((b) => {
    b.onclick = () => { S.tab = b.dataset.tab; buildTabs(); render(); };
  });
  if (!list.some((t) => t[0] === S.tab)) { S.tab = list[0][0]; buildTabs(); }
}

/* ---------- DATA ---------- */
async function refreshAll() {
  try {
    const [o, i, b, n] = await Promise.all([
      sb.from('orders').select('*').order('created_at', { ascending: false }).limit(300),
      sb.from('waste_inventory').select('*').order('created_at', { ascending: false }).limit(200),
      sb.from('company_bookings').select('*').order('created_at', { ascending: false }).limit(200),
      sb.from('app_notifications').select('*').order('created_at', { ascending: false }).limit(100),
    ]);
    if (o.error) throw o.error;
    S.orders = o.data || [];
    S.inventory = i.error ? [] : (i.data || []);
    S.bookings = b.error ? [] : (b.data || []);
    S.notifs = n.error ? [] : (n.data || []);
    setLive(true);
    render();
  } catch (e) {
    setLive(false);
    toast('Gagal memuat data', e.message || 'Periksa koneksi', 'warn');
  }
}

function setLive(on) {
  S.live = on;
  $('#liveDot').classList.toggle('live', on);
  $('#liveTxt').textContent = on ? 'Terhubung real-time' : 'Terputus — coba muat ulang';
}

/* ---------- REALTIME ---------- */
function subscribeRealtime() {
  sb.channel('angkutaja-admin-live')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (p) => {
      const row = p.new;
      S.orders.unshift(row);
      if (S.seen.has(row.id)) return;
      S.seen.add(row.id);
      if (S.ready) { beep('order'); incomingAlert(row); toast('Pesanan baru masuk', row.customer_name + ' · ' + rupiah(row.total_price), 'info'); }
      render();
    })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (p) => {
      const row = p.new; const i = S.orders.findIndex((x) => x.id === row.id);
      if (i >= 0) S.orders[i] = row; else S.orders.unshift(row);
      render(); if (S.openId === row.id) openSheet(row.id);
    })
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'orders' }, (p) => {
      S.orders = S.orders.filter((x) => x.id !== p.old.id); render();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'app_notifications' }, () => refreshNotifs())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'waste_inventory' }, (p) => {
      if (p.eventType === 'INSERT') S.inventory.unshift(p.new);
      else if (p.eventType === 'UPDATE') { const i = S.inventory.findIndex((x) => x.id === p.new.id); if (i >= 0) S.inventory[i] = p.new; }
      else S.inventory = S.inventory.filter((x) => x.id !== p.old.id);
      render();
    })
    .subscribe((st) => setLive(st === 'SUBSCRIBED'));
  setInterval(checkNotifs, 30000);
}

async function refreshNotifs() {
  const r = await sb.from('app_notifications').select('*').order('created_at', { ascending: false }).limit(100);
  if (!r.error) { S.notifs = r.data || []; render(); }
}

function checkNotifs() {
  const unread = S.notifs.filter((n) => !n.is_read).length;
  const b = $('#bellBadge');
  b.textContent = unread; b.style.display = unread ? 'grid' : 'none';
}

/* ---------- ALERT PESANAN MASUK ---------- */
function incomingAlert(row) {
  $('#incName').textContent = row.customer_name || 'Warga';
  $('#incAddr').textContent = row.customer_address || '-';
  $('#incPrice').textContent = rupiah(row.total_price);
  $('#incoming').classList.add('on');
  $('#incOpen').onclick = () => { $('#incoming').classList.remove('on'); S.tab = 'orders'; buildTabs(); render(); openSheet(row.id); };
  $('#incLater').onclick = () => $('#incoming').classList.remove('on');
  setTimeout(() => $('#incoming').classList.remove('on'), 45000);
}

/* ---------- RENDER ---------- */
function render() {
  if (!S.ready && !$('#app').classList.contains('on')) return;
  $('#bellBadge').style.display = S.notifs.filter((n) => !n.is_read).length ? 'grid' : 'none';
  ['orders', 'mitra', 'inventory', 'notif', 'profil'].forEach((v) => {
    const el = $('#v-' + v); if (el) el.classList.toggle('on', S.tab === v);
  });
  if (S.tab === 'orders') renderOrders();
  if (S.tab === 'mitra') renderMitra();
  if (S.tab === 'inventory') renderInventory();
  if (S.tab === 'notif') renderNotif();
  if (S.tab === 'profil') renderProfil();
}

function statCard(icon, color, val, lbl) {
  const map = { brand: 'var(--brand)', blue: 'var(--blue)', violet: 'var(--violet)', amber: 'var(--amber)', rose: 'var(--rose)' };
  const dim = { brand: 'var(--brand-dim)', blue: 'var(--blue-dim)', violet: 'var(--violet-dim)', amber: 'var(--amber-dim)', rose: 'var(--rose-dim)' };
  return `<div class="stat"><div class="stat-top"><div class="stat-ico" style="background:${dim[color]};color:${map[color]}">${ico(icon)}</div></div>
    <div class="stat-val">${val}</div><div class="stat-lbl">${lbl}</div></div>`;
}

function statusTag(s) { return `<span class="tag t-${s}">${ico(STATUS_ICON[s] || 'info')}${STATUS_LABEL[s] || s}</span>`; }

function orderCard(o) {
  return `<article class="card" data-open="${esc(o.id)}">
    <div class="card-top">
      <div style="min-width:0">
        <div class="card-id">${esc(o.id)}</div>
        <div class="card-name">${esc(o.customer_name || 'Warga')}</div>
      </div>
      ${statusTag(o.status)}
    </div>
    <div class="card-rows">
      <div class="card-row">${ico('mapPin')}<span>${esc(o.customer_address || '-')}</span></div>
      <div class="card-row">${ico('box')}<span><b>${esc(WASTE_LABEL[o.waste_type] || o.waste_type || '-')}</b>${o.estimated_kg ? ` · ±${Number(o.estimated_kg)} kg` : ''}</span></div>
      ${o.notes ? `<div class="card-row">${ico('note')}<span>${esc(o.notes)}</span></div>` : ''}
    </div>
    <div class="card-foot">
      <div><span style="font-size:11px;color:var(--txt-3);display:block;font-weight:600">${waktu(o.created_at)}</span></div>
      <span class="price">${rupiah(o.total_price)}</span>
    </div>
  </article>`;
}

function renderOrders() {
  const list = S.filter === 'all' ? S.orders : S.orders.filter((o) => o.status === S.filter);
  const pend = S.orders.filter((o) => o.status === 'PENDING').length;
  const jalan = S.orders.filter((o) => o.status === 'IN_PROGRESS' || o.status === 'CONFIRMED').length;
  const selesai = S.orders.filter((o) => o.status === 'COMPLETED').length;
  const omzet = S.orders.filter((o) => o.status === 'COMPLETED').reduce((a, o) => a + Number(o.total_price || 0), 0);
  $('#v-orders').innerHTML = `
    <div class="stats">
      ${statCard('inbox', 'amber', pend, 'Menunggu konfirmasi')}
      ${statCard('truck', 'violet', jalan, 'Sedang berjalan')}
      ${statCard('checkC', 'brand', selesai, 'Selesai')}
      ${statCard('wallet', 'blue', rupiah(omzet).replace('Rp ', 'Rp'), 'Total selesai')}
    </div>
    <div class="sec-head"><h2>Pesanan Warga</h2><span>${list.length} pesanan</span></div>
    <div class="filters">
      ${['all', 'PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map((f) =>
        `<button class="chip${S.filter === f ? ' on' : ''}" data-filter="${f}">${f === 'all' ? 'Semua' : STATUS_LABEL[f]}</button>`).join('')}
    </div>
    ${list.length ? list.map(orderCard).join('') : `<div class="empty">${ico('inbox')}<p>Belum ada pesanan${S.filter !== 'all' ? ' dengan status ini' : ''}.</p></div>`}`;
  $('#v-orders').querySelectorAll('[data-filter]').forEach((b) => { b.onclick = () => { S.filter = b.dataset.filter; render(); }; });
  bindCards();
}

function renderInventory() {
  const total = S.inventory.reduce((a, i) => a + Number(i.weight_kg || 0), 0);
  const siap = S.inventory.filter((i) => i.status === 'READY' || i.status === 'ready').length;
  const nilai = S.inventory.reduce((a, i) => a + Number(i.weight_kg || 0) * Number(i.price_per_kg || 0), 0);
  $('#v-inventory').innerHTML = `
    <div class="stats">
      ${statCard('box', 'brand', S.inventory.length, 'Jenis pasokan')}
      ${statCard('scale', 'blue', total + ' kg', 'Total berat')}
      ${statCard('checkC', 'violet', siap, 'Siap dijemput')}
      ${statCard('wallet', 'amber', rupiah(nilai), 'Estimasi nilai')}
    </div>
    <div class="sec-head"><h2>Inventori Daur Ulang</h2><span>${S.inventory.length} item</span></div>
    ${S.inventory.length ? S.inventory.map((i) => `
      <article class="card">
        <div class="card-top">
          <div style="min-width:0"><div class="card-id">${esc(i.category || 'MATERIAL')}</div>
          <div class="card-name">${esc(i.title || '-')}</div></div>
          <span class="tag t-${(i.status || '').toUpperCase() === 'READY' ? 'COMPLETED' : 'PENDING'}">${ico('box')}${esc(i.status || 'PENDING')}</span>
        </div>
        <div class="card-rows">
          <div class="card-row">${ico('scale')}<span><b>${Number(i.weight_kg || 0)} kg</b> · ${rupiah(i.price_per_kg)}/kg</span></div>
          <div class="card-row">${ico('mapPin')}<span>${esc(i.location || '-')}</span></div>
          ${i.notes ? `<div class="card-row">${ico('note')}<span>${esc(i.notes)}</span></div>` : ''}
        </div>
        <div class="card-foot"><span style="font-size:11px;color:var(--txt-3);font-weight:600">${waktu(i.created_at)}</span>
        <span class="price">${rupiah(Number(i.weight_kg || 0) * Number(i.price_per_kg || 0))}</span></div>
      </article>`).join('') : `<div class="empty">${ico('box')}<p>Belum ada data inventori.</p></div>`}`;
}

function renderMitra() {
  const bookings = S.bookings;
  const pasokan = S.inventory;
  $('#v-mitra').innerHTML = `
    <div class="sec-head"><h2>Pasokan Siap Dijemput</h2><span>${pasokan.length} item</span></div>
    ${pasokan.length ? pasokan.map((i) => `
      <article class="card">
        <div class="card-top"><div style="min-width:0">
          <div class="card-id">${esc(i.category || 'MATERIAL')}</div>
          <div class="card-name">${esc(i.title || '-')}</div></div>
          <span class="tag t-CONFIRMED">${ico('factory')}${esc(i.status || 'READY')}</span>
        </div>
        <div class="card-rows">
          <div class="card-row">${ico('scale')}<span><b>${Number(i.weight_kg || 0)} kg</b> @ ${rupiah(i.price_per_kg)}/kg</span></div>
          <div class="card-row">${ico('mapPin')}<span>${esc(i.location || '-')}</span></div>
        </div>
        <div class="card-foot"><span style="font-size:11px;color:var(--txt-3);font-weight:600">Siap ${esc(i.ready_date || '-')}</span>
        <span class="price">${rupiah(Number(i.weight_kg || 0) * Number(i.price_per_kg || 0))}</span></div>
      </article>`).join('') : `<div class="empty">${ico('factory')}<p>Belum ada pasokan dari admin.</p></div>`}
    <div class="sec-head" style="margin-top:22px"><h2>Booking Perusahaan</h2><span>${bookings.length} pengajuan</span></div>
    ${bookings.length ? bookings.map((b) => `
      <article class="card">
        <div class="card-top"><div style="min-width:0">
          <div class="card-id">${esc(b.id)}</div>
          <div class="card-name">${esc(b.company_name || b.name || 'Perusahaan')}</div></div>
          <span class="tag t-${(b.status || 'PENDING').toUpperCase()}">${ico('clock')}${esc(b.status || 'PENDING')}</span>
        </div>
        <div class="card-rows">
          <div class="card-row">${ico('phone')}<span>${esc(b.phone || b.contact || '-')}</span></div>
          <div class="card-row">${ico('box')}<span>${esc(b.waste_type || b.description || '-')}</span></div>
        </div>
      </article>`).join('') : `<div class="empty">${ico('factory')}<p>Belum ada pengajuan dari perusahaan.</p></div>`}`;
}

function renderNotif() {
  $('#v-notif').innerHTML = `
    <div class="sec-head"><h2>Notifikasi</h2><span>${S.notifs.filter((n) => !n.is_read).length} belum dibaca</span></div>
    ${S.notifs.length ? S.notifs.map((n) => `
      <div class="notif${n.is_read ? '' : ' unread'}" data-nid="${esc(n.id)}">
        <div class="notif-ico">${ico(n.type === 'order' ? 'truck' : n.type === 'alert' ? 'alert' : 'bell')}</div>
        <div class="notif-body"><h4>${esc(n.title || 'Pemberitahuan')}</h4>
        <p>${esc(n.message || '')}</p><time>${waktu(n.created_at)}</time></div>
      </div>`).join('') : `<div class="empty">${ico('bell')}<p>Belum ada notifikasi.</p></div>`}`;
  $('#v-notif').querySelectorAll('[data-nid]').forEach((el) => {
    el.onclick = async () => {
      const id = el.dataset.nid;
      const n = S.notifs.find((x) => String(x.id) === id);
      if (n && !n.is_read) { n.is_read = true; checkNotifs(); render(); await sb.from('app_notifications').update({ is_read: true }).eq('id', n.id); }
    };
  });
}

function renderProfil() {
  const o = S.orders, done = o.filter((x) => x.status === 'COMPLETED');
  $('#v-profil').innerHTML = `
    <div class="card" style="text-align:center;padding:24px">
      <div class="avatar" data-role="${S.role}" style="width:64px;height:64px;border-radius:20px;margin:0 auto 14px">${ico(S.role === 'ADMIN' ? 'shield' : 'factory')}</div>
      <div class="card-name" style="font-size:17px">${esc(S.user.name)}</div>
      <div style="font-size:12.5px;color:var(--txt-2);margin-top:4px">${esc(S.user.email)}</div>
      <span class="tag ${S.role === 'ADMIN' ? 't-COMPLETED' : 't-IN_PROGRESS'}" style="margin-top:12px">${ico(S.role === 'ADMIN' ? 'shield' : 'factory')}${S.role}</span>
    </div>
    <div class="stats">
      ${statCard('inbox', 'blue', o.length, 'Total pesanan')}
      ${statCard('checkC', 'brand', done.length, 'Diselesaikan')}
      ${statCard('wallet', 'amber', rupiah(done.reduce((a, x) => a + Number(x.total_price || 0), 0)), 'Nilai selesai')}
      ${statCard('box', 'violet', S.inventory.length, 'Pasokan')}
    </div>
    <div class="detail-block">
      <h4>Status Sistem</h4>
      <div class="detail-line"><span>Koneksi Supabase</span><span style="color:${S.live ? 'var(--brand)' : 'var(--rose)'}">${S.live ? 'Terhubung' : 'Terputus'}</span></div>
      <div class="detail-line"><span>Realtime pesanan</span><span style="color:${S.live ? 'var(--brand)' : 'var(--rose)'}">${S.live ? 'Aktif' : 'Nonaktif'}</span></div>
      <div class="detail-line"><span>Versi aplikasi</span><span>2.0.0</span></div>
    </div>
    <div class="detail-block">
      <h4>Sumber Data</h4>
      <p style="font-size:12.5px;color:var(--txt-2);line-height:1.7">Aplikasi ini membaca dan menulis langsung ke tabel <b>orders</b>, <b>waste_inventory</b>, <b>company_bookings</b>, dan <b>app_notifications</b>. Pesanan dari website warga muncul otomatis tanpa perlu disegarkan.</p>
    </div>
    <button class="btn-primary" id="logout2" style="background:linear-gradient(135deg,var(--rose),#e11d48);color:#fff;box-shadow:none">
      ${ico('logout', 'stroke:#fff')}<span>Keluar dari Aplikasi</span></button>`;
  $('#logout2').onclick = logout;
}

/* ---------- DETAIL SHEET ---------- */
function bindCards() {
  document.querySelectorAll('[data-open]').forEach((el) => {
    el.onclick = () => openSheet(el.dataset.open);
  });
}

function openSheet(id) {
  const o = S.orders.find((x) => String(x.id) === String(id));
  if (!o) return;
  S.openId = id;
  const opts = ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
  $('#sheetContent').innerHTML = `
    <div class="sheet-head">
      <div><div class="card-id">${esc(o.id)}</div><h3 style="margin-top:2px">Detail Pesanan</h3></div>
      <button class="icon-btn" id="sheetClose">${ico('x')}</button>
    </div>
    <div class="detail-block">
      <h4>Data Warga</h4>
      <div class="detail-line"><span>Nama</span><span>${esc(o.customer_name || '-')}</span></div>
      <div class="detail-line"><span>Telepon</span><span>${esc(o.customer_phone || '-')}</span></div>
      <div class="detail-line"><span>Alamat</span><span>${esc(o.customer_address || '-')}</span></div>
    </div>
    <div class="detail-block">
      <h4>Rincian Angkut</h4>
      <div class="detail-line"><span>Jenis sampah</span><span>${esc(WASTE_LABEL[o.waste_type] || o.waste_type || '-')}</span></div>
      <div class="detail-line"><span>Estimasi berat</span><span>${o.estimated_kg ? Number(o.estimated_kg) + ' kg' : '-'}</span></div>
      <div class="detail-line"><span>Catatan warga</span><span>${esc(o.notes || '-')}</span></div>
      <div class="detail-line"><span>Total biaya</span><span class="price">${rupiah(o.total_price)}</span></div>
      <div class="detail-line"><span>Dibuat</span><span>${waktu(o.created_at)}</span></div>
    </div>
    <div class="detail-block">
      <h4>Ubah Status</h4>
      <div class="status-grid" id="statusGrid">
        ${opts.map((s) => `<button class="status-opt${o.status === s ? ' on' : ''}" data-s="${s}">${ico(STATUS_ICON[s])}${STATUS_LABEL[s]}</button>`).join('')}
      </div>
    </div>
    <div class="detail-block">
      <h4>Catatan Admin</h4>
      <textarea class="note" id="adminNote" placeholder="Contoh: Sampah telah diangkut & disetor ke TPST">${esc(o.admin_notes || '')}</textarea>
    </div>
    <div class="btn-row">
      <button class="btn-ghost" id="waBtn">${ico('phone', 'display:inline;vertical-align:-3px;width:15px;height:15px;stroke:currentColor')} WhatsApp</button>
      <button class="btn-save" id="saveBtn">${ico('save')}<span>Simpan Perubahan</span></button>
    </div>`;
  let pick = o.status;
  $('#sheetContent').querySelectorAll('.status-opt').forEach((b) => {
    b.onclick = () => { pick = b.dataset.s; $('#sheetContent').querySelectorAll('.status-opt').forEach((x) => x.classList.toggle('on', x === b)); };
  });
  $('#sheetClose').onclick = closeSheet;
  $('#waBtn').onclick = () => {
    const num = String(o.customer_phone || '').replace(/\D/g, '').replace(/^0/, '62');
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(`PickTrash - Pesanan ${o.id}\nHalo ${o.customer_name || ''}, pesanan Anda sedang kami proses.`)}`, '_blank');
  };
  $('#saveBtn').onclick = async () => {
    const btn = $('#saveBtn'); btn.disabled = true;
    const patch = { status: pick, admin_notes: $('#adminNote').value.trim(), updated_at: new Date().toISOString() };
    const { error } = await sb.from('orders').update(patch).eq('id', o.id);
    btn.disabled = false;
    if (error) return toast('Gagal menyimpan', error.message, 'warn');
    const i = S.orders.findIndex((x) => String(x.id) === String(o.id));
    if (i >= 0) S.orders[i] = { ...S.orders[i], ...patch };
    toast('Tersimpan', 'Status: ' + STATUS_LABEL[pick] + ' · tersinkron ke website');
    closeSheet(); render();
  };
  $('#sheetBg').classList.add('on');
  $('#sheet').classList.add('on');
}

function closeSheet() {
  S.openId = null;
  $('#sheetBg').classList.remove('on');
  $('#sheet').classList.remove('on');
}
$('#sheetBg').onclick = closeSheet;

/* ---------- LOGOUT / GLOBAL ---------- */
function logout() {
  try { localStorage.removeItem('angkutaja_admin_session'); } catch (e) {}
  location.reload();
}
$('#logoutBtn').onclick = logout;
$('#refreshBtn').onclick = () => { refreshAll(); toast('Menyegarkan data', 'Mengambil dari Supabase', 'info'); };
$('#bellBtn').onclick = () => { S.tab = 'notif'; buildTabs(); render(); };

/* ---------- PWA ---------- */
// Di dalam aplikasi Android native semua aset sudah dibundel di APK,
// jadi service worker tidak didaftarkan (aset dimuat lewat pemuat aset).
const IS_NATIVE_APP = window.location.host === 'angkutaja-admin.local';
if ('serviceWorker' in navigator && !IS_NATIVE_APP) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

/* ---------- AUTO LOGIN + START ---------- */
(async function start() {
  setRole('ADMIN');
  try {
    const saved = JSON.parse(localStorage.getItem('angkutaja_admin_session') || 'null');
    if (saved && saved.role) {
      S.role = saved.role; S.user = saved; await boot();
    }
  } catch (e) {}
  setTimeout(() => $('#splash').classList.add('off'), 700);
})();
