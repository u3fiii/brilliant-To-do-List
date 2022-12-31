//Selectors

const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');

//Functions 

const addTodo = (e) => {
    e.preventDefault();
    //Creating Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //creating Todo Text
    const todoText = document.createElement('p');
    todoText.innerText = todoInput.value;
    todoText.classList.add('todo-text');
    todoDiv.appendChild(todoText);
    //creating Todo trash
    const trash = document.createElement('button');
    trash.innerHTML = '<i class="fas fa-trash"></i>'
    trash.classList.add('trash');
    todoDiv.appendChild(trash);
    //creating Todo done
    const done = document.createElement('button');
    done.innerHTML = '<i class="fas fa-check"></i>'
    done.classList.add('done');
    todoDiv.appendChild(done);
    //appending to List
    todoList.appendChild(todoDiv);
    //Clearing the Input
    todoInput.value = '';
    //saving in Local Storage
    saveLocalTodos(todoText.innerText);
}

const deleteCheck = (e) => {
    let item = e.target.parentElement;
    if(e.target.classList[0] === 'trash') {
            item.remove();
            removeLocalStorage(item);
    } else if (e.target.classList[0] === 'done') {
        item.classList.toggle('completed');
    }
}



const filterTodo = (e) => {
    const selectedFilter = e.target.value;
    const todos = todoList.children;
    console.log( selectedFilter);

    for (let i = 0; i< todos.length; i++) {
        switch(selectedFilter) {
            case 'all':
                todos[i].style.display = 'flex';
                break;
            case 'completed':
                todos[i].style.display = 'flex';
                if(todos[i].classList.contains('completed')) {
                    todos[i].style.diplay = 'flex';
                } else {
                    todos[i].style.display = 'none';
                }
                break;
            case 'uncompleted':
                todos[i].style.display = 'flex';
                if(!todos[i].classList.contains('completed')) {
                    todos[i].style.diplay = 'flex';
                } else {
                    todos[i].style.display = 'none';
                }
                break;
        }
    }
    
};

const saveLocalTodos = (todo) => {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

const removeLocalStorage = (todo) => {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoText = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoText), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

const getTodos = () => {

    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos')) ;
    }
    
    todos.forEach((todo) =>{
        // Creating Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //creating Todo Text
        const todoText = document.createElement('p');
        todoText.innerText = todo;
        todoText.classList.add('todo-text');
        todoDiv.appendChild(todoText);
        //creating Todo trash
        const trash = document.createElement('button');
        trash.innerHTML = '<i class="fas fa-trash"></i>'
        trash.classList.add('trash');
        todoDiv.appendChild(trash);
        //creating Todo done
        const done = document.createElement('button');
        done.innerHTML = '<i class="fas fa-check"></i>'
        done.classList.add('done');
        todoDiv.appendChild(done);
        //appending to List
        todoList.appendChild(todoDiv);
        //Clearing the Input
        todoInput.value = '';
    })
}



//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoFilter.addEventListener('click', filterTodo);
