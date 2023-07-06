document.addEventListener('DOMContentLoaded', ()=>{
    //Limpiar alertas
    let alertas = document.querySelector('.alertas')
    if (alertas){
        limpiarAlertas()
    }

})

const limpiarAlertas = () => {
    const alertas = document.querySelector('.alertas')
    setInterval(() => {
        if(alertas.children.length > 0){
            alertas.removeChild(alertas.children[0])
        }
    }, 3000);

}


const filtroCat = e => {
    console.log(e.target.value)
    const categoria = e.target.value
    fetch(`/products/filter/${categoria}`,{
        method: 'GET',
    }).then(result => {
        if(result.status === 200){
            window.location.replace(`/products/categorias/${categoria}`)
        }
    })
    return
    if(e.target.dataset.eliminar){
        let dataset = e.target.dataset.eliminar
        fetch(`/admin/eliminar/${dataset}`,{
            method: 'DELETE',
        }).then(result => {
            if(result.status === 200){
                window.location.replace('/admin')
            }
        })
    }
}
const categorias = document.querySelector('#categoriaFiltro')
categorias.addEventListener('change', filtroCat)