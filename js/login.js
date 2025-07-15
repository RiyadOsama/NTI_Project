var userEmail = document.getElementById('userEmail');
var userPass = document.getElementById('userPass');
var btnLogin = document.querySelector('.btn');

btnLogin.addEventListener('click',function(){
    signIn();
})

async function signIn(){

    var userInfo = {
        email:userEmail.value,
        password:userPass.value,
    }

    var res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`,{
        method:"POST",
        headers:{'Content-Type':'Application/json'},
        body:JSON.stringify(userInfo)
    })

    var finalRes = await res.json();
    if(finalRes.message == "success"){
        toastr["success"]("User Successfully Logined")
        localStorage.setItem("Token",finalRes.token);
        setTimeout(()=>{
            window.location.href = 'index.html';
        },3000)
    }else{
        console.log("object");
         toastr["error"](finalRes.message);
    }
    console.log(finalRes);
    
}

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