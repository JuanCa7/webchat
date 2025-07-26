const login = document.querySelector("#btn-login");

login.addEventListener("click",()=>{
    const user = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if(user != "" && password != ""){
        document.cookie = `username=${user}`;
        document.cookie = `password=${password}`;
        document.location.href = "/";
    }else{
        alert("El usuario y contraseña son obligatorios!")
    }
})