let spinner = document.querySelector('.spinner');
setTimeout(() => {
    spinner.style.opacity = '0';
    spinner.style.zIndex = '-1';
}, 2000);

let cartPro = []

async function CartPro(){
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:{
            "Content-Type":"Application/json",
            "token":localStorage.getItem('Token')
        }

    });
    let finalRes = await res.json();
    console.log(finalRes.data.products);
    cartPro = finalRes.data.products;
    console.log(cartPro);
    disProducts();
}

CartPro();


async function deletePro(proId){
    console.log(proId);
    let res =  await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${proId}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"Application/json",
            "token":localStorage.getItem("Token")
        }
    });

    let finalRes =await res.json();
    if(finalRes.status =="success"){
         toastr["success"]("Product Deleted Successfully");
         cartPro = finalRes.data.products;
        setTimeout(()=>{
           window.location.href= "cart.html"
        },2000)
    }
    console.log(finalRes);
}


function disProducts(){
    let Products = ``;
    for (let i = 0; i < cartPro.length; i++) {
        Products +=`
         <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="pro-img">
                              <img class="w-100" src="${cartPro[i].product.imageCover}" alt="" />
                            </div>
                            <div class="pro-inf text-white">
                              <span class="pro-brand">${cartPro[i].product.brand.name}</span>
                              <a href="#" class="my-1 text-white"
                                >${cartPro[i].product.title}</a
                              >
                              <span class="pro-price">$25</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex align-items-center  h-100">
                            <div class="pro-updates d-flex">
                              <input type="text" class="form-control border-0" value="${cartPro[i].count}" />
                              <div class="pro-upd-controls">
                                <button class="btn  negtive">-</button>
                                <button class="btn  positive">+</button>
                              </div>
                            </div>
                            <div class="pro-controls ms-2">
                              <button class="btn btn-warning">
                                <i class="fa-solid fa-trash" onclick="deletePro('${cartPro[i].product.id}')"></i>
                              </button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex justify-content-center align-items-center h-100">
                            <span class="pro-total">${cartPro[i].price}</span>
                        </div>
                    </td>
                  </tr>
        `
        
    }

    document.querySelector("tbody").innerHTML = Products
}


