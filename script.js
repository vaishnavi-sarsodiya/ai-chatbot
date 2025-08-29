const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbotToggler = document.querySelector(".chatbot-toggler"); // Corrected: Removed "chatbot-toggle"
const chatbotCloserBtn = document.querySelector(".close-btn"); 

const chatbox = document.querySelector(".chatbox"); // Added: Define chatbox element

let userMessage;
const API_KEY = "AIzaSyCX7ZXHhJIgka_UCa7xVheSQXFRS7qbGjE";

// Define the initial height of the textarea
const inputInitHeight = chatInput.scrollHeight;

// Create a chat <li> element with passed message and className
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const messageElement = incomingChatLi.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{
                role: "user",
                parts: [{ text: userMessage }]
            }]
        }),
    };

    // Send POST request to API, get response
    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.candidates[0].content.parts[0].text;
            console.log(data);
        })
        .catch((error) => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Fixed typo here
    if (!userMessage) return;
    chatInput.value = "";

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking ..." message while waiting for the response
        const incomingChatLI = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLI);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLI);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key, prevent default action
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat();
    }
});

chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
});

sendChatBtn.addEventListener("click", handleChat);