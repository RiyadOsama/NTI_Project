import { tost } from './func_tostar.js';

let Products = [];

async function getProsWishlist() {
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  });
  let result = await res.json();
  Products = result.data;
  disProducts();
}

getProsWishlist();

function disProducts() {
  let products = ``;
  for (let i = 0; i < Products.length; i++) {
    products += `
     
        <tr>
            <td> <img src="${Products[i].imageCover}" alt=""> </td>
            <td>${Products[i].title}</td>
            <td>${Products[i].price}</td>
            <td>
                <button class="btn delete" onclick="delProduct('${Products[i]._id}')"><i class="fa-solid fa-heart-crack"></i></button>
                 <button class="btn add"  onclick="addToCart('${Products[i]._id}')">Add Cart</button>
            </td>
        </tr>
     
     `;
  }

  document.querySelector("#tbody").innerHTML = products;
}

async function delProduct(prId) {
  let res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${prId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    }
  );
  let result = await res.json();
  if(result.status=="success"){
    tost(result);
        let ids = result.data;
        let newPro = [];
        for (let i = 0; i < ids.length; i++) {
            for (let j = 0; j < Products.length; j++) {
                if(ids[i] == Products[j].id) {
                    newPro.push(Products[j]);
                }
            }
        }
        Products =  newPro;
        disProducts();
  }
}


async function addToCart(prId){
    let data ={
      productId:prId,
    }
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
    let result = await res.json();
    tost(result);
  }

// Expose functions to the global scope
window.delProduct = delProduct;
window.addToCart = addToCart;


// let spinner = document.querySelector('.spinner');
// setTimeout(()=>{
//     spinner.style.opacity = '0';
//     spinner.style.zIndex = '-1';
// },2000)

export function tost(result) {
  if (result.status === "success") {
    toastr.success(result.message || "Success");
  } else {
    toastr.error(result.message || "Something went wrong");
  }
}
