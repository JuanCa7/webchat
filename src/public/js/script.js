const socket = io();

const container_messages = document.querySelector("#container-messages");
const btn_send = document.querySelector("#btn-send-message");
const message_input = document.querySelector("#message-input");
const logoutButton = document.getElementById("logout-button");
const userDisplay = document.querySelector('#logged-user');
const roomListItems = document.querySelectorAll("#room-list .user");

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (!loggedUser || !loggedUser.username) {
    document.location.href = "/login";
} else {
    userDisplay.textContent = `@${loggedUser.username}`;
}

let mySocketId = null;
let currentRoom = null;

// Al obtener el socket ID
socket.on("yourSocketId", (id) => {
    mySocketId = id;

    // Unirse automáticamente a la primera sala
    const defaultRoom = document.querySelector("#room-list .user")?.dataset.room;
    if (defaultRoom) {
        joinRoom(defaultRoom);
    }
});

// Escuchar mensajes
socket.on("message", ({ user, message, senderId, room }) => {
    if (room !== currentRoom) return;

    const isOwn = senderId === mySocketId;

    const msgElement = document.createRange().createContextualFragment(`
        <div class="message ${isOwn ? 'sent' : 'received'}">
            <p><strong>${isOwn ? "Tú" : user}:</strong> ${message}</p>
        </div>
    `);

    container_messages.appendChild(msgElement);
    container_messages.scrollTop = container_messages.scrollHeight;

    // Guardar en localStorage
    const saved = JSON.parse(localStorage.getItem("roomMessages")) || {};
    if (!saved[room]) saved[room] = [];
    saved[room].push({ user, message, senderId });
    localStorage.setItem("roomMessages", JSON.stringify(saved));
});

// Enviar mensaje
function sendMessage() {
    const text = message_input.value.trim();
    if (!text || !currentRoom) return;

    socket.emit("message", {
        message: text,
        user: loggedUser.username,
        room: currentRoom
    });

    message_input.value = "";
}

btn_send.addEventListener("click", sendMessage);

message_input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});

// Cambiar de sala al hacer clic
roomListItems.forEach(item => {
    item.addEventListener("click", () => {
        const newRoom = item.dataset.room;
        if (newRoom === currentRoom) return;

        joinRoom(newRoom);
    });
});

// Unirse a sala
function joinRoom(room) {
    if (currentRoom) {
        socket.emit("leaveRoom", currentRoom);
    }

    currentRoom = room;
    socket.emit("joinRoom", room);

    highlightActiveRoom(room);
    loadMessagesFromStorage(room);
}

// Cargar mensajes guardados por sala
function loadMessagesFromStorage(room) {
    container_messages.innerHTML = "";

    const saved = JSON.parse(localStorage.getItem("roomMessages")) || {};
    const messages = saved[room] || [];

    messages.forEach(({ user, message, senderId }) => {
        const isOwn = senderId === mySocketId;

        const msgElement = document.createRange().createContextualFragment(`
            <div class="message ${isOwn ? 'sent' : 'received'}">
                <p><strong>${isOwn ? "Tú" : user}:</strong> ${message}</p>
            </div>
        `);

        container_messages.appendChild(msgElement);
    });

    container_messages.scrollTop = container_messages.scrollHeight;
}

// Marcar la sala activa en el menú
function highlightActiveRoom(room) {
    roomListItems.forEach(item => {
        item.classList.toggle("active", item.dataset.room === room);
    });
}

// Logout
function logout() {
    localStorage.removeItem("loggedUser");
    document.location.href = "/login";
}

logoutButton.addEventListener("click", logout);
