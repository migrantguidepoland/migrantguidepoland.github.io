// ============================================
// MIGRANT GUIDE POLAND - COMPLETE APP.JS
// Professional Application with Enhanced Features
// ============================================

class MigrantApp {
    constructor() {
        this.currentLang = 'pl';
        this.currentTheme = 'light';
        this.isLoggedIn = false;
        this.currentUser = null;
        this.chatOpen = false;
        this.chatMessages = [];
        this.userPreferences = this.loadUserPreferences();
        this.officesData = this.loadOfficesData();
        this.faqData = this.loadFAQData();
        this.servicesData = this.loadServicesData();
        
        // Initialize app
        this.init();
    }
    
    init() {
        this.initializeLoadingScreen();
        this.initializeTranslations();
        this.initializeTheme();
        this.initializeNavigation();
        this.initializeMap();
        this.initializeFAQ();
        this.initializeChat();
        this.initializeModals();
        this.initializeAnimations();
        this.initializePreferences();
        this.initializeNotifications();
        this.initializeCrossSelling();
        this.initializeCalendarIntegration();
        this.initializePaymentSystem();
        this.initializeDocumentSigning();
        this.setupEventListeners();
        
        // Auto-set theme based on time of day if preference enabled
        if (this.userPreferences.autoTheme) {
            this.setAutoTheme();
        }
    }
    
    // ==========================================
    // LOADING SCREEN
    // ==========================================
    
    initializeLoadingScreen() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        
        // Simulate loading delay
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            this.initializeHeroAnimations();
        }, 2000);
    }
    
    // ==========================================
    // ENHANCED TRANSLATIONS SYSTEM
    // ==========================================
    
    translations = {
        pl: {
            // Navigation
            brand: "MigrantGuidePoland",
            nav_about: "O nas",
            nav_map: "Mapa terminów",
            nav_faq: "AI FAQ",
            nav_updates: "Prawo 2025",
            nav_services: "Usługi MOS",
            nav_contact: "Kontakt 24/7",
            login_nav: "Panel klienta",
            
            // Hero Section
            update_banner: "SYSTEM MOS AKTYWNY | REWOLUCJA 2025",
            hero_title: "Przyszłość legalizacji pobytu już dziś",
            hero_subtitle: "Jako pierwsi w Polsce opanowaliśmy system MOS z AI. Rekordowe terminy 30 dni, monitoring 24/7, obsługa w 4 językach.",
            btn_smart_booking: "Inteligentne umówienie",
            btn_ai_faq: "AI FAQ",
            hint_ai: "AI analizuje Twoją sytuację",
            hint_speed: "30 dni średnio",
            hint_support: "24/7 wsparcie",
            
            // Statistics
            stat_days: "dni minimum",
            stat_electronic: "Elektronizacja",
            stat_languages: "Języki",
            stat_experience: "lat doświadczeń",
            
            // Map Section
            map_title: "Interaktywna Mapa Terminów",
            map_subtitle: "Sprawdź aktualne terminy rozpatrywania wniosków MOS w całej Polsce",
            filter_region: "Filtruj po regionie",
            map_view: "Widok",
            view_offices: "Urzędy",
            view_regions: "Regiony",
            map_fast: "Szybkie (30-35 dni)",
            map_medium: "Średnie (40-50 dni)",
            map_slow: "Długie (60+ dni)",
            
            // FAQ Section
            faq_title: "AI-Powered FAQ",
            faq_subtitle: "Zadaj dowolne pytanie o prawo migracyjne - AI przeszuka bazę orzeczeń, procedur i przepisów",
            faq_placeholder: "Zadaj pytanie o MOS, Praca.gov.pl, obywatelstwo...",
            search_in: "Szukaj w",
            judgments: "Orzeczenia",
            procedures: "Procedury",
            regulations: "Przepisy",
            curiosities: "Ciekawostki",
            no_results_desc: "Nie znalazłeś odpowiedzi?",
            ask_expert: "Zapytaj eksperta",
            
            // Updates Section
            updates_title: "Rewolucja Prawna 2025",
            updates_subtitle: "Najważniejsze zmiany w prawie migracyjnym",
            timeline_aug_date: "1 SIERPNIA 2025",
            timeline_aug_title: "System MOS - Pełna Elektronizacja",
            timeline_aug_desc: "Moduł Obsługi Spraw (mos.cudzoziemcy.gov.pl) umożliwia składanie wniosków online z podpisem elektronicznym.",
            timeline_jun_date: "1 CZERWCA 2025",
            timeline_jun_title: "Portal Praca.gov.pl - Koniec z Testem",
            timeline_jun_desc: "Zniesienie testu rynku pracy dla większości zawodów. Nowy portal elektroniczny, kary 3000-50000 zł.",
            timeline_now_date: "AKTUALNIE",
            timeline_now_title: "Rekordowe Terminy",
            timeline_now_desc: "Wrocław: 30 dni, Warszawa: 45 dni, Kraków: 40 dni. AI monitoring 24/7.",
            badge_active: "Aktywne",
            badge_languages: "7 języków",
            badge_fines: "Kary 3-50k zł",
            badge_no_test: "Bez testu",
            badge_current: "AKTUALNIE",
            badge_ai_monitoring: "AI Monitoring",
            badge_30_days: "30 dni",
            
            // About Section
            about_title: "Liderzy Nowego Prawa 2025",
            about_intro: "Jako pierwsi w Polsce opanowaliśmy system MOS i nowe przepisy 2025.",
            about_story: "Przewidząliśmy rewolucję prawną z 2-letnim wyprzedzeniem.",
            about_certified: "Certyfikowani eksperci MOS",
            about_fastest: "Najszybsze terminy w Polsce",
            about_legal_cooperation: "Współpraca z kancelariami",
            about_legal_compliance: "Pełna zgodność z przepisami",
            
            // Features
            feat_ai_title: "AI Automatyzacja",
            feat_ai_desc: "Systemy AI do analizy dokumentów",
            feat_speed_title: "30 dni",
            feat_speed_desc: "Rekordowe terminy dzięki MOS",
            feat_experts_title: "Eksperci",
            feat_experts_desc: "Certyfikowani specjaliści",
            feat_global_title: "4 Języki",
            feat_global_desc: "PL, UA, EN, RU",
            
            // Services
            services_title: "Usługi Przyszłości",
            services_subtitle: "Pełna obsługa elektroniczna z AI w współpracy z kancelariami prawnymi",
            service_residence_title: "Karta Pobytu przez MOS",
            service_residence_desc: "Pierwsza w Polsce pełna obsługa przez system MOS z AI.",
            service_work_title: "Zezwolenia Praca.gov.pl",
            service_work_desc: "Obsługa nowego systemu Praca.gov.pl. Bez testu rynku.",
            service_citizenship_title: "Obywatelstwo Premium",
            service_citizenship_desc: "Kompleksowa ścieżka do obywatelstwa z AI analizą uprawnień.",
            btn_pay_now: "Opłać teraz",
            
            // Contact
            contact_title: "Kontakt 24/7",
            contact_subtitle: "Najwyższa jakość obsługi eksperckiej",
            contact_phone_title: "Telefon Ekspercki",
            contact_phone_hours: "7 dni w tygodniu",
            contact_email_title: "Email Premium",
            contact_email_response: "Odpowiedź w 2h",
            contact_whatsapp_title: "WhatsApp AI",
            contact_whatsapp_link: "Czat + Ekspert",
            contact_whatsapp_instant: "AI 24/7 + Ekspert",
            contact_facebook_title: "Facebook",
            contact_facebook_link: "@MigrantGuidePoland",
            contact_facebook_desc: "Aktualności i porady",
            
            // Settings
            theme_label: "Motyw",
            language_label: "Język",
            preferences_title: "Personalizacja",
            auto_theme: "Automatyczny motyw",
            auto_theme_desc: "Dostosowuje motyw do pory dnia",
            preferred_service: "Preferowana usługa",
            contact_method: "Preferowany kontakt",
            notifications: "Kategorie powiadomień",
            
            // Login/Register
            login_tab: "Logowanie",
            register_tab: "Rejestracja",
            login_title: "Zaloguj się do panelu",
            register_title: "Utwórz konto",
            email_placeholder: "Email",
            password_placeholder: "Hasło",
            name_placeholder: "Imię i nazwisko",
            phone_placeholder: "Telefon",
            confirm_password_placeholder: "Potwierdź hasło",
            remember_me: "Zapamiętaj mnie",
            accept_terms: "Akceptuję regulamin i politykę prywatności",
            login_btn: "Zaloguj się",
            register_btn: "Utwórz konto",
            forgot_password: "Zapomniałeś hasła?",
            
            // Dashboard
            dashboard_title: "Twoje sprawy",
            logout_btn: "Wyloguj",
            active_cases: "Aktywne sprawy",
            documents: "Dokumenty",
            quick_actions: "Szybkie akcje",
            new_residence: "Nowa karta pobytu",
            new_work: "Zezwolenie na pracę",
            schedule_meeting: "Umów spotkanie",
            recommendations: "Polecane dla Ciebie",
            
            // Payment
            payment_title: "Wybierz metodę płatności",
            payment_card: "Karta płatnicza",
            payment_card_desc: "Visa, Mastercard, PayPal",
            payment_p24_desc: "Banki polskie, BLIK",
            payment_crypto: "Kryptowaluty",
            payment_crypto_desc: "Bitcoin, Ethereum, USDC",
            btn_secure_payment: "Bezpieczna płatność",
            
            // Calendar
            calendar_title: "Dodaj do kalendarza",
            event_details: "Szczegóły spotkania",
            event_title_label: "Tytuł:",
            event_date_label: "Data:",
            event_time_label: "Godzina:",
            event_type_label: "Typ:",
            
            // Document Signing
            signing_title: "Podpisz dokument elektronicznie",
            signing_info: "Po wypełnieniu formularza otrzymasz email z linkiem do bezpiecznego podpisania dokumentu.",
            
            // Chat
            chat_agent_name: "AI Asystent",
            chat_agent_status: "Online 24/7",
            chat_welcome: "👋 Witaj! Jestem AI asystentem MigrantGuidePoland. Jak mogę Ci pomóc z legalizacją pobytu?",
            chat_placeholder: "Napisz wiadomość...",
            chat_invitation_title: "Potrzebujesz pomocy?",
            chat_invitation_text: "Mogę pomóc z procedurami MOS i Praca.gov.pl",
            chat_yes: "Tak, pomóż mi",
            chat_no: "Nie, dziękuję",
            
            // Push Notifications
            push_title: "🔔 Otrzymuj powiadomienia!",
            push_desc: "Najnowsze przepisy i terminy MOS w czasie rzeczywistym",
            
            // Loading
            loading_text: "Ładowanie przyszłości legalizacji..."
        },
        
        ua: {
            // Navigation
            brand: "MigrantGuidePoland",
            nav_about: "Про нас",
            nav_map: "Карта термінів",
            nav_faq: "AI FAQ",
            nav_updates: "Право 2025",
            nav_services: "Послуги MOS",
            nav_contact: "Контакт 24/7",
            login_nav: "Панель клієнта",
            
            // Hero Section
            update_banner: "СИСТЕМА MOS АКТИВНА | РЕВОЛЮЦІЯ 2025",
            hero_title: "Майбутнє легалізації перебування вже сьогодні",
            hero_subtitle: "Як перші в Польщі ми освоїли систему MOS з AI. Рекордні терміни 30 днів, моніторинг 24/7, обслуговування 4 мовами.",
            btn_smart_booking: "Розумне записування",
            btn_ai_faq: "AI FAQ",
            hint_ai: "AI аналізує вашу ситуацію",
            hint_speed: "30 днів в середньому",
            hint_support: "24/7 підтримка",
            
            // Statistics
            stat_days: "днів мінімум",
            stat_electronic: "Електронізація",
            stat_languages: "Мови",
            stat_experience: "років досвіду",
            
            // Map Section
            map_title: "Інтерактивна карта термінів",
            map_subtitle: "Перевірте актуальні терміни розгляду заяв MOS по всій Польщі",
            filter_region: "Фільтрувати по регіону",
            map_view: "Вигляд",
            view_offices: "Установи",
            view_regions: "Регіони",
            map_fast: "Швидкі (30-35 днів)",
            map_medium: "Середні (40-50 днів)",
            map_slow: "Довгі (60+ днів)",
            
            // FAQ Section
            faq_title: "AI-Powered FAQ",
            faq_subtitle: "Поставте будь-яке питання про міграційне право - AI перешукає базу рішень, процедур і норм",
            faq_placeholder: "Поставте питання про MOS, Praca.gov.pl, громадянство...",
            search_in: "Шукати в",
            judgments: "Рішення",
            procedures: "Процедури",
            regulations: "Норми",
            curiosities: "Цікавості",
            no_results_desc: "Не знайшли відповідь?",
            ask_expert: "Запитайте експерта",
            
            // Chat
            chat_agent_name: "AI Асистент",
            chat_agent_status: "Онлайн 24/7",
            chat_welcome: "👋 Привіт! Я AI асистент MigrantGuidePoland. Як можу допомогти з легалізацією перебування?",
            chat_placeholder: "Напишіть повідомлення...",
            chat_invitation_title: "Потрібна допомога?",
            chat_invitation_text: "Можу допомогти з процедурами MOS і Praca.gov.pl",
            chat_yes: "Так, допоможіть",
            chat_no: "Ні, дякую",
            
            // Loading
            loading_text: "Завантаження майбутнього легалізації..."
        },
        
        en: {
            // Navigation
            brand: "MigrantGuidePoland",
            nav_about: "About us",
            nav_map: "Processing times map",
            nav_faq: "AI FAQ",
            nav_updates: "Law 2025",
            nav_services: "MOS Services",
            nav_contact: "Contact 24/7",
            login_nav: "Client panel",
            
            // Hero Section
            update_banner: "MOS SYSTEM ACTIVE | 2025 REVOLUTION",
            hero_title: "The future of residence legalization today",
            hero_subtitle: "As the first in Poland, we mastered the MOS system with AI. Record processing times of 30 days, 24/7 monitoring, service in 4 languages.",
            btn_smart_booking: "Smart booking",
            btn_ai_faq: "AI FAQ",
            hint_ai: "AI analyzes your situation",
            hint_speed: "30 days average",
            hint_support: "24/7 support",
            
            // Statistics
            stat_days: "days minimum",
            stat_electronic: "Digitalization",
            stat_languages: "Languages",
            stat_experience: "years experience",
            
            // Map Section
            map_title: "Interactive Processing Times Map",
            map_subtitle: "Check current MOS application processing times across Poland",
            filter_region: "Filter by region",
            map_view: "View",
            view_offices: "Offices",
            view_regions: "Regions",
            map_fast: "Fast (30-35 days)",
            map_medium: "Medium (40-50 days)",
            map_slow: "Long (60+ days)",
            
            // FAQ Section
            faq_title: "AI-Powered FAQ",
            faq_subtitle: "Ask any question about migration law - AI searches database of rulings, procedures and regulations",
            faq_placeholder: "Ask about MOS, Praca.gov.pl, citizenship...",
            search_in: "Search in",
            judgments: "Rulings",
            procedures: "Procedures",
            regulations: "Regulations",
            curiosities: "Trivia",
            no_results_desc: "Didn't find an answer?",
            ask_expert: "Ask an expert",
            
            // Chat
            chat_agent_name: "AI Assistant",
            chat_agent_status: "Online 24/7",
            chat_welcome: "👋 Hello! I'm MigrantGuidePoland's AI assistant. How can I help with residence legalization?",
            chat_placeholder: "Write a message...",
            chat_invitation_title: "Need help?",
            chat_invitation_text: "I can help with MOS and Praca.gov.pl procedures",
            chat_yes: "Yes, help me",
            chat_no: "No, thank you",
            
            // Loading
            loading_text: "Loading the future of legalization..."
        },
        
        ru: {
            // Navigation
            brand: "MigrantGuidePoland",
            nav_about: "О нас",
            nav_map: "Карта сроков",
            nav_faq: "AI FAQ",
            nav_updates: "Право 2025",
            nav_services: "Услуги MOS",
            nav_contact: "Контакт 24/7",
            login_nav: "Панель клиента",
            
            // Hero Section
            update_banner: "СИСТЕМА MOS АКТИВНА | РЕВОЛЮЦИЯ 2025",
            hero_title: "Будущее легализации пребывания уже сегодня",
            hero_subtitle: "Как первые в Польше мы освоили систему MOS с AI. Рекордные сроки 30 дней, мониторинг 24/7, обслуживание на 4 языках.",
            btn_smart_booking: "Умная запись",
            btn_ai_faq: "AI FAQ",
            hint_ai: "AI анализирует вашу ситуацию",
            hint_speed: "30 дней в среднем",
            hint_support: "24/7 поддержка",
            
            // Statistics
            stat_days: "дней минимум",
            stat_electronic: "Электронизация",
            stat_languages: "Языки",
            stat_experience: "лет опыта",
            
            // Map Section
            map_title: "Интерактивная карта сроков",
            map_subtitle: "Проверьте актуальные сроки рассмотрения заявлений MOS по всей Польше",
            filter_region: "Фильтровать по региону",
            map_view: "Вид",
            view_offices: "Учреждения",
            view_regions: "Регионы",
            map_fast: "Быстрые (30-35 дней)",
            map_medium: "Средние (40-50 дней)",
            map_slow: "Долгие (60+ дней)",
            
            // FAQ Section
            faq_title: "AI-Powered FAQ",
            faq_subtitle: "Задайте любой вопрос о миграционном праве - AI найдет в базе решений, процедур и норм",
            faq_placeholder: "Спросите о MOS, Praca.gov.pl, гражданстве...",
            search_in: "Искать в",
            judgments: "Решения",
            procedures: "Процедуры",
            regulations: "Нормы",
            curiosities: "Любопытные факты",
            no_results_desc: "Не нашли ответ?",
            ask_expert: "Спросите эксперта",
            
            // Chat
            chat_agent_name: "AI Ассистент",
            chat_agent_status: "Онлайн 24/7",
            chat_welcome: "👋 Привет! Я AI ассистент MigrantGuidePoland. Как могу помочь с легализацией пребывания?",
            chat_placeholder: "Напишите сообщение...",
            chat_invitation_title: "Нужна помощь?",
            chat_invitation_text: "Могу помочь с процедурами MOS и Praca.gov.pl",
            chat_yes: "Да, помогите",
            chat_no: "Нет, спасибо",
            
            // Loading
            loading_text: "Загрузка будущего легализации..."
        }
    };
    
    initializeTranslations() {
        // Set initial language from localStorage or default to Polish
        const savedLang = localStorage.getItem('migrant_language') || 'pl';
        this.setLanguage(savedLang);
    }
    
    // Enhanced setLanguage function that refreshes ALL dynamic content
    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('migrant_language', lang);
        
        // Update all elements with data-key attributes
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            const translation = this.translations[lang]?.[key];
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type !== 'checkbox' && element.type !== 'radio') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update language buttons state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        
        // Refresh dynamic content
        this.refreshMapContent();
        this.refreshFAQContent();
        this.refreshChatContent();
        this.refreshDashboardContent();
        this.refreshOfficeDetails();
        
        // Update document language attribute
        document.documentElement.lang = lang;
        
        console.log(`Language changed to: ${lang}`);
    }
    
    // Refresh map tooltips and content
    refreshMapContent() {
        // Update city marker tooltips
        document.querySelectorAll('.city-marker').forEach(marker => {
            const cityName = marker.getAttribute('data-city');
            const days = marker.getAttribute('data-days');
            
            if (cityName && days) {
                const tooltip = marker.querySelector('.city-tooltip');
                if (tooltip) {
                    const cityTranslations = {
                        pl: { 'Warszawa': 'Warszawa', 'Kraków': 'Kraków', 'Wrocław': 'Wrocław', 'Gdańsk': 'Gdańsk', 'Poznań': 'Poznań', 'Katowice': 'Katowice', 'Szczecin': 'Szczecin', 'Lublin': 'Lublin' },
                        ua: { 'Warszawa': 'Варшава', 'Kraków': 'Краków', 'Wrocław': 'Вроцлав', 'Gdańsk': 'Гданськ', 'Poznań': 'Познань', 'Katowice': 'Катовіце', 'Szczecin': 'Щецин', 'Lublin': 'Люблін' },
                        en: { 'Warszawa': 'Warsaw', 'Kraków': 'Krakow', 'Wrocław': 'Wroclaw', 'Gdańsk': 'Gdansk', 'Poznań': 'Poznan', 'Katowice': 'Katowice', 'Szczecin': 'Szczecin', 'Lublin': 'Lublin' },
                        ru: { 'Warszawa': 'Варшава', 'Kraków': 'Краков', 'Wrocław': 'Вроцлав', 'Gdańsk': 'Гданьск', 'Poznań': 'Познань', 'Katowice': 'Катовице', 'Szczecin': 'Щецин', 'Lublin': 'Люблин' }
                    };
                    
                    const translatedCity = cityTranslations[this.currentLang]?.[cityName] || cityName;
                    const daysText = this.currentLang === 'en' ? 'days' : this.currentLang === 'ua' ? 'днів' : this.currentLang === 'ru' ? 'дней' : 'dni';
                    
                    tooltip.textContent = `${translatedCity}: ${days} ${daysText}`;
                }
            }
        });
    }
    
    // Refresh FAQ content
    refreshFAQContent() {
        // Update FAQ results if visible
        const faqResults = document.getElementById('faqResults');
        if (faqResults && faqResults.children.length > 0) {
            this.displayFAQResults(this.lastFAQQuery || '');
        }
    }
    
    // Refresh chat content
    refreshChatContent() {
        // Update existing messages if needed
        const chatBody = document.getElementById('chatBody');
        if (chatBody) {
            const botMessages = chatBody.querySelectorAll('.chat-message.bot');
            botMessages.forEach((message, index) => {
                if (index === 0) { // Welcome message
                    message.textContent = this.translations[this.currentLang]?.chat_welcome || message.textContent;
                }
            });
        }
    }
    
    // Refresh dashboard content
    refreshDashboardContent() {
        if (this.isLoggedIn) {
            this.loadUserDashboard();
        }
    }
    
    // Refresh office details panel
    refreshOfficeDetails() {
        const officeDetails = document.getElementById('officeDetails');
        if (officeDetails && officeDetails.style.display !== 'none') {
            // Re-render office details with new language
            const currentOffice = this.currentOfficeData;
            if (currentOffice) {
                this.showOfficeDetails(currentOffice);
            }
        }
    }
    
    // ==========================================
    // THEME SYSTEM
    // ==========================================
    
    initializeTheme() {
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('migrant_theme') || 'light';
        this.setTheme(savedTheme);
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('migrant_theme', theme);
        
        // Update theme buttons state
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
        });
        
        console.log(`Theme changed to: ${theme}`);
    }
    
    setAutoTheme() {
        const hour = new Date().getHours();
        const theme = (hour >= 7 && hour < 19) ? 'light' : 'dark';
        this.setTheme(theme);
    }
    
    // ==========================================
    // NAVIGATION SYSTEM
    // ==========================================
    
    initializeNavigation() {
        // Handle navigation scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('mainNav');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
    
    // ==========================================
    // ENHANCED INTERACTIVE MAP WITH REAL COORDINATES
    // ==========================================
    
    loadOfficesData() {
        return {
            'warszawa': {
                name: 'Warszawa',
                days: 45,
                type: 'medium',
                position: { x: 65, y: 30 }, // Real coordinates on Poland map
                address: 'ul. Marszałkowska 1, 00-624 Warszawa',
                phone: '+22 123 456 789',
                email: 'warszawa@mos.gov.pl',
                specializations: ['Karty pobytu', 'Zezwolenia na pracę', 'Obywatelstwo'],
                openHours: 'Pn-Pt: 8:00-16:00',
                availableDates: ['2025-09-15', '2025-09-18', '2025-09-20']
            },
            'krakow': {
                name: 'Kraków',
                days: 40,
                type: 'medium',
                position: { x: 55, y: 60 },
                address: 'ul. Królewska 27, 31-156 Kraków',
                phone: '+12 234 567 890',
                email: 'krakow@mos.gov.pl',
                specializations: ['Karty pobytu', 'Obywatelstwo'],
                openHours: 'Pn-Pt: 8:00-15:00',
                availableDates: ['2025-09-16', '2025-09-19', '2025-09-23']
            },
            'wroclaw': {
                name: 'Wrocław',
                days: 30,
                type: 'fast',
                position: { x: 35, y: 50 },
                address: 'pl. Powstańców Warszawy 1, 53-329 Wrocław',
                phone: '+71 345 678 901',
                email: 'wroclaw@mos.gov.pl',
                specializations: ['Karty pobytu', 'Zezwolenia na pracę', 'Status UE'],
                openHours: 'Pn-Pt: 7:30-15:30',
                availableDates: ['2025-09-14', '2025-09-17', '2025-09-21']
            },
            'gdansk': {
                name: 'Gdańsk',
                days: 35,
                type: 'fast',
                position: { x: 55, y: 15 },
                address: 'ul. Okopowa 21, 80-810 Gdańsk',
                phone: '+58 456 789 012',
                email: 'gdansk@mos.gov.pl',
                specializations: ['Karty pobytu', 'Zezwolenia na pracę'],
                openHours: 'Pn-Pt: 8:00-16:00',
                availableDates: ['2025-09-15', '2025-09-18', '2025-09-22']
            },
            'poznan': {
                name: 'Poznań',
                days: 50,
                type: 'medium',
                position: { x: 35, y: 35 },
                address: 'ul. Kochanowskiego 5, 60-845 Poznań',
                phone: '+61 567 890 123',
                email: 'poznan@mos.gov.pl',
                specializations: ['Karty pobytu', 'Obywatelstwo'],
                openHours: 'Pn-Pt: 8:00-15:00',
                availableDates: ['2025-09-17', '2025-09-20', '2025-09-24']
            },
            'katowice': {
                name: 'Katowice',
                days: 65,
                type: 'slow',
                position: { x: 55, y: 75 },
                address: 'ul. Jagiellońska 25, 40-032 Katowice',
                phone: '+32 678 901 234',
                email: 'katowice@mos.gov.pl',
                specializations: ['Karty pobytu', 'Zezwolenia na pracę'],
                openHours: 'Pn-Pt: 8:00-16:00',
                availableDates: ['2025-09-18', '2025-09-21', '2025-09-25']
            },
            'szczecin': {
                name: 'Szczecin',
                days: 42,
                type: 'medium',
                position: { x: 15, y: 25 },
                address: 'al. Papieża Jana Pawła II 42, 70-453 Szczecin',
                phone: '+91 789 012 345',
                email: 'szczecin@mos.gov.pl',
                specializations: ['Karty pobytu', 'Status UE'],
                openHours: 'Pn-Pt: 8:00-15:00',
                availableDates: ['2025-09-16', '2025-09-19', '2025-09-23']
            },
            'lublin': {
                name: 'Lublin',
                days: 48,
                type: 'medium',
                position: { x: 75, y: 50 },
                address: 'ul. Spokojnej 4, 20-074 Lublin',
                phone: '+81 890 123 456',
                email: 'lublin@mos.gov.pl',
                specializations: ['Karty pobytu', 'Zezwolenia na pracę', 'Obywatelstwo'],
                openHours: 'Pn-Pt: 8:00-16:00',
                availableDates: ['2025-09-17', '2025-09-20', '2025-09-24']
            }
        };
    }
    
    initializeMap() {
        this.createRealisticPolandMap();
        this.addCityMarkers();
        this.initializeMapControls();
    }
    
    createRealisticPolandMap() {
        const mapContainer = document.querySelector('.poland-map');
        if (!mapContainer) return;
        
        // Create realistic Poland SVG map
        mapContainer.innerHTML = `
            <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <!-- Realistic Poland outline based on provided image -->
                <path class="poland-outline" d="M150 120 Q180 100 220 90 L280 80 Q340 70 400 80 L460 85 Q520 95 580 110 L620 125 Q650 140 670 165 L685 200 Q695 240 690 280 L685 320 Q680 360 670 390 L655 420 Q635 445 610 465 L580 485 Q540 505 500 515 L460 525 Q420 530 380 525 L340 520 Q300 515 260 505 L220 495 Q180 485 150 465 L125 440 Q105 410 110 375 L115 335 Q120 295 115 255 L120 215 Q125 175 150 120 Z" />
                
                <!-- Voivodeship boundaries (simplified) -->
                <g id="voivodeshipsLayer" style="display: none;">
                    <!-- Mazowieckie (Warsaw region) -->
                    <path class="voivodeship" data-region="center" d="M450 200 L550 190 L560 280 L480 290 L450 250 Z" />
                    <!-- Małopolskie (Krakow region) -->
                    <path class="voivodeship" data-region="south" d="M380 350 L500 340 L520 420 L400 430 L380 390 Z" />
                    <!-- Dolnośląskie (Wroclaw region) -->
                    <path class="voivodeship" data-region="south" d="M250 300 L380 290 L390 380 L260 390 L250 340 Z" />
                    <!-- Pomorskie (Gdansk region) -->
                    <path class="voivodeship" data-region="north" d="M400 90 L520 80 L530 150 L410 160 L400 125 Z" />
                    <!-- Wielkopolskie (Poznan region) -->
                    <path class="voivodeship" data-region="west" d="M250 200 L380 190 L390 280 L260 290 L250 245 Z" />
                    <!-- Śląskie (Katowice region) -->
                    <path class="voivodeship" data-region="south" d="M380 380 L480 370 L490 450 L390 460 L380 415 Z" />
                    <!-- Zachodniopomorskie (Szczecin region) -->
                    <path class="voivodeship" data-region="west" d="M120 120 L250 110 L260 200 L130 210 L120 165 Z" />
                    <!-- Lubelskie (Lublin region) -->
                    <path class="voivodeship" data-region="center" d="M550 280 L650 270 L660 360 L560 370 L550 315 Z" />
                </g>
            </svg>
        `;
        
        console.log('Realistic Poland map created');
    }
    
    addCityMarkers() {
        const mapContainer = document.querySelector('.poland-map');
        if (!mapContainer) return;
        
        Object.entries(this.officesData).forEach(([cityKey, office]) => {
            const marker = document.createElement('div');
            marker.className = `city-marker ${office.type}`;
            marker.style.left = `${office.position.x}%`;
            marker.style.top = `${office.position.y}%`;
            marker.setAttribute('data-city', office.name);
            marker.setAttribute('data-days', office.days);
            marker.textContent = office.days;
            
            // Add tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'city-tooltip';
            tooltip.textContent = `${office.name}: ${office.days} dni`;
            marker.appendChild(tooltip);
            
            // Add click event
            marker.addEventListener('click', () => {
                this.showOfficeDetails(office);
            });
            
            mapContainer.appendChild(marker);
        });
        
        console.log('City markers added to map');
    }
    
    initializeMapControls() {
        // Region filter
        const regionFilter = document.getElementById('regionFilter');
        if (regionFilter) {
            regionFilter.addEventListener('change', (e) => {
                this.filterMapByRegion(e.target.value);
            });
        }
        
        // View toggle buttons
        document.querySelectorAll('[onclick^="setMapView"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const view = btn.textContent.includes('Regiony') ? 'regions' : 'offices';
                this.setMapView(view);
            });
        });
    }
    
    filterMapByRegion(region) {
        const regionMapping = {
            'north': ['gdansk', 'szczecin'],
            'center': ['warszawa', 'lublin'],
            'south': ['krakow', 'katowice', 'wroclaw'],
            'west': ['poznan', 'szczecin', 'wroclaw']
        };
        
        document.querySelectorAll('.city-marker').forEach(marker => {
            const cityName = marker.getAttribute('data-city')?.toLowerCase();
            const cityKey = Object.keys(this.officesData).find(key => 
                this.officesData[key].name.toLowerCase() === cityName
            );
            
            if (!region || !regionMapping[region] || regionMapping[region].includes(cityKey)) {
                marker.style.display = 'flex';
            } else {
                marker.style.display = 'none';
            }
        });
        
        console.log(`Map filtered by region: ${region || 'all'}`);
    }
    
    setMapView(view) {
        const voivodeshipsLayer = document.getElementById('voivodeshipsLayer');
        const cityMarkers = document.querySelectorAll('.city-marker');
        
        if (view === 'regions') {
            voivodeshipsLayer.style.display = 'block';
            cityMarkers.forEach(marker => marker.style.opacity = '0.7');
        } else {
            voivodeshipsLayer.style.display = 'none';
            cityMarkers.forEach(marker => marker.style.opacity = '1');
        }
        
        // Update button states
        document.querySelectorAll('.btn-group button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[onclick*="${view}"]`)?.classList.add('active');
        
        console.log(`Map view changed to: ${view}`);
    }
    
    showOfficeDetails(office) {
        this.currentOfficeData = office;
        const detailsPanel = document.getElementById('officeDetails');
        const detailsBody = document.getElementById('officeDetailsBody');
        
        if (!detailsPanel || !detailsBody) return;
        
        const statusClass = office.type === 'fast' ? 'success' : office.type === 'medium' ? 'warning' : 'danger';
        const statusText = office.type === 'fast' ? 'Szybkie' : office.type === 'medium' ? 'Średnie' : 'Długie';
        
        detailsBody.innerHTML = `
            <div class="office-info">
                <h4>${office.name}</h4>
                <div class="mb-3">
                    <span class="badge ${statusClass}">${office.days} dni - ${statusText}</span>
                </div>
                
                <div class="office-details-grid">
                    <div class="detail-item">
                        <strong><i class="fas fa-map-marker-alt me-2"></i>Adres:</strong>
                        <p>${office.address}</p>
                    </div>
                    
                    <div class="detail-item">
                        <strong><i class="fas fa-phone me-2"></i>Telefon:</strong>
                        <p><a href="tel:${office.phone}">${office.phone}</a></p>
                    </div>
                    
                    <div class="detail-item">
                        <strong><i class="fas fa-envelope me-2"></i>Email:</strong>
                        <p><a href="mailto:${office.email}">${office.email}</a></p>
                    </div>
                    
                    <div class="detail-item">
                        <strong><i class="fas fa-clock me-2"></i>Godziny:</strong>
                        <p>${office.openHours}</p>
                    </div>
                    
                    <div class="detail-item">
                        <strong><i class="fas fa-list me-2"></i>Specjalizacje:</strong>
                        <p>${office.specializations.join(', ')}</p>
                    </div>
                    
                    <div class="detail-item">
                        <strong><i class="fas fa-calendar me-2"></i>Dostępne terminy:</strong>
                        <div class="available-dates">
                            ${office.availableDates.map(date => 
                                `<button class="btn btn-outline-primary btn-sm me-2 mb-1" onclick="bookAppointment('${office.name}', '${date}')">${date}</button>`
                            ).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="office-actions mt-4">
                    <button class="btn-gradient me-2" onclick="bookConsultation('${office.name}')">
                        <i class="fas fa-calendar-plus me-1"></i>Umów konsultację
                    </button>
                    <button class="btn-outline-gradient" onclick="openPaymentModal('residence')">
                        <i class="fas fa-credit-card me-1"></i>Rozpocznij usługę
                    </button>
                </div>
            </div>
        `;
        
        detailsPanel.style.display = 'block';
        console.log(`Showing details for: ${office.name}`);
    }
    
    // ==========================================
    // ENHANCED FAQ SYSTEM
    // ==========================================
    
    loadFAQData() {
        return [
            {
                id: 'mos_processing_time',
                question: 'How long does MOS application processing take?',
                answer: 'MOS (Module for Case Handling) processing times vary by office: Wrocław 30 days, Warsaw 45 days, Krakow 40 days. Our AI monitoring tracks changes in real-time.',
                category: 'procedures',
                tags: ['mos', 'processing', 'time', 'AI'],
                score: 0
            },
            {
                id: 'praca_gov_test',
                question: 'Is labor market test still required for work permits?',
                answer: 'Since June 1, 2025, labor market test has been abolished for most professions. The new Praca.gov.pl portal handles electronic submissions with penalties of 3000-50000 PLN for violations.',
                category: 'regulations',
                tags: ['praca.gov.pl', 'work permit', 'test', 'electronic'],
                score: 0
            },
            {
                id: 'blockchain_documents',
                question: 'How do blockchain documents work in the new system?',
                answer: 'Starting August 2025, MOS system supports blockchain-verified documents. Each document receives a unique hash ensuring immutability and instant verification.',
                category: 'curiosities',
                tags: ['blockchain', 'documents', 'verification', 'hash'],
                score: 0
            },
            {
                id: 'biometric_requirements',
                question: 'What are the biometric requirements?',
                answer: 'All residence applications now require biometric data collection. Photos and fingerprints are collected at MOS offices or certified biometric centers.',
                category: 'procedures',
                tags: ['biometric', 'photos', 'fingerprints', 'requirements'],
                score: 0
            },
            {
                id: 'ai_monitoring',
                question: 'How does AI monitoring work?',
                answer: 'Our AI system monitors MOS databases 24/7, tracking application status changes, predicting processing times, and alerting clients about updates within minutes.',
                category: 'curiosities',
                tags: ['AI', 'monitoring', '24/7', 'predictions'],
                score: 0
            },
            {
                id: 'citizenship_path',
                question: 'What is the fastest path to Polish citizenship?',
                answer: 'The fastest path depends on individual circumstances. EU long-term residents can apply after 3 years, while others need 5 years of continuous residence. Our AI analyzes your specific situation.',
                category: 'judgments',
                tags: ['citizenship', 'path', 'EU', 'residence'],
                score: 0
            }
        ];
    }
    
    initializeFAQ() {
        this.initializeFAQSearch();
        this.initializeVoiceSearch();
    }
    
    initializeFAQSearch() {
        const searchInput = document.getElementById('faqSearch');
        if (searchInput) {
            // Debounced search
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.searchFAQ(e.target.value);
                }, 300);
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.searchFAQ(e.target.value);
                }
            });
        }
    }
    
    initializeVoiceSearch() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = this.currentLang === 'pl' ? 'pl-PL' : 
                             this.currentLang === 'ua' ? 'uk-UA' :
                             this.currentLang === 'en' ? 'en-US' : 'ru-RU';
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('faqSearch').value = transcript;
                this.searchFAQ(transcript);
            };
            
            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };
            
            this.speechRecognition = recognition;
        }
    }
    
    searchFAQ(query = '') {
        this.lastFAQQuery = query;
        
        if (!query.trim()) {
            this.displayFAQResults([]);
            return;
        }
        
        // Get active filters
        const activeFilters = Array.from(document.querySelectorAll('.filter-options input:checked'))
                                  .map(input => input.value || input.id.replace('search', '').toLowerCase());
        
        // Search and score results
        const results = this.faqData.map(item => {
            let score = 0;
            const lowerQuery = query.toLowerCase();
            
            // Category filter
            if (activeFilters.length > 0 && !activeFilters.includes(item.category)) {
                return null;
            }
            
            // Question match (highest weight)
            if (item.question.toLowerCase().includes(lowerQuery)) {
                score += 100;
            }
            
            // Answer match
            if (item.answer.toLowerCase().includes(lowerQuery)) {
                score += 50;
            }
            
            // Tags match
            item.tags.forEach(tag => {
                if (tag.toLowerCase().includes(lowerQuery) || lowerQuery.includes(tag.toLowerCase())) {
                    score += 30;
                }
            });
            
            // Semantic search (basic word matching)
            const queryWords = lowerQuery.split(' ');
            queryWords.forEach(word => {
                if (word.length > 2) {
                    if (item.question.toLowerCase().includes(word)) score += 20;
                    if (item.answer.toLowerCase().includes(word)) score += 10;
                }
            });
            
            return score > 0 ? { ...item, score } : null;
        }).filter(Boolean).sort((a, b) => b.score - a.score);
        
        this.displayFAQResults(results);
        console.log(`FAQ search completed: "${query}" - ${results.length} results`);
    }
    
    displayFAQResults(results) {
        const resultsContainer = document.getElementById('faqResults');
        if (!resultsContainer) return;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h5>Brak wyników</h5>
                    <p class="text-muted">Spróbuj innych słów kluczowych lub skontaktuj się z ekspertem</p>
                    <button class="btn-gradient" onclick="askExpert()">
                        <i class="fas fa-user-tie me-2"></i>Zapytaj eksperta
                    </button>
                </div>
            `;
            return;
        }
        
        resultsContainer.innerHTML = results.map((item, index) => `
            <div class="faq-item" id="faq-${item.id}">
                <div class="faq-question" onclick="toggleFAQItem('${item.id}')">
                    <span>${item.question}</span>
                    <button class="faq-toggle">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                    <div class="faq-meta mt-3">
                        <span class="badge badge-secondary me-2">${item.category}</span>
                        ${item.tags.map(tag => `<span class="badge badge-light me-1">${tag}</span>`).join('')}
                        <div class="faq-actions mt-2">
                            <button class="btn btn-sm btn-outline-primary me-2" onclick="copyFAQLink('${item.id}')">
                                <i class="fas fa-link me-1"></i>Kopiuj link
                            </button>
                            <button class="btn btn-sm btn-outline-success" onclick="askFollowUp('${item.id}')">
                                <i class="fas fa-comments me-1"></i>Zadaj pytanie
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // ==========================================
    // ENHANCED CHAT SYSTEM (MOVED TO BOTTOM RIGHT)
    // ==========================================
    
    initializeChat() {
        this.setupChatToggle();
        this.setupChatInput();
        this.setupQuickReplies();
        this.showChatInvitationAfterDelay();
    }
    
    setupChatToggle() {
        const chatToggle = document.getElementById('chatToggle');
        const chatWidget = document.getElementById('chatWidget');
        const chatClose = document.getElementById('chatClose');
        
        if (chatToggle && chatWidget) {
            chatToggle.addEventListener('click', () => {
                this.toggleChat();
            });
        }
        
        if (chatClose) {
            chatClose.addEventListener('click', () => {
                this.closeChat();
            });
        }
        
        // Position chat button in bottom right
        if (chatToggle) {
            chatToggle.style.position = 'fixed';
            chatToggle.style.bottom = '30px';
            chatToggle.style.right = '30px';
            chatToggle.style.zIndex = '4000';
        }
        
        // Position chat widget in bottom right
        if (chatWidget) {
            chatWidget.style.position = 'fixed';
            chatWidget.style.bottom = '100px';
            chatWidget.style.right = '30px';
            chatWidget.style.zIndex = '4000';
        }
    }
    
    setupChatInput() {
        const chatInput = document.getElementById('chatInput');
        const chatSend = document.getElementById('chatSend');
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendChatMessage();
                }
            });
        }
        
        if (chatSend) {
            chatSend.addEventListener('click', () => {
                this.sendChatMessage();
            });
        }
    }
    
    setupQuickReplies() {
        document.querySelectorAll('.quick-reply-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const reply = btn.getAttribute('data-reply');
                this.sendQuickReply(reply);
            });
        });
    }
    
    toggleChat() {
        const chatWidget = document.getElementById('chatWidget');
        const chatNotification = document.getElementById('chatNotification');
        
        this.chatOpen = !this.chatOpen;
        
        if (this.chatOpen) {
            chatWidget.classList.add('open');
            if (chatNotification) {
                chatNotification.style.display = 'none';
            }
        } else {
            chatWidget.classList.remove('open');
        }
        
        console.log(`Chat ${this.chatOpen ? 'opened' : 'closed'}`);
    }
    
    closeChat() {
        const chatWidget = document.getElementById('chatWidget');
        chatWidget.classList.remove('open');
        this.chatOpen = false;
    }
    
    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        input.value = '';
        
        // Add user message to chat
        this.appendChatMessage(message, true);
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate AI response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateChatResponse(message);
            this.appendChatMessage(response, false);
        }, 1500);
    }
    
    sendQuickReply(reply) {
        const responses = {
            'mos': 'System MOS (mos.cudzoziemcy.gov.pl) umożliwia elektroniczne składanie wniosków. Aktualne terminy: Wrocław 30 dni, Warszawa 45 dni. Mogę pomóc w całym procesie!',
            'praca': 'Od 1 czerwca 2025 nie ma już testu rynku pracy! Portal Praca.gov.pl obsługuje wszystko elektronicznie. Chcesz złożyć wniosek?',
            'obywatelstwo': 'Ścieżka do obywatelstwa zależy od Twojej sytuacji. Zwykle 5 lat pobytu, ale są wyjątki. Przeanalizuję Twoją sytuację - opowiedz mi więcej!',
            'terminy': 'Aktualne terminy MOS: Wrocław 30 dni, Kraków 40 dni, Warszawa 45 dni. Monitorujemy zmiany w czasie rzeczywistym. Które miasto Cię interesuje?'
        };
        
        const response = responses[reply] || 'Jak mogę Ci pomóc?';
        
        this.appendChatMessage(`Pytanie o: ${reply}`, true);
        
        setTimeout(() => {
            this.appendChatMessage(response, false);
        }, 800);
    }
    
    generateChatResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simple keyword-based responses
        if (lowerMessage.includes('mos') || lowerMessage.includes('karta')) {
            return 'System MOS to przyszłość! Aktualne terminy to 30-45 dni. Nasze AI monitoruje zmiany 24/7. Mogę sprawdzić najszybszy termin dla Ciebie. W którym mieście chcesz złożyć wniosek?';
        }
        
        if (lowerMessage.includes('praca') || lowerMessage.includes('work')) {
            return 'Od czerwca 2025 bez testu rynku! Portal Praca.gov.pl to rewolucja. Mogę pomóc w całym procesie elektronicznego składania. Jakiego typu zezwolenie Cię interesuje?';
        }
        
        if (lowerMessage.includes('obywatel') || lowerMessage.includes('citizen')) {
            return 'Obywatelstwo to kompleksowy proces. Sprawdzę Twoje uprawnienia AI analizą. Ile lat mieszkasz w Polsce? Posiadasz kartę pobytu?';
        }
        
        if (lowerMessage.includes('termin') || lowerMessage.includes('czas')) {
            return 'Aktualne terminy MOS: Wrocław 30 dni (najszybszy!), Kraków 40 dni, Warszawa 45 dni. Monitoruję zmiany co 5 minut. Chcesz umówić konsultację?';
        }
        
        if (lowerMessage.includes('cena') || lowerMessage.includes('koszt')) {
            return 'Nasze usługi: Karta pobytu 1890 zł, Zezwolenie na pracę 1590 zł, Obywatelstwo Premium 4790 zł. Wszystkie ceny z gwarancją terminów!';
        }
        
        // Default response
        return 'Rozumiem Twoje pytanie! Jako AI asystent MigrantGuidePoland mogę pomóc z procedurami MOS, Praca.gov.pl i obywatelstwa. Potrzebujesz szczegółowych informacji czy może od razu umówimy konsultację z ekspertem?';
    }
    
    appendChatMessage(message, isUser = false) {
        const chatBody = document.getElementById('chatBody');
        if (!chatBody) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        messageElement.textContent = message;
        
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
        
        this.chatMessages.push({ message, isUser, timestamp: Date.now() });
    }
    
    showTypingIndicator() {
        const chatBody = document.getElementById('chatBody');
        if (!chatBody) return;
        
        const typingElement = document.createElement('div');
        typingElement.className = 'chat-message bot typing-indicator';
        typingElement.id = 'typing-indicator';
        typingElement.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        chatBody.appendChild(typingElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    showChatInvitationAfterDelay() {
        // Show chat invitation after 5 seconds if user hasn't interacted with chat
        setTimeout(() => {
            if (!this.chatOpen) {
                this.showChatInvitation();
            }
        }, 5000);
    }
    
    showChatInvitation() {
        const invitation = document.getElementById('chatInvitation');
        if (invitation) {
            invitation.classList.add('show');
        }
    }
    
    // ==========================================
    // MODAL SYSTEMS
    // ==========================================
    
    initializeModals() {
        this.initializeLoginModal();
        this.initializeDashboardModal();
        this.initializePaymentModal();
        this.initializeCalendarModal();
        this.initializeSigningModal();
    }
    
    initializeLoginModal() {
        // Login/Register tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.getAttribute('data-tab');
                this.switchLoginTab(tabName);
            });
        });
        
        // Form submissions
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
        
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
    }
    
    switchLoginTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
        });
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}Tab`);
        });
    }
    
    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Simulate login process
        if (email && password) {
            this.currentUser = {
                email: email,
                name: email.split('@')[0],
                id: Date.now()
            };
            
            this.isLoggedIn = true;
            
            if (rememberMe) {
                localStorage.setItem('migrant_user', JSON.stringify(this.currentUser));
            }
            
            this.updateLoginState();
            this.closeLoginModal();
            this.showDashboard();
            
            console.log('User logged in:', this.currentUser);
        }
    }
    
    handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;
        
        if (password !== confirmPassword) {
            alert('Hasła nie są identyczne!');
            return;
        }
        
        if (!acceptTerms) {
            alert('Musisz zaakceptować regulamin!');
            return;
        }
        
        // Simulate registration process
        this.currentUser = {
            name: name,
            email: email,
            phone: phone,
            id: Date.now()
        };
        
        this.isLoggedIn = true;
        localStorage.setItem('migrant_user', JSON.stringify(this.currentUser));
        
        this.updateLoginState();
        this.closeLoginModal();
        this.showDashboard();
        
        console.log('User registered:', this.currentUser);
    }
    
    updateLoginState() {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn && this.isLoggedIn) {
            loginBtn.innerHTML = `<i class="fas fa-user-check"></i> <span>${this.currentUser.name}</span>`;
        }
    }
    
    // ==========================================
    // DASHBOARD SYSTEM
    // ==========================================
    
    initializeDashboardModal() {
        // Check for saved user on load
        const savedUser = localStorage.getItem('migrant_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.isLoggedIn = true;
            this.updateLoginState();
        }
    }
    
    showDashboard() {
        if (!this.isLoggedIn) {
            this.openLoginModal();
            return;
        }
        
        const dashboardModal = document.getElementById('dashboardModal');
        if (dashboardModal) {
            dashboardModal.classList.add('show');
            this.loadUserDashboard();
        }
    }
    
    loadUserDashboard() {
        const userNameSpan = document.getElementById('userName');
        const userCases = document.getElementById('userCases');
        const userDocuments = document.getElementById('userDocuments');
        const crossSellRecommendations = document.getElementById('crossSellRecommendations');
        
        if (userNameSpan) {
            userNameSpan.textContent = this.currentUser.name;
        }
        
        // Load user cases (simulated)
        if (userCases) {
            userCases.innerHTML = this.generateUserCases();
        }
        
        // Load user documents (simulated)
        if (userDocuments) {
            userDocuments.innerHTML = this.generateUserDocuments();
        }
        
        // Load recommendations
        if (crossSellRecommendations) {
            crossSellRecommendations.innerHTML = this.generateCrossSellRecommendations();
        }
    }
    
    generateUserCases() {
        const cases = [
            {
                id: 'MOS-2025-001234',
                type: 'Karta Pobytu',
                status: 'W trakcie',
                progress: 75,
                office: 'Wrocław',
                expectedDate: '2025-09-20'
            },
            {
                id: 'PRACA-2025-005678',
                type: 'Zezwolenie na pracę',
                status: 'Dokumenty złożone',
                progress: 40,
                office: 'Warszawa',
                expectedDate: '2025-09-30'
            }
        ];
        
        return cases.map(caseItem => `
            <div class="case-item">
                <div class="case-header">
                    <h6>${caseItem.type}</h6>
                    <span class="case-id">${caseItem.id}</span>
                </div>
                <div class="case-details">
                    <p><strong>Status:</strong> ${caseItem.status}</p>
                    <p><strong>Urząd:</strong> ${caseItem.office}</p>
                    <p><strong>Przewidywana data:</strong> ${caseItem.expectedDate}</p>
                </div>
                <div class="progress mb-2">
                    <div class="progress-bar" style="width: ${caseItem.progress}%"></div>
                </div>
                <div class="case-actions">
                    <button class="btn btn-sm btn-outline-primary" onclick="viewCaseDetails('${caseItem.id}')">
                        <i class="fas fa-eye me-1"></i>Szczegóły
                    </button>
                    <button class="btn btn-sm btn-outline-success" onclick="downloadCaseDocuments('${caseItem.id}')">
                        <i class="fas fa-download me-1"></i>Dokumenty
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    generateUserDocuments() {
        const documents = [
            {
                name: 'Wniosek o kartę pobytu',
                type: 'PDF',
                size: '2.4 MB',
                date: '2025-08-15',
                status: 'Podpisany',
                signed: true
            },
            {
                name: 'Zaświadczenie o zatrudnieniu',
                type: 'PDF',
                size: '1.8 MB',
                date: '2025-08-10',
                status: 'Oczekuje podpisu',
                signed: false
            }
        ];
        
        return documents.map(doc => `
            <div class="document-item">
                <div class="d-flex align-items-center">
                    <i class="fas fa-file-pdf text-danger fa-2x me-3"></i>
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${doc.name}</h6>
                        <small class="text-muted">${doc.type} • ${doc.size} • ${doc.date}</small>
                        <div class="mt-1">
                            <span class="badge ${doc.signed ? 'badge-success' : 'badge-warning'}">${doc.status}</span>
                        </div>
                    </div>
                </div>
                <div class="document-actions">
                    <button class="btn btn-sm btn-outline-primary" onclick="downloadDocument('${doc.name}')">
                        <i class="fas fa-download me-1"></i>Pobierz
                    </button>
                    ${!doc.signed ? `<button class="btn btn-sm btn-outline-success" onclick="signDocument('${doc.name}')">
                        <i class="fas fa-signature me-1"></i>Podpisz
                    </button>` : ''}
                </div>
            </div>
        `).join('');
    }
    
    logout() {
        this.isLoggedIn = false;
        this.currentUser = null;
        localStorage.removeItem('migrant_user');
        
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.innerHTML = `<i class="fas fa-user"></i> <span data-key="login_nav">Panel klienta</span>`;
        }
        
        this.closeDashboard();
        console.log('User logged out');
    }
    
    // ==========================================
    // PAYMENT SYSTEM
    // ==========================================
    
    loadServicesData() {
        return {
            'residence': {
                name: 'Karta Pobytu przez MOS',
                price: 1890,
                features: ['Pełna obsługa MOS', 'AI monitoring', 'Gwarancja terminów', 'Wsparcie 24/7'],
                description: 'Kompleksowa obsługa karty pobytu przez system MOS z gwarancją terminów'
            },
            'work': {
                name: 'Zezwolenia Praca.gov.pl',
                price: 1590,
                features: ['Portal Praca.gov.pl', 'Bez testu rynku', 'E-składanie', 'Ochrona przed karami'],
                description: 'Obsługa zezwoleń na pracę przez nowy portal elektroniczny'
            },
            'citizenship': {
                name: 'Obywatelstwo Premium',
                price: 4790,
                features: ['AI analiza uprawnień', 'Pełna dokumentacja', 'Wsparcie prawne', 'Ścieżka do obywatelstwa'],
                description: 'Kompleksowa usługa prowadząca do uzyskania obywatelstwa polskiego'
            }
        };
    }
    
    initializePaymentModal() {
        // Payment method selection
        document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.updatePaymentForm(radio.value);
            });
        });
    }
    
    openPaymentModal(serviceType) {
        const service = this.servicesData[serviceType];
        if (!service) return;
        
        const paymentModal = document.getElementById('paymentModal');
        const serviceInfo = document.getElementById('serviceInfo');
        
        if (serviceInfo) {
            serviceInfo.innerHTML = `
                <div class="service-info">
                    <h5>${service.name}</h5>
                    <p class="text-muted">${service.description}</p>
                    <div class="service-features">
                        ${service.features.map(feature => `<span class="feature-badge info">${feature}</span>`).join('')}
                    </div>
                    <div class="service-price mt-3">
                        <h4 class="text-primary">${service.price} zł</h4>
                    </div>
                </div>
            `;
        }
        
        if (paymentModal) {
            paymentModal.classList.add('show');
            this.currentService = { type: serviceType, ...service };
        }
        
        console.log(`Payment modal opened for: ${service.name}`);
    }
    
    updatePaymentForm(method) {
        const paymentForm = document.getElementById('paymentForm');
        if (!paymentForm) return;
        
        let formHTML = '';
        
        switch (method) {
            case 'stripe':
                formHTML = `
                    <h6>Dane karty płatniczej</h6>
                    <div class="mb-3">
                        <input type="text" class="form-control" placeholder="Numer karty" maxlength="19">
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <input type="text" class="form-control" placeholder="MM/YY" maxlength="5">
                        </div>
                        <div class="col-6">
                            <input type="text" class="form-control" placeholder="CVV" maxlength="3">
                        </div>
                    </div>
                `;
                break;
            case 'przelewy24':
                formHTML = `
                    <h6>Przelewy24</h6>
                    <p class="text-muted">Zostaniesz przekierowany do Przelewy24 w celu dokończenia płatności.</p>
                    <div class="payment-icons">
                        <i class="fas fa-university"></i>
                        <i class="fas fa-mobile-alt"></i>
                        <span>BLIK</span>
                    </div>
                `;
                break;
            case 'crypto':
                formHTML = `
                    <h6>Płatność kryptowalutami</h6>
                    <div class="mb-3">
                        <select class="form-select">
                            <option>Bitcoin (BTC)</option>
                            <option>Ethereum (ETH)</option>
                            <option>USD Coin (USDC)</option>
                        </select>
                    </div>
                    <p class="text-muted">Po kliknięciu "Płacę" otrzymasz adres portfela do przelewu.</p>
                `;
                break;
        }
        
        paymentForm.innerHTML = formHTML;
        paymentForm.style.display = 'block';
    }
    
    processPayment() {
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedMethod) {
            alert('Wybierz metodę płatności!');
            return;
        }
        
        // Simulate payment processing
        const paymentBtn = document.querySelector('[onclick="processPayment()"]');
        if (paymentBtn) {
            paymentBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Przetwarzanie...';
            paymentBtn.disabled = true;
        }
        
        setTimeout(() => {
            alert('Płatność zakończona sukcesem! Sprawdź email z potwierdzeniem.');
            this.closePaymentModal();
            
            // Add to cross-selling tracking
            this.trackPurchase(this.currentService.type);
            
            if (paymentBtn) {
                paymentBtn.innerHTML = '<i class="fas fa-lock me-2"></i>Bezpieczna płatność';
                paymentBtn.disabled = false;
            }
        }, 2000);
        
        console.log(`Processing payment: ${selectedMethod.value} for ${this.currentService.name}`);
    }
    
    // ==========================================
    // CALENDAR INTEGRATION
    // ==========================================
    
    initializeCalendarModal() {
        // Calendar integration is handled by individual functions
        console.log('Calendar integration initialized');
    }
    
    openCalendarIntegration() {
        const calendarModal = document.getElementById('calendarModal');
        if (calendarModal) {
            // Populate with sample event data
            document.getElementById('eventTitle').textContent = 'Konsultacja MOS';
            document.getElementById('eventDate').textContent = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
            document.getElementById('eventTime').textContent = '10:00';
            document.getElementById('eventType').textContent = 'Konsultacja online';
            
            calendarModal.classList.add('show');
        }
    }
    
    addToGoogleCalendar() {
        const title = encodeURIComponent('Konsultacja MOS - MigrantGuidePoland');
        const startDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later
        
        const startDateString = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const endDateString = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateString}/${endDateString}&details=Konsultacja%20dotycząca%20procedur%20MOS&location=Online`;
        
        window.open(url, '_blank');
        this.closeCalendarModal();
    }
    
    addToOutlook() {
        const title = encodeURIComponent('Konsultacja MOS - MigrantGuidePoland');
        const startDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
        
        const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=Konsultacja%20dotycząca%20procedur%20MOS&location=Online`;
        
        window.open(url, '_blank');
        this.closeCalendarModal();
    }
    
    downloadICS() {
        const event = {
            title: 'Konsultacja MOS - MigrantGuidePoland',
            start: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
            description: 'Konsultacja dotycząca procedur MOS',
            location: 'Online'
        };
        
        const icsContent = this.generateICS(event);
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'konsultacja-mos.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.closeCalendarModal();
    }
    
    generateICS(event) {
        const formatDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        
        return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MigrantGuidePoland//Calendar//EN
BEGIN:VEVENT
UID:${Date.now()}@migrantguidepoland.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(event.start)}
DTEND:${formatDate(event.end)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
    }
    
    // ==========================================
    // DOCUMENT SIGNING
    // ==========================================
    
    initializeDocumentSigning() {
        console.log('Document signing system initialized');
    }
    
    signDocument(documentName) {
        const signingModal = document.getElementById('signingModal');
        if (signingModal) {
            signingModal.classList.add('show');
            this.currentDocument = documentName;
        }
    }
    
    signWithAdobeSign() {
        this.processDocumentSigning('Adobe Sign');
    }
    
    signWithDocuSign() {
        this.processDocumentSigning('DocuSign');
    }
    
    signWithAsseco() {
        this.processDocumentSigning('Asseco');
    }
    
    processDocumentSigning(provider) {
        alert(`Email z linkiem do podpisania przez ${provider} został wysłany na Twój adres email.`);
        this.closeSigningModal();
        
        // Update document status in dashboard
        setTimeout(() => {
            if (this.isLoggedIn) {
                this.loadUserDashboard();
            }
        }, 1000);
        
        console.log(`Document signing initiated with ${provider} for: ${this.currentDocument}`);
    }
    
    // ==========================================
    // CROSS-SELLING SYSTEM
    // ==========================================
    
    initializeCrossSelling() {
        this.purchaseHistory = this.loadPurchaseHistory();
        this.generateCrossSellRecommendations();
    }
    
    loadPurchaseHistory() {
        return JSON.parse(localStorage.getItem('migrant_purchases') || '[]');
    }
    
    trackPurchase(serviceType) {
        const purchase = {
            type: serviceType,
            date: new Date().toISOString(),
            price: this.servicesData[serviceType].price
        };
        
        this.purchaseHistory.push(purchase);
        localStorage.setItem('migrant_purchases', JSON.stringify(this.purchaseHistory));
        
        // Show cross-sell recommendations
        this.showCrossSellSection();
        this.generateCrossSellRecommendations();
        
        console.log('Purchase tracked:', purchase);
    }
    
    generateCrossSellRecommendations() {
        if (this.purchaseHistory.length === 0) return '';
        
        const lastPurchase = this.purchaseHistory[this.purchaseHistory.length - 1];
        const recommendations = this.getCrossSellRecommendations(lastPurchase.type);
        
        return recommendations.map(rec => `
            <div class="recommendation-card">
                <div class="rec-header">
                    <h6>${rec.title}</h6>
                    <span class="discount-badge">-${rec.discount}%</span>
                </div>
                <div class="rec-reason">${rec.reason}</div>
                <div class="cross-sell-offer">
                    <div class="discount">${rec.discount}% TANIEJ!</div>
                    <div class="pricing">
                        <span class="original-price">${rec.originalPrice} zł</span>
                        <span class="discounted-price">${rec.discountedPrice} zł</span>
                    </div>
                    <button class="btn-gradient btn-sm w-100 mt-2" onclick="openPaymentModal('${rec.serviceType}')">
                        <i class="fas fa-plus me-1"></i>Dodaj do pakietu
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    getCrossSellRecommendations(purchasedService) {
        const recommendations = {
            'residence': [
                {
                    serviceType: 'work',
                    title: 'Zezwolenie na pracę',
                    reason: 'Posiadacze karty pobytu często potrzebują zezwolenia na pracę',
                    discount: 15,
                    originalPrice: 1590,
                    discountedPrice: 1351
                }
            ],
            'work': [
                {
                    serviceType: 'residence',
                    title: 'Pakiet po karcie pobytu',
                    reason: 'Następny krok po zezwoleniu na pracę',
                    discount: 10,
                    originalPrice: 1890,
                    discountedPrice: 1701
                }
            ],
            'citizenship': []
        };
        
        return recommendations[purchasedService] || [];
    }
    
    showCrossSellSection() {
        const crossSellSection = document.getElementById('crossSellSection');
        if (crossSellSection) {
            crossSellSection.style.display = 'block';
            
            const recommendationCards = document.getElementById('recommendationCards');
            if (recommendationCards) {
                recommendationCards.innerHTML = this.generateCrossSellRecommendations();
            }
        }
    }
    
    // ==========================================
    // PREFERENCES & PERSONALIZATION
    // ==========================================
    
    loadUserPreferences() {
        const defaults = {
            autoTheme: false,
            preferredService: '',
            contactMethod: 'email',
            notifications: ['mos', 'praca'],
            language: 'pl'
        };
        
        const saved = localStorage.getItem('migrant_preferences');
        return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    }
    
    initializePreferences() {
        this.populatePreferencesPanel();
        this.setupPreferencesListeners();
        this.applyPersonalization();
    }
    
    populatePreferencesPanel() {
        const autoTheme = document.getElementById('autoTheme');
        const preferredService = document.getElementById('preferredService');
        const contactMethod = document.getElementById('contactMethod');
        
        if (autoTheme) autoTheme.checked = this.userPreferences.autoTheme;
        if (preferredService) preferredService.value = this.userPreferences.preferredService;
        if (contactMethod) contactMethod.value = this.userPreferences.contactMethod;
        
        // Notification categories
        this.userPreferences.notifications.forEach(category => {
            const checkbox = document.querySelector(`input[value="${category}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
    
    setupPreferencesListeners() {
        const preferencesInputs = document.querySelectorAll('#preferencesPanel input, #preferencesPanel select');
        preferencesInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.updateUserPreferences();
            });
        });
    }
    
    updateUserPreferences() {
        const autoTheme = document.getElementById('autoTheme')?.checked || false;
        const preferredService = document.getElementById('preferredService')?.value || '';
        const contactMethod = document.getElementById('contactMethod')?.value || 'email';
        
        const notifications = Array.from(document.querySelectorAll('.notification-categories input:checked'))
                                  .map(input => input.value);
        
        this.userPreferences = {
            autoTheme,
            preferredService,
            contactMethod,
            notifications,
            language: this.currentLang
        };
        
        localStorage.setItem('migrant_preferences', JSON.stringify(this.userPreferences));
        this.applyPersonalization();
        
        console.log('User preferences updated:', this.userPreferences);
    }
    
    applyPersonalization() {
        // Apply auto-theme if enabled
        if (this.userPreferences.autoTheme) {
            this.setAutoTheme();
        }
        
        // Show personalized recommendations in hero
        this.showHeroPersonalization();
        
        // Customize contact section
        this.personalizeContactSection();
    }
    
    showHeroPersonalization() {
        const heroPersonalization = document.getElementById('heroPersonalization');
        if (!heroPersonalization || !this.userPreferences.preferredService) return;
        
        const service = this.servicesData[this.userPreferences.preferredService];
        if (service) {
            heroPersonalization.innerHTML = `
                <div class="personalized-recommendation">
                    <i class="fas fa-star"></i>
                    <div>
                        <strong>Rekomendowane dla Ciebie:</strong>
                        <span>${service.name} - ${service.price} zł</span>
                        <button class="btn btn-sm btn-outline-primary ms-2" onclick="openPaymentModal('${this.userPreferences.preferredService}')">
                            Więcej info
                        </button>
                    </div>
                </div>
            `;
            
            heroPersonalization.classList.add('show');
        }
    }
    
    personalizeContactSection() {
        // Highlight preferred contact method
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            card.classList.remove('recommended');
            
            if (this.userPreferences.contactMethod === 'phone' && card.textContent.includes('Telefon')) {
                card.classList.add('recommended');
            } else if (this.userPreferences.contactMethod === 'email' && card.textContent.includes('Email')) {
                card.classList.add('recommended');
            } else if (this.userPreferences.contactMethod === 'whatsapp' && card.textContent.includes('WhatsApp')) {
                card.classList.add('recommended');
            }
        });
    }
    
    // ==========================================
    // NOTIFICATIONS SYSTEM
    // ==========================================
    
    initializeNotifications() {
        this.setupPushNotifications();
        this.showPushBanner();
    }
    
    setupPushNotifications() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            this.initializeServiceWorker();
        }
    }
    
    initializeServiceWorker() {
        // Service worker registration for push notifications
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
    
    showPushBanner() {
        // Show push notification banner after 10 seconds if not dismissed
        setTimeout(() => {
            const banner = document.getElementById('pushBanner');
            const dismissed = localStorage.getItem('push_banner_dismissed');
            
            if (banner && !dismissed) {
                banner.classList.add('show');
            }
        }, 10000);
    }
    
    enablePushNotifications() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.subscribeToNotifications();
                    this.closePushBanner();
                }
            });
        }
    }
    
    subscribeToNotifications() {
        // Simulate subscription to push notifications
        const subscription = {
            categories: this.userPreferences.notifications,
            timestamp: Date.now()
        };
        
        localStorage.setItem('push_subscription', JSON.stringify(subscription));
        console.log('Subscribed to push notifications:', subscription);
    }
    
    closePushBanner() {
        const banner = document.getElementById('pushBanner');
        if (banner) {
            banner.classList.remove('show');
            localStorage.setItem('push_banner_dismissed', 'true');
        }
    }
    
    // ==========================================
    // ANIMATION SYSTEM
    // ==========================================
    
    initializeAnimations() {
        this.initializeScrollAnimations();
        this.initializeStatsCounter();
        this.initializeHeroAnimations();
    }
    
    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);
        
        // Observe all elements with animation classes
        document.querySelectorAll('.fade-up, .fade-left, .fade-right, .hover-reveal').forEach(el => {
            observer.observe(el);
        });
    }
    
    initializeStatsCounter() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStatsCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.stat-number').forEach(stat => {
            statsObserver.observe(stat);
        });
    }
    
    animateStatsCounter(element) {
        const text = element.textContent;
        const number = parseInt(text.match(/\d+/)?.[0] || '0');
        const suffix = text.replace(/\d+/, '');
        
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 40);
    }
    
    initializeHeroAnimations() {
        // Delay hero content animation after loading screen
        setTimeout(() => {
            document.querySelectorAll('.hero .fade-up').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('revealed');
                }, index * 200);
            });
        }, 2500);
    }
    
    // ==========================================
    // SMART BOOKING SYSTEM
    // ==========================================
    
    smartBooking() {
        // AI-powered booking based on user preferences and current situation
        if (!this.isLoggedIn) {
            this.openLoginModal();
            return;
        }
        
        // Analyze user preferences and recommend optimal service
        const recommendation = this.getSmartRecommendation();
        
        if (recommendation) {
            const confirmed = confirm(`AI Rekomendacja: ${recommendation.service} w ${recommendation.office} (${recommendation.days} dni). Chcesz kontynuować?`);
            if (confirmed) {
                this.openPaymentModal(recommendation.serviceType);
            }
        }
    }
    
    getSmartRecommendation() {
        // Simple AI logic based on user data and office efficiency
        const preferredService = this.userPreferences.preferredService || 'residence';
        const fastestOffices = Object.entries(this.officesData)
                                    .sort((a, b) => a[1].days - b[1].days)
                                    .slice(0, 3);
        
        const recommendedOffice = fastestOffices[0][1];
        
        return {
            service: this.servicesData[preferredService].name,
            serviceType: preferredService,
            office: recommendedOffice.name,
            days: recommendedOffice.days
        };
    }
    
    // ==========================================
    // EVENT LISTENERS & GLOBAL FUNCTIONS
    // ==========================================
    
    setupEventListeners() {
        // Settings dropdown
        document.getElementById('settingsBtn')?.addEventListener('click', this.toggleSettingsMenu.bind(this));
        
        // Theme buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setTheme(btn.getAttribute('data-theme'));
            });
        });
        
        // Language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setLanguage(btn.getAttribute('data-lang'));
            });
        });
        
        // Login button
        document.getElementById('loginBtn')?.addEventListener('click', () => {
            if (this.isLoggedIn) {
                this.showDashboard();
            } else {
                this.openLoginModal();
            }
        });
        
        // Close buttons for modals
        document.querySelectorAll('.close, [onclick*="close"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.closest('.modal, .login-modal, .dashboard-modal, .payment-modal, .calendar-modal, .signing-modal')?.id;
                if (modalId) {
                    this.closeModal(modalId);
                }
            });
        });
        
        // Preferences panel
        document.getElementById('preferencesClose')?.addEventListener('click', () => {
            this.closePreferencesPanel();
        });
        
        // Chat invitation
        document.querySelectorAll('[onclick*="acceptChatInvitation"], [onclick*="dismissChatInvitation"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (btn.onclick.toString().includes('accept')) {
                    this.acceptChatInvitation();
                } else {
                    this.dismissChatInvitation();
                }
            });
        });
        
        // Push notification banner
        document.querySelector('#pushBanner .close-btn')?.addEventListener('click', () => {
            this.closePushBanner();
        });
        
        // Click outside to close dropdowns
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.settings-dropdown')) {
                this.closeSettingsMenu();
            }
            if (!e.target.closest('.preferences-panel') && !e.target.closest('[onclick="openPreferences()"]')) {
                this.closePreferencesPanel();
            }
        });
        
        // Escape key handlers
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSettingsMenu();
                this.closePreferencesPanel();
                if (this.chatOpen) {
                    this.closeChat();
                }
            }
        });
        
        console.log('Event listeners initialized');
    }
    
    toggleSettingsMenu() {
        const settingsMenu = document.getElementById('settingsMenu');
        if (settingsMenu) {
            settingsMenu.classList.toggle('show');
        }
    }
    
    closeSettingsMenu() {
        const settingsMenu = document.getElementById('settingsMenu');
        if (settingsMenu) {
            settingsMenu.classList.remove('show');
        }
    }
    
    closePreferencesPanel() {
        const preferencesPanel = document.getElementById('preferencesPanel');
        if (preferencesPanel) {
            preferencesPanel.classList.remove('show');
        }
    }
    
    acceptChatInvitation() {
        this.dismissChatInvitation();
        this.toggleChat();
    }
    
    dismissChatInvitation() {
        const chatInvitation = document.getElementById('chatInvitation');
        if (chatInvitation) {
            chatInvitation.classList.remove('show');
        }
    }
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
        }
    }
    
    // Modal close functions
    openLoginModal() { document.getElementById('loginModal')?.classList.add('show'); }
    closeLoginModal() { document.getElementById('loginModal')?.classList.remove('show'); }
    showDashboard() { document.getElementById('dashboardModal')?.classList.add('show'); }
    closeDashboard() { document.getElementById('dashboardModal')?.classList.remove('show'); }
    closePaymentModal() { document.getElementById('paymentModal')?.classList.remove('show'); }
    closeCalendarModal() { document.getElementById('calendarModal')?.classList.remove('show'); }
    closeSigningModal() { document.getElementById('signingModal')?.classList.remove('show'); }
    closeOfficeDetails() { document.getElementById('officeDetails').style.display = 'none'; }
    
    // Voice search
    startVoiceSearch() {
        if (this.speechRecognition) {
            this.speechRecognition.start();
        } else {
            alert('Rozpoznawanie mowy nie jest obsługiwane w tej przeglądarce.');
        }
    }
    
    // FAQ functions
    searchFAQTerm(term) {
        document.getElementById('faqSearch').value = term;
        this.searchFAQ(term);
    }
    
    toggleFAQItem(itemId) {
        const item = document.getElementById(`faq-${itemId}`);
        if (item) {
            item.classList.toggle('open');
        }
    }
    
    copyFAQLink(itemId) {
        const url = `${window.location.href}#faq-${itemId}`;
        navigator.clipboard.writeText(url).then(() => {
            alert('Link skopiowany do schowka!');
        });
    }
    
    askFollowUp(itemId) {
        this.toggleChat();
        setTimeout(() => {
            document.getElementById('chatInput').value = `Mam pytanie dotyczące: ${itemId}`;
        }, 500);
    }
    
    askExpert() {
        this.toggleChat();
        setTimeout(() => {
            this.appendChatMessage('Połączam z ekspertem... Proszę chwilę poczekać.', false);
            setTimeout(() => {
                this.appendChatMessage('👨‍💼 Ekspert MOS dołączył do czatu. W czym mogę pomóc?', false);
            }, 2000);
        }, 500);
    }
    
    // Booking functions
    bookAppointment(office, date) {
        if (confirm(`Potwierdzasz wizytę w ${office} w dniu ${date}?`)) {
            alert(`Wizyta została zarezerwowana! Otrzymasz SMS z potwierdzeniem.`);
            this.closeOfficeDetails();
        }
    }
    
    bookConsultation(office) {
        this.openCalendarIntegration();
        this.closeOfficeDetails();
    }
    
    // Preferences function
    openPreferences() {
        document.getElementById('preferencesPanel')?.classList.add('show');
        this.closeSettingsMenu();
    }
}

// Global functions for onclick handlers
function setMapView(view) {
    window.migrantApp?.setMapView(view);
}

function openPaymentModal(serviceType) {
    window.migrantApp?.openPaymentModal(serviceType);
}

function openCalendarIntegration() {
    window.migrantApp?.openCalendarIntegration();
}

function addToGoogleCalendar() {
    window.migrantApp?.addToGoogleCalendar();
}

function addToOutlook() {
    window.migrantApp?.addToOutlook();
}

function downloadICS() {
    window.migrantApp?.downloadICS();
}

function processPayment() {
    window.migrantApp?.processPayment();
}

function smartBooking() {
    window.migrantApp?.smartBooking();
}

function signWithAdobeSign() {
    window.migrantApp?.signWithAdobeSign();
}

function signWithDocuSign() {
    window.migrantApp?.signWithDocuSign();
}

function signWithAsseco() {
    window.migrantApp?.signWithAsseco();
}

function signDocument(documentName) {
    window.migrantApp?.signDocument(documentName);
}

function enablePushNotifications() {
    window.migrantApp?.enablePushNotifications();
}

function closePushBanner() {
    window.migrantApp?.closePushBanner();
}

function searchFAQ(query) {
    window.migrantApp?.searchFAQ(query);
}

function searchFAQTerm(term) {
    window.migrantApp?.searchFAQTerm(term);
}

function startVoiceSearch() {
    window.migrantApp?.startVoiceSearch();
}

function toggleFAQItem(itemId) {
    window.migrantApp?.toggleFAQItem(itemId);
}

function copyFAQLink(itemId) {
    window.migrantApp?.copyFAQLink(itemId);
}

function askFollowUp(itemId) {
    window.migrantApp?.askFollowUp(itemId);
}

function askExpert() {
    window.migrantApp?.askExpert();
}

function bookAppointment(office, date) {
    window.migrantApp?.bookAppointment(office, date);
}

function bookConsultation(office) {
    window.migrantApp?.bookConsultation(office);
}

function openPreferences() {
    window.migrantApp?.openPreferences();
}

function closeLoginModal() {
    window.migrantApp?.closeLoginModal();
}

function closeDashboard() {
    window.migrantApp?.closeDashboard();
}

function closePaymentModal() {
    window.migrantApp?.closePaymentModal();
}

function closeCalendarModal() {
    window.migrantApp?.closeCalendarModal();
}

function closeSigningModal() {
    window.migrantApp?.closeSigningModal();
}

function closeOfficeDetails() {
    window.migrantApp?.closeOfficeDetails();
}

function logout() {
    window.migrantApp?.logout();
}

function acceptChatInvitation() {
    window.migrantApp?.acceptChatInvitation();
}

function dismissChatInvitation() {
    window.migrantApp?.dismissChatInvitation();
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.migrantApp = new MigrantApp();
    console.log('MigrantApp initialized successfully');
});

// Handle page visibility changes for chat notifications
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.migrantApp?.chatMessages.length > 0) {
        // Update notification badge when page is hidden
        const notification = document.getElementById('chatNotification');
        if (notification && !window.migrantApp.chatOpen) {
            notification.textContent = '1';
            notification.style.display = 'flex';
        }
    }
});

// Service Worker registration for PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MigrantApp;
}