/**
 * GoFit Premium - The Vanilla JS Architect Engine
 * Nenhuma dependência externa. Escalabilidade e Performance.
 */

class GoFitApp {
    constructor() {
        this.version = '4.0.0 PRO - Funcionalidades Integradas';
        
        // --- Bancos de Dados ---
        this.db = {
            foods: [
                { id: 'f1', name: 'Arroz Branco', baseQty: 100, macros: { cal: 130, prot: 2.5, carb: 28, fat: 0.2 }, tags: ['arroz', 'carboidrato'] },
                { id: 'f2', name: 'Peito de Frango', baseQty: 100, macros: { cal: 165, prot: 31, carb: 0, fat: 3.6 }, tags: ['frango', 'proteina', 'carne'] },
                { id: 'f3', name: 'Ovo Cozido', baseQty: 50, macros: { cal: 77, prot: 6, carb: 0.5, fat: 5 }, tags: ['ovo', 'ovos', 'proteina'] },
                { id: 'f4', name: 'Aveia em Flocos', baseQty: 30, macros: { cal: 114, prot: 4.3, carb: 17, fat: 2.2 }, tags: ['aveia', 'carboidrato'] },
                { id: 'f5', name: 'Whey Protein Isolado', baseQty: 30, macros: { cal: 110, prot: 26, carb: 1, fat: 0 }, tags: ['whey', 'suplemento'] },
                { id: 'f6', name: 'Banana', baseQty: 100, macros: { cal: 89, prot: 1.1, carb: 23, fat: 0.3 }, tags: ['banana', 'fruta'] },
                { id: 'f7', name: 'Patinho Moído', baseQty: 100, macros: { cal: 133, prot: 28, carb: 0, fat: 2.3 }, tags: ['carne', 'boi'] },
                { id: 'f8', name: 'Azeite de Oliva', baseQty: 13, macros: { cal: 119, prot: 0, carb: 0, fat: 13.5 }, tags: ['azeite', 'oleo', 'gordura'] }
            ],
            // Enciclopédia de Treinos: Imagens corrigidas para fitness real (Unsplash/Stock Keywords)
            exercises: {
                // PEITORAL
                'p1': { name: 'Supino Reto com Barra', group: 'Peitoral', sets: '4x 8-10', type: 'Força', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80', steps: ['Deite-se no banco mantendo os pés firmes no chão.', 'Segure a barra com uma largura ligeiramente maior que os ombros.', 'Desça a barra controladamente até encostar no peitoral médio.', 'Empurre a barra de volta à posição inicial estendendo os braços.'] },
                'p2': { name: 'Supino Inclinado com Halteres', group: 'Peitoral', sets: '3x 10-12', type: 'Hipertrofia', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80', steps: ['Ajuste o banco em uma inclinação de 30 a 45 graus.', 'Com um halter em cada mão, posicione-os na altura do peito.', 'Empurre os halteres para cima até que se encontrem.', 'Retorne controladamente à posição inicial.'] },
                'p3': { name: 'Crucifixo Máquina (Peck Deck)', group: 'Peitoral', sets: '3x 12-15', type: 'Isolamento', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80', steps: ['Sente-se no aparelho com as costas apoiadas.', 'Segure os puxadores com os cotovelos levemente flexionados.', 'Junte os braços à frente do corpo apertando o peitoral.', 'Retorne abrindo os braços devagar.'] },
                'p4': { name: 'Crossover na Polia Média', group: 'Peitoral', sets: '4x 12', type: 'Isolamento', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80', steps: ['Posicione as polias na altura dos ombros.', 'Dê um passo à frente mantendo o tronco levemente inclinado.', 'Puxe as alças cruzando os braços à frente do corpo.', 'Volte controlando o peso sem deixar as placas baterem.'] },
                // DORSAL
                'd1': { name: 'Puxada Frontal Alta', group: 'Dorsal', sets: '4x 10-12', type: 'Hipertrofia', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80', steps: ['Sente-se e trave as pernas sob o suporte.', 'Segure a barra com pegada aberta pronada.', 'Puxe a barra em direção à parte superior do peito.', 'Alongue totalmente as costas na subida.'] },
                'd2': { name: 'Remada Curvada com Barra', group: 'Dorsal', sets: '4x 8', type: 'Força', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80', steps: ['Incline o tronco à frente mantendo a coluna reta.', 'Segure a barra na largura dos ombros.', 'Puxe a barra em direção ao umbigo contraindo as escápulas.', 'Desça o peso de forma controlada.'] },
                // PERNAS
                'l1': { name: 'Agachamento Livre', group: 'Pernas', sets: '4x 8-10', type: 'Força', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80', steps: ['Posicione a barra confortavelmente nos trapézios.', 'Mantenha os pés na largura dos ombros.', 'Agache flexionando joelhos e quadril como se fosse sentar.', 'Suba empurrando o chão através dos calcanhares.'] },
                'l2': { name: 'Leg Press 45º', group: 'Pernas', sets: '4x 12', type: 'Hipertrofia', image: 'https://images.unsplash.com/photo-1534438097544-e53b6eb4e803?auto=format&fit=crop&w=600&q=80', steps: ['Sente-se no aparelho e posicione os pés na plataforma.', 'Desça o peso até que os joelhos fiquem próximos a 90 graus.', 'Empurre o peso de volta, sem travar os joelhos no final.', 'Mantenha as costas e quadril firmemente apoiados.'] },
                // BRAÇOS E OMBROS
                'a1': { name: 'Rosca Direta com Barra', group: 'Braços', sets: '3x 10', type: 'Hipertrofia', image: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80', steps: ['Em pé, segure a barra com as palmas voltadas para cima.', 'Mantenha os cotovelos colados ao corpo.', 'Flexione os braços levantando o peso até contrair o bíceps.', 'Desça a barra devagar.'] },
                'o1': { name: 'Desenvolvimento com Halteres', group: 'Ombros', sets: '4x 10', type: 'Hipertrofia', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80', steps: ['Sente-se com as costas retas e segure os halteres na altura das orelhas.', 'Empurre os pesos para cima até quase esticar os braços.', 'Desça lentamente até a posição inicial.'] }
            },
            workouts: {
                'SEG': ['p1', 'p2', 'p3', 'p4'], 
                'TER': ['d1', 'd2'], 
                'QUA': ['l1', 'l2'], 
                'QUI': ['o1', 'a1'], 
                'SEX': ['p1', 'l1']
            },
            socialPosts: [
                { user: 'Carlos Silva', avatar: '12', time: 'Há 2h', text: 'Bati meu PR no agachamento! 120kg 🚀🔥', likes: 24, image: null },
                { user: 'Ana Paula', avatar: '5', time: 'Há 5h', text: 'Dieta 100% hoje. Foco no shape de verão! 🥗💪', likes: 89, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80' }
            ]
        };

        // 7 Refeições
        this.mealTemplates = [
            { id: 'cafe', name: 'Café da Manhã', icon: 'fa-mug-saucer', time: '07:00', split: 0.20 },
            { id: 'lanche_manha', name: 'Lanche da Manhã', icon: 'fa-apple-whole', time: '10:00', split: 0.10 },
            { id: 'almoco', name: 'Almoço', icon: 'fa-bowl-food', time: '13:00', split: 0.25 },
            { id: 'lanche_tarde', name: 'Lanche da Tarde', icon: 'fa-cookie-bite', time: '16:00', split: 0.10 },
            { id: 'pre', name: 'Pré-Treino', icon: 'fa-bolt', time: '18:00', split: 0.15 },
            { id: 'jantar', name: 'Jantar', icon: 'fa-utensils', time: '20:30', split: 0.15 },
            { id: 'ceia', name: 'Ceia', icon: 'fa-moon', time: '22:30', split: 0.05 }
        ];

        // --- Estado Global ---
        this.user = JSON.parse(localStorage.getItem('gofit_user')) || null;
        this.daily = JSON.parse(localStorage.getItem('gofit_daily')) || this.getEmptyDaily();
        
        this.tempAvatarBase64 = null; 
        this.audioCtx = null;
        
        this.init();
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
    }

    resetData() {
        if(confirm('Tem certeza? Isso apagará todos os seus dados e fotos do aplicativo.')) {
            localStorage.clear();
            location.reload();
        }
    }

    // --- Core Methods ---
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
                                this.feedback('success');
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

        slider.addEventListener('mousedown', (e) => {
            isDown = true; slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return; e.preventDefault();
            const x = e.pageX - slider.offsetLeft; const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    navigate(view) {
        document.querySelectorAll('.section-view').forEach(el => el.classList.add('hidden'));
        const target = document.getElementById(`view-${view}`);
        if(target) {
            target.classList.remove('hidden');
            if(view === 'home') this.updateHomeUI();
            if(view === 'treino') this.renderTreinoUI();
            if(view === 'comunidade') this.renderSocialFeed();
            if(view === 'perfil') this.renderProfileUI();
        }
    }

    feedback(type) {
        if (navigator.vibrate) {
            if (type === 'click') navigator.vibrate(40);
            if (type === 'success') navigator.vibrate([80, 40, 80]);
        }
        try {
            if (!this.audioCtx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                this.audioCtx = new AudioContext();
            }
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
            conf.animate([
                { transform: 'translate3d(0,0,0) rotate(0)', opacity: 1 },
                { transform: `translate3d(${Math.random()*100-50}px, 100vh, 0) rotate(${Math.random()*720}deg)`, opacity: 0 }
            ], { duration: 1500 + Math.random()*1000, easing: 'ease-in' }).onfinish = () => conf.remove();
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

    // --- Regras de Negócio ---
    handleLogin() {
        const name = document.getElementById('login-name').value || 'Atleta';
        const weight = parseFloat(document.getElementById('login-weight').value) || 80;
        const height = parseFloat(document.getElementById('login-height').value) || 175;
        const age = parseFloat(document.getElementById('login-age').value) || 25;
        const gender = document.getElementById('login-gender').value;
        const activityMult = parseFloat(document.getElementById('login-activity').value);
        const goal = document.getElementById('login-goal').value;

        let bmr;
        if (gender === 'M') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

        let tdee = bmr * activityMult;
        let goalText = "Manutenção";
        if (goal === 'lose') { tdee -= 500; goalText = "Emagrecimento"; }
        if (goal === 'gain') { tdee += 500; goalText = "Hipertrofia"; }
        tdee = Math.round(tdee);

        const prot = Math.round(weight * 2.2);
        const fat = Math.round(weight * 1.0);
        const carb = Math.max(0, Math.round((tdee - (prot*4 + fat*9)) / 4));

        this.user = { 
            name, weight, height, age, gender, goalText, tdee, 
            macros: { prot, carb, fat },
            avatar: this.tempAvatarBase64 
        };
        
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

    // --- Renderização UI ---
    updateHomeUI() {
        if(!this.user) return;
        const dateOpt = { weekday: 'long', day: 'numeric', month: 'long' };
        document.getElementById('header-date').innerText = new Date().toLocaleDateString('pt-BR', dateOpt);
        document.getElementById('user-display-name').innerText = this.user.name;

        const totals = this.calculateDailyTotals();
        let remaining = Math.max(0, this.user.tdee - totals.tCal);
        this.animateValue('dash-cals', 0, remaining, 1000);
        document.getElementById('dash-tdee-total').innerText = `Meta: ${this.user.tdee} kcal`;
        document.getElementById('total-kcal-ingeridas').innerText = `${Math.round(totals.tCal)} kcal`;

        let pctCals = Math.min((totals.tCal / this.user.tdee) * 100, 100);
        document.getElementById('circle-cals').style.strokeDasharray = `${pctCals}, 100`;

        const updateBar = (id, cur, max) => {
            document.getElementById(`bar-${id}`).style.width = `${Math.min((cur/max)*100, 100)}%`;
            document.getElementById(`text-${id}`).innerText = `${Math.round(cur)}/${max}g`;
        };
        updateBar('prot', totals.tProt, this.user.macros.prot);
        updateBar('carb', totals.tCarb, this.user.macros.carb);
        updateBar('fat', totals.tFat, this.user.macros.fat);

        let waterPct = Math.min((this.daily.water / 3000) * 100, 100);
        document.getElementById('bar-water').style.width = `${waterPct}%`;
        document.getElementById('water-text').innerText = `${this.daily.water} / 3000ml`;

        this.renderMealsCarousel();
    }

    renderMealsCarousel() {
        const c = document.getElementById('meals-carousel');
        c.innerHTML = '';
        
        this.mealTemplates.forEach((m) => {
            const items = this.daily.meals[m.id];
            const calTotal = items.reduce((acc, i) => acc + i.cal, 0);
            const goal = Math.round(this.user.tdee * m.split);
            const isCompleted = calTotal > (goal * 0.5);

            let ulHtml = items.length === 0 ? `<div class="h-16 flex items-center justify-center text-[10px] text-gray-600 border border-dashed border-white/10 rounded-xl">Prato vazio</div>` :
                `<ul class="space-y-1.5 h-16 overflow-y-auto hide-scrollbar">` + 
                items.map(i => `<li class="flex justify-between text-[11px]"><span class="text-gray-300 truncate pr-2">• ${i.qty}g ${i.name}</span><span class="text-gold-400 font-bold">${Math.round(i.cal)}</span></li>`).join('') + `</ul>`;

            c.innerHTML += `
                <div class="meal-card-pro p-4 flex flex-col justify-between ${isCompleted ? 'completed' : ''}">
                    <div>
                        <div class="flex justify-between items-start mb-3">
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 rounded-full bg-dark-900 border border-gold-500/30 flex items-center justify-center text-gold-500"><i class="fa-solid ${m.icon} text-xs"></i></div>
                                <div>
                                    <h3 class="text-sm font-bold text-white leading-tight">${m.name}</h3>
                                    <p class="text-[9px] text-gray-500 font-bold">${m.time}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="text-sm font-extrabold text-white block">${Math.round(calTotal)}</span>
                                <span class="text-[9px] text-gray-500">/ ${goal} kcal</span>
                            </div>
                        </div>
                        ${ulHtml}
                    </div>
                    <button onclick="app.openFoodWizard('${m.id}')" class="mt-4 w-full py-2.5 rounded-xl bg-dark-900 text-gold-500 font-bold text-xs border border-gold-500/20 hover:bg-gold-500 hover:text-dark-900 transition-all">
                        <i class="fa-solid fa-plus mr-1"></i> Adicionar Alimentos
                    </button>
                </div>
            `;
        });
    }

    renderTreinoUI() {
        const cal = document.getElementById('calendar-carousel');
        cal.innerHTML = '';
        const days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];
        const todayIdx = new Date().getDay() - 1;

        days.forEach((d, i) => {
            const isToday = i === (todayIdx >= 0 && todayIdx < 5 ? todayIdx : 0);
            cal.innerHTML += `
                <div class="flex-shrink-0 w-14 h-16 rounded-2xl flex flex-col items-center justify-center transition-all ${isToday ? 'bg-gold-500 text-dark-900 shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105' : 'bg-dark-800 text-gray-500 border border-white/5'}">
                    <span class="text-[10px] font-bold">${d}</span>
                    <span class="text-lg font-extrabold">${10 + i}</span>
                </div>
            `;
        });

        this.renderExerciseList('all');

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.feedback('click');
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('bg-gold-500', 'text-dark-900', 'active', 'shadow-[0_0_10px_rgba(212,175,55,0.3)]');
                    b.classList.add('bg-dark-800', 'text-gray-400');
                });
                e.target.classList.add('bg-gold-500', 'text-dark-900', 'active', 'shadow-[0_0_10px_rgba(212,175,55,0.3)]');
                e.target.classList.remove('bg-dark-800', 'text-gray-400');
                this.renderExerciseList(e.target.dataset.filter);
            });
        });
    }

    renderExerciseList(filterStr) {
        const c = document.getElementById('workouts-container');
        c.innerHTML = '';
        
        let exList = this.db.workouts['SEG'].map(id => ({id, ...this.db.exercises[id]}));
        if(filterStr !== 'all') {
            exList = Object.keys(this.db.exercises).map(k => ({id:k, ...this.db.exercises[k]})).filter(ex => ex.group === filterStr);
        }

        if(exList.length === 0) {
            c.innerHTML = '<p class="text-center text-gray-500 text-sm mt-10">Nenhum treino para este grupo.</p>';
            return;
        }

        exList.forEach(ex => {
            const isDone = this.daily.workouts.includes(ex.id);
            c.innerHTML += `
                <div class="glass-card p-4 flex items-center justify-between border ${isDone ? 'border-gold-500/40 bg-gold-900/10' : 'border-white/5'} transition-all hover:bg-white/5">
                    <div class="flex items-center gap-4 cursor-pointer" onclick="app.openExerciseModal('${ex.id}')">
                        <div class="w-12 h-12 rounded-xl bg-dark-900 overflow-hidden border border-white/10 flex-shrink-0">
                            <img src="${ex.image}" class="w-full h-full object-cover opacity-80" alt="Anatomia">
                        </div>
                        <div>
                            <h3 class="font-bold text-sm ${isDone ? 'text-gold-500 line-through opacity-80' : 'text-white'} transition-all">${ex.name}</h3>
                            <div class="flex gap-2 mt-1">
                                <span class="text-[9px] text-gray-400 bg-dark-900 px-1.5 py-0.5 rounded border border-white/5"><i class="fa-solid fa-dumbbell text-gold-600 mr-1"></i>${ex.sets}</span>
                                <span class="text-[9px] text-gray-400 bg-dark-900 px-1.5 py-0.5 rounded border border-white/5">${ex.group}</span>
                            </div>
                        </div>
                    </div>
                    <input type="checkbox" class="chk-premium flex-shrink-0" data-id="${ex.id}" ${isDone ? 'checked' : ''} onchange="app.toggleWorkout('${ex.id}', this)">
                </div>
            `;
        });
    }

    openExerciseModal(id) {
        this.feedback('click');
        const ex = this.db.exercises[id];
        if(!ex) return;

        const mObj = document.getElementById('modal-container');
        let stepsHtml = ex.steps.map(step => `<li>${step}</li>`).join('');

        mObj.innerHTML = `
            <div id="exercise-modal" class="fixed inset-0 bg-dark-900/95 backdrop-blur-xl z-[100] flex flex-col animate-slide-up">
                <div class="relative w-full h-64 bg-dark-800">
                    <img src="${ex.image}" class="w-full h-full object-cover opacity-60" alt="${ex.name}">
                    <div class="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div>
                    <button onclick="document.getElementById('exercise-modal').remove()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-dark-900/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-gold-500 hover:text-dark-900 transition-colors z-10 border border-white/20">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                    <div class="absolute bottom-6 left-6 right-6">
                        <span class="px-3 py-1 bg-gold-500 text-dark-900 font-bold text-[10px] uppercase tracking-widest rounded-full mb-2 inline-block shadow-lg">${ex.group} | ${ex.type}</span>
                        <h2 class="text-2xl font-extrabold text-white leading-tight drop-shadow-lg">${ex.name}</h2>
                    </div>
                </div>

                <div class="p-6 flex-1 overflow-y-auto">
                    <div class="glass-card p-4 border border-white/5 mb-6 flex justify-around items-center">
                        <div class="text-center">
                            <i class="fa-solid fa-dumbbell text-gold-500 mb-1 text-xl drop-shadow-md"></i>
                            <div class="text-[10px] text-gray-500 uppercase font-bold">Séries/Reps</div>
                            <div class="text-sm font-extrabold text-white">${ex.sets}</div>
                        </div>
                        <div class="w-px h-8 bg-white/10"></div>
                        <div class="text-center">
                            <i class="fa-solid fa-crosshairs text-blue-500 mb-1 text-xl drop-shadow-md"></i>
                            <div class="text-[10px] text-gray-500 uppercase font-bold">Foco Alvo</div>
                            <div class="text-sm font-extrabold text-white">${ex.group}</div>
                        </div>
                    </div>

                    <h3 class="text-sm font-bold text-white mb-4 uppercase tracking-widest border-b border-white/5 pb-2">Guia de Execução Perfeita</h3>
                    <ol class="custom-counter">
                        ${stepsHtml}
                    </ol>
                </div>
            </div>
        `;
    }

    toggleWorkout(id, el) {
        this.feedback('click');
        if(el.checked) {
            this.daily.workouts.push(id);
            this.fireConfetti();
        } else {
            this.daily.workouts = this.daily.workouts.filter(x => x !== id);
        }
        this.save();
        
        const card = el.closest('.glass-card');
        const title = card.querySelector('h3');
        if(el.checked) {
            card.classList.add('border-gold-500/40', 'bg-gold-900/10');
            card.classList.remove('border-white/5');
            title.classList.add('text-gold-500', 'line-through', 'opacity-80');
            title.classList.remove('text-white');
        } else {
            card.classList.remove('border-gold-500/40', 'bg-gold-900/10');
            card.classList.add('border-white/5');
            title.classList.remove('text-gold-500', 'line-through', 'opacity-80');
            title.classList.add('text-white');
        }
    }

    renderSocialFeed() {
        // Feed mockado, sem alterações.
    }

    renderProfileUI() {
        if(!this.user) return;
        document.getElementById('profile-name').innerText = this.user.name;
        document.getElementById('prof-peso').innerText = this.user.weight;
        const imc = (this.user.weight / Math.pow(this.user.height/100, 2)).toFixed(1);
        document.getElementById('prof-imc').innerText = imc;
        document.getElementById('prof-treinos').innerText = this.daily.workouts.length;
        document.getElementById('prof-tdee').innerText = `${this.user.tdee} kcal`;
        document.getElementById('prof-goal').innerText = this.user.goalText || 'Não definido';
    }

    // --- The Wizard (Lógica Avançada de Voice e Scan) ---
    openFoodWizard(mealId) {
        this.feedback('click');
        const mObj = document.getElementById('modal-container');
        
        mObj.innerHTML = `
            <div id="food-wizard" class="fixed inset-0 bg-dark-900/95 backdrop-blur-xl z-[100] flex flex-col animate-slide-up">
                <div class="p-5 border-b border-white/5 flex justify-between items-center bg-dark-900">
                    <div>
                        <p class="text-[10px] text-gold-500 uppercase font-bold tracking-widest">Adicionar ao</p>
                        <h2 class="text-xl font-extrabold text-white capitalize">${mealId.replace('_', ' ')}</h2>
                    </div>
                    <button onclick="document.getElementById('food-wizard').remove()" class="w-10 h-10 rounded-full bg-dark-800 text-gray-400 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <div class="p-5 flex-1 overflow-y-auto">
                    <div class="relative mb-6">
                        <i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                        <input type="text" id="wiz-search" placeholder="Busque no banco de dados..." class="input-premium pl-12 bg-dark-800">
                    </div>

                    <div class="flex gap-2 mb-6">
                        <button id="btn-scan" class="flex-1 py-3 bg-dark-800 border border-gold-500/30 rounded-xl text-xs font-bold text-gold-400 flex flex-col items-center gap-1 hover:bg-gold-500/10 transition-colors" onclick="app.startIAScan('${mealId}')"><i class="fa-solid fa-camera text-lg"></i> Scan IA</button>
                        <button id="btn-voice" class="flex-1 py-3 bg-dark-800 border border-blue-500/30 rounded-xl text-xs font-bold text-blue-400 flex flex-col items-center gap-1 hover:bg-blue-500/10 transition-colors" onclick="app.startVoiceRecognition('${mealId}')"><i class="fa-solid fa-microphone text-lg"></i> Falar Texto</button>
                    </div>

                    <h3 class="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">Sugestões Premium</h3>
                    <div id="wiz-results" class="space-y-2">
                        </div>
                </div>
            </div>
        `;

        this.renderWizardResults(this.db.foods, mealId);

        document.getElementById('wiz-search').addEventListener('keyup', (e) => {
            const q = e.target.value.toLowerCase();
            const res = this.db.foods.filter(f => f.name.toLowerCase().includes(q) || f.tags.some(t => t.includes(q)));
            this.renderWizardResults(res, mealId);
        });
    }

    renderWizardResults(list, mealId) {
        const c = document.getElementById('wiz-results');
        c.innerHTML = '';
        list.forEach(f => {
            c.innerHTML += `
                <div class="glass-card p-3 flex justify-between items-center hover:border-gold-500/50 cursor-pointer transition-colors" onclick="app.addFoodToMealLogic('${f.id}', '${mealId}', ${f.baseQty})">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-dark-900 border border-white/5 flex items-center justify-center text-gray-400"><i class="fa-solid fa-utensils text-xs"></i></div>
                        <div>
                            <span class="text-sm font-bold text-white block">${f.name}</span>
                            <span class="text-[10px] text-gold-500 font-bold">${f.macros.cal} kcal <span class="text-gray-600 font-normal ml-1">por ${f.baseQty}g</span></span>
                        </div>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-gold-500 text-dark-900 flex items-center justify-center shadow-lg"><i class="fa-solid fa-plus text-xs"></i></div>
                </div>
            `;
        });
    }

    // Função universal lógica que recalcula de acordo com as gramas passadas
    addFoodToMealLogic(foodId, mealId, customQty) {
        this.feedback('success');
        const dbRef = this.db.foods.find(f => f.id === foodId);
        
        const mult = customQty / dbRef.baseQty;

        this.daily.meals[mealId].push({
            id: dbRef.id, 
            name: dbRef.name, 
            qty: customQty,
            cal: Math.round(dbRef.macros.cal * mult), 
            prot: Math.round(dbRef.macros.prot * mult * 10) / 10, 
            carb: Math.round(dbRef.macros.carb * mult * 10) / 10, 
            fat: Math.round(dbRef.macros.fat * mult * 10) / 10
        });
        
        this.save();
        this.updateHomeUI();
        
        const wizard = document.getElementById('food-wizard');
        if(wizard) wizard.remove(); 
    }

    // Funcionalidade 1: VOZ ATIVADA
    startVoiceRecognition(mealId) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Seu navegador não suporta a API de voz.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';
        recognition.start();

        const btn = document.getElementById('btn-voice');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-microphone-lines text-lg animate-pulse"></i> Ouvindo...';
        btn.classList.add('bg-blue-500/20');

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            this.feedback('success');
            
            // Lógica Regex: (Ex: "150g de frango" ou "2 unidades de ovo")
            const regex = /(\d+(?:[.,]\d+)?)\s*(g|ml|unidades|unidade|colheres|colher)?\s*(?:de)?\s*([a-záàâãéèêíïóôõöúç\s]+)/gi;
            let matches = [...transcript.matchAll(regex)];
            let foundAny = false;

            matches.forEach(match => {
                let qty = parseFloat(match[1]);
                let unit = match[2];
                let foodName = match[3].trim();

                if (unit && unit.includes('unidade')) qty = qty * 50; 
                
                const dbMatch = this.db.foods.find(f => f.name.toLowerCase().includes(foodName) || f.tags.some(t => foodName.includes(t)));
                if (dbMatch) {
                    this.addFoodToMealLogic(dbMatch.id, mealId, qty);
                    foundAny = true;
                }
            });

            if(!foundAny) alert(`Não identificamos o alimento na frase: "${transcript}"`);
            
            btn.innerHTML = originalText;
            btn.classList.remove('bg-blue-500/20');
        };

        recognition.onerror = () => {
            btn.innerHTML = originalText;
            btn.classList.remove('bg-blue-500/20');
            alert("Não conseguimos ouvir. Tente falar mais perto ou verifique o microfone.");
        }
    }

    // Funcionalidade 2: CAMERA/SCAN IA ATIVADO
    startIAScan(mealId) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if(!file) return;

            const btn = document.getElementById('btn-scan');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-lg"></i> Processando Imagem...';
            btn.classList.add('bg-gold-500/20');

            // Simulação de delay da API Vision processing
            setTimeout(() => {
                this.feedback('success');
                // Mock de reconhecimento perfeito da IA e adição com base no banco
                this.addFoodToMealLogic('f2', mealId, 150); // Frango
                this.addFoodToMealLogic('f1', mealId, 100); // Arroz
                
                alert("Smart IA: 'Peito de Frango' (150g) e 'Arroz Branco' (100g) detectados no prato e adicionados!");
            }, 2500);
        };
        
        input.click();
    }
}

const app = new GoFitApp();

// --- PWA: Registro do Service Worker ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker Registrado com sucesso! Escopo:', reg.scope))
            .catch(err => console.error('Falha ao registrar Service Worker:', err));
    });
}
