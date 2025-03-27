// Datos de las habitaciones del Hotel Blumen
const rooms = [
    {
        id: 1,
        name: "Garden View Suite",
        price: 85000,
        image: "https://source.unsplash.com/random/400x300/?hotel,room,luxury",
        bedrooms: 1,
        capacity: 2,
    },
    {
        id: 2,
        name: "Partial View Suite",
        price: 95000,
        image: "https://source.unsplash.com/random/400x300/?hotel,room,deluxe",
        bedrooms: 1,
        capacity: 2,
    },
    {
        id: 3,
        name: "Superior Sea View Suite",
        price: 110000,
        image: "https://source.unsplash.com/random/400x300/?hotel,room,family",
        bedrooms: 2,
        capacity: 4,
    },
    {
        id: 4,
        name: "Two Bedroom Suite",
        price: 155000,
        image: "https://source.unsplash.com/random/400x300/?hotel,room,standard",
        bedrooms: 1,
        capacity: 2,
    },
    {
        id: 5,
        name: "Superior Sea View Suite",
        price: 110000,
        image: "https://source.unsplash.com/random/400x300/?hotel,room,presidential",
        bedrooms: 2,
        capacity: 2,
    },
    {
        id: 6,
        name: "Suite + living",
        price: 110000,
        image: "https://source.unsplash.com/random/400x300/?hotel,room,double",
        bedrooms: 1,
        capacity: 2,
    },
    {
        id: 7,
        name: "Suite",
        price: 110000,
        image: "https://source.unsplash.com/random/400x300/?hotel,room,junior",
        bedrooms: 1,
        capacity: 2,
    },
    {
        id: 8,
        name: "Habitación",
        price: 155000,
        image: "https://source.unsplash.com/random/400x300/?hotel,room,premium",
        bedrooms: 1,
        capacity: 2,
    },
    {
        id: 9,
        name: "Suite",
        price:155000,
        image: "https://source.unsplash.com/random/400x300/?hotel,room,panoramic",
        bedrooms: 1,
        capacity: 2,
    },
    {
        id: 10,
        name: "Habitación",
        price: 85000,
        image: "https://source.unsplash.com/random/400x300/?hotel,room,economic",
        bedrooms: 1,
        capacity: 1,
    },
    {
        id: 11,
        name: "Suite",
        price: 85000,
        image: "https://source.unsplash.com/random/400x300/?hotel,room,honeymoon",
        bedrooms: 1,
        capacity: 2,
    },
    {
        id: 12,
        name: "Habitación",
        price: 95000,
        image: "https://source.unsplash.com/random/400x300/?hotel,room,business",
        bedrooms: 1,
        capacity: 1,
    },
];

// Inicializar el carrusel y configurar eventos
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('roomsCarousel');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let startIndex = 0;
    let visibleItems = 1;
    
    // Determinar cuántos elementos mostrar según el ancho de la pantalla
    function updateVisibleItems() {
        if (window.innerWidth >= 992) {
            visibleItems = 4;
        } else if (window.innerWidth >= 768) {
            visibleItems = 2;
        } else {
            visibleItems = 1;
        }
        renderCarousel();
    }
    
    // Renderizar el carrusel
    // Inside the renderCarousel function, update the price display format
    function renderCarousel() {
        // Limpiar el carrusel
        carousel.innerHTML = '';
        
        // Crear todas las habitaciones para el carrusel
        rooms.forEach(room => {
            const roomCard = document.createElement('div');
            roomCard.className = 'room-card';
            
            roomCard.innerHTML = `
                <div class="room-image" style="background-image: url('${room.image}')">
                    <button class="favorite-button">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="room-details">
                    <h4 class="room-name">${room.name}</h4>
                    <div class="room-features">
                        <div class="room-feature">
                            <i class="fas fa-bed"></i>
                            <span>${room.bedrooms} ${room.bedrooms > 1 ? 'habitaciones' : 'habitación'}</span>
                        </div>
                        <div class="room-feature">
                            <i class="fas fa-users"></i>
                            <span>${room.capacity} ${room.capacity > 1 ? 'personas' : 'persona'}</span>
                        </div>
                    </div>
                    <div class="room-price-row">
                        <div class="room-price">
                            ${room.price.toLocaleString('es-CL')} CLP<span> / noche</span>
                        </div>
                        <button class="book-button">Reservar</button>
                    </div>
                </div>
            `;
            
            carousel.appendChild(roomCard);
        });
        
        // Actualizar la posición del carrusel
        updateCarouselPosition();
        
        // Actualizar los botones de navegación
        prevBtn.disabled = startIndex === 0;
        nextBtn.disabled = startIndex >= rooms.length - visibleItems;
        
        // Actualizar los puntos indicadores
        updateDots();
    }
    
    // Actualizar la posición del carrusel con transición suave
    function updateCarouselPosition() {
        const cardWidth = carousel.querySelector('.room-card').offsetWidth;
        const gap = 24; // El mismo valor que en CSS
        carousel.style.transform = `translateX(-${startIndex * (cardWidth + gap)}px)`;
    }
    
    // Actualizar los puntos indicadores
    function updateDots() {
        dotsContainer.innerHTML = '';
        
        const totalGroups = Math.ceil(rooms.length / visibleItems);
        
        for (let i = 0; i < totalGroups; i++) {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${i === Math.floor(startIndex / visibleItems) ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                startIndex = i * visibleItems;
                updateCarouselPosition();
                updateDots();
                
                // Actualizar los botones de navegación
                prevBtn.disabled = startIndex === 0;
                nextBtn.disabled = startIndex >= rooms.length - visibleItems;
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // Eventos de los botones de navegación
    prevBtn.addEventListener('click', () => {
        if (startIndex > 0) {
            startIndex--;
            updateCarouselPosition();
            updateDots();
            
            // Actualizar los botones de navegación
            prevBtn.disabled = startIndex === 0;
            nextBtn.disabled = false;
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (startIndex < rooms.length - visibleItems) {
            startIndex++;
            updateCarouselPosition();
            updateDots();
            
            // Actualizar los botones de navegación
            prevBtn.disabled = false;
            nextBtn.disabled = startIndex >= rooms.length - visibleItems;
        }
    });
    
    // Inicializar el carrusel
    updateVisibleItems();
    
    // Actualizar el carrusel cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        const oldVisibleItems = visibleItems;
        
        if (window.innerWidth >= 992) {
            visibleItems = 4;
        } else if (window.innerWidth >= 768) {
            visibleItems = 2;
        } else {
            visibleItems = 1;
        }
        
        // Solo volver a renderizar si cambió el número de elementos visibles
        if (oldVisibleItems !== visibleItems) {
            // Ajustar el índice de inicio para mantener la posición relativa
            startIndex = Math.floor(startIndex / oldVisibleItems) * visibleItems;
            renderCarousel();
        }
    });
    
    // Función de desplazamiento suave personalizada
    function smoothScrollTo(element, duration = 1000) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Función de aceleración
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Configurar el botón "Explore más" para desplazamiento suave
    const exploreMoreBtn = document.querySelector('.explore-more');
    if (exploreMoreBtn) {
        exploreMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón Explore más clickeado');
            
            const targetId = this.getAttribute('href');
            console.log('Destino:', targetId);
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                console.log('Elemento encontrado, desplazando...');
                
                // Intentar múltiples métodos de desplazamiento suave
                
                // Método 1: Función personalizada de desplazamiento suave
                smoothScrollTo(targetElement);
                
                // Método 2: Alternativa con setTimeout (por si hay problemas de timing)
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }, 100);
                
                // Método 3: scrollIntoView como respaldo
                setTimeout(() => {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 200);
                
            } else {
                console.error('Elemento destino no encontrado:', targetId);
            }
        });
        console.log('Evento de clic configurado para el botón Explore más');
    } else {
        console.error('Botón Explore más no encontrado en el DOM');
    }
    
    // Inicializar fechas para el formulario
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    // Inicializar los datepickers para check-in y check-out
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    // Establecer valores iniciales
    checkinInput.value = formatDate(today);
    checkoutInput.value = formatDate(tomorrow);
    
    // Import SimpleDatepicker (assuming it's available globally or from a CDN)
    let SimpleDatepicker;

    // When the script of datepicker is loaded, initialize the calendars
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof SimpleDatepicker === 'undefined') {
            console.error('SimpleDatepicker is not defined. Ensure the library is properly included.');
            return;
        }

        // Inicializar datepicker para check-in
        const checkinPicker = new SimpleDatepicker(checkinInput, {
            defaultDate: today,
            minDate: today,
            onSelect: function(date) {
                // Actualizar la fecha mínima del checkout para que sea al menos la fecha de check-in
                const nextDay = new Date(date);
                nextDay.setDate(nextDay.getDate() + 1);
                checkoutPicker.options.minDate = nextDay;

                // Si la fecha de checkout es anterior a la nueva fecha mínima, actualizarla
                if (checkoutPicker.selectedDate < nextDay) {
                    checkoutPicker.selectDate(nextDay);
                }
            }
        });

        // Inicializar datepicker para check-out
        const checkoutPicker = new SimpleDatepicker(checkoutInput, {
            defaultDate: tomorrow,
            minDate: tomorrow
        });
    });
});


// Function to handle the search form submission
function handleSearch() {
    // Get the dates from flatpickr
    const checkinDate = document.getElementById('checkin')._flatpickr.selectedDates[0];
    const checkoutDate = document.getElementById('checkout')._flatpickr.selectedDates[0];
    
    // Get guest counts from our guest counter
    const adults = parseInt(document.getElementById('adultsCount').textContent) || 2;
    const children = parseInt(document.getElementById('childrenCount').textContent) || 0;
    const babies = parseInt(document.getElementById('babiesCount').textContent) || 0;
    
    // Format dates for URL (YYYY-MM-DD)
    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const checkinFormatted = formatDate(checkinDate);
    const checkoutFormatted = formatDate(checkoutDate);
    
    // Build the booking URL
    let bookingUrl = 'https://direct-book.com/properties/blumenhotelspadirect?locale=es';
    
    // Add guest information
    bookingUrl += `&items[0][adults]=${adults}`;
    bookingUrl += `&items[0][children]=${children}`;
    bookingUrl += `&items[0][infants]=${babies}`;
    
    // Add currency
    bookingUrl += '&currency=USD';
    
    // Add dates if selected
    if (checkinFormatted) {
        bookingUrl += `&checkInDate=${checkinFormatted}`;
    }
    
    if (checkoutFormatted) {
        bookingUrl += `&checkOutDate=${checkoutFormatted}`;
    }
    
    // Add tracking parameter
    bookingUrl += '&trackPage=yes';
    
    // Open the booking URL in a new tab
    window.open(bookingUrl, '_blank');
}

// Initialize the search button when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }
});