const login = document.querySelector("#btn-login");

login.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
    document.location.href = "/";
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
});
