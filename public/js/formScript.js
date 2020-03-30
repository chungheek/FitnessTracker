document.addEventListener('DOMContentLoaded', updateRow);
document.addEventListener('DOMContentLoaded', loadForm);
document.addEventListener('DOMContentLoaded', updateFormSubmitted);

var storage = window.localStorage;

function updateRow() {
    let updateRows = document.querySelectorAll('.update');
    updateRows.forEach(updateBtn => {
        updateBtn.addEventListener('click', event => {
            let id = updateBtn.parentElement.getAttribute('id');
            let parent = updateBtn.parentNode;
            storage.setItem('id', id);
            storage.setItem('name', parent.children[1].innerText);
            storage.setItem('reps', parent.children[3].innerText);
            storage.setItem('weight', parent.children[5].innerText);
            storage.setItem('unit', parent.children[7].innerText);
            storage.setItem('date', parent.children[9].innerText);
            window.location = '/form.html';
        });
    });
}


function loadForm() {
    if(document.title == 'Update Form') {
        document.getElementById('exerciseName').value = storage.getItem('name');
        document.getElementById('reps').value = storage.getItem('reps');
        document.getElementById('weight').value = storage.getItem('weight');
        if(storage.getItem('unit') == 'lbs') {
            document.getElementById('lbs').checked = 'checked';
        }
        else {
            document.getElementById('kg').checked = 'checked';
        }
        let date = new Date(storage.getItem('date'));
        let formatted_date = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + (date.getDate())).slice(-2);
        document.getElementById('dateCompleted').value = formatted_date;
    }
}

function updateFormSubmitted() {
    if(document.title == 'Update Form') {
        let submitBtn = document.getElementById('formSubmit');
        submitBtn.addEventListener('click', event => {
            let request = new XMLHttpRequest();
            let id = storage.getItem('id');
            let name = document.getElementById('exerciseName').value;
            let reps = document.getElementById('reps').value;
            let weight = document.getElementById('weight').value;
            let unit = '';
            if(document.getElementById('lbs').checked) {
                unit = 'lbs';
            }
            else {
                unit = 'kg';
            }
            let date = document.getElementById('dateCompleted').value;
            let data = {id: id, name: name, reps: reps, weight: weight, unit: unit, date: date};
            request.open('PUT', '/', true);
            request.setRequestHeader('Content-Type', 'application/json');
            document.getElementById('loading').innerText = 'Loading, please wait...';
            request.send(JSON.stringify(data));
            window.location = '/';
            event.preventDefault();
        });
    }
}