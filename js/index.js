// variables globales

let container = document.querySelector('.container')
let totalStyle = document.querySelector('.totalStyle')


// carrito
let canastoCarrito = document.querySelector('.canasto')
let recuperoStorage = localStorage.getItem('carrito')
const carritoCaja = document.querySelector('#carrito')
recuperoStorage != null ? mostrarInfoProducto() : mostrarInfoProducto() 
let carrito = []
let carritoContador = document.querySelector(".carritoContador")
let contador = 1

// consiguiendo los productos
let dataJSON = 'js/productos.json'
fetch(dataJSON)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        let myDataBase = json
        myDataBase.productos.forEach(producto => {
            // desestructurando cada producto
            const {id, imgSrc, modelo, tipo, tamanio, precio} = producto

            container.innerHTML +=`<article class="cardBox">
                                        <figure class="fotoProducto">
                                            <img src="${imgSrc}" alt="">
                                        </figure>
                                        <div class="marcoSkew">
                                            <h4 class="modelo">${modelo}</h4>
                                        </div>
                                        
                                        <figure class="estrellaFigure">
                                            <img class="afueraCarrito" id="${id}" src="assets/img/estrella_tienda.svg" alt="">
                                        </figure>

                                        <div class="mostrarInfo"></div>
                                        
                                        <div class="detalle">
                                            <img class="afueraCarrito" id="${id}" src="assets/img/sumar_a_carrito.svg" alt="">
                                        </div>

                                        <div class="caracteristicas">
                                            <p class="tipo">${tipo}</p>
                                            <div class="barra"></div>
                                            <p class="medida">${tamanio}</p>
                                        </div>
                                        <p class="precio">${precio}</p>

                                    </article>`
        })
        mostrarInfoProducto(myDataBase)
    })
    .catch((error) => console.log(error))




// imprimiendo info del producto elegido

function imprimirInfoProducto(id, infoProducto, productoElegido){

    // desestructurando cada producto
    const {imgSrc, modelo, tipo, tamanio, precio, stock} = productoElegido
    infoProducto.innerHTML =`<div class="cerrarPopup">
                                <img src="assets/img/ocultar_menu.svg" alt="">
                                </div>

                            <div class="fondoPopup">
                                <article class="fotos">
                                    <figure class="imagenPrincipal">
                                        <img src="${imgSrc}" alt="${modelo}">
                                        <h4 class="modeloPupup">Alpha</h4>
                                        <p class="precio">${precio}</p>
                                    </figure>
                                </article>

                                <article class="productoCaracteristicas">
                                    <div class="marcoSkewAgregar">
                                        <p class="botonAgregar">Agregar a carrito</p>
                                    </div>
                                    <div class="contadorCanasto">
                                        <button class="quitar">-</button>
                                        <span class="canastoContador">1</span>
                                        <button class="agregar">+</button>
                                    </div>
                                </article>                
                            </div>`
    const quitarInfo = document.querySelector('.cerrarPopup')
    const restar = document.querySelector('.quitar')
    const sumar = document.querySelector('.agregar')
    const agregarACarrito = document.querySelector('.marcoSkewAgregar')
    let valorFinal = document.querySelector('.precio')
    let precioUnitario = precio
    console.log(precioUnitario)
    let popupContador = document.querySelector('.canastoContador')
    let contadorPop = 1
    
    quitarInfo.onclick = () =>{
        infoProducto.style.display = 'none'
        container.style.position = 'relative'
    }

    sumar.onclick = () => {
        contadorPop ++
        contadorPop = contadorPop > stock ? stock : contadorPop
        // carritoContador.innerText = contador
        popupContador.innerText = contadorPop
        
        precioUnitario = precioUnitario + precio
        console.log(precioUnitario)
        valorFinal.innerText = precioUnitario
    }
    restar.onclick = () => {
        contadorPop --
        contadorPop = contadorPop < 1 ? 1 : contadorPop
        // carritoContador.innerText = contador
        popupContador.innerText = contadorPop
    
        precioUnitario = precioUnitario - precio
        precioUnitario = precioUnitario < precio ? precio : precioUnitario
        console.log(precioUnitario)
        valorFinal.innerText = precioUnitario

    }
    // boton para agregar a carrito
    agregarACarrito.onclick = () => {
        // agrego a cariito
        productoElegido.agregadoAlCarrito =  contadorPop
        console.log(productoElegido)
        carrito.push(productoElegido)
        localStorage.setItem('carrito', JSON.stringify(carrito))
        
        const {imgSrc, modelo, tipo, tamanio, precio, stock, agregadoAlCarrito} = productoElegido

        swal({
            title: "Buena Elección!",
            text: `Sumaste el modelo ${modelo} a tu carrito!`,
            icon: "success",
        })
        totalStyle.innerText += precioUnitario
        canastoCarrito.innerHTML +=`<article class="canastoBox" id="id-${id}">
                <figure class="fotoCanasto">
                    <img src="${imgSrc}" alt="">
                    <div class="tachoBasura">
                    <img src="assets/img/tacho_tienda.svg" alt="">
                    </div>
                </figure>
                <article class="canastoCaracteristicas">
                    <div class="marcoSkewCanasto">
                        <h4 class="modeloCanasto">${modelo}</h4>
                    </div>
                        <p class="tipoCanasto">${tipo}</p>
                        <p class="medidaCanasto">${agregadoAlCarrito}</p>
                    <p class="precio">${precioUnitario}</p>
                </article>
                
            </article>`

            const vaciador = document.querySelector('.tachoBasura')
            vaciador.onclick = (e) => {
                let productoASacar = carrito.indexOf(productoElegido)
                carrito.splice(productoASacar, 1)
                let productoRepetido = document.querySelector(`#id-${productoElegido.id}`)
                canastoCarrito.removeChild(productoRepetido)
                contador = 0
                carritoContador.innerText = contador
                carritoContador.innerText = contador

            }


    }
}

// mostrando la info de cada producto elegido
function mostrarInfoProducto(myDataBase){
    const botonesMostrarInfo = document.querySelectorAll('.mostrarInfo')
    const infoProducto = document.querySelector('.popupProducto')
    

    
    for(botonMostrarInfo of botonesMostrarInfo){ 
        botonMostrarInfo.onmouseover = (e) =>{
            let element = e.target
            element.style.backgroundColor = 'rgba(0, 0, 0, 0.456)'
            element.nextElementSibling.style.display = 'block'
        }
        botonMostrarInfo.onmouseout = (e) =>{
            let element = e.target
            element.style.backgroundColor = 'rgba(0, 0, 0, 0)'
            element.nextElementSibling.style.display = 'none'

        }
        botonMostrarInfo.onclick = (e) =>{
            infoProducto.style.display = 'flex'
            container.style.position = 'fixed'
            let element = e.target.previousElementSibling.childNodes[1]
            let id = element.attributes.id.value
            let productoElegido = myDataBase.productos.find(e => e.id == id)
            
            imprimirInfoProducto(id, infoProducto, productoElegido)
        }   
    }
}

// hacer aparecer canasto

const carritoCerrarCaja = document.querySelector('.cerrarMenu')
carritoCaja.onclick = () =>{
    canastoCarrito.style.transform = 'translateX(0px)'

}

carritoCerrarCaja.onclick = () =>{
    canastoCarrito.style.transform = 'translateX(320px)'
}


comprador.onclick = (e) => {
    swal({
        title: "Ya Casi!",
        text: `Estas por comprar el modelo ${productoElegido.modelo}!`,
        icon: "warning",
        buttons: ["Cancelar", "Confirmar"],
    })
    .then((result) => {
        if(result){
            eliminar()
            swal({
                title: "Su compra ha sido realizada!",
                text: "Gracias por elegir 1000FT!",
                icon: "success",
            })
        }else{
            eliminar()                                
            swal({
                title: "Su compra ha sido cancelada!",
                text: "Seguinos en las redes por más novedades",
                icon: "error",
            })
        }
    })
} 