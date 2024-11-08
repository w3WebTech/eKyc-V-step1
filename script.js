// Navigation Functions
function showOtpStep() {
    document.getElementById('phoneStep').classList.remove('active');
    document.getElementById('otpStep').classList.add('active', 'fade-in');
    startTimer(58, document.querySelector('#timer'));
}

function showEmailStep() {
    document.getElementById('otpStep').classList.remove('active');
    document.getElementById('emailStep').classList.add('active', 'fade-in');
}

// OTP Input Navigation
function moveToNext(input) {
    if (input.value.length === input.maxLength) {
        const next = input.nextElementSibling;
        if (next) {
            next.focus();
        }
    }
}

// Timer Functionality
function startTimer(duration, display) {
    let timer = duration;
    const interval = setInterval(function () {
        const seconds = parseInt(timer % 60, 10);
        display.textContent = `00:${seconds < 10 ? '0' : ''}${seconds}s`;

        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "00:00s";
            enableResendButton();
        }
    }, 1000);
}

// Enable Resend Button
function enableResendButton() {
    const resendButton = document.querySelector('.text-blue-600');
    resendButton.classList.remove('opacity-50');
    resendButton.disabled = false;
}

// Phone Number Formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    input.value = value;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Add phone number formatting
    const phoneInput = document.querySelector('input[type="tel"]');
    phoneInput.addEventListener('input', function() {
        formatPhoneNumber(this);
    });

    // Add input validation
    const emailInput = document.querySelector('input[type="email"]');
    emailInput.addEventListener('input', function() {
        const isValid = this.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        const verifyButton = this.nextElementSibling;
        verifyButton.disabled = !isValid;
        verifyButton.classList.toggle('opacity-50', !isValid);
    });
});
