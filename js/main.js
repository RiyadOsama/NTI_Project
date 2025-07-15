let spinner = document.querySelector('.spinner');
setTimeout(() => {
    spinner.style.opacity = '0';
    spinner.style.zIndex = '-1';
}, 1000);

let products = [];

async function GetAllProducts() {
    let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
    let result = await response.json();
    products = result.data;
    disProducts();
}

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function disProducts() {
      let productHTML = ``;
      let shuffledProducts = shuffleArray([...products]);

      for (let i = 0; i < shuffledProducts.length; i++) {
        let product = shuffledProducts[i];
        productHTML += `
          <div class="item">
            <div class="featured-collection-image">
              <img src="${product.imageCover}" alt="${product.title}" />
            </div>
            <div class="featured-collection-info">
              <div class="prand-name">${product.category?.name || "No Category"}</div>
              <a href="#" class="product-name">${product.title}</a>
              <div class="product-rating">
                <div class="star-rating">
                  <span class="star filled">&#9733;</span>
                  <span class="star filled">&#9733;</span>
                  <span class="star filled">&#9733;</span>
                  <span class="star filled">&#9733;</span>
                  <span class="star">&#9733;</span>
                  <span class="count">(3)</span>
                </div>
              </div>
              <div class="product-price">${product.price} EGP</div>
            </div>
            <div class="pro-controls">
              <div class="icon-con"><i class="fa-solid fa-heart"></i></div>
              <div class="icon-con"><i class="fa-solid fa-cart-shopping"></i></div>
            </div>
          </div>
        `;
      }

    let carousel = $("#featured-collection .owl-carousel");
    carousel.html(productHTML);

    carousel.owlCarousel('destroy'); 
    carousel.owlCarousel({
        margin: 20,
        nav: true,
        dots: false,
        // autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1200: { items: 4 },
            1400: { items: 5 }
        }
    });
}

$(document).ready(function () {
    GetAllProducts();
});

// ***************************************************

async function addToCart(proId){
    console.log(proId);
    let res =  await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
        method:"POST",
        headers:{
            "Content-Type":"Application/json",
            "token":localStorage.getItem("Token")
        },
        body:JSON.stringify({
            productId: proId
        })
    });

    let finalRes =await res.json();
    if(finalRes.status =="success"){
         toastr["success"](finalRes.message)
    }
    console.log(finalRes);
}



let Products = []

async function DisPro(){
    let res =  await fetch(`https://ecommerce.routemisr.com/api/v1/products`,{
        method:"GET"
    });

    let finalRes = await res.json();
    Products = finalRes.data;
    disProducts()
    console.log(Products);
}

 DisPro();

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}