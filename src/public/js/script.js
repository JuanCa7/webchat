const socket = io();

const container_messages = document.querySelector("#container-messages")
const btn_send = document.querySelector("#btn-send-message")
const message_input = document.querySelector("#message-input")
const logoutButton = document.getElementById("logout-button");
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));


btn_send.addEventListener("click",()=>{
    if(message_input == ""){
        return
    }

    socket.emit("message", {
        message: message_input.value,
        user: loggedUser.username
    });

    message_input.value = "";
})

let mySocketId = null;

socket.on("yourSocketId", (id) => {
    mySocketId = id;
});

socket.on("message", ({ user, message, senderId }) => {
    const isOwn = senderId === mySocketId;

    const msg = document.createRange().createContextualFragment(`
        <div class="message ${isOwn ? 'sent' : 'received'}">
            <p><strong>${isOwn ? "Tú" : user}:</strong> ${message}</p>
        </div>
    `);

    container_messages.appendChild(msg);
    container_messages.scrollTop = container_messages.scrollHeight;
});

message_input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        socket.emit("message", {
            message: message_input.value,
            user: loggedUser.username
        });
        
        message_input.value = "";
    }
});


if (!loggedUser || !loggedUser.username) {
    document.location.href = "/login";
} else {
    const userDisplay = document.querySelector('#logged-user');
    userDisplay.textContent = `@${loggedUser.username}`;
}

function logout() {
    localStorage.removeItem("loggedUser");
    document.location.href = "/login";
}

logoutButton.addEventListener("click", logout);