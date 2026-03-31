const form = document.getElementById("formLogin");
const user = document.getElementById("usuario");
const pass = document.getElementById("contrasenia");
const mensaje = document.getElementById("mensaje");

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = "mensaje " + tipo;
}


form.addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = user.value.trim();
    const password = pass.value.trim();

    
    if (usuario === "" || password === "") {
        mostrarMensaje("Completa todos los campos", "error");
        return;
    }

    
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuarios.find(u => u.usuario === usuario && u.password === password);

   
    if (usuarioValido) {
        
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido));

        
        mostrarMensaje("¡Inicio de sesión exitoso! Entrando...", "ok");

        
        setTimeout(() => {
            window.location.href = "servicios.html"; 
        }, 2000);

    } else {
        
        mostrarMensaje("Usuario o contraseña incorrectos", "error");
    }

    
});
   