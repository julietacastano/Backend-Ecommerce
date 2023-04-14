import cartsManager from "../../src/managers/cartsManager.js"

const divMain = document.getElementById("divMain")
console.log(divMain)

divMain.addEventListener('click', (e)=>{
    if(e.target.classList.contains('buttonDetalle')){
        const idProd = e.target.id
        //fetch('/api/products/:pid')
    }
})


const logOut = getElementById('logOut')

logOut.addEventListener('submit', event =>{
    event.preventDefault()
    fetch('/api/sessions/logout',{
        method: 'POST',
    }).then(result => {
        if(result.status === 200){
            window.location.reload('/api/sessions/login')
        }
    })
})