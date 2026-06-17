/**
 * Valure Premium WhatsApp Lead Generation Redirection Helper
 * Prefills structured enquiry or booking text and routes to WhatsApp Web (Desktop) or App (Mobile)
 */
function redirectToWhatsApp(name, phone, email, product, message, type) {
    const targetPhone = "917454853045";
    const header = type === 'consultation' ? 'New Luxury Consultation Request' : 'New Luxury Quote Request';
    
    const textMsg = `${header}

Name: ${name}

Phone: ${phone}

Email: ${email}

Product Interest: ${product}

Message:
${message}

Submitted From:
https://value-001.vercel.app/`;

    const encodedText = encodeURIComponent(textMsg);
    
    // User-agent detection for desktop vs mobile routing
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const baseUrl = isMobile ? 'https://api.whatsapp.com/send' : 'https://web.whatsapp.com/send';
    const whatsappUrl = `${baseUrl}?phone=${targetPhone}&text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
}

// Global WhatsApp Float Widget Injection and Micro-interaction on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Re-standardize or inject floating widget
    let floatBtn = document.querySelector('.whatsapp-float');
    
    if (!floatBtn) {
        floatBtn = document.createElement('a');
        floatBtn.className = 'whatsapp-float';
        floatBtn.target = '_blank';
        floatBtn.rel = 'noopener';
        floatBtn.setAttribute('aria-label', 'Chat on WhatsApp');
        document.body.appendChild(floatBtn);
    }
    
    // Ensure the href is set
    floatBtn.href = "https://wa.me/917454853045?text=Hi%2C%20I%27m%20interested%20in%20your%20marble%20products";
    
    // Fill inner HTML to ensure standard typing-dots and tooltip format is present
    floatBtn.innerHTML = `
        <i class="fab fa-whatsapp"></i>
        <div class="whatsapp-tooltip">
            <span>Online</span>
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    // Programmatically activate tooltip micro-animation after a short delay
    setTimeout(() => {
        floatBtn.classList.add('active');
        setTimeout(() => {
            floatBtn.classList.remove('active');
        }, 7000);
    }, 3000);
});

