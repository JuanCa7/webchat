const socket = io();

const container_messages = document.querySelector("#container-messages")
const btn_send = document.querySelector("#btn-send-message")
const message_input = document.querySelector("#message-input")
const logoutButton = document.getElementById("logout-button");


btn_send.addEventListener("click",()=>{
    socket.emit("message",message_input.value)
    if(message_input == ""){
        return
    }
})


socket.on("message", ({user,message})=>{
    const msg = document.createRange().createContextualFragment(
    `
        <div class="message sent">
            <p>
                <strong>Tú:</strong> ${message}
            </p>
        </div> 
    `);
    container_messages.append(msg)
    message_input.value = ""

});

message_input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        socket.emit("message",message_input.value)
    }
});

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

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