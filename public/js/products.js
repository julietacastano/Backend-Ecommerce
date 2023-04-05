import cartsManager from "../../src/managers/cartsManager.js"

const divMain = document.getElementById("divMain")
console.log(divMain)

divMain.addEventListener('click', (e)=>{
    if(e.target.classList.contains('buttonDetalle')){
        const idProd = e.target.id
        //fetch('/api/products/:pid')
    }
})