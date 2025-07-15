var userName = document.getElementById('userName');
var userEmail = document.getElementById('userEmail');
var userPass = document.getElementById('userPass');
var userRePass = document.getElementById('userRePass');
var userPhone = document.getElementById('userPhone');
var btnRegister = document.querySelector('.btn');

btnRegister.addEventListener('click',function(){
    signUp();
})
async function signUp(){

    var userInfo = {
        name: userName.value,
        email: userEmail.value,
        password: userPass.value,
        rePassword: userRePass.value,
        phone: userPhone.value
    }

    console.log(userInfo);

    var res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(userInfo)
    })

    var finalRes = await res.json();
    if(finalRes.message == "success"){
        window.location.href = 'login.html';
    }
    console.log(finalRes);
    
}