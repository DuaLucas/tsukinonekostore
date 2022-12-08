// DECLARACION VARIABLES 
let carrito = JSON.parse(localStorage.getItem('carrito')) || []
const abrirBtnCarrito = document.querySelector('#abrir-carrito-btn')
const cerrarBtnCarrito = document.querySelector('#cerrar-carrito-btn')
const verCarrito = document.querySelector('#ventana-carrito')
const listaProductosCarrito = document.querySelector('#productos-carrito')
const cantidadProductosCarrito = document.querySelector('#cantidad-productos')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const precioTotal = document.querySelector('#precio-total')
const precioTotalCheckout = document.querySelector('#precio-total-checkout')
const listaProductos = document.querySelector('#lista-productos')


// TOGGLE BOTON CARRITO

abrirBtnCarrito.addEventListener('click',()=>{
    verCarrito.classList.add("mostrar-carrito")
    productosCarrito()
})

cerrarBtnCarrito.addEventListener('click',()=>{
    verCarrito.classList.remove("mostrar-carrito")
})  

// GENERANDO GRID PRODUCTOS

const gridProductos = async() =>{
    const response = await fetch('./productos.json')
    const data = await response.json()

    data.forEach(productos => {

        const li = document.createElement("li")
        li.innerHTML = `
            <img alt="${productos.nombre}" src="${productos.img}">
            <h3>${productos.nombre}</h3>
            <p>$${productos.precio}</p>
             `
            
        const btnAgregarCarrito = document.createElement("button")
        btnAgregarCarrito.className =  "btn-button btn btn-add-to-cart"
        btnAgregarCarrito.innerHTML = `Agregar al carrito` 
            
        btnAgregarCarrito.addEventListener('click', () => {
            agregarCarrito(productos.id)
        })
            
        li.append(btnAgregarCarrito)
        listaProductos.append(li)
               
    })
}
 
gridProductos()

// AGREGAR AL CARRITO

const agregarCarrito = async(id)=> {

    const response = await fetch('./productos.json')
    const data = await response.json()
    const sumarAlCarrito = data.find(producto => producto.id === id)
    
    if(carrito.some(producto => producto.id === id)) {
        carrito.map(producto => {
            if(producto.id === id){
                producto.cantidad++
            }
        })
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }else{
        carrito.push(sumarAlCarrito)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }

    Toastify({
        text: "Agregado ✨",
        className: "info",
        gravity: "top",
        duration: 1000,
        style: {
          background: "linear-gradient(to right, #fe7d7d, #da3f3f)",
        }
      }).showToast();

    mostrarCantidadProductosCarrito() 
    productosCarrito()
    totalCarrito()
}


// MOSTRAR PRODUCTOS EN EL CARRITO

const productosCarrito = ()=>{

    listaProductosCarrito.innerHTML = ''
    carrito.forEach(producto =>{
        
        const div = document.createElement("div")
        div.className= "producto"
        div.innerHTML=`
            <img src="${producto.img}" alt="${producto.nombre}">
            <p>${producto.nombre}</p>
            <p>${producto.cantidad}</p>
            <span>$${producto.precio * producto.cantidad}</span>`

            const btnEliminarProducto = document.createElement("button")
            btnEliminarProducto.className ="btn-button btn btn-eliminar"
            btnEliminarProducto.innerHTML = `<i class="bi bi-trash3" ></i>`
            btnEliminarProducto.addEventListener("click", ()=>{
                eliminarProductoCarrito(producto.id)
            })
        div.append(btnEliminarProducto)    
        listaProductosCarrito.append(div)
    }) 

    totalCarrito()

}

// MOSTRAR CANTIDAD PRODUCTOS EN CARRITO
 
const mostrarCantidadProductosCarrito = ()=>{
    const cantidad = JSON.parse(localStorage.getItem('carrito')) || carrito
    cantidadProductosCarrito.innerText = cantidad.length
}

mostrarCantidadProductosCarrito()

// PRECIO TOTAL

const totalCarrito = ()=>{
    let total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0) 
    localStorage.setItem('total', total)    
     precioTotal.innerText = total
     precioTotalCheckout.innerText = total
 }


 
// ELIMINAR PRODUCTO CARRITO

const eliminarProductoCarrito =(id)=>{
    const eliminar = carrito.filter(producto => producto.id !== id)
    carrito = eliminar
    localStorage.setItem('carrito', JSON.stringify(carrito))

    Toastify({
        text: "Producto eliminado",
        className: "info",
        gravity: "bottom",
        duration: 1000,
        style: {
          background: "linear-gradient(to right, #fe7d7d, #da3f3f)",
        }
      }).showToast();

    mostrarCantidadProductosCarrito()
    productosCarrito()
    totalCarrito()
    productosCarritocheckout()
}

 // VACIAR CARRITO

 vaciarCarrito.addEventListener('click',()=>{
    carrito.length = 0
    localStorage.setItem('carrito', JSON.stringify(carrito))

    Toastify({
        text: "Carrito vaciado",
        className: "info",
        gravity: "bottom",
        duration: 1000,
        style: {
          background: "linear-gradient(to right, #fe7d7d, #da3f3f)",
        }
      }).showToast();

      mostrarCantidadProductosCarrito()
      productosCarrito()
      totalCarrito()
})




