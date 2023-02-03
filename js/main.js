"use strict"
import { initControl } from "./control.js";
import { state } from "./state.js";
import { createToDo } from "./todo.js";


const initPomodoro = () => {
    createToDo();
    initControl();
}

initPomodoro();


