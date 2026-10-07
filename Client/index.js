window.addEventListener('load' , displayAllExpense);

let table = null;

async function handleSubmitForm(event){
    event.preventDefault();

    let Amount = event.target.ExpenseAmount.value;
    let Description = event.target.ExpenseDesc.value;
    let Category = event.target.ExpenseCategory.value;
    let Notes = event.target.ExpenseNotes.value;

    await axios.post(`${URL_Endpoint}/api/expense/addExpense`,{Amount, Description,Category,Notes},{headers: { 'Authorization': localStorage.getItem('token')}}).then((response) =>{
        displayExpense(response.data.data);
    }).catch((err) =>{
        console.log(err)
    })

    event.target.reset();
}


async function displayAllExpense(){

    if(localStorage.getItem('token') == null){
        window.location.href = `${URL_Client}/Client/Authenticate/signIn.html`
    }

    let isPremium = false

    await axios.get(`${URL_Endpoint}/api/premuim/checkPlan`,{headers:{ 'Authorization':localStorage.getItem('token')}}).then((response) => {
        if(response.data.message == "User has premium plan"){
            let button = document.getElementById('goPremium');
            button.classList.add('d-none');
            isPremium = true
        }
    }).catch((err) =>{
        if(err.response.data.message == "User has no premium plan"){
            let aTag = document.getElementById('goToDashboard');
            aTag.classList.add('d-none');
            isPremium = false
        }
    })

    table = new DataTable('#example', {
        ajax: {
            url: `${URL_Endpoint}/api/premuim/getMyExpense`,
            type: 'GET',

            data:function(d){
                d.from = document.getElementById('from').value,
                d.to = document.getElementById('to').value
            },

            beforeSend: function (xhr) {
                const token = localStorage.getItem('token');

                xhr.setRequestHeader('Authorization', token);
            }
        },
        scrollX: true,
        responsive: true,
        processing: true,
        serverSide: true,
        searching: false,
        lengthMenu: [5, 10, 25, 50, 100, -1],
        stateSave: true,
        layout: {
            topStart: {
                pageLength: true,
                buttons: isPremium ? [
                    'copy',
                    'csv',
                    'excel',
                    'pdf',
                    'print'
                ] : []
            }
        },
        
        drawCallback: function () {
            const api = this.api();
            const pageInfo = api.page.info();
            if (
                pageInfo.page > pageInfo.pages - 1 &&
                pageInfo.pages > 0
            ) {
                api.page(pageInfo.pages - 1).draw('page');
            }
        }
    }); 
}

async function goPremium(event){
    const submitButton = event.target.querySelector('button[type="submit"]');
    try{
        event.preventDefault();

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
    
        await axios.post(`${URL_Endpoint}/api/premuim/paymentSuccess`,{paymentData},{headers:{'Authorization': localStorage.getItem('token')}});
        
        submitButton.disabled = false;
        
        window.location.reload();
        
    }catch(err){
        submitButton.disabled = false;
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

function dateFilter(){
    table.ajax.reload();
    return true
}

function displayExpense(data){
    const tr = document.createElement('tr');

    tr.innerHTML = `<td role="cell" class="sorting_1">${data.Amount}</td>
                    <td role="cell">${data.Category}</td>
                    <td role="cell">${data.Description}</td>
                    <td role="cell">${data.Notes}</td>
                    <td class="dt-type-numeric" role="cell">${data.createdAt}</td>
                    <td role="cell">
                        <button data-id="${data.id}" onclick="deleteExpense(event)" class="btn btn-outline-danger">Delete</button>
                    </td>
                    `
    tr.classList.add('row');
    table.row.add(tr).draw(false);
}

async function deleteExpense(event){
    event.preventDefault();
    const id = event.target.dataset.id

    await axios.delete(`${URL_Endpoint}/api/expense/deleteExpense/${id}`,{headers: { 'Authorization': localStorage.getItem('token')}}).then((response) => {
        if(response.data.message == 'Expense is deleted'){
            table.row(event.target.closest('tr')).remove().draw(false);
        }
    }).catch((err) =>{
        console.log(err.response)
    })
}