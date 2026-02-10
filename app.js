// ── Config ──────────────────────────────────────────
const START_H = 9, END_H = 21;
const HOURS   = END_H - START_H;          // 12
const ROW_H   = 54;                       // px per hour (must match CSS --row-h)
const TIME_STEP = 15;                     // minutes for custom time selectors
const DAY_LABELS = { 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri' };
const PALETTES = {
  snu: {
    label: 'SNU',
    colors: ['c-navy', 'c-moss', 'c-wine', 'c-slate', 'c-umber', 'c-teal'],
  },
  flexoki: {
    label: 'Flexoki',
    colors: [
      'c-flex-red',
      'c-flex-orange',
      'c-flex-yellow',
      'c-flex-green',
      'c-flex-cyan',
      'c-flex-blue',
      'c-flex-purple',
      'c-flex-magenta',
    ],
  },
  warm: {
    label: 'Warm',
    colors: ['c-wine', 'c-umber', 'c-flex-orange', 'c-flex-red', 'c-flex-yellow', 'c-moss'],
  },
  cool: {
    label: 'Cool',
    colors: ['c-navy', 'c-slate', 'c-flex-blue', 'c-flex-cyan', 'c-flex-purple', 'c-teal'],
  },
  earth: {
    label: 'Earth',
    colors: ['c-umber', 'c-wine', 'c-moss', 'c-flex-yellow', 'c-flex-orange', 'c-teal'],
  },
  dawn: {
    label: 'Dawn',
    colors: ['c-flex-magenta', 'c-flex-purple', 'c-flex-blue', 'c-flex-cyan', 'c-teal', 'c-slate'],
  },
  vivid: {
    label: 'Vivid',
    colors: [
      'c-flex-red',
      'c-flex-orange',
      'c-flex-yellow',
      'c-flex-green',
      'c-flex-cyan',
      'c-flex-blue',
      'c-flex-purple',
      'c-flex-magenta',
    ],
  },
  muted: {
    label: 'Muted',
    colors: ['c-moss', 'c-teal', 'c-umber', 'c-slate', 'c-navy', 'c-wine'],
  },
  stone: {
    label: 'Stone',
    colors: ['c-slate', 'c-navy', 'c-moss', 'c-umber', 'c-wine', 'c-teal'],
  },
  breeze: {
    label: 'Breeze',
    colors: ['c-flex-cyan', 'c-flex-blue', 'c-navy', 'c-slate', 'c-teal', 'c-moss'],
  },
};
const COLOR_ACCENTS = {
  'c-navy': 'rgb(15, 15, 112)',
  'c-moss': 'rgb(102, 102, 102)',
  'c-wine': 'rgb(135, 116, 68)',
  'c-slate': '#1f2270',
  'c-umber': 'rgb(135, 116, 68)',
  'c-teal': 'rgb(102, 102, 102)',
  'c-flex-red': '#AF3029',
  'c-flex-orange': '#BC5215',
  'c-flex-yellow': '#AD8301',
  'c-flex-green': '#66800B',
  'c-flex-cyan': '#24837B',
  'c-flex-blue': '#205EA6',
  'c-flex-purple': '#5E409D',
  'c-flex-magenta': '#A02F6F',
};

// ── Storage / Auth ───────────────────────────────────
const USERS_KEY = 'tt_users_v1';
const SESSION_KEY = 'tt_session_v1';
const DATA_KEY_PREFIX = 'tt_data_v1_';
const CARD_INFO_KEY = 'tt_card_info_v1';
const CARD_INFO_ORDER = ['prof', 'room', 'credit'];
const CARD_INFO_DEFAULT = ['prof', 'room'];
const SEMESTERS = ['1-1','1-2','2-1','2-2','3-1','3-2','4-1','4-2'];

const SAMPLE_TABLES = [
  {
    name: 'Sample A',
    courses: [
      { name:'통계학실험', prof:'', room:'25-204', day:1, start:'09:00', end:'10:30', credit:1, color:'c-flex-red' },
      { name:'물리학 1', prof:'', room:'26-B101', day:2, start:'10:00', end:'11:30', credit:3, color:'c-flex-blue' },
      { name:'물리학실험 1', prof:'', room:'26-304', day:3, start:'09:00', end:'11:00', credit:1, color:'c-flex-green' },
      { name:'대학영어 1', prof:'', room:'2-101', day:5, start:'10:00', end:'11:00', credit:2, color:'c-flex-cyan' },
      { name:'통계학', prof:'', room:'26-B102', day:1, start:'12:00', end:'13:00', credit:3, color:'c-flex-yellow' },
      { name:'컴퓨터의 개념 및 실습', prof:'', room:'302-408', day:2, start:'13:00', end:'15:00', credit:3, color:'c-flex-orange' },
      { name:'수학 1', prof:'', room:'25-104', day:1, start:'14:00', end:'15:00', credit:3, color:'c-flex-green' },
      { name:'대학 글쓰기 1', prof:'', room:'9-105', day:2, start:'15:00', end:'16:00', credit:2, color:'c-flex-purple' },
    ],
  },
  {
    name: 'Sample B',
    courses: [
      { name:'고급 알고리즘', prof:'김지원', room:'IT관 404', day:1, start:'10:00', end:'12:15', credit:3, color:'c-navy' },
      { name:'인공지능 개론', prof:'박세은', room:'공학관 302', day:3, start:'13:00', end:'15:15', credit:3, color:'c-wine' },
      { name:'데이터베이스', prof:'이준혁', room:'정보관 201', day:2, start:'14:00', end:'15:30', credit:2, color:'c-moss' },
      { name:'운영체제', prof:'최민서', room:'IT관 101', day:4, start:'11:00', end:'12:30', credit:2, color:'c-slate' },
      { name:'선형대수', prof:'정하준', room:'자연대 102', day:5, start:'09:00', end:'10:30', credit:3, color:'c-umber' },
    ],
  },
];

const SNU_COLLEGES = [
  {
    name: '인문대학',
    departments: [
      '국어국문학과',
      '중어중문학과',
      '영어영문학과',
      '불어불문학과',
      '독어독문학과',
      '노어노문학과',
      '서어서문학과',
      '아시아언어문명학부',
      '언어학과',
      '역사학부',
      '철학과',
      '종교학과',
      '미학과',
      '고고미술사학과',
    ],
  },
  {
    name: '사회과학대학',
    departments: [
      '정치외교학부(정치학전공)',
      '정치외교학부(외교학전공)',
      '경제학부',
      '사회학과',
      '인류학과',
      '심리학과',
      '지리학과',
      '사회복지학과',
      '언론정보학과',
    ],
  },
  {
    name: '자연과학대학',
    departments: [
      '수리과학부',
      '통계학과',
      '물리천문학부(물리학전공)',
      '물리천문학부(천문학전공)',
      '화학부',
      '생명과학부',
      '지구환경과학부',
    ],
  },
  {
    name: '간호대학',
    departments: ['간호학과'],
  },
  {
    name: '경영대학',
    departments: ['경영학과'],
  },
  {
    name: '공과대학',
    departments: [
      '건설환경공학부',
      '기계공학부',
      '항공우주공학과',
      '재료공학부',
      '전기·정보공학부',
      '컴퓨터공학부',
      '화학생물공학부',
      '건축학과',
      '산업공학과',
      '에너지자원공학과',
      '원자핵공학과',
      '조선해양공학과',
    ],
  },
  {
    name: '농업생명과학대학',
    departments: [
      '식물생산과학부',
      '산림과학부',
      '응용생물화학부',
      '식품·동물생명공학부',
      '바이오시스템·소재학부',
      '조경·지역시스템공학부',
      '농경제사회학부',
      '스마트시스템과학과',
    ],
  },
  {
    name: '미술대학',
    departments: [
      '동양화과',
      '서양화과',
      '조소과',
      '공예과',
      '디자인과',
    ],
  },
  {
    name: '사범대학',
    departments: [
      '교육학과',
      '국어교육과',
      '영어교육과',
      '불어교육과',
      '독어교육과',
      '사회교육과',
      '역사교육과',
      '지리교육과',
      '윤리교육과',
      '수학교육과',
      '물리교육과',
      '화학교육과',
      '생물교육과',
      '지구과학교육과',
      '체육교육과',
    ],
  },
  {
    name: '생활과학대학',
    departments: [
      '소비자아동학부(소비자학전공)',
      '소비자아동학부(아동가족학전공)',
      '식품영양학과',
      '의류학과',
    ],
  },
  {
    name: '수의과대학',
    departments: ['수의예과', '수의학과'],
  },
  {
    name: '약학대학',
    departments: ['약학과', '제약학과'],
  },
  {
    name: '음악대학',
    departments: [
      '성악과',
      '작곡과',
      '음악학과',
      '피아노과',
      '관현악과',
      '국악과',
    ],
  },
  {
    name: '의과대학',
    departments: ['의예과', '의학과'],
  },
  {
    name: '자유전공학부',
    departments: ['자유전공학부'],
  },
  {
    name: '첨단융합학부',
    departments: ['첨단융합학부'],
  },
];

function cloneCourses(list) {
  return list.map((c, i) => {
    const slots = normalizeSlots(Array.isArray(c.slots)
      ? c.slots
      : (c.day && c.start && c.end ? [{ day: c.day, start: c.start, end: c.end }] : []));
    const copy = { ...c, slots, id: i + 1 };
    if (slots[0]) {
      copy.day = slots[0].day;
      copy.start = slots[0].start;
      copy.end = slots[0].end;
    }
    return copy;
  });
}
function createDefaultUserData() {
  const semesters = {};
  SEMESTERS.forEach((sem) => {
    const tables = SAMPLE_TABLES.map((t, idx) => ({
      id: `tt-${sem}-${idx + 1}`,
      name: `${t.name} (${sem})`,
      courses: cloneCourses(t.courses),
    }));
    semesters[sem] = { timetables: tables, activeId: tables[0].id };
  });
  return { semesters, lastSemester: SEMESTERS[0] };
}

function safeParse(raw, fallback) {
  try { return JSON.parse(raw) ?? fallback; } catch { return fallback; }
}
function getUsers() { return safeParse(localStorage.getItem(USERS_KEY), {}); }
function setUsers(obj) { localStorage.setItem(USERS_KEY, JSON.stringify(obj)); }
function getSessionUser() { return localStorage.getItem(SESSION_KEY); }
function setSessionUser(id) { localStorage.setItem(SESSION_KEY, id); }
function clearSessionUser() { localStorage.removeItem(SESSION_KEY); }
function getUserData(userId) {
  return safeParse(localStorage.getItem(DATA_KEY_PREFIX + userId), null);
}
function saveUserData(userId, data) {
  localStorage.setItem(DATA_KEY_PREFIX + userId, JSON.stringify(data));
}
function ensureUserData(userId) {
  let data = getUserData(userId);
  if (!data) {
    data = createDefaultUserData();
    saveUserData(userId, data);
  }
  return data;
}

function getNextId(list) {
  let maxId = 0;
  list.forEach((c) => { if (c.id > maxId) maxId = c.id; });
  return maxId + 1;
}

async function hashPassword(pw) {
  if (window.crypto && window.crypto.subtle) {
    const buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  let hash = 0;
  for (let i = 0; i < pw.length; i++) {
    hash = (hash << 5) - hash + pw.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
}

// ── State ───────────────────────────────────────────
let courses = [];
let nextId = 1;
let selectedColor = 'c-navy';
let detailSelectedColor = null;
let cardInfoSelection = CARD_INFO_DEFAULT.slice();
let draftSlots = [];
let detailSlots = [];
let activeId = null;
let currentUserId = null;
let currentSemester = null;
let currentTableId = null;

const currentUserEl = document.getElementById('currentUser');
const panelUserEl = document.getElementById('panelUser');
const semesterSelect = document.getElementById('semesterSelect');
const timetableSelect = document.getElementById('timetableSelect');
const newTableBtn = document.getElementById('newTable');
const copyTableBtn = document.getElementById('copyTable');
const renameTableBtn = document.getElementById('renameTable');
const logoutBtn = document.getElementById('logoutBtn');
const authBackdrop = document.getElementById('authBackdrop');
const authIdInput = document.getElementById('authId');
const authPwInput = document.getElementById('authPw');
const authStatus = document.getElementById('authStatus');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const swatches = document.getElementById('swatches');
const toggleProf = document.getElementById('toggleProf');
const toggleRoom = document.getElementById('toggleRoom');
const toggleCredit = document.getElementById('toggleCredit');
const toggleHelp = document.getElementById('toggleHelp');
const saveImageBtn = document.getElementById('saveImage');
const promptBackdrop = document.getElementById('promptBackdrop');
const promptTitle = document.getElementById('promptTitle');
const promptLabel = document.getElementById('promptLabel');
const promptInput = document.getElementById('promptInput');
const promptCancel = document.getElementById('promptCancel');
const promptOk = document.getElementById('promptOk');
const promptStatus = document.getElementById('promptStatus');
const profileCollege = document.getElementById('profileCollege');
const profileDept = document.getElementById('profileDept');
const authCollege = document.getElementById('authCollege');
const authDept = document.getElementById('authDept');
const paletteSelect = document.getElementById('paletteSelect');
const daySelect = document.getElementById('f-day');
const startInput = document.getElementById('f-start');
const endInput = document.getElementById('f-end');
const slotListEl = document.getElementById('slotList');
const slotItemsEl = document.getElementById('slotItems');
const addSlotBtn = document.getElementById('addSlotBtn');
const clearSlotsBtn = document.getElementById('clearSlotsBtn');
const detailStartInput = document.getElementById('d-start');
const detailEndInput = document.getElementById('d-end');
const detailNameInput = document.getElementById('d-name');
const detailProfInput = document.getElementById('d-prof');
const detailRoomInput = document.getElementById('d-room');
const detailCreditInput = document.getElementById('d-credit');
const detailDaySelect = document.getElementById('d-day');
const detailSwatches = document.getElementById('detailSwatches');
const detailSlotList = document.getElementById('detailSlotList');
const detailSlotItems = document.getElementById('detailSlotItems');
const detailAddSlotBtn = document.getElementById('detailAddSlot');
const detailClearSlotsBtn = document.getElementById('detailClearSlots');
const timetableEl = document.getElementById('timetable');

// ── Custom Selects ──────────────────────────────────
const customPickers = new Set();
const customPickerByEl = new Map();

function closeAllCustomPickers(except) {
  customPickers.forEach((picker) => {
    if (picker !== except) picker.close();
  });
}

function buildTimeOptions() {
  const times = [];
  for (let mins = START_H * 60; mins <= END_H * 60; mins += TIME_STEP) {
    const hh = String(Math.floor(mins / 60)).padStart(2, '0');
    const mm = String(mins % 60).padStart(2, '0');
    times.push(`${hh}:${mm}`);
  }
  return times;
}

const TIME_OPTIONS = buildTimeOptions();

function makeOptionButton({ value, label, selected, disabled }) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'custom-option';
  btn.dataset.value = value;
  btn.textContent = label;
  btn.setAttribute('role', 'option');
  if (selected) {
    btn.classList.add('selected');
    btn.setAttribute('aria-selected', 'true');
  } else {
    btn.setAttribute('aria-selected', 'false');
  }
  if (disabled) btn.disabled = true;
  return btn;
}

function initCustomSelect(selectEl, config = {}) {
  if (!selectEl) return null;
  const wrapper = selectEl.closest('.custom-select');
  if (!wrapper) return null;
  const trigger = wrapper.querySelector('.custom-select-trigger');
  const menu = wrapper.querySelector('.custom-select-menu');
  if (!trigger || !menu) return null;
  const placeholder = wrapper.dataset.placeholder || config.placeholder || 'Select';

  function getEnabledOptions() {
    return Array.from(menu.querySelectorAll('.custom-option')).filter((btn) => !btn.disabled);
  }
  function focusOptionByIndex(idx) {
    const options = getEnabledOptions();
    if (!options.length) return;
    const nextIndex = (idx + options.length) % options.length;
    options[nextIndex].focus();
    options[nextIndex].scrollIntoView({ block: 'nearest' });
  }
  function focusSelectedOption() {
    const options = getEnabledOptions();
    if (!options.length) return;
    let idx = options.findIndex((btn) => btn.dataset.value === selectEl.value);
    if (idx < 0) idx = 0;
    focusOptionByIndex(idx);
  }

  function setOpen(isOpen) {
    wrapper.classList.toggle('open', isOpen);
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
  function close() { setOpen(false); }
  function open() {
    closeAllCustomPickers(api);
    setOpen(true);
    requestAnimationFrame(focusSelectedOption);
  }
  function toggle() { wrapper.classList.contains('open') ? close() : open(); }

  function syncSelected() {
    const value = selectEl.value;
    menu.querySelectorAll('.custom-option').forEach((btn) => {
      const selected = btn.dataset.value === value;
      btn.classList.toggle('selected', selected);
      btn.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
  }

  function syncLabel() {
    const selectedOption = selectEl.selectedOptions && selectEl.selectedOptions[0];
    if (selectedOption && selectedOption.value !== '') {
      trigger.textContent = selectedOption.textContent;
      trigger.classList.remove('is-placeholder');
    } else {
      trigger.textContent = placeholder;
      trigger.classList.add('is-placeholder');
    }
    syncSelected();
  }

  function rebuildOptions() {
    menu.innerHTML = '';
    const options = Array.from(selectEl.options);
    if (!options.length) {
      trigger.textContent = placeholder;
      trigger.classList.add('is-placeholder');
      return;
    }
    options.forEach((opt) => {
      const btn = makeOptionButton({
        value: opt.value,
        label: opt.textContent,
        selected: opt.value === selectEl.value,
        disabled: opt.disabled,
      });
      menu.appendChild(btn);
    });
    syncLabel();
  }

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    toggle();
  });
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!wrapper.classList.contains('open')) open();
      else focusSelectedOption();
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
      if (wrapper.classList.contains('open')) focusSelectedOption();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  });
  menu.addEventListener('click', (e) => {
    const btn = e.target.closest('.custom-option');
    if (!btn || btn.disabled) return;
    selectEl.value = btn.dataset.value;
    selectEl.dispatchEvent(new Event('change', { bubbles: true }));
    syncLabel();
    close();
    trigger.focus();
  });
  menu.addEventListener('keydown', (e) => {
    const options = getEnabledOptions();
    if (!options.length) return;
    const currentIndex = options.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusOptionByIndex(currentIndex + 1);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusOptionByIndex(currentIndex - 1);
    }
    if (e.key === 'Home') {
      e.preventDefault();
      focusOptionByIndex(0);
    }
    if (e.key === 'End') {
      e.preventDefault();
      focusOptionByIndex(options.length - 1);
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const activeBtn = document.activeElement;
      if (activeBtn && activeBtn.classList.contains('custom-option')) {
        activeBtn.click();
      }
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      trigger.focus();
    }
  });
  selectEl.addEventListener('change', syncLabel);

  const api = { close, rebuild: rebuildOptions, sync: syncLabel, wrapper };
  customPickers.add(api);
  customPickerByEl.set(selectEl, api);
  rebuildOptions();
  return api;
}

function initCustomTime(inputEl, config = {}) {
  if (!inputEl) return null;
  const wrapper = inputEl.closest('.custom-select');
  if (!wrapper) return null;
  const trigger = wrapper.querySelector('.custom-select-trigger');
  const menu = wrapper.querySelector('.custom-select-menu');
  if (!trigger || !menu) return null;
  const placeholder = wrapper.dataset.placeholder || config.placeholder || '--:--';
  const options = config.options || TIME_OPTIONS;

  function getEnabledOptions() {
    return Array.from(menu.querySelectorAll('.custom-option')).filter((btn) => !btn.disabled);
  }
  function focusOptionByIndex(idx) {
    const opts = getEnabledOptions();
    if (!opts.length) return;
    const nextIndex = (idx + opts.length) % opts.length;
    opts[nextIndex].focus();
    opts[nextIndex].scrollIntoView({ block: 'nearest' });
  }
  function focusSelectedOption() {
    const opts = getEnabledOptions();
    if (!opts.length) return;
    let idx = opts.findIndex((btn) => btn.dataset.value === inputEl.value);
    if (idx < 0) idx = 0;
    focusOptionByIndex(idx);
  }

  function setOpen(isOpen) {
    wrapper.classList.toggle('open', isOpen);
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
  function close() { setOpen(false); }
  function open() {
    closeAllCustomPickers(api);
    setOpen(true);
    requestAnimationFrame(focusSelectedOption);
  }
  function toggle() { wrapper.classList.contains('open') ? close() : open(); }

  function syncSelected() {
    const value = inputEl.value;
    menu.querySelectorAll('.custom-option').forEach((btn) => {
      const selected = btn.dataset.value === value;
      btn.classList.toggle('selected', selected);
      btn.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
  }

  function syncLabel() {
    if (inputEl.value) {
      trigger.textContent = inputEl.value;
      trigger.classList.remove('is-placeholder');
    } else {
      trigger.textContent = placeholder;
      trigger.classList.add('is-placeholder');
    }
    syncSelected();
  }

  function rebuildOptions() {
    menu.innerHTML = '';
    options.forEach((t) => {
      const btn = makeOptionButton({
        value: t,
        label: t,
        selected: t === inputEl.value,
      });
      menu.appendChild(btn);
    });
    syncLabel();
  }

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    toggle();
  });
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!wrapper.classList.contains('open')) open();
      else focusSelectedOption();
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
      if (wrapper.classList.contains('open')) focusSelectedOption();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  });
  menu.addEventListener('click', (e) => {
    const btn = e.target.closest('.custom-option');
    if (!btn || btn.disabled) return;
    inputEl.value = btn.dataset.value;
    inputEl.dispatchEvent(new Event('change', { bubbles: true }));
    syncLabel();
    close();
    trigger.focus();
  });
  menu.addEventListener('keydown', (e) => {
    const opts = getEnabledOptions();
    if (!opts.length) return;
    const currentIndex = opts.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusOptionByIndex(currentIndex + 1);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusOptionByIndex(currentIndex - 1);
    }
    if (e.key === 'Home') {
      e.preventDefault();
      focusOptionByIndex(0);
    }
    if (e.key === 'End') {
      e.preventDefault();
      focusOptionByIndex(opts.length - 1);
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const activeBtn = document.activeElement;
      if (activeBtn && activeBtn.classList.contains('custom-option')) {
        activeBtn.click();
      }
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      trigger.focus();
    }
  });
  inputEl.addEventListener('change', syncLabel);

  const api = { close, rebuild: rebuildOptions, sync: syncLabel, wrapper };
  customPickers.add(api);
  customPickerByEl.set(inputEl, api);
  rebuildOptions();
  return api;
}

function refreshCustomPicker(el) {
  const picker = customPickerByEl.get(el);
  if (picker) picker.rebuild();
}

function syncCustomPicker(el) {
  const picker = customPickerByEl.get(el);
  if (picker) picker.sync();
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.custom-select')) closeAllCustomPickers();
});

initCustomSelect(semesterSelect, { placeholder: 'Select semester' });
initCustomSelect(timetableSelect, { placeholder: 'Select timetable' });
initCustomSelect(profileCollege, { placeholder: 'Select college' });
initCustomSelect(profileDept, { placeholder: 'Select department' });
initCustomSelect(authCollege, { placeholder: 'Select college' });
initCustomSelect(authDept, { placeholder: 'Select department' });
initCustomSelect(paletteSelect, { placeholder: 'Select palette' });
initCustomSelect(daySelect, { placeholder: 'Select day' });
initCustomSelect(detailDaySelect, { placeholder: 'Select day' });
initCustomTime(startInput, { placeholder: '--:--' });
initCustomTime(endInput, { placeholder: '--:--' });
initCustomTime(detailStartInput, { placeholder: '--:--' });
initCustomTime(detailEndInput, { placeholder: '--:--' });

let promptResolver = null;
let promptRequired = false;

function openPrompt(options = {}) {
  return new Promise((resolve) => {
    promptResolver = resolve;
    promptRequired = Boolean(options.required);
    if (promptTitle) promptTitle.textContent = options.title || 'Input';
    if (promptLabel) promptLabel.textContent = options.label || 'Name';
    if (promptInput) {
      promptInput.value = options.value || '';
      promptInput.placeholder = options.placeholder || '';
    }
    if (promptOk) promptOk.textContent = options.okText || 'OK';
    if (promptCancel) promptCancel.textContent = options.cancelText || 'Cancel';
    if (promptStatus) promptStatus.textContent = '';
    if (promptBackdrop) {
      promptBackdrop.classList.add('open');
      promptBackdrop.setAttribute('aria-hidden', 'false');
    }
    closeAllCustomPickers();
    setTimeout(() => {
      if (promptInput) {
        promptInput.focus();
        promptInput.select();
      }
    }, 0);
  });
}

function closePrompt(value) {
  if (promptBackdrop) {
    promptBackdrop.classList.remove('open');
    promptBackdrop.setAttribute('aria-hidden', 'true');
  }
  if (promptResolver) {
    promptResolver(value);
    promptResolver = null;
  }
}

function submitPrompt() {
  const value = promptInput ? promptInput.value : '';
  if (promptRequired && !value.trim()) {
    if (promptStatus) promptStatus.textContent = '이름을 입력해주세요.';
    if (promptInput) promptInput.focus();
    return;
  }
  closePrompt(value);
}

if (promptCancel) promptCancel.addEventListener('click', () => closePrompt(null));
if (promptOk) promptOk.addEventListener('click', submitPrompt);
if (promptBackdrop) {
  promptBackdrop.addEventListener('click', (e) => {
    if (e.target === promptBackdrop) closePrompt(null);
  });
}
if (promptInput) {
  promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitPrompt();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      closePrompt(null);
    }
  });
}

function normalizeCardInfoSelection(list) {
  const result = [];
  CARD_INFO_ORDER.forEach((key) => {
    if (list.includes(key) && result.length < 2) result.push(key);
  });
  return result;
}

function loadCardInfoSelection() {
  const raw = localStorage.getItem(CARD_INFO_KEY);
  if (!raw) {
    cardInfoSelection = CARD_INFO_DEFAULT.slice();
    return;
  }
  let parsed;
  try { parsed = JSON.parse(raw); } catch { parsed = CARD_INFO_DEFAULT.slice(); }
  if (!Array.isArray(parsed)) parsed = CARD_INFO_DEFAULT.slice();
  cardInfoSelection = normalizeCardInfoSelection(parsed);
}

function persistCardInfoSelection() {
  localStorage.setItem(CARD_INFO_KEY, JSON.stringify(cardInfoSelection));
}

function getSelectedInfoKeys() {
  return [toggleProf, toggleRoom, toggleCredit]
    .filter((el) => el && el.checked)
    .map((el) => el.dataset.info);
}

function updateCardInfoToggles() {
  const selected = normalizeCardInfoSelection(getSelectedInfoKeys());
  cardInfoSelection = selected;
  const maxed = selected.length >= 2;
  [toggleProf, toggleRoom, toggleCredit].forEach((el) => {
    if (!el) return;
    el.disabled = !el.checked && maxed;
  });
  if (toggleHelp) toggleHelp.textContent = `선택 ${selected.length}/2`;
  persistCardInfoSelection();
}

function applyCardInfoSelectionToToggles() {
  if (toggleProf) toggleProf.checked = cardInfoSelection.includes('prof');
  if (toggleRoom) toggleRoom.checked = cardInfoSelection.includes('room');
  if (toggleCredit) toggleCredit.checked = cardInfoSelection.includes('credit');
  updateCardInfoToggles();
}

function getSelectedDays() {
  if (!daySelect) return [];
  const day = parseInt(daySelect.value, 10);
  return Number.isFinite(day) ? [day] : [];
}

function setSelectedDays(days) {
  if (!daySelect) return;
  const day = Array.isArray(days) && days.length ? days[0] : '';
  daySelect.value = day ? String(day) : '';
  syncCustomPicker(daySelect);
}

function clearSelectedDays() {
  if (!daySelect) return;
  daySelect.value = '';
  syncCustomPicker(daySelect);
}

function renderSlotList(list, itemsContainer, emptyText) {
  if (!itemsContainer) return;
  itemsContainer.innerHTML = '';
  if (!list.length) {
    if (emptyText) {
      const empty = document.createElement('div');
      empty.className = 'slot-empty';
      empty.textContent = emptyText;
      itemsContainer.appendChild(empty);
    }
    return;
  }
  list.forEach((slot, idx) => {
    const item = document.createElement('div');
    item.className = 'slot-item';
    item.dataset.index = String(idx);
    item.innerHTML = `
      <div class="slot-meta">
        <span class="slot-day">${DAY_LABELS[slot.day] || ''}</span>
        <span class="slot-time">${slot.start}–${slot.end}</span>
      </div>
      <button class="slot-remove" type="button" aria-label="Remove">REMOVE</button>
    `;
    itemsContainer.appendChild(item);
  });
}

function setDraftSlots(slots) {
  draftSlots = normalizeSlots(slots);
  renderSlotList(draftSlots, slotItemsEl);
  renderDraftOverlays();
}

function addDraftSlots(slots) {
  draftSlots = normalizeSlots([...draftSlots, ...slots]);
  renderSlotList(draftSlots, slotItemsEl);
  renderDraftOverlays();
}

function clearDraftSlots() {
  draftSlots = [];
  renderSlotList(draftSlots, slotItemsEl);
  renderDraftOverlays();
}

function setDetailSlots(slots) {
  detailSlots = normalizeSlots(slots);
  renderSlotList(detailSlots, detailSlotItems);
}

function addDetailSlots(slots) {
  detailSlots = normalizeSlots([...detailSlots, ...slots]);
  renderSlotList(detailSlots, detailSlotItems);
}

function clearDetailSlots() {
  detailSlots = [];
  renderSlotList(detailSlots, detailSlotItems);
}

function buildSlotsFromAddInputs() {
  const days = getSelectedDays();
  const start = startInput ? startInput.value : '';
  const end = endInput ? endInput.value : '';
  if (!days.length) {
    if (daySelect) daySelect.focus();
    return null;
  }
  if (!start || !end) {
    if (!start && startInput) startInput.focus();
    else if (endInput) endInput.focus();
    return null;
  }
  if (timeToMins(end) <= timeToMins(start)) {
    if (endInput) endInput.focus();
    return null;
  }
  return days.map((day) => ({ day, start, end }));
}

function buildSlotFromDetailInputs() {
  const day = detailDaySelect ? parseInt(detailDaySelect.value, 10) : NaN;
  const start = detailStartInput ? detailStartInput.value : '';
  const end = detailEndInput ? detailEndInput.value : '';
  if (!day) {
    if (detailDaySelect) detailDaySelect.focus();
    return null;
  }
  if (!start || !end) {
    if (!start && detailStartInput) detailStartInput.focus();
    else if (detailEndInput) detailEndInput.focus();
    return null;
  }
  if (timeToMins(end) <= timeToMins(start)) {
    if (detailEndInput) detailEndInput.focus();
    return null;
  }
  return { day, start, end };
}

loadCardInfoSelection();
applyCardInfoSelectionToToggles();

if (toggleProf) toggleProf.addEventListener('change', () => { updateCardInfoToggles(); buildGrid(); });
if (toggleRoom) toggleRoom.addEventListener('change', () => { updateCardInfoToggles(); buildGrid(); });
if (toggleCredit) toggleCredit.addEventListener('change', () => { updateCardInfoToggles(); buildGrid(); });

setDraftSlots([]);
setDetailSlots([]);

if (slotItemsEl) {
  slotItemsEl.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.slot-remove');
    if (!removeBtn) return;
    const item = removeBtn.closest('.slot-item');
    if (!item) return;
    const idx = parseInt(item.dataset.index, 10);
    if (!Number.isFinite(idx)) return;
    const next = draftSlots.filter((_, i) => i !== idx);
    setDraftSlots(next);
  });
}
if (addSlotBtn) {
  addSlotBtn.addEventListener('click', () => {
    const slots = buildSlotsFromAddInputs();
    if (!slots) return;
    addDraftSlots(slots);
  });
}
if (clearSlotsBtn) {
  clearSlotsBtn.addEventListener('click', () => {
    clearDraftSlots();
    clearSelectedDays();
    if (startInput) startInput.value = '';
    if (endInput) endInput.value = '';
    syncCustomPicker(startInput);
    syncCustomPicker(endInput);
  });
}

if (detailSlotItems) {
  detailSlotItems.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.slot-remove');
    const item = e.target.closest('.slot-item');
    if (!item) return;
    const idx = parseInt(item.dataset.index, 10);
    if (!Number.isFinite(idx)) return;
    if (removeBtn) {
      const next = detailSlots.filter((_, i) => i !== idx);
      setDetailSlots(next);
      return;
    }
    const slot = detailSlots[idx];
    if (!slot) return;
    if (detailDaySelect) {
      detailDaySelect.value = String(slot.day);
      syncCustomPicker(detailDaySelect);
    }
    if (detailStartInput) {
      detailStartInput.value = slot.start;
      syncCustomPicker(detailStartInput);
    }
    if (detailEndInput) {
      detailEndInput.value = slot.end;
      syncCustomPicker(detailEndInput);
    }
  });
}
if (detailAddSlotBtn) {
  detailAddSlotBtn.addEventListener('click', () => {
    const slot = buildSlotFromDetailInputs();
    if (!slot) return;
    addDetailSlots([slot]);
  });
}
if (detailClearSlotsBtn) {
  detailClearSlotsBtn.addEventListener('click', () => {
    clearDetailSlots();
  });
}

function setSwatchSelection(container, colorClass) {
  if (!container) return;
  container.querySelectorAll('.swatch').forEach((swatch) => {
    swatch.classList.toggle('selected', swatch.dataset.color === colorClass);
  });
}

function applyDetailAccent(colorClass) {
  const card = document.getElementById('detailCard');
  if (!card) return;
  const accent = COLOR_ACCENTS[colorClass] || COLOR_ACCENTS['c-navy'];
  card.style.setProperty('--card-accent', accent);
  card.style.borderTopColor = accent;
}

function applyPalette(paletteKey) {
  const palette = PALETTES[paletteKey];
  if (!palette) return;
  if (courses.length) {
    courses.forEach((c, idx) => {
      c.color = palette.colors[idx % palette.colors.length];
    });
    persistCurrentCourses();
    buildGrid();
    if (activeId != null) openDetail(activeId);
  }
  selectedColor = palette.colors[0];
  setSwatchSelection(swatches, selectedColor);
}

async function exportTimetableImage() {
  const timetableEl = document.getElementById('timetable');
  if (!timetableEl) return;
  if (window.html2canvas) {
    try {
      const canvas = await window.html2canvas(timetableEl, {
        backgroundColor: null,
        scale: window.devicePixelRatio || 1,
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY,
      });
      const link = document.createElement('a');
      link.download = `timetable-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      return;
    } catch {
      // fall through to SVG method
    }
  }
  const width = timetableEl.scrollWidth;
  const height = timetableEl.scrollHeight;
  const clone = timetableEl.cloneNode(true);
  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;

  let cssText = '';
  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      const rules = sheet.cssRules || [];
      cssText += Array.from(rules).map((r) => r.cssText).join('\n') + '\n';
    } catch {
      // ignore cross-origin stylesheets
    }
  });

  const serialized = `
    <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;margin:0;padding:0;">
      <style>${cssText}</style>
      ${clone.outerHTML}
    </div>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <foreignObject width="100%" height="100%">${serialized}</foreignObject>
  </svg>`;

  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const scale = window.devicePixelRatio || 1;
    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = `timetable-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
    URL.revokeObjectURL(url);
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
  };
  img.src = url;
}


function populateCollegeSelect(selectEl) {
  if (!selectEl) return;
  selectEl.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Select college';
  placeholder.disabled = true;
  placeholder.selected = true;
  selectEl.appendChild(placeholder);
  SNU_COLLEGES.forEach((college) => {
    const opt = document.createElement('option');
    opt.value = college.name;
    opt.textContent = college.name;
    selectEl.appendChild(opt);
  });
  refreshCustomPicker(selectEl);
}

function populateDeptSelect(selectEl, collegeName, selectedValue = '') {
  if (!selectEl) return;
  selectEl.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = collegeName ? 'Select department' : 'Select college first';
  placeholder.disabled = true;
  placeholder.selected = true;
  selectEl.appendChild(placeholder);
  const college = SNU_COLLEGES.find((item) => item.name === collegeName);
  if (college) {
    college.departments.forEach((dept) => {
      const opt = document.createElement('option');
      opt.value = dept;
      opt.textContent = dept;
      selectEl.appendChild(opt);
    });
  }
  selectEl.value = selectedValue || '';
  refreshCustomPicker(selectEl);
}

function loadProfileUI(userId) {
  if (!userId) return;
  const users = getUsers();
  const profile = users[userId] || {};
  if (profileCollege) {
    profileCollege.value = profile.college || '';
    refreshCustomPicker(profileCollege);
  }
  populateDeptSelect(profileDept, profile.college || '', profile.dept || '');
}

function saveProfileFromPanel() {
  if (!currentUserId) return;
  const users = getUsers();
  if (!users[currentUserId]) return;
  users[currentUserId].college = profileCollege ? profileCollege.value : '';
  users[currentUserId].dept = profileDept ? profileDept.value : '';
  setUsers(users);
}

if (profileCollege) {
  profileCollege.addEventListener('change', () => {
    populateDeptSelect(profileDept, profileCollege.value);
    saveProfileFromPanel();
  });
}
if (profileDept) profileDept.addEventListener('change', saveProfileFromPanel);
if (authCollege) {
  authCollege.addEventListener('change', () => {
    populateDeptSelect(authDept, authCollege.value);
  });
}
if (paletteSelect) {
  paletteSelect.addEventListener('change', () => {
    applyPalette(paletteSelect.value);
  });
}
if (detailNameInput) {
  detailNameInput.addEventListener('input', () => {
    const title = document.getElementById('d-title');
    if (title) title.textContent = detailNameInput.value.trim() || '';
  });
}
populateCollegeSelect(profileCollege);
populateCollegeSelect(authCollege);
populateDeptSelect(profileDept, '');
populateDeptSelect(authDept, '');

// ── Helpers ─────────────────────────────────────────
function timeToMins(t) {
  const [h,m] = t.split(':').map(Number);
  return h * 60 + m;
}
function fmtTime(t) { return t; }
function minsToTimeStr(totalMins) {
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

function minsToFrac(t) {
  return (timeToMins(t) - START_H * 60) / 60; // hours from top
}

function normalizeSlots(raw) {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  const slots = [];
  raw.forEach((s) => {
    const day = parseInt(s.day, 10);
    const start = typeof s.start === 'string' ? s.start : '';
    const end = typeof s.end === 'string' ? s.end : '';
    if (!Number.isFinite(day) || day < 1 || day > 5) return;
    if (!start || !end) return;
    if (timeToMins(end) <= timeToMins(start)) return;
    const key = `${day}-${start}-${end}`;
    if (seen.has(key)) return;
    seen.add(key);
    slots.push({ day, start, end });
  });
  slots.sort((a, b) => a.day - b.day || timeToMins(a.start) - timeToMins(b.start));
  return slots;
}

function ensureCourseSlots(course) {
  if (!course) return { slots: [] };
  const slots = normalizeSlots(Array.isArray(course.slots)
    ? course.slots
    : (course.day && course.start && course.end ? [{ day: course.day, start: course.start, end: course.end }] : []));
  course.slots = slots;
  if (slots[0]) {
    course.day = slots[0].day;
    course.start = slots[0].start;
    course.end = slots[0].end;
  }
  return course;
}

function setUserUI(userId) {
  if (currentUserEl) currentUserEl.textContent = userId || 'GUEST';
  if (panelUserEl) panelUserEl.textContent = userId || '-';
}

function setAuthStatus(message) {
  if (!authStatus) return;
  authStatus.textContent = message || '';
}

function showAuth() {
  if (!authBackdrop) return;
  authBackdrop.classList.add('open');
  authBackdrop.setAttribute('aria-hidden', 'false');
  if (authIdInput) authIdInput.focus();
}

function hideAuth() {
  if (!authBackdrop) return;
  authBackdrop.classList.remove('open');
  authBackdrop.setAttribute('aria-hidden', 'true');
  setAuthStatus('');
  if (authPwInput) authPwInput.value = '';
}

function populateSemesterSelect() {
  if (!semesterSelect) return;
  semesterSelect.innerHTML = '';
  SEMESTERS.forEach((sem) => {
    const opt = document.createElement('option');
    opt.value = sem;
    opt.textContent = sem;
    semesterSelect.appendChild(opt);
  });
  refreshCustomPicker(semesterSelect);
}

function populateTimetableSelect(semData) {
  if (!timetableSelect) return;
  timetableSelect.innerHTML = '';
  semData.timetables.forEach((t) => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.name;
    timetableSelect.appendChild(opt);
  });
  timetableSelect.value = semData.activeId;
  refreshCustomPicker(timetableSelect);
}

function ensureSemesterData(data, sem) {
  if (!data.semesters[sem] || !Array.isArray(data.semesters[sem].timetables)) {
    const tables = SAMPLE_TABLES.map((t, idx) => ({
      id: `tt-${sem}-${idx + 1}`,
      name: `${t.name} (${sem})`,
      courses: cloneCourses(t.courses),
    }));
    data.semesters[sem] = { timetables: tables, activeId: tables[0].id };
  }
  if (!data.semesters[sem].timetables.length) {
    const id = `tt-${sem}-${Date.now()}`;
    data.semesters[sem].timetables.push({ id, name: `New Timetable (${sem})`, courses: [] });
    data.semesters[sem].activeId = id;
  }
  return data.semesters[sem];
}

function loadCurrentTimetable() {
  if (!currentUserId) return;
  const data = ensureUserData(currentUserId);
  if (!currentSemester || !SEMESTERS.includes(currentSemester)) {
    currentSemester = data.lastSemester && SEMESTERS.includes(data.lastSemester)
      ? data.lastSemester
      : SEMESTERS[0];
  }
  const semData = ensureSemesterData(data, currentSemester);
  if (!semData.activeId || !semData.timetables.some(t => t.id === semData.activeId)) {
    semData.activeId = semData.timetables[0].id;
  }
  currentTableId = semData.activeId;
  const table = semData.timetables.find(t => t.id === currentTableId);
  courses = Array.isArray(table.courses)
    ? table.courses.map((c) => ensureCourseSlots(c))
    : [];
  nextId = getNextId(courses);
  data.lastSemester = currentSemester;
  saveUserData(currentUserId, data);

  if (semesterSelect) {
    semesterSelect.value = currentSemester;
    syncCustomPicker(semesterSelect);
  }
  populateTimetableSelect(semData);
  buildGrid();
}

function persistCurrentCourses() {
  if (!currentUserId || !currentSemester || !currentTableId) return;
  const data = ensureUserData(currentUserId);
  const semData = ensureSemesterData(data, currentSemester);
  const table = semData.timetables.find(t => t.id === currentTableId);
  if (table) table.courses = courses;
  saveUserData(currentUserId, data);
}

function addTimetable(name, courseList) {
  if (!currentUserId || !currentSemester) return;
  const data = ensureUserData(currentUserId);
  const semData = ensureSemesterData(data, currentSemester);
  const id = `tt-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  semData.timetables.push({ id, name, courses: courseList });
  semData.activeId = id;
  saveUserData(currentUserId, data);
  currentTableId = id;
  courses = Array.isArray(courseList) ? courseList.map((c) => ensureCourseSlots(c)) : [];
  nextId = getNextId(courses);
  populateTimetableSelect(semData);
  if (timetableSelect) {
    timetableSelect.value = id;
    syncCustomPicker(timetableSelect);
  }
  buildGrid();
}

function renameTimetable(nextName) {
  if (!currentUserId || !currentSemester || !currentTableId) return;
  const data = ensureUserData(currentUserId);
  const semData = ensureSemesterData(data, currentSemester);
  const table = semData.timetables.find((t) => t.id === currentTableId);
  if (!table) return;
  table.name = nextName;
  saveUserData(currentUserId, data);
  populateTimetableSelect(semData);
  if (timetableSelect) {
    timetableSelect.value = currentTableId;
    syncCustomPicker(timetableSelect);
  }
}

function getCurrentTable() {
  if (!currentUserId || !currentSemester || !currentTableId) return null;
  const data = ensureUserData(currentUserId);
  const semData = ensureSemesterData(data, currentSemester);
  return semData.timetables.find(t => t.id === currentTableId) || null;
}

async function handleLogin() {
  const id = authIdInput ? authIdInput.value.trim() : '';
  const pw = authPwInput ? authPwInput.value : '';
  if (!id || !pw) {
    setAuthStatus('ID와 비밀번호를 입력해주세요.');
    return;
  }
  const users = getUsers();
  if (!users[id]) {
    setAuthStatus('존재하지 않는 사용자입니다.');
    return;
  }
  const hash = await hashPassword(pw);
  if (users[id].pw !== hash) {
    setAuthStatus('비밀번호가 올바르지 않습니다.');
    return;
  }
  currentUserId = id;
  setSessionUser(id);
  setUserUI(id);
  hideAuth();
  ensureUserData(id);
  loadProfileUI(id);
  populateSemesterSelect();
  loadCurrentTimetable();
}

async function handleRegister() {
  const id = authIdInput ? authIdInput.value.trim() : '';
  const pw = authPwInput ? authPwInput.value : '';
  if (!id || !pw) {
    setAuthStatus('ID와 비밀번호를 입력해주세요.');
    return;
  }
  if (id.length < 3 || pw.length < 4) {
    setAuthStatus('ID는 3자, 비밀번호는 4자 이상이 필요합니다.');
    return;
  }
  const users = getUsers();
  if (users[id]) {
    setAuthStatus('이미 존재하는 사용자입니다.');
    return;
  }
  const hash = await hashPassword(pw);
  const college = authCollege ? authCollege.value : '';
  const dept = authDept ? authDept.value : '';
  users[id] = { pw: hash, college, dept };
  setUsers(users);
  currentUserId = id;
  setSessionUser(id);
  setUserUI(id);
  ensureUserData(id);
  hideAuth();
  loadProfileUI(id);
  populateSemesterSelect();
  loadCurrentTimetable();
}

function handleLogout() {
  clearSessionUser();
  currentUserId = null;
  currentSemester = null;
  currentTableId = null;
  courses = [];
  nextId = 1;
  setUserUI(null);
  if (profileCollege) {
    profileCollege.value = '';
    refreshCustomPicker(profileCollege);
  }
  populateDeptSelect(profileDept, '');
  if (paletteSelect) {
    paletteSelect.value = '';
    refreshCustomPicker(paletteSelect);
  }
  buildGrid();
  showAuth();
}

// ── Render ───────────────────────────────────────────
function buildGrid() {
  const tbl = document.getElementById('timetable');
  // remove old rows (keep 6 header cells)
  while (tbl.children.length > 6) tbl.removeChild(tbl.lastChild);

  const infoOrder = CARD_INFO_ORDER.filter((key) => cardInfoSelection.includes(key));

  for (let h = START_H; h < END_H; h++) {
    const label = document.createElement('div');
    label.className = 'time-label';
    label.textContent = String(h).padStart(2,'0') + ':00';
    tbl.appendChild(label);

    for (let d = 1; d <= 5; d++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.dataset.day = d;
      cell.dataset.hour = h;
      tbl.appendChild(cell);
    }
  }

  // place course cards
  courses.forEach((course) => {
    const c = ensureCourseSlots(course);
    const slots = c.slots || [];
    slots.forEach((slot) => {
      const startFrac = minsToFrac(slot.start); // offset in hours from top
      const durMins   = timeToMins(slot.end) - timeToMins(slot.start);
      const durFrac   = durMins / 60; // duration in hours
      const isShort   = durMins <= 60;
      const gap       = isShort ? 2 : 3;

      const topPx     = startFrac * ROW_H + gap;          // small gap within row
      const heightPx  = durFrac   * ROW_H - gap * 2;      // top+bottom gap

      // find first grid-cell of that column
      const cells = tbl.querySelectorAll(`.grid-cell[data-day="${slot.day}"]`);
      if (!cells.length) return;
      const anchorCell = cells[0]; // first cell = START_H row

      const card = document.createElement('div');
      card.className = `course-card ${c.color}${isShort ? ' short' : ''}`;
      card.style.top    = topPx  + 'px';
      card.style.height = heightPx + 'px';
      card.dataset.id   = c.id;
      card.onclick = () => openDetail(c.id);

      const infoLines = [];
      infoOrder.forEach((key) => {
        if (key === 'prof' && c.prof) infoLines.push({ type: 'prof', text: c.prof });
        if (key === 'room' && c.room) infoLines.push({ type: 'room', text: c.room });
        if (key === 'credit') infoLines.push({ type: 'credit', text: `${c.credit} Credit` });
      });

      if (isShort) {
        let shortText = '';
        if (cardInfoSelection.includes('room') && c.room) shortText = c.room;
        else if (cardInfoSelection.includes('prof') && c.prof) shortText = c.prof;
        else if (cardInfoSelection.includes('credit')) shortText = `${c.credit} Credit`;
        const suffix = shortText ? ` | ${shortText}` : '';
        card.innerHTML = `
          <div class="card-body">
            <div class="card-title">${c.name}${suffix}</div>
          </div>`;
      } else {
        const metaMarkup = infoLines
          .map((line) => `<div class="card-${line.type}">${line.text}</div>`)
          .join('');
        card.innerHTML = `
          <div class="card-body">
            <div class="card-title">${c.name}</div>
            ${metaMarkup}
          </div>`;
      }

      anchorCell.appendChild(card);
    });
  });

  renderDraftOverlays();
}

function renderDraftOverlays() {
  if (!timetableEl) return;
  timetableEl.querySelectorAll('.draft-slot').forEach((el) => el.remove());
  if (!draftSlots.length) return;
  draftSlots.forEach((slot) => {
    const startFrac = minsToFrac(slot.start);
    const durMins = timeToMins(slot.end) - timeToMins(slot.start);
    if (durMins <= 0) return;
    const durFrac = durMins / 60;
    const isShort = durMins <= 60;
    const gap = isShort ? 2 : 3;
    const topPx = startFrac * ROW_H + gap;
    const heightPx = durFrac * ROW_H - gap * 2;

    const cells = timetableEl.querySelectorAll(`.grid-cell[data-day="${slot.day}"]`);
    if (!cells.length) return;
    const anchorCell = cells[0];
    const overlay = document.createElement('div');
    overlay.className = 'draft-slot';
    overlay.style.top = `${topPx}px`;
    overlay.style.height = `${heightPx}px`;
    anchorCell.appendChild(overlay);
  });
}

// ── Drag to add ─────────────────────────────────────
let isDraggingSlot = false;
let dragPointerId = null;
let dragDay = null;
let dragStartMins = null;
let dragEndMins = null;
let dragGhost = null;
let dragAnchor = null;

function getDayFromClientX(clientX) {
  if (!timetableEl) return null;
  const rect = timetableEl.getBoundingClientRect();
  const timeW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--time-w')) || 56;
  const x = clientX - rect.left;
  if (x <= timeW) return null;
  const colW = (rect.width - timeW) / 5;
  const idx = Math.floor((x - timeW) / colW);
  if (idx < 0 || idx > 4) return null;
  return idx + 1;
}

function getMinsFromClientY(clientY, mode = 'floor') {
  if (!timetableEl) return null;
  const firstLabel = timetableEl.querySelector('.time-label');
  if (!firstLabel) return null;
  const top = firstLabel.getBoundingClientRect().top;
  const offset = clientY - top;
  const totalMins = HOURS * 60;
  const raw = Math.max(0, Math.min(offset, HOURS * ROW_H)) / ROW_H * 60;
  const snapped = mode === 'ceil'
    ? Math.ceil(raw / TIME_STEP) * TIME_STEP
    : Math.floor(raw / TIME_STEP) * TIME_STEP;
  const mins = Math.max(0, Math.min(snapped, totalMins));
  return START_H * 60 + mins;
}

function updateDragGhost() {
  if (!dragGhost || dragStartMins == null || dragEndMins == null) return;
  const start = Math.min(dragStartMins, dragEndMins);
  const end = Math.max(dragStartMins, dragEndMins);
  const minDuration = TIME_STEP;
  const clampedEnd = Math.max(start + minDuration, end);
  const gap = 2;
  const topPx = ((start - START_H * 60) / 60) * ROW_H + gap;
  const heightPx = ((clampedEnd - start) / 60) * ROW_H - gap * 2;
  dragGhost.style.top = `${topPx}px`;
  dragGhost.style.height = `${heightPx}px`;
}

function clearDragGhost() {
  if (dragGhost && dragGhost.parentNode) dragGhost.parentNode.removeChild(dragGhost);
  dragGhost = null;
  dragAnchor = null;
}

function startDragAdd(e) {
  if (!timetableEl || e.button !== 0) return;
  if (e.target.closest('.course-card')) return;
  const day = getDayFromClientX(e.clientX);
  if (!day) return;
  const start = getMinsFromClientY(e.clientY, 'floor');
  if (start == null) return;
  const firstLabel = timetableEl.querySelector('.time-label');
  if (!firstLabel) return;
  if (e.clientY < firstLabel.getBoundingClientRect().top) return;

  const anchorCell = timetableEl.querySelector(`.grid-cell[data-day="${day}"]`);
  if (!anchorCell) return;

  isDraggingSlot = true;
  dragPointerId = e.pointerId;
  dragDay = day;
  dragStartMins = start;
  dragEndMins = start + TIME_STEP;
  dragAnchor = anchorCell;
  dragGhost = document.createElement('div');
  dragGhost.className = 'drag-ghost';
  dragAnchor.appendChild(dragGhost);
  updateDragGhost();

  timetableEl.setPointerCapture?.(e.pointerId);
  window.addEventListener('pointermove', onDragMove);
  window.addEventListener('pointerup', onDragEnd);
  e.preventDefault();
}

function onDragMove(e) {
  if (!isDraggingSlot || e.pointerId !== dragPointerId) return;
  const current = getMinsFromClientY(e.clientY, 'ceil');
  if (current == null) return;
  dragEndMins = current;
  updateDragGhost();
  e.preventDefault();
}

function onDragEnd(e) {
  if (!isDraggingSlot || e.pointerId !== dragPointerId) return;
  window.removeEventListener('pointermove', onDragMove);
  window.removeEventListener('pointerup', onDragEnd);
  timetableEl.releasePointerCapture?.(e.pointerId);
  isDraggingSlot = false;

  const start = Math.min(dragStartMins, dragEndMins);
  const end = Math.max(dragStartMins, dragEndMins);
  clearDragGhost();

  const startStr = minsToTimeStr(start);
  const endStr = minsToTimeStr(Math.max(end, start + TIME_STEP));
  const slot = { day: dragDay, start: startStr, end: endStr };
  if (startInput) startInput.value = startStr;
  if (endInput) endInput.value = endStr;
  syncCustomPicker(startInput);
  syncCustomPicker(endInput);
  setSelectedDays([dragDay]);
  if (e.ctrlKey || e.metaKey) addDraftSlots([slot]);
  else setDraftSlots([slot]);
  openPanel();
}

if (timetableEl) {
  timetableEl.addEventListener('pointerdown', startDragAdd);
}

// ── Detail modal ────────────────────────────────────
function openDetail(id) {
  const c = courses.find(x => x.id === id);
  if (!c) return;
  activeId = id;

  ensureCourseSlots(c);
  applyDetailAccent(c.color);

  const titleEl = document.getElementById('d-title');
  if (titleEl) titleEl.textContent = c.name;
  if (detailNameInput) detailNameInput.value = c.name;
  if (detailProfInput) detailProfInput.value = c.prof;
  if (detailRoomInput) detailRoomInput.value = c.room;
  if (detailCreditInput) detailCreditInput.value = c.credit;
  setDetailSlots(c.slots || []);
  const firstSlot = (c.slots && c.slots[0]) ? c.slots[0] : null;
  if (detailDaySelect) {
    detailDaySelect.value = firstSlot ? String(firstSlot.day) : '1';
    syncCustomPicker(detailDaySelect);
  }
  if (detailStartInput) {
    detailStartInput.value = firstSlot ? firstSlot.start : '';
    syncCustomPicker(detailStartInput);
  }
  if (detailEndInput) {
    detailEndInput.value = firstSlot ? firstSlot.end : '';
    syncCustomPicker(detailEndInput);
  }
  detailSelectedColor = c.color;
  setSwatchSelection(detailSwatches, detailSelectedColor);

  document.getElementById('backdrop').classList.add('open');
}
function closeDetail() {
  document.getElementById('backdrop').classList.remove('open');
  activeId = null;
  closeAllCustomPickers();
}
function handleBdClick(e) {
  if (e.target === document.getElementById('backdrop')) closeDetail();
}
function deleteCourse() {
  if (activeId == null) return;
  courses = courses.filter(c => c.id !== activeId);
  closeDetail();
  persistCurrentCourses();
  buildGrid();
}

function saveDetailCourse() {
  if (activeId == null) return;
  const c = courses.find(x => x.id === activeId);
  if (!c) return;

  const name = detailNameInput ? detailNameInput.value.trim() : '';
  const prof = detailProfInput ? detailProfInput.value.trim() : '';
  const room = detailRoomInput ? detailRoomInput.value.trim() : '';
  const creditRaw = detailCreditInput ? parseInt(detailCreditInput.value, 10) : NaN;

  if (!name) {
    if (detailNameInput) detailNameInput.focus();
    return;
  }

  let slots = detailSlots.length ? detailSlots : [];
  if (!slots.length) {
    const slot = buildSlotFromDetailInputs();
    if (!slot) return;
    slots = [slot];
  }
  slots = normalizeSlots(slots);
  if (!slots.length) {
    if (detailDaySelect) detailDaySelect.focus();
    return;
  }

  const credit = Number.isFinite(creditRaw) ? Math.min(6, Math.max(1, creditRaw)) : c.credit;

  c.name = name;
  c.prof = prof;
  c.room = room;
  c.slots = slots;
  c.day = slots[0].day;
  c.start = slots[0].start;
  c.end = slots[0].end;
  c.credit = credit;
  if (detailSelectedColor) c.color = detailSelectedColor;

  persistCurrentCourses();
  buildGrid();
  closeDetail();
}

// ── Add course ───────────────────────────────────────
function addCourse() {
  const name   = document.getElementById('f-name').value.trim();
  const prof   = document.getElementById('f-prof').value.trim();
  const room   = document.getElementById('f-room').value.trim();
  const credit = parseInt(document.getElementById('f-credit').value) || 3;

  if (!name) { document.getElementById('f-name').focus(); return; }
  let slots = draftSlots.length ? draftSlots : [];
  if (!slots.length) {
    const fromInputs = buildSlotsFromAddInputs();
    if (!fromInputs) return;
    slots = fromInputs;
  }
  slots = normalizeSlots(slots);
  if (!slots.length) return;

  courses.push({ id: nextId++, name, prof, room, credit, color: selectedColor, slots });
  persistCurrentCourses();
  buildGrid();

  // reset
  document.getElementById('f-name').value = '';
  document.getElementById('f-prof').value = '';
  document.getElementById('f-room').value = '';
  if (startInput) startInput.value = '';
  if (endInput) endInput.value = '';
  syncCustomPicker(startInput);
  syncCustomPicker(endInput);
  clearSelectedDays();
  clearDraftSlots();
}

// ── Color picker ─────────────────────────────────────
function pickColor(el) {
  selectedColor = el.dataset.color;
  setSwatchSelection(swatches, selectedColor);
}

function pickDetailColor(el) {
  detailSelectedColor = el.dataset.color;
  setSwatchSelection(detailSwatches, detailSelectedColor);
  applyDetailAccent(detailSelectedColor);
}

// ── UI Events ────────────────────────────────────────
const detailSaveBtn = document.getElementById('d-save');
if (detailSaveBtn) detailSaveBtn.addEventListener('click', saveDetailCourse);

if (loginBtn) loginBtn.addEventListener('click', handleLogin);
if (registerBtn) registerBtn.addEventListener('click', handleRegister);
if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
if (saveImageBtn) saveImageBtn.addEventListener('click', exportTimetableImage);

if (authPwInput) {
  authPwInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
}

if (semesterSelect) {
  semesterSelect.addEventListener('change', () => {
    if (!currentUserId) return;
    currentSemester = semesterSelect.value;
    const data = ensureUserData(currentUserId);
    data.lastSemester = currentSemester;
    saveUserData(currentUserId, data);
    loadCurrentTimetable();
  });
}

if (timetableSelect) {
  timetableSelect.addEventListener('change', () => {
    if (!currentUserId) return;
    const data = ensureUserData(currentUserId);
    const semData = ensureSemesterData(data, currentSemester);
    semData.activeId = timetableSelect.value;
    saveUserData(currentUserId, data);
    loadCurrentTimetable();
  });
}

if (newTableBtn) {
  newTableBtn.addEventListener('click', async () => {
    if (!currentUserId) return;
    const name = await openPrompt({
      title: 'New Timetable',
      label: '시간표 이름',
      value: `New Timetable (${currentSemester})`,
      okText: 'Create',
      cancelText: 'Cancel',
      required: true,
    });
    if (name == null) return;
    addTimetable(name.trim(), []);
  });
}

if (copyTableBtn) {
  copyTableBtn.addEventListener('click', async () => {
    const base = getCurrentTable();
    if (!base) return;
    const name = await openPrompt({
      title: 'Copy Timetable',
      label: '시간표 이름',
      value: `${base.name} Copy`,
      okText: 'Copy',
      cancelText: 'Cancel',
      required: true,
    });
    if (name == null) return;
    const cloned = cloneCourses(base.courses);
    addTimetable(name.trim(), cloned);
  });
}

if (renameTableBtn) {
  renameTableBtn.addEventListener('click', async () => {
    const current = getCurrentTable();
    if (!current) return;
    const name = await openPrompt({
      title: 'Rename Timetable',
      label: '새 시간표 이름',
      value: current.name,
      okText: 'Rename',
      cancelText: 'Cancel',
      required: true,
    });
    if (name == null) return;
    renameTimetable(name.trim());
  });
}

// ── Resize timetable size ───────────────────────────
const MIN_TIMETABLE_W = 520;
const layoutEl = document.querySelector('.layout');
const timetableShell = document.getElementById('timetableShell');
const resizer = document.getElementById('resizer');
const panelEl = document.querySelector('.side-panel');
const panelClose = document.getElementById('panelClose');
const panelBackdrop = document.getElementById('panelBackdrop');
const fabAdd = document.getElementById('fabAdd');
const mobileMq = window.matchMedia ? window.matchMedia('(max-width: 980px)') : null;
let isResizingWidth = false;

function openPanel() {
  if (!panelEl) return;
  panelEl.classList.add('panel-open');
  if (panelBackdrop) panelBackdrop.classList.add('open');
  document.body.classList.add('panel-modal-open');
  const nameInput = document.getElementById('f-name');
  if (nameInput) nameInput.focus();
}
function closePanel() {
  if (!panelEl) return;
  panelEl.classList.remove('panel-open');
  if (panelBackdrop) panelBackdrop.classList.remove('open');
  document.body.classList.remove('panel-modal-open');
}

if (fabAdd) fabAdd.addEventListener('click', openPanel);
if (panelClose) panelClose.addEventListener('click', closePanel);
if (panelBackdrop) panelBackdrop.addEventListener('click', closePanel);

function clampTimetableWidth(width) {
  if (!layoutEl || !timetableShell || !resizer) return;
  const layoutRect = layoutEl.getBoundingClientRect();
  const resizerRect = resizer.getBoundingClientRect();
  const panelWidth = panelEl ? panelEl.getBoundingClientRect().width : 0;
  const panelGap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--panel-gap')) || 0;
  const maxWidth = Math.max(0, layoutRect.width - panelWidth - panelGap - resizerRect.width);
  const effectiveMin = Math.min(MIN_TIMETABLE_W, maxWidth);
  const clamped = Math.max(effectiveMin, Math.min(width, maxWidth));
  timetableShell.style.flex = '0 0 auto';
  timetableShell.style.width = clamped + 'px';
  timetableShell.dataset.fixedWidth = 'true';
}

function resetTimetableSizing() {
  if (timetableShell) {
    timetableShell.style.width = '';
    timetableShell.style.flex = '';
    timetableShell.dataset.fixedWidth = 'false';
  }
}

if (resizer && layoutEl && timetableShell) {
  resizer.addEventListener('pointerdown', (e) => {
    isResizingWidth = true;
    resizer.classList.add('dragging');
    document.body.classList.add('resizing');
    if (resizer.setPointerCapture) resizer.setPointerCapture(e.pointerId);
  });
}

window.addEventListener('pointermove', (e) => {
  if (isResizingWidth && layoutEl) {
    const layoutRect = layoutEl.getBoundingClientRect();
    clampTimetableWidth(e.clientX - layoutRect.left);
  }
});

window.addEventListener('pointerup', (e) => {
  if (isResizingWidth) {
    isResizingWidth = false;
    resizer.classList.remove('dragging');
    document.body.classList.remove('resizing');
    if (resizer.releasePointerCapture) resizer.releasePointerCapture(e.pointerId);
  }
});

window.addEventListener('resize', () => {
  if (timetableShell && timetableShell.dataset.fixedWidth === 'true') {
    const current = parseFloat(timetableShell.style.width);
    if (Number.isFinite(current)) clampTimetableWidth(current);
  }
});

if (mobileMq) {
  const handleMobileMq = () => {
    if (mobileMq.matches) {
      closePanel();
      resetTimetableSizing();
    } else {
      closePanel();
    }
  };
  handleMobileMq();
  mobileMq.addEventListener('change', handleMobileMq);
}

function initApp() {
  setUserUI(null);
  populateSemesterSelect();
  const sessionUser = getSessionUser();
  const users = getUsers();
  if (sessionUser && users[sessionUser]) {
    currentUserId = sessionUser;
    setUserUI(sessionUser);
    hideAuth();
    loadProfileUI(sessionUser);
    loadCurrentTimetable();
  } else {
    clearSessionUser();
    if (profileCollege) {
      profileCollege.value = '';
      refreshCustomPicker(profileCollege);
    }
    populateDeptSelect(profileDept, '');
    showAuth();
    buildGrid();
  }
}

// ── Keyboard ─────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDetail();
    closeAllCustomPickers();
    closePrompt(null);
  }
});

// ── Init ─────────────────────────────────────────────
initApp();
