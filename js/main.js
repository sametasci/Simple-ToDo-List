const completeIcon = '<i class="fas fa-check"></i>';
const deleteIcon = '<i class="far fa-trash-alt"></i>';

document.getElementById('add-task').addEventListener('click', function(){
    var value = document.getElementById('task').value;
    if (value){
        addTask(value);
        document.getElementById('task').value = '';
    }
});

function removeTask(){
    var parent = this.parentNode.parentNode.parentNode;
    parent.removeChild(this.parentNode.parentNode);
    
}

function completeTask(){
    var parent = this.parentNode.parentNode.parentNode;
    var id = parent.id;

    if(id === 'todo-task'){
        parent.removeChild(this.parentNode.parentNode);
        document.getElementById('completed-task').insertBefore(this.parentNode.parentNode, document.getElementById('completed-task').childNodes[0]);
    }
    else{
        parent.removeChild(this.parentNode.parentNode);
        document.getElementById('todo-task').insertBefore(this.parentNode.parentNode, document.getElementById('todo-task').childNodes[0]);
    }
}

function addTask(text){
    var list = document.getElementById('todo-task');
    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons-of-task');

    var remove =  document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = deleteIcon;

    // Remove Task
    remove.addEventListener('click', removeTask);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeIcon;

    // Complete Task
    complete.addEventListener('click', completeTask);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);
    list.insertBefore(item, list.childNodes[0]);
}
