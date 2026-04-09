document.addEventListener('DOMContentLoaded', () => {
    // --- 1. تعريف العناصر الأساسية ---
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const nav = document.getElementById('mainNav');

    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const summaryBox = document.getElementById('summaryBox');
    const summaryContent = document.getElementById('summaryContent');
    const resetBtn = document.getElementById('resetBtn');

    // --- 2. منطق الثيم (الدارك مود) ---
    // تحميل الثيم المحفوظ أو استخدام الفاتح كافتراضي
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-bs-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            htmlElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- 3. منطق النافبار عند السكرول ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 4. منطق تواريخ الحجز ---
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;

    checkInInput.addEventListener('change', () => {
        // تحديث أقل تاريخ مسموح للخروج ليكون نفس تاريخ الدخول
        checkOutInput.min = checkInInput.value;

        // إذا كان تاريخ الخروج المختار قديماً بالنسبة للدخول الجديد، يتم مسحه
        if (checkOutInput.value && checkOutInput.value < checkInInput.value) {
            checkOutInput.value = '';
        }
    });

    // --- 5. معالجة إرسال النموذج وحساب السعر ---
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // التحقق من صحة الحقول (Bootstrap Validation)
            if (!bookingForm.checkValidity()) {
                e.stopPropagation();
                bookingForm.classList.add('was-validated');
                return;
            }

            // جلب السعر من localStorage (أو 150 كافتراضي)
            const pricePerNight = parseInt(localStorage.getItem('selectedRoomPrice')) || 150;

            const start = new Date(checkInInput.value);
            const end = new Date(checkOutInput.value);

            // حساب الفرق بالأيام (الليالي)
            const diffTime = end - start;
            const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            const totalPrice = nights * pricePerNight;

            // عرض الملخص وتعبئة البيانات
            summaryContent.innerHTML = `
                <div class="col-sm-6 mb-3">
                    <p class="mb-1"><strong><i class="fa-solid fa-user me-2"></i>Guest:</strong> ${document.getElementById('guestName').value}</p>
                    <p class="mb-1"><strong><i class="fa-solid fa-envelope me-2"></i>Email:</strong> ${document.getElementById('email').value}</p>
                    <p class="mb-1"><strong><i class="fa-solid fa-phone me-2"></i>Phone:</strong> ${document.getElementById('phone').value}</p>
                </div>
                <div class="col-sm-6 mb-3">
                    <p class="mb-1"><strong><i class="fa-solid fa-moon me-2"></i>Nights:</strong> ${nights}</p>
                    <p class="mb-1"><strong><i class="fa-solid fa-users me-2"></i>Guests:</strong> ${document.getElementById('guests').value}</p>
                    <p class="mb-1"><strong><i class="fa-solid fa-money-bill-wave me-2"></i>Total:</strong> <span class="text-primary fw-bold">$${totalPrice}</span></p>
                </div>
                ${document.getElementById('requests').value ? `
                <div class="col-12 border-top pt-2">
                    <p><strong><i class="fa-solid fa-comment-dots me-2"></i>Requests:</strong> ${document.getElementById('requests').value}</p>
                </div>` : ''}
            `;

            summaryBox.classList.remove('d-none');
            summaryBox.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- 6. زر إعادة التعيين (Reset) ---
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            bookingForm.reset();
            bookingForm.classList.remove('was-validated');
            summaryBox.classList.add('d-none');
            checkOutInput.min = ""; // إعادة تصفير قيود التاريخ
        });
    }
});