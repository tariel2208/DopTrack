'use strict';
const addHabitBtn    = document.getElementById('addHabitBtn');
const addHabitForm   = document.getElementById('addHabitForm');
const cancelHabitBtn = document.getElementById('cancelHabitBtn');
const saveHabitBtn   = document.getElementById('saveHabitBtn');
const newHabitInput  = document.getElementById('newHabitInput');
const habitList      = document.getElementById('habitList');

const logActivityBtn  = document.getElementById('logActivityBtn');
const logActivityForm = document.getElementById('logActivityForm');
const cancelLogBtn    = document.getElementById('cancelLogBtn');
const saveLogBtn      = document.getElementById('saveLogBtn');
const activityInput   = document.getElementById('activityInput');
const ptsInput        = document.getElementById('ptsInput');
const logList         = document.getElementById('logList');


addHabitBtn.addEventListener('click',function(){
    addHabitForm.classList.remove('hidden');
    newHabitInput.focus();
});

cancelHabitBtn.addEventListener('click',function(){
    addHabitForm.classList.add('hidden');
    newHabitInput.value = '';
});


saveHabitBtn.addEventListener('click',function(){
    let name = newHabitInput.value.trim();
    if(!name){
        return;
    }
    let li = document.createElement('li');
    li.className = 'habit-item';
    li.innerHTML =  `
        <label class="habit-check">
            <input type="checkbox">
            <span class="checkmark"></span>
        </label>
        <span class="habit-name">${name}</span>
        <span class="badge badge-pending">pending</span>
    `;

    habitList.append(li);//////


    wireCheckbox(li);

    newHabitInput.value = '';
    addHabitForm.classList.add('hidden');


});

let wireCheckbox = function(item){
    let checkbox = item.querySelector('input[type="checkbox"]');
    let badge = item.querySelector('.badge');

    checkbox.addEventListener('change',function(){
        if(checkbox.checked){
            item.classList.add('done');
            badge.textContent = 'done';
            badge.className = 'badge badge-done';
        }else{
            item.classList.remove('done');
            badge.textContent = 'pending';
            badge.className   = 'badge badge-pending';

        }
    });
}


document.querySelectorAll('.habit-item').forEach(wireCheckbox);


logActivityBtn.addEventListener('click', () => {
    logActivityForm.classList.remove('hidden');
    activityInput.focus();
});
 
cancelLogBtn.addEventListener('click', () => {
    logActivityForm.classList.add('hidden');
    activityInput.value = '';
    ptsInput.value = '';
});
 
saveLogBtn.addEventListener('click', () => {
    const name = activityInput.value.trim();
    const pts  = parseInt(ptsInput.value, 10);
    if (!name || isNaN(pts)) return;
 
    const isGood   = pts > 0;
    const dotClass = isGood ? 'dot-good' : 'dot-bad';
    const ptsClass = isGood ? 'positive' : 'negative';
    const ptsLabel = isGood ? `+${pts}` : `${pts}`;
 
    const now  = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
 
    const li = document.createElement('li');
    li.className = 'log-item';
    li.innerHTML = `
        <span class="log-dot ${dotClass}"></span>
        <div class="log-info">
            <span class="log-name">${name}</span>
            <span class="log-time">${time}</span>
        </div>
        <span class="log-pts ${ptsClass}">${ptsLabel}</span>
    `;
    logList.prepend(li);
 
    activityInput.value = '';
    ptsInput.value = '';
    logActivityForm.classList.add('hidden');
});
 
 
// ── Period buttons ────────────────────────────────────────
 
document.querySelectorAll('.period-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});
 
 
// ── Mood ─────────────────────────────────────────────────
 
const moodLabels = {
    awful: 'Çətin gün — özünə qarşı səbrli ol.',
    meh:   'Normal — davam et.',
    okay:  'Pis deyil! Kiçik addımlar sayılır.',
    good:  'Əla enerji! İstifadə et.',
    great: 'Tam formdasın 🔥'
};
 
document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('moodStatus').textContent = moodLabels[btn.dataset.mood];
    });
});
 
 
// ── Daily Tips ────────────────────────────────────────────
 
const tips = [
    'Səhər ilk 30 dəqiqə telefona baxma — dopamin bazanı qoru.',
    'Soyuq duş — 30 saniyə belə olsa — dopamini saatlarla artırır.',
    'Hər dəfə ləzzəti gecikdirəndə prefrontal korteksin güclənir.',
    'İdman uzunmüddətli dopamin artırmağın ən etibarlı yoludur.',
    'Çox erkən çox qəhvə içmək səhər kortizol və dopamin zirvəni azaldır.',
    'Dərin iş sığ stimullardan dopamin detoxudur — fokus bloklarını qoru.',
    'Kiçik qələbələri qeyd et. Dopamin mükafatda deyil, gözləntidə ayrılır.',
];
 
let tipIndex = 0;
const tipText    = document.getElementById('tipText');
const nextTipBtn = document.getElementById('nextTipBtn');  // no space — fixed
 
nextTipBtn.addEventListener('click', () => {
    tipIndex = (tipIndex + 1) % tips.length;
    tipText.textContent = tips[tipIndex];
});











