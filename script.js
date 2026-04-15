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
    const colors = ['#d97706', '#fbbf24', '#64748b', '#a3a3a3', '#ffffff'];
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

function initMagneticCards() {
    const cards = document.querySelectorAll('.magnetic-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5; 
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

document.querySelectorAll('.focus-cb').forEach(cb => {
    cb.addEventListener('change', function() {
        const checked = document.querySelectorAll('.focus-cb:checked');
        if (checked.length > 2) {
            this.checked = false;
            showToast("⚠️ Selecione no máximo 2 focos.");
            return;
        }
        this.parentElement.classList.toggle('selected', this.checked);
    });
});

const foodDB = {
    bases: [
        { id: 'banana', name: "Banana Prata", keywords: ['banana', 'nanica', 'prata', 'da terra'], category: 'fruta', measure: "unidade (100g)", defaultAmount: 1, kcal: 89, p: 1.1, c: 22.8, f: 0.3, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche_manha', 'lanche', 'pre_treino', 'pos_treino', 'ceia'] },
        { id: 'maca', name: "Maçã", keywords: ['maçã', 'maca'], category: 'fruta', measure: "unidade (130g)", defaultAmount: 1, kcal: 68, p: 0.3, c: 18, f: 0.2, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche_manha', 'lanche', 'pre_treino', 'ceia'] },
        { id: 'pao_frances', name: "Pão Francês", keywords: ['pão francês', 'pao frances', 'cacetinho', 'pão de sal'], category: 'carb_simples', measure: "unidade (50g)", defaultAmount: 1, kcal: 150, p: 4.5, c: 29, f: 1.5, allowPrep: false, tier: 'yellow', meals: ['cafe', 'lanche_manha', 'lanche', 'pre_treino', 'pos_treino'] },
        { id: 'pao_forma', name: "Pão de Forma", keywords: ['pão de forma', 'pao de forma', 'pão de sanduíche'], category: 'carb_simples', measure: "fatia (25g)", defaultAmount: 2, kcal: 60, p: 2, c: 12, f: 0.5, allowPrep: false, tier: 'yellow', meals: ['cafe', 'lanche', 'pre_treino', 'pos_treino'] },
        { id: 'pao_integral', name: "Pão Integral", keywords: ['pão integral', 'pao integral'], category: 'carb_complexo', measure: "fatia (25g)", defaultAmount: 2, kcal: 55, p: 2.5, c: 10, f: 0.5, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche', 'pre_treino', 'pos_treino'] },
        { id: 'tapioca', name: "Tapioca", keywords: ['tapioca', 'goma'], category: 'carb_simples', measure: "colher sopa (20g)", defaultAmount: 3, kcal: 48, p: 0, c: 12, f: 0, allowPrep: false, tier: 'yellow', meals: ['cafe', 'lanche', 'pre_treino'] },
        { id: 'aveia', name: "Aveia em Flocos", keywords: ['aveia', 'flocos de aveia'], category: 'carb_complexo', measure: "colher sopa (15g)", defaultAmount: 2, kcal: 57, p: 2.1, c: 8.5, f: 1.1, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche', 'pre_treino', 'ceia'] },
        { id: 'arroz_branco', name: "Arroz Branco", keywords: ['arroz', 'arroz branco'], category: 'prato_principal', measure: "escumadeira (50g)", defaultAmount: 2, kcal: 65, p: 1.2, c: 14, f: 0.1, allowPrep: true, tier: 'yellow', meals: ['almoco', 'jantar', 'pos_treino'] },
        { id: 'arroz_integral', name: "Arroz Integral", keywords: ['arroz integral'], category: 'prato_principal', measure: "escumadeira (50g)", defaultAmount: 2, kcal: 60, p: 1.5, c: 13, f: 0.5, allowPrep: true, tier: 'green', meals: ['almoco', 'jantar'] },
        { id: 'feijao', name: "Feijão", keywords: ['feijão', 'feijao', 'feijão carioca', 'feijão preto'], category: 'prato_principal', measure: "concha (60g)", defaultAmount: 1, kcal: 45, p: 3, c: 8, f: 0.3, allowPrep: false, tier: 'green', meals: ['almoco', 'jantar'] },
        { id: 'macarrao', name: "Macarrão", keywords: ['macarrão', 'macarrao', 'massa', 'espaguete'], category: 'prato_principal', measure: "escumadeira (50g)", defaultAmount: 2, kcal: 80, p: 2.8, c: 16, f: 0.5, allowPrep: true, tier: 'yellow', meals: ['almoco', 'jantar', 'pos_treino'] },
        { id: 'batata_inglesa', name: "Batata Inglesa", keywords: ['batata', 'batata inglesa'], category: 'prato_principal', measure: "unidade peq (100g)", defaultAmount: 1, kcal: 52, p: 1.2, c: 12, f: 0.1, allowPrep: true, tier: 'green', meals: ['almoco', 'jantar'] },
        { id: 'batata_doce', name: "Batata Doce", keywords: ['batata doce'], category: 'prato_principal', measure: "pedaço (100g)", defaultAmount: 1, kcal: 77, p: 0.6, c: 18.4, f: 0.1, allowPrep: true, tier: 'green', meals: ['almoco', 'jantar', 'pre_treino', 'pos_treino'] },
        { id: 'ovo', name: "Ovo Inteiro", keywords: ['ovo', 'ovos'], category: 'proteina', measure: "unidade (50g)", defaultAmount: 1, kcal: 70, p: 6, c: 0.5, f: 5, allowPrep: true, tier: 'green', meals: ['cafe', 'lanche', 'almoco', 'jantar', 'ceia', 'pos_treino'] },
        { id: 'frango', name: "Peito de Frango", keywords: ['frango', 'peito de frango', 'filé de frango'], category: 'prato_principal', measure: "filé (100g)", defaultAmount: 1, kcal: 110, p: 23, c: 0, f: 1.2, allowPrep: true, tier: 'green', meals: ['almoco', 'jantar', 'pos_treino'] },
        { id: 'patinho', name: "Carne Bovina (Patinho)", keywords: ['carne', 'patinho', 'bife', 'carne moída', 'carne bovina'], category: 'prato_principal', measure: "porção (100g)", defaultAmount: 1, kcal: 133, p: 21, c: 0, f: 4.5, allowPrep: true, tier: 'green', meals: ['almoco', 'jantar', 'pos_treino'] },
        { id: 'almondega', name: "Almôndega", keywords: ['almôndega', 'almondega', 'almôndegas'], category: 'prato_principal', measure: "unidade (30g)", defaultAmount: 3, kcal: 60, p: 5, c: 2, f: 3.5, allowPrep: true, tier: 'yellow', meals: ['almoco', 'jantar'] },
        { id: 'salmao', name: "Salmão", keywords: ['salmão', 'salmao'], category: 'prato_principal', measure: "filé (100g)", defaultAmount: 1, kcal: 206, p: 22, c: 0, f: 12, allowPrep: true, tier: 'yellow', meals: ['almoco', 'jantar'] },
        { id: 'peixe_branco', name: "Peixe Branco", keywords: ['peixe', 'tilápia', 'peixe branco', 'merluza'], category: 'prato_principal', measure: "filé (100g)", defaultAmount: 1, kcal: 96, p: 20, c: 0, f: 1.7, allowPrep: true, tier: 'green', meals: ['almoco', 'jantar', 'pos_treino'] },
        { id: 'salada', name: "Salada Verde", keywords: ['salada', 'alface', 'tomate', 'folhas'], category: 'salada', measure: "porção", defaultAmount: 1, kcal: 15, p: 1, c: 3, f: 0, allowPrep: false, tier: 'green', meals: ['almoco', 'jantar'] },
        { id: 'whey', name: "Whey Protein", keywords: ['whey', 'whey protein', 'proteína em pó'], category: 'suplemento', measure: "scoop (30g)", defaultAmount: 1, kcal: 120, p: 24, c: 3, f: 2, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche', 'pre_treino', 'pos_treino', 'ceia'] },
        { id: 'leite_integral', name: "Leite Integral", keywords: ['leite', 'leite integral'], category: 'bebida', measure: "copo (200ml)", defaultAmount: 1, kcal: 120, p: 6, c: 10, f: 6, allowPrep: false, tier: 'yellow', meals: ['cafe', 'lanche', 'ceia'] },
        { id: 'leite_desnatado', name: "Leite Desnatado", keywords: ['leite desnatado'], category: 'bebida', measure: "copo (200ml)", defaultAmount: 1, kcal: 70, p: 6, c: 10, f: 0, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche', 'pre_treino', 'pos_treino', 'ceia'] },
        { id: 'iogurte_natural', name: "Iogurte Natural", keywords: ['iogurte', 'yogurte', 'danone'], category: 'doce', measure: "pote (170g)", defaultAmount: 1, kcal: 107, p: 5.7, c: 7.8, f: 5.9, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche_manha', 'lanche', 'ceia'] },
        { id: 'cafe_puro', name: "Café (Sem Açúcar)", keywords: ['café', 'cafe', 'cafézinho'], category: 'bebida', measure: "xícara (50ml)", defaultAmount: 1, kcal: 2, p: 0.1, c: 0.3, f: 0, allowPrep: false, tier: 'green', meals: ['cafe', 'lanche_manha', 'lanche', 'pre_treino'] },
        { id: 'suco_laranja', name: "Suco de Laranja", keywords: ['suco', 'suco de laranja'], category: 'bebida', measure: "copo (200ml)", defaultAmount: 1, kcal: 90, p: 1.4, c: 20, f: 0.4, allowPrep: false, tier: 'yellow', meals: ['cafe', 'almoco', 'lanche'] }
    ],
    preps: [
        { id: 'cozido', name: "Cozido/In natura", kcal: 0, p: 0, c: 0, f: 0 },
        { id: 'grelhado', name: "Grelhado", kcal: 20, p: 0, c: 0, f: 2.2 },
        { id: 'assado', name: "Assado", kcal: 10, p: 0, c: 0, f: 1.1 },
        { id: 'frito_oleo', name: "Frito em Óleo", kcal: 60, p: 0, c: 0, f: 6.5 },
        { id: 'frito_azeite', name: "Frito no Azeite", kcal: 45, p: 0, c: 0, f: 5 },
        { id: 'mexido_manteiga', name: "Mexido", kcal: 35, p: 0, c: 0, f: 4 }
    ]
};

const exerciseDB = {
    peito: [
        { name: "Supino Reto", type: "Barra/Livre" },
        { name: "Supino Inclinado", type: "Halteres" },
        { name: "Crucifixo", type: "Polia" },
        { name: "Crossover", type: "Máquina" },
        { name: "Flexão de Braço", type: "Peso Corporal" }
    ],
    costas: [
        { name: "Puxada Frontal", type: "Polia" },
        { name: "Remada Curvada", type: "Barra Livre" },
        { name: "Remada Baixa", type: "Máquina" },
        { name: "Pull-down", type: "Polia" },
        { name: "Barra Fixa", type: "Peso Corporal" }
    ],
    pernas: [
        { name: "Agachamento Livre", type: "Barra/Livre" },
        { name: "Leg Press 45º", type: "Máquina" },
        { name: "Cadeira Extensora", type: "Máquina" },
        { name: "Mesa Flexora", type: "Máquina" },
        { name: "Elevação Pélvica", type: "Livre" }
    ],
    bracos: [
        { name: "Rosca Direta", type: "Barra" },
        { name: "Rosca Martelo", type: "Halteres" },
        { name: "Tríceps na Corda", type: "Polia" },
        { name: "Tríceps Testa", type: "Barra W" },
        { name: "Tríceps Banco", type: "Peso Corporal" }
    ],
    core: [
        { name: "Abdominal Supra", type: "Solo" },
        { name: "Prancha Isométrica", type: "Solo" },
        { name: "Elevação de Pernas", type: "Solo" }
    ],
    ombro: [
        { name: "Desenvolvimento", type: "Halteres" },
        { name: "Elevação Lateral", type: "Halteres" },
        { name: "Elevação Frontal", type: "Polia" }
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

let userData = JSON.parse(localStorage.getItem('goFitUserData')) || null;
if (userData && !userData.name) { userData = null; localStorage.removeItem('goFitUserData'); localStorage.removeItem('goFitDailyLog'); }

let dailyLog = getDailyLog();
let currentWorkoutTab = 'A';
let smartBuilderList = []; 

window.onload = () => {
    if (userData) { 
        updateDynamicGreeting();
        startApp(); 
    } else { 
        showView('onboarding'); 
    }
    initMagneticCards(); 
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
    const titleElement = document.getElementById('dynamic-greeting-main');
    if(titleElement) titleElement.innerText = `${greeting}, ${userData.name}!`;
    document.getElementById('ui-user-name').innerText = userData.name.split(' ')[0];
    document.getElementById('ui-avatar').innerText = userData.name.substring(0, 2).toUpperCase();
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

function generateWorkouts(focuses, goal) {
    let reps = goal === 'emagrecer' ? "12-15" : goal === 'ganhar' ? "8-10" : "10-12";
    let sets = goal === 'ganhar' ? 4 : 3;
    let rest = goal === 'emagrecer' ? "45s" : "90s";

    if(!focuses || focuses.length === 0) focuses = ['peito', 'costas', 'pernas', 'bracos', 'core'];
    const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
    
    const buildDay = (group1, group2) => {
        let dayEx = [];
        if (exerciseDB[group1]) dayEx.push(...shuffle(exerciseDB[group1]).slice(0, 3));
        if (group2 && exerciseDB[group2]) dayEx.push(...shuffle(exerciseDB[group2]).slice(0, 3));
        return dayEx.map(ex => ({ name: ex.name, type: ex.type, sets: sets, reps: reps, rest: rest }));
    };

    let wA, wB, wC;
    if (focuses.includes('peito') || focuses.includes('bracos')) {
        wA = buildDay('peito', 'bracos'); wB = buildDay('costas', 'core'); wC = buildDay('pernas', 'ombro');
    } else if (focuses.includes('pernas')) {
        wA = buildDay('pernas', 'core'); wB = buildDay('costas', 'bracos'); wC = buildDay('peito', 'ombro');
    } else {
        wA = buildDay('peito', 'ombro'); wB = buildDay('costas', 'bracos'); wC = buildDay('pernas', 'core');
    }
    return { 
        A: { title: "Treino A", focus: "Push / Foco Primário", exercises: wA },
        B: { title: "Treino B", focus: "Pull / Foco Secundário", exercises: wB },
        C: { title: "Treino C", focus: "Inferiores / Core", exercises: wC }
    };
}

function saveProfile() {
    triggerFeedback('click');
    const name = document.getElementById('input-name').value.trim();
    const age = parseInt(document.getElementById('input-age').value);
    const weight = parseFloat(document.getElementById('input-weight').value);
    const height = parseFloat(document.getElementById('input-height').value);
    const goal = document.getElementById('input-goal').value;

    const focusCheckboxes = document.querySelectorAll('.focus-cb:checked');
    let focuses = Array.from(focusCheckboxes).map(cb => cb.value);

    if (!name || !age || !weight || !height) return showToast("⚠️ Preencha todos os campos.");

    const diet = calcDietData(age, weight, height, goal);
    const workouts = generateWorkouts(focuses, goal);

    userData = { 
        name, age, weight, height, goal, focuses,
        tdee: diet.tdee, waterGoal: Math.round(weight * 40), 
        macros: { p: diet.protTarget, c: diet.carbTarget, f: diet.fatTarget },
        workouts: workouts
    };

    dailyLog = getDailyLog();
    saveState();
    updateDynamicGreeting();
    triggerFeedback('success'); fireConfetti(); showToast("✅ Smart Dashboard Inicializado!");
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
    userData.workouts = generateWorkouts(userData.focuses, newGoal); 

    saveState();
    triggerFeedback('success'); showToast("✅ Métricas atualizadas!");
}

function addWater(amount) {
    const waterBefore = (dailyLog.waterConsumed / userData.waterGoal) * 100;
    dailyLog.waterConsumed += amount;
    saveState();
    const waterAfter = (dailyLog.waterConsumed / userData.waterGoal) * 100;
    if (waterBefore < 100 && waterAfter >= 100) { triggerFeedback('success'); fireConfetti(); showToast("🎉 Meta de hidratação batida!"); } 
    else { triggerFeedback('click'); showToast(`💧 +${amount}ml registrados!`); }
}

function updateDynamicBar(elementId, textId, consumed, target) {
    const bar = document.getElementById(elementId);
    const text = document.getElementById(textId);
    if(!bar || !text) return;
    
    let safeTarget = target || 1;
    let ratio = consumed / safeTarget;
    let percent = Math.min(ratio * 100, 100);
    
    bar.style.width = `${percent}%`;
    text.innerText = `${Math.round(consumed)}g / ${target}g`;
    
    bar.classList.remove('bg-good', 'bg-warn', 'bg-danger', 'bg-amber-default');
    if (ratio <= 0.85) {
        bar.classList.add('bg-good');
    } else if (ratio > 0.85 && ratio <= 1.05) {
        bar.classList.add('bg-warn');
    } else {
        bar.classList.add('bg-danger');
    }
}

function updateSmartInsights(consumed) {
    const insightPill = document.getElementById('smart-insight-pill');
    const insightText = document.getElementById('smart-insight-text');
    const icon = document.getElementById('insight-icon');
    
    const hour = new Date().getHours();
    const protRatio = consumed.p / (userData.macros?.p || 1);
    const calRatio = consumed.kcal / (userData.tdee || 1);
    
    insightPill.style.borderColor = "var(--border-strong)";
    
    if (calRatio > 1.05) {
        icon.innerText = "⚠️";
        insightText.innerText = "Atenção: Você ultrapassou seu limite de calorias hoje.";
        insightPill.style.borderLeftColor = "var(--color-red)";
    } else if (hour > 14 && protRatio < 0.5) {
        icon.innerText = "🔥";
        insightText.innerText = `Foco na Proteína! Faltam ${Math.round(userData.macros.p - consumed.p)}g.`;
        insightPill.style.borderLeftColor = "var(--color-yellow)";
    } else if (calRatio > 0.8 && calRatio <= 1.0) {
        icon.innerText = "🎯";
        insightText.innerText = "Quase lá! Foco para não estourar a meta do dia.";
        insightPill.style.borderLeftColor = "var(--color-green)";
    } else if (dailyLog.waterConsumed >= userData.waterGoal) {
        icon.innerText = "💧";
        insightText.innerText = "Hidratação perfeita hoje. Excelente trabalho!";
        insightPill.style.borderLeftColor = "var(--blue-water)";
    } else {
        icon.innerText = "💡";
        insightText.innerText = "Tudo sob controle. Continue registrando seus hábitos.";
        insightPill.style.borderLeftColor = "var(--amber)";
    }
}

function updateDashboardUI() {
    let consumed = { kcal: 0, p: 0, c: 0, f: 0 };
    dailyLog.foods.forEach(f => { consumed.kcal += f.kcal; consumed.p += f.p; consumed.c += f.c; consumed.f += f.f; });

    document.getElementById('ui-tdee').innerText = `Meta diária: ${userData.tdee} kcal`;
    let calLeft = Math.max(0, userData.tdee - consumed.kcal);
    animateValue(document.getElementById('ui-calories'), parseInt(document.getElementById('ui-calories').innerText || 0), calLeft, 500);
    
    let calPercent = Math.min((consumed.kcal / userData.tdee) * 100, 100);
    const calBar = document.getElementById('cal-progress');
    calBar.style.width = `${calPercent}%`;
    calBar.classList.remove('bg-amber-default', 'bg-danger');
    calBar.classList.add(calPercent > 100 ? 'bg-danger' : 'bg-amber-default');

    updateDynamicBar('bar-prot', 'txt-p', consumed.p, userData.macros?.p);
    updateDynamicBar('bar-carb', 'txt-c', consumed.c, userData.macros?.c);
    updateDynamicBar('bar-fat', 'txt-f', consumed.f, userData.macros?.f);

    const waterPercent = Math.floor(Math.min((dailyLog.waterConsumed / userData.waterGoal) * 100, 100));
    document.getElementById('ui-water-status').innerText = `${dailyLog.waterConsumed} / ${userData.waterGoal} ml`;
    document.getElementById('water-percent').innerText = `${waterPercent}%`;

    updateSmartInsights(consumed);

    const logContainer = document.getElementById('food-log');
    logContainer.innerHTML = '';
    if (dailyLog.foods.length === 0) {
        logContainer.innerHTML = '<p style="text-align:center; color:var(--text-light); font-size:13px; padding: 25px 0;">Nenhuma refeição registrada hoje.</p>';
    } else {
        dailyLog.foods.forEach((food, index) => {
            const item = document.createElement('div');
            item.className = 'timeline-node stagger-item';
            item.style.animationDelay = `${index * 0.05}s`;
            const mealAssoc = mealNames.find(m => m.id === food.mealId);
            
            item.innerHTML = `
                <div class="node-dot active"></div>
                <div class="node-content">
                    <div>
                        <h4 class="node-title">${food.fullName}</h4>
                        <p class="node-sub">${mealAssoc.time} • ${mealAssoc.name}</p>
                    </div>
                    <div style="text-align: right;">
                        <span class="node-val">${Math.round(food.kcal)} kcal</span>
                        <button class="btn-remove-node" onclick="removeFood(${index})">✕</button>
                    </div>
                </div>
            `;
            logContainer.appendChild(item);
        });
    }
}

function removeFood(index) {
    triggerFeedback('click');
    dailyLog.foods.splice(index, 1);
    saveState();
}

function renderMeals() {
    const carousel = document.getElementById('meals-carousel');
    carousel.innerHTML = '';
    
    mealNames.forEach((meal, index) => {
        const mealFoods = dailyLog.foods.filter(f => f.mealId === meal.id);
        const mealKcal = mealFoods.reduce((acc, f) => acc + f.kcal, 0);
        
        let foodsHtml = mealFoods.length > 0 ? `<p class="meal-card-details">${mealFoods.map(f => f.baseName).join(', ')}</p>` : `<p class="meal-card-details" style="color:var(--text-light)">Sem registros</p>`;
        
        const card = document.createElement('div');
        card.className = `carousel-item meal-card stagger-item`;
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between;"><span class="meal-time">${meal.time}</span><span style="font-size:14px; font-weight:800; color:var(--text-main)">${Math.round(mealKcal)} kcal</span></div>
            <h4>${meal.icon} ${meal.name}</h4> ${foodsHtml}
            <button class="meal-card-btn hover-scale" onclick="openFoodModal('${meal.id}', '${meal.name}')">+ Adicionar</button>
        `;
        carousel.appendChild(card);
    });
}

// --- WIZARD SMART BUILDER ---
let currentMealForModal = null;

window.closeFoodModal = function() {
    document.getElementById('food-modal').classList.add('hidden');
    currentMealForModal = null;
    smartBuilderList = [];
    document.querySelector('.modal-tabs').classList.remove('hidden');
};

function openFoodModal(mealId, mealName) {
    triggerFeedback('click');
    currentMealForModal = mealId;
    document.getElementById('modal-meal-name').innerText = `Adicionar em ${mealName}`;
    document.getElementById('food-search').value = ""; 
    document.getElementById('smart-text-input').value = ""; 
    
    document.getElementById('food-modal').classList.remove('hidden');
    document.getElementById('builder-step-2').classList.add('hidden');
    
    document.querySelectorAll('.modal-tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('modal-tab-manual').classList.remove('hidden');
    
    document.querySelectorAll('.modal-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.modal-tab-btn')[0].classList.add('active');
    
    renderFoodList("");
}

function switchModalTab(tabType) {
    triggerFeedback('click');
    document.querySelectorAll('.modal-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.modal-tab-content').forEach(el => el.classList.add('hidden'));
    
    event.currentTarget.classList.add('active');
    document.getElementById(`modal-tab-${tabType}`).classList.remove('hidden');
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
    
    foodDB.bases.forEach(base => {
        if(base.name.toLowerCase().includes(term)) {
            if (base.meals.includes(currentMealForModal)) recommended.push(base);
            else others.push(base);
        }
    });
    
    if(recommended.length > 0) {
        dbList.innerHTML += `<h4 class="gradient-text-sub" style="font-size:13px; margin-bottom:10px; margin-top:10px;">Sugeridos para este horário</h4>`;
        recommended.forEach((base, index) => dbList.appendChild(createFoodItemElement(base, index)));
    }
    if(others.length > 0) {
        dbList.innerHTML += `<h4 class="gradient-text-sub" style="font-size:13px; margin: 20px 0 10px 0;">Menu Completo</h4>`;
        others.forEach((base, index) => dbList.appendChild(createFoodItemElement(base, index + recommended.length)));
    }
    if(recommended.length === 0 && others.length === 0) {
        dbList.innerHTML = `<p style="color:var(--text-light); text-align:center; font-size:13px; padding:20px;">Nenhum item encontrado.</p>`;
    }
}

function createFoodItemElement(base, delayIndex) {
    const div = document.createElement('div');
    div.className = 'food-db-item stagger-item';
    div.style.animationDelay = `${delayIndex * 0.05}s`;
    
    div.onclick = () => {
        smartBuilderList = [{ base: base, amount: base.defaultAmount, prepId: 'cozido', confidence: null }];
        openSmartReview();
    };
    
    div.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
             <span class="tier-dot tier-${base.tier}"></span>
            <div>
                <span style="font-weight:500; font-size:14px; color:white; display:block; margin-bottom:2px;">${base.name}</span>
                <span style="font-size: 11px; color: var(--text-light);">${base.measure} • P:${base.p} C:${base.c} G:${base.f}</span>
            </div>
        </div>
        <span style="font-weight:600; font-size: 14px; color:var(--text-main);">${base.kcal} kcal</span>
    `;
    return div;
}

// --- TEXT & VOICE PARSING ---
function processSmartText() {
    triggerFeedback('click');
    const input = document.getElementById('smart-text-input').value.toLowerCase();
    if(!input.trim()) return showToast("⚠️ Digite ou fale algo primeiro.");
    
    smartBuilderList = [];
    let foundSomething = false;
    
    foodDB.bases.forEach(base => {
        let keywordsToSearch = [base.name.toLowerCase()];
        if (base.keywords) keywordsToSearch = keywordsToSearch.concat(base.keywords.map(k => k.toLowerCase()));

        let baseFound = false;
        let matchQty = base.defaultAmount;

        for (let kw of keywordsToSearch) {
            const regex = new RegExp(`(?:(\\d+(?:[,.]\\d+)?)\\s*(?:g|ml|unidades|fatias|colher|colheres|scoop|scoops)?\\s*(?:de)?\\s*)?(${kw})\\b`, 'i');
            const match = regex.exec(input);
            if (match) {
                baseFound = true;
                if (match[1]) {
                    const numericVal = parseFloat(match[1].replace(',', '.'));
                    if (base.measure.includes('100g') || base.measure.includes('100ml')) matchQty = numericVal / 100;
                    else if (base.measure.includes('50g')) matchQty = numericVal / 50;
                    else matchQty = numericVal; 
                }
                break; 
            }
        }
        if (baseFound) {
            foundSomething = true;
            smartBuilderList.push({ base: base, amount: matchQty, prepId: 'cozido', confidence: null });
        }
    });

    if (foundSomething) {
        showToast("🔍 Alimentos identificados com sucesso!");
        openSmartReview();
    } else {
        showToast("❌ Não foi possível interpretar. Tente usar termos mais simples.");
    }
}

// MICROFONE NATIVO
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true; 
    recognition.interimResults = true; 

    recognition.onstart = function() { document.querySelector('.btn-mic').classList.add('listening'); };
    
    recognition.onresult = function(event) {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
        }
        if(finalTranscript) {
            const inputEl = document.getElementById('smart-text-input');
            inputEl.value += (inputEl.value && !inputEl.value.endsWith(' ') ? ' ' : '') + finalTranscript;
        }
    };

    recognition.onerror = function(event) {
        if(event.error !== 'no-speech') showToast("❌ Erro de voz: " + event.error);
        document.querySelector('.btn-mic').classList.remove('listening');
    };

    recognition.onend = function() {
        document.querySelector('.btn-mic').classList.remove('listening');
    };
}
function startDictation() {
    if (!recognition) return showToast("⚠️ Seu navegador não suporta voz. Requer HTTPS.");
    triggerFeedback('click');
    const micBtn = document.querySelector('.btn-mic');
    if (micBtn.classList.contains('listening')) {
        recognition.stop();
        showToast("🎙️ Captação finalizada.");
    } else { 
        showToast("🎙️ Pode falar! Estou ouvindo..."); 
        try { recognition.start(); } catch(e) { }
    }
}

// --- VISÃO COMPUTACIONAL (MOTOR LOCAL) ---
function startLocalImageScan(inputElement) {
    if (!inputElement.files || !inputElement.files[0]) return;
    const file = inputElement.files[0];
    const reader = new FileReader();

    triggerFeedback('click');
    const cameraArea = document.getElementById('camera-area');
    const scannerBox = document.getElementById('scanner-box');
    cameraArea.classList.add('hidden');
    scannerBox.classList.remove('hidden');

    reader.onloadend = async function() {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
            canvas.width = 100; canvas.height = 100; ctx.drawImage(img, 0, 0, 100, 100);
            const imageData = ctx.getImageData(0, 0, 100, 100).data;
            let colors = { green: 0, brownYellow: 0, white: 0, red: 0, total: 0 };

            for (let i = 0; i < imageData.length; i += 4) {
                let r = imageData[i], g = imageData[i+1], b = imageData[i+2], a = imageData[i+3];
                if (a < 128) continue; 
                let l = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
                if (l < 40) continue; 
                colors.total++;
                if (r > 200 && g > 200 && b > 200) colors.white++; 
                else if (g > r && g > b + 20) colors.green++; 
                else if (r > g + 30 && r > b + 30) colors.red++; 
                else if (r > 100 && g > 80 && b < 150 && r > b && g > b) colors.brownYellow++; 
            }

            let pct = { green: colors.green/colors.total, brown: colors.brownYellow/colors.total, white: colors.white/colors.total, red: colors.red/colors.total };
            let mappedItems = [];
            if (pct.green > 0.15) mappedItems.push({ base: foodDB.bases.find(f=>f.id==='salada'), confidence: pct.green });
            if (pct.white > 0.25) mappedItems.push({ base: foodDB.bases.find(f=>f.id==='arroz_branco'), confidence: pct.white });
            if (pct.brown > 0.35) mappedItems.push({ base: foodDB.bases.find(f=>f.id==='frango'), confidence: pct.brown });

            setTimeout(() => {
                inputElement.value = ""; scannerBox.classList.add('hidden'); cameraArea.classList.remove('hidden');
                if (mappedItems.length === 0) return showToast("❌ Não foi possível identificar pelas cores. Tente usar Texto.");
                smartBuilderList = mappedItems.map(i => ({ base: i.base, amount: i.base.defaultAmount, prepId: 'cozido', confidence: i.confidence }));
                triggerFeedback('success'); showToast("📸 Análise Concluída."); openSmartReview();
            }, 1500);
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
}

// --- WIZARD REVIEW ---
function openSmartReview() {
    document.querySelectorAll('.modal-tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelector('.modal-tabs').classList.add('hidden');
    document.getElementById('builder-step-2').classList.remove('hidden');
    document.getElementById('ai-context-msg').innerText = "";
    renderSmartReviewList();
}

function goBackToStep1() {
    triggerFeedback('click');
    document.getElementById('builder-step-2').classList.add('hidden');
    document.querySelector('.modal-tabs').classList.remove('hidden');
    document.getElementById('modal-tab-manual').classList.remove('hidden');
}

function discardSmartAssembly() {
    triggerFeedback('click');
    smartBuilderList = [];
    document.getElementById('builder-step-2').classList.add('hidden');
    document.querySelector('.modal-tabs').classList.remove('hidden');
    switchModalTab('photo'); 
    showToast("🗑️ Lista descartada.");
}

function renderSmartReviewList() {
    const list = document.getElementById('smart-review-list');
    list.innerHTML = '';
    let isFromAI = false;

    smartBuilderList.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'card matte-glass';
        div.style.marginBottom = '15px'; div.style.padding = '15px';
        
        let confBadge = "";
        if (item.confidence !== null) {
            isFromAI = true;
            let confPercent = Math.round(item.confidence * 100);
            let confClass = confPercent >= 50 ? 'conf-high' : 'conf-med';
            confBadge = `<span class="confidence-badge ${confClass}">🤖 Lente: ${confPercent}%</span>`;
        }

        let prepOptionsHtml = "";
        if (item.base.allowPrep) {
            let options = foodDB.preps.map(p => `<option value="${p.id}" ${item.prepId === p.id ? 'selected' : ''}>${p.name}</option>`).join('');
            prepOptionsHtml = `
                <div style="margin-top: 15px;">
                    <label style="font-size:11px; color:var(--text-light); display:block; margin-bottom:5px; text-transform:uppercase;">Modo de Preparo</label>
                    <select class="form-control" style="padding:10px; font-size:13px;" onchange="updateSmartItemPrep(${index}, this.value)">${options}</select>
                </div>
            `;
        }

        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h4 style="color:var(--text-main); margin:0; font-size:15px; font-weight: 500;">${item.base.name} ${confBadge}</h4>
                <button style="background:transparent; border:none; color:var(--text-light); font-size:24px; cursor:pointer;" onclick="removeSmartItem(${index})">×</button>
            </div>
            <div class="qty-control-wrapper">
                <span style="color:var(--text-light); font-size:12px;">Qtd (${item.base.measure})</span>
                <div class="qty-buttons">
                    <button class="qty-btn" onclick="updateSmartItemQty(${index}, -0.5)">-</button>
                    <span style="color:var(--text-main); font-weight:600; min-width: 25px; text-align:center; font-size:16px;">${item.amount}</span>
                    <button class="qty-btn" onclick="updateSmartItemQty(${index}, 0.5)">+</button>
                </div>
            </div>
            ${prepOptionsHtml}
        `;
        list.appendChild(div);
    });
    
    if(smartBuilderList.length === 0) list.innerHTML = `<p style="text-align:center; color:var(--text-light); padding: 20px;">Nenhum item na lista.</p>`;
    else if (isFromAI) document.getElementById('ai-context-msg').innerText = "✓ Análise concluída. Exclua o que for incorreto.";
    
    updateSmartLivePreview();
}

function updateSmartItemQty(index, delta) {
    triggerFeedback('click');
    if (smartBuilderList[index].amount + delta > 0) { smartBuilderList[index].amount += delta; renderSmartReviewList(); }
}

function updateSmartItemPrep(index, prepId) {
    smartBuilderList[index].prepId = prepId; updateSmartLivePreview();
}

function removeSmartItem(index) {
    triggerFeedback('click'); smartBuilderList.splice(index, 1); renderSmartReviewList();
}

function calculateSmartTotalMacros() {
    let total = { kcal: 0, p: 0, c: 0, f: 0 };
    smartBuilderList.forEach(item => {
        const qty = item.amount;
        total.kcal += item.base.kcal * qty; total.p += item.base.p * qty; total.c += item.base.c * qty; total.f += item.base.f * qty;
        if (item.base.allowPrep) {
            const prep = foodDB.preps.find(p => p.id === item.prepId);
            if (prep) { total.kcal += prep.kcal * qty; total.p += prep.p * qty; total.c += prep.c * qty; total.f += prep.f * qty; }
        }
    });
    return total;
}

function updateSmartLivePreview() {
    const macros = calculateSmartTotalMacros();
    document.getElementById('live-kcal').innerText = Math.round(macros.kcal);
    document.getElementById('live-prot').innerText = `${Math.round(macros.p)}g`;
    document.getElementById('live-carb').innerText = `${Math.round(macros.c)}g`;
    document.getElementById('live-fat').innerText = `${Math.round(macros.f)}g`;
}

function confirmSmartAssembly() {
    if (smartBuilderList.length === 0) return showToast("⚠️ Adicione itens antes de salvar.");
    triggerFeedback('success');
    
    smartBuilderList.forEach(item => {
        let prepName = "";
        if (item.base.allowPrep && item.prepId !== 'cozido') {
            const pObj = foodDB.preps.find(p => p.id === item.prepId);
            prepName = pObj ? ` (${pObj.name})` : "";
        }
        let iKcal = item.base.kcal * item.amount; let iP = item.base.p * item.amount; let iC = item.base.c * item.amount; let iF = item.base.f * item.amount;
        if (item.base.allowPrep) {
            const prep = foodDB.preps.find(p => p.id === item.prepId);
            if (prep) { iKcal += prep.kcal * item.amount; iP += prep.p * item.amount; iC += prep.c * item.amount; iF += prep.f * item.amount; }
        }
        dailyLog.foods.push({ mealId: currentMealForModal, baseName: item.base.name, fullName: `${item.amount}x ${item.base.name}${prepName}`, tier: item.base.tier, kcal: iKcal, p: iP, c: iC, f: iF });
    });

    saveState(); closeFoodModal(); 
    showToast("🍽️ Salvo no Diário!");
}

// --- TREINO (DASHBOARD PREMIUM E CARDS DETALHADOS) ---
function changeWorkout(tab, btnElement) {
    triggerFeedback('click'); currentWorkoutTab = tab;
    document.querySelectorAll('.btn-tab').forEach(btn => btn.classList.remove('active-tab'));
    btnElement.classList.add('active-tab'); renderWorkout(tab);
}

function renderWorkout(tab) {
    if (!userData || !userData.workouts) return; 

    const workoutData = userData.workouts[tab];
    document.getElementById('workout-title').innerText = workoutData.title;
    document.getElementById('w-focus').innerText = workoutData.focus.split('/')[0].trim();
    document.getElementById('w-ex-count').innerText = workoutData.exercises.length;
    
    const list = document.getElementById('workout-list');
    list.innerHTML = '';
    
    if(!dailyLog.workoutDone) dailyLog.workoutDone = { A:[], B:[], C:[] };
    
    let completedCount = dailyLog.workoutDone[tab].length;
    let totalEx = workoutData.exercises.length;
    
    let progressPct = totalEx > 0 ? Math.round((completedCount / totalEx) * 100) : 0;
    document.getElementById('w-progress-text').innerText = `${progressPct}%`;
    document.getElementById('w-progress-bar').style.width = `${progressPct}%`;

    workoutData.exercises.forEach((ex, index) => {
        const isDone = dailyLog.workoutDone[tab].includes(index);
        
        const card = document.createElement('div');
        card.className = `ex-card matte-glass stagger-item ${isDone ? 'done' : ''}`;
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="ex-header">
                <span class="ex-title">${ex.name}</span>
                <span class="ex-type">${ex.type}</span>
            </div>
            <div class="ex-details">
                <div class="ex-chip"><i>🔄</i> ${ex.sets}x${ex.reps}</div>
                <div class="ex-chip"><i>⏱️</i> ${ex.rest || '60s'}</div>
            </div>
            <button class="btn-check-ex ${isDone ? 'done' : ''}" onclick="toggleExercise('${tab}', ${index}, this)">
                ${isDone ? '✓ Concluído' : 'Marcar como Feito'}
            </button>
        `;
        list.appendChild(card);
    });
}

function toggleExercise(tab, index, element) {
    const isDone = dailyLog.workoutDone[tab].includes(index);
    if (isDone) {
        dailyLog.workoutDone[tab] = dailyLog.workoutDone[tab].filter(i => i !== index);
        triggerFeedback('click');
    } else {
        dailyLog.workoutDone[tab].push(index);
        triggerFeedback('success'); 
        showToast("💪 Excelente!");
    }
    saveState();
    renderWorkout(tab); // Re-renderiza para atualizar a barra de progresso do dashboard
}
