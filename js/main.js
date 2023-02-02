"use strict"
import { initControl } from "./control.js";
import { state } from "./state.js";


const initPomodoro = () => {
    initControl();

    state.activeTodo = {
        pomodoro:2,
        id:"default",
        title:"Помодоро"
    }
}

initPomodoro();