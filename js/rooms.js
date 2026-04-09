let allRooms = [];
const roomsGrid = document.getElementById('roomsGrid');

// 1. جلب البيانات من ملف data.json
async function loadRooms() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        // جلب المصفوفة من داخل data.rooms بناءً على هيكل ملف الـ JSON الخاص بك
        allRooms = data.rooms;

        renderRooms(allRooms);
    } catch (error) {
        console.error("Error:", error);
        if (roomsGrid) {
            roomsGrid.innerHTML = `<h3 class="text-center mt-5">Error loading data. Please use Live Server.</h3>`;
        }
    }
}

// 2. عرض الغرف في الصفحة
function renderRooms(rooms) {
    if (!roomsGrid) return;
    roomsGrid.innerHTML = '';

    if (rooms.length === 0) {
        roomsGrid.innerHTML = '<h4 class="text-center mt-5 opacity-50">No rooms match your search.</h4>';
        return;
    }

    rooms.forEach(room => {
        const html = `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card room-card h-100 shadow-sm border-0">
                    <div class="overflow-hidden position-relative">
                        <img src="${room.image}" class="card-img-top room-img" 
                             onerror="this.src='https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500'">
                        
                        <span class="badge position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill ${room.available ? 'bg-success' : 'bg-danger'}">
                            ${room.available ? 'Available' : 'Full'}
                        </span>
                    </div>
                    <div class="card-body p-4 d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="fw-bold mb-0">${room.name}</h5>
                            <span class="badge bg-primary-subtle text-primary rounded-pill small">${room.type}</span>
                        </div>
                        <p class="text-muted small flex-grow-1">${room.description}</p>
                        <div class="d-flex justify-content-between align-items-center border-top pt-3 mt-auto">
                            <div>
                                <span class="fs-4 fw-bold text-primary">$${room.price}</span>
                                <small class="text-muted">/night</small>
                            </div>
                            <button onclick="bookRoom(${room.id})" class="btn btn-primary rounded-pill px-4" ${!room.available ? 'disabled' : ''}>
                                ${room.available ? 'Book Now' : 'Full'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
        roomsGrid.insertAdjacentHTML('beforeend', html);
    });
}

// 3. منطق الفلترة
function applyFilter() {
    const searchInput = document.getElementById('searchInput');
    const typeSelect = document.getElementById('typeSelect');
    const priceRange = document.getElementById('priceRange');
    const availCheck = document.getElementById('availCheck');

    if (!searchInput || !typeSelect || !priceRange) return;

    const q = searchInput.value.toLowerCase();
    const type = typeSelect.value;
    const price = priceRange.value;
    const onlyAvailable = availCheck ? availCheck.checked : false;

    const priceLabel = document.getElementById('priceLabel');
    if (priceLabel) priceLabel.textContent = `$${price}`;

    const filtered = allRooms.filter(r =>
        r.name.toLowerCase().includes(q) &&
        (type === 'all' || r.type === type) &&
        r.price <= price &&
        (onlyAvailable ? r.available : true)
    );

    renderRooms(filtered);
}

// 4. دالة الحجز
window.bookRoom = function (id) {
    const room = allRooms.find(r => r.id === id);
    if (room && room.available) {
        localStorage.setItem('selectedRoom', JSON.stringify(room));
        alert(`Room "${room.name}" selected! Redirecting to booking...`);
        // window.location.href = 'booking.html'; 
    }
};

// 5. ربط الأحداث (الأحداث المدمجة)
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // تطبيق الثيم المحفوظ عند التحميل
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-bs-theme', savedTheme);

    // منطق زر التبديل
    if (themeToggle) {
        // هذا الجزء من كودك سيعمل مع الـ CSS أعلاه تلقائياً
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            htmlElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // ربط الفلترة
    const elements = ['searchInput', 'typeSelect', 'priceRange', 'availCheck'];
    elements.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const eventType = (id === 'typeSelect' || id === 'availCheck') ? 'change' : 'input';
            el.addEventListener(eventType, applyFilter);
        }
    });

    // جلب البيانات
    loadRooms();
});


// 6. تأثير النافبار عند السكرول
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
        window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
    }
});