// ── Config ──────────────────────────────────────────
const DEFAULT_START_H = 9;
const DEFAULT_END_H = 21;
const VIEW_MIN_H = 6;
const VIEW_MAX_H = 23;
const ROW_H   = 54;                       // px per hour (must match CSS --row-h)
const TIME_STEP = 15;                     // minutes for custom time selectors
const DAY_LABELS = { 1: 'MON', 2: 'TUE', 3: 'WED', 4: 'THU', 5: 'FRI', 6: 'SAT', 7: 'SUN' };
const DAY_NAMES = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};
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
  gray: {
    label: 'Gray',
    colors: ['c-graphite', 'c-steel', 'c-ash', 'c-fog', 'c-pearl', 'c-smoke'],
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
  'c-graphite': '#2F3136',
  'c-steel': '#4F5560',
  'c-ash': '#6B717C',
  'c-fog': '#8A909A',
  'c-pearl': '#ADB3BB',
  'c-smoke': '#8D857D',
};

// ── Storage ──────────────────────────────────────────
const LOCAL_USER = 'local';
const DATA_KEY_PREFIX = 'tt_data_v1_';
const LEGACY_SESSION_KEY = 'tt_session_v1';
const CARD_INFO_KEY = 'tt_card_info_v1';
const HEADER_COLOR_KEY = 'tt_header_color_v1';
const VIEW_SETTINGS_KEY = 'tt_view_settings_v1';
const THEME_KEY = 'tt_theme_v1';
const CUSTOM_COLOR_PREFIX = 'custom:';
const EXPORT_APP_ID = 'weekly-rhythm';
const EXPORT_VERSION = 1;
const CARD_INFO_ORDER = ['prof', 'room', 'credit'];
const CARD_INFO_DEFAULT = ['prof', 'room'];
const SEMESTERS = ['1-1','1-2','2-1','2-2','3-1','3-2','4-1','4-2'];
const SEMESTER_LABELS = {
  '1-1': 'Plan A',
  '1-2': 'Plan B',
  '2-1': 'Plan C',
  '2-2': 'Plan D',
  '3-1': 'Plan E',
  '3-2': 'Plan F',
  '4-1': 'Plan G',
  '4-2': 'Plan H',
};

const SAMPLE_TABLES = [
  {
    name: 'Weekly Plan',
    courses: [
      { name:'Morning Focus', prof:'Deep work block', room:'Desk', day:1, start:'09:00', end:'10:30', credit:3, color:'c-flex-red' },
    ],
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
      name: `${t.name} (${SEMESTER_LABELS[sem] || sem})`,
      courses: cloneCourses(t.courses),
    }));
    semesters[sem] = { timetables: tables, activeId: tables[0].id };
  });
  return { semesters, lastSemester: SEMESTERS[0] };
}

function safeParse(raw, fallback) {
  try { return JSON.parse(raw) ?? fallback; } catch { return fallback; }
}
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

// One-time migration: adopt data from the pre-login-removal per-user storage.
// Prefer the last logged-in user's blob, else the first tt_data_v1_* key found.
function migrateLegacyData() {
  if (getUserData(LOCAL_USER)) return;
  const legacyUser = localStorage.getItem(LEGACY_SESSION_KEY);
  let source = legacyUser && legacyUser !== LOCAL_USER ? getUserData(legacyUser) : null;
  if (!source) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(DATA_KEY_PREFIX) && key !== DATA_KEY_PREFIX + LOCAL_USER) {
        source = safeParse(localStorage.getItem(key), null);
        if (source) break;
      }
    }
  }
  if (source) saveUserData(LOCAL_USER, source);
}

// ── State ───────────────────────────────────────────
let courses = [];
let nextId = 1;
let selectedColor = 'c-navy';
let headerColor = 'c-navy';
let detailSelectedColor = null;
let cardInfoSelection = CARD_INFO_DEFAULT.slice();
let draftSlots = [];
let detailSlots = [];
let activeId = null;
let livePreviewRaf = 0;
let livePreviewSuspended = false;
let routinePreviewCourse = null;
let routineDeleteShortcutArmed = false;
let currentUserId = LOCAL_USER;
let currentSemester = null;
let currentTableId = null;
let viewStartMins = DEFAULT_START_H * 60;
let viewEndMins = DEFAULT_END_H * 60;
let visibleDays = [1, 2, 3, 4, 5];
let currentTheme = 'light';
let customPickerHue = 210;
let customPickerSat = 0.72;
let customPickerVal = 0.65;
let customColorDragPointerId = null;

const semesterSelect = document.getElementById('semesterSelect');
const timetableSelect = document.getElementById('timetableSelect');
const newTableBtn = document.getElementById('newTable');
const copyTableBtn = document.getElementById('copyTable');
const renameTableBtn = document.getElementById('renameTable');
const deleteTableBtn = document.getElementById('deleteTable');
const deleteRoutineBtn = document.getElementById('deleteRoutineBtn');
const swatches = document.getElementById('swatches');
const customColorSwatch = document.getElementById('customColorSwatch');
const customColorPopover = document.getElementById('customColorPopover');
const customColorField = document.getElementById('customColorField');
const customHueSlider = document.getElementById('customHueSlider');
const customHexInput = document.getElementById('customHexInput');
const customColorPreview = document.getElementById('customColorPreview');
const headerSwatches = document.getElementById('headerSwatches');
const toggleProf = document.getElementById('toggleProf');
const toggleRoom = document.getElementById('toggleRoom');
const toggleCredit = document.getElementById('toggleCredit');
const saveImageBtn = document.getElementById('saveImage');
const fabSave = document.getElementById('fabSave');
const exportDataBtn = document.getElementById('exportDataBtn');
const importDataBtn = document.getElementById('importDataBtn');
const importDataInput = document.getElementById('importDataInput');
const controlsToggle = document.getElementById('controlsToggle');
const controlsPopover = document.getElementById('controlsPopover');
const appearanceToggle = document.getElementById('appearanceToggle');
const appearancePopover = document.getElementById('appearancePopover');
const themeToggle = document.getElementById('themeToggle');
const fabDuo = document.querySelector('.fab-duo');
const promptBackdrop = document.getElementById('promptBackdrop');
const promptTitle = document.getElementById('promptTitle');
const promptLabel = document.getElementById('promptLabel');
const promptInput = document.getElementById('promptInput');
const promptCancel = document.getElementById('promptCancel');
const promptOk = document.getElementById('promptOk');
const promptStatus = document.getElementById('promptStatus');
const paletteSelect = document.getElementById('paletteSelect');
const viewStartInput = document.getElementById('viewStart');
const viewEndInput = document.getElementById('viewEnd');
const viewDayToggles = document.getElementById('viewDayToggles');
const nameInput = document.getElementById('f-name');
const profInput = document.getElementById('f-prof');
const roomInput = document.getElementById('f-room');
const creditInput = document.getElementById('f-credit');
const daySelect = document.getElementById('f-day');
const startInput = document.getElementById('f-start');
const endInput = document.getElementById('f-end');
const slotListEl = document.getElementById('slotList');
const slotItemsEl = document.getElementById('slotItems');
const slotEditorEl = document.getElementById('slotEditor');
const addSlotTrigger = document.getElementById('addSlotTrigger');
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
const timetableEl = document.getElementById('timetable');

// ── Custom Selects ──────────────────────────────────
const customPickers = new Set();
const customPickerByEl = new Map();

function closeAllCustomPickers(except) {
  customPickers.forEach((picker) => {
    if (picker !== except) picker.close();
  });
}

function buildTimeOptions(startMins = VIEW_MIN_H * 60, endMins = VIEW_MAX_H * 60, step = TIME_STEP) {
  const times = [];
  for (let mins = startMins; mins <= endMins; mins += step) {
    const hh = String(Math.floor(mins / 60)).padStart(2, '0');
    const mm = String(mins % 60).padStart(2, '0');
    times.push(`${hh}:${mm}`);
  }
  return times;
}

const TIME_OPTIONS = buildTimeOptions();
const VIEW_TIME_OPTIONS = buildTimeOptions(VIEW_MIN_H * 60, VIEW_MAX_H * 60, 60);

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

initCustomSelect(semesterSelect, { placeholder: 'Select collection' });
initCustomSelect(timetableSelect, { placeholder: 'Select schedule' });
initCustomSelect(paletteSelect, { placeholder: 'Select palette' });
initCustomSelect(daySelect, { placeholder: 'Select day' });
initCustomSelect(detailDaySelect, { placeholder: 'Select day' });
initCustomTime(viewStartInput, { placeholder: 'Start', options: VIEW_TIME_OPTIONS });
initCustomTime(viewEndInput, { placeholder: 'End', options: VIEW_TIME_OPTIONS });
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
    const isConfirm = Boolean(options.confirm);
    if (promptTitle) promptTitle.textContent = options.title || 'Input';
    if (promptLabel) promptLabel.textContent = options.label || 'Name';
    if (promptInput) {
      promptInput.value = options.value || '';
      promptInput.placeholder = options.placeholder || '';
    }
    if (promptOk) promptOk.textContent = options.okText || 'OK';
    if (promptCancel) promptCancel.textContent = options.cancelText || 'Cancel';
    if (promptStatus) promptStatus.textContent = options.message || '';
    if (promptBackdrop) {
      promptBackdrop.classList.toggle('confirm-mode', isConfirm);
      promptBackdrop.classList.add('open');
      promptBackdrop.setAttribute('aria-hidden', 'false');
    }
    closeAllCustomPickers();
    setTimeout(() => {
      if (isConfirm) {
        if (promptOk) promptOk.focus();
      } else if (promptInput) {
        promptInput.focus();
        promptInput.select();
      }
    }, 0);
  });
}

// Yes/no confirmation reusing the prompt modal (input hidden via .confirm-mode).
function openConfirm(options = {}) {
  return openPrompt({
    confirm: true,
    title: options.title || 'Confirm',
    message: options.message || 'Are you sure?',
    okText: options.okText || 'Delete',
    cancelText: options.cancelText || 'Cancel',
  }).then((value) => value !== null);
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
    const label = promptLabel ? promptLabel.textContent.toLowerCase() : 'value';
    if (promptStatus) promptStatus.textContent = `Please enter a ${label}.`;
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
    if (list.includes(key)) result.push(key);
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
  persistCardInfoSelection();
}

function applyCardInfoSelectionToToggles() {
  if (toggleProf) toggleProf.checked = cardInfoSelection.includes('prof');
  if (toggleRoom) toggleRoom.checked = cardInfoSelection.includes('room');
  if (toggleCredit) toggleCredit.checked = cardInfoSelection.includes('credit');
  updateCardInfoToggles();
}

function normalizeTheme(theme) {
  return theme === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme, options = {}) {
  currentTheme = normalizeTheme(theme);
  document.documentElement.dataset.theme = currentTheme;
  if (document.body) document.body.classList.toggle('theme-dark', currentTheme === 'dark');
  if (themeToggle) themeToggle.checked = currentTheme === 'dark';
  if (options.persist !== false) {
    try {
      localStorage.setItem(THEME_KEY, currentTheme);
    } catch {
      // ignore storage failures
    }
  }
  if (options.refresh !== false) {
    buildGrid();
    if (detailSelectedColor) applyDetailAccent(detailSelectedColor);
    scheduleFitTimetableForMobile();
  }
}

function loadTheme() {
  let stored = null;
  try {
    stored = localStorage.getItem(THEME_KEY);
  } catch {
    stored = null;
  }
  applyTheme(stored, { persist: false, refresh: false });
}

function getSelectedDays() {
  if (!daySelect) return [];
  const day = parseInt(daySelect.value, 10);
  return Number.isFinite(day) ? [day] : [];
}

function clearSelectedDays() {
  if (!daySelect) return;
  daySelect.value = '';
  syncCustomPicker(daySelect);
}

const SLOT_CLOCK_SVG = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.25"/><path d="M8 4.6V8l2.4 1.5"/></svg>';

function fmtSlotDuration(startMins, endMins) {
  const mins = Math.max(0, endMins - startMins);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
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
    const dur = fmtSlotDuration(timeToMins(slot.start), timeToMins(slot.end));
    item.innerHTML = `
      <span class="slot-icon" aria-hidden="true">${SLOT_CLOCK_SVG}</span>
      <span class="slot-day">${DAY_LABELS[slot.day] || ''}</span>
      <span class="slot-time">
        <span class="slot-t">${slot.start}</span>
        <span class="slot-arrow" aria-hidden="true">→</span>
        <span class="slot-t">${slot.end}</span>
      </span>
      <span class="slot-end">
        <span class="slot-dur">${dur}</span>
        <button class="slot-remove" type="button" aria-label="Remove time block"><span aria-hidden="true">×</span></button>
      </span>
    `;
    itemsContainer.appendChild(item);
  });
}

function setDraftSlots(slots, options = {}) {
  draftSlots = normalizeSlots(slots);
  renderSlotList(draftSlots, slotItemsEl, 'No times added');
  renderDraftOverlays();
  if (options.livePreview !== false) requestRoutineLivePreview();
}

function clearDraftSlots() {
  setDraftSlots([]);
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

function buildSlotsFromAddInputs(options = {}) {
  const shouldFocus = options.focus !== false;
  const days = getSelectedDays();
  const start = startInput ? startInput.value : '';
  const end = endInput ? endInput.value : '';
  if (!days.length) {
    if (shouldFocus && daySelect) daySelect.focus();
    return null;
  }
  if (!start || !end) {
    if (shouldFocus) {
      if (!start && startInput) startInput.focus();
      else if (endInput) endInput.focus();
    }
    return null;
  }
  if (timeToMins(end) <= timeToMins(start)) {
    if (shouldFocus && endInput) endInput.focus();
    return null;
  }
  return days.map((day) => ({ day, start, end }));
}

// The single slot currently held in the editor row (day + start + end), or null.
function getPickerSlot() {
  const slots = buildSlotsFromAddInputs({ focus: false });
  return slots && slots.length ? slots[0] : null;
}

// Committed blocks plus the in-progress editor row. This is the source of truth
// for previews and saving, so a single block works without clicking "+".
function combinedDraftSlots() {
  const list = draftSlots.slice();
  const picker = getPickerSlot();
  if (picker) list.push(picker);
  return normalizeSlots(list);
}

function clearPickerInputs() {
  clearSelectedDays();
  if (startInput) {
    startInput.value = '';
    syncCustomPicker(startInput);
  }
  if (endInput) {
    endInput.value = '';
    syncCustomPicker(endInput);
  }
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

// Committed blocks are add-only: they can be removed, never re-opened for edit.
if (slotItemsEl) {
  slotItemsEl.addEventListener('click', (e) => {
    if (!e.target.closest('.slot-remove')) return;
    const item = e.target.closest('.slot-item');
    if (!item) return;
    const idx = parseInt(item.dataset.index, 10);
    if (!Number.isFinite(idx)) return;
    setDraftSlots(draftSlots.filter((_, i) => i !== idx));
  });
}
// The trailing "+" row expands in place into a single inline editor row.
function focusSlotEditorDay() {
  const trigger = slotEditorEl && slotEditorEl.querySelector('.custom-select-trigger');
  if (trigger) requestAnimationFrame(() => trigger.focus());
}
function setSlotEditorOpen(open, options = {}) {
  if (slotEditorEl) slotEditorEl.hidden = !open;
  if (addSlotTrigger) addSlotTrigger.hidden = open;
  if (!open) {
    clearPickerInputs();
    requestRoutineLivePreview();
  } else if (options.focus !== false) {
    focusSlotEditorDay();
  }
}
if (addSlotTrigger) {
  addSlotTrigger.addEventListener('click', () => setSlotEditorOpen(true));
}
// No Add/Cancel buttons: the row commits itself once day + start + end are all
// set, then clears for the next entry. Otherwise it just drives the live preview.
function handleSlotFieldChange() {
  const slot = getPickerSlot();
  if (!slot) {
    requestRoutineLivePreview();
    return;
  }
  clearPickerInputs();
  setDraftSlots([...draftSlots, slot]);
  focusSlotEditorDay();
}
// Collapse back to the "+" row when focus leaves the editor (discarding any
// incomplete entry); the auto-commit refocus keeps focus inside, so it survives.
if (slotEditorEl) {
  slotEditorEl.addEventListener('focusout', (e) => {
    if (slotEditorEl.contains(e.relatedTarget)) return;
    requestAnimationFrame(() => {
      if (slotEditorEl.hidden) return;
      if (slotEditorEl.contains(document.activeElement)) return;
      setSlotEditorOpen(false);
    });
  });
  slotEditorEl.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !e.target.closest('.custom-select.open')) {
      e.preventDefault();
      setSlotEditorOpen(false);
    }
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
    if (detailStartInput) {
      detailStartInput.value = '';
      syncCustomPicker(detailStartInput);
    }
    if (detailEndInput) {
      detailEndInput.value = '';
      syncCustomPicker(detailEndInput);
    }
  });
}
function setSwatchSelection(container, colorClass) {
  if (!container) return;
  container.querySelectorAll('.swatch').forEach((swatch) => {
    swatch.classList.toggle('selected', swatch.dataset.color === colorClass);
  });
  if (container === swatches) syncCustomColorControl(colorClass);
}

function applyDetailAccent(colorClass) {
  const card = document.getElementById('detailCard');
  if (!card) return;
  const accent = getColorAccent(colorClass);
  card.style.setProperty('--card-accent', accent);
  card.style.borderTopColor = accent;
}

function normalizeHexColor(value) {
  if (!value || typeof value !== 'string') return null;
  let hex = value.trim().toLowerCase();
  if (hex.startsWith(CUSTOM_COLOR_PREFIX)) hex = hex.slice(CUSTOM_COLOR_PREFIX.length);
  if (!hex.startsWith('#')) hex = `#${hex}`;
  if (/^#[0-9a-f]{3}$/i.test(hex)) {
    hex = `#${hex.slice(1).split('').map((ch) => ch + ch).join('')}`;
  }
  return /^#[0-9a-f]{6}$/i.test(hex) ? hex : null;
}

function makeCustomColorValue(value) {
  const hex = normalizeHexColor(value);
  return hex ? `${CUSTOM_COLOR_PREFIX}${hex}` : null;
}

function getCustomColorHex(color) {
  if (typeof color !== 'string' || !color.startsWith(CUSTOM_COLOR_PREFIX)) return null;
  return normalizeHexColor(color);
}

function isCustomColor(color) {
  return Boolean(getCustomColorHex(color));
}

function getColorAccent(color) {
  return getCustomColorHex(color) || COLOR_ACCENTS[color] || COLOR_ACCENTS['c-navy'];
}

function colorToRgba(color, alpha) {
  const rgb = parseColorToRgb(color);
  if (!rgb) return `rgba(15,15,112,${alpha})`;
  return `rgba(${Math.round(rgb.r)},${Math.round(rgb.g)},${Math.round(rgb.b)},${alpha})`;
}

function mixRgb(rgb, target, amount) {
  const t = target || { r: 255, g: 255, b: 255 };
  return {
    r: rgb.r + (t.r - rgb.r) * amount,
    g: rgb.g + (t.g - rgb.g) * amount,
    b: rgb.b + (t.b - rgb.b) * amount,
  };
}

function rgbToCss(rgb) {
  return `rgb(${Math.round(rgb.r)},${Math.round(rgb.g)},${Math.round(rgb.b)})`;
}

function rgbToRgbaCss(rgb, alpha) {
  return `rgba(${Math.round(rgb.r)},${Math.round(rgb.g)},${Math.round(rgb.b)},${alpha})`;
}

function getCustomCardVars(color) {
  const accent = getCustomColorHex(color);
  if (!accent) return null;
  const rgb = parseColorToRgb(accent);
  if (currentTheme === 'dark') {
    const lum = rgb ? getRelativeLuminance(rgb) : 0.5;
    const visibleAccentRgb = rgb && lum < 0.22 ? mixRgb(rgb, { r: 255, g: 255, b: 255 }, 0.42) : rgb;
    const visibleAccent = visibleAccentRgb ? rgbToCss(visibleAccentRgb) : accent;
    const textRgb = visibleAccentRgb
      ? mixRgb(visibleAccentRgb, { r: 255, g: 255, b: 255 }, lum > 0.68 ? 0.12 : 0.56)
      : { r: 230, g: 230, b: 230 };
    return {
      accent: visibleAccent,
      bg: colorToRgba(visibleAccent, 0.22),
      border: colorToRgba(visibleAccent, 0.44),
      text: rgbToCss(textRgb),
      sub: rgbToRgbaCss(textRgb, 0.72),
    };
  }
  const isLight = rgb ? getRelativeLuminance(rgb) > 0.68 : false;
  const text = isLight ? '#4a4a4a' : accent;
  const sub = isLight ? 'rgba(74,74,74,0.62)' : colorToRgba(accent, 0.62);
  return {
    accent,
    bg: colorToRgba(accent, isLight ? 0.24 : 0.12),
    border: colorToRgba(accent, isLight ? 0.42 : 0.26),
    text,
    sub,
  };
}

function applyCourseColorVars(el, color) {
  const vars = getCustomCardVars(color);
  if (!vars || !el) return;
  el.style.setProperty('--card-bg', vars.bg);
  el.style.setProperty('--card-accent', vars.accent);
  el.style.setProperty('--card-border', vars.border);
  el.style.setProperty('--card-text', vars.text);
  el.style.setProperty('--card-sub', vars.sub);
}

function clampUnit(value) {
  return Math.max(0, Math.min(1, value));
}

function rgbToHsv(rgb) {
  if (!rgb) return { h: 210, s: 0.72, v: 0.65 };
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  if (delta) {
    if (max === r) h = 60 * (((g - b) / delta) % 6);
    else if (max === g) h = 60 * ((b - r) / delta + 2);
    else h = 60 * ((r - g) / delta + 4);
  }
  if (h < 0) h += 360;
  return {
    h: Math.round(h),
    s: max === 0 ? 0 : delta / max,
    v: max,
  };
}

function hsvToRgb(h, s, v) {
  const hue = ((h % 360) + 360) % 360;
  const sat = clampUnit(s);
  const val = clampUnit(v);
  const c = val * sat;
  const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
  const m = val - c;
  let r = 0, g = 0, b = 0;
  if (hue < 60) [r, g, b] = [c, x, 0];
  else if (hue < 120) [r, g, b] = [x, c, 0];
  else if (hue < 180) [r, g, b] = [0, c, x];
  else if (hue < 240) [r, g, b] = [0, x, c];
  else if (hue < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToHex(rgb) {
  if (!rgb) return '#205ea6';
  return `#${[rgb.r, rgb.g, rgb.b]
    .map((value) => Math.round(Math.max(0, Math.min(255, value))).toString(16).padStart(2, '0'))
    .join('')}`;
}

function hsvToHex(h, s, v) {
  return rgbToHex(hsvToRgb(h, s, v));
}

function setCustomPickerFromHex(value) {
  const hex = normalizeHexColor(value) || '#205ea6';
  const hsv = rgbToHsv(parseColorToRgb(hex));
  customPickerHue = hsv.h;
  customPickerSat = hsv.s;
  customPickerVal = hsv.v;
  syncCustomPickerUi(hex);
}

function getCustomPickerHex() {
  return hsvToHex(customPickerHue, customPickerSat, customPickerVal);
}

function syncCustomPickerUi(hex = getCustomPickerHex()) {
  if (!customColorSwatch) return;
  const hueColor = hsvToHex(customPickerHue, 1, 1);
  customColorSwatch.style.setProperty('--custom-color', hex);
  if (customColorField) {
    customColorField.style.setProperty('--custom-hue-color', hueColor);
    customColorField.style.setProperty('--custom-sat-pos', `${(customPickerSat * 100).toFixed(2)}%`);
    customColorField.style.setProperty('--custom-val-pos', `${((1 - customPickerVal) * 100).toFixed(2)}%`);
    customColorField.setAttribute('aria-valuenow', String(Math.round(customPickerVal * 100)));
  }
  if (customHueSlider) customHueSlider.value = String(customPickerHue);
  if (customHexInput && document.activeElement !== customHexInput) customHexInput.value = hex.toUpperCase();
  if (customColorPreview) customColorPreview.style.setProperty('--custom-color', hex);
}

function syncCustomColorControl(color) {
  if (!customColorSwatch) return;
  const hex = getCustomColorHex(color);
  if (hex) {
    setCustomPickerFromHex(hex);
    customColorSwatch.classList.add('selected');
  } else {
    const accent = normalizeHexColor(COLOR_ACCENTS[color]) || getCustomPickerHex();
    setCustomPickerFromHex(accent);
    customColorSwatch.classList.remove('selected');
  }
}

function parseColorToRgb(color) {
  if (!color || typeof color !== 'string') return null;
  const trimmed = color.trim();
  if (trimmed.startsWith('#')) {
    let hex = trimmed.slice(1);
    if (hex.length === 3) hex = hex.split('').map((ch) => ch + ch).join('');
    if (hex.length !== 6) return null;
    const value = Number.parseInt(hex, 16);
    if (Number.isNaN(value)) return null;
    return {
      r: (value >> 16) & 255,
      g: (value >> 8) & 255,
      b: value & 255,
    };
  }
  const match = trimmed.match(/^rgb\s*\(([^)]+)\)/i);
  if (!match) return null;
  const parts = match[1].split(',').map((part) => Number.parseFloat(part.trim()));
  if (parts.length < 3 || parts.some((v) => !Number.isFinite(v))) return null;
  return { r: parts[0], g: parts[1], b: parts[2] };
}

function getRelativeLuminance(rgb) {
  const toLinear = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const r = toLinear(rgb.r);
  const g = toLinear(rgb.g);
  const b = toLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function resolveHeaderTextColors(accent) {
  const rgb = parseColorToRgb(accent);
  if (!rgb) {
    return {
      text: 'rgba(255,255,255,1)',
      border: 'rgba(255,255,255,0.08)',
      shadow: 'rgba(255,255,255,0.08)',
    };
  }
  const isLight = getRelativeLuminance(rgb) > 0.6;
  return {
    text: isLight ? 'rgba(35,35,35,0.92)' : 'rgba(255,255,255,0.98)',
    border: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)',
    shadow: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
  };
}

function applyHeaderColor(colorClass, options = {}) {
  const resolved = COLOR_ACCENTS[colorClass] ? colorClass : 'c-navy';
  const accent = COLOR_ACCENTS[resolved] || COLOR_ACCENTS['c-navy'];
  const colors = resolveHeaderTextColors(accent);
  const root = document.documentElement;
  headerColor = resolved;
  root.style.setProperty('--day-header-bg', accent);
  root.style.setProperty('--day-header-text', colors.text);
  root.style.setProperty('--day-header-border', colors.border);
  root.style.setProperty('--day-header-shadow', colors.shadow);
  setSwatchSelection(headerSwatches, headerColor);
  if (options.persist === false) return;
  try {
    localStorage.setItem(HEADER_COLOR_KEY, headerColor);
  } catch {
    // ignore storage failures
  }
}

function loadHeaderColor() {
  let stored = null;
  try {
    stored = localStorage.getItem(HEADER_COLOR_KEY);
  } catch {
    stored = null;
  }
  if (stored && COLOR_ACCENTS[stored]) headerColor = stored;
  applyHeaderColor(headerColor, { persist: false });
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
  applyHeaderColor(selectedColor);
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
      link.download = `weekly-schedule-${Date.now()}.png`;
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
      link.download = `weekly-schedule-${Date.now()}.png`;
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

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function getStoredJson(key, fallback = null) {
  try {
    return safeParse(localStorage.getItem(key), fallback);
  } catch {
    return fallback;
  }
}

function buildDataExportPayload() {
  return {
    app: EXPORT_APP_ID,
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    userData: ensureUserData(currentUserId || LOCAL_USER),
    preferences: {
      viewSettings: getStoredJson(VIEW_SETTINGS_KEY, {
        start: minsToTimeStr(viewStartMins),
        end: minsToTimeStr(viewEndMins),
        days: visibleDays,
      }),
      headerColor,
      theme: currentTheme,
      cardInfo: getStoredJson(CARD_INFO_KEY, cardInfoSelection),
    },
  };
}

function exportData() {
  const payload = buildDataExportPayload();
  const json = JSON.stringify(payload, null, 2);
  const date = new Date().toISOString().slice(0, 10);
  downloadBlob(new Blob([json], { type: 'application/json;charset=utf-8' }), `weekly-rhythm-data-${date}.json`);
}

function normalizeImportedCourse(course, fallbackId) {
  if (!course || typeof course !== 'object') return null;
  const rawSlots = Array.isArray(course.slots)
    ? course.slots
    : (course.day && course.start && course.end ? [{ day: course.day, start: course.start, end: course.end }] : []);
  const slots = normalizeSlots(rawSlots);
  if (!slots.length) return null;
  const idNumber = Number(course.id);
  const id = Number.isFinite(idNumber) && idNumber > 0 ? Math.floor(idNumber) : fallbackId;
  const creditNumber = parseInt(course.credit, 10);
  const color = isCustomColor(course.color) || COLOR_ACCENTS[course.color] ? course.color : 'c-navy';
  const next = {
    id,
    name: typeof course.name === 'string' && course.name.trim() ? course.name.trim() : 'Untitled Routine',
    prof: typeof course.prof === 'string' ? course.prof : '',
    room: typeof course.room === 'string' ? course.room : '',
    credit: Number.isFinite(creditNumber) ? Math.min(6, Math.max(1, creditNumber)) : 3,
    color,
    slots,
  };
  if (slots[0]) {
    next.day = slots[0].day;
    next.start = slots[0].start;
    next.end = slots[0].end;
  }
  return next;
}

function normalizeImportedUserData(raw) {
  if (!raw || typeof raw !== 'object' || !raw.semesters || typeof raw.semesters !== 'object') return null;
  const data = createDefaultUserData();
  SEMESTERS.forEach((sem) => {
    const sourceSem = raw.semesters[sem];
    if (!sourceSem || !Array.isArray(sourceSem.timetables)) return;
    const timetables = sourceSem.timetables.map((table, tableIndex) => {
      if (!table || typeof table !== 'object') return null;
      const fallbackTableId = `tt-import-${sem}-${tableIndex + 1}`;
      const tableId = typeof table.id === 'string' && table.id ? table.id : fallbackTableId;
      const courses = Array.isArray(table.courses)
        ? table.courses.map((course, courseIndex) => normalizeImportedCourse(course, courseIndex + 1)).filter(Boolean)
        : [];
      return {
        id: tableId,
        name: typeof table.name === 'string' && table.name.trim()
          ? table.name.trim()
          : `Imported Schedule ${tableIndex + 1}`,
        courses,
      };
    }).filter(Boolean);
    if (!timetables.length) return;
    const activeId = typeof sourceSem.activeId === 'string'
      && timetables.some((table) => table.id === sourceSem.activeId)
      ? sourceSem.activeId
      : timetables[0].id;
    data.semesters[sem] = { timetables, activeId };
  });
  data.lastSemester = SEMESTERS.includes(raw.lastSemester) ? raw.lastSemester : SEMESTERS[0];
  return data;
}

function normalizeImportedViewSettings(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const range = normalizeViewRange(timeToMins(raw.start || ''), timeToMins(raw.end || ''));
  return {
    start: minsToTimeStr(range.start),
    end: minsToTimeStr(range.end),
    days: normalizeVisibleDays(raw.days),
  };
}

function applyImportedPreferences(payload) {
  const preferences = payload && typeof payload.preferences === 'object' ? payload.preferences : {};
  const viewSettings = normalizeImportedViewSettings(preferences.viewSettings || payload.viewSettings);
  if (viewSettings) localStorage.setItem(VIEW_SETTINGS_KEY, JSON.stringify(viewSettings));

  const nextHeaderColor = preferences.headerColor || payload.headerColor;
  if (COLOR_ACCENTS[nextHeaderColor]) localStorage.setItem(HEADER_COLOR_KEY, nextHeaderColor);

  const nextTheme = preferences.theme || payload.theme;
  if (nextTheme === 'dark' || nextTheme === 'light') localStorage.setItem(THEME_KEY, nextTheme);

  const cardInfoSource = Array.isArray(preferences.cardInfo)
    ? preferences.cardInfo
    : (Array.isArray(payload.cardInfo) ? payload.cardInfo : null);
  if (cardInfoSource) {
    localStorage.setItem(CARD_INFO_KEY, JSON.stringify(normalizeCardInfoSelection(cardInfoSource)));
  }
}

function reloadImportedState(data) {
  currentUserId = LOCAL_USER;
  currentSemester = SEMESTERS.includes(data.lastSemester) ? data.lastSemester : SEMESTERS[0];
  currentTableId = null;
  activeId = null;
  disarmRoutineDeleteShortcut();
  clearRoutineEditState();
  clearRoutineFields();
  loadViewSettings();
  loadTheme();
  loadHeaderColor();
  loadCardInfoSelection();
  applyCardInfoSelectionToToggles();
  populateSemesterSelect();
  loadCurrentTimetable();
  syncRoutineEditorMode();
  closePanel();
  if (controlsPopover && !controlsPopover.hidden) setControlsOpen(false);
  if (appearancePopover && !appearancePopover.hidden) setAppearanceOpen(false);
}

async function importDataFile(file) {
  if (!file) return;
  let payload = null;
  try {
    payload = JSON.parse(await file.text());
  } catch {
    await openConfirm({
      title: 'Import Failed',
      message: 'This file is not valid JSON.',
      okText: 'OK',
      cancelText: 'Close',
    });
    return;
  }

  const sourceData = payload.userData || payload.data || (payload.semesters ? payload : null);
  const importedData = normalizeImportedUserData(sourceData);
  if (!importedData) {
    await openConfirm({
      title: 'Import Failed',
      message: 'This file does not contain Weekly Rhythm schedule data.',
      okText: 'OK',
      cancelText: 'Close',
    });
    return;
  }

  const ok = await openConfirm({
    title: 'Import Data',
    message: 'Importing will replace the current local schedule data on this device.',
    okText: 'Import',
    cancelText: 'Cancel',
  });
  if (!ok) return;

  saveUserData(LOCAL_USER, importedData);
  applyImportedPreferences(payload);
  reloadImportedState(importedData);
}

if (paletteSelect) {
  paletteSelect.addEventListener('change', () => {
    applyPalette(paletteSelect.value);
  });
}
if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    applyTheme(themeToggle.checked ? 'dark' : 'light');
  });
}
if (viewStartInput) viewStartInput.addEventListener('change', updateViewFromControls);
if (viewEndInput) viewEndInput.addEventListener('change', updateViewFromControls);
if (viewDayToggles) {
  viewDayToggles.addEventListener('change', (e) => {
    if (!e.target.matches('input[type="checkbox"]')) return;
    updateViewFromControls();
  });
}
if (detailNameInput) {
  detailNameInput.addEventListener('input', () => {
    const title = document.getElementById('d-title');
    if (title) title.textContent = detailNameInput.value.trim() || '';
  });
}
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
  return (timeToMins(t) - viewStartMins) / 60; // hours from visible top
}

function getViewDurationMins() {
  return viewEndMins - viewStartMins;
}

function getViewDurationHours() {
  return getViewDurationMins() / 60;
}

function normalizeViewRange(startMins, endMins) {
  const minStart = VIEW_MIN_H * 60;
  const maxEnd = VIEW_MAX_H * 60;
  let start = Number.isFinite(startMins) ? startMins : DEFAULT_START_H * 60;
  let end = Number.isFinite(endMins) ? endMins : DEFAULT_END_H * 60;
  start = Math.max(minStart, Math.min(start, maxEnd - 60));
  end = Math.max(start + 60, Math.min(end, maxEnd));
  return { start, end };
}

function normalizeVisibleDays(days) {
  const next = [];
  (Array.isArray(days) ? days : []).forEach((day) => {
    const value = parseInt(day, 10);
    if (value >= 1 && value <= 7 && !next.includes(value)) next.push(value);
  });
  next.sort((a, b) => a - b);
  return next.length ? next : [1, 2, 3, 4, 5];
}

function loadViewSettings() {
  const stored = safeParse(localStorage.getItem(VIEW_SETTINGS_KEY), null);
  const range = normalizeViewRange(
    stored ? timeToMins(stored.start || '') : DEFAULT_START_H * 60,
    stored ? timeToMins(stored.end || '') : DEFAULT_END_H * 60,
  );
  viewStartMins = range.start;
  viewEndMins = range.end;
  visibleDays = normalizeVisibleDays(stored && stored.days);
  syncViewControls();
}

function persistViewSettings() {
  localStorage.setItem(VIEW_SETTINGS_KEY, JSON.stringify({
    start: minsToTimeStr(viewStartMins),
    end: minsToTimeStr(viewEndMins),
    days: visibleDays,
  }));
}

function syncViewControls() {
  if (viewStartInput) {
    viewStartInput.value = minsToTimeStr(viewStartMins);
    syncCustomPicker(viewStartInput);
  }
  if (viewEndInput) {
    viewEndInput.value = minsToTimeStr(viewEndMins);
    syncCustomPicker(viewEndInput);
  }
  if (viewDayToggles) {
    viewDayToggles.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.checked = visibleDays.includes(parseInt(input.value, 10));
    });
  }
}

function updateViewFromControls() {
  const range = normalizeViewRange(
    viewStartInput ? timeToMins(viewStartInput.value || '') : viewStartMins,
    viewEndInput ? timeToMins(viewEndInput.value || '') : viewEndMins,
  );
  viewStartMins = range.start;
  viewEndMins = range.end;
  if (viewDayToggles) {
    const selected = Array.from(viewDayToggles.querySelectorAll('input[type="checkbox"]:checked'))
      .map((input) => parseInt(input.value, 10));
    visibleDays = normalizeVisibleDays(selected);
  }
  syncViewControls();
  persistViewSettings();
  buildGrid();
}

function normalizeSlots(raw) {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  const slots = [];
  raw.forEach((s) => {
    const day = parseInt(s.day, 10);
    const start = typeof s.start === 'string' ? s.start : '';
    const end = typeof s.end === 'string' ? s.end : '';
    if (!Number.isFinite(day) || day < 1 || day > 7) return;
    if (!start || !end) return;
    const startMins = timeToMins(start);
    const endMins = timeToMins(end);
    if (!Number.isFinite(startMins) || !Number.isFinite(endMins) || endMins <= startMins) return;
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

function populateSemesterSelect() {
  if (!semesterSelect) return;
  semesterSelect.innerHTML = '';
  SEMESTERS.forEach((sem) => {
    const opt = document.createElement('option');
    opt.value = sem;
    opt.textContent = SEMESTER_LABELS[sem] || sem;
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
      name: `${t.name} (${SEMESTER_LABELS[sem] || sem})`,
      courses: cloneCourses(t.courses),
    }));
    data.semesters[sem] = { timetables: tables, activeId: tables[0].id };
  }
  if (!data.semesters[sem].timetables.length) {
    const id = `tt-${sem}-${Date.now()}`;
    data.semesters[sem].timetables.push({ id, name: `New Schedule (${SEMESTER_LABELS[sem] || sem})`, courses: [] });
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

function deleteTimetable() {
  if (!currentUserId || !currentSemester || !currentTableId) return;
  const data = ensureUserData(currentUserId);
  const semData = ensureSemesterData(data, currentSemester);
  semData.timetables = semData.timetables.filter((t) => t.id !== currentTableId);
  if (semData.timetables.length) {
    semData.activeId = semData.timetables[0].id;
  } else {
    semData.activeId = null; // ensureSemesterData will reseed a fresh table on reload
  }
  currentTableId = null;
  saveUserData(currentUserId, data);
  loadCurrentTimetable();
}

// ── Render ───────────────────────────────────────────
function buildGrid() {
  const tbl = document.getElementById('timetable');
  if (!tbl) return;
  tbl.innerHTML = '';
  tbl.style.setProperty('--day-count', String(visibleDays.length));
  tbl.style.gridTemplateColumns = `var(--time-w) repeat(${visibleDays.length}, minmax(var(--col-min), 1fr))`;
  tbl.style.minWidth = `${56 + visibleDays.length * 120}px`;

  const infoOrder = CARD_INFO_ORDER.filter((key) => cardInfoSelection.includes(key));

  const timeHeader = document.createElement('div');
  timeHeader.className = 'day-header time-header';
  timeHeader.textContent = 'TIME';
  tbl.appendChild(timeHeader);

  visibleDays.forEach((day, idx) => {
    const header = document.createElement('div');
    header.className = `day-header${idx === visibleDays.length - 1 ? ' last-day-header' : ''}`;
    header.lang = 'en';
    header.textContent = DAY_LABELS[day] || '';
    header.dataset.day = String(day);
    tbl.appendChild(header);
  });

  for (let mins = viewStartMins; mins < viewEndMins; mins += 60) {
    const label = document.createElement('div');
    label.className = 'time-label';
    label.textContent = minsToTimeStr(mins);
    tbl.appendChild(label);

    visibleDays.forEach((d, idx) => {
      const cell = document.createElement('div');
      cell.className = `grid-cell${idx === visibleDays.length - 1 ? ' last-day-cell' : ''}`;
      cell.dataset.day = d;
      cell.dataset.mins = mins;
      tbl.appendChild(cell);
    });
  }

  // gather every slot as a placement, grouped by day
  const placementsByDay = {};
  visibleDays.forEach((day) => { placementsByDay[day] = []; });
  const renderCourses = routinePreviewCourse ? [...courses, routinePreviewCourse] : courses;
  renderCourses.forEach((course) => {
    const c = ensureCourseSlots(course);
    (c.slots || []).forEach((slot, slotIndex) => {
      const startMins = timeToMins(slot.start);
      const endMins = timeToMins(slot.end);
      if (!(endMins > startMins)) return;
      if (placementsByDay[slot.day]) {
        if (endMins <= viewStartMins || startMins >= viewEndMins) return;
        placementsByDay[slot.day].push({
          course: c,
          slot,
          slotIndex,
          startMins: Math.max(startMins, viewStartMins),
          endMins: Math.min(endMins, viewEndMins),
          rawStartMins: startMins,
          rawEndMins: endMins,
        });
      }
    });
  });

  // place course cards, laying overlapping slots out side-by-side (Notion-style)
  Object.keys(placementsByDay).forEach((day) => {
    const items = assignOverlapColumns(placementsByDay[day]);
    const cells = tbl.querySelectorAll(`.grid-cell[data-day="${day}"]`);
    if (!cells.length) return;
    const anchorCell = cells[0]; // first visible row

    items.forEach((item) => {
      const c = item.course;
      const slot = item.slot;
      const durMins = item.endMins - item.startMins;
      const durFrac = durMins / 60;
      const isShort = durMins <= 60;
      const gap = isShort ? 2 : 3;

      const topPx    = (item.startMins - viewStartMins) / 60 * ROW_H + gap;
      const heightPx = Math.max(durFrac * ROW_H - gap * 2, 6);

      const card = document.createElement('div');
      const isPreview = Boolean(c.isPreview);
      const presetColorClass = COLOR_ACCENTS[c.color] ? c.color : (isCustomColor(c.color) ? '' : 'c-navy');
      card.className = `course-card${presetColorClass ? ` ${presetColorClass}` : ''}${isShort ? ' short' : ''}${isPreview ? ' routine-preview' : ''}`;
      applyCourseColorVars(card, c.color);
      card.style.top    = topPx + 'px';
      card.style.height = heightPx + 'px';

      // side-by-side columns for overlapping slots
      const cols = item.cols || 1;
      const colGap = cols > 1 ? 2 : 0;
      card.style.left  = `calc(3px + ${item.col} * (100% - 6px) / ${cols})`;
      card.style.right = 'auto';
      card.style.width = `calc((100% - 6px) / ${cols} - ${colGap}px)`;
      card.dataset.id = c.id;
      card.title = [c.name, c.prof, c.room].filter(Boolean).join(' · ');

      const infoLines = [];
      infoOrder.forEach((key) => {
        if (key === 'prof' && c.prof) infoLines.push({ type: 'prof', text: c.prof });
        if (key === 'room' && c.room) infoLines.push({ type: 'room', text: c.room });
        if (key === 'credit') infoLines.push({ type: 'credit', text: `Priority ${c.credit}` });
      });

      if (isShort) {
        let shortText = '';
        if (cardInfoSelection.includes('room') && c.room) shortText = c.room;
        else if (cardInfoSelection.includes('prof') && c.prof) shortText = c.prof;
        else if (cardInfoSelection.includes('credit')) shortText = `Priority ${c.credit}`;
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

      // resize handles (appended after innerHTML so they aren't wiped)
      const topHandle = document.createElement('div');
      topHandle.className = 'resize-handle resize-top';
      const botHandle = document.createElement('div');
      botHandle.className = 'resize-handle resize-bottom';
      card.appendChild(topHandle);
      card.appendChild(botHandle);

      // drag: move on body, resize on handles; a click (no move) opens detail
      if (!isPreview) {
        card.addEventListener('pointerdown', (e) => {
          if (e.target.closest('.resize-handle')) return;
          beginCardDrag(e, c, slot, 'move', item.slotIndex);
        });
        topHandle.addEventListener('pointerdown', (e) => {
          e.stopPropagation();
          beginCardDrag(e, c, slot, 'resize-top', item.slotIndex);
        });
        botHandle.addEventListener('pointerdown', (e) => {
          e.stopPropagation();
          beginCardDrag(e, c, slot, 'resize-bottom', item.slotIndex);
        });
      }

      anchorCell.appendChild(card);
    });
  });

  renderDraftOverlays();
  scheduleFitTimetableForMobile();
}

// Greedy interval-graph layout: assign each slot a column index (`col`) and the
// total column count of its overlap cluster (`cols`) so overlaps sit side-by-side.
function assignOverlapColumns(items) {
  items.sort((a, b) => a.startMins - b.startMins || a.endMins - b.endMins);
  let cluster = [];
  let colEnds = [];         // end time of the last slot placed in each column
  let clusterMaxEnd = -Infinity;

  const flush = () => {
    const cols = colEnds.length;
    cluster.forEach((it) => { it.cols = cols; });
    cluster = [];
    colEnds = [];
    clusterMaxEnd = -Infinity;
  };

  items.forEach((it) => {
    if (cluster.length && it.startMins >= clusterMaxEnd) flush();
    let placed = -1;
    for (let i = 0; i < colEnds.length; i++) {
      if (colEnds[i] <= it.startMins) { placed = i; break; }
    }
    if (placed === -1) { placed = colEnds.length; colEnds.push(it.endMins); }
    else colEnds[placed] = it.endMins;
    it.col = placed;
    cluster.push(it);
    clusterMaxEnd = Math.max(clusterMaxEnd, it.endMins);
  });
  flush();
  return items;
}

function renderDraftOverlays() {
  if (!timetableEl) return;
  timetableEl.querySelectorAll('.draft-slot').forEach((el) => el.remove());
  if (activeId != null) return;
  if (routinePreviewCourse) return;
  const overlaySlots = combinedDraftSlots();
  if (!overlaySlots.length) return;
  overlaySlots.forEach((slot) => {
    if (!visibleDays.includes(slot.day)) return;
    const rawStart = timeToMins(slot.start);
    const rawEnd = timeToMins(slot.end);
    if (rawEnd <= viewStartMins || rawStart >= viewEndMins) return;
    const start = Math.max(rawStart, viewStartMins);
    const end = Math.min(rawEnd, viewEndMins);
    const startFrac = (start - viewStartMins) / 60;
    const durMins = end - start;
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
const SLOT_DRAG_THRESHOLD = 4;
let isDraggingSlot = false;
let dragPointerId = null;
let dragDay = null;
let dragStartMins = null;
let dragEndMins = null;
let dragGhost = null;
let dragAnchor = null;
let dragStartX = 0;
let dragStartY = 0;
let dragMoved = false;
let dragPreparedFreshDraft = false;

function getDayFromClientX(clientX) {
  if (!timetableEl) return null;
  const rect = timetableEl.getBoundingClientRect();
  const timeHeader = timetableEl.querySelector('.day-header');
  const timeW = timeHeader
    ? timeHeader.getBoundingClientRect().width
    : (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--time-w')) || 56);
  const x = clientX - rect.left;
  if (x <= timeW) return null;
  const dayCount = visibleDays.length || 1;
  const colW = (rect.width - timeW) / dayCount;
  const idx = Math.floor((x - timeW) / colW);
  if (idx < 0 || idx >= dayCount) return null;
  return visibleDays[idx] || null;
}

function getMinsFromClientY(clientY, mode = 'floor') {
  if (!timetableEl) return null;
  const firstLabel = timetableEl.querySelector('.time-label');
  if (!firstLabel) return null;
  const labelRect = firstLabel.getBoundingClientRect();
  const top = labelRect.top;
  const rowH = labelRect.height || ROW_H;
  const offset = clientY - top;
  const totalMins = getViewDurationMins();
  const maxPx = getViewDurationHours() * rowH;
  const raw = Math.max(0, Math.min(offset, maxPx)) / rowH * 60;
  const snapped = mode === 'ceil'
    ? Math.ceil(raw / TIME_STEP) * TIME_STEP
    : Math.floor(raw / TIME_STEP) * TIME_STEP;
  const mins = Math.max(0, Math.min(snapped, totalMins));
  return viewStartMins + mins;
}

// Unsnapped absolute minutes at a Y position (used by card move/resize).
function getRawMinsFromClientY(clientY) {
  if (!timetableEl) return viewStartMins;
  const firstLabel = timetableEl.querySelector('.time-label');
  if (!firstLabel) return viewStartMins;
  const labelRect = firstLabel.getBoundingClientRect();
  const rowH = labelRect.height || ROW_H;
  const offset = clientY - labelRect.top;
  const maxPx = getViewDurationHours() * rowH;
  const raw = Math.max(0, Math.min(offset, maxPx)) / rowH * 60;
  return viewStartMins + raw;
}

function updateDragGhost() {
  if (!dragGhost || dragStartMins == null || dragEndMins == null) return;
  const start = Math.min(dragStartMins, dragEndMins);
  const end = Math.max(dragStartMins, dragEndMins);
  const isZeroHeight = end <= start;
  const clampedEnd = isZeroHeight ? start : Math.max(start + TIME_STEP, end);
  const gap = 2;
  const topPx = ((start - viewStartMins) / 60) * ROW_H + (isZeroHeight ? 0 : gap);
  const heightPx = isZeroHeight ? 0 : ((clampedEnd - start) / 60) * ROW_H - gap * 2;
  dragGhost.style.top = `${topPx}px`;
  dragGhost.style.height = `${heightPx}px`;
  const label = dragGhost.querySelector('.drag-ghost-label');
  if (label) {
    label.textContent = isZeroHeight
      ? ''
      : `${DAY_LABELS[dragDay] || ''} ${minsToTimeStr(start)}–${minsToTimeStr(clampedEnd)}`;
  }
}

function createDragGhost() {
  if (dragGhost || !timetableEl || !dragDay) return;
  const anchorCell = timetableEl.querySelector(`.grid-cell[data-day="${dragDay}"]`);
  if (!anchorCell) return;
  dragAnchor = anchorCell;
  dragGhost = document.createElement('div');
  dragGhost.className = 'drag-ghost selecting';
  dragGhost.innerHTML = '<span class="drag-ghost-label"></span>';
  dragAnchor.appendChild(dragGhost);
  document.body.classList.add('selecting-slot');
  updateDragGhost();
}

function prepareFreshRoutineDraftFromDrag() {
  if (dragPreparedFreshDraft) return;
  dragPreparedFreshDraft = true;
  livePreviewSuspended = true;
  activeId = null;
  disarmRoutineDeleteShortcut();
  clearRoutineEditState();
  syncRoutineEditorMode();
  clearRoutineFields();
  livePreviewSuspended = false;
}

function clearEmptyRoutineDraftFromGridClick() {
  if (activeId != null) return false;
  if (!draftSlots.length) return false;
  if (routinePreviewCourse) return false;
  if (hasRoutineEditorContent()) return false;
  livePreviewSuspended = true;
  clearRoutineFields();
  livePreviewSuspended = false;
  syncRoutineEditorMode();
  return true;
}

function clearDragGhost() {
  if (dragGhost && dragGhost.parentNode) dragGhost.parentNode.removeChild(dragGhost);
  dragGhost = null;
  dragAnchor = null;
  document.body.classList.remove('selecting-slot');
}

function moveDragGhostToDay(day) {
  const anchorCell = timetableEl.querySelector(`.grid-cell[data-day="${day}"]`);
  if (!anchorCell || !dragGhost) return false;
  if (dragGhost.parentNode !== anchorCell) anchorCell.appendChild(dragGhost);
  dragAnchor = anchorCell;
  dragDay = day;
  return true;
}

function startDragAdd(e) {
  if (!timetableEl || e.button !== 0) return;
  if (e.target.closest('.course-card')) return;
  const day = getDayFromClientX(e.clientX);
  if (!day) return;
  const start = getMinsFromClientY(e.clientY, 'floor');
  if (start == null) return;
  const safeStart = Math.min(start, viewEndMins - TIME_STEP);
  const firstLabel = timetableEl.querySelector('.time-label');
  if (!firstLabel) return;
  if (e.clientY < firstLabel.getBoundingClientRect().top) return;

  const anchorCell = timetableEl.querySelector(`.grid-cell[data-day="${day}"]`);
  if (!anchorCell) return;

  isDraggingSlot = true;
  dragPointerId = e.pointerId;
  dragDay = day;
  dragStartMins = safeStart;
  dragEndMins = safeStart;
  dragAnchor = anchorCell;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  dragMoved = false;
  dragPreparedFreshDraft = false;

  timetableEl.setPointerCapture?.(e.pointerId);
  window.addEventListener('pointermove', onDragMove);
  window.addEventListener('pointerup', onDragEnd);
  window.addEventListener('pointercancel', onDragCancel);
  e.preventDefault();
}

function onDragMove(e) {
  if (!isDraggingSlot || e.pointerId !== dragPointerId) return;
  const nextDay = getDayFromClientX(e.clientX);
  if (nextDay) dragDay = nextDay;
  if (!dragMoved) {
    const dx = Math.abs(e.clientX - dragStartX);
    const dy = Math.abs(e.clientY - dragStartY);
    if (dx >= SLOT_DRAG_THRESHOLD || dy >= SLOT_DRAG_THRESHOLD) {
      dragMoved = true;
      prepareFreshRoutineDraftFromDrag();
      createDragGhost();
      if (dragGhost) dragGhost.classList.add('is-live');
    }
  }
  if (nextDay) moveDragGhostToDay(nextDay);
  const raw = getRawMinsFromClientY(e.clientY);
  const current = getMinsFromClientY(e.clientY, raw >= dragStartMins ? 'ceil' : 'floor');
  if (current == null) return;
  dragEndMins = current;
  updateDragGhost();
  e.preventDefault();
}

function onDragEnd(e) {
  if (!isDraggingSlot || e.pointerId !== dragPointerId) return;
  window.removeEventListener('pointermove', onDragMove);
  window.removeEventListener('pointerup', onDragEnd);
  window.removeEventListener('pointercancel', onDragCancel);
  timetableEl.releasePointerCapture?.(e.pointerId);
  isDraggingSlot = false;

  if (!dragMoved) {
    clearDragGhost();
    clearEmptyRoutineDraftFromGridClick();
    return;
  }

  let start = Math.min(dragStartMins, dragEndMins);
  let end = Math.max(dragStartMins, dragEndMins);
  if (end <= start) end = Math.min(start + TIME_STEP, viewEndMins);
  clearDragGhost();

  const startStr = minsToTimeStr(start);
  const endStr = minsToTimeStr(Math.max(end, start + TIME_STEP));
  const slot = { day: dragDay, start: startStr, end: endStr };
  prepareFreshRoutineDraftFromDrag();
  syncRoutineEditorMode();
  // Drag commits the block directly as a chip; the editor row stays empty.
  clearPickerInputs();
  setDraftSlots([slot]);
  openPanel({ focus: true, anchorRect: getSlotClientRect(slot) });
}

function onDragCancel(e) {
  if (!isDraggingSlot || e.pointerId !== dragPointerId) return;
  window.removeEventListener('pointermove', onDragMove);
  window.removeEventListener('pointerup', onDragEnd);
  window.removeEventListener('pointercancel', onDragCancel);
  timetableEl.releasePointerCapture?.(e.pointerId);
  isDraggingSlot = false;
  clearDragGhost();
}

if (timetableEl) {
  timetableEl.addEventListener('pointerdown', startDragAdd);
}

// ── Drag to move / resize existing cards ────────────
const CARD_DRAG_THRESHOLD = 4; // px before a press becomes a drag (else it's a click)
let cardDrag = null;

function beginCardDrag(e, course, slot, mode, slotIndex = -1) {
  if (e.button != null && e.button !== 0) return;
  e.preventDefault();
  e.stopPropagation();
  const card = e.currentTarget.closest ? e.currentTarget.closest('.course-card') : null;
  const cardEl = card || (e.target.closest && e.target.closest('.course-card'));
  if (!cardEl) return;
  const startMins = timeToMins(slot.start);
  const endMins = timeToMins(slot.end);
  cardDrag = {
    mode, course, slot, slotIndex, card: cardEl,
    pointerId: e.pointerId,
    startX: e.clientX, startY: e.clientY,
    startRawMins: getRawMinsFromClientY(e.clientY),
    origDay: slot.day,
    origStartMins: startMins,
    origEndMins: endMins,
    duration: endMins - startMins,
    newDay: slot.day,
    newStartMins: startMins,
    newEndMins: endMins,
    moved: false,
  };
  cardEl.setPointerCapture?.(e.pointerId);
  window.addEventListener('pointermove', onCardDragMove);
  window.addEventListener('pointerup', onCardDragEnd);
  window.addEventListener('pointercancel', onCardDragEnd);
}

function onCardDragMove(e) {
  if (!cardDrag || e.pointerId !== cardDrag.pointerId) return;
  if (!cardDrag.moved) {
    if (Math.abs(e.clientX - cardDrag.startX) < CARD_DRAG_THRESHOLD &&
        Math.abs(e.clientY - cardDrag.startY) < CARD_DRAG_THRESHOLD) return;
    cardDrag.moved = true;
    cardDrag.card.classList.add('dragging');
    document.body.classList.add('dragging-card');
  }
  const curRaw = getRawMinsFromClientY(e.clientY);
  const dayTop = viewStartMins;
  const dayEnd = viewEndMins;

  if (cardDrag.mode === 'move') {
    const delta = Math.round((curRaw - cardDrag.startRawMins) / TIME_STEP) * TIME_STEP;
    let ns = cardDrag.origStartMins + delta;
    ns = Math.max(dayTop, Math.min(ns, dayEnd - cardDrag.duration));
    cardDrag.newStartMins = ns;
    cardDrag.newEndMins = ns + cardDrag.duration;
    const day = getDayFromClientX(e.clientX);
    if (day) cardDrag.newDay = day;
  } else if (cardDrag.mode === 'resize-bottom') {
    let ne = Math.round(curRaw / TIME_STEP) * TIME_STEP;
    ne = Math.max(cardDrag.origStartMins + TIME_STEP, Math.min(ne, dayEnd));
    cardDrag.newStartMins = cardDrag.origStartMins;
    cardDrag.newEndMins = ne;
  } else { // resize-top
    let ns = Math.round(curRaw / TIME_STEP) * TIME_STEP;
    ns = Math.min(cardDrag.origEndMins - TIME_STEP, Math.max(ns, dayTop));
    cardDrag.newStartMins = ns;
    cardDrag.newEndMins = cardDrag.origEndMins;
  }
  updateCardDragVisual();
  e.preventDefault();
}

function updateCardDragVisual() {
  const cd = cardDrag;
  if (!cd || !cd.card) return;
  const durMins = cd.newEndMins - cd.newStartMins;
  const isShort = durMins <= 60;
  const gap = isShort ? 2 : 3;
  const topPx = (cd.newStartMins - viewStartMins) / 60 * ROW_H + gap;
  const heightPx = durMins / 60 * ROW_H - gap * 2;
  if (cd.mode === 'move') {
    const anchor = timetableEl.querySelector(`.grid-cell[data-day="${cd.newDay}"]`);
    if (anchor && cd.card.parentNode !== anchor) anchor.appendChild(cd.card);
    cd.card.style.left = '3px';
    cd.card.style.right = 'auto';
    cd.card.style.width = 'calc(100% - 6px)';
  }
  cd.card.style.top = `${topPx}px`;
  cd.card.style.height = `${Math.max(heightPx, 6)}px`;
  cd.card.classList.toggle('short', isShort);
}

function onCardDragEnd(e) {
  if (!cardDrag || e.pointerId !== cardDrag.pointerId) return;
  window.removeEventListener('pointermove', onCardDragMove);
  window.removeEventListener('pointerup', onCardDragEnd);
  window.removeEventListener('pointercancel', onCardDragEnd);
  cardDrag.card.releasePointerCapture?.(e.pointerId);
  document.body.classList.remove('dragging-card');
  const cd = cardDrag;
  cardDrag = null;
  cd.card.classList.remove('dragging');

  if (!cd.moved) {
    if (cd.mode === 'move') openDetail(cd.course.id, { anchorRect: cd.card.getBoundingClientRect() }); // press without drag = click
    return;
  }

  const currentSlots = Array.isArray(cd.course.slots) ? cd.course.slots : [];
  const targetSlot = currentSlots[cd.slotIndex]
    || currentSlots.find((slot) => (
      slot.day === cd.origDay
      && slot.start === minsToTimeStr(cd.origStartMins)
      && slot.end === minsToTimeStr(cd.origEndMins)
    ))
    || cd.slot;

  targetSlot.day = cd.newDay;
  targetSlot.start = minsToTimeStr(cd.newStartMins);
  targetSlot.end = minsToTimeStr(cd.newEndMins);
  if (!currentSlots.includes(targetSlot)) currentSlots.push(targetSlot);
  cd.course.slots = currentSlots;
  cd.course.slots = normalizeSlots(cd.course.slots);
  if (cd.course.slots[0]) {
    cd.course.day = cd.course.slots[0].day;
    cd.course.start = cd.course.slots[0].start;
    cd.course.end = cd.course.slots[0].end;
  }
  persistCurrentCourses();
  buildGrid();
  if (activeId === cd.course.id) {
    setDraftSlots(cd.course.slots, { livePreview: false });
  }
}

// ── Routine editor ──────────────────────────────────
function applyRoutinePayloadToCourse(target, payload) {
  if (!target || !payload) return;
  const slots = normalizeSlots(payload.slots);
  target.name = payload.name;
  target.prof = payload.prof;
  target.room = payload.room;
  target.credit = payload.credit;
  target.color = payload.color;
  target.slots = slots;
  if (slots[0]) {
    target.day = slots[0].day;
    target.start = slots[0].start;
    target.end = slots[0].end;
  } else {
    delete target.day;
    delete target.start;
    delete target.end;
  }
}

function cancelRoutineLivePreviewFrame() {
  if (!livePreviewRaf) return;
  cancelAnimationFrame(livePreviewRaf);
  livePreviewRaf = 0;
}

function clearRoutineEditState() {
  cancelRoutineLivePreviewFrame();
}

function hasRoutineEditorContent() {
  const textValues = [nameInput, profInput, roomInput]
    .map((input) => (input ? input.value.trim() : ''));
  const creditValue = creditInput ? creditInput.value.trim() : '';
  return textValues.some(Boolean) || Boolean(creditValue);
}

function clearRoutinePreview(options = {}) {
  const hadPreview = Boolean(routinePreviewCourse);
  routinePreviewCourse = null;
  if (hadPreview && options.rebuild) buildGrid();
}

function readRoutineEditorPreviewPayload() {
  const isEditing = activeId != null;
  const current = isEditing
    ? courses.find((course) => course.id === activeId)
    : routinePreviewCourse;
  const fallback = isEditing ? (current || {}) : {};
  const name = nameInput ? nameInput.value.trim() : '';
  const prof = profInput ? profInput.value.trim() : '';
  const room = roomInput ? roomInput.value.trim() : '';
  const creditRaw = creditInput ? parseInt(creditInput.value, 10) : NaN;
  const slots = combinedDraftSlots();
  if (!slots.length) return null;
  if (!isEditing && !hasRoutineEditorContent()) return null;

  return {
    name: name || fallback.name || 'Untitled Routine',
    prof,
    room,
    credit: Number.isFinite(creditRaw) ? Math.min(6, Math.max(1, creditRaw)) : (fallback.credit || 3),
    color: selectedColor || fallback.color || 'c-navy',
    slots,
  };
}

function promoteDraftPreviewToRoutine(payload) {
  if (!payload || activeId != null) return null;
  const target = { id: nextId++ };
  applyRoutinePayloadToCourse(target, payload);
  courses.push(target);
  activeId = target.id;
  disarmRoutineDeleteShortcut();
  clearRoutinePreview();
  persistCurrentCourses();
  syncRoutineEditorMode();
  return target;
}

function applyRoutineLivePreview() {
  livePreviewRaf = 0;
  if (livePreviewSuspended) return;
  const payload = readRoutineEditorPreviewPayload();
  if (activeId != null) {
    const target = courses.find((course) => course.id === activeId);
    if (!target || !payload) return;
    applyRoutinePayloadToCourse(target, payload);
    persistCurrentCourses();
    buildGrid();
    return;
  }
  if (!payload) {
    clearRoutinePreview({ rebuild: true });
    return;
  }
  if (!promoteDraftPreviewToRoutine(payload)) return;
  buildGrid();
}

function requestRoutineLivePreview() {
  if (livePreviewSuspended) return;
  if (activeId == null && !draftSlots.length && !getPickerSlot()) {
    clearRoutinePreview({ rebuild: true });
    return;
  }
  if (livePreviewRaf) cancelAnimationFrame(livePreviewRaf);
  livePreviewRaf = requestAnimationFrame(applyRoutineLivePreview);
}

function syncRoutineEditorMode() {
  const editing = activeId != null;
  if (deleteRoutineBtn) deleteRoutineBtn.hidden = !editing;
  if (panelEl) panelEl.classList.toggle('is-editing', editing);
}

function clearRoutineFields() {
  clearRoutinePreview({ rebuild: true });
  if (nameInput) nameInput.value = '';
  if (profInput) profInput.value = '';
  if (roomInput) roomInput.value = '';
  if (creditInput) creditInput.value = '';
  clearSelectedDays();
  if (startInput) {
    startInput.value = '';
    syncCustomPicker(startInput);
  }
  if (endInput) {
    endInput.value = '';
    syncCustomPicker(endInput);
  }
  clearDraftSlots();
  setSlotEditorOpen(false);
}

function startNewRoutine(options = {}) {
  routineDeleteShortcutArmed = false;
  activeId = null;
  disarmRoutineDeleteShortcut();
  clearRoutineEditState();
  syncRoutineEditorMode();
  if (options.clear !== false) clearRoutineFields();
  openPanel({ focus: options.focus !== false });
}

function armRoutineDeleteShortcut() {
  routineDeleteShortcutArmed = true;
}

function disarmRoutineDeleteShortcut() {
  routineDeleteShortcutArmed = false;
}

function blurRoutineEditorFocus() {
  const active = document.activeElement;
  if (!active || active === document.body || active === document.documentElement) return;
  if (panelEl && panelEl.contains(active) && typeof active.blur === 'function') active.blur();
}

function loadRoutineIntoPanel(course, options = {}) {
  if (!course) return;
  cancelRoutineLivePreviewFrame();
  clearRoutinePreview({ rebuild: true });
  activeId = course.id;
  ensureCourseSlots(course);
  livePreviewSuspended = true;
  if (nameInput) nameInput.value = course.name || '';
  if (profInput) profInput.value = course.prof || '';
  if (roomInput) roomInput.value = course.room || '';
  if (creditInput) creditInput.value = course.credit || '';
  selectedColor = course.color || 'c-navy';
  setSwatchSelection(swatches, selectedColor);
  clearPickerInputs();
  setSlotEditorOpen(false);
  setDraftSlots(course.slots || [], { livePreview: false });
  livePreviewSuspended = false;
  syncRoutineEditorMode();
  armRoutineDeleteShortcut();
  openPanel({ focus: false, anchorRect: options.anchorRect });
  requestAnimationFrame(blurRoutineEditorFocus);
}

function openDetail(id, options = {}) {
  const c = courses.find(x => x.id === id);
  if (!c) return;
  loadRoutineIntoPanel(c, options);
}
function closeDetail() {
  const backdrop = document.getElementById('backdrop');
  if (backdrop) backdrop.classList.remove('open');
  activeId = null;
  disarmRoutineDeleteShortcut();
  clearRoutineEditState();
  syncRoutineEditorMode();
  closeAllCustomPickers();
}
function handleBdClick(e) {
  if (e.target === document.getElementById('backdrop')) closeDetail();
}
function deleteCourse() {
  if (activeId == null) return;
  cancelRoutineLivePreviewFrame();
  courses = courses.filter(c => c.id !== activeId);
  activeId = null;
  disarmRoutineDeleteShortcut();
  clearRoutineEditState();
  syncRoutineEditorMode();
  clearRoutineFields();
  persistCurrentCourses();
  buildGrid();
}

async function requestDeleteActiveRoutine() {
  const current = activeId != null ? courses.find((course) => course.id === activeId) : null;
  if (!current) return;
  const ok = await openConfirm({
    title: 'Delete Routine',
    message: `Delete "${current.name}"? This cannot be undone.`,
    okText: 'Delete',
    cancelText: 'Cancel',
  });
  if (!ok) return;
  deleteCourse();
}

function shouldIgnoreRoutineDeleteKey(target) {
  if (promptBackdrop && promptBackdrop.classList.contains('open')) return true;
  if (controlsPopover && !controlsPopover.hidden) return true;
  if (appearancePopover && !appearancePopover.hidden) return true;
  if (routineDeleteShortcutArmed) return false;
  if (!target || target === document.body || target === document.documentElement) return false;
  return Boolean(target.closest(
    'input, textarea, select, button, [contenteditable="true"], .custom-select, .custom-color-popover, .prompt-card, .fab-cluster',
  ));
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

// ── Color picker ─────────────────────────────────────
function pickColor(el) {
  selectedColor = el.dataset.color;
  setSwatchSelection(swatches, selectedColor);
  requestRoutineLivePreview();
}

function pickCustomColor(value) {
  const custom = makeCustomColorValue(value);
  if (!custom) return;
  selectedColor = custom;
  setCustomPickerFromHex(value);
  if (customColorSwatch) customColorSwatch.classList.add('selected');
  if (swatches) {
    swatches.querySelectorAll('.swatch[data-color]').forEach((swatch) => {
      swatch.classList.remove('selected');
    });
  }
  requestRoutineLivePreview();
}

function setCustomColorPopoverOpen(open) {
  if (!customColorPopover || !customColorSwatch) return;
  customColorPopover.hidden = !open;
  customColorSwatch.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) {
    setCustomPickerFromHex(getCustomColorHex(selectedColor) || getColorAccent(selectedColor));
    closeAllCustomPickers();
  }
}

function commitCustomPickerColor() {
  pickCustomColor(getCustomPickerHex());
}

function updateCustomColorFromFieldPoint(clientX, clientY) {
  if (!customColorField) return;
  const rect = customColorField.getBoundingClientRect();
  customPickerSat = clampUnit((clientX - rect.left) / rect.width);
  customPickerVal = clampUnit(1 - (clientY - rect.top) / rect.height);
  syncCustomPickerUi();
  commitCustomPickerColor();
}

function onCustomColorFieldMove(e) {
  if (customColorDragPointerId == null || e.pointerId !== customColorDragPointerId) return;
  updateCustomColorFromFieldPoint(e.clientX, e.clientY);
  e.preventDefault();
}

function endCustomColorFieldDrag(e) {
  if (customColorDragPointerId == null || e.pointerId !== customColorDragPointerId) return;
  window.removeEventListener('pointermove', onCustomColorFieldMove);
  window.removeEventListener('pointerup', endCustomColorFieldDrag);
  window.removeEventListener('pointercancel', endCustomColorFieldDrag);
  customColorField?.releasePointerCapture?.(e.pointerId);
  customColorDragPointerId = null;
}

function pickHeaderColor(el) {
  applyHeaderColor(el.dataset.color);
}

function pickDetailColor(el) {
  detailSelectedColor = el.dataset.color;
  setSwatchSelection(detailSwatches, detailSelectedColor);
  applyDetailAccent(detailSelectedColor);
}

// ── UI Events ────────────────────────────────────────
[nameInput, profInput, roomInput, creditInput].forEach((input) => {
  if (input) input.addEventListener('input', requestRoutineLivePreview);
});
[daySelect, startInput, endInput].forEach((input) => {
  if (input) input.addEventListener('change', handleSlotFieldChange);
});
if (customColorSwatch) {
  customColorSwatch.addEventListener('click', (e) => {
    e.stopPropagation();
    setCustomColorPopoverOpen(customColorPopover ? customColorPopover.hidden : true);
  });
}
if (customColorPopover) {
  customColorPopover.addEventListener('click', (e) => e.stopPropagation());
}
if (customColorField) {
  customColorField.addEventListener('pointerdown', (e) => {
    customColorDragPointerId = e.pointerId;
    customColorField.setPointerCapture?.(e.pointerId);
    updateCustomColorFromFieldPoint(e.clientX, e.clientY);
    window.addEventListener('pointermove', onCustomColorFieldMove);
    window.addEventListener('pointerup', endCustomColorFieldDrag);
    window.addEventListener('pointercancel', endCustomColorFieldDrag);
    e.preventDefault();
  });
  customColorField.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 0.1 : 0.02;
    if (e.key === 'ArrowLeft') customPickerSat = clampUnit(customPickerSat - step);
    else if (e.key === 'ArrowRight') customPickerSat = clampUnit(customPickerSat + step);
    else if (e.key === 'ArrowUp') customPickerVal = clampUnit(customPickerVal + step);
    else if (e.key === 'ArrowDown') customPickerVal = clampUnit(customPickerVal - step);
    else return;
    e.preventDefault();
    syncCustomPickerUi();
    commitCustomPickerColor();
  });
}
if (customHueSlider) {
  customHueSlider.addEventListener('input', () => {
    customPickerHue = parseInt(customHueSlider.value, 10) || 0;
    syncCustomPickerUi();
    commitCustomPickerColor();
  });
}
if (customHexInput) {
  customHexInput.addEventListener('input', () => {
    const hex = normalizeHexColor(customHexInput.value);
    if (!hex) return;
    pickCustomColor(hex);
  });
  customHexInput.addEventListener('blur', () => {
    customHexInput.value = getCustomPickerHex().toUpperCase();
  });
}
if (deleteRoutineBtn) {
  deleteRoutineBtn.addEventListener('click', requestDeleteActiveRoutine);
}

const detailSaveBtn = document.getElementById('d-save');
if (detailSaveBtn) detailSaveBtn.addEventListener('click', saveDetailCourse);

if (saveImageBtn) saveImageBtn.addEventListener('click', exportTimetableImage);
if (fabSave) fabSave.addEventListener('click', exportTimetableImage);
if (exportDataBtn) exportDataBtn.addEventListener('click', exportData);
if (importDataBtn) {
  importDataBtn.addEventListener('click', () => {
    if (importDataInput) importDataInput.click();
  });
}
if (importDataInput) {
  importDataInput.addEventListener('change', async () => {
    const file = importDataInput.files && importDataInput.files[0];
    importDataInput.value = '';
    await importDataFile(file);
  });
}

function closeCustomPickersWithin(container) {
  if (!container) return;
  customPickers.forEach((picker) => {
    if (picker.wrapper && container.contains(picker.wrapper)) picker.close();
  });
}

function setControlsOpen(open) {
  if (!controlsToggle || !controlsPopover) return;
  const wasOpen = !controlsPopover.hidden;
  if (open && appearancePopover && !appearancePopover.hidden) setAppearanceOpen(false);
  controlsPopover.hidden = !open;
  controlsToggle.classList.toggle('is-active', open);
  controlsToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (!open && wasOpen) closeCustomPickersWithin(controlsPopover);
}

function setAppearanceOpen(open) {
  if (!appearanceToggle || !appearancePopover) return;
  const wasOpen = !appearancePopover.hidden;
  if (open && controlsPopover && !controlsPopover.hidden) setControlsOpen(false);
  appearancePopover.hidden = !open;
  appearanceToggle.classList.toggle('is-active', open);
  appearanceToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (!open && wasOpen) closeCustomPickersWithin(appearancePopover);
}

if (controlsToggle) {
  controlsToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setControlsOpen(controlsPopover ? controlsPopover.hidden : false);
  });
}
if (appearanceToggle) {
  appearanceToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setAppearanceOpen(appearancePopover ? appearancePopover.hidden : false);
  });
}
[controlsPopover, appearancePopover].forEach((popover) => {
  if (!popover) return;
  popover.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});
document.addEventListener('click', (e) => {
  if (e.target.closest('.fab-duo')) return;
  if (customColorPopover && !customColorPopover.hidden) setCustomColorPopoverOpen(false);
  if (controlsPopover && !controlsPopover.hidden) setControlsOpen(false);
  if (appearancePopover && !appearancePopover.hidden) setAppearanceOpen(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (customColorPopover && !customColorPopover.hidden) setCustomColorPopoverOpen(false);
    if (controlsPopover && !controlsPopover.hidden) setControlsOpen(false);
    if (appearancePopover && !appearancePopover.hidden) setAppearanceOpen(false);
  }
});

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
      title: 'New Schedule',
      label: 'Schedule name',
      value: `New Schedule (${SEMESTER_LABELS[currentSemester] || currentSemester})`,
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
      title: 'Copy Schedule',
      label: 'Schedule name',
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
      title: 'Rename Schedule',
      label: 'Schedule name',
      value: current.name,
      okText: 'Rename',
      cancelText: 'Cancel',
      required: true,
    });
    if (name == null) return;
    renameTimetable(name.trim());
  });
}

if (deleteTableBtn) {
  deleteTableBtn.addEventListener('click', async () => {
    const current = getCurrentTable();
    if (!current) return;
    const ok = await openConfirm({
      title: 'Delete Schedule',
      message: `Delete "${current.name}"? This cannot be undone.`,
      okText: 'Delete',
      cancelText: 'Cancel',
    });
    if (!ok) return;
    deleteTimetable();
  });
}

// ── Resize timetable size ───────────────────────────
const MIN_TIMETABLE_W = 520;
const layoutEl = document.querySelector('.layout');
const timetableShell = document.getElementById('timetableShell');
const timetableWrap = document.getElementById('timetableWrap');
const timetableScale = document.getElementById('timetableScale');
const resizer = document.getElementById('resizer');
const panelEl = document.querySelector('.side-panel');
const panelClose = document.getElementById('panelClose');
const panelBackdrop = document.getElementById('panelBackdrop');
const fabAdd = document.getElementById('fabAdd');
const fabCluster = document.querySelector('.fab-cluster');
const mobileMq = window.matchMedia ? window.matchMedia('(max-width: 980px)') : null;
let isResizingWidth = false;
let mobileFitRafId = 0;

function isMobilePanelMode() {
  return Boolean(mobileMq && mobileMq.matches);
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart;
}

function getSlotClientRect(slot) {
  if (!slot || !timetableEl || !visibleDays.includes(slot.day)) return null;
  const tableRect = timetableEl.getBoundingClientRect();
  const firstLabel = timetableEl.querySelector('.time-label');
  if (!firstLabel) return null;
  const labelRect = firstLabel.getBoundingClientRect();
  const timeHeader = timetableEl.querySelector('.day-header');
  const timeW = timeHeader
    ? timeHeader.getBoundingClientRect().width
    : (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--time-w')) || 56);
  const dayIndex = visibleDays.indexOf(slot.day);
  const dayCount = visibleDays.length || 1;
  const colW = (tableRect.width - timeW) / dayCount;
  const start = Math.max(timeToMins(slot.start), viewStartMins);
  const end = Math.min(timeToMins(slot.end), viewEndMins);
  const top = labelRect.top + ((start - viewStartMins) / 60) * ROW_H;
  const bottom = labelRect.top + ((Math.max(end, start + TIME_STEP) - viewStartMins) / 60) * ROW_H;
  const left = tableRect.left + timeW + dayIndex * colW;
  const right = left + colW;
  return {
    left,
    right,
    top,
    bottom,
    width: colW,
    height: bottom - top,
  };
}

function positionPanelForDesktop(options = {}) {
  if (!panelEl || !layoutEl || isMobilePanelMode()) return;
  const layoutRect = layoutEl.getBoundingClientRect();
  const panelWidth = panelEl.getBoundingClientRect().width
    || parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--panel-w'))
    || 300;
  const gap = 12;
  const anchorRect = options.anchorRect || null;

  let left = layoutRect.width - panelWidth - gap;
  let top = gap;
  if (options.preservePosition) {
    const panelRect = panelEl.getBoundingClientRect();
    left = panelRect.left - layoutRect.left;
    top = panelRect.top - layoutRect.top;
  } else if (anchorRect) {
    const rightSide = anchorRect.right - layoutRect.left + gap;
    const leftSide = anchorRect.left - layoutRect.left - panelWidth - gap;
    left = rightSide + panelWidth <= layoutRect.width - gap ? rightSide : leftSide;
    top = anchorRect.top - layoutRect.top - 8;
  }

  left = clampNumber(left, gap, Math.max(gap, layoutRect.width - panelWidth - gap));

  const viewportBottom = window.visualViewport
    ? window.visualViewport.offsetTop + window.visualViewport.height
    : window.innerHeight;
  let bottomLimit = Math.min(layoutRect.bottom, viewportBottom) - layoutRect.top - gap;
  const fabRect = fabCluster && getComputedStyle(fabCluster).display !== 'none'
    ? fabCluster.getBoundingClientRect()
    : null;
  if (fabRect && fabRect.width > 0 && fabRect.height > 0) {
    const panelLeft = layoutRect.left + left;
    const panelRight = panelLeft + panelWidth;
    if (rangesOverlap(panelLeft, panelRight, fabRect.left - gap, fabRect.right + gap)) {
      bottomLimit = Math.min(bottomLimit, fabRect.top - layoutRect.top - gap);
    }
  }

  const panelMaxHeight = Math.max(1, bottomLimit - gap);
  const panelHeight = Math.min(panelEl.scrollHeight || 520, panelMaxHeight);
  top = clampNumber(top, gap, Math.max(gap, bottomLimit - panelHeight));
  panelEl.style.setProperty('--panel-left', `${left}px`);
  panelEl.style.setProperty('--panel-top', `${top}px`);
  panelEl.style.setProperty('--panel-max-h', `${panelMaxHeight}px`);
}

function refreshOpenPanelPosition() {
  if (!isPanelOpen() || isMobilePanelMode()) return;
  positionPanelForDesktop({ preservePosition: true });
}

function openPanel(options = {}) {
  if (!panelEl) return;
  positionPanelForDesktop(options);
  panelEl.classList.add('panel-open');
  if (isMobilePanelMode()) {
    if (panelBackdrop) panelBackdrop.classList.add('open');
    document.body.classList.add('panel-modal-open');
  } else {
    if (panelBackdrop) panelBackdrop.classList.remove('open');
    document.body.classList.remove('panel-modal-open');
  }
  if (options.focus !== false && nameInput) nameInput.focus();
}
function closePanel() {
  if (!panelEl) return;
  panelEl.classList.remove('panel-open');
  if (panelBackdrop) panelBackdrop.classList.remove('open');
  document.body.classList.remove('panel-modal-open');
}

function isPanelOpen() {
  return Boolean(panelEl && panelEl.classList.contains('panel-open'));
}

function flushRoutineLivePreview() {
  if (!livePreviewRaf) return;
  cancelAnimationFrame(livePreviewRaf);
  livePreviewRaf = 0;
  applyRoutineLivePreview();
}

function dismissRoutineEditor(options = {}) {
  flushRoutineLivePreview();
  activeId = null;
  disarmRoutineDeleteShortcut();
  livePreviewSuspended = true;
  clearRoutineEditState();
  if (options.clearFields !== false) clearRoutineFields();
  livePreviewSuspended = false;
  syncRoutineEditorMode();
  closeAllCustomPickers();
  closePanel();
}

function isEmptySpaceForPanelDismiss(target) {
  if (!target || !isPanelOpen()) return false;
  if (panelEl && panelEl.contains(target)) return false;
  if (target.closest(
    '.course-card, .fab-cluster, .fab-github, .controls-popover, .appearance-popover, .prompt-card, .detail-card',
  )) return false;
  return Boolean(target.closest(
    '.grid-cell, .time-label, .day-header, .timetable, .timetable-wrap, .timetable-shell, .layout',
  ) || target === document.body || target === document.documentElement);
}

function isRoutineEditorInteractionTarget(target) {
  if (!target || !panelEl || !panelEl.contains(target)) return false;
  return Boolean(target.closest(
    'input, textarea, select, button, .custom-select, .slot-item, .info-toggle, .swatch, .custom-color-popover',
  ));
}

document.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  if (routineDeleteShortcutArmed && isRoutineEditorInteractionTarget(e.target)) {
    disarmRoutineDeleteShortcut();
  }
  if (!isDraggingSlot && !cardDrag && isEmptySpaceForPanelDismiss(e.target)) {
    dismissRoutineEditor();
  }
}, true);

document.addEventListener('focusin', (e) => {
  if (routineDeleteShortcutArmed && isRoutineEditorInteractionTarget(e.target)) {
    disarmRoutineDeleteShortcut();
  }
});

if (fabAdd) fabAdd.addEventListener('click', () => startNewRoutine({ clear: true }));
if (panelClose) panelClose.addEventListener('click', () => dismissRoutineEditor());
if (panelBackdrop) panelBackdrop.addEventListener('click', () => dismissRoutineEditor());
syncRoutineEditorMode();

function resetMobileTimetableScale() {
  if (!timetableWrap || !timetableScale) return;
  timetableScale.classList.remove('is-scaled');
  timetableScale.style.removeProperty('--tt-scale');
  timetableWrap.style.height = '';
}

function scheduleFitTimetableForMobile() {
  if (mobileFitRafId) cancelAnimationFrame(mobileFitRafId);
  mobileFitRafId = requestAnimationFrame(() => {
    mobileFitRafId = 0;
    fitTimetableForMobile();
  });
}

function fitTimetableForMobile() {
  if (!timetableEl || !timetableWrap || !timetableScale) return;
  if (!mobileMq || !mobileMq.matches) {
    resetMobileTimetableScale();
    return;
  }

  const EDGE_SAFE_PX = 2;
  const wrapStyle = getComputedStyle(timetableWrap);
  const padLeft = parseFloat(wrapStyle.paddingLeft) || 0;
  const padRight = parseFloat(wrapStyle.paddingRight) || 0;
  const padTop = parseFloat(wrapStyle.paddingTop) || 0;
  const padBottom = parseFloat(wrapStyle.paddingBottom) || 0;
  const innerWidth = timetableWrap.clientWidth - padLeft - padRight;
  const safeInnerWidth = Math.max(0, innerWidth - EDGE_SAFE_PX);
  const tableStyle = getComputedStyle(timetableEl);
  const borderX = (parseFloat(tableStyle.borderLeftWidth) || 0) + (parseFloat(tableStyle.borderRightWidth) || 0);
  const borderY = (parseFloat(tableStyle.borderTopWidth) || 0) + (parseFloat(tableStyle.borderBottomWidth) || 0);
  const baseWidth = timetableEl.scrollWidth + borderX;
  const baseHeight = timetableEl.scrollHeight + borderY;
  if (!(safeInnerWidth > 0 && baseWidth > 0 && baseHeight > 0)) return;

  const scale = Math.min(1, safeInnerWidth / baseWidth);
  const currentScale = parseFloat(timetableScale.style.getPropertyValue('--tt-scale')) || 1;
  if (!timetableScale.classList.contains('is-scaled') || Math.abs(currentScale - scale) > 0.0005) {
    timetableScale.style.setProperty('--tt-scale', String(scale));
    timetableScale.classList.add('is-scaled');
  }

  const targetHeight = Math.ceil(baseHeight * scale + padTop + padBottom);
  const currentHeight = parseFloat(timetableWrap.style.height) || 0;
  if (Math.abs(currentHeight - targetHeight) > 0.5) {
    timetableWrap.style.height = `${targetHeight}px`;
  }
}

function clampTimetableWidth(width) {
  if (!layoutEl || !timetableShell || !resizer) return;
  const layoutRect = layoutEl.getBoundingClientRect();
  const resizerRect = resizer.getBoundingClientRect();
  const maxWidth = Math.max(0, layoutRect.width - resizerRect.width);
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
  resetMobileTimetableScale();
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
  refreshOpenPanelPosition();
  scheduleFitTimetableForMobile();
});

if (mobileMq) {
  const handleMobileMq = () => {
    if (mobileMq.matches) {
      closePanel();
      resetTimetableSizing();
    } else {
      closePanel();
      resetMobileTimetableScale();
    }
    scheduleFitTimetableForMobile();
  };
  handleMobileMq();
  mobileMq.addEventListener('change', handleMobileMq);
}

const timetableFitObserver = typeof ResizeObserver === 'undefined'
  ? null
  : new ResizeObserver(() => {
      scheduleFitTimetableForMobile();
    });
if (timetableFitObserver && timetableWrap) timetableFitObserver.observe(timetableWrap);
if (timetableFitObserver && timetableEl) timetableFitObserver.observe(timetableEl);
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    refreshOpenPanelPosition();
    scheduleFitTimetableForMobile();
  });
}

function initApp() {
  currentUserId = LOCAL_USER;
  migrateLegacyData();
  ensureUserData(currentUserId);
  loadViewSettings();
  populateSemesterSelect();
  loadCurrentTimetable();
}

// ── Keyboard ─────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (customColorPopover && !customColorPopover.hidden) setCustomColorPopoverOpen(false);
    closeDetail();
    closeAllCustomPickers();
    closePrompt(null);
    return;
  }
  if ((e.key === 'Delete' || e.key === 'Backspace') && activeId != null && !shouldIgnoreRoutineDeleteKey(e.target)) {
    e.preventDefault();
    requestDeleteActiveRoutine();
  }
}, true);

// ── Init ─────────────────────────────────────────────
loadTheme();
loadHeaderColor();
initApp();
scheduleFitTimetableForMobile();
requestAnimationFrame(() => scheduleFitTimetableForMobile());
