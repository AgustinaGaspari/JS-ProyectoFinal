//variables globales

const contenedorProductos = document.getElementById('todoProductos')

const contenedorCarrito= document.getElementById('carritoContenedor')

const botonVaciar =  document.getElementById('vaciarCarrito')

const botonComprar = document.getElementById('finalCompra')

const contador= document.getElementById('contador')

const precioTotal= document.getElementById('precioTotal')


//Array

let carrito = [];

//LocalStorage

let carritoLS = JSON.parse(localStorage.getItem('carrito')) ?? []

console.log(carritoLS),

//Fetch y funciones del carrito

fetch("../stock.json")

    .then((response)=> response.json())

    .then((data)=>{
        data.forEach(producto => {
            const div = document.createElement('div')
            div.classList.add('producto')
            div.innerHTML+=`
                <img src=${producto.img} class="img-fluid">
                <h5>${producto.nombre}</h5>
                <p>Precio:$${producto.precio}</p>
                <p>Stock:${producto.stock}</p>
                <button id="boton${producto.id}" class="botonAgregar btn btn-dark">COMPRAR</button>
            `
            contenedorProductos.appendChild(div);
        
            const boton= document.getElementById(`boton${producto.id}`);
        
            boton.addEventListener('click',()=>{
                Swal.fire({
                    icon:'success',
                    text:'Producto agregado al carrito',
                }) 
                agregarCarrito(producto.id)
            })
        }) 

        const agregarCarrito= (productoId)=>{
            const existe= carritoLS.some((prod)=>prod.id===productoId)
            if (existe){
                carritoLS.map(prod=>{
                    if(prod.id===productoId){
                        prod.cantidad++
                    }
                })
            }else {
                const seleccion= data.find(prod=>prod.id === productoId) ;
                carritoLS.push(seleccion);
                console.log(seleccion)
            }
            
            actualizar();    
        }
        
        const actualizar= ()=>{
            
            contenedorCarrito.innerHTML=""
            
            carritoLS.forEach((producto)=>{
                const div= document.createElement('div');
                div.className = ('productoAgregado')
                div.innerHTML =`
                    <p>${producto.nombre}</p>
                    <p> $${producto.precio}</p>
                    <p>Cantidad: <span id="cantidad">${producto.cantidad} </span></p>
                    <button id="quitarCarrito(${producto.id})" class="botonQuitar btn btn-dark">Eliminar producto</button>
                `
                contenedorCarrito.appendChild(div)

                const botonQuit= document.getElementById(`quitarCarrito(${producto.id})`);
        
                botonQuit.addEventListener('click',()=>{
                    Swal.fire({
                        icon:'success',
                        text:'Producto eliminado del carrito',
                    }) 
                    quitarCarrito(producto.id)
                })

                localStorage.setItem('carrito',JSON.stringify(carritoLS));
            })
            contador.innerText= carritoLS.length;
            precioTotal.innerText= carritoLS.reduce((acc,producto)=>acc+producto.precio*producto.cantidad,0)
            
        }
    
        const quitarCarrito = (prodId)=>{
            const seleccion= carritoLS.find((prod)=>prod.id === prodId)
            const indice = carritoLS.indexOf(seleccion)
            carritoLS.splice(indice,1)
            actualizar();
        }

        botonVaciar.addEventListener('click',()=>{
            if(carritoLS.length != 0){
                Swal.fire({
                    title:'¿Vaciar Carrito de compras?',
                    text: '¿Está seguro de continuar?',
                    icon: 'warning',
                    confirmButtonText: 'Sí',
            
                })
                carritoLS.length = 0;
                actualizar();
            }else{
                Swal.fire({
                    title:'Carrito de compras vacío',
                    text: '¿Desea agregar productos?',
                    icon: 'error',
                    confirmButtonText: 'Sí',
                    showCancelButton:true,
                    cancelButtonText: 'No',
                })
            }
        })

        botonComprar.addEventListener ('click',()=>{
            if(carritoLS.length != 0){
                Swal.fire({
                title:'Mis compras',
                text: 'Compra finalizada con éxito',
                icon: 'success',
                timer:1500,
                showConfirmButton:false,

                })
                carritoLS.length = 0;
                actualizar();
            }else{
                Swal.fire({
                    title:'Carrito de compras vacío',
                    text: '¿Desea agregar productos?',
                    icon: 'error',
                    confirmButtonText: 'Sí',
                    showCancelButton:true,
                    cancelButtonText: 'No',
                })
            }
        })
    })
        
    