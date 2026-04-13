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

// --- BANCO DE DADOS GIGANTE E CATEGORIZADO ---
const foodDB = {
    bases: [
        // FRUTAS
        { id: 'banana', name: "Banana Prata", measure: "unidade (100g)", defaultAmount: 1, kcal: 89, p: 1.1, c: 22.8, f: 0.3, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche_manha', 'lanche', 'pre_treino', 'pos_treino', 'ceia'] },
        { id: 'maca', name: "Maçã", measure: "unidade (130g)", defaultAmount: 1, kcal: 68, p: 0.3, c: 18, f: 0.2, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche_manha', 'lanche', 'pre_treino', 'ceia'] },
        { id: 'mamao', name: "Mamão Papaia", measure: "fatia (100g)", defaultAmount: 1, kcal: 43, p: 0.5, c: 10.8, f: 0.1, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche_manha'] },
        { id: 'morango', name: "Morango", measure: "porção (100g)", defaultAmount: 1, kcal: 32, p: 0.7, c: 7.7, f: 0.3, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche', 'ceia'] },
        { id: 'abacate', name: "Abacate", measure: "colher sopa (30g)", defaultAmount: 2, kcal: 48, p: 0.4, c: 1.8, f: 4.6, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche', 'ceia'] },

        // PÃES E CARBOIDRATOS LEVES
        { id: 'pao_frances', name: "Pão Francês", measure: "unidade (50g)", defaultAmount: 1, kcal: 150, p: 4.5, c: 29, f: 1.5, allowPrep: false, tier: 'yellow', meals: ['cafe', 'lanche_manha', 'lanche', 'pre_treino', 'pos_treino'] },
        { id: 'pao_forma', name: "Pão de Forma Tradicional", measure: "fatia (25g)", defaultAmount: 2, kcal: 60, p: 2, c: 12, f: 0.5, allowPrep: false, tier: 'yellow', meals: ['cafe', 'lanche', 'pre_treino', 'pos_treino'] },
        { id: 'pao_integral', name: "Pão de Forma Integral", measure: "fatia (25g)", defaultAmount: 2, kcal: 55, p: 2.5, c: 10, f: 0.5, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche', 'pre_treino', 'pos_treino'] },
        { id: 'tapioca', name: "Goma de Tapioca", measure: "colher sopa (20g)", defaultAmount: 3, kcal: 48, p: 0, c: 12, f: 0, allowPrep: false, tier: 'yellow', meals: ['cafe', 'lanche', 'pre_treino'] },
        { id: 'aveia', name: "Aveia em Flocos", measure: "colher sopa (15g)", defaultAmount: 2, kcal: 57, p: 2.1, c: 8.5, f: 1.1, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche', 'pre_treino', 'ceia'] },

        // CARBOIDRATOS REFEIÇÕES
        { id: 'arroz_branco', name: "Arroz Branco", measure: "escumadeira (50g)", defaultAmount: 2, kcal: 65, p: 1.2, c: 14, f: 0.1, allowPrep: true, tier: 'yellow', meals: ['almoco', 'jantar', 'pos_treino'] },
        { id: 'arroz_integral', name: "Arroz Integral", measure: "escumadeira (50g)", defaultAmount: 2, kcal: 60, p: 1.5, c: 13, f: 0.5, allowPrep: true, tier: 'green', meals: ['almoco', 'jantar'] },
        { id: 'feijao', name: "Feijão Carioca/Preto", measure: "concha (60g)", defaultAmount: 1, kcal: 45, p: 3, c: 8, f: 0.3, allowPrep: false, tier: 'green', meals: ['almoco', 'jantar'] },
        { id: 'macarrao', name: "Macarrão", measure: "escumadeira (50g)", defaultAmount: 2, kcal: 80, p: 2.8, c: 16, f: 0.5, allowPrep: true, tier: 'yellow', meals: ['almoco', 'jantar', 'pos_treino'] },
        { id: 'batata_inglesa', name: "Batata Inglesa", measure: "unidade peq (100g)", defaultAmount: 1, kcal: 52, p: 1.2, c: 12, f: 0.1, allowPrep: true, tier: 'green', meals: ['almoco', 'jantar'] },
        { id: 'batata_doce', name: "Batata Doce", measure: "pedaço (100g)", defaultAmount: 1, kcal: 77, p: 0.6, c: 18.4, f: 0.1, allowPrep: true, tier: 'green', meals: ['almoco', 'jantar', 'pre_treino', 'pos_treino'] },
        
        // CARNES E OVOS
        { id: 'ovo', name: "Ovo Inteiro", measure: "unidade (50g)", defaultAmount: 1, kcal: 70, p: 6, c: 0.5, f: 5, allowPrep: true, tier: 'green', meals: ['cafe', 'lanche', 'almoco', 'jantar', 'ceia', 'pos_treino'] },
        { id: 'frango', name: "Peito de Frango", measure: "filé (100g)", defaultAmount: 1, kcal: 110, p: 23, c: 0, f: 1.2, allowPrep: true, tier: 'green', meals: ['almoco', 'jantar', 'pos_treino'] },
        { id: 'patinho', name: "Carne Bovina (Patinho)", measure: "porção (100g)", defaultAmount: 1, kcal: 133, p: 21, c: 0, f: 4.5, allowPrep: true, tier: 'green', meals: ['almoco', 'jantar', 'pos_treino'] },
        { id: 'salmao', name: "Salmão", measure: "filé (100g)", defaultAmount: 1, kcal: 206, p: 22, c: 0, f: 12, allowPrep: true, tier: 'yellow', meals: ['almoco', 'jantar'] },
        { id: 'peixe_branco', name: "Peixe Branco (Tilápia)", measure: "filé (100g)", defaultAmount: 1, kcal: 96, p: 20, c: 0, f: 1.7, allowPrep: true, tier: 'green', meals: ['almoco', 'jantar', 'pos_treino'] },
        { id: 'whey', name: "Whey Protein", measure: "scoop (30g)", defaultAmount: 1, kcal: 120, p: 24, c: 3, f: 2, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche', 'pre_treino', 'pos_treino', 'ceia'] },

        // LATICÍNIOS E BEBIDAS
        { id: 'leite_integral', name: "Leite Integral", measure: "copo (200ml)", defaultAmount: 1, kcal: 120, p: 6, c: 10, f: 6, allowPrep: false, tier: 'yellow', meals: ['cafe', 'lanche', 'ceia'] },
        { id: 'leite_desnatado', name: "Leite Desnatado", measure: "copo (200ml)", defaultAmount: 1, kcal: 70, p: 6, c: 10, f: 0, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche', 'pre_treino', 'pos_treino', 'ceia'] },
        { id: 'iogurte_natural', name: "Iogurte Natural", measure: "pote (170g)", defaultAmount: 1, kcal: 107, p: 5.7, c: 7.8, f: 5.9, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche_manha', 'lanche', 'ceia'] },
        { id: 'cafe_puro', name: "Café (Sem Açúcar)", measure: "xícara (50ml)", defaultAmount: 1, kcal: 2, p: 0.1, c: 0.3, f: 0, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche_manha', 'lanche', 'pre_treino'] },
        { id: 'suco_laranja', name: "Suco de Laranja (Natural)", measure: "copo (200ml)", defaultAmount: 1, kcal: 90, p: 1.4, c: 20, f: 0.4, allowPrep: false, tier: 'yellow', meals: ['cafe', 'almoco', 'lanche'] },

        // INDUSTRIAIS / FAST FOOD
        { id: 'refrigerante', name: "Refrigerante", measure: "lata (350ml)", defaultAmount: 1, kcal: 149, p: 0, c: 37, f: 0, allowPrep: false, tier: 'red', meals: ['almoco', 'jantar', 'lanche'] },
        { id: 'pizza', name: "Pizza de Calabresa", measure: "fatia (100g)", defaultAmount: 2, kcal: 280, p: 12, c: 30, f: 14, allowPrep: false, tier: 'red', meals: ['jantar', 'lanche'] },
        { id: 'hamburguer', name: "Hambúrguer Gourmet", measure: "unidade", defaultAmount: 1, kcal: 550, p: 28, c: 45, f: 32, allowPrep: false, tier: 'red', meals: ['jantar', 'almoco'] },
        { id: 'batata_frita', name: "Batata Frita (Fast Food)", measure: "porção M (100g)", defaultAmount: 1, kcal: 312, p: 3.4, c: 41, f: 15, allowPrep: false, tier: 'red', meals: ['almoco', 'jantar', 'lanche'] }
    ],
    preps: [
        { id: 'cozido', name: "Cozido/Simples", kcal: 0, p: 0, c: 0, f: 0 },
        { id: 'grelhado', name: "Grelhado (fio de azeite)", kcal: 20, p: 0, c: 0, f: 2.2 },
        { id: 'assado', name: "Assado", kcal: 10, p: 0, c: 0, f: 1.1 },
        { id: 'frito_oleo', name: "Frito em Óleo", kcal: 60, p: 0, c: 0, f: 6.5 },
        { id: 'frito_azeite', name: "Frito no Azeite", kcal: 45, p: 0, c: 0, f: 5 },
        { id: 'mexido_manteiga', name: "Mexido (Manteiga)", kcal: 35, p: 0, c: 0, f: 4 },
        { id: 'empanado', name: "Empanado e Frito", kcal: 120, p: 2, c: 15, f: 8 },
        { id: 'alho_oleo', name: "Alho e Óleo", kcal: 70, p: 0.5, c: 2, f: 7 }
    ],
    addons: [
        { id: 'manteiga', name: "Manteiga", measure: "pontinha de faca (5g)", kcal: 36, p: 0, c: 0, f: 4, tier: 'yellow' },
        { id: 'margarina', name: "Margarina", measure: "pontinha de faca (5g)", kcal: 36, p: 0, c: 0, f: 4, tier: 'red' },
        { id: 'requeijao', name: "Requeijão Tradicional", measure: "colher sopa (30g)", kcal: 75, p: 3, c: 1, f: 6.5, tier: 'yellow' },
        { id: 'requeijao_light', name: "Requeijão Light", measure: "colher sopa (30g)", kcal: 54, p: 3, c: 1, f: 4.2, tier: 'green' },
        { id: 'maionese', name: "Maionese", measure: "colher sopa (12g)", kcal: 40, p: 0, c: 1, f: 4, tier: 'red' },
        { id: 'ketchup', name: "Ketchup", measure: "colher sopa (12g)", kcal: 14, p: 0, c: 3.5, f: 0, tier: 'yellow' },
        { id: 'queijo_mussarela', name: "Queijo Mussarela", measure: "fatia (30g)", kcal: 96, p: 6.8, c: 0.9, f: 7.2, tier: 'yellow' },
        { id: 'queijo_prato', name: "Queijo Prato", measure: "fatia (30g)", kcal: 106, p: 7, c: 0.5, f: 8.5, tier: 'yellow' },
        { id: 'queijo_branco', name: "Queijo Minas Frescal", measure: "fatia grossa (30g)", kcal: 72, p: 5, c: 1, f: 5.5, tier: 'green' },
        { id: 'presunto', name: "Presunto Magro", measure: "fatia (15g)", kcal: 15, p: 2.5, c: 0.5, f: 0.5, tier: 'yellow' },
        { id: 'peito_peru', name: "Peito de Peru", measure: "fatia (15g)", kcal: 16, p: 3.5, c: 0, f: 0.2, tier: 'green' },
        { id: 'mel', name: "Mel", measure: "colher chá (10g)", kcal: 30, p: 0, c: 8, f: 0, tier: 'yellow' },
        { id: 'pasta_amendoim', name: "Pasta de Amendoim", measure: "colher sopa (15g)", kcal: 94, p: 4.2, c: 2.6, f: 7.6, tier: 'green' },
        { id: 'pate_frango', name: "Patê de Frango Caseiro", measure: "colher sopa (30g)", kcal: 45, p: 4, c: 1, f: 2.5, tier: 'green' },
        { id: 'azeite', name: "Azeite de Oliva", measure: "colher sopa (13ml)", kcal: 119, p: 0, c: 0, f: 13.5, tier: 'green' },
        { id: 'salada', name: "Salada Verde", measure: "porção", kcal: 15, p: 1, c: 3, f: 0, tier: 'green' },
        { id: 'acucar', name: "Açúcar Refinado", measure: "colher chá (5g)", kcal: 20, p: 0, c: 5, f: 0, tier: 'red' }
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
let dailyLog = getDailyLog();
let currentWorkoutTab = 'A';

// ESTADO DO CONSTRUTOR DE REFEIÇÃO
let mealBuilder = {
    mealId: null,
    base: null,
    amount: 1,
    prepId: 'cozido',
    addons: []
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
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.classList.add('hidden'), 500); }, 4000);
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
    document.getElementById('modal-meal-name').innerText = `Opções para o ${mealName}`;
    document.getElementById('food-search').value = ""; // Limpar pesquisa
    document.getElementById('food-modal').classList.remove('hidden');
    document.getElementById('builder-step-1').classList.remove('hidden');
    document.getElementById('builder-step-2').classList.add('hidden');
    
    renderFoodList("");
}

function filterFoods() {
    const term = document.getElementById('food-search').value;
    renderFoodList(term);
}

function renderFoodList(searchTerm) {
    const dbList = document.getElementById('food-db-list');
    dbList.innerHTML = '';
    
    const term = searchTerm.toLowerCase();
    let recommended = [];
    let others = [];
    
    // Filtro Contextual Inteligente
    foodDB.bases.forEach(base => {
        if(base.name.toLowerCase().includes(term)) {
            if (base.meals.includes(mealBuilder.mealId)) {
                recommended.push(base);
            } else {
                others.push(base);
            }
        }
    });
    
    // Gerar Bloco de Recomendados
    if(recommended.length > 0) {
        dbList.innerHTML += `<h4 class="gradient-text-sub" style="font-size:14px; margin-bottom:10px;">Sugestões Inteligentes</h4>`;
        recommended.forEach((base, index) => {
            dbList.appendChild(createFoodItemElement(base, index));
        });
    }
    
    // Gerar Bloco de Outros (Liberdade Total)
    if(others.length > 0) {
        dbList.innerHTML += `<h4 class="gradient-text-sub" style="font-size:14px; margin: 20px 0 10px 0;">Menu Completo</h4>`;
        others.forEach((base, index) => {
            dbList.appendChild(createFoodItemElement(base, index + recommended.length));
        });
    }
    
    if(recommended.length === 0 && others.length === 0) {
        dbList.innerHTML = `<p style="color:var(--text-light); text-align:center; font-size:13px; padding:20px;">Nenhum alimento encontrado.</p>`;
    }
}

function createFoodItemElement(base, delayIndex) {
    const div = document.createElement('div');
    div.className = 'food-db-item stagger-item';
    div.style.animationDelay = `${delayIndex * 0.05}s`;
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
    return div;
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
                    <span class="tier-dot tier-${addon.tier}"></span>${addon.name} <br><small style="color:var(--text-light); font-weight:normal; margin-left: 20px;">${addon.measure}</small>
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
    
    const base = mealBuilder.base;
    const qty = mealBuilder.amount;
    total.kcal += base.kcal * qty;
    total.p += base.p * qty;
    total.c += base.c * qty;
    total.f += base.f * qty;
    
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
        tier: mealBuilder.base.tier, // A cor primária será a do alimento base
        kcal: macros.kcal,
        p: macros.p,
        c: macros.c,
        f: macros.f
    };

    // SISTEMA DE CONTROLE (Alertas Inteligentes)
    let currentKcal = 0;
    let redCount = 0;
    dailyLog.foods.forEach(f => {
        currentKcal += f.kcal;
        if(f.tier === 'red') redCount++;
    });
    
    dailyLog.foods.push(finalFoodObject);
    saveState();
    closeFoodModal();

    let newTotalKcal = currentKcal + macros.kcal;
    if(newTotalKcal > userData.tdee * 1.1) {
        // Alerta de excesso calórico
        showToast("⚠️ Atenção: Você ultrapassou seu limite calórico diário!");
    } else if(finalFoodObject.tier === 'red' && redCount >= 2) {
        // Alerta de excesso de alimentos não saudáveis
        showToast("⚠️ Alerta: Você está consumindo muitos itens ultraprocessados hoje.");
    } else {
        showToast("🍽️ Refeição montada e salva!");
    }
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
