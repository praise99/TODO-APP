//SELECTORS
const todoInput=document.querySelector(".input-list");
const todobutton=document.querySelector(".tick");
const todoList=document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo");


//EVENT LISTENER
document.addEventListener("DOMContentLoaded", getTodos);
todobutton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);

//FUNTIONS
function addTodo(event){
    event.preventDefault();

   if(todoInput.value !==""){
      //creating TODO DIV
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo=document.createElement("li");
    newTodo.innerText=todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //ADD todo to local storage
    saveLocalTodos(todoInput.value)

    //checkmark button
    const completedButton=document.createElement("button");
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //thrash button
    const thrashButton=document.createElement("button");
    thrashButton.innerHTML=`<i class="fas fa-trash"></i>`;
    thrashButton.classList.add("thrash-btn");
    todoDiv.appendChild(thrashButton);

    //append to list
    todoList.appendChild(todoDiv);
    //clear input field
    todoInput.value="";
   }
}

function deleteCheck(e){
    const item=e.target;
    //DELETE TODO
    if(item.classList[0]==="thrash-btn"){
        const todo=item.parentElement;
        todo.classList.add("fall") 
        removeLocalTodos(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        })
    }

    //CHECK MARK
    if(item.classList[0]==="complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }

}


function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
          case "all":
            todo.style.display = "flex";
            break;
          case "completed":
            if (todo.classList.contains("completed")) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
            break;
          case "uncompleted":
            if (!todo.classList.contains("completed")) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
        }
      });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const thrashButton=document.createElement("button");
    thrashButton.innerHTML=`<i class="fas fa-trash"></i>`;
    thrashButton.classList.add("thrash-btn");
    todoDiv.appendChild(thrashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}







