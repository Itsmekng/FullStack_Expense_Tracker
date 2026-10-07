window.addEventListener('load' , displayAllExpense);

async function displayAllExpense() {

    if(localStorage.getItem('token') == null){
        window.location.href = `${URL_Client}/Client/Authenticate/signIn.html`
    }

    new DataTable('#example', {
        ajax: {
            url: `${URL_Endpoint}/api/premuim/getAllExpenses`,
            type: 'GET',
            beforeSend: function (xhr) {
                const token = localStorage.getItem('token');
                xhr.setRequestHeader('Authorization', token);
            }
        },
        processing: true,
        serverSide: true,
        searching: false,
        lengthMenu: [5, 10, 25, 50, 100, -1],
        stateSave: true,
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

