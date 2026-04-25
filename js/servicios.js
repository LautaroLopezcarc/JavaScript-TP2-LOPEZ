


let servicios = [];
let carrito = [];

const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const contenedorCarrito = document.getElementById('carrito-contenedor');
const btnCerrar = document.getElementById('btn-cerrar');
const btnFinalizar = document.getElementById('btn-finalizar');


async function cargarServicios() {
    try {
        const response = await fetch('https://api.npoint.io/88d7ac1faa3bcdb98f3f');
        servicios = await response.json();

        inicializarBotones();

    } catch (error) {
        console.log("Error al cargar servicios", error);
        servicios = [];
    } finally {
        inicializarBotones();
    }
}

function inicializarBotones() {
    const botonesAgregar = document.querySelectorAll('.btn-agregar');

    botonesAgregar.forEach((boton, id) => {
        boton.addEventListener('click', () => {
            const servicio = servicios[id] || crearServicioDesdeTarjeta(boton);
            agregarAlCarrito(servicio);
        });
    });
}

function crearServicioDesdeTarjeta(boton) {
    const tarjeta = boton.closest('.service-card');
    const nombre = tarjeta.querySelector('h3')?.textContent.trim() || 'Servicio';
    const precioTexto = tarjeta.querySelector('p')?.textContent || '0';
    const precio = Number(precioTexto.replace(/[^0-9]/g, '')) || 0;

    return { nombre, precio };
}


function agregarAlCarrito(servicio) {

    carrito.push(servicio);

    actualizarInterfaz();

    mostrarCarrito();
    Swal.fire({
        title: '¡producto agregado!',
        text: `${servicio.nombre} agregado al carrito`,
        timer: 1500,
        icon: 'success',
        iconColor: '#ff8c00',        
        background: '#000000',       
        color: '#ffffff',            
        confirmButtonColor: '#ff8c00', 
        confirmButtonText: 'Aceptar',
        
        
        customClass: {
            popup: 'borde-naranja'


    }  });
}


function actualizarInterfaz() {

    listaCarrito.innerHTML = "";

    let acumuladorTotal = 0;

    carrito.forEach((servicio, id) => {

        const li = document.createElement('li');

        li.textContent = `${servicio.nombre} - $${servicio.precio}`;

        const btnBorrar = document.createElement('button');

        btnBorrar.textContent = "Quitar";

        btnBorrar.classList.add("btn-borrar");

        btnBorrar.addEventListener("click", () => {

            eliminarDelCarrito(id);

        });

        li.appendChild(btnBorrar);

        listaCarrito.appendChild(li);

        acumuladorTotal += servicio.precio;

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

cargarServicios();

btnCerrar.addEventListener('click', ocultarCarrito);


btnFinalizar.addEventListener('click', () => {

    if (carrito.length === 0) {

        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'Agregá servicios antes de comprar',
            
            iconColor: '#ff8c00',
            background: '#000000',
            color: '#ffffff',
            confirmButtonColor: '#ff8c00',
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: 'borde-naranja'
            }
        });

        return;
    }

    const total = carrito.reduce((acc, servicio) => {
        return acc + servicio.precio;
    }, 0);

    Swal.fire({
       title: '¿Confirmar compra?',
        text: `Total a pagar: $${total}`,
        icon: 'question',
        showCancelButton: true,

        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar',

        iconColor: '#ff8c00',
        background: '#000000',
        color: '#ffffff',

        confirmButtonColor: '#ff8c00',
        cancelButtonColor: '#444444',

        customClass: {
        popup: 'borde-naranja'
    }

        
   }).then((result) => {

    if (result.isConfirmed) {

        Swal.fire({
            title: '¡Compra realizada!',
            text: 'Gracias por elegir Mecánica Lautaro',
            icon: 'success',

            iconColor: '#ff8c00',
            background: '#000000',
            color: '#ffffff',

            confirmButtonColor: '#ff8c00',

            customClass: {
                popup: 'borde-naranja'
            }
        });

        carrito = [];

        actualizarInterfaz();

        ocultarCarrito();
    }

    });

});
