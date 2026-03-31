const servicios = [
    { id: 1, nombre: "Cambio de aceite", precio: 15000 },
    { id: 2, nombre: "Alineación y balanceo", precio: 18000 },
    { id: 3, nombre: "Frenos y suspensión", precio: 22000 },
    { id: 4, nombre: "Diagnóstico general", precio: 10000 },
    { id: 5, nombre: "Batería", precio: 30000 },
    { id: 6, nombre: "Revisión de motor", precio: 25000 }
];


let carrito = [];


const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const contenedorCarrito = document.getElementById('carrito-contenedor');
const btnCerrar = document.getElementById('btn-cerrar');
const botonesAgregar = document.querySelectorAll('.btn-primario');




function agregarAlCarrito(servicio) {
    carrito.push(servicio);
    actualizarInterfaz();
    mostrarCarrito();
}


function actualizarInterfaz() {
    listaCarrito.innerHTML = "";
    
    let acumuladorTotal = 0;

    carrito.forEach((servico, id) => {
        const li = document.createElement('li');

        li.textContent = `${servico.nombre} - $${servico.precio} `;

        const btnBorrar = document.createElement('button');
        btnBorrar.textContent = "Quitar";
        btnBorrar.classList.add("btn-borrar");

        btnBorrar.addEventListener("click", () => {
            eliminarDelCarrito(id);
        });

        li.appendChild(btnBorrar);

        listaCarrito.appendChild(li);

        acumuladorTotal += servico.precio; 
    });

    totalCarrito.innerHTML = "$" + acumuladorTotal; 
}


function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1); 
    actualizarInterfaz();
}


function mostrarCarrito() {
    contenedorCarrito.style.display = 'block';
}

function ocultarCarrito() {
    contenedorCarrito.style.display = 'none';
}


botonesAgregar.forEach((boton, id) => {
    
    boton.addEventListener('click', () => {
        agregarAlCarrito(servicios[id]);
    });
});


btnCerrar.addEventListener('click', ocultarCarrito);