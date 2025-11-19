const i18n = {
    pl: {
        brand_sub: "Agencja Relokacyjna", nav_map: "Monitoring", nav_process: "Proces", nav_reviews: "Opinie", nav_cta: "Umów Wizytę",
        hero_status: "System MOS: Dostępny", hero_t1: "Legalizacja Pobytu", hero_t2: "Bez Stresu",
        hero_desc: "Niezależna agencja doradcza. Monitorujemy urzędy 24/7, abyś mógł spać spokojnie.",
        btn_primary: "Darmowa Wycena", btn_secondary: "Mapa Czasu",
        map_title: "Centrum Monitoringu", map_desc: "Szacowany czas w 2025 roku.",
        region_title: "Status Województw",
        step1_t: "Analiza", step1_d: "Weryfikacja dokumentów.",
        step2_t: "Kompletowanie", step2_d: "Tłumaczenia i wnioski.",
        step3_t: "Złożenie", step3_d: "Rezerwacja wizyty.",
        step4_t: "Decyzja", step4_d: "Odbiór karty.",
        book_title: "Umów Konsultację", book_desc: "Wybierz termin rozmowy z ekspertem.",
        lbl_name: "Imię", lbl_phone: "Telefon", lbl_service: "Usługa", lbl_time: "Dostępne Terminy", btn_submit: "Wyślij Zgłoszenie",
        ben_1: "Analiza dokumentów", ben_2: "Strategia", ben_3: "Poufność",
        chat_name: "Asystent AI", chat_welcome: "Cześć! Jak mogę Ci pomóc?",
        contact_header: "Kontakt", stat_clients: "KLIENTÓW", stat_success: "SKUTECZNOŚCI"
    },
    en: {
        brand_sub: "Relocation Agency", nav_map: "Monitoring", nav_process: "Process", nav_reviews: "Reviews", nav_cta: "Book Now",
        hero_status: "MOS System: Online", hero_t1: "Residence Permit", hero_t2: "Stress Free",
        hero_desc: "Independent consulting agency. We monitor offices 24/7 so you can rest easy.",
        btn_primary: "Free Quote", btn_secondary: "Time Map",
        map_title: "Monitoring Center", map_desc: "Estimated times in 2025.",
        region_title: "Regions Status",
        step1_t: "Analysis", step1_d: "Document verification.",
        step2_t: "Preparation", step2_d: "Translations & forms.",
        step3_t: "Submission", step3_d: "Booking appointment.",
        step4_t: "Decision", step4_d: "Card collection.",
        book_title: "Book Consultation", book_desc: "Choose a slot with our expert.",
        lbl_name: "Name", lbl_phone: "Phone", lbl_service: "Service", lbl_time: "Available Slots", btn_submit: "Submit",
        ben_1: "Doc Analysis", ben_2: "Strategy", ben_3: "Privacy",
        chat_name: "AI Assistant", chat_welcome: "Hi! How can I help?",
        contact_header: "Contact", stat_clients: "CLIENTS", stat_success: "SUCCESS RATE"
    },
    ua: {
        brand_sub: "Агенція Релокації", nav_map: "Моніторинг", nav_process: "Процес", nav_reviews: "Відгуки", nav_cta: "Записатися",
        hero_status: "Система MOS: Онлайн", hero_t1: "Карта Побуту", hero_t2: "Без Стресу",
        hero_desc: "Незалежна агенція. Моніторимо 24/7, щоб ви були спокійні.",
        btn_primary: "Оцінка", btn_secondary: "Карта Часу",
        map_title: "Центр Моніторингу", map_desc: "Орієнтовний час у 2025.",
        region_title: "Статус Регіонів",
        step1_t: "Аналіз", step1_d: "Перевірка документів.",
        step2_t: "Підготовка", step2_d: "Переклади та заяви.",
        step3_t: "Подання", step3_d: "Бронювання візиту.",
        step4_t: "Рішення", step4_d: "Отримання карти.",
        book_title: "Запис на консультацію", book_desc: "Оберіть час розмови.",
        lbl_name: "Ім'я", lbl_phone: "Телефон", lbl_service: "Послуга", lbl_time: "Вільний час", btn_submit: "Надіслати",
        ben_1: "Аналіз документів", ben_2: "Стратегія", ben_3: "Конфіденційність",
        chat_name: "AI Асистент", chat_welcome: "Привіт! Чим допомогти?",
        contact_header: "Контакти", stat_clients: "КЛІЄНТІВ", stat_success: "УСПІХУ"
    }
};

let currentLang = 'pl';

document.addEventListener("DOMContentLoaded", () => {
    initMap();
    initForm();
    initChat();
});

// 1. MAPA (LEAFLET)
function initMap() {
    const map = L.map('poland-map', {
        center: [52.0693, 19.4803],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 19
    }).addTo(map);

    const cities = [
        { c: [54.35, 18.64], n: "Gdańsk", t: "3 msc", col: "#10b981" },
        { c: [52.23, 21.01], n: "Warszawa", t: "7 msc", col: "#facc15" },
        { c: [50.06, 19.94], n: "Kraków", t: "12+ msc", col: "#f87171" },
        { c: [51.11, 17.03], n: "Wrocław", t: "7 msc", col: "#facc15" },
        { c: [52.40, 16.92], n: "Poznań", t: "4 msc", col: "#10b981" }
    ];

    cities.forEach(city => {
        const icon = L.divIcon({
            className: 'custom-pin',
            html: `<div style="width:12px; height:12px; background:${city.col}; border-radius:50%; box-shadow:0 0 15px ${city.col}; border:2px solid white;"></div>`,
            iconSize: [12, 12]
        });
        L.marker(city.c, {icon: icon}).addTo(map)
         .bindPopup(`<div style="text-align:center; font-family:Inter;"><strong>${city.n}</strong><br><span style="color:#666">${city.t}</span></div>`);
    });
}

// 2. FORMULARZ
function initForm() {
    const slots = document.querySelectorAll('.time-chip');
    const input = document.getElementById('timeSlot');
    
    slots.forEach(s => {
        s.addEventListener('click', () => {
            slots.forEach(x => x.classList.remove('active'));
            s.classList.add('active');
            input.value = s.innerText;
        });
    });

    document.getElementById('bookingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if(!input.value) { alert(currentLang==='pl'?"Wybierz godzinę":"Select time"); return; }
        
        const btn = document.getElementById('submitBtn');
        btn.querySelector('.btn-txt').style.display = 'none';
        btn.querySelector('.spinner').classList.remove('d-none');
        btn.disabled = true;
        
        setTimeout(() => {
            btn.querySelector('.btn-txt').style.display = 'inline';
            btn.querySelector('.spinner').classList.add('d-none');
            btn.disabled = false;
            document.getElementById('successMsg').classList.remove('d-none');
            e.target.reset();
            slots.forEach(x => x.classList.remove('active'));
            setTimeout(() => document.getElementById('successMsg').classList.add('d-none'), 4000);
        }, 1500);
    });
}

// 3. TŁUMACZENIA
window.setLang = function(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('[data-key]').forEach(el => {
        const k = el.dataset.key;
        if(i18n[lang][k]) el.innerText = i18n[lang][k];
    });
    document.querySelector('.msg.bot').innerText = i18n[lang]['chat_welcome'];
};

// 4. CHAT
function initChat() {
    const win = document.getElementById('chatWindow');
    const input = document.getElementById('chatInput');
    const body = document.getElementById('chatBody');
    
    window.toggleChat = () => win.classList.toggle('open');
    
    window.sendMsg = () => {
        const txt = input.value.trim();
        if(!txt) return;
        body.innerHTML += `<div class="msg user">${txt}</div>`;
        input.value = '';
        body.scrollTop = body.scrollHeight;
        setTimeout(() => {
            let r = currentLang==='pl' ? "Dziękuję, sprawdzam..." : "Checking...";
            body.innerHTML += `<div class="msg bot">${r}</div>`;
            body.scrollTop = body.scrollHeight;
        }, 800);
    };
    input.addEventListener('keypress', (e) => { if(e.key==='Enter') sendMsg(); });
}