// MigrantGuidePoland AI Chatbot - Advanced Multi-language System
class MigrantGuideAI {
    constructor() {
        this.currentLanguage = 'pl';
        this.isOpen = false;
        this.isMinimized = false;
        this.conversationHistory = [];
        this.userContext = {
            currentSection: 'home',
            uploadedDocuments: [],
            userPreferences: {},
            sessionData: {}
        };
        this.isTyping = false;
        this.voiceRecording = false;
        
        // Data from MigrantGuidePoland
        this.companyData = {
            name: "MigrantGuidePoland",
            phone: "+48 512 617 106",
            email: "migrantguidepoland@gmail.com",
            whatsapp: "https://api.whatsapp.com/send?phone=48512617106",
            languages: ["PL", "UA", "EN", "RU"],
            workingHours: "24/7",
            specializations: ["System MOS", "Praca.gov.pl", "Obywatelstwo", "Kancelarie prawne"]
        };

        this.services = {
            residence: {
                title: "Karta Pobytu przez MOS",
                price: "od 1.890 zł",
                duration: "30 dni",
                features: ["100% przez MOS", "Podpis elektroniczny", "AI monitoring 24/7", "Wsparcie prawne"],
                guarantee: "7-14 dni lub zwrot 100% kosztów"
            },
            work: {
                title: "Zezwolenia Praca.gov.pl", 
                price: "od 1.590 zł",
                duration: "30-45 dni",
                features: ["Bez testu rynku", "100% cyfrowo", "Ochrona przed karami", "Współpraca prawna"],
                guarantee: "30 dni lub zwrot 50% kosztów"
            },
            citizenship: {
                title: "Obywatelstwo Premium",
                price: "od 4.790 zł", 
                duration: "60-90 dni",
                features: ["AI analiza uprawnień", "Wsparcie eksperckie", "Obsługa odwołań", "Kancelarie prawne"],
                guarantee: "Monitoring AI + ekspert na telefon"
            }
        };

        this.translations = {
            pl: {
                welcome: "Witaj! Jestem AI asystentem MigrantGuidePoland. Jak mogę Ci pomóc z legalizacją pobytu?",
                language_detected: "Wykryłem język polski. Kontynuujemy po polsku!",
                services: "Nasze usługi",
                booking: "Umów spotkanie", 
                documents: "Dokumenty",
                status_check: "Sprawdź status",
                expert_help: "Połącz z ekspertem",
                upload_docs: "Prześlij dokumenty",
                quick_help: "Szybka pomoc",
                typing: "AI pisze...",
                online: "Online",
                offline: "Offline"
            },
            ua: {
                welcome: "Привіт! Я AI асистент MigrantGuidePoland. Як можу допомогти з легалізацією перебування?",
                language_detected: "Виявлено українську мову. Продовжуємо українською!",
                services: "Наші послуги",
                booking: "Записатися на зустріч",
                documents: "Документи", 
                status_check: "Перевірити статус",
                expert_help: "З'єднати з експертом",
                upload_docs: "Завантажити документи",
                quick_help: "Швидка допомога",
                typing: "AI друкує...",
                online: "Онлайн",
                offline: "Офлайн"
            },
            en: {
                welcome: "Hello! I'm AI assistant from MigrantGuidePoland. How can I help you with residence legalization?",
                language_detected: "English detected. Continuing in English!",
                services: "Our services",
                booking: "Book meeting",
                documents: "Documents",
                status_check: "Check status", 
                expert_help: "Connect with expert",
                upload_docs: "Upload documents",
                quick_help: "Quick help",
                typing: "AI typing...",
                online: "Online",
                offline: "Offline"
            },
            ru: {
                welcome: "Привет! Я AI ассистент MigrantGuidePoland. Как могу помочь с легализацией пребывания?",
                language_detected: "Обнаружен русский язык. Продолжаем на русском!",
                services: "Наши услуги",
                booking: "Записаться на встречу",
                documents: "Документы",
                status_check: "Проверить статус",
                expert_help: "Связаться с экспертом", 
                upload_docs: "Загрузить документы",
                quick_help: "Быстрая помощь",
                typing: "AI печатает...",
                online: "Онлайн",
                offline: "Офлайн"
            }
        };

        this.courtRulings = [
            {
                court: "Naczelny Sąd Administracyjny",
                date: "15.07.2025",
                signature: "II OSK 2847/25",
                title: "Elektroniczny podpis w systemie MOS",
                description: "NSA potwierdził pełną ważność prawną wniosków składanych przez system MOS z podpisem elektronicznym."
            },
            {
                court: "WSA w Warszawie", 
                date: "22.07.2025",
                signature: "VI SA/Wa 1453/25",
                title: "Terminy w systemie MOS wiążące",
                description: "Terminy wynikające z priorytetowej rejestracji wniosków MOS są wiążące dla organów administracyjnych."
            }
        ];

        this.faq = [
            {
                question: "Jak długo trwa procedura MOS?",
                answer: "Dzięki naszemu AI i systemowi MOS, procedury trwają rekordowo krótko: Wrocław 30 dni, Warszawa 45 dni, Kraków 40 dni."
            },
            {
                question: "Czy system MOS jest prawnie wiążący?",
                answer: "Tak! NSA w wyroku II OSK 2847/25 z 15.07.2025 potwierdził pełną ważność prawną wniosków składanych przez system MOS."
            },
            {
                question: "Jakie języki obsługujecie?",
                answer: "Obsługujemy 4 języki: polski, ukraiński, angielski i rosyjski. Wszystkie dokumenty tłumaczymy z certyfikowanymi tłumaczami przysięgłymi."
            }
        ];

        this.cities = {
            wroclaw: "30 dni",
            warszawa: "45 dni", 
            krakow: "40 dni",
            gdansk: "35 dni",
            poznan: "35 dni"
        };

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.detectCurrentSection();
        this.bindEvents();
        this.autoDetectLanguage();
        this.showInitialNotification();
        this.startHeartbeat();
    }

    detectCurrentSection() {
        // Simulate section detection based on URL or page content
        const url = window.location.href.toLowerCase();
        if (url.includes('residence') || url.includes('karta')) {
            this.userContext.currentSection = 'residence';
        } else if (url.includes('work') || url.includes('praca')) {
            this.userContext.currentSection = 'work';
        } else if (url.includes('citizenship') || url.includes('obywatelstwo')) {
            this.userContext.currentSection = 'citizenship';
        }
    }

    bindEvents() {
        // Chat widget events
        const chatIcon = document.getElementById('chatIcon');
        const chatClose = document.getElementById('chatClose');
        const chatMinimize = document.getElementById('chatMinimize');
        const languageSelector = document.getElementById('languageSelector');
        const sendBtn = document.getElementById('sendBtn');
        const attachmentBtn = document.getElementById('attachmentBtn');
        const voiceBtn = document.getElementById('voiceBtn');
        const chatInput = document.getElementById('chatInput');

        if (chatIcon) {
            chatIcon.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleChat();
            });
        }

        if (chatClose) {
            chatClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeChat();
            });
        }

        if (chatMinimize) {
            chatMinimize.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.minimizeChat();
            });
        }
        
        // Language selector
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }

        // Message input
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            chatInput.addEventListener('input', () => this.autoResize(chatInput));
        }
        
        // Send button
        if (sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.sendMessage();
            });
        }
        
        // Voice button
        if (voiceBtn) {
            voiceBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleVoiceRecording();
            });
        }
        
        // Attachment button
        if (attachmentBtn) {
            attachmentBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showUploadModal();
            });
        }
        
        // Modal events
        this.bindModalEvents();
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
                if (this.isOpen) this.closeChat();
            }
        });

        // Service cards context detection
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.userContext.currentSection = section;
                this.openChat();
                setTimeout(() => {
                    this.sendContextualMessage(section);
                }, 500);
            });
        });

        // Outside click to close modals
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') && !e.target.classList.contains('hidden')) {
                this.closeAllModals();
            }
        });
    }

    bindModalEvents() {
        // Upload modal
        const uploadModal = document.getElementById('uploadModal');
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const uploadModalClose = document.getElementById('uploadModalClose');
        
        if (uploadModalClose) {
            uploadModalClose.addEventListener('click', (e) => {
                e.preventDefault();
                uploadModal.classList.add('hidden');
            });
        }
        
        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => fileInput.click());
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                this.handleFileUpload(e.dataTransfer.files);
            });
            
            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files);
            });
        }

        // Booking modal
        const bookingModalClose = document.getElementById('bookingModalClose');
        const bookingForm = document.getElementById('bookingForm');
        
        if (bookingModalClose) {
            bookingModalClose.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('bookingModal').classList.add('hidden');
            });
        }
        
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmit();
            });
        }

        // Expert modal
        const expertModalClose = document.getElementById('expertModalClose');
        if (expertModalClose) {
            expertModalClose.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('expertModal').classList.add('hidden');
            });
        }
    }

    autoDetectLanguage() {
        // Simulate language detection based on browser language
        const browserLang = navigator.language.substring(0, 2);
        const supportedLangs = ['pl', 'ua', 'en', 'ru'];
        
        if (supportedLangs.includes(browserLang)) {
            this.currentLanguage = browserLang;
        } else {
            this.currentLanguage = 'en'; // fallback
        }
        
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.value = this.currentLanguage;
        }
        this.updateUILanguage();
    }

    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.updateUILanguage();
        
        // Send language change confirmation
        if (this.isOpen) {
            setTimeout(() => {
                this.addMessage('ai', this.translations[lang].language_detected);
                this.updateQuickActions();
            }, 300);
        }
    }

    updateUILanguage() {
        const t = this.translations[this.currentLanguage];
        
        // Update placeholders and labels
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.placeholder = 
                this.currentLanguage === 'pl' ? 'Napisz wiadomość...' :
                this.currentLanguage === 'ua' ? 'Напишіть повідомлення...' :
                this.currentLanguage === 'en' ? 'Type a message...' :
                'Напишите сообщение...';
        }
            
        const onlineStatus = document.getElementById('onlineStatus');
        if (onlineStatus) {
            onlineStatus.textContent = t.online;
        }
        
        const typingText = document.querySelector('.typing-indicator span:last-child');
        if (typingText) typingText.textContent = t.typing;
    }

    showInitialNotification() {
        // Show pulsing notification after 3 seconds
        setTimeout(() => {
            const notification = document.getElementById('chatNotification');
            if (notification) {
                notification.style.display = 'flex';
                
                // Auto-hide after 10 seconds
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 10000);
            }
        }, 3000);
    }

    startHeartbeat() {
        // Simulate online status monitoring
        setInterval(() => {
            const status = document.querySelector('.status-dot');
            const statusText = document.getElementById('onlineStatus');
            const t = this.translations[this.currentLanguage];
            
            if (status && statusText) {
                // Simulate 99% uptime
                if (Math.random() > 0.01) {
                    status.classList.add('online');
                    statusText.textContent = t.online;
                } else {
                    status.classList.remove('online');
                    statusText.textContent = t.offline;
                }
            }
        }, 30000);
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.isMinimized = false;
        const chatWindow = document.getElementById('chatWindow');
        const chatIcon = document.getElementById('chatIcon');
        const notification = document.getElementById('chatNotification');
        
        if (chatWindow) chatWindow.classList.remove('hidden', 'minimized');
        if (chatIcon) chatIcon.style.display = 'none';
        if (notification) notification.style.display = 'none';
        
        // Initialize conversation if empty
        if (this.conversationHistory.length === 0) {
            this.startConversation();
        }
        
        this.scrollToBottom();
        const chatInput = document.getElementById('chatInput');
        if (chatInput) chatInput.focus();
    }

    closeChat() {
        this.isOpen = false;
        const chatWindow = document.getElementById('chatWindow');
        const chatIcon = document.getElementById('chatIcon');
        
        if (chatWindow) chatWindow.classList.add('hidden');
        if (chatIcon) chatIcon.style.display = 'flex';
    }

    minimizeChat() {
        this.isMinimized = !this.isMinimized;
        const chatWindow = document.getElementById('chatWindow');
        
        if (chatWindow) {
            if (this.isMinimized) {
                chatWindow.classList.add('minimized');
            } else {
                chatWindow.classList.remove('minimized');
            }
        }
    }

    startConversation() {
        const t = this.translations[this.currentLanguage];
        
        setTimeout(() => {
            this.addMessage('ai', t.welcome);
            this.updateQuickActions();
            
            // Add contextual suggestions based on current section
            setTimeout(() => {
                this.addContextualSuggestions();
            }, 1000);
        }, 500);
    }

    sendContextualMessage(section) {
        const t = this.translations[this.currentLanguage];
        const service = this.services[section];
        
        if (service) {
            const message = this.createServiceMessage(service, section);
            this.addMessage('ai', message);
            this.updateQuickActions(['booking', 'documents', 'expert_help']);
        }
    }

    createServiceMessage(service, section) {
        const t = this.translations[this.currentLanguage];
        
        return `
            <div class="service-card-message">
                <h4>${service.title}</h4>
                <div class="service-price-highlight">${service.price}</div>
                <p><strong>⏱️ Czas realizacji:</strong> ${service.duration}</p>
                <ul class="service-features">
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <p><strong>🛡️ Gwarancja:</strong> ${service.guarantee}</p>
            </div>
            <p>Czy chcesz dowiedzieć się więcej o tej usłudze?</p>
        `;
    }

    addContextualSuggestions() {
        const section = this.userContext.currentSection;
        const t = this.translations[this.currentLanguage];
        
        let suggestions = [];
        
        if (section === 'residence') {
            suggestions = [
                'Dokumenty do karty pobytu',
                'System MOS - jak działa?',
                'Terminy w różnych miastach',
                'Koszty i opłaty'
            ];
        } else if (section === 'work') {
            suggestions = [
                'Praca.gov.pl - procedury',
                'Bez testu rynku pracy',
                'Wymagane dokumenty',
                'Kary za naruszenia'
            ];
        } else if (section === 'citizenship') {
            suggestions = [
                'Kto może ubiegać się?',
                'Procedura krok po kroku',
                'AI analiza uprawnień',
                'Czas oczekiwania'
            ];
        } else {
            suggestions = [
                t.services,
                t.documents,
                'FAQ prawne',
                'Kontakt'
            ];
        }
        
        this.addMessage('ai', 'Oto kilka popularnych pytań:', suggestions);
    }

    updateQuickActions(actions = null) {
        const t = this.translations[this.currentLanguage];
        const quickActionsContainer = document.getElementById('quickActions');
        
        if (!quickActionsContainer) return;
        
        const defaultActions = [
            { key: 'services', text: t.services },
            { key: 'booking', text: t.booking },
            { key: 'documents', text: t.documents },
            { key: 'status_check', text: t.status_check },
            { key: 'expert_help', text: t.expert_help }
        ];
        
        const actionsToShow = actions ? 
            actions.map(key => defaultActions.find(a => a.key === key)).filter(Boolean) :
            defaultActions;
        
        quickActionsContainer.innerHTML = actionsToShow
            .map(action => `<button class="quick-action-btn" data-action="${action.key}">${action.text}</button>`)
            .join('');
        
        // Bind events to new buttons
        quickActionsContainer.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleQuickAction(e.target.dataset.action);
            });
        });
    }

    handleQuickAction(action) {
        const t = this.translations[this.currentLanguage];
        
        switch(action) {
            case 'services':
                this.addMessage('user', t.services);
                setTimeout(() => this.showServicesOverview(), 500);
                break;
            case 'booking':
                this.addMessage('user', t.booking);
                setTimeout(() => this.showBookingModal(), 500);
                break;
            case 'documents':
                this.addMessage('user', t.documents);
                setTimeout(() => {
                    this.showDocumentsList();
                    // Also show upload modal
                    setTimeout(() => this.showUploadModal(), 1000);
                }, 500);
                break;
            case 'status_check':
                this.addMessage('user', t.status_check);
                setTimeout(() => this.askForStatusCheck(), 500);
                break;
            case 'expert_help':
                this.addMessage('user', t.expert_help);
                setTimeout(() => this.initiateExpertConnection(), 500);
                break;
        }
    }

    showServicesOverview() {
        let message = '<div class="services-overview">';
        message += '<h4>🏢 Nasze Usługi Premium</h4>';
        
        Object.entries(this.services).forEach(([key, service]) => {
            message += `
                <div class="service-card-message" style="margin: 12px 0;">
                    <h4>${service.title}</h4>
                    <div class="service-price-highlight">${service.price}</div>
                    <p>⏱️ ${service.duration} | 🛡️ ${service.guarantee}</p>
                </div>
            `;
        });
        
        message += '</div>';
        message += '<p>Którą usługę Cię interesuje? Mogę przedstawić szczegóły!</p>';
        
        this.addMessage('ai', message);
        this.updateQuickActions(['booking', 'documents', 'expert_help']);
    }

    showDocumentsList() {
        const message = `
            <div class="document-analysis">
                <div class="analysis-header">
                    <span>📄</span>
                    <h4>Wymagane Dokumenty</h4>
                </div>
                <div class="document-checklist">
                    <div class="checklist-item">
                        <span>📋</span>
                        <span>Wniosek o kartę pobytu</span>
                    </div>
                    <div class="checklist-item">
                        <span>🆔</span>
                        <span>Dokument potwierdzający tożsamość</span>
                    </div>
                    <div class="checklist-item">
                        <span>📸</span>
                        <span>Fotografie biometryczne</span>
                    </div>
                    <div class="checklist-item">
                        <span>🏠</span>
                        <span>Potwierdzenie miejsca zamieszkania</span>
                    </div>
                </div>
                <p>Mogę przeanalizować Twoje dokumenty i sprawdzić czy wszystko jest kompletne!</p>
            </div>
        `;
        
        this.addMessage('ai', message);
        this.updateQuickActions(['upload_docs', 'booking', 'expert_help']);
    }

    askForStatusCheck() {
        this.addMessage('ai', `
            <div class="flow-step">
                <div class="step-number">1</div>
                <div class="step-title">Sprawdzenie Statusu</div>
                <div class="step-description">
                    Podaj proszę numer swojej sprawy lub dane personal. 
                    Mogę sprawdzić aktualny status w systemie MOS lub Praca.gov.pl.
                </div>
            </div>
            <p>Numer sprawy lub imię i nazwisko:</p>
        `);
    }

    initiateExpertConnection() {
        this.addMessage('ai', `
            <div class="expert-queue">
                <div class="expert-avatar">👨‍💼</div>
                <h4>Łączę z ekspertem prawnym...</h4>
                <p>Przygotowuję podsumowanie naszej rozmowy dla eksperta.</p>
            </div>
        `);
        
        setTimeout(() => {
            this.showExpertModal();
        }, 1000);
    }

    sendMessage() {
        const chatInput = document.getElementById('chatInput');
        if (!chatInput) return;
        
        const message = chatInput.value.trim();
        
        if (message === '') return;
        
        this.addMessage('user', message);
        chatInput.value = '';
        this.autoResize(chatInput);
        
        // Process message
        setTimeout(() => {
            this.processUserMessage(message);
        }, 500);
    }

    processUserMessage(message) {
        this.showTypingIndicator();
        
        // Simple AI response logic
        setTimeout(() => {
            const response = this.generateAIResponse(message);
            this.hideTypingIndicator();
            this.addMessage('ai', response);
        }, 1500 + Math.random() * 1000);
    }

    generateAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Pattern matching for responses
        if (lowerMessage.includes('mos') || lowerMessage.includes('karta')) {
            return this.getMOSResponse();
        } else if (lowerMessage.includes('praca') || lowerMessage.includes('work')) {
            return this.getWorkResponse();
        } else if (lowerMessage.includes('obywatelstwo') || lowerMessage.includes('citizenship')) {
            return this.getCitizenshipResponse();
        } else if (lowerMessage.includes('dokument')) {
            return this.getDocumentResponse();
        } else if (lowerMessage.includes('cena') || lowerMessage.includes('koszt') || lowerMessage.includes('price')) {
            return this.getPricingResponse();
        } else if (lowerMessage.includes('czas') || lowerMessage.includes('długo') || lowerMessage.includes('time')) {
            return this.getTimeResponse();
        } else if (lowerMessage.includes('prawnik') || lowerMessage.includes('ekspert') || lowerMessage.includes('expert')) {
            return this.getExpertResponse();
        } else {
            return this.getGeneralResponse();
        }
    }

    getMOSResponse() {
        const ruling = this.courtRulings[0];
        return `
            <div class="legal-citation">
                <div class="citation-court">${ruling.court}</div>
                <div class="citation-signature">Wyrok ${ruling.signature} z ${ruling.date}</div>
                <p>${ruling.description}</p>
            </div>
            <p><strong>System MOS to przełom!</strong> Dzięki elektronizacji procedury trwają rekordowo krótko:</p>
            <ul class="service-features">
                <li>Wrocław: 30 dni</li>
                <li>Warszawa: 45 dni</li>
                <li>Kraków: 40 dni</li>
                <li>Gdańsk: 35 dni</li>
            </ul>
            <p>Chcesz rozpocząć procedurę? Mogę Ci pomóc krok po kroku!</p>
        `;
    }

    getWorkResponse() {
        return `
            <div class="success-message">
                <strong>✅ KONIEC Z TESTEM RYNKU PRACY!</strong><br>
                Od 1 czerwca 2025 większość zawodów zwolniona z testu rynku.
            </div>
            <p><strong>Zezwolenia przez Praca.gov.pl:</strong></p>
            <ul class="service-features">
                <li>100% proces cyfrowy</li>
                <li>Bez wyjazdu z Polski</li>
                <li>Ochrona przed karami 3000-50000 zł</li>
                <li>Współpraca z kancelariami prawnymi</li>
            </ul>
            <p>Cena: <span class="service-price-highlight">${this.services.work.price}</span></p>
            <p>Chcesz sprawdzić czy Twój zawód jest zwolniony z testu?</p>
        `;
    }

    getCitizenshipResponse() {
        return `
            <div class="flow-step">
                <div class="step-number">🇵🇱</div>
                <div class="step-title">Obywatelstwo Polskie</div>
                <div class="step-description">
                    Nasze AI analizuje Twoje uprawnienia i szanse na sukces w procedurze obywatelskiej.
                </div>
            </div>
            <p><strong>Premium pakiet obywatelski:</strong></p>
            <ul class="service-features">
                <li>AI analiza uprawnień (99% dokładność)</li>
                <li>Współpraca z kancelariami prawnymi</li>
                <li>Obsługa odwołań i reklamacji</li>
                <li>Ekspert prawny na telefon 24/7</li>
            </ul>
            <p>Cena: <span class="service-price-highlight">${this.services.citizenship.price}</span></p>
            <p>Sprawdzę Twoje uprawnienia? Potrzebuję kilku informacji!</p>
        `;
    }

    getDocumentResponse() {
        return `
            <div class="document-analysis">
                <div class="analysis-header">
                    <span>🔍</span>
                    <h4>Analiza Dokumentów AI</h4>
                    <div class="analysis-status complete">Gotowy</div>
                </div>
                <p>Mogę przeanalizować Twoje dokumenty używając:</p>
                <ul class="service-features">
                    <li>OCR (rozpoznawanie tekstu)</li>
                    <li>AI sprawdzanie kompletności</li>
                    <li>Walidacja z wymaganiami prawnymi</li>
                    <li>Podpowiedzi co uzupełnić</li>
                </ul>
                <p>Przeciągnij pliki lub kliknij przycisk załącznika! 📎</p>
            </div>
        `;
    }

    getPricingResponse() {
        let response = '<div class="services-overview"><h4>💰 Cennik Usług Premium</h4>';
        
        Object.entries(this.services).forEach(([key, service]) => {
            response += `
                <div class="service-card-message">
                    <h4>${service.title}</h4>
                    <div class="service-price-highlight">${service.price}</div>
                    <p>🛡️ ${service.guarantee}</p>
                </div>
            `;
        });
        
        response += '</div><p><strong>Wszystkie ceny zawierają:</strong> AI monitoring, wsparcie prawne, gwarancję sukcesu!</p>';
        return response;
    }

    getTimeResponse() {
        return `
            <div class="flow-step">
                <div class="step-number">⏱️</div>
                <div class="step-title">Czasy Realizacji</div>
                <div class="step-description">
                    Dzięki AI i systemom elektronicznym nasze procedury są najszybsze na rynku!
                </div>
            </div>
            <p><strong>Rekordowe czasy w różnych miastach:</strong></p>
            <ul class="service-features">
                <li>🥇 Wrocław: ${this.cities.wroclaw}</li>
                <li>🥈 Gdańsk: ${this.cities.gdansk}</li>
                <li>🥈 Poznań: ${this.cities.poznan}</li>
                <li>🥉 Kraków: ${this.cities.krakow}</li>
                <li>🥉 Warszawa: ${this.cities.warszawa}</li>
            </ul>
            <p>W którym mieście planujesz złożyć wniosek?</p>
        `;
    }

    getExpertResponse() {
        return `
            <div class="expert-queue">
                <div class="expert-avatar">👨‍💼</div>
                <h4>Eksperci Prawni MigrantGuide</h4>
                <p><strong>Specjalizacje:</strong></p>
                <ul class="service-features">
                    <li>System MOS i procedury elektroniczne</li>
                    <li>Prawo migracyjne i obywatelskie</li>
                    <li>Zezwolenia na pracę (Praca.gov.pl)</li>
                    <li>Odwołania i postępowania reklamacyjne</li>
                </ul>
                <p>Dostępność: <strong>24/7</strong> | Średni czas odpowiedzi: <strong>2 minuty</strong></p>
            </div>
            <p>Połączyć Cię z ekspertem prawnym? Przygotowuję podsumowanie naszej rozmowy!</p>
        `;
    }

    getGeneralResponse() {
        const responses = [
            "Rozumiem! Mogę pomóc Ci z legalizacją pobytu w Polsce. O czym chciałbyś dowiedzieć się więcej?",
            "Świetnie! Jestem tutaj by pomóc. Którą procedurę prawną Cię interesuje?",
            "Znam wszystkie procedury migracyjne w Polsce. Jak mogę Ci pomóc?",
            "Mogę wytłumaczyć każdy aspekt legalizacji pobytu. Co Cię interesuje?",
            "Jestem ekspertem w polskim prawie migracyjnym. Czego potrzebujesz?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    addMessage(sender, content, suggestions = null) {
        const messageContainer = document.getElementById('messageContainer');
        if (!messageContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'ai' ? '🤖' : '👤';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = content;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString('pl-PL', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);
        contentDiv.appendChild(timeDiv);
        
        // Add suggestions if provided
        if (suggestions && sender === 'ai') {
            const suggestionsDiv = document.createElement('div');
            suggestionsDiv.className = 'message-suggestions';
            suggestionsDiv.innerHTML = suggestions.map(s => 
                `<button class="quick-action-btn" data-suggestion="${s}">${s}</button>`
            ).join('');
            
            // Bind events to suggestion buttons
            suggestionsDiv.querySelectorAll('.quick-action-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleSuggestionClick(e.target.dataset.suggestion);
                });
            });
            
            contentDiv.appendChild(suggestionsDiv);
        }
        
        messageContainer.appendChild(messageDiv);
        this.conversationHistory.push({ sender, content, timestamp: Date.now() });
        
        this.scrollToBottom();
    }

    handleSuggestionClick(suggestion) {
        this.addMessage('user', suggestion);
        setTimeout(() => this.processUserMessage(suggestion), 500);
    }

    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'flex';
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
        }
    }

    scrollToBottom() {
        const messageContainer = document.getElementById('messageContainer');
        if (messageContainer) {
            setTimeout(() => {
                messageContainer.scrollTop = messageContainer.scrollHeight;
            }, 100);
        }
    }

    autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
    }

    toggleVoiceRecording() {
        const voiceBtn = document.getElementById('voiceBtn');
        if (!voiceBtn) return;
        
        if (!this.voiceRecording) {
            // Start recording simulation
            this.voiceRecording = true;
            voiceBtn.classList.add('voice-recording');
            voiceBtn.textContent = '🔴';
            
            // Simulate recording for 3 seconds
            setTimeout(() => {
                this.stopVoiceRecording();
                this.simulateVoiceMessage();
            }, 3000);
        } else {
            this.stopVoiceRecording();
        }
    }

    stopVoiceRecording() {
        this.voiceRecording = false;
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.classList.remove('voice-recording');
            voiceBtn.textContent = '🎤';
        }
    }

    simulateVoiceMessage() {
        const voiceMessages = [
            "Chcę uzyskać kartę pobytu przez system MOS",
            "Potrzebuję pomocy z zezwoleniem na pracę",
            "Jak długo trwa procedura obywatelska?",
            "Jakie dokumenty są wymagane?"
        ];
        
        const message = voiceMessages[Math.floor(Math.random() * voiceMessages.length)];
        this.addMessage('user', `🎤 ${message}`);
        setTimeout(() => this.processUserMessage(message), 500);
    }

    showUploadModal() {
        const modal = document.getElementById('uploadModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    showBookingModal() {
        const modal = document.getElementById('bookingModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
        
        // Pre-fill form with conversation data
        const context = this.userContext;
        if (context.currentSection) {
            const serviceMap = {
                'residence': 'residence',
                'work': 'work',
                'citizenship': 'citizenship'
            };
            const bookingService = document.getElementById('bookingService');
            if (bookingService) {
                bookingService.value = serviceMap[context.currentSection] || '';
            }
        }
    }

    showExpertModal() {
        const modal = document.getElementById('expertModal');
        if (!modal) return;
        
        modal.classList.remove('hidden');
        
        // Simulate queue progression
        let progress = 0;
        const progressBar = document.getElementById('progressFill');
        const queuePosition = document.getElementById('queuePosition');
        const waitTime = document.getElementById('waitTime');
        
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progressBar) progressBar.style.width = Math.min(progress, 100) + '%';
            
            if (progress > 50) {
                if (queuePosition) queuePosition.textContent = '1';
                if (waitTime) waitTime.textContent = '1 minuta';
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    modal.classList.add('hidden');
                    this.addMessage('ai', `
                        <div class="success-message">
                            <strong>✅ Połączono z ekspertem prawnym!</strong><br>
                            Ekspert otrzymał podsumowanie naszej rozmowy i jest gotowy do pomocy.
                            <br><br>
                            📞 <strong>Telefon:</strong> ${this.companyData.phone}<br>
                            📧 <strong>Email:</strong> ${this.companyData.email}<br>
                            💬 <strong>WhatsApp:</strong> <a href="${this.companyData.whatsapp}" target="_blank">Kliknij tutaj</a>
                        </div>
                    `);
                }, 1000);
            }
        }, 200);
    }

    handleFileUpload(files) {
        const uploadedFiles = document.getElementById('uploadedFiles');
        if (uploadedFiles) {
            uploadedFiles.innerHTML = '';
        }
        
        Array.from(files).forEach(file => {
            // Validate file
            if (file.size > 10 * 1024 * 1024) {
                this.addMessage('ai', `❌ Plik ${file.name} jest za duży (max 10MB)`);
                return;
            }
            
            if (!['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                this.addMessage('ai', `❌ Nieobsługiwany format pliku ${file.name}`);
                return;
            }
            
            // Add to uploaded files list
            if (uploadedFiles) {
                const fileDiv = document.createElement('div');
                fileDiv.className = 'uploaded-file';
                fileDiv.innerHTML = `
                    <div class="file-info">
                        <span>📄</span>
                        <span>${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)</span>
                    </div>
                    <button class="file-remove" onclick="this.parentElement.remove()">×</button>
                `;
                uploadedFiles.appendChild(fileDiv);
            }
            
            this.userContext.uploadedDocuments.push({
                name: file.name,
                size: file.size,
                type: file.type,
                uploadTime: Date.now()
            });
        });
        
        // Simulate OCR analysis
        setTimeout(() => {
            this.simulateDocumentAnalysis(files);
        }, 2000);
    }

    simulateDocumentAnalysis(files) {
        const uploadModal = document.getElementById('uploadModal');
        if (uploadModal) {
            uploadModal.classList.add('hidden');
        }
        
        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            
            const analysisResults = this.generateDocumentAnalysis(files);
            this.addMessage('ai', analysisResults);
        }, 3000);
    }

    generateDocumentAnalysis(files) {
        const fileNames = Array.from(files).map(f => f.name);
        const detectedDocs = [];
        const missingDocs = [];
        
        // Simulate AI document recognition
        if (fileNames.some(name => name.toLowerCase().includes('wniosek') || name.toLowerCase().includes('application'))) {
            detectedDocs.push('Wniosek o kartę pobytu');
        } else {
            missingDocs.push('Wniosek o kartę pobytu');
        }
        
        if (fileNames.some(name => name.toLowerCase().includes('passport') || name.toLowerCase().includes('id'))) {
            detectedDocs.push('Dokument tożsamości');
        } else {
            missingDocs.push('Dokument tożsamości');
        }
        
        if (fileNames.some(name => name.toLowerCase().includes('photo') || name.toLowerCase().includes('zdjecie'))) {
            detectedDocs.push('Fotografia biometryczna');
        } else {
            missingDocs.push('Fotografia biometryczna');
        }
        
        let analysis = `
            <div class="document-analysis">
                <div class="analysis-header">
                    <span>🔍</span>
                    <h4>Analiza Dokumentów AI</h4>
                    <div class="analysis-status ${missingDocs.length === 0 ? 'complete' : 'missing'}">
                        ${missingDocs.length === 0 ? 'Kompletne' : 'Braki'}
                    </div>
                </div>
                
                <h5>✅ Wykryte dokumenty:</h5>
                <div class="document-checklist">
        `;
        
        detectedDocs.forEach(doc => {
            analysis += `<div class="checklist-item complete">✓ ${doc}</div>`;
        });
        
        if (missingDocs.length > 0) {
            analysis += `</div><h5>❌ Brakujące dokumenty:</h5><div class="document-checklist">`;
            missingDocs.forEach(doc => {
                analysis += `<div class="checklist-item missing">✗ ${doc}</div>`;
            });
        }
        
        analysis += `</div></div>`;
        
        if (missingDocs.length === 0) {
            analysis += `<div class="success-message">🎉 Wszystkie dokumenty są kompletne! Możemy przystąpić do złożenia wniosku.</div>`;
        } else {
            analysis += `<p>Proszę uzupełnić brakujące dokumenty. Mogę pomóc w ich przygotowaniu!</p>`;
        }
        
        return analysis;
    }

    handleBookingSubmit() {
        const form = document.getElementById('bookingForm');
        if (!form) return;
        
        const bookingData = {
            name: document.getElementById('bookingName')?.value || '',
            email: document.getElementById('bookingEmail')?.value || '',
            phone: document.getElementById('bookingPhone')?.value || '',
            service: document.getElementById('bookingService')?.value || '',
            date: document.getElementById('bookingDate')?.value || '',
            time: document.getElementById('bookingTime')?.value || ''
        };
        
        // Simulate booking confirmation
        const bookingModal = document.getElementById('bookingModal');
        if (bookingModal) {
            bookingModal.classList.add('hidden');
        }
        
        setTimeout(() => {
            this.addMessage('ai', `
                <div class="success-message">
                    <strong>✅ Spotkanie zostało zarezerwowane!</strong><br><br>
                    <strong>Szczegóły:</strong><br>
                    👤 <strong>Imię:</strong> ${bookingData.name}<br>
                    📧 <strong>Email:</strong> ${bookingData.email}<br>
                    📞 <strong>Telefon:</strong> ${bookingData.phone}<br>
                    🏢 <strong>Usługa:</strong> ${this.getServiceName(bookingData.service)}<br>
                    📅 <strong>Data:</strong> ${bookingData.date} o ${bookingData.time}<br><br>
                    Potwierdzenie zostało wysłane na email. Do zobaczenia!
                </div>
            `);
            
            // Clear form
            form.reset();
        }, 500);
    }

    getServiceName(serviceKey) {
        const serviceNames = {
            'residence': 'Karta Pobytu (MOS)',
            'work': 'Zezwolenie na pracę',
            'citizenship': 'Obywatelstwo'
        };
        return serviceNames[serviceKey] || serviceKey;
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }
}

// Initialize the AI chatbot when DOM is ready
let migrantAI;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        migrantAI = new MigrantGuideAI();
        window.migrantAI = migrantAI;
    });
} else {
    migrantAI = new MigrantGuideAI();
    window.migrantAI = migrantAI;
}