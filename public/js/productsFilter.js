function renderProductId() {
    let productos = document.querySelectorAll('.product');

    productos.forEach(producto => {
        producto.removeEventListener('click', redirectToProduct);
    });

    function redirectToProduct(e) {
        window.location.href = `http://localhost:3030/producto/detalle/${e.currentTarget.getAttribute('key')}`;
    }

    productos.forEach(producto => {
        producto.addEventListener('click', redirectToProduct);
    });
}

renderProductId()

function filter(products) {
    let inputFilter = document.querySelector('#order')
        let cleanedProducts = products.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
        let parsedProducts = JSON.parse(cleanedProducts);
        let [,option1,option2,option3,option4] = inputFilter.children
        inputFilter.addEventListener('change', () => {
            if (inputFilter.value === 'highPrice') {
                highPrice(parsedProducts);
            }else if (inputFilter.value === 'lowPrice') {
                lowPrice(parsedProducts);
            }else if (inputFilter.value === 'accesories') {
                accesories(parsedProducts);
            }else if (inputFilter.value === 'cell') {
                cell(parsedProducts);
            }
        })
    }

function highPrice(productsParameter) {
    let filterPrice = []
    for (let i = 0; i < productsParameter.length; i++) {
        filterPrice.push(productsParameter[i])
    }
    filterPrice.sort((a, b) => b.price - a.price);
    renderProducts(filterPrice)
    
}

function lowPrice(productsParameter) {
    let filterPrice = []
    for (let i = 0; i < productsParameter.length; i++) {
        filterPrice.push(productsParameter[i])
    }
    filterPrice.sort((a, b) => a.price - b.price);
    renderProducts(filterPrice)
    
}


function accesories(productsParameter) {
    let filterPrice = []
    for (let i = 0; i < productsParameter.length; i++) {
        if (productsParameter[i].category_id == 2 ) {
            filterPrice.push(productsParameter[i])
        }
    }
    renderProducts(filterPrice)
    
}


function cell(productsParameter) {
    let filterPrice = []
    for (let i = 0; i < productsParameter.length; i++) {
        if (productsParameter[i].category_id == 1 ) {
            filterPrice.push(productsParameter[i])
        }
    }
    renderProducts(filterPrice)
    
}


function renderProducts(productsFilter) {
    let conteiner = document.querySelector('.product-conteiner')
    conteiner.innerHTML = ''
    productsFilter.forEach(cardProduct => {
        conteiner.innerHTML += `
        <div class="product" key="${cardProduct.id_product}">
            <img src="/images/celulares/${cardProduct.image}" alt="${cardProduct.name}" class="smartphone">
            <h2 class="tittle-for-product">${cardProduct.name}</h2>
            <p>$${cardProduct.price}</p>
        </div>`
    });
    renderProductId()
}