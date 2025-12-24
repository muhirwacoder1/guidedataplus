document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Observe guide content items
    const guideItems = document.querySelectorAll('.guide-content > div');
    guideItems.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Dashboard Logic
window.showStudentGuide = function () {
    const studentContent = document.getElementById('student-content');
    studentContent.classList.remove('hidden');
    studentContent.scrollIntoView({ behavior: 'smooth' });
};

window.showPasswordModal = function () {
    document.getElementById('modal-overlay').classList.add('active');
    document.getElementById('access-code').focus();
};

window.closeModal = function () {
    document.getElementById('modal-overlay').classList.remove('active');
    document.getElementById('access-code').value = '';
    document.getElementById('error-msg').style.display = 'none';
};

window.checkPassword = function () {
    const input = document.getElementById('access-code').value;
    const errorMsg = document.getElementById('error-msg');

    if (input === '2026') {
        window.location.href = 'teacher_guide.html';
    } else {
        errorMsg.style.display = 'block';
        document.getElementById('access-code').value = '';
        document.getElementById('access-code').focus();
    }
};

// Close modal on outside click
document.getElementById('modal-overlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Allow Enter key to submit password
document.getElementById('access-code').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});
