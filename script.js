// --- KONFIGURACJA TŁUMACZEŃ (i18n) ---
const translations = {
    pl: {
        brand_sub: "Kancelaria Prawna", nav_map: "Monitoring", nav_process: "Proces", nav_downloads: "Dokumenty", btn_nav_cta: "Umów Wizytę",
        hero_badge: "System MOS: Dostępny", hero_title1: "Legalizacja Pobytu", hero_title2: "Bez Błędów i Stresu",
        hero_desc: "Jako pierwsi w Polsce wykorzystujemy algorytmy AI do analizy kolejek. Zaufaj ekspertom, którzy skutecznie procesują 150+ wniosków miesięcznie.",
        btn_primary: "Bezpłatna Analiza", btn_secondary: "Mapa Czasu",
        map_header: "Monitoring Urzędów Wojewódzkich", map_sub: "Dane aktualizowane w czasie rzeczywistym.",
        process_title: "Jak działamy?", process_desc: "Prosty proces w 4 krokach.",
        book_title: "Umów Konsultację Prawną", book_desc: "Wypełnij formularz, oddzwonimy w ciągu 2 godzin.",
        btn_submit: "Wyślij Zgłoszenie", chat_name: "Asystent AI", chat_welcome: "Dzień dobry! Jak mogę pomóc w legalizacji?",
        contact_title: "Kontakt"
    },
    en: {
        brand_sub: "Law Firm", nav_map: "Monitoring", nav_process: "Process", nav_downloads: "Downloads", btn_nav_cta: "Book Now",
        hero_badge: "MOS System: Online", hero_title1: "Residence Permit", hero_title2: "Stress-Free & Correct",
        hero_desc: "First in Poland to use AI for queue analysis. Trust experts processing 150+ applications monthly.",
        btn_primary: "Free Analysis", btn_secondary: "Time Map",
        map_header: "Voivodeship Office Monitor", map_sub: "Real-time data based on client cases.",
        process_title: "How it works?", process_desc: "Simple 4-step process.",
        book_title: "Book Legal Consultation", book_desc: "Fill the form, we call back in 2 hours.",
        btn_submit: "Submit Request", chat_name: "AI Assistant", chat_welcome: "Hello! How can I help with legalization?",
        contact_title: "Contact"
    },
    ua: {
        brand_sub: "Юридична фірма", nav_map: "Моніторинг", nav_process: "Процес", nav_downloads: "Документи", btn_nav_cta: "Записатися",
        hero_badge: "Система MOS: Онлайн", hero_title1: "Карта Побуту", hero_title2: "Без Помилок та Стресу",
        hero_desc: "Перші в Польщі використовуємо ШІ для черг. Довіртеся експертам (150+ справ щомісяця).",
        btn_primary: "Безкоштовний Аналіз", btn_secondary: "Карта Часу",
        map_header: "Моніторинг Ужондів", map_sub: "Дані в реальному часі.",
        process_title: "Як ми працюємо?", process_desc: "Простий процес у 4 кроки.",
        book_title: "Запис на консультацію", book_desc: "Заповніть форму, ми передзвонимо за 2 години.",
        btn_submit: "Надіслати", chat_name: "AI Асистент", chat_welcome: "Добрий день! Чим можу допомогти?",
        contact_title: "Контакти"
    }
};

let currentLang = 'pl';

document.addEventListener("DOMContentLoaded", () => {
    initMap();
    initForm();
    initChat();
});

// --- 1. MAPA LEAFLET (Prawdziwa) ---
function initMap() {
    // Inicjalizacja mapy - środek Polski
    const map = L.map('poland-map', {
        center: [52.0693, 19.4803],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: false // Zapobiega scrollowaniu strony przez mapę
    });

    // Kafelki CartoDB Dark Matter (Profesjonalny, ciemny wygląd)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Dane miast
    const cities = [
        { coords: [54.3520, 18.6466], name: "Gdańsk", days: "90 dni", color: "#10b981" }, // Zielony
        { coords: [52.2297, 21.0122], name: "Warszawa", days: "180 dni", color: "#f59e0b" }, // Żółty
        { coords: [50.0647, 19.9450], name: "Kraków", days: "365+ dni", color: "#ef4444" }, // Czerwony
        { coords: [51.1079, 17.0385], name: "Wrocław", days: "210 dni", color: "#f59e0b" },
        { coords: [52.4064, 16.9252], name: "Poznań", days: "100 dni", color: "#10b981" },
        { coords: [53.4285, 14.5528], name: "Szczecin", days: "90 dni", color: "#10b981" },
        { coords: [51.2465, 22.5684], name: "Lublin", days: "150 dni", color: "#f59e0b" }
    ];

    // Dodanie markerów
    cities.forEach(city => {
        const customIcon = L.divIcon({
            className: 'custom-marker-container',
            html: `<div style="background-color: ${city.color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 15px ${city.color};"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });

        const marker = L.marker(city.coords, { icon: customIcon }).addTo(map);
        
        // Popup HTML
        marker.bindPopup(`
            <div style="text-align: center; color: #333; font-family: Inter, sans-serif;">
                <strong style="font-size: 16px;">${city.name}</strong><br>
                <span style="color: #666;">Czas oczekiwania:</span><br>
                <strong style="color: ${city.color}; font-size: 14px;">${city.days}</strong>
            </div>
        `);
    });
}

// --- 2. FORMULARZ I SLOTY ---
function initForm() {
    // Wybór slotu godzinowego
    const slots = document.querySelectorAll('.slot-item');
    const slotInput = document.getElementById('selectedSlot');
    
    slots.forEach(slot => {
        slot.addEventListener('click', () => {
            slots.forEach(s => s.classList.remove('active'));
            slot.classList.add('active');
            slotInput.value = slot.innerText;
        });
    });

    // Obsługa wysyłki
    const form = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner-border');
    const successMsg = document.getElementById('formSuccessMsg');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        if (!slotInput.value) {
            alert(currentLang === 'pl' ? "Wybierz godzinę!" : "Select time slot!");
            return;
        }

        // Symulacja API
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        spinner.classList.remove('d-none');

        setTimeout(() => {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            spinner.classList.add('d-none');
            
            successMsg.classList.remove('d-none');
            form.reset();
            slots.forEach(s => s.classList.remove('active'));
            form.classList.remove('was-validated');
            
            setTimeout(() => successMsg.classList.add('d-none'), 5000);
        }, 1500);
    });
}

// --- 3. SYSTEM JĘZYKOWY ---
window.setLang = function(lang) {
    currentLang = lang;
    // UI Update
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Text Replacement
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.dataset.key;
        if(translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // Chatbot Reset
    const chatMsgs = document.getElementById('chatMessages');
    chatMsgs.innerHTML = `<div class="message bot"><div class="bubble">${translations[lang]['chat_welcome']}</div></div>`;
};

// --- 4. CHATBOT ---
function initChat() {
    const chatContainer = document.getElementById('chatContainer');
    const chatInput = document.getElementById('chatInput');
    const chatMsgs = document.getElementById('chatMessages');

    window.toggleChat = function() {
        chatContainer.classList.toggle('active');
        if(chatContainer.classList.contains('active')) {
            document.querySelector('.chat-badge').style.display = 'none';
        }
    };

    window.sendMessage = function() {
        const text = chatInput.value.trim();
        if(!text) return;

        // User Msg
        chatMsgs.innerHTML += `<div class="message user"><div class="bubble">${text}</div></div>`;
        chatInput.value = '';
        chatMsgs.scrollTop = chatMsgs.scrollHeight;

        // Bot Typing Simulation
        setTimeout(() => {
            let reply = "";
            if(currentLang === 'pl') reply = "Dziękuję. Przekazuję pytanie do konsultanta. Odpowiemy mailowo.";
            else if(currentLang === 'en') reply = "Thank you. Forwarding to consultant. We will reply via email.";
            else reply = "Дякую. Передаю консультанту. Відповімо на пошту.";

            chatMsgs.innerHTML += `<div class="message bot"><div class="bubble">${reply}</div></div>`;
            chatMsgs.scrollTop = chatMsgs.scrollHeight;
        }, 1000);
    };
    
    chatInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') sendMessage();
    });
}