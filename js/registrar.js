const form = document.getElementById("formRegistro");
const user = document.getElementById("usuario")
const pass = document.getElementById("contrasenia")
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

    if (password.length < 4) {
        mostrarMensaje("La contraseña debe tener al menos 4 caracteres", "error");
        return;
    }

    
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
   

    
    const existe = usuarios.find(u => u.usuario === usuario);

    if (existe) {
         mostrarMensaje("El usuario ya existe", "error");
        return;
    }

    
    const nuevoUsuario = {
        usuario: usuario,
        password: password
    };

    
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    
   Swal.fire({
        icon: 'success',
        title: '¡Cuenta creada!',
        text: 'Tu registro se completó con éxito.',
        confirmButtonText: 'Ir al Login',
        iconColor: '#ff8c00',
        background: '#000000',
        color: '#ffffff',
        confirmButtonColor: '#ff8c00',
        confirmButtonText: 'Aceptar',
        customClass: {
            popup: 'borde-naranja'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            form.reset();
            window.location.href = "./login.html";
        }
    });
});



    
    