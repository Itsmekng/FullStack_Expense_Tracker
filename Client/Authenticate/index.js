// For creating users
async function handleSubmitFormForSignUp(event){
    event.preventDefault();

    let name = event.target.Full_Name.value;
    let email = event.target.Email.value;
    let password = event.target.Password.value;

    await axios.post(`${URL_Endpoint}/api/user/createAccount` , {name,email,password}).then((response) =>{
        localStorage.setItem('token',response.data.data);
        alert(response.data.message);
        window.location.href = `${URL_Client}/Client/index.html`
    }).catch((err) =>{
        if(err.response.data.message == "User already exist"){
            alert(err.response.data.message);
        }else{
            console.log(err.response);
        }
    });

    event.target.reset();
}

// user login
async function handleSubmitFormForSignIn(event){
    event.preventDefault();

    let email = event.target.Email.value;
    let password = event.target.Password.value;

    await axios.post(`${URL_Endpoint}/api/user/loginAccount` , {email,password}).then((response) =>{
        localStorage.setItem('token',response.data.data);
        alert(response.data.message);
        window.location.href = `${URL_Client}/Client/index.html`
    }).catch((err) =>{
        if(err.response.data.message == "User not found" || err.response.data.message == "User not authorized"){
            alert(err.response.data.message);
        }else{
            console.log(err.response);
        }
    });

    event.target.reset();
}

async function forgetPassword(event) {
    
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    let userEmail = event.target.forgetEmail.value;

    await axios.post(`${URL_Endpoint}/api/sendemail/password/forgotpassword`,{userEmail}).then((response) => {
        alert(response.data.message);
    }).catch((err) => {
        if(err.response.data.message == 'User not found with this email !!!'){
            alert('User not found with this email !!!')
        }else{
            console.log(err);
        }
    })

    submitButton.disabled = false;

    const modalElement = document.getElementById("staticBackdrop");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.hide();

}