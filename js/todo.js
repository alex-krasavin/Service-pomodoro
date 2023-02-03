import { changeActiveBtn } from "./control.js";
import { stop } from "./control.js";
import { state } from "./state.js";

const titleElem = document.querySelector(".title");
export let countPomodoro = document.querySelector(".count_num");
const toDoListElem = document.querySelector(".todo__list");

const btnaddTask = document.createElement("li");
btnaddTask.classList.add("todo__item");
btnaddTask.innerHTML = `
<button class="todo__add">Добавить новую задачу</button>
`;

const getToDo = () => {
    const toDoList = JSON.parse(localStorage.getItem("pomodoro") || "[]");
    return toDoList;
}

export const updateTodo = (todoList) => {
    localStorage.setItem("pomodoro",JSON.stringify(todoList));
}

const createToDoItem = (todo) => {
    if(todo.id !== "default") {
        const todoItem = document.createElement ("li");
        todoItem.classList.add("todo__item");
        todoItem.innerHTML = `
        <div class="todo__item-wrapper">
            <button class="todo__btn" data-id =${todo.id}>${todo.title}</button>
            <button class="todo__edit" data-id =${todo.id} aria-label="Редактировать"></button>
            <button class="todo__del" data-id =${todo.id} aria-label="Удалить"></button>
        </div>
        `;
        toDoListElem.append(todoItem);
    }
    return todo;
}

const showToDo = () => {
    titleElem.textContent = state.activeTodo.title;
    countPomodoro.textContent = state.activeTodo.pomodoro;
}

const addTodo = (title) => {
    const todo = {
        title,
        pomodoro:0,
        id:Math.random().toString(16).substring(2,8)
    }

    const todoList = getToDo();
    todoList.push(todo);
    localStorage.setItem("pomodoro",JSON.stringify(todoList));

    return todo
}

const renderToDoList = (arrList) => {
    toDoListElem.textContent = "";
    arrList.forEach(createToDoItem);
    toDoListElem.prepend(btnaddTask)
}

export const createToDo = () => {
    const toDoList = getToDo();
    if(!toDoList.length) {
        state.activeTodo = {
            pomodoro:0,
            id:"default",
            title:"Помодоро"
        }
    }else {
        state.activeTodo = toDoList[toDoList.length - 1];
    }
    showToDo();
    renderToDoList(toDoList);

    toDoListElem.addEventListener("click", (e) => {
        const target = e.target;

        if(target.classList.contains("todo__del")) {
            const tasks = getToDo();
            const newTasks = tasks.filter(task => task.id !== target.dataset.id);
            updateTodo(newTasks)
            target.closest(".todo__item").remove();
            if(newTasks.length) {
                titleElem.textContent = newTasks[newTasks.length -1].title
            }else {
                titleElem.textContent = "Помодоро";
            }
        }

        if(target.classList.contains("todo__edit")) {
            const currentTodo = target.previousElementSibling;
            const title = prompt("Ведите имя задачи",currentTodo.textContent);
            currentTodo.textContent = title;
            titleElem.textContent = title;
            const tasks = getToDo();
            tasks.forEach(task => task.id === currentTodo.dataset.id ? task.title = title : task.title);
            updateTodo(tasks);
        }

        if(target.classList.contains("todo__btn")) {
            const tasks = getToDo();
            const currentTask = tasks.find(task => task.id === target.dataset.id);
            state.activeTodo = currentTask;
            showToDo();
            changeActiveBtn("work");
            stop();
            // const currentTask = tasks.filter(task => task.id === target.dataset.id)[0];
            // titleElem.textContent = currentTask.title;
            // countPomodoro.textContent = currentTask.pomodoro;
        }

        if(target.classList.contains("todo__add")) {
            let title = prompt("Ведите имя задачи")?.trim();
            const todo = addTodo(title);
            createToDoItem(todo);
        }


    })
}

