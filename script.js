/**
 * GoFit Premium Architect - Advanced NLP Nutrition Assistant
 * Pure Vanilla JS. No Forms. Natural Language Processing.
 */

class GoFitApp {
    constructor() {
        this.version = '8.2.0 PRO - Auto-Macro AI Estimator';
        
        // --- 1. MANIFEST NUTRICIONAL & BANCOS PESSOAIS ---
        this.nutritionDB = {
            categories: { 
                c1: 'Carboidratos', c2: 'Proteínas', c3: 'Gorduras', c4: 'Vegetais', 
                c5: 'Frutas', c6: 'Laticínios', c7: 'Receitas Comuns', c8: 'Industrializados' 
            },
            foods: {
                'f1': { name: 'Arroz Branco', baseQty: 100, macros: { cal: 130, prot: 2.5, carb: 28.1, fat: 0.2 }, tags: ['arroz', 'branco', 'carboidrato'], category: 'c1' },
                'f2': { name: 'Arroz Integral', baseQty: 100, macros: { cal: 112, prot: 2.6, carb: 23.5, fat: 0.9 }, tags: ['arroz', 'integral', 'carboidrato'], category: 'c1' },
                'f3': { name: 'Feijão Carioca', baseQty: 100, macros: { cal: 76, prot: 4.8, carb: 13.6, fat: 0.5 }, tags: ['feijao', 'feijão', 'carioca'], category: 'c1' },
                'f4': { name: 'Feijão Preto', baseQty: 100, macros: { cal: 77, prot: 4.5, carb: 14, fat: 0.5 }, tags: ['feijao', 'feijão', 'preto'], category: 'c1' },
                'f5': { name: 'Aveia', baseQty: 100, macros: { cal: 380, prot: 14.3, carb: 56.7, fat: 7.3 }, tags: ['aveia', 'flocos', 'mingau'], category: 'c1' },
                
                'f8': { name: 'Peito de Frango', baseQty: 100, macros: { cal: 165, prot: 31, carb: 0, fat: 3.6 }, tags: ['frango', 'peito', 'file'], category: 'c2' },
                'f9': { name: 'Carne Bovina (Patinho)', baseQty: 100, macros: { cal: 133, prot: 28, carb: 0, fat: 2.3 }, tags: ['carne', 'boi', 'patinho', 'moida'], category: 'c2' },
                'f10': { name: 'Tilápia', baseQty: 100, macros: { cal: 128, prot: 26, carb: 0, fat: 2.7 }, tags: ['peixe', 'tilapia', 'file'], category: 'c2' },
                'f11': { name: 'Ovo', baseQty: 50, macros: { cal: 77, prot: 6.3, carb: 0.6, fat: 5.3 }, tags: ['ovo', 'ovos', 'cozido', 'frito', 'mexido'], category: 'c2' },
                
                'f13': { name: 'Brócolis', baseQty: 100, macros: { cal: 35, prot: 2.4, carb: 7.2, fat: 0.4 }, tags: ['brocolis', 'vegetal', 'salada'], category: 'c4' },
                'f14': { name: 'Alface', baseQty: 100, macros: { cal: 15, prot: 1.4, carb: 2.9, fat: 0.2 }, tags: ['alface', 'folha', 'salada'], category: 'c4' },
                'f15': { name: 'Cenoura', baseQty: 100, macros: { cal: 41, prot: 0.9, carb: 9.6, fat: 0.2 }, tags: ['cenoura', 'legume', 'salada', 'ralada'], category: 'c4' },
                'f16': { name: 'Batata Doce', baseQty: 100, macros: { cal: 86, prot: 1.6, carb: 20.1, fat: 0.1 }, tags: ['batata', 'doce'], category: 'c4' },
                
                'f17': { name: 'Banana', baseQty: 100, macros: { cal: 89, prot: 1.1, carb: 23, fat: 0.3 }, tags: ['banana', 'fruta', 'doce', 'prata', 'nanica'], category: 'c5' },
                'f18': { name: 'Maçã', baseQty: 100, macros: { cal: 52, prot: 0.3, carb: 13.8, fat: 0.2 }, tags: ['maca', 'maçã', 'fruta'], category: 'c5' },
                
                'f20': { name: 'Azeite de Oliva', baseQty: 15, macros: { cal: 119, prot: 0, carb: 0, fat: 13.5 }, tags: ['azeite', 'oleo', 'gordura', 'oliva'], category: 'c3' },
                'f21': { name: 'Leite', baseQty: 200, macros: { cal: 120, prot: 6.4, carb: 9.6, fat: 6.4 }, tags: ['leite', 'integral', 'desnatado', 'liquido'], category: 'c6' },
                
                'f25': { name: 'Whey Protein', baseQty: 30, macros: { cal: 110, prot: 26, carb: 1, fat: 0 }, tags: ['whey', 'suplemento', 'proteina'], category: 'c8' },
                'f26': { name: 'Sal', baseQty: 1, macros: { cal: 0, prot: 0, carb: 0, fat: 0 }, tags: ['sal', 'tempero', 'sodio', 'cha'], category: 'c8' },
                
                'f27': { name: 'Requeijão', baseQty: 30, macros: { cal: 80, prot: 3.2, carb: 1, fat: 7.3 }, tags: ['requeijao', 'laticinio', 'cremoso'], category: 'c6' },
                'f28': { name: 'Maionese', baseQty: 12, macros: { cal: 40, prot: 0, carb: 1, fat: 4 }, tags: ['maionese', 'molho', 'gordura'], category: 'c3' },
                'f29': { name: 'Creme de Leite', baseQty: 15, macros: { cal: 37, prot: 0.3, carb: 0.7, fat: 3.5 }, tags: ['creme', 'leite', 'laticinio', 'caixinha'], category: 'c6' },
                'f30': { name: 'Salsinha', baseQty: 10, macros: { cal: 4, prot: 0.3, carb: 0.6, fat: 0 }, tags: ['salsinha', 'tempero', 'verde'], category: 'c4' }
            },
            // Bancos Salvos do Usuário
            userFoods: JSON.parse(localStorage.getItem('gofit_userFoods')) || {},
            userRecipes: JSON.parse(localStorage.getItem('gofit_userRecipes')) || {}
        };

        // --- 2. MOTOR DE INTELIGÊNCIA NATURAL E CÁLCULOS ---
        this.nutritionAI = {
            
            // NOVO: IA que estima macros com base nas palavras e categoria do alimento
            estimateMacros: (name, baseQty) => {
                let n = name.toLowerCase();
                let prot = 0, carb = 0, fat = 0;
                
                // Estimativas base para 100g baseadas em dicionário de palavras-chave
                if (n.includes('frango') || n.includes('carne') || n.includes('peixe') || n.includes('atum') || n.includes('porco') || n.includes('bife')) { prot = 25; fat = 5; carb = 0; }
                else if (n.includes('ovo')) { prot = 13; fat = 11; carb = 1; }
                else if (n.includes('arroz') || n.includes('macarrao') || n.includes('massa') || n.includes('tapioca')) { carb = 28; prot = 2.5; fat = 1; }
                else if (n.includes('pao') || n.includes('pão') || n.includes('torrada') || n.includes('bolo')) { carb = 50; prot = 9; fat = 5; }
                else if (n.includes('aveia') || n.includes('cereal')) { carb = 60; prot = 14; fat = 7; }
                else if (n.includes('whey') || n.includes('creatina')) { prot = 80; carb = 5; fat = 2; }
                else if (n.includes('leite') || n.includes('iogurte') || n.includes('coalhada')) { prot = 4; carb = 5; fat = 3; }
                else if (n.includes('queijo') || n.includes('requeijao') || n.includes('requeijão')) { prot = 22; fat = 25; carb = 2; }
                else if (n.includes('azeite') || n.includes('manteiga') || n.includes('oleo') || n.includes('óleo') || n.includes('maionese')) { fat = 80; prot = 0; carb = 0; }
                else if (n.includes('amendoim') || n.includes('castanha') || n.includes('noz')) { fat = 50; prot = 25; carb = 20; }
                else if (n.includes('doce') || n.includes('chocolate') || n.includes('açucar') || n.includes('acucar')) { carb = 70; fat = 20; prot = 5; }
                else if (n.includes('alface') || n.includes('brocolis') || n.includes('salada') || n.includes('cenoura') || n.includes('tomate')) { carb = 5; prot = 1; fat = 0; }
                else if (n.includes('fruta') || n.includes('banana') || n.includes('maca') || n.includes('maçã') || n.includes('uva')) { carb = 20; prot = 1; fat = 0; }
                else {
                    // Fallback para alimentos totalmente desconhecidos (média equilibrada baixa)
                    carb = 15; prot = 10; fat = 5;
                }

                // Ajusta os macros descobertos para a base informada pelo usuário
                let mult = baseQty / 100;
                let finalProt = prot * mult;
                let finalCarb = carb * mult;
                let finalFat = fat * mult;
                let finalCal = (finalProt * 4) + (finalCarb * 4) + (finalFat * 9);

                return {
                    cal: Math.round(finalCal),
                    prot: Math.round(finalProt * 10) / 10,
                    carb: Math.round(finalCarb * 10) / 10,
                    fat: Math.round(finalFat * 10) / 10
                };
            },

            analyzeIngredient: (foodId, qty, type = 'food') => {
                let dbRef;
                if (type === 'food') dbRef = this.nutritionDB.foods[foodId];
                else if (type === 'userFood') dbRef = this.nutritionDB.userFoods[foodId];
                else dbRef = this.nutritionDB.userRecipes[foodId];
                
                if (!dbRef) return null;
                
                let base = (type === 'food' || type === 'userFood') ? dbRef.baseQty : dbRef.totalWeight;
                let mult = qty / base;
                
                let baseMacros = (type === 'food' || type === 'userFood') ? dbRef.macros : this.nutritionAI.calculateRecipe(dbRef.ingredients);
                
                return {
                    cal: Math.round(baseMacros.cal * mult),
                    prot: Math.round(baseMacros.prot * mult * 10) / 10,
                    carb: Math.round(baseMacros.carb * mult * 10) / 10,
                    fat: Math.round(baseMacros.fat * mult * 10) / 10
                };
            },

            parseMealInput: (text) => {
                const items = text.split(/,|\se\s|\+/);
                const parsedResult = [];

                items.forEach(item => {
                    const cleanItem = item.trim();
                    if (!cleanItem) return;

                    const match = cleanItem.match(/^([\d.,]+)\s*(kg|g|mg|colher|colheres|unidade|unidades|un|und|ml|litro|litros|l)?\s*(?:de\s+)?(.*)/i);
                    
                    if (match) {
                        let qtyRaw = parseFloat(match[1].replace(',', '.'));
                        let unitRaw = match[2] ? match[2].toLowerCase() : 'unidade';
                        let foodQuery = match[3].trim().toLowerCase();

                        let bestMatch = this.nutritionAI.suggestFoodByText(foodQuery)[0];

                        if (bestMatch) {
                            let grams = qtyRaw;
                            if (unitRaw === 'kg' || unitRaw.startsWith('litro') || unitRaw === 'l') grams = qtyRaw * 1000;
                            if (unitRaw.startsWith('colher')) grams = qtyRaw * 15; 
                            if (unitRaw.startsWith('unidade') || unitRaw.startsWith('un')) {
                                grams = qtyRaw * (bestMatch.baseQty || 100); 
                            }

                            parsedResult.push({
                                foodId: bestMatch.id,
                                name: bestMatch.name,
                                type: bestMatch.type,
                                qty: grams,
                                originalText: cleanItem
                            });
                        }
                    }
                });

                return parsedResult;
            },

            suggestFoodByText: (query) => {
                const terms = query.replace(/ com /g, ' ').replace(/ de /g, ' ').split(/\s+/).filter(t => t.length > 1);
                const combined = this.getCombinedDatabase(); 
                
                let matches = combined.filter(item => {
                    let searchStr = item.name.toLowerCase() + " " + (item.tags ? item.tags.join(' ') : '');
                    return terms.every(term => searchStr.includes(term));
                });
                
                return matches;
            },

            calculateRecipe: (ingredientList) => {
                let macros = { cal: 0, prot: 0, carb: 0, fat: 0, totalWeight: 0 };
                
                ingredientList.forEach(ing => {
                    let dbRef;
                    if (ing.type === 'food') dbRef = this.nutritionDB.foods[ing.foodId];
                    else if (ing.type === 'userFood') dbRef = this.nutritionDB.userFoods[ing.foodId];
                    else dbRef = this.nutritionDB.userRecipes[ing.foodId];

                    if(!dbRef) return;

                    let base = (ing.type === 'food' || ing.type === 'userFood') ? dbRef.baseQty : dbRef.totalWeight;
                    let mult = ing.qty / base;
                    let m = (ing.type === 'food' || ing.type === 'userFood') ? dbRef.macros : this.nutritionAI.calculateRecipe(dbRef.ingredients);

                    macros.cal += m.cal * mult;
                    macros.prot += m.prot * mult;
                    macros.carb += m.carb * mult;
                    macros.fat += m.fat * mult;
                    macros.totalWeight += ing.qty;
                });
                
                return macros;
            },

            analyzeMealBalance: (dailyTotals, userMacros) => {
                let feedback = [];
                if(dailyTotals.tCal === 0) return feedback;

                const protPct = dailyTotals.tProt / userMacros.prot;
                const calPct = dailyTotals.tCal / userMacros.tdee;

                if (protPct < calPct - 0.15) feedback.push({ msg: "Você precisa de mais proteína! 🥩", style: "text-red-400 border-red-500/30 bg-red-500/10" });
                else if (protPct >= 0.8) feedback.push({ msg: "Excelente aporte de Proteínas! 💪", style: "text-green-400 border-green-500/30 bg-green-500/10" });

                if (dailyTotals.tFat > userMacros.fat + 5) feedback.push({ msg: "Cuidado com o excesso de gordura! ⚠️", style: "text-orange-400 border-orange-500/30 bg-orange-500/10" });
                if (dailyTotals.tCal > userMacros.tdee) feedback.push({ msg: "Déficit calórico quebrado. 🛑", style: "text-red-400 border-red-500/30 bg-red-500/10" });
                
                return feedback;
            }
        };

        // --- Bind de this para os submétodos ---
        this.nutritionAI.suggestFoodByText = this.nutritionAI.suggestFoodByText.bind(this);
        this.nutritionAI.calculateRecipe = this.nutritionAI.calculateRecipe.bind(this);
        this.nutritionAI.analyzeIngredient = this.nutritionAI.analyzeIngredient.bind(this);

        this.activeAssistantData = { mealId: '', parsedItems: [], totalMacros: null };

        // Treinos DB Original Mantido
        this.db = {
            exercises: {
                'p1': { name: 'Supino Reto com Barra', group: 'Peitoral', sets: '4x 8-10', type: 'Força', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80', steps: ['Deite-se no banco mantendo os pés firmes no chão.', 'Segure a barra com uma largura ligeiramente maior que os ombros.', 'Desça a barra controladamente até encostar no peitoral médio.', 'Empurre a barra de volta à posição inicial estendendo os braços.'] },
                'p2': { name: 'Supino Inclinado com Halteres', group: 'Peitoral', sets: '3x 10-12', type: 'Hipertrofia', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80', steps: ['Ajuste o banco em uma inclinação de 30 a 45 graus.', 'Com um halter em cada mão, posicione-os na altura do peito.', 'Empurre os halteres para cima até que se encontrem.', 'Retorne controladamente à posição inicial.'] },
                'l1': { name: 'Agachamento Livre', group: 'Pernas', sets: '4x 8-10', type: 'Força', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80', steps: ['Posicione a barra confortavelmente nos trapézios.', 'Mantenha os pés na largura dos ombros.', 'Agache flexionando joelhos e quadril como se fosse sentar.', 'Suba empurrando o chão através dos calcanhares.'] },
                'a1': { name: 'Rosca Direta', group: 'Braços', sets: '3x 10', type: 'Hipertrofia', image: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80', steps: ['Em pé, segure a barra com as palmas voltadas para cima.', 'Mantenha os cotovelos colados ao corpo.', 'Flexione os braços levantando o peso até contrair o bíceps.', 'Desça a barra devagar.'] }
            },
            workouts: { 'SEG': ['p1', 'p2'], 'TER': ['l1'], 'QUA': ['a1'], 'QUI': [], 'SEX': ['p1'] }
        };

        // --- AS 7 REFEIÇÕES RESTAURADAS ---
        this.mealTemplates = [
            { id: 'cafe', name: 'Café da Manhã', icon: 'fa-mug-saucer', time: '07:00', split: 0.20 },
            { id: 'lanche_manha', name: 'Lanche da Manhã', icon: 'fa-apple-whole', time: '10:00', split: 0.10 },
            { id: 'almoco', name: 'Almoço', icon: 'fa-bowl-food', time: '13:00', split: 0.25 },
            { id: 'lanche_tarde', name: 'Lanche da Tarde', icon: 'fa-cookie-bite', time: '16:00', split: 0.10 },
            { id: 'pre', name: 'Pré-Treino', icon: 'fa-bolt', time: '18:00', split: 0.15 },
            { id: 'jantar', name: 'Jantar', icon: 'fa-utensils', time: '20:30', split: 0.15 },
            { id: 'ceia', name: 'Ceia', icon: 'fa-moon', time: '22:30', split: 0.05 }
        ];

        this.user = JSON.parse(localStorage.getItem('gofit_user')) || null;
        this.daily = JSON.parse(localStorage.getItem('gofit_daily')) || this.getEmptyDaily();
        
        this.tempAvatarBase64 = null; 
        this.audioCtx = null;
        
        this.init();
    }

    getCombinedDatabase() {
        let combined = [];
        Object.keys(this.nutritionDB.foods).forEach(k => combined.push({ id: k, type: 'food', ...this.nutritionDB.foods[k] }));
        Object.keys(this.nutritionDB.userFoods).forEach(k => combined.push({ id: k, type: 'userFood', ...this.nutritionDB.userFoods[k] }));
        Object.keys(this.nutritionDB.userRecipes).forEach(k => combined.push({ id: k, type: 'userRecipe', ...this.nutritionDB.userRecipes[k] }));
        return combined;
    }

    getEmptyDaily() {
        return {
            date: new Date().toLocaleDateString(),
            water: 0,
            meals: { cafe: [], lanche_manha: [], almoco: [], lanche_tarde: [], pre: [], jantar: [], ceia: [] },
            workouts: []
        };
    }

    save() {
        if (this.user) localStorage.setItem('gofit_user', JSON.stringify(this.user));
        localStorage.setItem('gofit_daily', JSON.stringify(this.daily));
        localStorage.setItem('gofit_userFoods', JSON.stringify(this.nutritionDB.userFoods));
        localStorage.setItem('gofit_userRecipes', JSON.stringify(this.nutritionDB.userRecipes));
    }

    resetData() {
        this.showCustomConfirm('Tem certeza? Isso apagará todos os seus dados.', () => {
            localStorage.clear();
            location.reload();
        });
    }

    // --- Core Methods & Events ---
    init() {
        this.bindGlobalEvents();
        
        if (this.daily.date !== new Date().toLocaleDateString()) {
            this.daily = this.getEmptyDaily();
            this.save();
        } else {
            this.mealTemplates.forEach(m => {
                if(!this.daily.meals[m.id]) this.daily.meals[m.id] = [];
            });
            this.save();
        }

        if (!this.user) {
            this.navigate('login');
            document.getElementById('bottom-nav').classList.add('hidden');
        } else {
            document.getElementById('bottom-nav').classList.remove('hidden');
            this.updateAvatarsDOM();
            this.navigate('home');
        }
    }

    bindGlobalEvents() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.feedback('click');
                const tab = e.currentTarget.dataset.tab;
                
                document.querySelectorAll('.nav-btn').forEach(b => {
                    b.classList.remove('text-gold-500', 'scale-110', 'drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]');
                    b.classList.add('text-gray-500');
                });
                e.currentTarget.classList.add('text-gold-500', 'scale-110', 'drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]');
                e.currentTarget.classList.remove('text-gray-500');

                this.navigate(tab);
            });
        });

        document.getElementById('btn-login').addEventListener('click', () => this.handleLogin());

        const bindPhotoUpload = (inputId, previewId, saveImmediately) => {
            const input = document.getElementById(inputId);
            if(input) {
                input.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const base64 = event.target.result;
                            if (previewId) {
                                document.getElementById(previewId).src = base64;
                                document.getElementById(previewId).classList.remove('opacity-50');
                            }
                            if (saveImmediately && this.user) {
                                this.user.avatar = base64;
                                this.save();
                                this.updateAvatarsDOM();
                            } else {
                                this.tempAvatarBase64 = base64; 
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }
        };

        bindPhotoUpload('login-photo-upload', 'login-avatar-preview', false);
        bindPhotoUpload('profile-photo-change', null, true);

        document.querySelectorAll('.water-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.feedback('click');
                const amount = parseInt(e.currentTarget.dataset.amount);
                this.daily.water += amount;
                this.save();
                this.updateHomeUI();
                if(this.daily.water >= 3000 && this.daily.water - amount < 3000) this.fireConfetti();
            });
        });

        this.makeCarouselDraggable('meals-carousel');
        this.makeCarouselDraggable('calendar-carousel');
    }

    updateAvatarsDOM() {
        if(this.user && this.user.avatar) {
            document.getElementById('header-avatar').src = this.user.avatar;
            document.getElementById('profile-avatar').src = this.user.avatar;
        }
    }

    makeCarouselDraggable(id) {
        const slider = document.getElementById(id);
        if(!slider) return;
        let isDown = false; let startX; let scrollLeft;
        slider.addEventListener('mousedown', (e) => { isDown = true; slider.classList.add('active'); startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
        slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - slider.offsetLeft; const walk = (x - startX) * 2; slider.scrollLeft = scrollLeft - walk; });
    }

    navigate(view) {
        document.querySelectorAll('.section-view').forEach(el => el.classList.add('hidden'));
        const target = document.getElementById(`view-${view}`);
        if(target) {
            target.classList.remove('hidden');
            if(view === 'home') this.updateHomeUI();
            if(view === 'treino') this.renderTreinoUI();
            if(view === 'perfil') this.renderProfileUI();
            if(view === 'receitas') this.renderReceitasUI();
        }
    }

    feedback(type) {
        if (navigator.vibrate) {
            if (type === 'click') navigator.vibrate(40);
            if (type === 'success') navigator.vibrate([80, 40, 80]);
        }
        try {
            if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.connect(gain); gain.connect(this.audioCtx.destination);
            if (type === 'click') {
                osc.type = 'sine'; osc.frequency.setValueAtTime(400, this.audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(200, this.audioCtx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.1);
                osc.start(); osc.stop(this.audioCtx.currentTime + 0.1);
            }
        } catch(e) {}
    }

    fireConfetti() {
        this.feedback('success');
        for (let i = 0; i < 40; i++) {
            const conf = document.createElement('div');
            conf.style.cssText = `position:fixed; width:8px; height:8px; background-color:${['#D4AF37', '#E8C56A', '#3b82f6'][Math.floor(Math.random()*3)]}; top:-10px; left:${Math.random()*100}vw; z-index:9999; pointer-events:none;`;
            document.body.appendChild(conf);
            conf.animate([{ transform: 'translate3d(0,0,0) rotate(0)', opacity: 1 }, { transform: `translate3d(${Math.random()*100-50}px, 100vh, 0) rotate(${Math.random()*720}deg)`, opacity: 0 }], { duration: 1500 + Math.random()*1000, easing: 'ease-in' }).onfinish = () => conf.remove();
        }
    }

    animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    showCustomAlert(msg, title = "Assistente", icon = "fa-robot") {
        this.feedback('click');
        const cont = document.getElementById('assistant-container');
        cont.innerHTML = `
            <div id="custom-alert" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-6 animate-fade-in">
                <div class="glass-card p-6 w-full max-w-sm text-center border border-gold-500/30 animate-slide-up">
                    <i class="fa-solid ${icon} text-3xl text-gold-500 mb-4 drop-shadow-md"></i>
                    <h3 class="text-lg font-bold text-white mb-2">${title}</h3>
                    <p class="text-sm text-gray-400 mb-6 leading-relaxed">${msg}</p>
                    <button onclick="document.getElementById('custom-alert').remove()" class="w-full py-3 rounded-xl bg-gold-500 text-dark-900 font-bold hover:bg-gold-400 transition-colors">Entendido</button>
                </div>
            </div>
        `;
    }

    showCustomConfirm(msg, onConfirm, title = "Atenção") {
        this.feedback('click');
        const cont = document.getElementById('assistant-container');
        cont.innerHTML = `
            <div id="custom-confirm" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-6 animate-fade-in">
                <div class="glass-card p-6 w-full max-w-sm text-center border border-red-500/20 animate-slide-up">
                    <i class="fa-solid fa-triangle-exclamation text-3xl text-red-500 mb-4 drop-shadow-md"></i>
                    <h3 class="text-lg font-bold text-white mb-2">${title}</h3>
                    <p class="text-sm text-gray-400 mb-6">${msg}</p>
                    <div class="flex gap-3">
                        <button onclick="document.getElementById('custom-confirm').remove()" class="flex-1 py-3 rounded-xl bg-dark-800 text-gray-400 font-bold border border-white/10">Cancelar</button>
                        <button id="btn-confirm-action" class="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-400 transition-colors">Confirmar</button>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('btn-confirm-action').addEventListener('click', () => { document.getElementById('custom-confirm').remove(); onConfirm(); });
    }

    // --- REGRAS DE LOGIN & TOTAIS ---
    handleLogin() {
        const name = document.getElementById('login-name').value || 'Atleta';
        const weight = parseFloat(document.getElementById('login-weight').value) || 80;
        const height = parseFloat(document.getElementById('login-height').value) || 175;
        const age = parseFloat(document.getElementById('login-age').value) || 25;
        const gender = document.getElementById('login-gender').value;
        const activityMult = parseFloat(document.getElementById('login-activity').value);
        const goal = document.getElementById('login-goal').value;

        let bmr = gender === 'M' ? (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)) : (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age));
        let tdee = bmr * activityMult;
        let goalText = goal === 'lose' ? "Emagrecimento" : goal === 'gain' ? "Hipertrofia" : "Manutenção";
        tdee += goal === 'lose' ? -500 : goal === 'gain' ? 500 : 0;
        tdee = Math.round(tdee);

        const prot = Math.round(weight * 2.2);
        const fat = Math.round(weight * 1.0);
        const carb = Math.max(0, Math.round((tdee - (prot*4 + fat*9)) / 4));

        this.user = { name, weight, height, age, gender, goalText, tdee, macros: { prot, carb, fat }, avatar: this.tempAvatarBase64 };
        this.save();
        this.feedback('success');
        this.init(); 
    }

    calculateDailyTotals() {
        let tCal = 0, tProt = 0, tCarb = 0, tFat = 0;
        Object.values(this.daily.meals).forEach(arr => {
            arr.forEach(f => { tCal+=f.cal; tProt+=f.prot; tCarb+=f.carb; tFat+=f.fat; });
        });
        return { tCal, tProt, tCarb, tFat };
    }

    // --- RENDERIZAÇÃO BASE ---
    updateHomeUI() {
        if(!this.user) return;
        document.getElementById('header-date').innerText = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        document.getElementById('user-display-name').innerText = this.user.name;

        const totals = this.calculateDailyTotals();
        this.animateValue('dash-cals', 0, Math.max(0, this.user.tdee - totals.tCal), 1000);
        document.getElementById('dash-tdee-total').innerText = `Meta: ${this.user.tdee} kcal`;
        document.getElementById('total-kcal-ingeridas').innerText = `${Math.round(totals.tCal)} kcal`;
        document.getElementById('circle-cals').style.strokeDasharray = `${Math.min((totals.tCal / this.user.tdee) * 100, 100)}, 100`;

        const uBar = (id, c, m) => { document.getElementById(`bar-${id}`).style.width = `${Math.min((c/m)*100, 100)}%`; document.getElementById(`text-${id}`).innerText = `${Math.round(c)}/${m}g`; };
        uBar('prot', totals.tProt, this.user.macros.prot); uBar('carb', totals.tCarb, this.user.macros.carb); uBar('fat', totals.tFat, this.user.macros.fat);

        document.getElementById('bar-water').style.width = `${Math.min((this.daily.water / 3000) * 100, 100)}%`;
        document.getElementById('water-text').innerText = `${this.daily.water} / 3000ml`;

        this.renderMealsCarousel();
        this.renderNutritionalFeedback(totals);
    }

    renderNutritionalFeedback(totals) {
        const c = document.getElementById('nutrition-feedback');
        if(!c) return;
        c.innerHTML = '';
        let msgs = this.nutritionAI.analyzeMealBalance(totals, this.user.macros);
        msgs.forEach(m => c.innerHTML += `<div class="px-3 py-1.5 rounded-lg text-[10px] font-bold border w-full flex items-center ${m.style}">${m.msg}</div>`);
    }

    renderMealsCarousel() {
        const c = document.getElementById('meals-carousel');
        c.innerHTML = '';
        this.mealTemplates.forEach((m) => {
            const items = this.daily.meals[m.id];
            const calTotal = items.reduce((acc, i) => acc + i.cal, 0);
            const isCompleted = calTotal > (Math.round(this.user.tdee * m.split) * 0.5);

            let ulHtml = items.length === 0 ? `<div class="h-16 flex items-center justify-center text-[10px] text-gray-600 border border-dashed border-white/10 rounded-xl">Nenhum registro</div>` :
                `<ul class="space-y-1.5 h-16 overflow-y-auto hide-scrollbar">` + items.map((i, index) => `
                <li class="flex justify-between items-center text-[11px]">
                    <span class="text-gray-300 truncate pr-2">• ${i.qty}g ${i.name}</span>
                    <div class="flex items-center gap-2">
                        <span class="text-gold-400 font-bold">${Math.round(i.cal)}</span>
                        <button onclick="app.removeDailyFood('${m.id}', ${index})" class="text-red-500 hover:text-red-400"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </li>`).join('') + `</ul>`;

            c.innerHTML += `
                <div class="meal-card-pro p-4 flex flex-col justify-between ${isCompleted ? 'completed' : ''}">
                    <div>
                        <div class="flex justify-between items-start mb-3">
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 rounded-full bg-dark-900 border border-gold-500/30 flex items-center justify-center text-gold-500"><i class="fa-solid ${m.icon} text-xs"></i></div>
                                <div><h3 class="text-sm font-bold text-white leading-tight">${m.name}</h3></div>
                            </div>
                            <div class="text-right">
                                <span class="text-sm font-extrabold text-white block">${Math.round(calTotal)}</span>
                                <span class="text-[9px] text-gray-500">kcal</span>
                            </div>
                        </div>
                        ${ulHtml}
                    </div>
                    <button onclick="app.openSmartAssistant('${m.id}')" class="mt-4 w-full py-2.5 rounded-xl bg-dark-900 text-gold-500 font-bold text-xs border border-gold-500/20 hover:bg-gold-500 hover:text-dark-900 transition-all">
                        <i class="fa-solid fa-microphone-lines mr-1"></i> Ditar Refeição
                    </button>
                </div>
            `;
        });
    }

    removeDailyFood(mealId, index) {
        this.daily.meals[mealId].splice(index, 1);
        this.save();
        this.updateHomeUI();
        this.feedback('click');
    }

    renderTreinoUI() {
        const cal = document.getElementById('calendar-carousel');
        cal.innerHTML = '';
        const days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];
        const todayIdx = new Date().getDay() - 1;

        days.forEach((d, i) => {
            const isToday = i === (todayIdx >= 0 && todayIdx < 5 ? todayIdx : 0);
            cal.innerHTML += `<div class="flex-shrink-0 w-14 h-16 rounded-2xl flex flex-col items-center justify-center transition-all ${isToday ? 'bg-gold-500 text-dark-900 shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105' : 'bg-dark-800 text-gray-500 border border-white/5'}"><span class="text-[10px] font-bold">${d}</span><span class="text-lg font-extrabold">${10 + i}</span></div>`;
        });

        this.renderExerciseList('all');
    }

    renderExerciseList(filterStr) {
        const c = document.getElementById('workouts-container');
        c.innerHTML = '';
        let exList = this.db.workouts['SEG'].map(id => ({id, ...this.db.exercises[id]}));
        if(filterStr !== 'all') exList = Object.keys(this.db.exercises).map(k => ({id:k, ...this.db.exercises[k]})).filter(ex => ex.group === filterStr);
        if(exList.length === 0) { c.innerHTML = '<p class="text-center text-gray-500 text-sm mt-10">Nenhum treino para este grupo.</p>'; return; }

        exList.forEach(ex => {
            const isDone = this.daily.workouts.includes(ex.id);
            c.innerHTML += `
                <div class="glass-card p-4 flex items-center justify-between border ${isDone ? 'border-gold-500/40 bg-gold-900/10' : 'border-white/5'} transition-all hover:bg-white/5">
                    <div class="flex items-center gap-4 cursor-pointer" onclick="app.openExerciseModal('${ex.id}')">
                        <div class="w-12 h-12 rounded-xl bg-dark-900 overflow-hidden border border-white/10 flex-shrink-0"><img src="${ex.image}" class="w-full h-full object-cover opacity-80"></div>
                        <div><h3 class="font-bold text-sm ${isDone ? 'text-gold-500 line-through opacity-80' : 'text-white'} transition-all">${ex.name}</h3><div class="flex gap-2 mt-1"><span class="text-[9px] text-gray-400 bg-dark-900 px-1.5 py-0.5 rounded border border-white/5"><i class="fa-solid fa-dumbbell text-gold-600 mr-1"></i>${ex.sets}</span><span class="text-[9px] text-gray-400 bg-dark-900 px-1.5 py-0.5 rounded border border-white/5">${ex.group}</span></div></div>
                    </div>
                    <input type="checkbox" class="chk-premium flex-shrink-0" data-id="${ex.id}" ${isDone ? 'checked' : ''} onchange="app.toggleWorkout('${ex.id}', this)">
                </div>
            `;
        });
    }

    openExerciseModal(id) {
        const ex = this.db.exercises[id];
        if(!ex) return;
        const mObj = document.getElementById('modal-container');
        mObj.innerHTML = `
            <div id="exercise-modal" class="fixed inset-0 bg-dark-900/95 backdrop-blur-xl z-[100] flex flex-col animate-slide-up">
                <div class="relative w-full h-64 bg-dark-800"><img src="${ex.image}" class="w-full h-full object-cover opacity-60"><div class="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div><button onclick="document.getElementById('exercise-modal').remove()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-dark-900/50 backdrop-blur-md text-white flex items-center justify-center border border-white/20"><i class="fa-solid fa-xmark text-lg"></i></button><div class="absolute bottom-6 left-6 right-6"><span class="px-3 py-1 bg-gold-500 text-dark-900 font-bold text-[10px] uppercase tracking-widest rounded-full mb-2 inline-block">${ex.group}</span><h2 class="text-2xl font-extrabold text-white leading-tight">${ex.name}</h2></div></div>
                <div class="p-6 flex-1 overflow-y-auto"><h3 class="text-sm font-bold text-white mb-4 uppercase tracking-widest border-b border-white/5 pb-2">Guia de Execução</h3><ol class="custom-counter">${ex.steps.map(step => `<li>${step}</li>`).join('')}</ol></div>
            </div>
        `;
    }

    toggleWorkout(id, el) {
        this.feedback('click');
        if(el.checked) { this.daily.workouts.push(id); this.fireConfetti(); } 
        else { this.daily.workouts = this.daily.workouts.filter(x => x !== id); }
        this.save();
        const card = el.closest('.glass-card'); const title = card.querySelector('h3');
        if(el.checked) { card.classList.add('border-gold-500/40', 'bg-gold-900/10'); card.classList.remove('border-white/5'); title.classList.add('text-gold-500', 'line-through', 'opacity-80'); title.classList.remove('text-white'); } 
        else { card.classList.remove('border-gold-500/40', 'bg-gold-900/10'); card.classList.add('border-white/5'); title.classList.remove('text-gold-500', 'line-through', 'opacity-80'); title.classList.add('text-white'); }
    }

    renderProfileUI() {
        if(!this.user) return;
        document.getElementById('profile-name').innerText = this.user.name;
        document.getElementById('prof-peso').innerText = this.user.weight;
        document.getElementById('prof-imc').innerText = (this.user.weight / Math.pow(this.user.height/100, 2)).toFixed(1);
        document.getElementById('prof-treinos').innerText = this.daily.workouts.length;
        document.getElementById('prof-tdee').innerText = `${this.user.tdee} kcal`;
        document.getElementById('prof-goal').innerText = this.user.goalText || 'Não definido';
    }


    // ============================================================================
    // THE SMART ASSISTANT FLOW (NLP PARSER UI)
    // ============================================================================

    openSmartAssistant(mealId) {
        this.feedback('click');
        this.activeAssistantData = { mealId: mealId, parsedItems: [], totalMacros: null };

        const cont = document.getElementById('assistant-container');
        cont.innerHTML = `
            <div id="smart-assistant" class="fixed inset-0 bg-dark-900/95 backdrop-blur-xl z-[150] flex flex-col animate-slide-up">
                <div class="p-5 border-b border-white/5 flex justify-between items-center bg-dark-900">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                            <i class="fa-solid fa-robot text-gold-500"></i>
                        </div>
                        <div>
                            <p class="text-[10px] text-gold-500 uppercase font-bold tracking-widest">Assistente IA</p>
                            <h2 class="text-sm font-extrabold text-white capitalize">${mealId.replace('_', ' ')}</h2>
                        </div>
                    </div>
                    <button onclick="document.getElementById('smart-assistant').remove()" class="w-10 h-10 rounded-full bg-dark-800 text-gray-400 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <div class="p-6 flex-1 flex flex-col" id="assistant-body">
                    <div class="bg-dark-800 border border-white/5 rounded-2xl p-4 mb-6 relative">
                        <i class="fa-solid fa-caret-left absolute -left-2 top-4 text-dark-800 text-2xl"></i>
                        <p class="text-sm text-gray-300 leading-relaxed">Olá! Diga ou escreva para mim o que você comeu.<br><br>Por exemplo: <span class="text-gold-400 font-bold">"200g de frango, 2 colheres de azeite e 100g de arroz"</span>.</p>
                    </div>

                    <textarea id="ai-input" rows="4" class="input-premium bg-dark-800 text-sm mb-4 resize-none shadow-inner" placeholder="Digite sua refeição aqui..."></textarea>
                    
                    <div class="flex gap-2 mt-auto">
                        <button class="flex-1 py-4 bg-dark-800 border border-blue-500/30 rounded-xl text-xs font-bold text-blue-400 flex flex-col items-center justify-center gap-1 hover:bg-blue-500/10 transition-colors" id="btn-voice-ai" onclick="app.startSmartVoice()">
                            <i class="fa-solid fa-microphone text-xl mb-1"></i> Falar
                        </button>
                        <button class="flex-[2] py-4 rounded-xl bg-gradient-gold text-dark-900 font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-transform" onclick="app.processSmartInput()">
                            Interpretar Receita <i class="fa-solid fa-wand-magic-sparkles ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    startSmartVoice() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) { this.showCustomAlert("Microfone não suportado no seu navegador."); return; }

        const recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';
        recognition.start();

        const btn = document.getElementById('btn-voice-ai');
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-waveform text-xl mb-1 animate-pulse"></i> Ouvindo...';
        btn.classList.add('bg-blue-500/20');

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('ai-input').value = transcript;
            btn.innerHTML = originalHtml; btn.classList.remove('bg-blue-500/20');
            this.feedback('success');
        };
        recognition.onerror = () => {
            btn.innerHTML = originalHtml; btn.classList.remove('bg-blue-500/20');
            this.showCustomAlert("Não consegui ouvir com clareza. Tente novamente.");
        }
    }

    processSmartInput() {
        const text = document.getElementById('ai-input').value;
        if(!text.trim()) { this.showCustomAlert("Você precisa me dizer o que comeu."); return; }

        this.feedback('click');
        
        const parsedItems = this.nutritionAI.parseMealInput(text);
        if(parsedItems.length === 0) {
            this.showCustomAlert("Não consegui identificar nenhum alimento conhecido com quantidades. Tente usar números (ex: 100g) seguidos do nome do alimento.");
            return;
        }

        this.activeAssistantData.parsedItems = parsedItems;
        const macros = this.nutritionAI.calculateRecipe(parsedItems);
        this.activeAssistantData.totalMacros = macros;

        const itemsHtml = parsedItems.map(item => `
            <div class="flex justify-between items-center border-b border-white/5 py-2 text-xs">
                <span class="text-white"><i class="fa-solid fa-check text-green-500 mr-2"></i>${item.name}</span>
                <span class="text-gold-500 font-bold">${item.qty}g</span>
            </div>
        `).join('');

        const body = document.getElementById('assistant-body');
        body.innerHTML = `
            <div class="bg-dark-800 border border-white/5 rounded-2xl p-4 mb-4 relative">
                <p class="text-sm text-gray-300">Entendido! Encontrei os seguintes alimentos e fiz a conversão para gramas:</p>
            </div>
            
            <div class="glass-card p-4 mb-6 max-h-40 overflow-y-auto hide-scrollbar">
                ${itemsHtml}
                <div class="mt-3 pt-3 border-t border-dashed border-white/20 flex justify-between items-center">
                    <span class="text-xs text-gray-400 font-bold uppercase">Peso Total Calculado:</span>
                    <span class="text-sm text-white font-extrabold">${macros.totalWeight}g</span>
                </div>
            </div>

            <div class="bg-dark-800 border border-white/5 rounded-2xl p-4 mb-4 relative">
                <p class="text-sm text-gold-400 font-bold mb-3">Como você consumiu isso?</p>
                
                <div class="grid grid-cols-2 gap-3">
                    <div class="flex flex-col">
                        <label class="text-[9px] text-gray-500 uppercase font-bold ml-1 mb-1">Dividir em N Porções</label>
                        <input type="number" id="input-portions" value="1" min="1" class="input-premium py-2 text-center text-sm" oninput="document.getElementById('input-grams').value = ''">
                    </div>
                    <div class="flex flex-col">
                        <label class="text-[9px] text-gray-500 uppercase font-bold ml-1 mb-1">Peso da sua Porção (g)</label>
                        <input type="number" id="input-grams" placeholder="${macros.totalWeight}g" class="input-premium py-2 text-center text-sm" oninput="document.getElementById('input-portions').value = ''">
                    </div>
                </div>
            </div>

            <button onclick="app.finalizeSmartMeal()" class="mt-auto w-full py-4 rounded-xl bg-gradient-gold text-dark-900 font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-transform">
                Visualizar Macros <i class="fa-solid fa-arrow-right ml-2"></i>
            </button>
        `;
    }

    finalizeSmartMeal() {
        this.feedback('click');
        let portionsRaw = document.getElementById('input-portions').value;
        let gramsRaw = document.getElementById('input-grams').value;
        
        let fraction = 1;
        const totalW = this.activeAssistantData.totalMacros.totalWeight;

        if (gramsRaw && !isNaN(parseFloat(gramsRaw))) {
            fraction = parseFloat(gramsRaw) / totalW;
        } else if (portionsRaw && !isNaN(parseInt(portionsRaw))) {
            fraction = 1 / parseInt(portionsRaw);
        }

        const tm = this.activeAssistantData.totalMacros;
        const finalMacros = {
            cal: tm.cal * fraction,
            prot: tm.prot * fraction,
            carb: tm.carb * fraction,
            fat: tm.fat * fraction
        };

        const body = document.getElementById('assistant-body');
        body.innerHTML = `
            <div class="bg-dark-800 border border-white/5 rounded-2xl p-4 mb-4 text-center">
                <i class="fa-solid fa-check-circle text-4xl text-green-500 mb-2 drop-shadow-md"></i>
                <h3 class="text-white font-bold text-lg">Cálculo Concluído</h3>
                <p class="text-[10px] text-gray-500 uppercase mt-1">Sua Porção Calculada (Aprox. ${Math.round(totalW * fraction)}g)</p>
            </div>

            <div class="grid grid-cols-2 gap-3 mb-6">
                <div class="glass-card p-4 text-center border-gold-500/20 bg-gold-900/10">
                    <div class="text-2xl font-extrabold text-gold-500">${Math.round(finalMacros.cal)}</div>
                    <div class="text-[10px] text-gold-400 uppercase font-bold">Kcal Totais</div>
                </div>
                <div class="grid grid-rows-3 gap-2">
                    <div class="glass-card px-3 py-1.5 flex justify-between items-center"><span class="text-[10px] text-gray-400">Proteína</span><span class="text-xs font-bold text-white">${(finalMacros.prot).toFixed(1)}g</span></div>
                    <div class="glass-card px-3 py-1.5 flex justify-between items-center"><span class="text-[10px] text-gray-400">Carbo</span><span class="text-xs font-bold text-white">${(finalMacros.carb).toFixed(1)}g</span></div>
                    <div class="glass-card px-3 py-1.5 flex justify-between items-center"><span class="text-[10px] text-gray-400">Gordura</span><span class="text-xs font-bold text-white">${(finalMacros.fat).toFixed(1)}g</span></div>
                </div>
            </div>

            <div class="flex gap-2 mt-auto">
                <button onclick="document.getElementById('smart-assistant').remove()" class="flex-1 py-4 rounded-xl bg-dark-800 text-gray-400 font-bold text-xs border border-white/10">Cancelar</button>
                <button onclick="app.commitSmartMeal(${fraction})" class="flex-[2] py-4 rounded-xl bg-green-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(34,197,94,0.4)] active:scale-95 transition-transform">
                    Registrar Consumo <i class="fa-solid fa-check ml-2"></i>
                </button>
            </div>
        `;
    }

    commitSmartMeal(fraction) {
        this.feedback('success');
        const mealId = this.activeAssistantData.mealId;
        const items = this.activeAssistantData.parsedItems;

        items.forEach(item => {
            const fractionedQty = item.qty * fraction;
            const fractionedMacros = this.nutritionAI.analyzeIngredient(item.foodId, fractionedQty, item.type);
            
            if (fractionedMacros) {
                this.daily.meals[mealId].push({
                    id: item.foodId,
                    name: item.name,
                    qty: Math.round(fractionedQty),
                    ...fractionedMacros
                });
            }
        });

        this.save();
        this.updateHomeUI();
        document.getElementById('smart-assistant').remove();
    }


    // ============================================================================
    // GERENCIADOR DE BANCO DE DADOS PESSOAL E ABA DE RECEITAS
    // ============================================================================

    renderReceitasUI() {
        const c = document.getElementById('user-db-list');
        c.innerHTML = '';
        
        let hasItems = false;

        // Render User Recipes
        Object.keys(this.nutritionDB.userRecipes).forEach(k => {
            hasItems = true;
            const item = this.nutritionDB.userRecipes[k];
            c.innerHTML += `
                <div class="glass-card p-3 flex justify-between items-center border border-gold-500/20">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-dark-900 border border-gold-500/30 flex items-center justify-center text-gold-500">
                            <i class="fa-solid fa-book-open text-xs"></i>
                        </div>
                        <div>
                            <span class="text-xs font-bold text-white block">${item.name}</span>
                            <span class="text-[10px] text-gray-500">Rendimento: ${item.totalWeight}g</span>
                        </div>
                    </div>
                    <button onclick="app.deleteFromDatabase('userRecipes', '${k}')" class="text-red-500 p-2 active:scale-90"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
        });

        // Render User Foods
        Object.keys(this.nutritionDB.userFoods).forEach(k => {
            hasItems = true;
            const item = this.nutritionDB.userFoods[k];
            c.innerHTML += `
                <div class="glass-card p-3 flex justify-between items-center border border-blue-500/20">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-dark-900 border border-blue-500/30 flex items-center justify-center text-blue-400">
                            <i class="fa-solid fa-apple-whole text-xs"></i>
                        </div>
                        <div>
                            <span class="text-xs font-bold text-white block">${item.name}</span>
                            <span class="text-[10px] text-gray-500">Base: ${item.baseQty}g | ${item.macros.cal} kcal</span>
                        </div>
                    </div>
                    <button onclick="app.deleteFromDatabase('userFoods', '${k}')" class="text-red-500 p-2 active:scale-90"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
        });

        if(!hasItems) {
            c.innerHTML = '<div class="text-center text-gray-600 text-xs py-8 border border-dashed border-white/10 rounded-xl">Seu banco pessoal está vazio.<br>Cadastre seus alimentos e receitas para usá-los no Assistente IA.</div>';
        }
    }

    openCustomFoodModal() {
        this.feedback('click');
        const mObj = document.getElementById('modal-container');
        mObj.innerHTML = `
            <div id="custom-food-builder" class="fixed inset-0 bg-dark-900/95 backdrop-blur-xl z-[150] flex flex-col animate-slide-up">
                <div class="p-5 border-b border-white/5 flex justify-between items-center bg-dark-900">
                    <div>
                        <p class="text-[10px] text-blue-400 uppercase font-bold tracking-widest">Banco Pessoal</p>
                        <h2 class="text-xl font-extrabold text-white">Novo Alimento</h2>
                    </div>
                    <button onclick="document.getElementById('custom-food-builder').remove()" class="w-10 h-10 rounded-full bg-dark-800 text-gray-400 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>
                <div class="p-5 flex-1 overflow-y-auto flex flex-col justify-center space-y-6">
                    
                    <div class="text-center">
                        <i class="fa-solid fa-wand-magic-sparkles text-4xl text-blue-400 mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"></i>
                        <h3 class="text-lg font-bold text-white mb-2">Motor de Dedução Ativo</h3>
                        <p class="text-sm text-gray-400 leading-relaxed">Você não precisa mais buscar tabelas nutricionais! Basta dizer o nome do alimento e a nossa IA deduzirá os macros para você.</p>
                    </div>

                    <div class="bg-dark-800 p-6 rounded-2xl border border-white/5">
                        <div class="mb-4">
                            <label class="text-[10px] text-gray-500 uppercase font-bold ml-2">Qual o nome do alimento?</label>
                            <input type="text" id="cf-name" placeholder="Ex: Whey Isolado Marca X" class="input-premium bg-dark-900 mt-1 py-3 text-sm">
                        </div>
                        <div>
                            <label class="text-[10px] text-gray-500 uppercase font-bold ml-2">Qual a quantidade base? (Ex: 100g, 30g)</label>
                            <div class="relative">
                                <input type="number" id="cf-base" value="100" class="input-premium bg-dark-900 mt-1 py-3 pr-12 text-sm">
                                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs mt-0.5">g/ml</span>
                            </div>
                        </div>
                    </div>
                    
                    <button id="btn-save-cf" onclick="app.saveCustomFood()" class="w-full mt-auto py-4 rounded-xl bg-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all">
                        Analisar e Salvar <i class="fa-solid fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        `;
    }

    saveCustomFood() {
        const name = document.getElementById('cf-name').value;
        const baseQty = parseFloat(document.getElementById('cf-base').value);

        if(!name || isNaN(baseQty)) {
            this.showCustomAlert('Por favor, preencha o nome e a quantidade base.', 'Aviso', 'fa-triangle-exclamation');
            return;
        }

        const btn = document.getElementById('btn-save-cf');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-lg"></i> Analisando Macros...';
        btn.classList.add('bg-blue-500/50');
        btn.disabled = true;

        // Simulando delay de API de IA para gerar feedback visual de processamento
        setTimeout(() => {
            const macros = this.nutritionAI.estimateMacros(name, baseQty);
            const id = 'uf_' + Date.now();
            
            this.nutritionDB.userFoods[id] = {
                name: name,
                baseQty: baseQty,
                macros: macros,
                tags: name.toLowerCase().split(' '),
                category: 'c8'
            };

            this.save();
            document.getElementById('custom-food-builder').remove();
            this.renderReceitasUI();
            
            this.showCustomAlert(
                `A IA estimou para ${baseQty}g de ${name}:<br><br><b>${macros.cal} Kcal</b><br>Proteínas: ${macros.prot}g<br>Carboidratos: ${macros.carb}g<br>Gorduras: ${macros.fat}g<br><br>Alimento salvo no seu banco!`, 
                'Dedução Concluída', 
                'fa-check-circle'
            );
        }, 1200);
    }

    openCustomRecipeModal() {
        this.feedback('click');
        const mObj = document.getElementById('modal-container');
        mObj.innerHTML = `
            <div id="custom-recipe-builder" class="fixed inset-0 bg-dark-900/95 backdrop-blur-xl z-[150] flex flex-col animate-slide-up">
                <div class="p-5 border-b border-white/5 flex justify-between items-center bg-dark-900">
                    <div>
                        <p class="text-[10px] text-gold-500 uppercase font-bold tracking-widest">Banco Pessoal</p>
                        <h2 class="text-xl font-extrabold text-white">Ensinar Receita</h2>
                    </div>
                    <button onclick="document.getElementById('custom-recipe-builder').remove()" class="w-10 h-10 rounded-full bg-dark-800 text-gray-400 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>
                <div class="p-5 flex-1 overflow-y-auto flex flex-col space-y-4">
                    <div>
                        <label class="text-[10px] text-gray-500 uppercase font-bold ml-2">Nome da Receita</label>
                        <input type="text" id="cr-name" placeholder="Ex: Mingau de Aveia Turbinado" class="input-premium bg-dark-800 mt-1 py-3 text-sm">
                    </div>
                    <div class="flex-1 flex flex-col">
                        <label class="text-[10px] text-gray-500 uppercase font-bold ml-2 mb-1">Ingredientes (Escreva como se estivesse falando)</label>
                        <textarea id="cr-ingredients" class="input-premium bg-dark-800 flex-1 resize-none text-sm p-4" placeholder="Ex: 50g de aveia, 200ml de leite e 1 banana..."></textarea>
                    </div>
                    <button onclick="app.parseAndSaveCustomRecipe()" class="w-full mt-2 py-4 rounded-xl bg-gold-500 text-dark-900 font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                        Interpretar e Salvar
                    </button>
                </div>
            </div>
        `;
    }

    parseAndSaveCustomRecipe() {
        const name = document.getElementById('cr-name').value;
        const text = document.getElementById('cr-ingredients').value;

        if(!name || !text) {
            this.showCustomAlert('Preencha o nome e os ingredientes.', 'Atenção', 'fa-triangle-exclamation');
            return;
        }

        const parsedItems = this.nutritionAI.parseMealInput(text);
        if(parsedItems.length === 0) {
            this.showCustomAlert('Não foi possível identificar ingredientes válidos no texto.', 'Atenção', 'fa-triangle-exclamation');
            return;
        }

        const macros = this.nutritionAI.calculateRecipe(parsedItems);

        this.showCustomConfirm(
            `A receita <b>${name}</b> tem ${parsedItems.length} ingredientes, pesando ${macros.totalWeight}g e com ${Math.round(macros.cal)} kcal no total. Deseja salvá-la?`,
            () => {
                const id = 'ur_' + Date.now();
                this.nutritionDB.userRecipes[id] = {
                    name: name,
                    totalWeight: macros.totalWeight,
                    ingredients: parsedItems.map(i => ({ foodId: i.foodId, qty: i.qty, type: i.type })),
                    tags: [name.toLowerCase()]
                };
                this.save();
                document.getElementById('custom-recipe-builder').remove();
                this.renderReceitasUI();
                this.showCustomAlert('A receita foi salva e já pode ser interpretada pelo Assistente IA na tela Inicial!', 'Sucesso', 'fa-check-circle');
            },
            "Revisão da Receita"
        );
    }

    deleteFromDatabase(dbType, id) {
        this.showCustomConfirm('Excluir este item permanentemente do seu banco de dados?', () => {
            delete this.nutritionDB[dbType][id];
            this.save();
            this.renderReceitasUI();
        });
    }
}

const app = new GoFitApp();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker Registrado! Escopo:', reg.scope))
            .catch(err => console.error('Falha SW:', err));
    });
}
