// Retrieve stored messages from localStorage
var storedMessages = JSON.parse(localStorage.getItem('messages')) || [];

// Display stored messages
var messagesDiv = document.getElementById('messages');
storedMessages.forEach(message => {
    messagesDiv.innerHTML += `<div class="message">${message}</div>`;
});

function sendMessage() {
    var messageInput = document.getElementById('messageInput');
    var message = messageInput.value;
    if (message.trim() !== '') {
        // Display the sent message
        messagesDiv.innerHTML += `<div class="message sent">${message}</div>`;
        // Store the message in localStorage
        storedMessages.push(message);
        localStorage.setItem('messages', JSON.stringify(storedMessages));
        // Clear the message input
        messageInput.value = '';
    }
}