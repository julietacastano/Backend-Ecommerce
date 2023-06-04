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
