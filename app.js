
const taskInput = document.querySelector("#new-task");
const addButton = document.querySelector('.task-list__button')
const incompleteTaskHolder = document.querySelector("#incomplete-tasks");//ul of #incompleteTasks
const completedTasksHolder = document.querySelector("#completed-tasks");//completed-tasks


const createNewTaskElement = function(taskString) {

    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    listItem.classList.add('task-list__item')

    label.innerText = taskString;
    label.className = 'task-list__task';

    checkBox.type = "checkbox";
    checkBox.classList.add('task-list__check')

    editInput.type = "text";
    editInput.className = "task-list__input";
    editButton.innerText = "Edit";
    editButton.classList.add('task-list__button')
    editButton.classList.add('task-list__button_edit')

    deleteButton.className = ".task-list__button_delete";
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.classList.add('task-list__delete-button-image')
    deleteButton.appendChild(deleteButtonImg);
    deleteButton.classList.add('task-list__button')
    deleteButton.classList.add('task-list__button_delete')

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

const addTask = function() {

    if (!taskInput.value) return;

    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = null;
}


const editTask = function(){

    const listItem = this.parentNode;

    var editInput = listItem.querySelector('input[type = text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector('.task-list__button_edit');
    var containsClass = listItem.classList.contains("task-list__item_edit");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    }else{
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("task-list__item_edit");
};


//Delete task.
var deleteTask = function(){
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted = function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest = function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents = function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox = taskListItem.querySelector("input[type = checkbox]");
    var editButton = taskListItem.querySelector('.task-list__button_edit');
    var deleteButton = taskListItem.querySelector('.task-list__button_delete');
    // console.log(editButton,deleteButton )


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i = 0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.