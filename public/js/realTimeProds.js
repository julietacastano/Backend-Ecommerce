const socket = io()

const button = document.getElementById('button')


button.addEventListener('click', e =>{
    e.preventDefault()

    const form = document.querySelector('#form')
    const formData = new FormData(form)

    const productData = {
        'title':formData.get('title'),
        'description':formData.get('description'),
        'price':formData.get('price'),
        'thumbnail':formData.get('thumbnail'),
        'code':formData.get('code'),
        'stock':formData.get('stock'),
        'category':formData.get('category'),
    }
    
    socket.emit('newProduct', productData)
})

socket.on('update', getProd => {
    const productsDiv = document.getElementById('products')
    productsDiv.innerHTML = getProd.map(el => 
        `<p>Title: ${el.title} - 
        Price: $${el.price} - 
        Thumbnail: ${el.thumbnail} - 
        Description: ${el.description} - 
        Category: ${el.category}</p>`
        )
})

socket.emit('refresh')
