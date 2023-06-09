const eliminarProdCarrito = e => {
    e.preventDefault()

    console.log(e.target.dataset.eliminar)

    if(e.target.dataset.eliminar){
        let dataset = e.target.dataset.eliminar
        fetch(`/carts/eliminar/${dataset}`,{
            method: 'DELETE',
        }).then(result => {
            if(result.status === 200){
                window.location.reload()
            }
        })       
    }else if(e.target.tagName === 'A'){
        window.location.href = e.target.href}
}

const listadoProdCart = document.querySelector('.panel-carrito');
listadoProdCart.addEventListener('click', eliminarProdCarrito)

const vaciar = e => {
    e.preventDefault()
    if(e.target.classList.contains('vaciar-carrito')){
        fetch('/carts/vaciarCarrito',{
            method: 'DELETE',
        }).then(result => {
            if(result.status === 200){
                window.location.reload()
            }
        }) 

    }
}
const vaciarCarrito = document.querySelector('.vaciar-carrito');
vaciarCarrito.addEventListener('click', vaciar)

