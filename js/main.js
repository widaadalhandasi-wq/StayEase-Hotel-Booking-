// --- Navbar ---
// Listen for scroll events to update navbar styling
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    
    // Add 'scrolled' class if vertical scroll is greater than 20 pixels
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Home Page ---
async function renderFeaturedRooms() {
    const grid = document.getElementById('rooms-grid');
    if(!grid) return;

    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        
        // Fetch the first 3 rooms to display as featured items
        const featured = data.rooms.slice(0, 3);
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
        console.error("Error fetching rooms:", error);
    }
}

// 2. Booking handler function
function handleBooking(roomId) {
    // Fetch data to find the specific room details
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            const selectedRoom = data.rooms.find(r => r.id === roomId);
            if (selectedRoom) {
                // Save selected room details to localStorage
                localStorage.setItem('selectedRoom', JSON.stringify(selectedRoom));
                // Redirect to the booking page
                window.location.href = 'booking.html';
            }
        })
        .catch(err => console.error("Error in booking:", err));
}

// Initialize featured rooms rendering on page load
document.addEventListener('DOMContentLoaded', renderFeaturedRooms);


// --- Dark Mode ---
function toggleTheme() {
    const body = document.body;
    
    // 1. Toggle 'dark' class on the body
    body.classList.toggle('dark');
    
    // 2. Update Bootstrap 5 color theme attribute (professional approach)
    if (body.classList.contains('dark')) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // Save preference
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light'); // Save preference
    }
}

// 3. Persistent Theme: Check for saved preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
});

// Automatically close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('navbarNav'); // Ensure this matches your menu ID
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});

navLinks.forEach((l) => {
    l.addEventListener('click', () => { 
        if (window.innerWidth < 992) { // Only trigger on mobile view
            bsCollapse.hide(); 
        }
    });
});

// --- Contact Page ---
/* Function to show success alert */
function showSuccessMessage() {
    // 1. Find the form and the alert using their IDs
    const form = document.querySelector('#contactModal form');
    const alert = document.getElementById('successAlert');

    // 2. Hide the input form
    if (form) {
        form.classList.add('d-none');
    }

    // 3. Display the success message by removing 'd-none'
    if (alert) {
        alert.classList.remove('d-none');
    }
}