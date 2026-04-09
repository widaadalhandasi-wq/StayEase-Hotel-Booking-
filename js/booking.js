document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Define Core Elements ---
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const nav = document.getElementById('mainNav');

    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const summaryBox = document.getElementById('summaryBox');
    const summaryContent = document.getElementById('summaryContent');
    const resetBtn = document.getElementById('resetBtn');

    // --- 2. Theme Logic (Dark Mode) ---
    // Load saved theme from localStorage or use 'light' as default
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

    // --- 3. Navbar Scroll Logic ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 4. Booking Dates Logic ---
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today; // Prevent selecting past dates for check-in

    checkInInput.addEventListener('change', () => {
        // Update minimum check-out date to match check-in date
        checkOutInput.min = checkInInput.value;

        // Clear check-out value if it becomes invalid relative to the new check-in date
        if (checkOutInput.value && checkOutInput.value < checkInInput.value) {
            checkOutInput.value = '';
        }
    });

    // --- 5. Form Submission Handling and Price Calculation ---
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Form Validation (Bootstrap Validation)
            if (!bookingForm.checkValidity()) {
                e.stopPropagation();
                bookingForm.classList.add('was-validated');
                return;
            }

            // Retrieve room price from localStorage (Default to 150 if not found)
            const pricePerNight = parseInt(localStorage.getItem('selectedRoomPrice')) || 150;

            const start = new Date(checkInInput.value);
            const end = new Date(checkOutInput.value);

            // Calculate the difference in days (nights)
            const diffTime = end - start;
            const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            const totalPrice = nights * pricePerNight;

            // Display Summary and populate data
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

    // --- 6. Reset Button Logic ---
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            bookingForm.reset();
            bookingForm.classList.remove('was-validated');
            summaryBox.classList.add('d-none');
            checkOutInput.min = ""; // Reset date constraints
        });
    }
});