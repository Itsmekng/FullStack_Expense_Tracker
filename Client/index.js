if(localStorage.getItem('token') == null){
    window.location.href = "./Authenticate/signIn.html"
}

const URL_Endpoint = "http://localhost:3000";

window.addEventListener('load' , displayAllExpense);

async function handleSubmitForm(event){
    event.preventDefault();

    let Amount = event.target.ExpenseAmount.value;
    let Description = event.target.ExpenseDesc.value;
    let Category = event.target.ExpenseCategory.value;

    await axios.post(`${URL_Endpoint}/api/expense/addExpense`,{Amount, Description,Category},{headers: { 'Authorization': localStorage.getItem('token')}}).then((response) =>{
        displayExpense(response.data.data);
    }).catch((err) =>{
        console.log(err)
    })

    event.target.reset();
}

function displayExpense(data){
    const ul = document.getElementsByTagName('ul')[0];
    const li = document.createElement('li');

    li.innerHTML = `<div class="ms-2 me-auto">
            <div class="fw-bold">${data.Category} - <span class="text-success">${data.Amount} Rs</span></div>
            ${data.Description}
            </div>
            <button data-id="${data.id}" onclick="deleteExpense(event)" class="btn btn-outline-danger">Delete</button>`

    li.classList.add('list-group-item','d-flex','justify-content-between','align-items-start');

    ul.appendChild(li);
}

async function deleteExpense(event){
    event.preventDefault();
    const id = event.target.dataset.id

    await axios.delete(`${URL_Endpoint}/api/expense/deleteExpense/${id}`,{headers: { 'Authorization': localStorage.getItem('token')}}).then((response) => {
        if(response.data.message == 'Expense is deleted'){
            event.target.closest('li').remove();
        }
    }).catch((err) =>{
        console.log(err.response)
    })
}

async function displayAllExpense(){
    await axios.get(`${URL_Endpoint}/api/premuim/checkPlan`,{headers:{ 'Authorization':localStorage.getItem('token')}}).then((response) => {
        if(response.data.message == "User has premium plan"){
            let button = document.getElementById('goPremium');
            button.classList.add('d-none');
        }
    }).catch((err) =>{
        console.log(err)
        if(err.response.data.message == "User has no premium plan"){
            let aTag = document.getElementById('goToDashboard');
            aTag.classList.add('d-none');
        }
    })
    
    await axios.get(`${URL_Endpoint}/api/expense/getAllExpense`,{headers: { 'Authorization':localStorage.getItem('token')}}).then((response) =>{
        for(let i = 0; i < response.data.data.length; i++){
            displayExpense(response.data.data[i])
        }
    }).catch((err) =>{
        console.log(err.message);
    })

}

async function goPremium(event){
    try{
        event.preventDefault();

        const submitButton = event.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        
        let customerNumber = event.target.customerNumber.value;
    
        let response = await axios.post(`${URL_Endpoint}/api/premuim/goPremium`,{customerNumber},{headers:{'Authorization': localStorage.getItem('token')}});
        const cashfree = Cashfree({
            mode: "sandbox",
        });

        let orderId = response.data.data.order_id;

        let checkoutOptions = {
            paymentSessionId: response.data.data.payment_session_id,
            redirectTarget: "_modal",
        };
        let result = await cashfree.checkout(checkoutOptions);
  
        let paymentData = {
            result,
            orderId
        }
    
        let successMessage = await axios.post(`${URL_Endpoint}/api/premuim/paymentSuccess`,{paymentData},{headers:{'Authorization': localStorage.getItem('token')}});

        console.log(successMessage);

        submitButton.disabled = false;
        
    }catch(err){
        submitButton.disabled = true;
        console.log(err)
    }

}

async function AskAI(){

    const description = document.getElementById('ExpenseDesc').value;

    if(description == ""){
        alert("Please fill out description");
        return
    }

    let button = document.getElementById('basic-addon2');
    button.disabled = true

    await axios.post(`${URL_Endpoint}/api/expense/askAI`,{description},{headers:{'Authorization': localStorage.getItem('token')}}).then((response) =>{
        AIcategory(response.data.data);
    }).catch((err) =>{
        console.log(err);
    })
    button.disabled = false
    return
}

function AIcategory(data){

    data = JSON.parse(data);

    let select = document.getElementById('ExpenseCategory');
    select.innerHTML = "";
    for(let i = 0; i < data.length; i++){
        let option = document.createElement('option');

        option.value = data[i];
        option.innerHTML = data[i];

        select.appendChild(option);
    }

}
