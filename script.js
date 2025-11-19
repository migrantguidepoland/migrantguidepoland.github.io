/**
 * MigrantGuidePoland Enterprise Application
 * v6.0.0
 */

const app = {
    state: {
        lang: localStorage.getItem('mg_lang') || 'pl',
        isChatOpen: false
    },

    // Database of Translations
    i18n: {
        pl: {
            nav_map: "Mapa", nav_rulings: "Orzecznictwo", nav_downloads: "Dokumenty", nav_contact: "Kontakt", nav_booking: "Umów Konsultację",
            hero_status: "System MOS 2.0: ONLINE", hero_t1: "Legalizacja Pobytu", hero_t2: "Bez Granic",
            hero_desc: "Najnowocześniejsza kancelaria w Polsce. Monitorujemy urzędy 24/7. Skróć czas oczekiwania o 60%.",
            btn_start: "Rozpocznij Procedurę", btn_map: "Analiza Rynku",
            stat_days: "Dni (Minimum)", stat_cases: "Aktywnych Spraw", stat_success: "Skuteczności",
            map_title: "Monitoring Urzędów AI", map_desc: "Autorski algorytm przewiduje zatory w urzędach.",
            rulings_title: "Baza Wiedzy & Orzecznictwo", ruling1_t: "Elektroniczny Podpis", ruling1_d: "Wyrok NSA zrównuje podpis MOS z własnoręcznym.",
            ruling2_t: "Terminy Wiążące", ruling2_d: "Przekroczenie terminu o 7 dni skutkuje zgodą.",
            dl_title: "Niezbędnik Cudzoziemca", dl_rodo: "Oświadczenie RODO", dl_poa: "Pełnomocnictwo", dl_contract: "Umowa Wstępna",
            book_title: "Zarezerwuj Termin", book_desc: "Wybierz dogodny termin online.", lbl_name: "Imię i Nazwisko", lbl_phone: "Telefon", lbl_email: "Email", lbl_service: "Rodzaj Sprawy", lbl_time: "Terminy", btn_submit: "Potwierdź Rezerwację",
            contact_title: "Dane Kontaktowe", chat_name: "Asystent AI", chat_welcome: "Witaj! Analizuję Twój status. Jak mogę pomóc?"
        },
        en: {
            nav_map: "Map", nav_rulings: "Case Law", nav_downloads: "Documents", nav_contact: "Contact", nav_booking: "Book Consultation",
            hero_status: "MOS System 2.0: ONLINE", hero_t1: "Residence Permit", hero_t2: "No Borders",
            hero_desc: "Modern law firm. We monitor offices 24/7. Cut waiting time by 60%.",
            btn_start: "Start Process", btn_map: "Market Analysis",
            stat_days: "Days (Minimum)", stat_cases: "Active Cases", stat_success: "Success Rate",
            map_title: "AI Office Monitoring", map_desc: "Algorithm predicts delays in offices.",
            rulings_title: "Knowledge Base", ruling1_t: "E-Signature", ruling1_d: "NSA ruling confirms digital signature validity.",
            ruling2_t: "Binding Deadlines", ruling2_d: "Deadline miss equals automatic consent.",
            dl_title: "Expat Essentials", dl_rodo: "GDPR Form", dl_poa: "Power of Attorney", dl_contract: "Pre-Contract",
            book_title: "Book Appointment", book_desc: "Choose a convenient slot.", lbl_name: "Full Name", lbl_phone: "Phone", lbl_email: "Email", lbl_service: "Service Type", lbl_time: "Slots", btn_submit: "Confirm Booking",
            contact_title: "Contact Info", chat_name: "AI Assistant", chat_welcome: "Hello! Analyzing status. How can I help?"
        },
        ua: {
            nav_map: "Карта", nav_rulings: "Судова Практика", nav_downloads: "Документи", nav_contact: "Контакт", nav_booking: "Записатися",
            hero_status: "Система MOS 2.0: ОНЛАЙН", hero_t1: "Карта Побуту", hero_t2: "Без Кордонів",
            hero_desc: "Сучасна юридична фірма. Моніторинг 24/7. Скоротіть очікування на 60%.",
            btn_start: "Розпочати", btn_map: "Аналіз Ринку",
            stat_days: "Днів (Мінімум)", stat_cases: "Активних Справ", stat_success: "Успіху",
            map_title: "AI Моніторинг", map_desc: "Алгоритм прогнозує затори в офісах.",
            rulings_title: "База Знань", ruling1_t: "Е-підпис", ruling1_d: "Рішення NSA підтверджує дійсність.",
            ruling2_t: "Терміни", ruling2_d: "Пропуск терміну = згода.",
            dl_title: "Необхідне", dl_rodo: "RODO", dl_poa: "Довіреність", dl_contract: "Договір",
            book_title: "Запис на візит", book_desc: "Оберіть дату онлайн.", lbl_name: "ПІБ", lbl_phone: "Телефон", lbl_email: "Email", lbl_service: "Послуга", lbl_time: "Терміни", btn_submit: "Підтвердити",
            contact_title: "Контакти", chat_name: "AI Асистент", chat_welcome: "Вітаю! Чим можу допомогти?"
        }
    },

    init() {
        this.setLanguage(this.state.lang);
        this.initMap();
        this.initCounters();
        this.initBooking();
        this.initChat();
    },

    setLanguage(lang) {
        this.state.lang = lang;
        localStorage.setItem('mg_lang', lang);
        
        // Update UI
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (this.i18n[lang][key]) el.innerText = this.i18n[lang][key];
        });

        // Reset chat welcome message
        const chatMsgs = document.getElementById('chatMessages');
        if(chatMsgs) {
            chatMsgs.innerHTML = `<div class="msg-bubble bot">${this.i18n[lang]['chat_welcome']}</div>`;
        }
    },

    initMap() {
        const hotspots = document.querySelectorAll('.hotspot');
        const tooltip = document.getElementById('mapTooltip');
        const ttElements = {
            city: document.getElementById('ttCity'),
            status: document.getElementById('ttStatus'),
            time: document.getElementById('ttTime'),
            trend: document.getElementById('ttTrend')
        };

        hotspots.forEach(spot => {
            spot.addEventListener('mouseenter', () => {
                // Update Data
                ttElements.city.innerText = spot.dataset.city;
                ttElements.time.innerText = `${spot.dataset.time} ${this.state.lang === 'pl' ? 'dni' : 'days'}`;
                
                const trend = spot.dataset.trend;
                ttElements.status.innerText = trend === 'down' ? 'GOOD' : (trend === 'up' ? 'BUSY' : 'STABLE');
                ttElements.status.style.background = trend === 'down' ? '#10b981' : (trend === 'up' ? '#ef4444' : '#f59e0b');
                
                ttElements.trend.innerText = trend === 'down' ? '▼' : (trend === 'up' ? '▲' : '▶');
                ttElements.trend.style.color = trend === 'down' ? '#10b981' : (trend === 'up' ? '#ef4444' : '#f59e0b');

                // Position
                const l = parseFloat(spot.style.left);
                const t = parseFloat(spot.style.top);
                
                tooltip.style.left = (l > 60) ? `calc(${l}% - 200px)` : `calc(${l}% + 25px)`;
                tooltip.style.top = `calc(${t}% - 50px)`;
                tooltip.classList.add('active');
            });

            spot.addEventListener('mouseleave', () => tooltip.classList.remove('active'));
        });
    },

    initCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = +el.dataset.target;
                    let count = 0;
                    const inc = target / 50;
                    
                    const update = () => {
                        count += inc;
                        if (count < target) {
                            el.innerText = Math.ceil(count);
                            requestAnimationFrame(update);
                        } else {
                            el.innerText = target;
                        }
                    };
                    update();
                    observer.unobserve(el);
                }
            });
        });

        document.querySelectorAll('.count-up').forEach(c => observer.observe(c));
    },

    initBooking() {
        const slots = document.querySelectorAll('.slot');
        const input = document.getElementById('timeInput');
        
        slots.forEach(slot => {
            slot.addEventListener('click', () => {
                slots.forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
                input.value = slot.innerText;
            });
        });

        document.getElementById('bookingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            if (!input.value) {
                alert(this.state.lang === 'pl' ? "Wybierz godzinę" : "Select time");
                return;
            }
            // Simulation
            const btn = e.target.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "...";
            btn.disabled = true;
            
            setTimeout(() => {
                alert("Booking Confirmed!");
                btn.innerText = originalText;
                btn.disabled = false;
                e.target.reset();
                slots.forEach(s => s.classList.remove('selected'));
            }, 1500);
        });
    },

    initChat() {
        this.toggleChat = () => {
            const chat = document.getElementById('chatInterface');
            chat.classList.toggle('active');
            this.state.isChatOpen = !this.state.isChatOpen;
        };

        this.sendMessage = () => {
            const input = document.getElementById('userMsg');
            const txt = input.value.trim();
            if (!txt) return;

            const area = document.getElementById('chatMessages');
            
            // User Msg
            area.innerHTML += `<div class="msg-bubble user">${txt}</div>`;
            input.value = '';
            area.scrollTop = area.scrollHeight;

            // Bot Reply Simulation
            setTimeout(() => {
                const reply = this.getBotReply(txt);
                area.innerHTML += `<div class="msg-bubble bot">${reply}</div>`;
                area.scrollTop = area.scrollHeight;
            }, 1000);
        };
    },

    getBotReply(txt) {
        const l = txt.toLowerCase();
        if (l.includes('cena') || l.includes('price')) return "1500 PLN + VAT";
        if (l.includes('czas') || l.includes('time')) return "Avg: 45 days";
        return this.state.lang === 'pl' ? "Łączę z konsultantem..." : "Connecting to agent...";
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());