// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Loading Animation
    const loader = document.getElementById('loader');
    const statusText = document.getElementById('statusText');
    
    // Simulate loading process
    setTimeout(() => {
        statusText.textContent = 'Loading resources...';
    }, 1000);
    
    setTimeout(() => {
        statusText.textContent = 'Almost ready...';
    }, 2000);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 3000);

    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchTags = document.querySelectorAll('.search-tag');
    
    // Service data for search
    const services = [
        {
            title: 'Bridal Car Services',
            description: 'Luxury vehicles for your special day',
            icon: 'fa-car',
            tag: 'bridal'
        },
        {
            title: 'Towing Services 24/7',
            description: 'Emergency towing assistance',
            icon: 'fa-truck-pickup',
            tag: 'towing'
        },
        {
            title: 'Trucking Services',
            description: 'Professional cargo transportation',
            icon: 'fa-truck',
            tag: 'trucking'
        },
        {
            title: 'Heavy Equipment Rental',
            description: 'Construction and industrial equipment',
            icon: 'fa-tractor',
            tag: 'equipment'
        }
    ];

    // Search input handler
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        searchClear.style.display = query ? 'block' : 'none';
        
        if (query.length > 0) {
            const filteredServices = services.filter(service => 
                service.title.toLowerCase().includes(query) || 
                service.description.toLowerCase().includes(query)
            );
            
            displaySearchSuggestions(filteredServices);
            searchSuggestions.classList.add('active');
        } else {
            searchSuggestions.classList.remove('active');
        }
    });

    // Clear search
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        searchSuggestions.classList.remove('active');
    });

    // Search tags click handler
    searchTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const tagValue = tag.dataset.search;
            searchInput.value = tag.textContent;
            const filteredServices = services.filter(service => 
                service.tag === tagValue
            );
            displaySearchSuggestions(filteredServices);
            searchSuggestions.classList.add('active');
            searchClear.style.display = 'block';
            
            // Highlight corresponding service card
            highlightServiceCard(tagValue);
        });
    });

    // Display search suggestions
    function displaySearchSuggestions(filteredServices) {
        searchSuggestions.innerHTML = filteredServices.map(service => `
            <div class="suggestion-item" data-tag="${service.tag}">
                <div class="suggestion-icon">
                    <i class="fas ${service.icon}"></i>
                </div>
                <div class="suggestion-content">
                    <div class="suggestion-title">${service.title}</div>
                    <div class="suggestion-description">${service.description}</div>
                </div>
            </div>
        `).join('');

        // Add click handlers to suggestions
        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const tag = item.dataset.tag;
                highlightServiceCard(tag);
                searchSuggestions.classList.remove('active');
            });
        });
    }

    // Highlight service card
    function highlightServiceCard(tag) {
        // Remove previous highlights
        document.querySelectorAll('.service-card').forEach(card => {
            card.classList.remove('highlight');
        });

        // Find and highlight the matching card
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            if (card.querySelector('h3').textContent.toLowerCase().includes(tag)) {
                card.classList.add('highlight');
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the form data to your server
        console.log('Form submitted:', formData);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});
