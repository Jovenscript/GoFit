const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function triggerFeedback(type = 'click') {
    if (navigator.vibrate) {
        if (type === 'success') navigator.vibrate([100, 50, 100]); 
        else navigator.vibrate(40); 
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    if (type === 'click') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        osc.start(); osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'success') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
        osc.start(); osc.stop(audioCtx.currentTime + 0.2);
    }
}

function fireConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];
    for (let i = 0; i < 60; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti-piece';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.animationDuration = (Math.random() * 2 + 2) + 's';
        conf.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(conf);
        setTimeout(() => conf.remove(), 4000);
    }
}

// --- BANCO DE DADOS RELACIONAL (NOVO) ---
const foodDB = {
    bases: [
        { id: 'pao_frances', name: "Pão Francês", measure: "unidade (50g)", defaultAmount: 1, kcal: 150, p: 4.5, c: 29, f: 1.5, allowPrep: false, tier: 'yellow' },
        { id: 'ovo', name: "Ovo", measure: "unidade (50g)", defaultAmount: 1, kcal: 70, p: 6, c: 0.5, f: 5, allowPrep: true, tier: 'green' },
        { id: 'frango', name: "Peito de Frango", measure: "porção (100g)", defaultAmount: 1, kcal: 110, p: 23, c: 0, f: 1.2, allowPrep: true, tier: 'green' },
        { id: 'arroz_branco', name: "Arroz Branco", measure: "escumadeira (50g)", defaultAmount: 2, kcal: 65, p: 1.2, c: 14, f: 0.1, allowPrep: true, tier: 'green' },
        { id: 'macarrao', name: "Macarrão", measure: "escumadeira (50g)", defaultAmount: 2, kcal: 80, p: 2.8, c: 16, f: 0.5, allowPrep: true, tier: 'yellow' },
        { id: 'tapioca', name: "Goma de Tapioca", measure: "colher sopa (20g)", defaultAmount: 3, kcal: 48, p: 0, c: 12, f: 0, allowPrep: false, tier: 'yellow' }
    ],
    preps: [
        { id: 'cozido', name: "Cozido/Simples", kcal: 0, p: 0, c: 0, f: 0 },
        { id: 'grelhado', name: "Grelhado (fio de azeite)", kcal: 20, p: 0, c: 0, f: 2.2 },
        { id: 'frito_oleo', name: "Frito (Óleo)", kcal: 45, p: 0, c: 0, f: 5 },
        { id: 'mexido_manteiga', name: "Mexido (Manteiga)", kcal: 35, p: 0, c: 0, f: 4 },
        { id: 'alho_oleo', name: "Alho e Óleo", kcal: 60, p: 0, c: 1, f: 6.5 }
    ],
    addons: [
        { id: 'manteiga', name: "Manteiga", measure: "pontinha de faca (5g)", kcal: 36, p: 0, c: 0, f: 4, tier: 'yellow' },
        { id: 'requeijao', name: "Requeijão Light", measure: "colher sopa (30g)", kcal: 54, p: 3, c: 1, f: 4.2, tier: 'yellow' },
        { id: 'maionese', name: "Maionese", measure: "colher sopa (12g)", kcal: 40, p: 0, c: 1, f: 4, tier: 'red' },
        { id: 'queijo_mussarela', name: "Queijo Mussarela", measure: "fatia (30g)", kcal: 96, p: 6.8, c: 0.9, f: 7.2, tier: 'yellow' },
        { id: 'presunto', name: "Presunto Magro", measure: "fatia (15g)", kcal: 15, p: 2.5, c: 0.5, f: 0.5, tier: 'yellow' },
        { id: 'mel', name: "Mel", measure: "colher chá (10g)", kcal: 30, p: 0, c: 8, f: 0, tier: 'yellow' },
        { id: 'pate_frango', name: "Patê de Frango Caseiro", measure: "colher sopa (30g)", kcal: 45, p: 4, c: 1, f: 2.5, tier: 'green' }
    ]
};

const mealNames = [
    { id: "cafe", name: "Café da Manhã", icon: "☕", time: "07:00" },
    { id: "lanche_manha", name: "Lanche da Manhã", icon: "🍎", time: "10:00" },
    { id: "almoco", name: "Almoço", icon: "🍲", time: "12:30" },
    { id: "lanche", name: "Lanche da Tarde", icon: "🥪", time: "16:00" },
    { id: "jantar", name: "Jantar", icon: "🥗", time: "20:00" },
    { id: "ceia", name: "Ceia", icon: "🌛", time: "22:00" }
];

const workoutsDB = {
    A: { title: "Treino A - Peito e Tríceps", exercises: [{ name: "Supino Reto", sets: "4", reps: "8-12" }, { name: "Crucifixo Máquina", sets: "3", reps: "12-15" }, { name: "Tríceps Pulley", sets: "4", reps: "12" }] },
    B: { title: "Treino B - Costas e Bíceps", exercises: [{ name: "Puxada Frontal", sets: "4", reps: "10-12" }, { name: "Remada Curvada", sets: "4", reps: "8-12" }, { name: "Rosca Direta", sets: "4", reps: "10" }] },
    C: { title: "Treino C - Pernas", exercises: [{ name: "Agachamento Livre", sets: "4", reps: "8-12" }, { name: "Leg Press 45º", sets: "4", reps: "10-15" }, { name: "Cadeira Extensora", sets: "4", reps: "15" }] }
};

let userData = JSON.parse(localStorage.getItem('goFitUserData')) || null;
if (userData && !userData.macros) { userData = null; localStorage.removeItem('goFitUserData'); localStorage.removeItem('goFitDailyLog'); }

let dailyLog = getDailyLog();
let currentWorkoutTab = 'A';

// ESTADO DO CONSTRUTOR DE REFEIÇÃO
let mealBuilder = {
    mealId: null,
    base: null,
    amount: 1,
    prepId: 'cozido',
    addons: [] // array de objetos addons copiados e modificados por qtd
};

window.onload = () => {
    updateDynamicGreeting();
    if (userData) { startApp(); } else { showView('onboarding'); }
    initSpotlight(); 
    document.body.addEventListener('click', () => { if (audioCtx.state === 'suspended') audioCtx.resume(); }, { once: true });
};

function showToast(message) {
    const toast = document.getElementById('toast-notification');
    document.getElementById('toast-message').innerText = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.classList.add('hidden'), 500); }, 3000);
}

function updateDynamicGreeting() {
    const hour = new Date().getHours();
    let greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
    const titleElement = document.getElementById('greeting-title');
    const welcomeElement = document.getElementById('welcome-text');
    if(titleElement) titleElement.innerText = `${greeting}!`;
    if(welcomeElement) welcomeElement.innerText = `${greeting}! 👋`;
}

function initSpotlight() {
    document.querySelectorAll('.spotlight-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--y', `${e.clientY - rect.top}px`);
        });
    });
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

function startApp() {
    showView('dashboard');
    updateDashboardUI();
    renderMeals();
    renderWorkout(currentWorkoutTab);
    renderProfilePage();
    document.getElementById('bottom-nav-bar').classList.remove('hidden');
}

function getDailyLog() {
    const todayDate = new Date().toLocaleDateString('pt-BR');
    let log = JSON.parse(localStorage.getItem('goFitDailyLog'));
    if (!log || log.date !== todayDate) {
        log = { date: todayDate, waterConsumed: 0, foods: [], workoutDone: { A: [], B: [], C: [] } };
        localStorage.setItem('goFitDailyLog', JSON.stringify(log));
    }
    return log;
}

function saveState() {
    localStorage.setItem('goFitUserData', JSON.stringify(userData));
    localStorage.setItem('goFitDailyLog', JSON.stringify(dailyLog));
    updateDashboardUI();
    renderMeals();
    renderProfilePage();
}

function showView(viewName) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(`${viewName}-view`).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchTab(tabName) {
    triggerFeedback('click');
    showView(tabName);
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(i => i.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

function calcDietData(age, weight, height, goal) {
    const bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    let tdee = Math.round(bmr * 1.55); 
    if (goal === 'emagrecer') tdee -= 500;
    if (goal === 'ganhar') tdee += 500;
    const protTarget = Math.round(weight * 2.2);
    const fatTarget = Math.round(weight * 1.0);
    const carbTarget = Math.round((tdee - (protTarget * 4) - (fatTarget * 9)) / 4);
    return { tdee, protTarget, carbTarget, fatTarget };
}

function saveProfile() {
    triggerFeedback('click');
    const age = parseInt(document.getElementById('input-age').value);
    const weight = parseFloat(document.getElementById('input-weight').value);
    const height = parseFloat(document.getElementById('input-height').value);
    const goal = document.getElementById('input-goal').value;

    if (!age || !weight || !height) return showToast("⚠️ Preencha todos os campos.");

    const diet = calcDietData(age, weight, height, goal);
    userData = { age, weight, height, goal, tdee: diet.tdee, waterGoal: Math.round(weight * 40), macros: { p: diet.protTarget, c: diet.carbTarget, f: diet.fatTarget } };

    dailyLog = getDailyLog();
    saveState();
    triggerFeedback('success'); fireConfetti(); showToast("✅ Dieta GoFit gerada!");
    startApp();
}

function renderProfilePage() {
    if(!userData) return;
    document.getElementById('update-weight').value = userData.weight;
    document.getElementById('update-goal').value = userData.goal;
    document.getElementById('profile-bmr').innerText = `${userData.tdee} kcal`;
    const heightM = userData.height / 100;
    document.getElementById('profile-imc').innerText = (userData.weight / (heightM * heightM)).toFixed(1);
}

function updateProfile() {
    triggerFeedback('click');
    const newWeight = parseFloat(document.getElementById('update-weight').value);
    const newGoal = document.getElementById('update-goal').value;
    if(!newWeight) return showToast("⚠️ Insira um peso válido.");

    const diet = calcDietData(userData.age, newWeight, userData.height, newGoal);
    userData.weight = newWeight;
    userData.goal = newGoal;
    userData.tdee = diet.tdee;
    userData.waterGoal = Math.round(newWeight * 40);
    userData.macros = { p: diet.protTarget, c: diet.carbTarget, f: diet.fatTarget };

    saveState();
    triggerFeedback('success'); showToast("✅ Perfil atualizado!");
}

function setWaterRingProgress(percent) {
    const circle = document.getElementById('water-ring');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI; 
    const offset = circumference - (Math.min(percent, 100) / 100) * circumference;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
    document.getElementById('water-percent').innerText = `${Math.floor(percent)}%`;
}

function addWater(amount) {
    const waterBefore = (dailyLog.waterConsumed / userData.waterGoal) * 100;
    dailyLog.waterConsumed += amount;
    saveState();
    const waterAfter = (dailyLog.waterConsumed / userData.waterGoal) * 100;
    if (waterBefore < 100 && waterAfter >= 100) { triggerFeedback('success'); fireConfetti(); showToast("🎉 Meta de água batida!"); } 
    else { triggerFeedback('click'); showToast(`💧 +${amount}ml registrados!`); }
}

function updateMacroRing(ringId, consumed, target, radius) {
    const circle = document.getElementById(ringId);
    const circumference = radius * 2 * Math.PI;
    const safeTarget = target || 1; 
    const percent = Math.min((consumed / safeTarget) * 100, 100) || 0;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
}

function updateDashboardUI() {
    let consumed = { kcal: 0, p: 0, c: 0, f: 0 };
    dailyLog.foods.forEach(f => { consumed.kcal += f.kcal; consumed.p += f.p; consumed.c += f.c; consumed.f += f.f; });

    document.getElementById('ui-tdee').innerText = `Meta Diária: ${userData.tdee} kcal`;
    animateValue(document.getElementById('ui-calories'), parseInt(document.getElementById('ui-calories').innerText), Math.max(0, userData.tdee - consumed.kcal), 500);
    
    updateMacroRing('ring-prot', consumed.p, userData.macros?.p, 50);
    updateMacroRing('ring-carb', consumed.c, userData.macros?.c, 38);
    updateMacroRing('ring-fat', consumed.f, userData.macros?.f, 26);

    document.getElementById('ui-prot').innerText = `P: ${Math.round(consumed.p)}g`;
    document.getElementById('ui-carb').innerText = `C: ${Math.round(consumed.c)}g`;
    document.getElementById('ui-fat').innerText = `G: ${Math.round(consumed.f)}g`;

    const waterPercent = (dailyLog.waterConsumed / userData.waterGoal) * 100;
    document.getElementById('ui-water-status').innerText = `${dailyLog.waterConsumed} / ${userData.waterGoal}ml`;
    setTimeout(() => setWaterRingProgress(waterPercent), 100);

    const logContainer = document.getElementById('food-log');
    logContainer.innerHTML = '';
    if (dailyLog.foods.length === 0) logContainer.innerHTML = '<p style="text-align:center; color:var(--text-light); font-size:14px; padding: 25px 0;">Nada registrado ainda hoje.</p>';

    dailyLog.foods.forEach((food, index) => {
        const item = document.createElement('div');
        item.className = 'food-log-item stagger-item';
        item.style.animationDelay = `${index * 0.05}s`;
        const mealAssoc = mealNames.find(m => m.id === food.mealId).name;
        item.innerHTML = `
            <div class="log-info" style="display: flex; align-items: flex-start; gap: 10px;">
                <span class="tier-dot tier-${food.tier}" style="margin-top: 5px;"></span>
                <div>
                    <h4 style="margin: 0; font-size: 14px; line-height: 1.4;">${food.fullName}</h4>
                    <p style="font-size: 11px; color: var(--text-light); margin: 2px 0 0 0;">${mealAssoc}</p>
                </div>
            </div>
            <div style="text-align: right; flex-shrink: 0; margin-left: 10px;">
                <b style="color:var(--primary-light); display:block; margin-bottom:6px;">${Math.round(food.kcal)} kcal</b>
                <button class="btn-remove" onclick="removeFood(${index})">Remover</button>
            </div>
        `;
        logContainer.appendChild(item);
    });
}

function renderMeals() {
    const carousel = document.getElementById('meals-carousel');
    carousel.innerHTML = '';
    mealNames.forEach((meal, index) => {
        const mealFoods = dailyLog.foods.filter(f => f.mealId === meal.id);
        const mealKcal = mealFoods.reduce((acc, f) => acc + f.kcal, 0);
        let foodsHtml = mealFoods.length > 0 ? `<p class="meal-card-details">${mealFoods.map(f => f.baseName).join(', ')}</p>` : `<p class="meal-card-details" style="color:rgba(255,255,255,0.3)">Nenhum alimento</p>`;
        const card = document.createElement('div');
        card.className = `carousel-item meal-card stagger-item spotlight-card`;
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between;"><span class="meal-time">${meal.time}</span><span style="font-size:14px; font-weight:800; color:var(--primary-light)">${Math.round(mealKcal)} kcal</span></div>
            <h4>${meal.icon} ${meal.name}</h4> ${foodsHtml}
            <button class="meal-card-btn" onclick="openFoodModal('${meal.id}', '${meal.name}')">+ Montar</button>
        `;
        carousel.appendChild(card);
    });
    initSpotlight();
}

// --- WIZARD CONSTRUTOR DE REFEIÇÕES ---

function openFoodModal(mealId, mealName) {
    triggerFeedback('click');
    mealBuilder.mealId = mealId;
    document.getElementById('modal-meal-name').innerText = `Base para o ${mealName}`;
    document.getElementById('food-modal').classList.remove('hidden');
    document.getElementById('builder-step-1').classList.remove('hidden');
    document.getElementById('builder-step-2').classList.add('hidden');
    
    const dbList = document.getElementById('food-db-list');
    dbList.innerHTML = '';
    
    foodDB.bases.forEach((base, index) => {
        const div = document.createElement('div');
        div.className = 'food-db-item stagger-item';
        div.style.animationDelay = `${index * 0.05}s`;
        div.onclick = () => selectBaseFood(base);
        div.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                 <span class="tier-dot tier-${base.tier}"></span>
                <div>
                    <span style="font-weight:800; font-size:15px; color:white; display:block; margin-bottom:4px;">${base.name}</span>
                    <span style="font-size: 12px; color: var(--text-light);">${base.measure} • P:${base.p} C:${base.c} G:${base.f}</span>
                </div>
            </div>
            <span style="font-weight:800; font-size: 16px; color:var(--primary-light);">${base.kcal} kcal</span>
        `;
        dbList.appendChild(div);
    });
}

function closeFoodModal() {
    document.getElementById('food-modal').classList.add('hidden');
    mealBuilder = { mealId: null, base: null, amount: 1, prepId: 'cozido', addons: [] };
}

function selectBaseFood(baseObj) {
    triggerFeedback('click');
    mealBuilder.base = baseObj;
    mealBuilder.amount = baseObj.defaultAmount;
    mealBuilder.addons = [];
    mealBuilder.prepId = 'cozido'; // reset
    
    document.getElementById('builder-step-1').classList.add('hidden');
    document.getElementById('builder-step-2').classList.remove('hidden');
    
    document.getElementById('build-base-name').innerText = baseObj.name;
    document.getElementById('build-base-measure').innerText = `Medida: ${baseObj.measure}`;
    document.getElementById('build-base-qty').innerText = mealBuilder.amount;
    
    // Configura Modo de Preparo
    const prepContainer = document.getElementById('prep-method-container');
    const prepSelect = document.getElementById('build-prep-select');
    if (baseObj.allowPrep) {
        prepContainer.classList.remove('hidden');
        prepSelect.innerHTML = '';
        foodDB.preps.forEach(prep => {
            prepSelect.innerHTML += `<option value="${prep.id}">${prep.name}</option>`;
        });
        mealBuilder.prepId = prepSelect.value;
    } else {
        prepContainer.classList.add('hidden');
        mealBuilder.prepId = 'cozido'; 
    }
    
    // Renderiza Complementos
    const addonsList = document.getElementById('addons-list-container');
    addonsList.innerHTML = '';
    foodDB.addons.forEach(addon => {
        const div = document.createElement('div');
        div.className = 'addon-item';
        div.innerHTML = `
            <div style="display:flex; align-items:center;">
                <input type="checkbox" class="addon-checkbox" id="chk-${addon.id}" onchange="toggleAddon('${addon.id}', this.checked)">
                <label for="chk-${addon.id}" style="color:white; font-size:14px; font-weight:600; cursor:pointer;">
                    ${addon.name} <br><small style="color:var(--text-light); font-weight:normal;">${addon.measure}</small>
                </label>
            </div>
            <div class="qty-buttons" id="qty-box-${addon.id}" style="display:none;">
                <button class="qty-btn" onclick="changeAddonQty('${addon.id}', -1)">-</button>
                <span id="addon-qty-val-${addon.id}" style="color:white; font-weight:bold; min-width: 20px; text-align:center;">1</span>
                <button class="qty-btn" onclick="changeAddonQty('${addon.id}', 1)">+</button>
            </div>
        `;
        addonsList.appendChild(div);
    });
    
    updateLivePreview();
}

function goBackToStep1() {
    triggerFeedback('click');
    document.getElementById('builder-step-2').classList.add('hidden');
    document.getElementById('builder-step-1').classList.remove('hidden');
}

function changeBaseQty(delta) {
    triggerFeedback('click');
    if(mealBuilder.amount + delta > 0) {
        mealBuilder.amount += delta;
        document.getElementById('build-base-qty').innerText = mealBuilder.amount;
        updateLivePreview();
    }
}

function toggleAddon(addonId, isChecked) {
    triggerFeedback('click');
    const qtyBox = document.getElementById(`qty-box-${addonId}`);
    if (isChecked) {
        qtyBox.style.display = 'flex';
        mealBuilder.addons.push({ id: addonId, amount: 1 });
    } else {
        qtyBox.style.display = 'none';
        mealBuilder.addons = mealBuilder.addons.filter(a => a.id !== addonId);
    }
    updateLivePreview();
}

function changeAddonQty(addonId, delta) {
    triggerFeedback('click');
    let addon = mealBuilder.addons.find(a => a.id === addonId);
    if (addon && addon.amount + delta > 0) {
        addon.amount += delta;
        document.getElementById(`addon-qty-val-${addonId}`).innerText = addon.amount;
        updateLivePreview();
    }
}

function calculateCurrentMacros() {
    let total = { kcal: 0, p: 0, c: 0, f: 0 };
    
    // 1. Soma da Base
    const base = mealBuilder.base;
    const qty = mealBuilder.amount;
    total.kcal += base.kcal * qty;
    total.p += base.p * qty;
    total.c += base.c * qty;
    total.f += base.f * qty;
    
    // 2. Soma do Preparo (se aplicável, multiplicado pela quantidade da base)
    if (base.allowPrep) {
        const prepSelect = document.getElementById('build-prep-select');
        mealBuilder.prepId = prepSelect ? prepSelect.value : 'cozido';
        const prep = foodDB.preps.find(p => p.id === mealBuilder.prepId);
        if (prep) {
            total.kcal += prep.kcal * qty;
            total.p += prep.p * qty;
            total.c += prep.c * qty;
            total.f += prep.f * qty;
        }
    }

    // 3. Soma dos Complementos
    mealBuilder.addons.forEach(a => {
        const dbAddon = foodDB.addons.find(db => db.id === a.id);
        total.kcal += dbAddon.kcal * a.amount;
        total.p += dbAddon.p * a.amount;
        total.c += dbAddon.c * a.amount;
        total.f += dbAddon.f * a.amount;
    });

    return total;
}

function updateLivePreview() {
    const macros = calculateCurrentMacros();
    document.getElementById('live-kcal').innerText = Math.round(macros.kcal);
    document.getElementById('live-prot').innerText = `${Math.round(macros.p)}g`;
    document.getElementById('live-carb').innerText = `${Math.round(macros.c)}g`;
    document.getElementById('live-fat').innerText = `${Math.round(macros.f)}g`;
}

function confirmMealAssembly() {
    triggerFeedback('success');
    const macros = calculateCurrentMacros();
    
    // Constrói o nome completo bonito para o log
    let prepName = "";
    if (mealBuilder.base.allowPrep && mealBuilder.prepId !== 'cozido') {
        const pObj = foodDB.preps.find(p => p.id === mealBuilder.prepId);
        prepName = pObj ? ` (${pObj.name})` : "";
    }

    let addonsText = "";
    if (mealBuilder.addons.length > 0) {
        let names = mealBuilder.addons.map(a => {
            let dbA = foodDB.addons.find(db => db.id === a.id);
            return `${a.amount > 1 ? a.amount+'x ' : ''}${dbA.name}`;
        });
        addonsText = " + " + names.join(', ');
    }

    const finalFoodObject = {
        mealId: mealBuilder.mealId,
        baseName: mealBuilder.base.name,
        fullName: `${mealBuilder.amount}x ${mealBuilder.base.name}${prepName}${addonsText}`,
        tier: mealBuilder.base.tier, // Mantém a cor do semáforo da base
        kcal: macros.kcal,
        p: macros.p,
        c: macros.c,
        f: macros.f
    };

    dailyLog.foods.push(finalFoodObject);
    saveState();
    closeFoodModal();
    showToast("🍽️ Refeição montada e salva!");
}

function removeFood(index) {
    triggerFeedback('click');
    dailyLog.foods.splice(index, 1); saveState();
}

// --- TREINO ---
function changeWorkout(tab, btnElement) {
    triggerFeedback('click'); currentWorkoutTab = tab;
    document.querySelectorAll('.btn-tab').forEach(btn => btn.classList.remove('active-tab'));
    btnElement.classList.add('active-tab'); renderWorkout(tab);
}

function renderWorkout(tab) {
    const workoutData = workoutsDB[tab];
    document.getElementById('workout-title').innerText = workoutData.title;
    const list = document.getElementById('workout-list');
    list.innerHTML = '';
    if(!dailyLog.workoutDone) dailyLog.workoutDone = { A:[], B:[], C:[] };
    workoutData.exercises.forEach((ex, index) => {
        const isDone = dailyLog.workoutDone[tab].includes(index);
        const item = document.createElement('div');
        item.className = 'exercise-item stagger-item';
        item.style.animationDelay = `${index * 0.05}s`;
        item.innerHTML = `
            <div class="ex-info"><h4>${ex.name}</h4><p>${ex.sets} séries x ${ex.reps} reps</p></div>
            <div class="ex-check ${isDone ? 'done' : ''}" onclick="toggleExercise('${tab}', ${index}, this)">${isDone ? '✓' : ''}</div>
        `;
        list.appendChild(item);
    });
}

function toggleExercise(tab, index, element) {
    const isDone = dailyLog.workoutDone[tab].includes(index);
    if (isDone) {
        dailyLog.workoutDone[tab] = dailyLog.workoutDone[tab].filter(i => i !== index);
        element.classList.remove('done'); element.innerText = ''; triggerFeedback('click');
    } else {
        dailyLog.workoutDone[tab].push(index);
        element.classList.add('done'); element.innerText = '✓';
        triggerFeedback('success'); showToast("💪 Boa série!");
    }
    saveState();
}
