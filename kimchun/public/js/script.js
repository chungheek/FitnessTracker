document.addEventListener('DOMContentLoaded', deleteRow);

function deleteRow() {
    let deleteElements = document.querySelectorAll('.delete');
    deleteElements.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', event => {
            let id = deleteBtn.parentElement.getAttribute('id');
            let data = {id: id};
            let request = new XMLHttpRequest();
            request.open('DELETE', '/', true);
            request.setRequestHeader('Content-Type', 'application/json');
            let parent = deleteBtn.parentNode;
            parent.remove();
            request.send(JSON.stringify(data));
            event.stopPropagation();
        });
    });
}
