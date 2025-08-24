// Translation data for all languages
const translations = {
    pl: {
        title: "MigrantGuidePoland - Kompleksowa pomoc dla migrantów w Polsce",
        brand: "MigrantGuidePoland",
        nav: {
            about: "O nas",
            map: "Mapa terminów",
            faq: "AI FAQ", 
            law: "Prawo 2025",
            services: "Usługi MOS",
            contact: "Kontakt 24/7"
        },
        hero: {
            badge: "Najszybsza obsługa MOS w Polsce",
            title1: "Rewolucja",
            title2: "w legalizacji pobytu", 
            subtitle: "AI + MOS + Praca.gov.pl = Sukces",
            desc1: "Pierwsza w Polsce platforma AI do monitorowania procesów migracyjnych. Średni czas realizacji:",
            days: "30 dni",
            desc2: "Obsługa w 4 językach z tłumaczeniami AI na 47 języków.",
            btn1: "🤖Rozpocznij konsultację AI",
            btn2: "📊Zobacz terminy w miastach"
        },
        about: {
            title: "O nas",
            subtitle: "Twój niezawodny partner w sprawach migracyjnych",
            text: "MigrantGuidePoland to innowacyjna platforma łącząca sztuczną inteligencję z głęboką znajomością polskiego prawa migracyjnego. Pomagamy migrantom szybko i skutecznie rozwiązywać sprawy legalizacji pobytu, zatrudnienia i integracji z polskim społeczeństwem."
        },
        map: {
            title: "🗺️ Interaktywna mapa terminów MOS",
            subtitle: "Sprawdź aktualne terminy w urzędach wojewódzkich",
            legend: {
                title: "Legenda terminów:",
                fast: "30-35 dni (najszybsze)",
                standard: "40-50 dni (standard)", 
                slow: "60+ dni (wydłużone)"
            }
        },
        faq: {
            title: "🤖 AI FAQ - Inteligentne odpowiedzi",
            subtitle: "Zadaj pytanie AI o procedury migracyjne",
            placeholder: "Postaw pytania pro Kartu Pobytu, MOS, Praca.gov.pl...",
            search: "🔍",
            q1: "Ile czasu trwa procedura Karty Pobytu przez MOS?",
            a1: "Dzięki naszemu AI monitoringowi średni czas to 30-45 dni w zależności od miasta. System MOS znacznie przyspieszył procedury od 2024 roku.",
            q2: "Czy portal Praca.gov.pl wymaga testu rynku pracy?",
            a2: "Nie, od 2024 roku większość wniosków przez Praca.gov.pl jest zwolniona z testu rynku pracy. Nasz AI analizuje każdy przypadek indywidualnie.",
            q3: "Jakie dokumenty są wymagane do Obywatelstwa?", 
            a3: "Lista dokumentów zależy od podstawy prawnej. Nasz AI Premium analizuje Twój przypadek i przygotowuje spersonalizowaną listę wymagań."
        },
        law: {
            title: "⚖️ Prawo 2025 - Nowe Zmiany",
            subtitle: "Najnowsze zmiany w prawie migracyjnym",
            item1: {
                title: "Uproszczenie procedur MOS",
                text: "Od stycznia 2025 MOS wprowadza nowe procedury cyfrowe"
            },
            item2: {
                title: "Nowa ustawa o pracy",
                text: "Rozszerzone prawa dla pracowników z krajów trzecich"
            },
            item3: {
                title: "AI w procedurach urzędowych", 
                text: "Wdrożenie sztucznej inteligencji w ocenie wniosków"
            }
        },
        services: {
            title: "🏢 Usługi MOS",
            subtitle: "Pełen zakres usług migracyjnych",
            card1: {
                title: "Karta Pobytu",
                text: "Załatwianie i przedłużanie karty pobytu"
            },
            card2: {
                title: "Zezwolenie na pracę",
                text: "Zezwolenia na pracę i zmiana pracodawcy"
            },
            card3: {
                title: "Obywatelstwo",
                text: "Procedury uzyskania polskiego obywatelstwa"
            }
        },
        contact: {
            title: "📞 Kontakt 24/7",
            subtitle: "Skontaktuj się z nami w każdej chwili",
            phone: {
                title: "Telefon 24/7",
                desc: "Dostępni całodobowo"
            },
            email: {
                title: "Email", 
                desc: "Odpowiadamy w 2h"
            },
            whatsapp: {
                title: "WhatsApp",
                desc: "Czat w czasie rzeczywistym"
            }
        },
        chat: {
            welcome: "Witaj! Jestem AI asystentem MigrantGuidePoland. Jak mogę Ci pomóc?",
            placeholder: "Napisz pytanie...",
            thinking: "Myślę...",
            error: "Przepraszam, wystąpił błąd. Spróbuj ponownie."
        }
    },
    ua: {
        title: "MigrantGuidePoland - Комплексна допомога для мігрантів в Польщі",
        brand: "MigrantGuidePoland", 
        nav: {
            about: "Про нас",
            map: "Карта термінів",
            faq: "AI FAQ",
            law: "Право 2025", 
            services: "Послуги MOS",
            contact: "Контакт 24/7"
        },
        hero: {
            badge: "Найшвидша обслуга MOS в Польщі",
            title1: "Революція",
            title2: "в легалізації побуту",
            subtitle: "AI + MOS + Praca.gov.pl = Успіх",
            desc1: "Перша в Польщі платформа AI до моніторування процесів міграційних. Середній час реалізації:",
            days: "30 днів",
            desc2: "Обслуга в 4 мовах з перекладенями AI на 47 мов.",
            btn1: "🤖Розпочни консультацію AI",
            btn2: "📊Дивись терміни в містах"
        },
        about: {
            title: "Про нас",
            subtitle: "Ваш надійний партнер в міграційних справах",
            text: "MigrantGuidePoland - це інноваційна платформа, що об'єднує штучний інтелект з глибоким знанням польського міграційного права. Ми допомагаємо мігрантам швидко та ефективно вирішувати питання легалізації побуту, працевлаштування та інтеграції в польське суспільство."
        },
        map: {
            title: "🗺️ Інтерактивна карта термінів MOS", 
            subtitle: "Перевір актуальні терміни в урядах воєводських",
            legend: {
                title: "Легенда термінів:",
                fast: "30-35 днів (найшвидше)",
                standard: "40-50 днів (стандарт)",
                slow: "60+ днів (затримані)"
            }
        },
        faq: {
            title: "🤖 AI FAQ - Інтелігентні відповіді",
            subtitle: "Постав питання AI про процедури міграційні", 
            placeholder: "Постав питання про Карту Перебування, MOS, Praca.gov.pl...",
            search: "🔍",
            q1: "Скільки часу триває процедура Карти Побуту через MOS?",
            a1: "Завдяки нашому AI моніторингу середній час то 30-45 днів в залежності від міста. Система MOS значно прискорила процедури від 2024 року.",
            q2: "Чи портал Praca.gov.pl вимагає тесту ринку праці?",
            a2: "Ні, від 2024 року більшість заявок через Praca.gov.pl є звільнена з тесту ринку праці. Наш AI аналізує кожний випадок індивідуально.",
            q3: "Які документи є вимагані до Громадянства?",
            a3: "Список документів залежить від основи правної. Наш AI Premium аналізує Твій випадок і приготовує персоналізовану листу вимагань."
        },
        law: {
            title: "⚖️ Право 2025 - Нові Зміни",
            subtitle: "Останні зміни в міграційному праві",
            item1: {
                title: "Спрощення процедур MOS",
                text: "Від січня 2025 MOS запроваджує нові цифрові процедури"
            },
            item2: {
                title: "Новий закон про працю",
                text: "Розширені права для працівників з країн третіх"
            },
            item3: {
                title: "AI в урядових процедурах",
                text: "Впровадження штучного інтелекту в оцінці заявок"
            }
        },
        services: {
            title: "🏢 Послуги MOS",
            subtitle: "Повний спектр міграційних послуг",
            card1: {
                title: "Карта Побуту",
                text: "Оформлення та продовження карти побуту"
            },
            card2: {
                title: "Дозвіл на роботу", 
                text: "Дозволи на роботу та зміна роботодавця"
            },
            card3: {
                title: "Громадянство",
                text: "Процедури отримання польського громадянства"
            }
        },
        contact: {
            title: "📞 Контакт 24/7",
            subtitle: "Зв'яжись з нами в кожній хвилині",
            phone: {
                title: "Телефон 24/7",
                desc: "Доступні цілодобово"
            },
            email: {
                title: "Email",
                desc: "Відповідаємо в 2г"
            },
            whatsapp: {
                title: "WhatsApp", 
                desc: "Чат в часі дійсному"
            }
        },
        chat: {
            welcome: "Привіт! Я AI асистент MigrantGuidePoland. Як можу допомогти?",
            placeholder: "Напишіть питання...",
            thinking: "Думаю...",
            error: "Вибачте, сталася помилка. Спробуйте знову."
        }
    },
    en: {
        title: "MigrantGuidePoland - Comprehensive help for migrants in Poland",
        brand: "MigrantGuidePoland",
        nav: {
            about: "About us",
            map: "Appointment map", 
            faq: "AI FAQ",
            law: "Law 2025",
            services: "MOS Services",
            contact: "Contact 24/7"
        },
        hero: {
            badge: "Fastest MOS service in Poland",
            title1: "Revolution",
            title2: "in residence legalization",
            subtitle: "AI + MOS + Praca.gov.pl = Success",
            desc1: "First AI platform in Poland for monitoring migration processes. Average completion time:",
            days: "30 days",
            desc2: "Service in 4 languages with AI translations to 47 languages.",
            btn1: "🤖Start AI consultation",
            btn2: "📊View appointment times in cities"
        },
        about: {
            title: "About us",
            subtitle: "Your reliable partner in migration matters",
            text: "MigrantGuidePoland is an innovative platform combining artificial intelligence with deep knowledge of Polish migration law. We help migrants quickly and effectively resolve residence legalization, employment and integration issues with Polish society."
        },
        map: {
            title: "🗺️ Interactive MOS appointment map",
            subtitle: "Check current appointment times in voivodeship offices",
            legend: {
                title: "Appointment legend:",
                fast: "30-35 days (fastest)",
                standard: "40-50 days (standard)",
                slow: "60+ days (delayed)"
            }
        },
        faq: {
            title: "🤖 AI FAQ - Intelligent answers",
            subtitle: "Ask AI about migration procedures",
            placeholder: "Ask about Residence Card, MOS, Praca.gov.pl...",
            search: "🔍",
            q1: "How long does the Residence Card procedure through MOS take?",
            a1: "Thanks to our AI monitoring, the average time is 30-45 days depending on the city. The MOS system significantly accelerated procedures from 2024.",
            q2: "Does the Praca.gov.pl portal require a labor market test?",
            a2: "No, since 2024 most applications through Praca.gov.pl are exempt from the labor market test. Our AI analyzes each case individually.",
            q3: "What documents are required for Citizenship?",
            a3: "The list of documents depends on the legal basis. Our AI Premium analyzes your case and prepares a personalized list of requirements."
        },
        law: {
            title: "⚖️ Law 2025 - New Changes",
            subtitle: "Latest changes in migration law",
            item1: {
                title: "Simplification of MOS procedures",
                text: "From January 2025 MOS introduces new digital procedures"
            },
            item2: {
                title: "New labor law",
                text: "Extended rights for workers from third countries"
            },
            item3: {
                title: "AI in government procedures",
                text: "Implementation of artificial intelligence in application assessment"
            }
        },
        services: {
            title: "🏢 MOS Services",
            subtitle: "Full range of migration services",
            card1: {
                title: "Residence Card",
                text: "Processing and extending residence cards"
            },
            card2: {
                title: "Work permit",
                text: "Work permits and employer changes"
            },
            card3: {
                title: "Citizenship",
                text: "Procedures for obtaining Polish citizenship"
            }
        },
        contact: {
            title: "📞 Contact 24/7",
            subtitle: "Contact us at any time",
            phone: {
                title: "Phone 24/7",
                desc: "Available 24/7"
            },
            email: {
                title: "Email",
                desc: "We respond within 2h"
            },
            whatsapp: {
                title: "WhatsApp",
                desc: "Real-time chat"
            }
        },
        chat: {
            welcome: "Hello! I am AI assistant of MigrantGuidePoland. How can I help you?",
            placeholder: "Type your question...",
            thinking: "Thinking...",
            error: "Sorry, an error occurred. Please try again."
        }
    },
    ru: {
        title: "MigrantGuidePoland - Комплексная помощь для мигрантов в Польше",
        brand: "MigrantGuidePoland",
        nav: {
            about: "О нас",
            map: "Карта записи",
            faq: "AI FAQ",
            law: "Право 2025",
            services: "Услуги MOS",
            contact: "Контакт 24/7"
        },
        hero: {
            badge: "Самое быстрое обслуживание MOS в Польше",
            title1: "Революция",
            title2: "в легализации пребывания",
            subtitle: "AI + MOS + Praca.gov.pl = Успех",
            desc1: "Первая в Польше AI платформа для мониторинга миграционных процессов. Среднее время реализации:",
            days: "30 дней",
            desc2: "Обслуживание на 4 языках с AI переводами на 47 языков.",
            btn1: "🤖Начать AI консультацию",
            btn2: "📊Смотреть сроки в городах"
        },
        about: {
            title: "О нас",
            subtitle: "Ваш надежный партнер в миграционных вопросах",
            text: "MigrantGuidePoland - это инновационная платформа, объединяющая искусственный интеллект с глубоким знанием польского миграционного права. Мы помогаем мигрантам быстро и эффективно решать вопросы легализации пребывания, трудоустройства и интеграции в польское общество."
        },
        map: {
            title: "🗺️ Интерактивная карта записи MOS",
            subtitle: "Проверить актуальные сроки в воеводских управлениях",
            legend: {
                title: "Легенда сроков:",
                fast: "30-35 дней (самые быстрые)",
                standard: "40-50 дней (стандарт)",
                slow: "60+ дней (задержанные)"
            }
        },
        faq: {
            title: "🤖 AI FAQ - Умные ответы",
            subtitle: "Задать вопрос AI о миграционных процедурах",
            placeholder: "Задать вопрос о Карте Пребывания, MOS, Praca.gov.pl...",
            search: "🔍",
            q1: "Сколько времени занимает процедура Карты Пребывания через MOS?",
            a1: "Благодаря нашему AI мониторингу среднее время составляет 30-45 дней в зависимости от города. Система MOS значительно ускорила процедуры с 2024 года.",
            q2: "Требует ли портал Praca.gov.pl теста рынка труда?",
            a2: "Нет, с 2024 года большинство заявлений через Praca.gov.pl освобождены от теста рынка труда. Наш AI анализирует каждый случай индивидуально.",
            q3: "Какие документы требуются для Гражданства?",
            a3: "Список документов зависит от правовой основы. Наш AI Premium анализирует ваш случай и готовит персонализированный список требований."
        },
        law: {
            title: "⚖️ Право 2025 - Новые изменения",
            subtitle: "Последние изменения в миграционном праве",
            item1: {
                title: "Упрощение процедур MOS",
                text: "С января 2025 MOS вводит новые цифровые процедуры"
            },
            item2: {
                title: "Новый закон о труде",
                text: "Расширенные права для работников из третьих стран"
            },
            item3: {
                title: "AI в государственных процедурах",
                text: "Внедрение искусственного интеллекта в оценке заявлений"
            }
        },
        services: {
            title: "🏢 Услуги MOS",
            subtitle: "Полный спектр миграционных услуг",
            card1: {
                title: "Карта Пребывания",
                text: "Оформление и продление карты пребывания"
            },
            card2: {
                title: "Разрешение на работу",
                text: "Разрешения на работу и смена работодателя"
            },
            card3: {
                title: "Гражданство",
                text: "Процедуры получения польского гражданства"
            }
        },
        contact: {
            title: "📞 Контакт 24/7",
            subtitle: "Свяжитесь с нами в любое время",
            phone: {
                title: "Телефон 24/7",
                desc: "Доступны круглосуточно"
            },
            email: {
                title: "Email",
                desc: "Отвечаем в течение 2ч"
            },
            whatsapp: {
                title: "WhatsApp",
                desc: "Чат в реальном времени"
            }
        },
        chat: {
            welcome: "Привет! Я AI ассистент MigrantGuidePoland. Как могу помочь?",
            placeholder: "Напишите вопрос...",
            thinking: "Думаю...",
            error: "Извините, произошла ошибка. Попробуйте снова."
        }
    }
};

// Current language state
let currentLang = 'ua';
let chatMessages = [];
let chatOpen = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');

    initializeLanguageSwitcher();
    initializeScrollSpy();
    initializeMapInteractions();
    initializeFAQSearch();
    initializeChatbot();

    // Set initial language
    setLanguage(currentLang);
    console.log('Initialization complete');
});

// Language Switching Functionality
function initializeLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            setLanguage(selectedLang);

            // Update button states
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLanguage', lang);

    // Update document language
    document.documentElement.lang = lang;

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-i18n], [data-i18n-placeholder]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n') || element.getAttribute('data-i18n-placeholder');
        if (key) {
            const translation = getNestedTranslation(translations[lang], key);
            if (translation) {
                if (element.hasAttribute('data-i18n-placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        }
    });

    // Update page title
    if (translations[lang].title) {
        document.title = translations[lang].title;
    }
}

// Helper function to get nested translation
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] ? current[key] : null;
    }, obj);
}

// ScrollSpy functionality
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset + 100; // offset for fixed header

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Map interactions
function initializeMapInteractions() {
    const cityMarkers = document.querySelectorAll('.city-marker');

    cityMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            const time = this.getAttribute('data-time');
            showCityInfo(city, time);
        });

        marker.addEventListener('mouseenter', function() {
            const city = this.getAttribute('data-city');
            const time = this.getAttribute('data-time');
            showTooltip(this, city, time);
        });

        marker.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showCityInfo(city, time) {
    const cityNames = {
        gdansk: 'Gdańsk',
        bydgoszcz: 'Bydgoszcz',
        olsztyn: 'Olsztyn',
        poznan: 'Poznań',
        lodz: 'Łódź',
        warszawa: 'Warszawa',
        kielce: 'Kielce',
        wroclaw: 'Wrocław',
        krakow: 'Kraków'
    };

    const messages = {
        pl: `Aktualny czas oczekiwania w ${cityNames[city]}: ${time} dni`,
        ua: `Поточний час очікування в ${cityNames[city]}: ${time} днів`,
        en: `Current waiting time in ${cityNames[city]}: ${time} days`,
        ru: `Текущее время ожидания в ${cityNames[city]}: ${time} дней`
    };

    alert(messages[currentLang]);
}

function showTooltip(element, city, time) {
    // Simple tooltip implementation
    const tooltip = document.createElement('div');
    tooltip.className = 'city-tooltip';
    tooltip.innerHTML = `${city}: ${time} dni`;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        pointer-events: none;
    `;

    document.body.appendChild(tooltip);

    const moveHandler = (e) => {
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY - 10 + 'px';
    };

    element.addEventListener('mousemove', moveHandler);
    element.addEventListener('mouseleave', () => {
        element.removeEventListener('mousemove', moveHandler);
    });
}

function hideTooltip() {
    const tooltip = document.querySelector('.city-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// FAQ Search functionality
function initializeFAQSearch() {
    const searchBtn = document.querySelector('.faq-search-btn');
    const searchInput = document.querySelector('.faq-search .form-control');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                performFAQSearch(query);
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    performFAQSearch(query);
                }
            }
        });
    }
}

function performFAQSearch(query) {
    // Show thinking message in chat instead of alert
    if (!chatOpen) {
        openChat();
    }
    addMessage('bot', getTranslation('chat.thinking'));

    // Simulate AI response after 2 seconds
    setTimeout(() => {
        const responses = {
            'karta': 'Średni czas oczekiwania na Kartę Pobotu wynosi 30-45 dni przez system MOS.',
            'praca': 'Portal Praca.gov.pl nie wymaga już testu rynku pracy od 2024 roku dla większości wniosków.',
            'obywatelstwo': 'Wymagane dokumenty do obywatelstwa zależą od podstawy prawnej. Sprawdzę indywidualnie Twój przypadek.',
            'default': `Pytanie: "${query}". Analiza AI: To jest symulacja odpowiedzi. W rzeczywistej wersji AI analizowałby zapytanie i udzielał szczegółowych odpowiedzi na tematy migracyjne.`
        };

        let response = responses.default;
        Object.keys(responses).forEach(key => {
            if (query.toLowerCase().includes(key) && key !== 'default') {
                response = responses[key];
            }
        });

        // Replace the thinking message with actual response
        const lastMessage = document.querySelector('.message:last-child');
        if (lastMessage && lastMessage.classList.contains('bot-message')) {
            lastMessage.textContent = response;
        } else {
            addMessage('bot', response);
        }
    }, 2000);
}

// Enhanced Chatbot functionality
function initializeChatbot() {
    console.log('Initializing chatbot...');

    const chatLaunch = document.getElementById('chatLaunch');
    const chatWidget = document.getElementById('chatWidget');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');

    if (!chatLaunch || !chatWidget || !chatClose || !chatSend || !chatInput) {
        console.error('Chat elements not found:', {
            chatLaunch: !!chatLaunch,
            chatWidget: !!chatWidget,
            chatClose: !!chatClose,
            chatSend: !!chatSend,
            chatInput: !!chatInput
        });
        return;
    }

    console.log('Chat elements found, adding event listeners...');

    // Launch chat
    chatLaunch.addEventListener('click', function() {
        console.log('Chat launch clicked');
        openChat();
    });

    // Close chat
    chatClose.addEventListener('click', function() {
        console.log('Chat close clicked');
        closeChat();
    });

    // Send message
    chatSend.addEventListener('click', function() {
        console.log('Chat send clicked');
        sendMessage();
    });

    // Enter key to send
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            console.log('Enter pressed in chat input');
            sendMessage();
        }
    });

    console.log('Chatbot initialized successfully');
}

function openChat() {
    console.log('Opening chat');
    const chatWidget = document.getElementById('chatWidget');
    const notificationBadge = document.querySelector('.notification-badge');

    if (chatWidget) {
        chatWidget.style.display = 'flex';
        chatOpen = true;

        // Hide notification badge
        if (notificationBadge) {
            notificationBadge.style.display = 'none';
        }

        // Focus on input
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            setTimeout(() => chatInput.focus(), 300);
        }
    }
}

function closeChat() {
    console.log('Closing chat');
    const chatWidget = document.getElementById('chatWidget');

    if (chatWidget) {
        chatWidget.style.display = 'none';
        chatOpen = false;
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();

    if (!message) return;

    console.log('Sending message:', message);

    // Add user message
    addMessage('user', message);
    chatInput.value = '';

    // Show typing indicator
    setTimeout(() => {
        addMessage('bot', getTranslation('chat.thinking'));

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                'Dziękuję za pytanie! Analiza AI...',
                'To bardzo interesujące pytanie dotyczące procedur migracyjnych.',
                'Sprawdzam aktualne informacje w mojej bazie danych...',
                'Zgodnie z najnowszymi regulacjami MOS...'
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            // Replace thinking message with response
            const messages = document.querySelectorAll('#chatMessages .message');
            const lastMessage = messages[messages.length - 1];
            if (lastMessage && lastMessage.classList.contains('bot-message')) {
                lastMessage.textContent = randomResponse + ' (To jest demo AI)';
            }
        }, 1500);
    }, 500);
}

function addMessage(sender, text) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getTranslation(key) {
    return getNestedTranslation(translations[currentLang], key) || key;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Load saved language preference
const savedLang = localStorage.getItem('selectedLanguage');
if (savedLang && translations[savedLang]) {
    currentLang = savedLang;
    // Update button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === savedLang) {
            btn.classList.add('active');
        }
    });
}