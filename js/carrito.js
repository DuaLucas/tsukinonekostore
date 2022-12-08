// DECLARANDO VARIABLES

const listadoProductosCheckout = document.querySelector('#listadoProductosCheckout')
const botonesCheckoutCarrito = document.querySelector('#checkout-carrito')
const pagoCompra = document.querySelector('#btn-pago-compra')
const tituloCheckout = document.querySelector('#checkout-titulo')
const vaciarCarritoCheckout = document.querySelector('#vaciar-carrito-checkout')

// LLAMANDO FUNCIONES 

productosCarrito()


// GENERANDO PRODUCTOS CARRITO

const productosCarritocheckout = ()=>{

    if(carrito == ""){
        listadoProductosCheckout.innerHTML = `<h4>Carrito vacio</h4>`
    }else{
        listadoProductosCheckout.innerHTML = ''
        carrito.forEach(producto =>{
            
            const div = document.createElement("div")
            div.className= "producto-individual"
            div.innerHTML=`
                <img src="${producto.img}" alt="${producto.nombre}">
                <p>${producto.nombre}</p>
                <p>${producto.cantidad}</p>
                <span>$${producto.precio * producto.cantidad}</span>`
    
                const btnEliminarProducto = document.createElement("button")
                btnEliminarProducto.className ="btn-button btn btn-eliminar"
                btnEliminarProducto.innerHTML = `<i class="bi bi-trash3" ></i>`
                btnEliminarProducto.addEventListener("click", ()=>{
                    eliminarProductoCarritoCheckout(producto.id)
                })
            div.append(btnEliminarProducto)    
            listadoProductosCheckout.append(div)
        }) 
        
        botonesCheckoutCarrito.style.display = 'flex'
    }


}

productosCarritocheckout()


// ELIMINAR PRODUCTO CARRITO

const eliminarProductoCarritoCheckout =(id)=>{
    const eliminar = carrito.filter(producto => producto.id !== id)
    carrito = eliminar
    localStorage.setItem('carrito', JSON.stringify(carrito))

    Toastify({
        text: "Producto eliminado",
        className: "info",
        gravity: "top",
        duration: 1000,
        style: {
          background: "linear-gradient(to right, #fe7d7d, #da3f3f)",
        }
      }).showToast();

      productosCarritocheckout()
      productosCarrito()
      mostrarCantidadProductosCarrito()
}

vaciarCarritoCheckout.addEventListener('click',()=>{
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

    productosCarritocheckout()
    productosCarrito()
    mostrarCantidadProductosCarrito()
    totalCarrito()
    productosCarrito()
    botonesCheckoutCarrito.style.display = 'none'
})


// FORMULARIO DE PAGO

const formularioPago = () =>{

  tituloCheckout.innerText = "Detalles de pago"
  listadoProductosCheckout.innerHTML = `
  <section class="payment-form dark">
  <div class="container">
<form id="form-pagos" class="needs-validation" novalidate>
  <div class="products">
    <div class="total">Total<span class="price">$${tablaTotal}</span></div>
  </div>
  <div class="card-details">
    <h3 class="title">Detalles tarjeta de credito</h3>
    <div class="row">
      <div class="form-group col-sm-7">
        <label for="card-holder">Nombre del titular</label>
        <input id="card-holder" type="text" class="form-control"  aria-label="Card Holder" aria-describedby="basic-addon1" required>
      </div>
      <div class="form-group col-sm-5">
        <label for="">Fecha de expiración</label>
        <div class="input-group expiration-date">
          <input type="number" class="form-control" placeholder="mm" aria-label="MM" aria-describedby="basic-addon1" v>
          <span class="date-separator">/</span>
          <input type="number" class="form-control" placeholder="aa" aria-label="AA" aria-describedby="basic-addon1" required>
        </div>
      </div>
      <div class="form-group col-sm-8">
        <label for="card-number">Numero de tarjeta</label>
        <input id="card-number" type="number" class="form-control"  aria-label="Card Holder" aria-describedby="basic-addon1" required>
      </div>
      <div class="form-group col-sm-4">
        <label for="cvc">Código de seguridad</label>
        <input id="cvc" type="number" class="form-control" placeholder="cvc" aria-label="Card Holder" aria-describedby="basic-addon1" required>
      </div>
      <div class="form-group col-sm-12" id="add-btn-pago">
      <button type="submit" id="btn-finalizar-compra" class="btn-button btn btn-pago">Realizar pago</button>
      </div>
    </div>
  </div>
</form>
</div>
</section>
  `
  document.getElementById('form-pagos').addEventListener('submit', (event)=> {
    event.preventDefault()

    botonesCheckoutCarrito.style.display = 'none'
    formularioFacturacion()
    validarFormulario()
    enviarEmail()
})

}

// FORMULARIO DE COMPRA

const formularioFacturacion = ()=>{
    tituloCheckout.innerText = "Detalles de facturación y envío"
    listadoProductosCheckout.innerHTML = `
    <form id="form" class="row g-3 needs-validation" novalidate>
    <div class="col-md-6">
        <label for="inputNombre" class="form-label">Nombre y apellido</label>
        <input type="text" class="form-control" id="inputNombre" required>
        <div class="invalid-feedback">Ingresar un dato valido</div>
    </div>
    <div class="col-md-6">
      <label for="inputEmail" class="form-label">Email</label>
      <input type="email" class="form-control" id="inputEmail" required>
      <div class="invalid-feedback">Ingresar un dato valido</div>
    </div>
    <div class="col-12">
      <label for="inputDireccion" class="form-label">Dirección</label>
      <input type="text" class="form-control" id="inputDireccion" placeholder="Avenida San Martin 1234" required>
      <div class="invalid-feedback">Ingresar un dato valido</div>
    </div>
    <div class="col-md-6">
      <label for="inputCiudad" class="form-label">Ciudad</label>
      <input type="text" class="form-control" id="inputCiudad" required>
      <div class="invalid-feedback">Ingresar un dato valido</div>
    </div>
    <div class="col-md-4">
      <label for="inputProvincia" class="form-label">Provincia</label>
      <input type="text" class="form-control" id="inputProvincia" required>
      <div class="invalid-feedback">Ingresar un dato valido</div>
    </div>
    <div class="col-md-2">
      <label for="inputPostal" class="form-label">Codigo postal</label>
      <input type="number" class="form-control" id="inputPostal" required>
      <div class="invalid-feedback">Ingresar un dato valido</div>
    </div>
    <div class="col-12">
      <button type="submit" id="boton-enviar" class="btn btn-add-to-cart">Realizar Pedido</button>
    </div>
  </form>`

  Toastify({
    text: "Pago realizado corrrectamente",
    className: "info",
    gravity: "top",
    position: "center",
    duration: 2000,
    style: {
      background: "linear-gradient(to right, #fe7d7d, #da3f3f)",
    }
  }).showToast();

}

// CONFIGURACION EMAILJS

let tablaTotal = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)

const enviarEmail =()=>{
    emailjs.init('pBbzyhzn_XuFuuk_s')

    document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault()


    const serviceID = 'service_ke2yjw5'
    const templateID = 'template_z8nvjfo'
    let params = {
        nombre : document.getElementById("inputNombre").value,
        email : document.getElementById("inputEmail").value,
        direccion : document.getElementById("inputDireccion").value,
        ciudad : document.getElementById("inputCiudad").value,
        provincia : document.getElementById("inputProvincia").value,
        postal : document.getElementById("inputPostal").value,
        tabla_total : tablaTotal,
        
    }

    emailjs.send(serviceID, templateID, params).then((res)=>{
      tituloCheckout.innerText = ""
      listadoProductosCheckout.innerHTML = `
      <p class="text-center"><img src="./img/check.png" alt=""></p>
      <h3 class="text-center titulos">Pedido realizado correctamente</h3>
      <p class="text-center">Te enviamos los datalles a tu correo electronico. ¡Muchas gracias por tu Compra! </p>
      `
    carrito.length = 0
    localStorage.setItem('carrito', JSON.stringify(carrito))
        })  
    })
}

// PAGO COMPRA

pagoCompra.addEventListener("click", ()=>{
  botonesCheckoutCarrito.style.display = 'none'
  formularioPago()
})


// VALIDAR FORMULARIOS

const validarFormulario = ()=> {
  const forms = document.querySelectorAll('.needs-validation')
      
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
      
            form.classList.add('was-validated')
          }, false)
        })
}