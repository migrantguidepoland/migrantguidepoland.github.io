document.addEventListener("DOMContentLoaded", () => {
    console.log("MigrantGuide v3.0 Init");

    // --- MAP LOGIC ---
    const pins = document.querySelectorAll('.map-pin');
    const tooltip = document.getElementById('tooltip');
    const ttCity = document.getElementById('ttCity');
    const ttDays = document.getElementById('ttDays');
    const ttTrend = document.getElementById('ttTrend');

    pins.forEach(pin => {
        pin.addEventListener('mouseenter', (e) => {
            const city = pin.dataset.city;
            const days = pin.dataset.days;
            const trend = pin.dataset.trend;

            ttCity.innerText = city;
            ttDays.innerText = `${days} dni`;
            ttTrend.innerText = trend === 'spadek' ? '▼ Spada (Dobrze)' : (trend === 'wzrost' ? '▲ Rośnie (Źle)' : '▶ Stabilnie');
            ttTrend.className = trend === 'spadek' ? 'text-success fw-bold' : (trend === 'wzrost' ? 'text-danger fw-bold' : 'text-warning fw-bold');

            // Positioning
            const tWidth = 160; // tooltip width
            let left = parseFloat(pin.style.left);
            let top = parseFloat(pin.style.top);

            // Prevent overflow right
            if (left > 60) tooltip.style.left = `calc(${left}% - ${tWidth + 15}px)`;
            else tooltip.style.left = `calc(${left}% + 25px)`;
            
            tooltip.style.top = `calc(${top}% - 30px)`;
            tooltip.classList.add('active');
        });

        pin.addEventListener('mouseleave', () => tooltip.classList.remove('active'));
        // Mobile tap
        pin.addEventListener('click', (e) => pin.dispatchEvent(new Event('mouseenter')));
    });

    // --- CHATBOT ---
    const chatWin = document.getElementById('chatWindow');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const badge = document.querySelector('.notification-badge');

    window.toggleChat = () => {
        chatWin.classList.toggle('open');
        if (chatWin.classList.contains('open')) {
            badge.style.display = 'none';
            setTimeout(() => chatInput.focus(), 300);
        }
    };

    window.openChat = () => {
        if (!chatWin.classList.contains('open')) window.toggleChat();
    };

    window.handleSend = () => {
        const val = chatInput.value.trim();
        if (val) sendMsg(val);
    };
    
    window.sendMsg = (txt) => {
        // User msg
        addMsg(txt, 'user');
        chatInput.value = '';
        
        // Fake typing
        const typing = document.createElement('div');
        typing.className = 'message bot typing';
        typing.innerText = '...';
        chatBody.appendChild(typing);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Bot reply
        setTimeout(() => {
            typing.remove();
            const reply = getBotReply(txt);
            addMsg(reply, 'bot');
        }, 1000);
    };

    function addMsg(txt, type) {
        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.innerText = txt;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function getBotReply(input) {
        const lower = input.toLowerCase();
        if (lower.includes('czas') || lower.includes('ile')) return "Średni czas to 45 dni. Najszybciej: Gdańsk.";
        if (lower.includes('cena') || lower.includes('cennik')) return "Konsultacja jest darmowa. Pełna obsługa od 1500 PLN.";
        if (lower.includes('kontakt')) return "Zadzwoń: +48 700 800 900 lub zostaw numer.";
        return "Czy chcesz porozmawiać z prawnikiem? Kliknij 'Kontakt'.";
    }

    // Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') window.handleSend();
    });

    // --- COUNTERS ---
    const counters = document.querySelectorAll('.count-up');
    counters.forEach(c => {
        c.innerText = c.dataset.target; // Simplified for stability
    });
});