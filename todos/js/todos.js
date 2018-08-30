var todoList = []

addTodos = () => {
    const ele = document.getElementById('todos');
    var todos = ele.value;
    console.log(todos);

    todoList.push({
        completed: false,
        todoWork: ele.value
    })

    createTodoList(); // To create the to do list.

    /* const node = document.createElement('li');
    const textNode = document.createTextNode(ele.value);
    node.appendChild(textNode)

    todoEle.appendChild(node); */

    console.log(todoList);

    ele.value = '';
}

remove = (e) => {
    console.log('>>>>>>', e.parentNode.id)
    /* e.parentNode.id is used to grab the index of element */
    todoList.splice(e.parentNode.id, 1);
    console.log(todoList);
    createTodoList();
}

workCompleted = (e) => {
    todoList[e.id].completed = !todoList[e.id].completed;
    console.log(todoList)
    createTodoList();
}

createTodoList = () => {
    const todoEle = document.getElementById('todo-list');
    var startingTag = '<input  type="checkbox" class="checkbox" onChange="workCompleted(this)" id="';
    var endTag = '<span  class="remove" onClick="remove(this)">X</span>' + '</li>';
    var str = '';

    for (i in todoList) {
        if (todoList[i].completed) {
            str += '<li draggable="true"  class="work-completed" id="' + i + '" >' + 
                    startingTag + i + '" checked />' + '<del  class="todo-names">' + todoList[i].todoWork + '</del>' + endTag;
        }
        else {
            str += '<li draggable="true" id="' + i + '" >' + startingTag + i + '" />' + 
                        '<span class="todo-names">' + todoList[i].todoWork + '</span>' + endTag;
        }
    }
    todoEle.innerHTML = str;
}

var draggingEleId = '';
var dragOverEleId = '';

document.addEventListener('dragstart', function (event) {
    event.target.style.backgroundColor = 'orange';
    event.target.parentNode.style = 'orange';
    console.log(event.target);
    draggingEleId = event.target.id;
})

var dragEle = '';
document.addEventListener('dragover', function () {
    dragOverEleId = event.target.id;
})

document.addEventListener('dragend', function (event) {
    event.target.style.backgroundColor = 'royalblue';
    sort(draggingEleId, dragOverEleId);
})

sort = (draggingEleId, dragOverEleId) => {
    console.log(dragOverEleId)
    if( draggingEleId && dragOverEleId ) {
        var temp = todoList[draggingEleId];
        todoList[draggingEleId] = todoList[dragOverEleId];
        todoList[dragOverEleId] = temp;
    }
    createTodoList()
}