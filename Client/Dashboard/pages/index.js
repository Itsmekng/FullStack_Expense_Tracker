if(localStorage.getItem('token') == null){
    window.location.href = "./Authenticate/signIn.html"
}

const URL_Endpoint = "http://localhost:3000";

window.addEventListener('load' , displayAllExpense);

async function displayAllExpense() {
    await axios.get(`${URL_Endpoint}/api/premuim/getAllExpenses`,{headers:{ 'Authorization':localStorage.getItem('token')}}).then((response) => {
        for(let i = 0; i < response.data.data.length; i++){
            addExpenseData(response.data.data[i])
        }
    }).catch((err) => {
        console.log(err)
    });
}

function addExpenseData(data) {
    let tbody = document.getElementsByClassName('tableBody')[0];
    let tr = document.createElement('tr');

    tr.innerHTML = `<tr>
                        <td>${data.name}</td>
                        <td>${data.totalExpense}</td>
                    </tr>`
    
    tbody.appendChild(tr);
}