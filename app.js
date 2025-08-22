// ============================================
// MIGRANT GUIDE POLAND - COMPLETE APP.JS
// Advanced JavaScript for all 10+ features
// ============================================

class MigrantApp {
  constructor() {
    this.currentLang = localStorage.getItem('preferred-language') || 'pl';
    this.currentTheme = localStorage.getItem('preferred-theme') || 'dark';
    this.stripe = null;
    this.cardElement = null;
    this.pushSubscription = null;
    this.currentService = null;
    this.userPreferences = this.loadUserPreferences();
    this.isLoggedIn = localStorage.getItem('user-logged-in') === 'true';
    this.chatInvitationShown = localStorage.getItem('chat-invitation-shown') === 'true';
    this.init();
  }

  init() {
    console.log('🚀 MigrantApp initializing...');
    
    // Remove loading screen with animation
    setTimeout(() => {
      const loading = document.getElementById('loadingOverlay');
      if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => loading.remove(), 500);
      }
    }, 1000);

    // Initialize all systems
    this.setupThemeSystem();
    this.setupLanguageSystem();
    this.setupPersonalization();
    this.setupSettingsDropdown();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupInteractiveMap();
    this.setupEnhancedFAQ();
    this.setupPushNotifications();
    this.setupPaymentSystem();
    this.setupEnhancedChat();
    this.setupUserDashboard();
    this.setupCalendarIntegration();
    this.setupDocumentSigning();
    this.setupCrossSelling();
    this.setupMicroInteractions();
    this.applyUserPreferences();
    this.startAutoTheme();
    
    console.log('✅ MigrantApp fully initialized');
  }

  // ============================================
  // THEME SYSTEM & PERSONALIZATION
  // ============================================

  setupThemeSystem() {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.setTheme(btn.dataset.theme);
      });
    });
    this.setTheme(this.currentTheme);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    
    localStorage.setItem('preferred-theme', theme);
    this.saveUserPreferences();
    
    // Update auto theme setting
    const autoThemeCheckbox = document.getElementById('autoTheme');
    if (autoThemeCheckbox && theme !== 'auto') {
      autoThemeCheckbox.checked = false;
    }
  }

  startAutoTheme() {
    const autoTheme = localStorage.getItem('auto-theme-enabled') === 'true';
    if (autoTheme) {
      this.enableAutoTheme();
    }
  }

  enableAutoTheme() {
    const hour = new Date().getHours();
    const isDayTime = hour >= 6 && hour < 18;
    const autoTheme = isDayTime ? 'light' : 'dark';
    
    if (this.currentTheme !== autoTheme) {
      this.setTheme(autoTheme);
    }
    
    // Check every hour
    setTimeout(() => this.enableAutoTheme(), 3600000);
  }

  setupLanguageSystem() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.setLanguage(btn.dataset.lang);
      });
    });
    this.setLanguage(this.currentLang);
  }

  setLanguage(lang) {
    this.currentLang = lang;
    
    // Update all data-key elements
    document.querySelectorAll('[data-key]').forEach(element => {
      const key = element.getAttribute('data-key');
      const translation = this.getTranslation(lang, key);
      
      if (translation) {
        if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update current language display
    const currentLangElement = document.getElementById('currentLang');
    if (currentLangElement) {
      currentLangElement.textContent = lang.toUpperCase();
    }
    
    localStorage.setItem('preferred-language', lang);
    document.documentElement.lang = lang;
    this.saveUserPreferences();
    
    // Refresh dynamic content
    this.loadPopularQuestions();
    this.updateChatWelcomeMessage();
    this.updatePersonalizedContent();
  }

  getTranslation(lang, key) {
    return this.translations[lang] && this.translations[lang][key] || this.translations.pl[key] || null;
  }

  setupPersonalization() {
    const preferencesBtn = document.querySelector('[onclick="openPreferences()"]');
    if (preferencesBtn) {
      preferencesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openPreferences();
      });
    }

    // Auto theme toggle
    const autoThemeCheckbox = document.getElementById('autoTheme');
    if (autoThemeCheckbox) {
      autoThemeCheckbox.checked = localStorage.getItem('auto-theme-enabled') === 'true';
      autoThemeCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          localStorage.setItem('auto-theme-enabled', 'true');
          this.enableAutoTheme();
        } else {
          localStorage.setItem('auto-theme-enabled', 'false');
        }
      });
    }

    // Preferred service
    const preferredServiceSelect = document.getElementById('preferredService');
    if (preferredServiceSelect) {
      preferredServiceSelect.value = this.userPreferences.preferredService || '';
      preferredServiceSelect.addEventListener('change', (e) => {
        this.userPreferences.preferredService = e.target.value;
        this.saveUserPreferences();
        this.updatePersonalizedContent();
      });
    }

    // Contact method
    const contactMethodSelect = document.getElementById('contactMethod');
    if (contactMethodSelect) {
      contactMethodSelect.value = this.userPreferences.contactMethod || 'phone';
      contactMethodSelect.addEventListener('change', (e) => {
        this.userPreferences.contactMethod = e.target.value;
        this.saveUserPreferences();
      });
    }

    // Notification categories
    const notificationCheckboxes = document.querySelectorAll('.notification-categories input[type="checkbox"]');
    notificationCheckboxes.forEach(checkbox => {
      const category = checkbox.value;
      checkbox.checked = this.userPreferences.notificationCategories?.includes(category) || false;
      checkbox.addEventListener('change', () => {
        this.updateNotificationPreferences();
      });
    });
  }

  openPreferences() {
    const panel = document.getElementById('preferencesPanel');
    if (panel) {
      panel.classList.add('show');
    }
  }

  closePreferences() {
    const panel = document.getElementById('preferencesPanel');
    if (panel) {
      panel.classList.remove('show');
    }
  }

  updateNotificationPreferences() {
    const checkboxes = document.querySelectorAll('.notification-categories input[type="checkbox"]');
    const categories = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    
    this.userPreferences.notificationCategories = categories;
    this.saveUserPreferences();
  }

  updatePersonalizedContent() {
    const heroPersonalization = document.getElementById('heroPersonalization');
    if (heroPersonalization && this.userPreferences.preferredService) {
      const serviceInfo = this.getServiceInfo(this.userPreferences.preferredService);
      if (serviceInfo) {
        heroPersonalization.innerHTML = `
          <div class="personalized-recommendation">
            <i class="fas fa-star"></i>
            <strong>${this.getTranslation(this.currentLang, 'recommended_for_you') || 'Polecane dla Ciebie'}:</strong>
            ${serviceInfo.name} - ${serviceInfo.description}
            <button class="btn-gradient btn-sm" onclick="app.openPaymentModal('${this.userPreferences.preferredService}')">
              ${this.getTranslation(this.currentLang, 'start_now') || 'Rozpocznij teraz'}
            </button>
          </div>
        `;
        heroPersonalization.classList.add('show');
      }
    }
  }

  getServiceInfo(serviceType) {
    const services = {
      residence: {
        name: this.getTranslation(this.currentLang, 'service_residence_title') || 'Karta Pobytu',
        description: this.getTranslation(this.currentLang, 'service_residence_short') || 'przez MOS - 30 dni'
      },
      work: {
        name: this.getTranslation(this.currentLang, 'service_work_title') || 'Zezwolenie na pracę',
        description: this.getTranslation(this.currentLang, 'service_work_short') || 'bez testu rynku'
      },
      citizenship: {
        name: this.getTranslation(this.currentLang, 'service_citizenship_title') || 'Obywatelstwo',
        description: this.getTranslation(this.currentLang, 'service_citizenship_short') || 'kompletna ścieżka'
      }
    };
    return services[serviceType];
  }

  // ============================================
  // ENHANCED SETTINGS DROPDOWN
  // ============================================

  setupSettingsDropdown() {
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsMenu = document.getElementById('settingsMenu');
    
    if (settingsBtn && settingsMenu) {
      settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsMenu.classList.toggle('show');
      });
      
      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
          settingsMenu.classList.remove('show');
        }
      });

      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          settingsMenu.classList.remove('show');
        }
      });
    }

    // Preferences close button
    const preferencesClose = document.getElementById('preferencesClose');
    if (preferencesClose) {
      preferencesClose.addEventListener('click', () => this.closePreferences());
    }
  }

  // ============================================
  // ENHANCED INTERACTIVE MAP
  // ============================================

  setupInteractiveMap() {
    const cities = [
      { 
        name: 'wroclaw', 
        displayName: 'Wrocław', 
        days: 30, 
        type: 'fast', 
        x: '25%', 
        y: '65%', 
        region: 'west',
        office: 'Urząd Wojewódzki we Wrocławiu',
        address: 'Wybrzeże J. Słowackiego 12-14',
        phone: '+48 71 340 64 00'
      },
      { 
        name: 'warszawa', 
        displayName: 'Warszawa', 
        days: 45, 
        type: 'medium', 
        x: '65%', 
        y: '35%', 
        region: 'center',
        office: 'Mazowiecki Urząd Wojewódzki',
        address: 'Pl. Bankowy 3/5',
        phone: '+48 22 695 65 00'
      },
      { 
        name: 'krakow', 
        displayName: 'Kraków', 
        days: 40, 
        type: 'medium', 
        x: '55%', 
        y: '80%', 
        region: 'south',
        office: 'Małopolski Urząd Wojewódzki',
        address: 'ul. Basztowa 22',
        phone: '+48 12 392 12 00'
      },
      { 
        name: 'gdansk', 
        displayName: 'Gdańsk', 
        days: 35, 
        type: 'fast', 
        x: '60%', 
        y: '8%', 
        region: 'north',
        office: 'Pomorski Urząd Wojewódzki',
        address: 'ul. Okopowa 21/27',
        phone: '+48 58 307 75 00'
      },
      { 
        name: 'poznan', 
        displayName: 'Poznań', 
        days: 50, 
        type: 'medium', 
        x: '35%', 
        y: '45%', 
        region: 'west',
        office: 'Wielkopolski Urząd Wojewódzki',
        address: 'ul. Czerwonej Armii 11',
        phone: '+48 61 854 75 00'
      },
      { 
        name: 'katowice', 
        displayName: 'Katowice', 
        days: 65, 
        type: 'slow', 
        x: '50%', 
        y: '85%', 
        region: 'south',
        office: 'Śląski Urząd Wojewódzki',
        address: 'ul. Jagiellońska 25',
        phone: '+48 32 377 71 00'
      },
      { 
        name: 'szczecin', 
        displayName: 'Szczecin', 
        days: 42, 
        type: 'medium', 
        x: '15%', 
        y: '25%', 
        region: 'north',
        office: 'Zachodniopomorski Urząd Wojewódzki',
        address: 'ul. Wały Chrobrego 4',
        phone: '+48 91 430 85 00'
      },
      { 
        name: 'lublin', 
        displayName: 'Lublin', 
        days: 48, 
        type: 'medium', 
        x: '75%', 
        y: '55%', 
        region: 'center',
        office: 'Lubelski Urząd Wojewódzki',
        address: 'Pl. Litewski 1',
        phone: '+48 81 533 10 00'
      }
    ];

    this.cities = cities;
    
    const mapContainer = document.getElementById('polandMap');
    if (!mapContainer) return;

    // Clear existing markers
    const existingMarkers = mapContainer.querySelectorAll('.city-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Create city markers
    cities.forEach(city => {
      const marker = document.createElement('div');
      marker.className = `city-marker ${city.type}`;
      marker.setAttribute('data-city', city.name);
      marker.setAttribute('data-region', city.region);
      marker.style.position = 'absolute';
      marker.style.left = city.x;
      marker.style.top = city.y;
      marker.textContent = city.days;
      
      const tooltip = document.createElement('div');
      tooltip.className = 'city-tooltip';
      tooltip.innerHTML = `
        <strong>${city.displayName}</strong><br>
        ${city.days} dni średnio<br>
        <small>${this.getTranslation(this.currentLang, 'click_for_details') || 'Kliknij dla szczegółów'}</small>
      `;
      
      marker.appendChild(tooltip);
      
      marker.addEventListener('click', () => {
        this.showOfficeDetails(city);
      });
      
      mapContainer.appendChild(marker);
    });

    // Setup region filter
    const regionFilter = document.getElementById('regionFilter');
    if (regionFilter) {
      regionFilter.addEventListener('change', (e) => {
        this.filterMapByRegion(e.target.value);
      });
    }

    // Setup map view options
    const mapViewButtons = document.querySelectorAll('[onclick^="setMapView"]');
    mapViewButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const view = btn.textContent.includes('Regiony') ? 'regions' : 'offices';
        this.setMapView(view);
      });
    });
  }

  filterMapByRegion(region) {
    const markers = document.querySelectorAll('.city-marker');
    markers.forEach(marker => {
      const markerRegion = marker.getAttribute('data-region');
      if (!region || markerRegion === region) {
        marker.style.display = 'flex';
      } else {
        marker.style.display = 'none';
      }
    });
  }

  setMapView(view) {
    const voivodeshipsLayer = document.getElementById('voivodeshipsLayer');
    const buttons = document.querySelectorAll('.btn-group .btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (view === 'regions') {
      if (voivodeshipsLayer) voivodeshipsLayer.style.display = 'block';
      document.querySelector('[onclick*="regions"]')?.classList.add('active');
    } else {
      if (voivodeshipsLayer) voivodeshipsLayer.style.display = 'none';
      document.querySelector('[onclick*="offices"]')?.classList.add('active');
    }
  }

  showOfficeDetails(city) {
    const detailsPanel = document.getElementById('officeDetails');
    const detailsBody = document.getElementById('officeDetailsBody');
    
    if (detailsPanel && detailsBody) {
      detailsBody.innerHTML = `
        <h4>${city.displayName}</h4>
        <div class="office-info">
          <div class="mb-3">
            <strong>${this.getTranslation(this.currentLang, 'processing_time') || 'Czas rozpatrzenia'}:</strong>
            <span class="badge ${city.type === 'fast' ? 'bg-success' : city.type === 'medium' ? 'bg-warning' : 'bg-danger'}">${city.days} dni</span>
          </div>
          <div class="mb-3">
            <strong>${this.getTranslation(this.currentLang, 'office') || 'Urząd'}:</strong><br>
            ${city.office}
          </div>
          <div class="mb-3">
            <strong>${this.getTranslation(this.currentLang, 'address') || 'Adres'}:</strong><br>
            ${city.address}
          </div>
          <div class="mb-3">
            <strong>${this.getTranslation(this.currentLang, 'phone') || 'Telefon'}:</strong><br>
            <a href="tel:${city.phone}">${city.phone}</a>
          </div>
          <div class="text-center mt-4">
            <button class="btn-gradient" onclick="app.openPaymentModal('consultation', '${city.name}')">
              <i class="fas fa-calendar-alt"></i>
              ${this.getTranslation(this.currentLang, 'book_consultation') || 'Umów konsultację'}
            </button>
          </div>
        </div>
      `;
      detailsPanel.style.display = 'block';
    }
  }

  closeOfficeDetails() {
    const detailsPanel = document.getElementById('officeDetails');
    if (detailsPanel) {
      detailsPanel.style.display = 'none';
    }
  }

  // ============================================
  // ENHANCED AI FAQ SYSTEM
  // ============================================

  setupEnhancedFAQ() {
    const searchInput = document.getElementById('faqSearch');
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.searchFAQ();
        }
      });
      
      // Real-time search
      searchInput.addEventListener('input', (e) => {
        if (e.target.value.length > 2) {
          clearTimeout(this.searchTimeout);
          this.searchTimeout = setTimeout(() => {
            this.searchFAQ();
          }, 300);
        } else if (e.target.value.length === 0) {
          this.loadPopularQuestions();
        }
      });
    }

    // Voice search
    const voiceSearchBtn = document.querySelector('.voice-search-btn');
    if (voiceSearchBtn) {
      voiceSearchBtn.addEventListener('click', () => this.startVoiceSearch());
    }

    // Suggestion tags
    document.querySelectorAll('.suggestion-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const query = tag.textContent;
        if (searchInput) searchInput.value = query;
        this.searchFAQTerm(query);
      });
    });

    // Load initial popular questions
    this.loadPopularQuestions();
  }

  loadPopularQuestions() {
    const questions = this.getPopularQuestions();
    const resultsContainer = document.getElementById('faqResults');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = '';
    questions.forEach((qa, index) => {
      const item = document.createElement('div');
      item.className = 'faq-item';
      item.innerHTML = `
        <div class="faq-question">
          <span>${qa.question}</span>
          <button class="faq-toggle"><i class="fas fa-chevron-down"></i></button>
        </div>
        <div class="faq-answer">${qa.answer}</div>
      `;
      
      item.addEventListener('click', () => {
        // Close others first
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
          if (openItem !== item) openItem.classList.remove('open');
        });
        item.classList.toggle('open');
      });
      
      resultsContainer.appendChild(item);
    });
  }

  searchFAQ() {
    const query = document.getElementById('faqSearch').value.trim();
    if (!query) {
      this.loadPopularQuestions();
      return;
    }

    const allQuestions = this.getAllQuestions();
    const results = this.semanticSearch(query, allQuestions);
    
    const resultsContainer = document.getElementById('faqResults');
    if (!resultsContainer) return;

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="faq-item">
          <div class="faq-question">
            <span>${this.getTranslation(this.currentLang, 'no_results') || 'Brak wyników'}</span>
          </div>
          <div class="faq-answer open" style="max-height: none;">
            ${this.getTranslation(this.currentLang, 'no_results_desc') || 'Spróbuj zadać pytanie inaczej lub skontaktuj się z naszym ekspertem.'}
            <br><br>
            <button class="btn-gradient btn-sm" onclick="app.openPaymentModal('consultation')">
              <i class="fas fa-user-tie"></i> ${this.getTranslation(this.currentLang, 'ask_expert') || 'Zapytaj eksperta'}
            </button>
          </div>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = '';
    results.forEach(qa => {
      const item = document.createElement('div');
      item.className = 'faq-item';
      item.innerHTML = `
        <div class="faq-question">
          <span>${qa.question}</span>
          <button class="faq-toggle"><i class="fas fa-chevron-down"></i></button>
        </div>
        <div class="faq-answer">${qa.answer}</div>
      `;
      
      item.addEventListener('click', () => {
        item.classList.toggle('open');
      });
      
      resultsContainer.appendChild(item);
    });
  }

  searchFAQTerm(term) {
    const searchInput = document.getElementById('faqSearch');
    if (searchInput) {
      searchInput.value = term;
      this.searchFAQ();
    }
  }

  semanticSearch(query, questions) {
    const lowercaseQuery = query.toLowerCase();
    const queryWords = lowercaseQuery.split(/\s+/);
    
    const results = questions.filter(qa => {
      const questionLower = qa.question.toLowerCase();
      const answerLower = qa.answer.toLowerCase();
      
      return queryWords.some(word => 
        questionLower.includes(word) || 
        answerLower.includes(word) ||
        qa.keywords.some(keyword => keyword.toLowerCase().includes(word))
      );
    });
    
    return results.sort((a, b) => {
      const scoreA = this.calculateRelevanceScore(queryWords, a);
      const scoreB = this.calculateRelevanceScore(queryWords, b);
      return scoreB - scoreA;
    });
  }

  calculateRelevanceScore(queryWords, qa) {
    let score = 0;
    const questionLower = qa.question.toLowerCase();
    const answerLower = qa.answer.toLowerCase();
    
    queryWords.forEach(word => {
      if (questionLower.includes(word)) score += 3;
      if (answerLower.includes(word)) score += 1;
      if (qa.keywords.some(keyword => keyword.toLowerCase().includes(word))) score += 2;
    });
    
    return score;
  }

  startVoiceSearch() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(this.getTranslation(this.currentLang, 'voice_not_supported') || 'Wyszukiwanie głosowe nie jest obsługiwane w tej przeglądarce');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = this.currentLang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const voiceBtn = document.querySelector('.voice-search-btn i');
    if (voiceBtn) {
      voiceBtn.className = 'fas fa-spinner fa-spin';
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const searchInput = document.getElementById('faqSearch');
      if (searchInput) {
        searchInput.value = transcript;
        this.searchFAQ();
      }
    };

    recognition.onend = () => {
      if (voiceBtn) {
        voiceBtn.className = 'fas fa-microphone';
      }
    };

    recognition.onerror = () => {
      if (voiceBtn) {
        voiceBtn.className = 'fas fa-microphone';
      }
      alert(this.getTranslation(this.currentLang, 'voice_error') || 'Błąd rozpoznawania mowy');
    };

    recognition.start();
  }

  askExpert() {
    this.openPaymentModal('consultation');
  }

  // ============================================
  // PUSH NOTIFICATIONS SYSTEM
  // ============================================

  setupPushNotifications() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setTimeout(() => this.showPushBanner(), 3000);
    }

    // Push banner click handler
    document.addEventListener('click', (e) => {
      if (e.target.closest('.push-notification-banner') && !e.target.classList.contains('close-btn')) {
        this.requestPushPermission();
      }
    });
  }

  showPushBanner() {
    const banner = document.getElementById('pushBanner');
    const dismissed = localStorage.getItem('push-dismissed') === 'true';
    const hasPermission = Notification.permission === 'granted';
    
    if (banner && !dismissed && !hasPermission) {
      banner.classList.add('show');
    }
  }

  async requestPushPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.closePushBanner();
        this.showNotification(
          this.getTranslation(this.currentLang, 'push_success_title') || '🎉 Powiadomienia aktywne!',
          this.getTranslation(this.currentLang, 'push_success_desc') || 'Będziesz otrzymywać najnowsze informacje o przepisach MOS.'
        );
        this.subscribeToCategories();
      }
    } catch (error) {
      console.error('Push permission error:', error);
    }
  }

  subscribeToCategories() {
    const categories = this.userPreferences.notificationCategories || ['mos', 'praca'];
    // In production, send categories to backend for targeted notifications
    console.log('Subscribed to categories:', categories);
  }

  showNotification(title, body, options = {}) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body: body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      setTimeout(() => notification.close(), 5000);
    }
  }

  closePushBanner() {
    const banner = document.getElementById('pushBanner');
    if (banner) {
      banner.classList.remove('show');
      localStorage.setItem('push-dismissed', 'true');
    }
  }

  // ============================================
  // ENHANCED CHAT SYSTEM
  // ============================================

  setupEnhancedChat() {
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('chatWidget');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    
    if (chatToggle && chatWidget) {
      chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('open');
        if (chatWidget.classList.contains('open')) {
          chatInput?.focus();
          this.markChatAsRead();
        }
      });
    }
    
    if (chatClose) {
      chatClose.addEventListener('click', () => {
        chatWidget.classList.remove('open');
      });
    }
    
    if (chatSend) {
      chatSend.addEventListener('click', () => this.sendChatMessage());
    }
    
    if (chatInput) {
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendChatMessage();
        }
      });
    }

    // Quick replies
    document.querySelectorAll('.quick-reply-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const reply = btn.getAttribute('data-reply');
        this.handleQuickReply(reply);
      });
    });

    // Show proactive invitation
    setTimeout(() => this.showChatInvitation(), 5000);
  }

  showChatInvitation() {
    if (this.chatInvitationShown) return;
    
    const invitation = document.getElementById('chatInvitation');
    if (invitation) {
      invitation.classList.add('show');
      setTimeout(() => {
        if (invitation.classList.contains('show')) {
          this.dismissChatInvitation();
        }
      }, 15000); // Auto dismiss after 15 seconds
    }
  }

  acceptChatInvitation() {
    const invitation = document.getElementById('chatInvitation');
    const chatWidget = document.getElementById('chatWidget');
    
    if (invitation) invitation.classList.remove('show');
    if (chatWidget) chatWidget.classList.add('open');
    
    this.appendChatMessage(
      this.getTranslation(this.currentLang, 'chat_invitation_accepted') || 'Dzięki! W czym mogę Ci pomóc?', 
      false
    );
    
    localStorage.setItem('chat-invitation-shown', 'true');
    this.chatInvitationShown = true;
  }

  dismissChatInvitation() {
    const invitation = document.getElementById('chatInvitation');
    if (invitation) {
      invitation.classList.remove('show');
    }
    localStorage.setItem('chat-invitation-shown', 'true');
    this.chatInvitationShown = true;
  }

  sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;
    
    this.appendChatMessage(text, true);
    input.value = '';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    // Simulate AI response
    setTimeout(() => {
      this.hideTypingIndicator();
      const response = this.generateChatResponse(text);
      this.appendChatMessage(response, false);
      this.updateChatNotification();
    }, 1000 + Math.random() * 2000);
  }

  handleQuickReply(reply) {
    const responses = {
      mos: this.getTranslation(this.currentLang, 'chat_mos_response') || 'System MOS pozwala składać wnioski online z podpisem elektronicznym. Średni czas: 30-45 dni. Chcesz rozpocząć proces?',
      praca: this.getTranslation(this.currentLang, 'chat_praca_response') || 'Od czerwca 2025 nie ma testu rynku pracy dla większości zawodów. Portal Praca.gov.pl obsługuje wszystko elektronicznie.',
      obywatelstwo: this.getTranslation(this.currentLang, 'chat_citizenship_response') || 'Proces obywatelstwa składa się z kilku etapów. Mogę przeanalizować Twoje uprawnienia za pomocą AI. Rozpoczniemy?',
      terminy: this.getTranslation(this.currentLang, 'chat_terminy_response') || 'Aktualne terminy: Wrocław 30 dni, Warszawa 45 dni, Kraków 40 dni. W którym mieście planujesz składać wniosek?'
    };

    this.appendChatMessage(responses[reply] || 'Dzięki za pytanie!', false);
  }

  showTypingIndicator() {
    const chatBody = document.getElementById('chatBody');
    if (chatBody) {
      const indicator = document.createElement('div');
      indicator.className = 'chat-message bot typing-indicator';
      indicator.innerHTML = `
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      `;
      chatBody.appendChild(indicator);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  hideTypingIndicator() {
    const indicator = document.querySelector('.typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  appendChatMessage(content, fromUser = false) {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) return;
    
    const message = document.createElement('div');
    message.className = `chat-message ${fromUser ? 'user' : 'bot'}`;
    message.innerHTML = content;
    
    chatBody.appendChild(message);
    chatBody.scrollTop = chatBody.scrollHeight;

    if (!fromUser && !document.getElementById('chatWidget').classList.contains('open')) {
      this.updateChatNotification();
    }
  }

  updateChatNotification() {
    const notification = document.getElementById('chatNotification');
    if (notification) {
      const current = parseInt(notification.textContent) || 0;
      notification.textContent = current + 1;
      notification.style.display = 'flex';
    }
  }

  markChatAsRead() {
    const notification = document.getElementById('chatNotification');
    if (notification) {
      notification.style.display = 'none';
      notification.textContent = '0';
    }
  }

  generateChatResponse(message) {
    const responses = this.getChatResponses();
    const messageLower = message.toLowerCase();
    
    // Smart response based on keywords
    if (messageLower.includes('mos') || messageLower.includes('karta')) {
      return responses.mos[Math.floor(Math.random() * responses.mos.length)];
    }
    if (messageLower.includes('praca') || messageLower.includes('zezwolenie')) {
      return responses.work[Math.floor(Math.random() * responses.work.length)];
    }
    if (messageLower.includes('obywatelstwo')) {
      return responses.citizenship[Math.floor(Math.random() * responses.citizenship.length)];
    }
    if (messageLower.includes('termin') || messageLower.includes('ile')) {
      return responses.timing[Math.floor(Math.random() * responses.timing.length)];
    }
    if (messageLower.includes('cena') || messageLower.includes('koszt')) {
      return responses.pricing[Math.floor(Math.random() * responses.pricing.length)];
    }
    
    // Default responses
    const allResponses = [
      ...responses.general,
      ...responses.help,
      ...responses.consultation
    ];
    return allResponses[Math.floor(Math.random() * allResponses.length)];
  }

  updateChatWelcomeMessage() {
    const chatBody = document.getElementById('chatBody');
    if (chatBody) {
      const welcomeMessage = chatBody.querySelector('.chat-message.bot');
      if (welcomeMessage) {
        welcomeMessage.innerHTML = this.getTranslation(this.currentLang, 'chat_welcome') || '👋 Witaj! Jestem AI asystentem MigrantGuidePoland. Jak mogę Ci pomóc z legalizacją pobytu?';
      }
    }
  }

  getChatResponses() {
    return {
      general: [
        this.getTranslation(this.currentLang, 'chat_response1') || 'Dziękuję za pytanie! Mogę pomóc Ci z procedurami MOS, Praca.gov.pl i obywatelstwem. O co chciałbyś zapytać?',
        this.getTranslation(this.currentLang, 'chat_response2') || 'Świetne pytanie! Nasze systemy AI mogą przyspieszyć Twoją sprawę do 30 dni. Chcesz umówić bezpłatną konsultację?',
        this.getTranslation(this.currentLang, 'chat_response3') || 'Specjalizujemy się w najnowszych przepisach 2025. Jaką usługę Cię interesuje: karta pobytu, zezwolenie na pracę czy obywatelstwo?'
      ],
      mos: [
        'System MOS (mos.cudzoziemcy.gov.pl) to rewolucja! Składasz wniosek online, podpisujesz elektronicznie i czekasz średnio 30-45 dni. Pomóc Ci z rejestracją?',
        'Dzięki MOS mamy najszybsze terminy w Polsce. AI analizuje Twoje dokumenty i optymalizuje kolejność. Rozpocznij proces już dziś!'
      ],
      work: [
        'Od czerwca 2025 nie ma testu rynku pracy! Portal Praca.gov.pl to czysta elektronika. Ostrzegam: kary za błędy to 3-50k zł. Zabezpieczymy Cię!',
        'Nowy system pracy.gov.pl to ogromne ułatwienie, ale też pułapki. Nasze AI sprawdza każdy dokument przed wysłaniem.'
      ],
      citizenship: [
        'Obywatelstwo to kompleksowy proces. Nasze AI przeanalizuje Twoje uprawnienia w 5 minut. Chcesz sprawdzić swoje szanse?',
        'Ścieżka do obywatelstwa: karta pobytu → pobyt stały → egzamin → ceremonia. Przeprowadzimy Cię przez każdy etap!'
      ],
      timing: [
        'Aktualne terminy na dziś: Wrocław 30 dni, Warszawa 45 dni, Kraków 40 dni, Gdańsk 35 dni. Gdzie planujesz składać wniosek?',
        'Dzięki AI monitoring 24/7 mamy najakturalniejsze terminy w Polsce. Powiadomię Cię o każdej zmianie!'
      ],
      pricing: [
        'Karta pobytu przez MOS: 1890 zł, Zezwolenie na pracę: 1590 zł, Obywatelstwo Premium: 4790 zł. Pierwsza konsultacja gratis!',
        'Ceny są transparentne i bez ukrytych kosztów. W pakiecie: AI analiza + monitoring + wsparcie prawne. Opłacasz dopiero po sukcesie!'
      ],
      help: [
        'Jestem tu, żeby pomóc! Mogę wyjaśnić procedury, sprawdzić terminy, umówić konsultację lub rozpocząć proces. Co Cię interesuje?',
        'Twoje pytania są dla mnie priorytetem! Działam 24/7 i mam dostęp do najnowszych przepisów. W czym mogę pomóc?'
      ],
      consultation: [
        'Bezpłatna konsultacja to najlepszy start! Ekspert przeanalizuje Twoją sytuację i zaproponuje optymalną ścieżkę. Umówić?',
        'Konsultacja trwa 30 minut i jest całkowicie darmowa. Możemy się spotkać online lub stacjonarnie. Który termin Ci odpowiada?'
      ]
    };
  }

  // ============================================
  // USER DASHBOARD & LOGIN SYSTEM
  // ============================================

  setupUserDashboard() {
    // Login button in navbar
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.isLoggedIn) {
          this.openDashboard();
        } else {
          this.openLoginModal();
        }
      });
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleRegister();
      });
    }

    // Login tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        this.switchLoginTab(tabName);
      });
    });

    this.updateLoginButton();
  }

  openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
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

  async handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Simulate login (in production, call your API)
    if (email && password) {
      this.isLoggedIn = true;
      localStorage.setItem('user-logged-in', 'true');
      localStorage.setItem('user-email', email);
      if (rememberMe) {
        localStorage.setItem('remember-login', 'true');
      }
      
      this.showNotification(
        this.getTranslation(this.currentLang, 'login_success') || '✅ Zalogowano pomyślnie!',
        this.getTranslation(this.currentLang, 'welcome_back') || 'Witaj ponownie w panelu klienta!'
      );
      
      this.closeLoginModal();
      this.updateLoginButton();
      setTimeout(() => this.openDashboard(), 500);
    }
  }

  async handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;
    
    if (password !== confirmPassword) {
      alert(this.getTranslation(this.currentLang, 'password_mismatch') || 'Hasła nie są identyczne');
      return;
    }
    
    if (!acceptTerms) {
      alert(this.getTranslation(this.currentLang, 'accept_terms_required') || 'Musisz zaakceptować regulamin');
      return;
    }
    
    // Simulate registration (in production, call your API)
    if (name && email && phone && password) {
      this.isLoggedIn = true;
      localStorage.setItem('user-logged-in', 'true');
      localStorage.setItem('user-email', email);
      localStorage.setItem('user-name', name);
      
      this.showNotification(
        this.getTranslation(this.currentLang, 'register_success') || '✅ Konto utworzone!',
        this.getTranslation(this.currentLang, 'account_created') || 'Twoje konto zostało pomyślnie utworzone.'
      );
      
      this.closeLoginModal();
      this.updateLoginButton();
      setTimeout(() => this.openDashboard(), 500);
    }
  }

  updateLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      if (this.isLoggedIn) {
        loginBtn.innerHTML = `
          <i class="fas fa-user-check"></i>
          <span data-key="dashboard_nav">${this.getTranslation(this.currentLang, 'dashboard_nav') || 'Panel'}</span>
        `;
      } else {
        loginBtn.innerHTML = `
          <i class="fas fa-user"></i>
          <span data-key="login_nav">${this.getTranslation(this.currentLang, 'login_nav') || 'Panel klienta'}</span>
        `;
      }
    }
  }

  openDashboard() {
    const modal = document.getElementById('dashboardModal');
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      this.loadDashboardData();
    }
  }

  closeDashboard() {
    const modal = document.getElementById('dashboardModal');
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  loadDashboardData() {
    // Load user cases
    const userCases = document.getElementById('userCases');
    if (userCases) {
      userCases.innerHTML = this.generateUserCases();
    }

    // Load user documents
    const userDocuments = document.getElementById('userDocuments');
    if (userDocuments) {
      userDocuments.innerHTML = this.generateUserDocuments();
    }

    // Load recommendations
    const recommendations = document.getElementById('crossSellRecommendations');
    if (recommendations) {
      recommendations.innerHTML = this.generateRecommendations();
    }

    // Update user name
    const userName = document.getElementById('userName');
    if (userName) {
      userName.textContent = localStorage.getItem('user-name') || localStorage.getItem('user-email') || 'Użytkownik';
    }
  }

  generateUserCases() {
    const cases = [
      {
        id: 'KP-2025-001',
        type: 'Karta Pobytu',
        status: 'W trakcie',
        progress: 75,
        daysLeft: 8,
        lastUpdate: '2025-08-20'
      },
      {
        id: 'ZP-2025-002',
        type: 'Zezwolenie na pracę',
        status: 'Dokumenty wymagane',
        progress: 25,
        daysLeft: 45,
        lastUpdate: '2025-08-15'
      }
    ];

    return cases.map(caseItem => `
      <div class="case-item">
        <div class="case-header">
          <h6>${caseItem.type}</h6>
          <span class="case-id">${caseItem.id}</span>
        </div>
        <div class="case-status">
          <div class="progress mb-2">
            <div class="progress-bar" style="width: ${caseItem.progress}%"></div>
          </div>
          <div class="d-flex justify-content-between">
            <small class="text-muted">${caseItem.status}</small>
            <small class="text-success">${caseItem.daysLeft} dni pozostało</small>
          </div>
        </div>
        <div class="case-actions mt-2">
          <button class="btn-outline-gradient btn-sm" onclick="app.viewCaseDetails('${caseItem.id}')">
            Szczegóły
          </button>
          <button class="btn-gradient btn-sm" onclick="app.openCalendarIntegration()">
            Umów spotkanie
          </button>
        </div>
      </div>
    `).join('');
  }

  generateUserDocuments() {
    const documents = [
      {
        name: 'Wniosek MOS - Karta Pobytu',
        status: 'Podpisany',
        date: '2025-08-18',
        type: 'pdf'
      },
      {
        name: 'Umowa z kancelaria prawną',
        status: 'Oczekuje podpisu',
        date: '2025-08-20',
        type: 'contract'
      }
    ];

    return documents.map(doc => `
      <div class="document-item">
        <div class="d-flex align-items-center">
          <i class="fas fa-file-${doc.type === 'pdf' ? 'pdf' : 'contract'} me-2"></i>
          <div class="flex-grow-1">
            <h6 class="mb-1">${doc.name}</h6>
            <small class="text-muted">${doc.date} • ${doc.status}</small>
          </div>
          <div class="document-actions">
            <button class="btn-outline-gradient btn-sm" onclick="app.downloadDocument('${doc.name}')">
              <i class="fas fa-download"></i>
            </button>
            ${doc.status === 'Oczekuje podpisu' ? 
              `<button class="btn-gradient btn-sm" onclick="app.requestDocumentSigning()">
                <i class="fas fa-signature"></i>
              </button>` : ''
            }
          </div>
        </div>
      </div>
    `).join('');
  }

  generateRecommendations() {
    const recommendations = [
      {
        service: 'work',
        title: 'Zezwolenie na pracę',
        reason: 'Po otrzymaniu karty pobytu',
        discount: '10%'
      },
      {
        service: 'citizenship',
        title: 'Ścieżka do obywatelstwa',
        reason: 'Na podstawie obecnych dokumentów',
        discount: '15%'
      }
    ];

    return recommendations.map(rec => `
      <div class="recommendation-card">
        <div class="rec-header">
          <h6>${rec.title}</h6>
          <span class="discount-badge">${rec.discount} taniej</span>
        </div>
        <p class="rec-reason">${rec.reason}</p>
        <button class="btn-gradient btn-sm w-100" onclick="app.openPaymentModal('${rec.service}')">
          Rozpocznij teraz
        </button>
      </div>
    `).join('');
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('user-logged-in');
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-name');
    
    this.showNotification(
      this.getTranslation(this.currentLang, 'logout_success') || '👋 Wylogowano',
      this.getTranslation(this.currentLang, 'see_you_soon') || 'Do zobaczenia wkrótce!'
    );
    
    this.closeDashboard();
    this.updateLoginButton();
  }

  viewCaseDetails(caseId) {
    alert(`Szczegóły sprawy ${caseId} - funkcja w development`);
  }

  downloadDocument(docName) {
    alert(`Pobieranie: ${docName} - funkcja w development`);
  }

  // ============================================
  // CALENDAR INTEGRATION
  // ============================================

  setupCalendarIntegration() {
    // Calendar integration is handled by modal events
    // setupCalendarIntegration in main setupCalendarIntegration function
  }

  openCalendarIntegration() {
    const modal = document.getElementById('calendarModal');
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      this.prepareCalendarEvent();
    }
  }

  closeCalendarModal() {
    const modal = document.getElementById('calendarModal');
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  prepareCalendarEvent() {
    const now = new Date();
    const eventDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Next week
    const eventTime = '10:00';
    
    document.getElementById('eventDate').textContent = eventDate.toLocaleDateString(this.currentLang);
    document.getElementById('eventTime').textContent = eventTime;
    document.getElementById('eventTitle').textContent = this.getTranslation(this.currentLang, 'consultation_title') || 'Konsultacja MOS';
    document.getElementById('eventType').textContent = this.getTranslation(this.currentLang, 'online_meeting') || 'Spotkanie online';
  }

  addToGoogleCalendar() {
    const title = encodeURIComponent(document.getElementById('eventTitle').textContent);
    const details = encodeURIComponent('Konsultacja dotycząca legalizacji pobytu w Polsce');
    const location = encodeURIComponent('Online - link zostanie wysłany');
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 7);
    startDate.setHours(10, 0, 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setHours(11, 0, 0, 0);
    
    const startStr = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endStr = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
    
    window.open(googleUrl, '_blank');
    this.closeCalendarModal();
  }

  addToOutlook() {
    const title = encodeURIComponent(document.getElementById('eventTitle').textContent);
    const body = encodeURIComponent('Konsultacja dotycząca legalizacji pobytu w Polsce\n\nLink do spotkania zostanie wysłany osobno.');
    const location = encodeURIComponent('Online');
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 7);
    startDate.setHours(10, 0, 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setHours(11, 0, 0, 0);
    
    const startStr = startDate.toISOString();
    const endStr = endDate.toISOString();
    
    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startStr}&enddt=${endStr}&body=${body}&location=${location}`;
    
    window.open(outlookUrl, '_blank');
    this.closeCalendarModal();
  }

  downloadICS() {
    const title = document.getElementById('eventTitle').textContent;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 7);
    startDate.setHours(10, 0, 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setHours(11, 0, 0, 0);
    
    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MigrantGuidePoland//Calendar//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@migrantguidepoland.com`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${title}`,
      'DESCRIPTION:Konsultacja dotycząca legalizacji pobytu w Polsce',
      'LOCATION:Online - link zostanie wysłany',
      `DTSTAMP:${formatDate(new Date())}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'konsultacja-mos.ics';
    a.click();
    URL.revokeObjectURL(url);
    
    this.closeCalendarModal();
  }

  // ============================================
  // DOCUMENT SIGNING SYSTEM
  // ============================================

  setupDocumentSigning() {
    // Document signing is handled by modal events
  }

  requestDocumentSigning() {
    const modal = document.getElementById('signingModal');
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  closeSigningModal() {
    const modal = document.getElementById('signingModal');
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  signWithAdobeSign() {
    // Simulate Adobe Sign integration
    this.showNotification(
      '📄 Adobe Sign',
      'Przekierowanie do Adobe Sign w ciągu 5 sekund...'
    );
    
    setTimeout(() => {
      // In production, redirect to Adobe Sign with document
      this.showNotification(
        '✅ Email wysłany!',
        'Link do podpisania dokumentu zostanie przesłany na Twój adres email.'
      );
      this.closeSigningModal();
    }, 5000);
  }

  signWithDocuSign() {
    // Simulate DocuSign integration
    this.showNotification(
      '📝 DocuSign',
      'Przekierowanie do DocuSign w ciągu 5 sekund...'
    );
    
    setTimeout(() => {
      this.showNotification(
        '✅ Email wysłany!',
        'Link do podpisania dokumentu zostanie przesłany na Twój adres email.'
      );
      this.closeSigningModal();
    }, 5000);
  }

  signWithAsseco() {
    // Simulate Asseco integration (Polish provider)
    this.showNotification(
      '🇵🇱 Asseco',
      'Przekierowanie do polskiej platformy podpisu elektronicznego...'
    );
    
    setTimeout(() => {
      this.showNotification(
        '✅ Email wysłany!',
        'Link do podpisania dokumentu zostanie przesłany na Twój adres email.'
      );
      this.closeSigningModal();
    }, 5000);
  }

  // ============================================
  // CROSS-SELLING SYSTEM
  // ============================================

  setupCrossSelling() {
    // Cross-selling triggers are handled by payment completion
  }

  showCrossSelling(currentService) {
    const crossSellSection = document.getElementById('crossSellSection');
    const recommendationCards = document.getElementById('recommendationCards');
    
    if (!crossSellSection || !recommendationCards) return;
    
    const recommendations = this.generateCrossSellingRecommendations(currentService);
    
    if (recommendations.length > 0) {
      recommendationCards.innerHTML = recommendations.map(rec => `
        <div class="col-md-6">
          <div class="glass-card text-center">
            <div class="icon">
              <i class="${rec.icon}"></i>
            </div>
            <h5>${rec.title}</h5>
            <p>${rec.description}</p>
            <div class="cross-sell-offer">
              <span class="discount">${rec.discount}% taniej</span>
              <div class="original-price">Zwykle: ${rec.originalPrice} zł</div>
              <div class="discounted-price">Teraz: ${rec.discountedPrice} zł</div>
            </div>
            <button class="btn-gradient" onclick="app.openPaymentModal('${rec.service}')">
              ${this.getTranslation(this.currentLang, 'add_to_order') || 'Dodaj do zamówienia'}
            </button>
          </div>
        </div>
      `).join('');
      
      crossSellSection.style.display = 'block';
      crossSellSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  generateCrossSellingRecommendations(currentService) {
    const recommendations = {
      residence: [
        {
          service: 'work',
          title: this.getTranslation(this.currentLang, 'service_work_title') || 'Zezwolenie na pracę',
          description: this.getTranslation(this.currentLang, 'cross_work_desc') || 'Uzupełnij kartę pobytu o zezwolenie na pracę',
          icon: 'fas fa-briefcase',
          discount: 15,
          originalPrice: 1590,
          discountedPrice: 1352
        },
        {
          service: 'citizenship',
          title: this.getTranslation(this.currentLang, 'service_citizenship_title') || 'Ścieżka do obywatelstwa',
          description: this.getTranslation(this.currentLang, 'cross_citizenship_desc') || 'Zaplanuj swoją drogę do polskiego obywatelstwa',
          icon: 'fas fa-flag',
          discount: 10,
          originalPrice: 4790,
          discountedPrice: 4311
        }
      ],
      work: [
        {
          service: 'residence',
          title: this.getTranslation(this.currentLang, 'service_residence_title') || 'Karta pobytu',
          description: this.getTranslation(this.currentLang, 'cross_residence_desc') || 'Zabezpiecz swój pobyt kartą pobytu',
          icon: 'fas fa-id-card',
          discount: 10,
          originalPrice: 1890,
          discountedPrice: 1701
        }
      ],
      citizenship: [
        {
          service: 'residence',
          title: this.getTranslation(this.currentLang, 'service_residence_title') || 'Karta pobytu',
          description: this.getTranslation(this.currentLang, 'cross_residence_req') || 'Wymagana do procesu obywatelstwa',
          icon: 'fas fa-id-card',
          discount: 20,
          originalPrice: 1890,
          discountedPrice: 1512
        }
      ]
    };
    
    return recommendations[currentService] || [];
  }

  // ============================================
  // MICRO-INTERACTIONS
  // ============================================

  setupMicroInteractions() {
    // Hover reveals for service cards
    document.querySelectorAll('.hover-reveal').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('revealed');
      });
      
      card.addEventListener('mouseleave', () => {
        setTimeout(() => {
          card.classList.remove('revealed');
        }, 300);
      });
    });

    // Feature hints
    document.querySelectorAll('.feature-hint').forEach(hint => {
      hint.addEventListener('click', () => {
        const hintType = hint.getAttribute('data-hint');
        this.showFeatureDemo(hintType);
      });
    });

    // Stat items animation on scroll
    this.setupStatsAnimation();
    
    // Floating elements animation
    this.setupFloatingElements();
  }

  showFeatureDemo(hintType) {
    const demos = {
      ai: 'Nasze AI analizuje dokumenty w czasie rzeczywistym, wykrywa błędy i optymalizuje terminy. Skuteczność: 95%!',
      speed: 'Rekord: 3 dni na kartę pobytu we Wrocławiu! Średnio 30-45 dni dzięki systemowi MOS.',
      support: 'Wsparcie 24/7: AI chatbot + eksperci + monitoring statusu + powiadomienia push.'
    };
    
    this.showNotification(
      `💡 ${hintType.toUpperCase()}`,
      demos[hintType] || 'Funkcja demonstracyjna'
    );
  }

  setupStatsAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector('.stat-number');
          if (statNumber && !statNumber.classList.contains('animated')) {
            this.animateNumber(statNumber);
            statNumber.classList.add('animated');
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(item => {
      observer.observe(item);
    });
  }

  animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const start = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.floor(target * easedProgress);
      element.textContent = current + (element.textContent.includes('+') ? '+' : '');
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = element.textContent.replace(/^\d+/, target.toString());
      }
    };
    
    requestAnimationFrame(animate);
  }

  setupFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 2}s`;
    });
  }

  // ============================================
  // PAYMENT SYSTEM
  // ============================================

  setupPaymentSystem() {
    // Initialize Stripe
    if (window.Stripe) {
      this.stripe = Stripe('pk_test_51234567890abcdef'); // Replace with your key
    }
    
    // Setup payment method selection
    document.addEventListener('change', (e) => {
      if (e.target.name === 'paymentMethod') {
        document.querySelectorAll('.payment-method').forEach(method => {
          method.classList.toggle('selected', method.querySelector('input').checked);
        });
        this.showPaymentForm(e.target.value);
      }
    });
  }

  openPaymentModal(serviceType, city = null) {
    const modal = document.getElementById('paymentModal');
    if (!modal) return;
    
    this.currentService = { type: serviceType, city: city };
    this.updatePaymentModalContent();
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  updatePaymentModalContent() {
    const prices = {
      consultation: 0,
      residence: 1890,
      work: 1590,
      citizenship: 4790
    };
    
    const serviceNames = {
      consultation: this.getTranslation(this.currentLang, 'service_consultation') || 'Bezpłatna konsultacja',
      residence: this.getTranslation(this.currentLang, 'service_residence_title') || 'Karta Pobytu przez MOS',
      work: this.getTranslation(this.currentLang, 'service_work_title') || 'Zezwolenia Praca.gov.pl',
      citizenship: this.getTranslation(this.currentLang, 'service_citizenship_title') || 'Obywatelstwo Premium'
    };
    
    const price = prices[this.currentService.type] || 0;
    const serviceName = serviceNames[this.currentService.type] || 'Usługa';
    
    const serviceInfoContainer = document.getElementById('serviceInfo');
    if (serviceInfoContainer) {
      if (price > 0) {
        serviceInfoContainer.innerHTML = `
          <div class="service-info">
            <h5>${serviceName}</h5>
            <div class="h4 text-success">${price} zł</div>
            ${this.currentService.city ? `<small>Lokalizacja: ${this.currentService.city}</small>` : ''}
            <div class="service-features mt-2">
              <span class="feature-badge success">✅ AI Monitoring</span>
              <span class="feature-badge info">🔐 Gwarancja</span>
              <span class="feature-badge primary">📞 24/7 Support</span>
            </div>
          </div>
        `;
      } else {
        serviceInfoContainer.innerHTML = `
          <div class="service-info">
            <h5>${serviceName}</h5>
            <div class="h4 text-success">Bezpłatnie</div>
            ${this.currentService.city ? `<small>Lokalizacja: ${this.currentService.city}</small>` : ''}
            <div class="consultation-benefits mt-2">
              <small>✓ Analiza sytuacji prawnej</small><br>
              <small>✓ Plan działania</small><br>
              <small>✓ Szacunkowe terminy</small>
            </div>
          </div>
        `;
      }
    }
  }

  showPaymentForm(method) {
    const formContainer = document.getElementById('paymentForm');
    if (!formContainer) return;
    
    let formHTML = '';
    
    switch (method) {
      case 'stripe':
        formHTML = `
          <div id="card-element">
            <!-- Stripe Elements will create form elements here -->
          </div>
          <div id="card-errors" role="alert"></div>
        `;
        break;
      case 'przelewy24':
        formHTML = `
          <select class="form-select">
            <option>PKO Bank Polski</option>
            <option>mBank</option>
            <option>ING Bank Śląski</option>
            <option>Santander Bank Polska</option>
            <option>Bank Millennium</option>
            <option>BLIK</option>
          </select>
        `;
        break;
      case 'crypto':
        formHTML = `
          <select class="form-select">
            <option>Bitcoin (BTC)</option>
            <option>Ethereum (ETH)</option>
            <option>USDC</option>
            <option>Litecoin (LTC)</option>
          </select>
          <div class="alert alert-info">
            <i class="fas fa-info-circle me-2"></i>
            <small>${this.getTranslation(this.currentLang, 'crypto_info') || 'Płatność kryptowalutami jest przetwarzana przez bezpieczny procesor płatności.'}</small>
          </div>
        `;
        break;
    }
    
    formContainer.innerHTML = formHTML;
    formContainer.style.display = 'block';
    
    // Initialize Stripe Elements if needed
    if (method === 'stripe' && this.stripe) {
      setTimeout(() => this.setupStripeElements(), 100);
    }
  }

  setupStripeElements() {
    if (!this.stripe) return;
    
    const elements = this.stripe.elements();
    const style = {
      base: {
        fontSize: '16px',
        color: getComputedStyle(document.body).getPropertyValue('--text-primary').trim(),
        '::placeholder': {
          color: getComputedStyle(document.body).getPropertyValue('--text-tertiary').trim(),
        },
      },
    };
    
    const cardElement = elements.create('card', { style });
    const cardElementContainer = document.getElementById('card-element');
    
    if (cardElementContainer) {
      cardElement.mount('#card-element');
      
      cardElement.on('change', ({error}) => {
        const displayError = document.getElementById('card-errors');
        if (displayError) {
          displayError.textContent = error ? error.message : '';
        }
      });
      
      this.cardElement = cardElement;
    }
  }

  async processPayment() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!selectedMethod) {
      alert(this.getTranslation(this.currentLang, 'select_payment_method') || 'Wybierz metodę płatności');
      return;
    }
    
    const method = selectedMethod.value;
    const price = this.getServicePrice(this.currentService.type);
    
    try {
      if (price === 0) {
        await this.bookFreeConsultation();
      } else {
        switch (method) {
          case 'stripe':
            await this.processStripePayment(price);
            break;
          case 'przelewy24':
            await this.processPrzelewy24Payment(price);
            break;
          case 'crypto':
            await this.processCryptoPayment(price);
            break;
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(this.getTranslation(this.currentLang, 'payment_error') || 'Wystąpił błąd podczas przetwarzania płatności. Spróbuj ponownie.');
    }
  }

  getServicePrice(serviceType) {
    const prices = {
      consultation: 0,
      residence: 1890,
      work: 1590,
      citizenship: 4790
    };
    return prices[serviceType] || 0;
  }

  async bookFreeConsultation() {
    // Show loading
    this.showNotification(
      '📅 Rezerwacja...',
      'Przygotowujemy Twoją bezpłatną konsultację'
    );

    // Simulate booking process
    setTimeout(() => {
      this.showNotification(
        '✅ Konsultacja umówiona!',
        'Skontaktujemy się z Tobą w ciągu 2 godzin w celu ustalenia terminu.'
      );
      this.closePaymentModal();
      
      // Open calendar integration
      setTimeout(() => {
        this.openCalendarIntegration();
      }, 1000);
    }, 2000);
  }

  async processStripePayment(amount) {
    if (!this.stripe || !this.cardElement) {
      throw new Error('Stripe not initialized');
    }
    
    // Show processing
    this.showNotification(
      '💳 Przetwarzanie...',
      `Płatność ${amount} zł przez Stripe`
    );
    
    // In production, create payment intent on server first
    const {error, paymentMethod} = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });
    
    if (error) {
      throw error;
    }
    
    // Simulate successful payment
    setTimeout(() => {
      this.completePayment(amount, 'stripe');
    }, 3000);
  }

  async processPrzelewy24Payment(amount) {
    this.showNotification(
      '🏦 Przekierowanie...',
      'Zostaniesz przekierowany do Przelewy24'
    );
    
    setTimeout(() => {
      this.completePayment(amount, 'przelewy24');
    }, 2000);
  }

  async processCryptoPayment(amount) {
    this.showNotification(
      '₿ Generowanie adresu...',
      'Przygotowujemy adres do płatności kryptowalutami'
    );
    
    setTimeout(() => {
      this.completePayment(amount, 'crypto');
    }, 3000);
  }

  completePayment(amount, method) {
    this.showNotification(
      '🎉 Płatność zakończona!',
      `Usługa opłacona: ${amount} zł (${method})`
    );
    
    this.closePaymentModal();
    
    // Show cross-selling recommendations
    setTimeout(() => {
      this.showCrossSelling(this.currentService.type);
    }, 1000);
    
    // Open calendar for scheduling if not consultation
    if (this.currentService.type !== 'consultation') {
      setTimeout(() => {
        this.openCalendarIntegration();
      }, 2000);
    }
  }

  closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
    
    // Reset form
    const form = document.getElementById('paymentForm');
    if (form) {
      form.innerHTML = '';
      form.style.display = 'none';
    }
    
    document.querySelectorAll('.payment-method.selected').forEach(method => {
      method.classList.remove('selected');
    });
    document.querySelectorAll('input[name="paymentMethod"]').forEach(input => {
      input.checked = false;
    });
  }

  // ============================================
  // SCROLL EFFECTS & ANIMATIONS
  // ============================================

  setupScrollEffects() {
    const navbar = document.getElementById('mainNav');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          navbar?.classList.toggle('scrolled', scrolled);
          ticking = false;
        });
        ticking = true;
      }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
      observer.observe(el);
    });
  }

  // ============================================
  // SMART BOOKING SYSTEM
  // ============================================

  smartBooking() {
    // Analyze user preferences and suggest best option
    if (this.userPreferences.preferredService) {
      this.openPaymentModal(this.userPreferences.preferredService);
    } else {
      // Show smart recommendation
      const recommendation = this.getSmartRecommendation();
      if (confirm(`Polecam: ${recommendation.title}\n\n${recommendation.reason}\n\nCzy chcesz rozpocząć?`)) {
        this.openPaymentModal(recommendation.service);
      }
    }
  }

  getSmartRecommendation() {
    // Simple AI-like logic based on current trends
    const recommendations = [
      {
        service: 'residence',
        title: 'Karta Pobytu przez MOS',
        reason: 'Najszybszy proces - średnio 30 dni. System MOS eliminuje kolejki i papierologię.'
      },
      {
        service: 'work',
        title: 'Zezwolenie na pracę',
        reason: 'Bez testu rynku pracy od czerwca 2025. Teraz najłatwiej!'
      },
      {
        service: 'consultation',
        title: 'Bezpłatna konsultacja',
        reason: 'Eksperte przeanalizuje Twoją sytuację i zaproponuje optymalną ścieżkę.'
      }
    ];
    
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  }

  // ============================================
  // USER PREFERENCES & LOCAL STORAGE
  // ============================================

  loadUserPreferences() {
    const stored = localStorage.getItem('user-preferences');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse user preferences');
      }
    }
    
    return {
      theme: 'dark',
      language: 'pl',
      preferredService: '',
      contactMethod: 'phone',
      notificationCategories: ['mos', 'praca'],
      autoTheme: false
    };
  }

  saveUserPreferences() {
    this.userPreferences = {
      ...this.userPreferences,
      theme: this.currentTheme,
      language: this.currentLang
    };
    
    localStorage.setItem('user-preferences', JSON.stringify(this.userPreferences));
  }

  applyUserPreferences() {
    // Apply saved theme
    if (this.userPreferences.theme) {
      this.setTheme(this.userPreferences.theme);
    }
    
    // Apply saved language
    if (this.userPreferences.language) {
      this.setLanguage(this.userPreferences.language);
    }
    
    // Update UI elements
    setTimeout(() => {
      this.updatePersonalizedContent();
    }, 500);
  }

  // ============================================
  // FAQ & KNOWLEDGE BASE
  // ============================================

  getPopularQuestions() {
    const questions = {
      pl: [
        {
          question: "Jak długo trwa rozpatrzenie wniosku w systemie MOS?",
          answer: "Dzięki naszej współpracy z kancelariami prawnymi i systemami AI, średni czas to 30-45 dni. Oferujemy monitoring 24/7 i gwarancję terminów. Najszybszy rekord: 3 dni we Wrocławiu!",
          keywords: ["mos", "termin", "wniosek", "czas", "ile", "długo"]
        },
        {
          question: "Czy mogę złożyć wniosek MOS bez znajomości polskiego?",
          answer: "Tak! System MOS obsługuje 7 języków, a my zapewniamy pełne wsparcie w językach: PL, UA, EN, RU. Współpracujemy z tłumaczami przysięgłymi i oferujemy kreator wniosków w Twoim języku.",
          keywords: ["język", "tłumaczenie", "ukraiński", "angielski", "rosyjski", "bez polskiego"]
        },
        {
          question: "Co to jest blockchain w dokumentach migracyjnych?",
          answer: "To najnowsza technologia zabezpieczająca dokumenty przed podrabianiem. Każdy dokument ma unikalny 'odcisk palca' cyfrowy. NSA potwierdził pełną ważność prawną takich dokumentów w Polsce.",
          keywords: ["blockchain", "bezpieczeństwo", "podrabianie", "technologia", "cyfrowy"]
        },
        {
          question: "Czy test rynku pracy jest nadal wymagany w 2025?",
          answer: "Nie! Od czerwca 2025 zniesiono obowiązek testu rynku pracy dla większości zawodów. Obsługujemy nowy system Praca.gov.pl w pełni elektronicznie. Uwaga: kary za błędy to 3-50 tys. zł!",
          keywords: ["test", "rynek", "praca", "praca.gov.pl", "2025", "zniesiony"]
        },
        {
          question: "Ile kosztują wasze usługi?",
          answer: "Karta pobytu przez MOS: od 1.890 zł, Zezwolenia Praca.gov.pl: od 1.590 zł, Obywatelstwo Premium: od 4.790 zł. Pierwsza konsultacja zawsze bezpłatna! W cenę wliczone: AI monitoring, wsparcie prawne, gwarancja terminów.",
          keywords: ["cena", "koszt", "płatność", "konsultacja", "ile kosztuje"]
        },
        {
          question: "Jak działa AI monitoring spraw?",
          answer: "Nasze systemy AI monitorują status sprawy 24/7, analizują dokumenty pod kątem błędów i przewidują terminy z 95% dokładnością. Otrzymujesz powiadomienia push o każdej zmianie statusu oraz SMS-y na 48h przed terminami.",
          keywords: ["ai", "monitoring", "automatyzacja", "powiadomienia", "sztuczna inteligencja"]
        },
        {
          question: "Czy dokumenty elektroniczne są prawnie wiążące?",
          answer: "Tak! NSA w wyroku z marca 2025 potwierdził pełną ważność prawną dokumentów składanych przez MOS z podpisem elektronicznym. Organy nie mogą żądać duplikatów papierowych ani kwestionować elektronicznych załączników.",
          keywords: ["elektroniczne", "prawnie", "podpis", "ważność", "NSA", "wiążące"]
        },
        {
          question: "Jakie są najnowsze zmiany w prawie migracyjnym 2025?",
          answer: "Kluczowe zmiany: pełna elektronizacja MOS (sierpień 2025), zniesienie testu rynku pracy (czerwiec 2025), wprowadzenie biometrii w kartach pobytu, blockchain w dokumentach, kary 3-50k zł za błędy w Praca.gov.pl.",
          keywords: ["zmiany", "prawo", "2025", "nowości", "przepisy", "migracyjne"]
        }
      ],
      en: [
        {
          question: "How long does MOS application processing take?",
          answer: "Thanks to our cooperation with law firms and AI systems, average time is 30-45 days. We offer 24/7 monitoring and deadline guarantees. Our record: 3 days in Wrocław!",
          keywords: ["mos", "processing", "application", "time", "how long"]
        },
        {
          question: "Can I submit MOS application without knowing Polish?",
          answer: "Yes! MOS system supports 7 languages, and we provide full support in: PL, UA, EN, RU. We work with sworn translators and offer application creator in your language.",
          keywords: ["language", "translation", "english", "without polish"]
        },
        {
          question: "What is blockchain in migration documents?",
          answer: "It's the latest technology securing documents against counterfeiting. Each document has a unique digital 'fingerprint'. NSA confirmed full legal validity of such documents in Poland.",
          keywords: ["blockchain", "security", "counterfeiting", "technology", "digital"]
        }
      ],
      ua: [
        {
          question: "Скільки часу триває розгляд заяви в системі MOS?",
          answer: "Завдяки нашій співпраці з юридичними фірмами та AI системами, середній час складає 30-45 днів. Ми пропонуємо моніторинг 24/7 та гарантію термінів. Наш рекорд: 3 дні у Вроцлаві!",
          keywords: ["mos", "термін", "заява", "час", "скільки"]
        },
        {
          question: "Чи можу я подати заяву MOS без знання польської?",
          answer: "Так! Система MOS підтримує 7 мов, а ми забезпечуємо повну підтримку мовами: PL, UA, EN, RU. Співпрацюємо з присяжними перекладачами та пропонуємо креатор заяв вашою мовою.",
          keywords: ["мова", "переклад", "українська", "без польської"]
        }
      ],
      ru: [
        {
          question: "Сколько времени занимает рассмотрение заявления в системе MOS?",
          answer: "Благодаря нашему сотрудничеству с юридическими фирмами и AI системами, среднее время составляет 30-45 дней. Мы предлагаем мониторинг 24/7 и гарантию сроков. Наш рекорд: 3 дня во Вроцлаве!",
          keywords: ["mos", "срок", "заявление", "время", "сколько"]
        },
        {
          question: "Могу ли я подать заявление MOS без знания польского?",
          answer: "Да! Система MOS поддерживает 7 языков, а мы обеспечиваем полную поддержку на языках: PL, UA, EN, RU. Сотрудничаем с присяжными переводчиками и предлагаем конструктор заявлений на вашем языке.",
          keywords: ["язык", "перевод", "русский", "без польского"]
        }
      ]
    };
    
    return questions[this.currentLang] || questions.pl;
  }

  getAllQuestions() {
    return this.getPopularQuestions().concat([
      {
        question: "Jak wygląda proces biometryczny w nowych kartach pobytu?",
        answer: "Nowe karty pobytu zawierają chip biometryczny z odciskami palców i zdjęciem. Proces składa się z: skanowania odcisków w urzędzie, zdjęcia biometrycznego, weryfikacji tożsamości przez AI. Karta jest gotowa w 7 dni roboczych.",
        keywords: ["biometria", "chip", "odciski", "zdjęcie", "tożsamość"]
      },
      {
        question: "Jakie są kary za błędy w systemie Praca.gov.pl?",
        answer: "Kary za błędy w systemie Praca.gov.pl: 3.000-10.000 zł za drobne błędy, 10.000-30.000 zł za średnie naruszenia, 30.000-50.000 zł za poważne wykroczenia. Nasze AI sprawdza każdy dokument, chroniąc Cię przed karami.",
        keywords: ["kary", "błędy", "praca.gov.pl", "grzywny", "naruszenia"]
      },
      {
        question: "Czy mogę uzyskać obywatelstwo polskie przez inwestycję?",
        answer: "Nie ma oficjalnego programu obywatelstwa przez inwestycję w Polsce. Standardowa ścieżka: pobyt czasowy → pobyt stały (5 lat) → obywatelstwo. Jednak inwestycje mogą ułatwić uzyskanie zezwolenia na pobyt dla inwestorów.",
        keywords: ["obywatelstwo", "inwestycja", "program", "inwestor", "kapitał"]
      }
    ]);
  }

  // ============================================
  // TRANSLATIONS DATABASE
  // ============================================

  translations = {
    pl: {
      // Loading & Navigation
      loading_text: 'Ładowanie przyszłości legalizacji...',
      brand: 'MigrantGuidePoland',
      nav_about: 'O nas',
      nav_map: 'Mapa terminów',
      nav_faq: 'AI FAQ',
      nav_updates: 'Prawo 2025',
      nav_services: 'Usługi MOS',
      nav_contact: 'Kontakt 24/7',
      settings: 'Ustawienia',
      theme_label: 'Motyw',
      language_label: 'Język',
      login_nav: 'Panel klienta',
      dashboard_nav: 'Panel',
      
      // Personalization
      preferences_title: 'Personalizacja',
      auto_theme: 'Automatyczny motyw',
      auto_theme_desc: 'Dostosowuje motyw do pory dnia',
      preferred_service: 'Preferowana usługa',
      contact_method: 'Preferowany kontakt',
      notifications: 'Kategorie powiadomień',
      recommended_for_you: 'Polecane dla Ciebie',
      start_now: 'Rozpocznij teraz',
      
      // Hero
      update_banner: 'SYSTEM MOS AKTYWNY | REWOLUCJA 2025',
      hero_title: 'Przyszłość legalizacji pobytu już dziś',
      hero_subtitle: 'Jako pierwsi w Polsce opanowaliśmy system MOS z AI. Rekordowe terminy 30 dni, monitoring 24/7, obsługa w 4 językach. Współpracujemy z kancelariami prawnymi.',
      btn_smart_booking: 'Inteligentne umówienie',
      btn_ai_faq: 'AI FAQ',
      hint_ai: 'AI analizuje Twoją sytuację',
      hint_speed: '30 dni średnio',
      hint_support: '24/7 wsparcie',
      
      // Login & Dashboard
      login_tab: 'Logowanie',
      register_tab: 'Rejestracja',
      login_title: 'Zaloguj się do panelu',
      register_title: 'Utwórz konto',
      email_placeholder: 'Email',
      password_placeholder: 'Hasło',
      name_placeholder: 'Imię i nazwisko',
      phone_placeholder: 'Telefon',
      confirm_password_placeholder: 'Potwierdź hasło',
      remember_me: 'Zapamiętaj mnie',
      login_btn: 'Zaloguj się',
      register_btn: 'Utwórz konto',
      forgot_password: 'Zapomniałeś hasła?',
      accept_terms: 'Akceptuję regulamin i politykę prywatności',
      dashboard_title: 'Twoje sprawy',
      logout_btn: 'Wyloguj',
      active_cases: 'Aktywne sprawy',
      documents: 'Dokumenty',
      quick_actions: 'Szybkie akcje',
      new_residence: 'Nowa karta pobytu',
      new_work: 'Zezwolenie na pracę',
      schedule_meeting: 'Umów spotkanie',
      recommendations: 'Polecane dla Ciebie',
      
      // Push notifications
      push_title: '🔔 Otrzymuj powiadomienia!',
      push_desc: 'Najnowsze przepisy i terminy MOS w czasie rzeczywistym',
      push_success_title: '🎉 Powiadomienia aktywne!',
      push_success_desc: 'Będziesz otrzymywać najnowsze informacje o przepisach MOS.',
      
      // Chat
      chat_title: '💬 Czat z Ekspertem AI',
      chat_placeholder: 'Napisz wiadomość...',
      chat_welcome: '👋 Witaj! Jestem AI asystentem MigrantGuidePoland. Jak mogę Ci pomóc z legalizacją pobytu?',
      chat_agent_name: 'AI Asystent',
      chat_agent_status: 'Online 24/7',
      chat_invitation_title: 'Potrzebujesz pomocy?',
      chat_invitation_text: 'Mogę pomóc z procedurami MOS i Praca.gov.pl',
      chat_yes: 'Tak, pomóż mi',
      chat_no: 'Nie, dziękuję',
      chat_invitation_accepted: 'Dzięki! W czym mogę Ci pomóc?',
      
      // Statistics
      stat_days: 'dni minimum',
      stat_electronic: '% Elektronizacja',
      stat_languages: 'Języki',
      stat_experience: 'lat doświadczeń',
      
      // Map
      map_title: 'Interaktywna Mapa Terminów',
      map_subtitle: 'Sprawdź aktualne terminy rozpatrywania wniosków MOS w całej Polsce',
      map_fast: 'Szybkie (30-35 dni)',
      map_medium: 'Średnie (40-50 dni)',
      map_slow: 'Długie (60+ dni)',
      click_for_details: 'Kliknij dla szczegółów',
      filter_region: 'Filtruj po regionie',
      map_view: 'Widok',
      view_regions: 'Regiony',
      view_offices: 'Urzędy',
      processing_time: 'Czas rozpatrzenia',
      office: 'Urząd',
      address: 'Adres',
      phone: 'Telefon',
      book_consultation: 'Umów konsultację',
      
      // FAQ
      faq_title: 'AI-Powered FAQ',
      faq_subtitle: 'Zadaj dowolne pytanie o prawo migracyjne - AI przeszuka bazę orzeczeń, procedur i przepisów',
      faq_placeholder: 'Zadaj pytanie o MOS, Praca.gov.pl, obywatelstwo...',
      no_results: 'Nie znaleziono odpowiedzi',
      no_results_desc: 'Spróbuj zadać pytanie inaczej lub skontaktuj się z naszym ekspertem.',
      ask_expert: 'Zapytaj eksperta',
      search_in: 'Szukaj w',
      judgments: 'Orzeczenia',
      procedures: 'Procedury',
      regulations: 'Przepisy',
      curiosities: 'Ciekawostki',
      voice_not_supported: 'Wyszukiwanie głosowe nie jest obsługiwane w tej przeglądarce',
      voice_error: 'Błąd rozpoznawania mowy',
      
      // Law Updates
      updates_title: 'Rewolucja Prawna 2025',
      updates_subtitle: 'Najważniejsze zmiany w prawie migracyjnym',
      timeline_aug_title: 'System MOS - Pełna Elektronizacja',
      timeline_aug_desc: 'Moduł Obsługi Spraw (mos.cudzoziemcy.gov.pl) umożliwia składanie wniosków online z podpisem elektronicznym. Kreator w 7 językach, priorytetowa rejestracja.',
      timeline_jun_title: 'Portal Praca.gov.pl - Koniec z Testem',
      timeline_jun_desc: 'Zniesienie testu rynku pracy dla większości zawodów. Nowy portal elektroniczny, kary 3000-50000 zł za naruszenia.',
      timeline_now_title: 'Rekordowe Terminy',
      timeline_now_desc: 'Wrocław: 30 dni, Warszawa: 45 dni, Kraków: 40 dni. AI monitoring 24/7 zapewnia najszybsze powiadomienia.',
      badge_active: 'Aktywne',
      badge_languages: '7 języków',
      badge_fines: 'Kary 3-50k zł',
      badge_no_test: 'Bez testu',
      badge_current: 'AKTUALNIE',
      badge_ai_monitoring: 'AI Monitoring',
      badge_30_days: '30 dni',
      
      // About
      about_title: 'Liderzy Nowego Prawa 2025',
      about_intro: 'Jako pierwsi w Polsce opanowaliśmy system MOS i nowe przepisy 2025. Nasze systemy AI zapewniają najszybsze terminy w kraju. Współpracujemy z certyfikowanymi kancelariami prawnymi.',
      about_story: 'Przewidząliśmy rewolucję prawną z 2-letnim wyprzedzeniem. Dziś jesteśmy jedyną firmą oferującą kompletną obsługę elektroniczną z gwarancją jakości, świadcząc usługi doradcze w ramach współpracy z kancelariami prawnymi.',
      about_certified: 'Certyfikowani eksperci MOS',
      about_fastest: 'Najszybsze terminy w Polsce',
      about_legal_cooperation: 'Współpraca z kancelariami',
      about_legal_compliance: 'Pełna zgodność z przepisami',
      certified_tooltip: 'Jako jedyni posiadamy pełne certyfikaty do obsługi systemu MOS',
      fastest_tooltip: 'AI optymalizuje kolejność dokumentów dla maksymalnej szybkości',
      legal_tooltip: 'Reprezentacja prawna w najskomplikowanych sprawach',
      compliance_tooltip: '100% zgodność z najnowszymi przepisami 2025',
      
      // Features
      feat_ai_title: 'AI Automatyzacja',
      feat_ai_desc: 'Systemy AI do analizy dokumentów i predykcji terminów',
      feat_speed_title: '30 dni',
      feat_speed_desc: 'Rekordowe terminy dzięki MOS',
      feat_experts_title: 'Eksperci',
      feat_experts_desc: 'Certyfikowani specjaliści',
      feat_global_title: '4 Języki',
      feat_global_desc: 'PL, UA, EN, RU',
      ai_tooltip: 'Nasze AI analizuje 10,000 dokumentów dziennie, przewidując terminy z 95% dokładnością',
      speed_tooltip: 'Rekord: 3 dni na kartę pobytu we Wrocławiu dzięki AI optymalizacji',
      experts_tooltip: 'Zespół 15 ekspertów z doświadczeniem w prawie migracyjnym',
      global_tooltip: 'Obsługa w 4 językach + automatyczne tłumaczenie na 47 języków',
      
      // Services
      services_title: 'Usługi Przyszłości',
      services_subtitle: 'Pełna obsługa elektroniczna z AI w współpracy z kancelariami prawnymi',
      service_residence_title: 'Karta Pobytu przez MOS',
      service_residence_desc: 'Pierwsza w Polsce pełna obsługa przez system MOS z AI. Podpis elektroniczny, kreator w 7 językach, terminy od 30 dni.',
      service_residence_short: 'przez MOS - 30 dni',
      service_work_title: 'Zezwolenia Praca.gov.pl',
      service_work_desc: 'Obsługa nowego systemu Praca.gov.pl. Bez testu rynku, elektroniczne składanie, ochrona przed karami.',
      service_work_short: 'bez testu rynku',
      service_citizenship_title: 'Obywatelstwo Premium',
      service_citizenship_desc: 'Kompleksowa ścieżka do obywatelstwa z AI analizą uprawnień. Pełna dokumentacja, współpraca z kancelariami prawnymi.',
      service_citizenship_short: 'kompletna ścieżka',
      service_consultation: 'Bezpłatna konsultacja',
      btn_pay_now: 'Opłać teraz',
      add_to_order: 'Dodaj do zamówienia',
      
      // Cross-selling
      cross_work_desc: 'Uzupełnij kartę pobytu o zezwolenie na pracę',
      cross_citizenship_desc: 'Zaplanuj swoją drogę do polskiego obywatelstwa',
      cross_residence_desc: 'Zabezpiecz swój pobyt kartą pobytu',
      cross_residence_req: 'Wymagana do procesu obywatelstwa',
      
      // Contact
      contact_title: 'Kontakt 24/7',
      contact_subtitle: 'Najwyższa jakość obsługi eksperckiej',
      contact_phone_title: 'Telefon Ekspercki',
      contact_phone_hours: '7 dni w tygodniu',
      contact_email_title: 'Email Premium',
      contact_email_response: 'Odpowiedź w 2h',
      contact_whatsapp_title: 'WhatsApp AI',
      contact_whatsapp_link: 'Czat + Ekspert',
      contact_whatsapp_instant: 'AI 24/7 + Ekspert',
      contact_facebook_title: 'Facebook',
      contact_facebook_link: '@MigrantGuidePoland',
      contact_facebook_desc: 'Aktualności i porady',
      phone_tooltip: 'Bezpośredni kontakt z ekspertem. Średni czas oczekiwania: 30 sekund',
      email_tooltip: 'Priorytetowa obsługa mailowa z gwarancją odpowiedzi',
      whatsapp_tooltip: 'AI bot odpowiada natychmiast, ekspert włącza się w 5 minut',
      facebook_tooltip: 'Codzienne aktualizacje o zmianach w prawie migracyjnym',
      
      // Payment
      payment_title: 'Wybierz metodę płatności',
      payment_card: 'Karta płatnicza',
      payment_card_desc: 'Visa, Mastercard, PayPal',
      payment_p24_desc: 'Banki polskie, BLIK',
      payment_crypto: 'Kryptowaluty',
      payment_crypto_desc: 'Bitcoin, Ethereum, USDC',
      btn_secure_payment: 'Bezpieczna płatność',
      select_payment_method: 'Wybierz metodę płatności',
      payment_error: 'Wystąpił błąd podczas przetwarzania płatności. Spróbuj ponownie.',
      consultation_booked: '✅ Konsultacja umówiona!',
      contact_soon: 'Skontaktujemy się z Tobą w ciągu 2 godzin.',
      payment_success: '✅ Płatność zakończona!',
      service_paid: 'Usługa opłacona',
      redirect_p24: '🔄 Przekierowanie...',
      redirect_p24_desc: 'Zostaniesz przekierowany do Przelewy24',
      crypto_generating: '₿ Generowanie adresu...',
      crypto_generating_desc: 'Przygotowujemy adres do płatności kryptowalutami',
      crypto_info: 'Płatność kryptowalutami jest przetwarzana przez bezpieczny procesor płatności.',
      
      // Calendar Integration
      calendar_title: 'Dodaj do kalendarza',
      event_details: 'Szczegóły spotkania',
      event_title_label: 'Tytuł',
      event_date_label: 'Data',
      event_time_label: 'Godzina',
      event_type_label: 'Typ',
      consultation_title: 'Konsultacja MOS',
      online_meeting: 'Spotkanie online',
      
      // Document Signing
      signing_title: 'Podpisz dokument elektronicznie',
      signing_info: 'Po wypełnieniu formularza otrzymasz email z linkiem do bezpiecznego podpisania dokumentu.',
      
      // Notifications
      login_success: '✅ Zalogowano pomyślnie!',
      welcome_back: 'Witaj ponownie w panelu klienta!',
      register_success: '✅ Konto utworzone!',
      account_created: 'Twoje konto zostało pomyślnie utworzone.',
      logout_success: '👋 Wylogowano',
      see_you_soon: 'Do zobaczenia wkrótce!',
      password_mismatch: 'Hasła nie są identyczne',
      accept_terms_required: 'Musisz zaakceptować regulamin',
      
      // Chat responses
      chat_response1: 'Dziękuję za pytanie! Mogę pomóc Ci z procedurami MOS, Praca.gov.pl i obywatelstwem. O co chciałbyś zapytać?',
      chat_response2: 'Świetne pytanie! Nasze systemy AI mogą przyspieszyć Twoją sprawę do 30 dni. Chcesz umówić bezpłatną konsultację?',
      chat_response3: 'Specjalizujemy się w najnowszych przepisach 2025. Jaką usługę Cię interesuje: karta pobytu, zezwolenie na pracę czy obywatelstwo?',
      chat_mos_response: 'System MOS pozwala składać wnioski online z podpisem elektronicznym. Średni czas: 30-45 dni. Chcesz rozpocząć proces?',
      chat_praca_response: 'Od czerwca 2025 nie ma testu rynku pracy dla większości zawodów. Portal Praca.gov.pl obsługuje wszystko elektronicznie.',
      chat_citizenship_response: 'Proces obywatelstwa składa się z kilku etapów. Mogę przeanalizować Twoje uprawnienia za pomocą AI. Rozpoczniemy?',
      chat_terminy_response: 'Aktualne terminy: Wrocław 30 dni, Warszawa 45 dni, Kraków 40 dni. W którym mieście planujesz składać wniosek?'
    },
    
    ua: {
      // Essential Ukrainian translations
      loading_text: 'Завантаження майбутнього легалізації...',
      brand: 'MigrantGuidePoland',
      hero_title: 'Майбутнє легалізації перебування вже сьогодні',
      btn_smart_booking: 'Розумне бронювання',
      btn_pay_now: 'Сплатити зараз',
      chat_welcome: '👋 Привіт! Я AI асистент MigrantGuidePoland. Як я можу допомогти з легалізацією перебування?',
      settings: 'Налаштування',
      theme_label: 'Тема',
      language_label: 'Мова',
      login_nav: 'Панель клієнта',
      dashboard_nav: 'Панель',
      contact_title: 'Контакт 24/7',
      service_residence_title: 'Карта перебування через MOS',
      service_work_title: 'Дозвіл на роботу',
      service_citizenship_title: 'Громадянство Преміум',
      payment_title: 'Оберіть метод оплати',
      btn_secure_payment: 'Безпечна оплата'
    },
    
    en: {
      // Essential English translations
      loading_text: 'Loading the future of legalization...',
      brand: 'MigrantGuidePoland',
      hero_title: 'The future of residence legalization today',
      btn_smart_booking: 'Smart booking',
      btn_pay_now: 'Pay now',
      chat_welcome: '👋 Hello! I am MigrantGuidePoland AI assistant. How can I help you with residence legalization?',
      settings: 'Settings',
      theme_label: 'Theme',
      language_label: 'Language',
      login_nav: 'Client panel',
      dashboard_nav: 'Dashboard',
      contact_title: 'Contact 24/7',
      service_residence_title: 'Residence Card via MOS',
      service_work_title: 'Work Permit',
      service_citizenship_title: 'Premium Citizenship',
      payment_title: 'Choose payment method',
      btn_secure_payment: 'Secure payment'
    },
    
    ru: {
      // Essential Russian translations
      loading_text: 'Загрузка будущего легализации...',
      brand: 'MigrantGuidePoland',
      hero_title: 'Будущее легализации пребывания уже сегодня',
      btn_smart_booking: 'Умное бронирование',
      btn_pay_now: 'Оплатить сейчас',
      chat_welcome: '👋 Привет! Я AI помощник MigrantGuidePoland. Как я могу помочь с легализацией пребывания?',
      settings: 'Настройки',
      theme_label: 'Тема',
      language_label: 'Язык',
      login_nav: 'Панель клиента',
      dashboard_nav: 'Панель',
      contact_title: 'Контакт 24/7',
      service_residence_title: 'Карта пребывания через MOS',
      service_work_title: 'Разрешение на работу',
      service_citizenship_title: 'Премиум гражданство',
      payment_title: 'Выберите способ оплаты',
      btn_secure_payment: 'Безопасная оплата'
    }
  };
}

// ============================================
// GLOBAL FUNCTIONS & INITIALIZATION
// ============================================

// Global functions for HTML onclick handlers
window.openPaymentModal = (serviceType, city) => {
  app.openPaymentModal(serviceType, city);
};

window.closePaymentModal = () => {
  app.closePaymentModal();
};

window.processPayment = () => {
  app.processPayment();
};

window.searchFAQ = () => {
  app.searchFAQ();
};

window.closePushBanner = () => {
  app.closePushBanner();
};

window.openPreferences = () => {
  app.openPreferences();
};

window.openLoginModal = () => {
  app.openLoginModal();
};

window.closeLoginModal = () => {
  app.closeLoginModal();
};

window.openDashboard = () => {
  app.openDashboard();
};

window.closeDashboard = () => {
  app.closeDashboard();
};

window.logout = () => {
  app.logout();
};

window.acceptChatInvitation = () => {
  app.acceptChatInvitation();
};

window.dismissChatInvitation = () => {
  app.dismissChatInvitation();
};

window.openCalendarIntegration = () => {
  app.openCalendarIntegration();
};

window.closeCalendarModal = () => {
  app.closeCalendarModal();
};

window.addToGoogleCalendar = () => {
  app.addToGoogleCalendar();
};

window.addToOutlook = () => {
  app.addToOutlook();
};

window.downloadICS = () => {
  app.downloadICS();
};

window.requestDocumentSigning = () => {
  app.requestDocumentSigning();
};

window.closeSigningModal = () => {
  app.closeSigningModal();
};

window.signWithAdobeSign = () => {
  app.signWithAdobeSign();
};

window.signWithDocuSign = () => {
  app.signWithDocuSign();
};

window.signWithAsseco = () => {
  app.signWithAsseco();
};

window.closeOfficeDetails = () => {
  app.closeOfficeDetails();
};

window.smartBooking = () => {
  app.smartBooking();
};

window.setMapView = (view) => {
  app.setMapView(view);
};

window.startVoiceSearch = () => {
  app.startVoiceSearch();
};

window.searchFAQTerm = (term) => {
  app.searchFAQTerm(term);
};

window.askExpert = () => {
  app.askExpert();
};

// Initialize app
let app;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app = new MigrantApp();
  });
} else {
  app = new MigrantApp();
}

// Global error handler
window.addEventListener('error', (e) => {
  console.error('🚨 Application error:', e.error);
  if (app && app.showNotification) {
    app.showNotification(
      '⚠️ Błąd aplikacji',
      'Odśwież stronę jeśli problem się powtarza'
    );
  }
});

// Save preferences on unload
window.addEventListener('beforeunload', () => {
  if (app) app.saveUserPreferences();
});

// Handle online/offline status
window.addEventListener('online', () => {
  if (app && app.showNotification) {
    app.showNotification('🌐 Połączenie przywrócone', 'Wszystkie funkcje są ponownie dostępne');
  }
});

window.addEventListener('offline', () => {
  if (app && app.showNotification) {
    app.showNotification('📶 Brak połączenia', 'Niektóre funkcje mogą być ograniczone');
  }
});

console.log('🎉 MigrantGuidePoland App loaded successfully!');