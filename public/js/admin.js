// document.addEventListener('DOMContentLoaded', ()=>{
    // const listadoProd = document.querySelector('.panel-admin');
    // listadoProd.addEventListener('click', eliminar)
// })

const eliminar = e => {
    e.preventDefault()

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

const listadoProd = document.querySelector('.panel-admin');
listadoProd.addEventListener('click', eliminar)