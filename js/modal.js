const contenedorModal = document.getElementsByClassName('modalContenedor')[0]
const botonAbrir = document.getElementById('carritoCompras')
const botonCerrar = document.getElementById('cerrarCarrito')
const modalCarrito = document.getElementsByClassName('modalCarrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})