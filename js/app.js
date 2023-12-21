/** Selectores */

const listaProductos = document.querySelector('#lista-productos')
const tbody = document.querySelector('#lista-carrito tbody')
const imgCarrito = document.querySelector('#img-carrito')

/** Eventos  */
listaProductos.addEventListener("click", (evento)=>{
  if(evento.target.classList.contains("agregar-carrito")){
   const id = evento.target.getAttribute("data-id")
   const card = evento.target.parentElement.parentElement
  
   agregarCarrito(id,card)
  }
})


/** Creamos la lista del carrito de compras */

let listaCarrito = []


/** Creamos la funcion para agregar productos */

function agregarCarrito(id,card){

  const infoProduct = {
    id: id,
    nombre: card.querySelector('h4').textContent,
    precio: card.querySelector('.precio').textContent,
    imagen: card.querySelector('img').src,
    cantidad: 1
  }

  const producto = listaCarrito.find(element => element.id == id )
    
  
    if(producto){
      producto.cantidad ++ 
    }
    else{
      listaCarrito.push(infoProduct)
    }
  pintarCarrito()
}

function pintarCarrito(){


  limpiarCarrito()

  listaCarrito.forEach((producto)=>{

   const tr = document.createElement('tr')

   /** Creamos un td para insertar la imagen */

   const tdImagen  = document.createElement('td')
   const imagen = document.createElement('img')
   imagen.src = producto.imagen
   imagen.height =  "100"

   tdImagen.appendChild(imagen)
   tr.appendChild(tdImagen)

   /** Creamos el td para el nombre */
   const tdNombre = document.createElement('td')
   tdNombre.textContent = producto.nombre
   tr.appendChild(tdNombre)

   /** Creamos el td para el precio */

   const tdPrecio = document.createElement('td')
   tdPrecio.textContent = producto.precio
   tr.appendChild(tdPrecio)

   /** Creamos el td para la cantidad  */

   const tdCantidad = document.createElement('td')
   tdCantidad.textContent = producto.cantidad
   tr.appendChild(tdCantidad)


   /** Creamos un boton para eliminar los productos del carrito */
   const tdBoton = document.createElement('td')
   const btnEliminar = document.createElement("button");
   btnEliminar.classList.add("eliminar-producto");
   btnEliminar.textContent = "Eliminar";
   btnEliminar.setAttribute("data-id", producto.id);
   tdBoton.appendChild(btnEliminar)
   tr.appendChild(tdBoton)

   tbody.appendChild(tr)

   btnEliminar.addEventListener("click", (evento) => {
     if (evento.target.classList.contains("eliminar-producto")) {

       const id = evento.target.getAttribute("data-id");
       eliminarProduct(id);
       console.log(eliminarProduct);
     }
   });
  })

}
/** Creamos el evento del boton para elminar el producto */
// const btnEliminar = document.querySelector('.eliminar-producto')
// console.log(btnEliminar);

function eliminarProduct(id){
 listaCarrito = listaCarrito.filter(producto => producto.id != id)
  pintarCarrito()
}
function limpiarCarrito(){
   while (tbody.firstChild) {
     tbody.removeChild(tbody.firstChild);
   }
}