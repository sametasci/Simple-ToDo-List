var dataList = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todoTask : [],
    completeTask : []
};

const completeIcon = '<i class="fas fa-check"></i>';
const deleteIcon = '<i class="far fa-trash-alt"></i>';

returnList();

document.getElementById('add-task').addEventListener('click', function(){
    var value = document.getElementById('task').value;
    if (value){
        addTask(value);
    }
});

function addTask(value){
    addTaskdataList(value);
    document.getElementById('task').value = '';
    dataList.todoTask.push(value);
    dataListStorage();
}

function returnList(){
    if(!dataList.todoTask.length && !dataList.completeTask.length){
        return;
    }

    for(var i = 0; i < dataList.todoTask.length; i++){
        var value = dataList.todoTask[i];
        addTaskdataList(value);
    }

    for(var j = 0; j < dataList.completeTask.length; j++){
        var value = dataList.completeTask[j];
        addTaskdataList(value, true);
    }
}

function dataListStorage(){
    localStorage.setItem('todoList', JSON.stringify(dataList));
}

function removeTask(){
    var parent = this.parentNode.parentNode.parentNode;
    var value = this.parentNode.parentNode.innerText;
    var id = parent.id;

    if(id === 'todo-task'){
        dataList.todoTask.splice(dataList.todoTask.indexOf(value), 1);
    }
    else{
        dataList.completeTask.splice(dataList.completeTask.indexOf(value), 1);
    }

    dataListStorage();

    parent.removeChild(this.parentNode.parentNode);
    
}

function completeTask(){
    var parent = this.parentNode.parentNode.parentNode;
    var value = this.parentNode.parentNode.innerText;
    var id = parent.id;

    if(id === 'todo-task'){
        //parent.removeChild(this.parentNode.parentNode);
        //document.getElementById('completed-task').insertBefore(this.parentNode.parentNode, document.getElementById('completed-task').childNodes[0]);
        dataList.todoTask.splice(dataList.todoTask.indexOf(value), 1);
        dataList.completeTask.push(value);
    }
    else{
        //parent.removeChild(this.parentNode.parentNode);
        //document.getElementById('todo-task').insertBefore(this.parentNode.parentNode, document.getElementById('todo-task').childNodes[0]);
        dataList.completeTask.splice(dataList.completeTask.indexOf(value), 1);
        dataList.todoTask.push(value);
    }

    dataListStorage();

    if(id === 'todo-task'){
        parent.removeChild(this.parentNode.parentNode);
        document.getElementById('completed-task').insertBefore(this.parentNode.parentNode, document.getElementById('completed-task').childNodes[0]);
        
    }
    else{
        parent.removeChild(this.parentNode.parentNode);
        document.getElementById('todo-task').insertBefore(this.parentNode.parentNode, document.getElementById('todo-task').childNodes[0]);
    }
}

function addTaskdataList(text, completed){

    if(completed){
        var list = document.getElementById('completed-task');
    }
    else{
        var list = document.getElementById('todo-task');
    }

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
