document.getElementById("btn-register").addEventListener("click", () => {
    const username = document.getElementById("new-username").value.trim();
    const password = document.getElementById("new-password").value.trim();

    if (!username || !password) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find(u => u.username === username);

    if (exists) {
        alert("Ese nombre de usuario ya existe.");
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    const newUser = { username, password };
    localStorage.setItem("loggedUser", JSON.stringify(newUser));
    document.location.href = "/";
});
