 // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
            }
            
            // Save preference to localStorage
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        }
        
        // Language Toggle
        const langToggle = document.getElementById('langToggle');
        
        langToggle.addEventListener('click', () => {
            const enElements = document.querySelectorAll('.en');
            const bmElements = document.querySelectorAll('.bm');
            
            enElements.forEach(el => {
                el.style.display = el.style.display === 'none' ? 'block' : 'none';
            });
            
            bmElements.forEach(el => {
                el.style.display = el.style.display === 'none' ? 'block' : 'none';
            });
            
            if (langToggle.textContent.includes('BM')) {
                langToggle.innerHTML = '<i class="fas fa-globe"></i> EN';
            } else {
                langToggle.innerHTML = '<i class="fas fa-globe"></i> BM';
            }
            
            // Save language preference
            localStorage.setItem('language', langToggle.textContent.includes('EN') ? 'en' : 'bm');
        });
        
        // Check for saved language preference
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage === 'bm') {
            langToggle.click(); // Toggle to BM if saved
        }
        
        // Navigation Functionality
        const navButtons = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.section');
        
        // Function to show a specific section
        function showSection(sectionId) {
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Remove active class from all buttons
            navButtons.forEach(button => {
                button.classList.remove('active');
            });
            
            // Show the selected section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Add active class to the clicked button
                const activeButton = document.querySelector(`.nav-btn[data-target="${sectionId}"]`);
                if (activeButton) {
                    activeButton.classList.add('active');
                }
                
                // Scroll to the section
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Add click event to navigation buttons
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.getAttribute('data-target');
                showSection(target);
            });
        });
        
        // Chatbot Functionality
        const chatbotBtn = document.getElementById('chatbotBtn');
        const chatWindow = document.getElementById('chatWindow');
        const chatBody = document.getElementById('chatBody');
        const userInput = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');
        
        chatbotBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });
        
        // Predefined bot responses
        const botResponses = {
            en: {
                greeting: "Hello! I'm your futuristic librarian assistant. How can I help you today? 😊",
                help: "I can help you with: <br>1. Finding eBooks 📚<br>2. Booking consultations 🗓️<br>3. Answering questions ❓<br>Just ask me anything!",
                feedback: "Thank you for your feedback! We're always looking to improve. Is there anything specific you'd like to share?",
                thanks: "You're welcome! 😊 Let me know if you need anything else.",
                goodbye: "Thank you for using Futuristic Librarian! Have a great day! 🌟",
                default: "I'm still learning! For now, I can help you find eBooks, book consultations, or answer basic questions. 😊"
            },
            bm: {
                greeting: "Helo! Saya pembantu pustakawan futuristik anda. Bagaimana saya boleh membantu anda hari ini? 😊",
                help: "Saya boleh membantu anda dengan: <br>1. Mencari eBook 📚<br>2. Menempah konsultasi 🗓️<br>3. Menjawab soalan ❓<br>Tanya saya apa sahaja!",
                feedback: "Terima kasih atas maklum balas anda! Kami sentiasa berusaha untuk memperbaiki. Ada sesuatu yang khusus yang anda ingin kongsi?",
                thanks: "Sama-sama! 😊 Beritahu saya jika anda memerlukan apa-apa lagi.",
                goodbye: "Terima kasih kerana menggunakan Pustakawan Futuristik! Semoga hari anda indah! 🌟",
                default: "Saya masih belajar! Buat masa ini, saya boleh membantu anda mencari eBook, menempah konsultasi, atau menjawab soalan asas. 😊"
            }
        };
        
        // Get current language
        function getCurrentLanguage() {
            return document.querySelector('.en').style.display === 'none' ? 'bm' : 'en';
        }
        
        // Add message to chat
        function addMessage(message, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
            
            const lang = getCurrentLanguage();
            const span = document.createElement('span');
            span.className = lang;
            span.innerHTML = message;
            
            if (lang === 'bm') {
                const enSpan = document.createElement('span');
                enSpan.className = 'en';
                enSpan.style.display = 'none';
                enSpan.innerHTML = message;
                messageDiv.appendChild(enSpan);
            }
            
            messageDiv.appendChild(span);
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
        
        // Process user input
        function processUserInput() {
            const message = userInput.value.trim();
            if (message === '') return;
            
            addMessage(message, true);
            userInput.value = '';
            
            // Simulate AI thinking
            setTimeout(() => {
                const lang = getCurrentLanguage();
                const responses = botResponses[lang];
                
                if (message.toLowerCase().includes('help') || message.toLowerCase().includes('bantu')) {
                    addMessage(responses.help);
                } else if (message.toLowerCase().includes('feedback') || message.toLowerCase().includes('maklum balas')) {
                    addMessage(responses.feedback);
                } else if (message.toLowerCase().includes('thank') || message.toLowerCase().includes('terima kasih')) {
                    addMessage(responses.thanks);
                } else if (message.toLowerCase().includes('bye') || message.toLowerCase().includes('selamat tinggal')) {
                    addMessage(responses.goodbye);
                } else {
                    addMessage(responses.default);
                }
            }, 1000);
        }
        
        sendBtn.addEventListener('click', processUserInput);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                processUserInput();
            }
        });
        
        // FAQ Accordion
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
        
        // Form submission
        const feedbackForm = document.getElementById('feedbackForm');
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your feedback! We appreciate your input.');
            feedbackForm.reset();
        });
        
        // Initialize the page with the hero section active
        document.addEventListener('DOMContentLoaded', () => {
            showSection('hero');
        });