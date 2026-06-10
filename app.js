// ─── STATE ────────────────────────────────────────────────────────────
let currentPage = 'today';
let today = new Date();
let viewMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let selectedWeekDay = null; // for week page detail

const DAY_NAMES = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
const DAY_NAMES_FULL = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const MONTH_NAMES = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

// ─── STORAGE ──────────────────────────────────────────────────────────
function sGet(key) { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; } }
function sSet(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

// habits done per day : key = "done_YYYY-MM-DD" → { [habitId]: true }
function getDayDone(dateKey) { return sGet('done_' + dateKey) || {}; }
function setDayDone(dateKey, obj) { sSet('done_' + dateKey, obj); }

// weekly schedule: key = "wsched_YYYY-WW" → { [habitId]: [0,1,2,...] dayOfWeek array }
// Per habit: which day of week it's assigned
function getWeekSched() { return sGet('wsched') || {}; }
function setWeekSched(s) { sSet('wsched', s); }

// oneshot done: key = "oneshot" → { [id]: true }
function getOneShotDone() { return sGet('oneshot_done') || {}; }
function setOneShotDone(o) { sSet('oneshot_done', o); }

// ─── COMPUTED ─────────────────────────────────────────────────────────
function getTodayKey() { return toKey(today); }
function getTodayMonth() { return toMonthKey(today); }

function getWeeklyHabitsForDay(date) {
  const dow = date.getDay(); // 0=Sun
  const sched = getWeekSched();
  const mk = toMonthKey(date);
  const habits = getActiveHabits(mk);
  return habits.weekly.filter(h => {
    const days = sched[h.id];
    if (!days) return false;
    return days.includes(dow);
  });
}

// All habits that should appear today (daily + weekly if scheduled + monthly if first week)
function getTodayHabits() {
  const mk = getTodayMonth();
  const habits = getActiveHabits(mk);
  const weeklyToday = getWeeklyHabitsForDay(today);
  // Monthly: show on first occurrence of the month (day 1-7)
  const monthlyToday = today.getDate() <= 7 ? habits.monthly : [];
  return {
    daily: habits.daily,
    weekly: weeklyToday,
    monthly: monthlyToday,
    oneshot: habits.oneshot
  };
}

function countDoneToday() {
  const dk = getTodayKey();
  const done = getDayDone(dk);
  const h = getTodayHabits();
  const total = h.daily.length + h.weekly.length + h.monthly.length;
  const doneCount = [...h.daily, ...h.weekly, ...h.monthly].filter(x => done[x.id]).length;
  return { done: doneCount, total };
}

// ─── NAVIGATION ───────────────────────────────────────────────────────
function switchPage(page) {
  currentPage = page;
  document.querySelectorAll('.nav-tab').forEach((t,i) => {
    const pages = ['today','week','month'];
    t.classList.toggle('active', pages[i] === page);
  });
  document.querySelectorAll('.bnav-btn').forEach((t,i) => {
    const pages = ['today','week','month'];
    t.classList.toggle('active', pages[i] === page);
  });
  render();
}

// ─── RENDER DISPATCHER ────────────────────────────────────────────────
function render() {
  // Update nav date
  document.getElementById('nav-date-display').textContent =
    today.toLocaleDateString('fr-FR', { weekday:'short', day:'numeric', month:'short' });

  const main = document.getElementById('main-content');
  if (currentPage === 'today') main.innerHTML = renderToday();
  else if (currentPage === 'week') main.innerHTML = renderWeek();
  else if (currentPage === 'month') main.innerHTML = renderMonth();
}

// ─── PAGE : TODAY ─────────────────────────────────────────────────────
function renderToday() {
  const dk = getTodayKey();
  const done = getDayDone(dk);
  const h = getTodayHabits();
  const mk = getTodayMonth();
  const allHabits = getActiveHabits(mk);
  const { done: doneCount, total } = countDoneToday();
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const R = 36, circ = 2 * Math.PI * R;
  const offset = circ - (pct / 100) * circ;

  const dayName = DAY_NAMES_FULL[today.getDay()];
  const dayNum = today.getDate();
  const monthName = MONTH_NAMES[today.getMonth()];

  let html = `
  <div class="today-header">
    <h1>${dayName} <em>${dayNum}</em> ${monthName}</h1>
    <div class="today-subhead">${allHabits.daily.length} habitudes actives ce mois · ${doneCount}/${total} aujourd'hui</div>
  </div>

  <div class="progress-ring-wrap">
    <svg class="progress-ring-svg" width="88" height="88" viewBox="0 0 88 88">
      <circle class="ring-track" cx="44" cy="44" r="${R}"/>
      <circle class="ring-fill" cx="44" cy="44" r="${R}"
        stroke-dasharray="${circ}" stroke-dashoffset="${offset}"/>
      <text class="ring-text-main" x="44" y="41">${pct}%</text>
      <text class="ring-text-sub" x="44" y="55">${doneCount}/${total}</text>
    </svg>
    <div class="ring-info">
      <h3>${pct === 100 ? '✦ Journée parfaite !' : pct >= 50 ? 'Belle progression' : 'C\'est parti !'}</h3>
      <p>${pct === 100 ? 'Toutes tes habitudes cochées aujourd\'hui.' : `Plus que ${total - doneCount} habitude${total - doneCount > 1 ? 's' : ''} à faire.`}</p>
      <div class="ring-streak">🔥 ${getStreak()} jour${getStreak() > 1 ? 's' : ''} de suite</div>
    </div>
  </div>`;

  // Daily
  if (h.daily.length > 0) {
    html += `<div class="section-label">Quotidien</div><div class="habits-grid">`;
    for (const hab of h.daily) {
      const isDone = !!done[hab.id];
      html += `
      <div class="habit-card ${isDone ? 'done' : ''}" onclick="toggleHabit('${dk}','${hab.id}')">
        <span class="habit-icon">${hab.icon || '•'}</span>
        <span class="habit-label">${hab.label}</span>
        <span class="habit-check">${isDone ? '✓' : ''}</span>
      </div>`;
    }
    html += `</div>`;
  }

  // Weekly (scheduled today)
  if (h.weekly.length > 0) {
    html += `<div class="section-label">Hebdomadaire — planifié aujourd'hui</div><div class="habits-grid">`;
    for (const hab of h.weekly) {
      const isDone = !!done[hab.id];
      html += `
      <div class="habit-card ${isDone ? 'done' : ''}" onclick="toggleHabit('${dk}','${hab.id}')">
        <span class="habit-icon">${hab.icon || '🗓'}</span>
        <span class="habit-label">${hab.label}</span>
        <span class="habit-check">${isDone ? '✓' : ''}</span>
      </div>`;
    }
    html += `</div>`;
  }

  // Monthly (first week reminder)
  if (h.monthly.length > 0) {
    html += `<div class="section-label">Mensuel — rappel du mois</div><div class="habits-grid">`;
    for (const hab of h.monthly) {
      const isDone = !!done[hab.id];
      html += `
      <div class="habit-card ${isDone ? 'done' : ''}" onclick="toggleHabit('${dk}','${hab.id}')">
        <span class="habit-icon">${hab.icon || '📅'}</span>
        <span class="habit-label">${hab.label}</span>
        <span class="habit-check">${isDone ? '✓' : ''}</span>
      </div>`;
    }
    html += `</div>`;
  }

  // Missions ponctuelles
  const osDone = getOneShotDone();
  const pendingOS = allHabits.oneshot.filter(h => !osDone[h.id]);
  if (pendingOS.length > 0) {
    html += `<div class="section-label">Missions à accomplir ce mois</div><div class="oneshot-list">`;
    for (const os of pendingOS) {
      html += `
      <div class="oneshot-item" onclick="toggleOneshot('${os.id}')">
        <span class="oneshot-icon">${os.icon || '🎯'}</span>
        <span class="oneshot-label">${os.label}</span>
        ${os.date ? `<span class="oneshot-date">${formatDate(os.date)}</span>` : ''}
        <span class="oneshot-check"></span>
      </div>`;
    }
    html += `</div>`;
  }

  if (h.daily.length === 0 && h.weekly.length === 0 && h.monthly.length === 0) {
    html += `<div class="empty-state">Aucune habitude active — profite ! 🌟</div>`;
  }

  return html;
}

// ─── PAGE : WEEK ──────────────────────────────────────────────────────
function renderWeek() {
  const mk = toMonthKey(today);
  const habits = getActiveHabits(mk);
  const sched = getWeekSched();

  // Get current week dates (Mon–Sun)
  const weekDates = getWeekDates(today);

  let html = `<h2 style="font-family:var(--font-display);font-size:1.4rem;font-weight:400;margin-bottom:16px;">
    Semaine ${getWeekNumber(today)}</h2>`;

  // Week overview grid
  html += `<div class="week-days-row">`;
  for (const d of weekDates) {
    const dk = toKey(d);
    const done = getDayDone(dk);
    const isToday = dk === toKey(today);
    const dow = d.getDay();

    // Habits for this day
    const dayHabits = habits.daily;
    const weekHabsForDay = habits.weekly.filter(h => {
      const days = sched[h.id];
      return days && days.includes(dow);
    });
    const totalHere = dayHabits.length + weekHabsForDay.length;
    const doneHere = [...dayHabits, ...weekHabsForDay].filter(h => done[h.id]).length;
    const pct = totalHere > 0 ? Math.round((doneHere / totalHere) * 100) : 0;
    const barColor = pct === 100 ? '#7EC8A4' : pct >= 50 ? '#C9A84C' : '#8B7CC8';

    html += `
    <div class="wday-col ${isToday ? 'today-col' : ''}" onclick="switchPage('today')">
      <div class="wday-name">${DAY_NAMES[d.getDay()]}</div>
      <div class="wday-num">${d.getDate()}</div>
      ${weekHabsForDay.slice(0,2).map(h => `<div class="wday-dot"></div>`).join('')}
      ${weekHabsForDay.slice(0,1).map(h => `<div class="wday-mini-habit">${h.icon} ${h.label}</div>`).join('')}
      <div class="wday-done-count">${doneHere}/${totalHere}</div>
      <div class="wday-progress"><div class="wday-progress-fill" style="width:${pct}%;background:${barColor}"></div></div>
    </div>`;
  }
  html += `</div>`;

  // Weekly habits planning
  if (habits.weekly.length > 0) {
    html += `
    <div class="section-label">Organiser mes habitudes hebdomadaires</div>
    <p style="font-size:.78rem;color:var(--ivory-muted);margin-bottom:12px;">Choisis quels jours tu veux faire chaque habitude cette semaine.</p>`;

    for (const hab of habits.weekly) {
      const days = sched[hab.id] || [];
      html += `
      <div class="weekly-habit-assign">
        <span style="font-size:1rem">${hab.icon}</span>
        <span class="weekly-habit-name">${hab.label}</span>
        <div class="day-pills">`;
      for (let i = 1; i <= 7; i++) {
        const dow = i % 7; // 1=Mon→dow1, ..., 7=Sun→dow0
        const selected = days.includes(dow);
        html += `<button class="day-pill ${selected ? 'selected' : ''}"
          onclick="toggleWeekDay('${hab.id}',${dow},this)">${DAY_NAMES[dow]}</button>`;
      }
      html += `</div></div>`;
    }
  }

  // Monthly habits planning
  if (habits.monthly.length > 0) {
    html += `<div class="section-label" style="margin-top:24px">Habitudes mensuelles</div>
    <p style="font-size:.78rem;color:var(--ivory-muted);margin-bottom:12px;">À faire une fois ce mois — coche quand c'est fait.</p>`;
    const dk = toKey(today);
    const done = getDayDone(dk);
    for (const hab of habits.monthly) {
      const isDone = !!done[hab.id];
      html += `
      <div class="habit-card ${isDone ? 'done' : ''}" style="margin-bottom:6px" onclick="toggleHabit('${dk}','${hab.id}')">
        <span class="habit-icon">${hab.icon}</span>
        <span class="habit-label">${hab.label}</span>
        <span class="habit-check">${isDone ? '✓' : ''}</span>
      </div>`;
    }
  }

  return html;
}

// ─── PAGE : MONTH ─────────────────────────────────────────────────────
function renderMonth() {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const mk = toMonthKey(viewMonth);
  const habits = getActiveHabits(mk);

  const totalActive = habits.daily.length;

  // Stat cards
  let totalDays = daysInMonth(year, month);
  let perfDays = 0, sumPct = 0;
  for (let d = 1; d <= totalDays; d++) {
    const dt = new Date(year, month, d);
    const dk = toKey(dt);
    const done = getDayDone(dk);
    const total = habits.daily.length;
    if (total === 0) continue;
    const cnt = habits.daily.filter(h => done[h.id]).length;
    const pct = cnt / total;
    sumPct += pct;
    if (pct === 1) perfDays++;
  }
  const avgPct = totalDays > 0 ? Math.round((sumPct / totalDays) * 100) : 0;

  let html = `
  <div class="month-header">
    <button class="month-nav-btn" onclick="changeMonth(-1)">← Préc.</button>
    <h2>${MONTH_NAMES[month]} ${year}</h2>
    <button class="month-nav-btn" onclick="changeMonth(1)">Suiv. →</button>
  </div>`;

  // Calendar
  html += `<div class="calendar-grid">`;
  for (const dn of ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']) {
    html += `<div class="cal-header">${dn}</div>`;
  }

  // Padding for first day
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const offset = firstDow === 0 ? 6 : firstDow - 1; // Mon=0
  for (let i = 0; i < offset; i++) html += `<div class="cal-day empty"></div>`;

  for (let d = 1; d <= totalDays; d++) {
    const dt = new Date(year, month, d);
    const dk = toKey(dt);
    const done = getDayDone(dk);
    const total = habits.daily.length;
    const cnt = total > 0 ? habits.daily.filter(h => done[h.id]).length : 0;
    const pct = total > 0 ? Math.round((cnt / total) * 100) : 0;
    const isToday = dk === toKey(today);
    const barColor = pct === 100 ? '#7EC8A4' : pct >= 50 ? '#C9A84C' : '#8B7CC8';

    html += `
    <div class="cal-day ${isToday ? 'today' : ''}">
      <span class="cal-day-num">${d}</span>
      <div class="cal-day-bar"><div class="cal-day-bar-fill" style="width:${pct}%;background:${barColor}"></div></div>
      ${cnt > 0 ? `<div class="cal-day-perc">${pct}%</div>` : ''}
    </div>`;
  }
  html += `</div>`;

  // Stats
  html += `
  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-val">${totalActive}</div>
      <div class="stat-label">habitudes actives</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${perfDays}</div>
      <div class="stat-label">jours parfaits ✓</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${avgPct}%</div>
      <div class="stat-label">taux de complétion moyen</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${getStreak()}</div>
      <div class="stat-label">jours de streak 🔥</div>
    </div>
  </div>`;

  // New habits this month
  const newThisMonth = HABITS_DATA[mk];
  if (newThisMonth) {
    const newDaily = newThisMonth.daily || [];
    const newWeekly = newThisMonth.weekly || [];
    if (newDaily.length + newWeekly.length > 0) {
      html += `<div class="section-label" style="margin-top:28px">✨ Nouvelles habitudes introduites en ${MONTH_NAMES[month]}</div>
      <div class="habits-grid">`;
      for (const h of [...newDaily, ...newWeekly]) {
        html += `<div class="habit-card">
          <span class="habit-icon">${h.icon}</span>
          <span class="habit-label">${h.label}</span>
          ${h.category ? `<span class="tag tag-${h.category}" style="margin-left:auto">${h.category}</span>` : ''}
        </div>`;
      }
      html += `</div>`;
    }
  }

  // Missions ponctuelles du mois
  const osDone = getOneShotDone();
  const monthOneshot = (HABITS_DATA[mk] || {}).oneshot || [];
  if (monthOneshot.length > 0) {
    html += `<div class="section-label" style="margin-top:20px">Missions ponctuelles</div><div class="oneshot-list">`;
    for (const os of monthOneshot) {
      const isDone = !!osDone[os.id];
      html += `
      <div class="oneshot-item ${isDone ? 'done' : ''}" onclick="toggleOneshot('${os.id}')">
        <span class="oneshot-icon">${os.icon || '🎯'}</span>
        <span class="oneshot-label">${os.label}</span>
        ${os.date ? `<span class="oneshot-date">${formatDate(os.date)}</span>` : ''}
        <span class="oneshot-check">${isDone ? '✓' : ''}</span>
      </div>`;
    }
    html += `</div>`;
  }

  return html;
}

// ─── ACTIONS ──────────────────────────────────────────────────────────
function toggleHabit(dk, habitId) {
  const done = getDayDone(dk);
  const wasDone = !!done[habitId];
  done[habitId] = !wasDone;
  setDayDone(dk, done);

  if (!wasDone) {
    // Check if all done → celebrate
    const { done: d, total: t } = countDoneToday();
    if (d === t && t > 0) celebrate('🌟');
    else celebrate('✓');
  }
  render();
}

function toggleOneshot(id) {
  const done = getOneShotDone();
  done[id] = !done[id];
  setOneShotDone(done);
  if (done[id]) celebrate('🎉');
  render();
}

function toggleWeekDay(habitId, dow, btn) {
  const sched = getWeekSched();
  if (!sched[habitId]) sched[habitId] = [];
  const idx = sched[habitId].indexOf(dow);
  if (idx >= 0) sched[habitId].splice(idx, 1);
  else sched[habitId].push(dow);
  setWeekSched(sched);
  btn.classList.toggle('selected', sched[habitId].includes(dow));
  render();
}

function changeMonth(delta) {
  viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + delta, 1);
  render();
}

// ─── HELPERS ──────────────────────────────────────────────────────────
function celebrate(emoji) {
  const el = document.createElement('div');
  el.className = 'confetti-flash';
  el.innerHTML = `<span>${emoji}</span>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 700);
}

function getStreak() {
  let streak = 0;
  const d = new Date(today);
  const mk = toMonthKey(d);
  const habits = getActiveHabits(mk);
  if (habits.daily.length === 0) return 0;

  while (true) {
    const dk = toKey(d);
    const done = getDayDone(dk);
    const cnt = habits.daily.filter(h => done[h.id]).length;
    if (cnt < habits.daily.length) break;
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function getWeekDates(date) {
  const d = new Date(date);
  const dow = d.getDay(); // 0=Sun
  const diff = dow === 0 ? -6 : 1 - dow; // shift to Monday
  d.setDate(d.getDate() + diff);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y,m,d] = dateStr.split('-');
  return `${d}/${m}`;
}

// ─── INIT ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  render();
});
</script>
