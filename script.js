const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloserBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");

let userMessage;

// Initial height of textarea
const inputInitHeight = chatInput.scrollHeight;

// Create chat message element
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    chatLi.innerHTML =
        className === "outgoing"
            ? `<p>${message}</p>`
            : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;

    return chatLi;
};

// 🔹 DEMO BOT LOGIC (NO API)
const getBotReply = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes("hi") || msg.includes("hello"))
        return "Hello! How can I help you today?";

    if (msg.includes("project"))
        return "This is an AI chatbot demo built using HTML, CSS, and JavaScript.";

    if (msg.includes("help"))
        return "I can answer basic questions about this project.";

    if (msg.includes("portfolio"))
        return "This chatbot is part of a personal portfolio project.";

    return "Thank you for your message! This chatbot demo is under development.";
};

// Handle chat
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // User message
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Bot thinking message
        const incomingChatLI = createChatLi("Typing...", "incoming");
        chatbox.appendChild(incomingChatLI);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        // Bot reply
        setTimeout(() => {
            incomingChatLI.querySelector("p").textContent =
                getBotReply(userMessage);
            chatbox.scrollTo(0, chatbox.scrollHeight);
        }, 700);
    }, 500);
};

// Auto resize textarea
chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// Enter key send
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat();
    }
});

// Toggle chatbot
chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
});

// Send button
sendChatBtn.addEventListener("click", handleChat);
