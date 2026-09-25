const URL_Endpoint = "http://localhost:3000";

async function handleSubmitForm(event){
    event.preventDefault();

    let name = event.target.Full_Name.value;
    let email = event.target.Email.value;
    let password = event.target.Password.value;

    await axios.post(`${URL_Endpoint}/api/user/addUser` , {name,email,password}).then((response) =>{
        alert(response.data.message);
    }).catch((err) =>{
        if(err.response.data.error == "User is already Existed"){
            alert(err.response.data.error);
        }else{
            console.log(err.response);
        }
    });

    event.target.reset();
}