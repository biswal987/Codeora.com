// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    const bodyElement = document.body;
    bodyElement.classList.toggle('dark-mode');
    bodyElement.classList.toggle('light-mode');

    const isDarkMode = bodyElement.classList.contains('dark-mode');
    darkModeToggle.textContent = isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode';
});

// RGB Mode Toggle
const rgbModeToggle = document.getElementById('rgb-mode-toggle');
rgbModeToggle.addEventListener('click', () => {
    const bodyElement = document.body;
    bodyElement.classList.toggle('rgb-mode');

    // Toggle text based on RGB mode status
    if (bodyElement.classList.contains('rgb-mode')) {
        rgbModeToggle.textContent = '🌈 RGB Mode Active';
    } else {
        rgbModeToggle.textContent = '🌈 RGB Mode';
    }
});

// Kal Chat Widget
const kalIcon = document.getElementById('kal-icon');
const chatWidget = document.getElementById('chat-widget');
const closeChat = document.getElementById('close-chat');
const sendMessageButton = document.getElementById('send-message');
const chatInput = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');

// Open Chat Widget when Kal Icon is clicked
kalIcon.addEventListener('click', () => {
    chatWidget.style.display = 'flex';
    kalIcon.style.display = 'none'; // Hide the Kal icon
});

// Close Chat Widget
closeChat.addEventListener('click', () => {
    chatWidget.style.display = 'none';
    kalIcon.style.display = 'block'; // Show the Kal icon again
});

// Send Message and Get AI Response
sendMessageButton.addEventListener('click', async () => {
    const message = chatInput.value.trim();
    if (message) {
        const userMessage = document.createElement('p');
        userMessage.textContent = `You: ${message}`;
        chatWindow.appendChild(userMessage);

        chatInput.value = ''; // Clear input field

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            const result = await response.json();
            const botMessage = document.createElement('p');
            botMessage.innerHTML = `<strong>Kal:</strong> ${result.reply}`;
            chatWindow.appendChild(botMessage);
        } catch (error) {
            const errorMessage = document.createElement('p');
            errorMessage.innerHTML = '<strong>Kal:</strong> Error connecting to AI assistant.';
            chatWindow.appendChild(errorMessage);
        }
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    try {
        const response = await fetch('http://localhost:5000/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.message);
        if (result.success) {
            contactForm.reset();
        }
    } catch (error) {
        alert('Error sending message. Please try again later.');
    }
});
