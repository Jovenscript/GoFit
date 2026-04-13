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

const foodDatabase = [
    { id: 1, name: "Arroz Branco Cozido", portion: "100g", kcal: 130, p: 2.5, c: 28, f: 0.2, tier: 'green' },
    { id: 2, name: "Feijão Carioca", portion: "100g", kcal: 76, p: 4.8, c: 13.6, f: 0.5, tier: 'green' },
    { id: 3, name: "Peito de Frango", portion: "100g", kcal: 165, p: 31, c: 0, f: 3.6, tier: 'green' },
    { id: 4, name: "Ovo Cozido", portion: "1 unid (50g)", kcal: 77, p: 6.3, c: 0.6, f: 5.3, tier: 'green' },
    { id: 5, name: "Whey Protein", portion: "30g", kcal: 120, p: 24, c: 3, f: 2, tier: 'green' },
    { id: 6, name: "Banana", portion: "1 unid (100g)", kcal: 89, p: 1.1, c: 22.8, f: 0.3, tier: 'green' },
    { id: 7, name: "Aveia em Flocos", portion: "30g", kcal: 114, p: 4.3, c: 17, f: 2.2, tier: 'green' },
    { id: 15, name: "Brócolis Cozido", portion: "100g", kcal: 25, p: 2.1, c: 4.4, f: 0.5, tier: 'green' },
    { id: 20, name: "Salmão Grelhado", portion: "100g", kcal: 206, p: 22, c: 0, f: 12, tier: 'green' },
    { id: 21, name: "Macarrão Alho e Óleo", portion: "100g", kcal: 180, p: 5.5, c: 32, f: 4.5, tier: 'yellow' },
    { id: 8, name: "Leite Integral", portion: "200ml", kcal: 120, p: 6, c: 10, f: 6, tier: 'yellow' },
    { id: 9, name: "Pão Francês", portion: "1 unid (50g)", kcal: 150, p: 4.5, c: 29, f: 1.5, tier: 'yellow' },
    { id: 12, name: "Carne Moída", portion: "100g", kcal: 133, p: 21, c: 0, f: 4.5, tier: 'yellow' },
    { id: 13, name: "Batata Inglesa", portion: "100g", kcal: 52, p: 1.2, c: 11.9, f: 0.1, tier: 'yellow' },
    { id: 17, name: "Pasta de Amendoim", portion: "15g", kcal: 94, p: 4.2, c: 2.6, f: 7.6, tier: 'yellow' },
    { id: 19, name: "Iogurte Natural", portion: "170g", kcal: 107, p: 5.7, c: 7.8, f: 5.9, tier: 'yellow' },
    { id: 22, name: "Refrigerante", portion: "350ml", kcal: 149, p: 0, c: 37, f: 0, tier: 'red' },
    { id: 23, name: "Hambúrguer Gourmet", portion: "1 unid", kcal: 550, p: 28, c: 45, f: 32, tier: 'red' },
    { id: 24, name: "Pizza de Calabresa", portion: "1 fatia", kcal: 280, p: 12, c: 30, f: 14, tier: 'red' },
    { id: 25, name: "Batata Frita", portion: "100g", kcal: 312, p: 3.4, c: 41, f: 15, tier: 'red' }
];

const mealNames = [
    { id: "cafe", name: "Café da Manhã", icon: "☕", time: "07:00" },
    { id: "lanche_manha", name: "Lanche da Manhã", icon: "🍎", time: "10:00" },
    { id: "almoco", name: "Almoço", icon: "🍲", time: "12:30" },
    { id: "lanche", name: "Lanche da Tarde", icon: "🥪", time: "16:00" },
    { id: "jantar", name: "Jantar", icon: "🥗", time: "20:00" },
    { id: "ceia", name: "Ceia", icon: "🌛", time: "22:00" }
];

const workoutsDB = {
    A: { title: "Treino A - Peito e Tríceps", exercises: [{ name: "Supino Reto", sets: "4", reps: "8-12" }, { name: "Supino Inclinado", sets: "3", reps: "10-12" }, { name: "Crucifixo Máquina", sets: "3", reps: "12-15" }, { name: "Tríceps Pulley", sets: "4", reps: "12" }] },
    B: { title: "Treino B - Costas e Bíceps", exercises: [{ name: "Puxada Frontal", sets: "4", reps: "10-12" }, { name: "Remada Curvada", sets: "4", reps: "8-12" }, { name: "Rosca Direta", sets: "4", reps: "10" }] },
    C: { title: "Treino C - Pernas", exercises: [{ name: "Agachamento Livre", sets: "4", reps: "8-12" }, { name: "Leg Press 45º", sets: "4", reps: "10-15" }, { name: "Cadeira Extensora", sets: "4", reps: "15" }] }
};

// --- ALTERADO O NOME DO CACHE PARA GOFIT ---
let userData = JSON.parse(localStorage.getItem('goFitUserData')) || null;
if (userData && !userData.macros) { userData = null; localStorage.removeItem('goFitUserData'); localStorage.removeItem('goFitDailyLog'); }

let dailyLog = getDailyLog();
let currentMealForModal = null;
let currentWorkoutTab = 'A';

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
            <div class="log-info" style="display: flex; align-items: center; gap: 10px;">
                <span class="tier-dot tier-${food.tier}"></span>
                <div>
                    <h4 style="margin: 0; font-size: 15px;">${food.name}</h4>
                    <p style="font-size: 12px; color: var(--text-light); margin: 2px 0 0 0;">${mealAssoc}</p>
                </div>
            </div>
            <div style="text-align: right;">
                <b style="color:var(--primary-light); display:block; margin-bottom:6px;">${food.kcal} kcal</b>
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
        let foodsHtml = mealFoods.length > 0 ? `<p class="meal-card-details">${mealFoods.map(f => f.name).join(', ')}</p>` : `<p class="meal-card-details" style="color:rgba(255,255,255,0.3)">Nenhum alimento</p>`;
        const card = document.createElement('div');
        card.className = `carousel-item meal-card stagger-item spotlight-card`;
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between;"><span class="meal-time">${meal.time}</span><span style="font-size:14px; font-weight:800; color:var(--primary-light)">${mealKcal} kcal</span></div>
            <h4>${meal.icon} ${meal.name}</h4> ${foodsHtml}
            <button class="meal-card-btn" onclick="openFoodModal('${meal.id}', '${meal.name}')">+ Adicionar</button>
        `;
        carousel.appendChild(card);
    });
    initSpotlight();
}

function openFoodModal(mealId, mealName) {
    triggerFeedback('click');
    currentMealForModal = mealId;
    document.getElementById('modal-meal-name').innerText = mealName;
    document.getElementById('food-modal').classList.remove('hidden');
    const dbList = document.getElementById('food-db-list');
    dbList.innerHTML = '';
    foodDatabase.forEach((food, index) => {
        const div = document.createElement('div');
        div.className = 'food-db-item stagger-item';
        div.style.animationDelay = `${index * 0.05}s`;
        div.onclick = () => addSelectedFood(food.id, food.name);
        div.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                 <span class="tier-dot tier-${food.tier}"></span>
                <div>
                    <span style="font-weight:800; font-size:15px; color:white; display:block; margin-bottom:4px;">${food.name}</span>
                    <span style="font-size: 12px; color: var(--text-light);">${food.portion} • P:${food.p} C:${food.c} G:${food.f}</span>
                </div>
            </div>
            <span style="font-weight:800; font-size: 16px; color:var(--primary-light);">${food.kcal} kcal</span>
        `;
        dbList.appendChild(div);
    });
}

function closeFoodModal() {
    document.getElementById('food-modal').classList.add('hidden');
    currentMealForModal = null;
}

function addSelectedFood(foodId, foodName) {
    triggerFeedback('click');
    const food = foodDatabase.find(f => f.id === foodId);
    dailyLog.foods.push({ ...food, mealId: currentMealForModal });
    saveState(); closeFoodModal(); showToast(`🍽️ ${foodName} adicionado!`);
}

function removeFood(index) {
    triggerFeedback('click');
    dailyLog.foods.splice(index, 1); saveState();
}

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
