// navbar
// ننتظر تحميل الصفحة أولاً
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    
    // إذا كان السكرول أكبر من 50 بكسل، أضف الكلاس
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// home page 
async function renderFeaturedRooms() {
    const grid = document.getElementById('rooms-grid');
    if(!grid) return;

    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        
        // جلب أول 6 غرف لعرضها كاملة
        const featured = data.rooms.slice(0, 6);
        let htmlContent = '';

        featured.forEach(room => {
            htmlContent += `
                <article class="col">
                    <div class="card h-100 shadow-sm border-0 room-card transition-theme">
                        <div class="position-relative overflow-hidden">
                            <img src="${room.image}" 
                                 class="card-img-top room-img" 
                                 alt="${room.name}" 
                                 style="height: 250px; object-fit: cover;"
                                 onerror="this.src='https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500'">
                            
                            <span class="badge position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill ${room.available ? 'bg-success' : 'bg-danger'}">
                                ${room.available ? 'Available' : 'Full'}
                            </span>
                        </div>
                        <div class="card-body d-flex flex-column p-4">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h3 class="h5 card-title fw-bold mb-0">${room.name}</h3>
                                <span class="text-warning small"><i class="bi bi-star-fill"></i> ${room.rating}</span>
                            </div>
                            <p class="card-text text-muted small flex-grow-1">${room.description}</p>
                            
                            <div class="d-flex justify-content-between align-items-center mt-3 border-top pt-3">
                                <div>
                                    <span class="fs-5 fw-bold text-primary">$${room.price}</span>
                                    <small class="text-muted">/night</small>
                                </div>
                                <button class="btn ${room.available ? 'btn-primary' : 'btn-secondary'} btn-sm rounded-pill px-4" 
                                        onclick="handleBooking(${room.id})" 
                                        ${!room.available ? 'disabled' : ''}>
                                    ${room.available ? 'Book Now' : 'Sold Out'}
                                </button>
                            </div>
                        </div>
                    </div>
                </article>`;
        });

        grid.innerHTML = htmlContent;

    } catch (error) {
        console.error("Error:", error);
    }
}

// 2. دالة التعامل مع الحجز
function handleBooking(roomId) {
    // نستخدم نفس المسار المباشر هنا أيضاً
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            const selectedRoom = data.rooms.find(r => r.id === roomId);
            if (selectedRoom) {
                localStorage.setItem('selectedRoom', JSON.stringify(selectedRoom));
                // التوجيه لصفحة الحجز (تأكد أن اسمها مطابق تماماً)
                window.location.href = 'booking.html';
            }
        })
        .catch(err => console.error("Error in booking:", err));
}

// تشغيل الدالة
document.addEventListener('DOMContentLoaded', renderFeaturedRooms);



// dark mood
function toggleTheme() {
    const body = document.body;
    
    // 1. تبديل الكلاس على الـ body
    body.classList.toggle('dark');
    
    // 2. تحديث سمة Bootstrap 5 (اختياري لكنه احترافي)
    if (body.classList.contains('dark')) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // حفظ الخيار
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light'); // حفظ الخيار
    }
}

// 3. كود "الذاكرة": عند فتح الصفحة، تأكد من الثيم المحفوظ
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
});