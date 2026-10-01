const URL_Endpoint = "http://localhost:3000";

async function handleSubmitFormForSignUp(event){
    event.preventDefault();

    let name = event.target.Full_Name.value;
    let email = event.target.Email.value;
    let password = event.target.Password.value;

    await axios.post(`${URL_Endpoint}/api/user/createAccount` , {name,email,password}).then((response) =>{
        localStorage.setItem('token',response.data.data);
        alert(response.data.message);
        window.location.href = 'http://127.0.0.1:5500/Client/index.html'
    }).catch((err) =>{
        if(err.response.data.message == "User already exist"){
            alert(err.response.data.message);
        }else{
            console.log(err.response);
        }
    });

    event.target.reset();
}

async function handleSubmitFormForSignIn(event){
    event.preventDefault();

    let email = event.target.Email.value;
    let password = event.target.Password.value;

    await axios.post(`${URL_Endpoint}/api/user/loginAccount` , {email,password}).then((response) =>{
        localStorage.setItem('token',response.data.data);
        alert(response.data.message);
        window.location.href = 'http://127.0.0.1:5500/Client/index.html'
    }).catch((err) =>{
        if(err.response.data.message == "User not found" || err.response.data.message == "User not authorized"){
            alert(err.response.data.message);
        }else{
            console.log(err.response);
        }
    });

    event.target.reset();
}

function forgetPassword(event) {
    
    event.preventDefault();

    let userEmail = event.target.forgetEmail.value;

    axios.post(`${URL_Endpoint}/api/sendemail/password/forgotpassword`,{userEmail}).then((response) => {
        alert(response.data.message);
        const modalElement = document.getElementById("staticBackdrop");
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.hide();
    }).catch((err) => {
        console.log(err);
    })

}