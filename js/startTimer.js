import { alarm } from "./alarm.js";
import { changeActiveBtn } from "./control.js";
import { showTime } from "./showTime.js";
import { state } from "./state.js";
import { countPomodoro, updateTodo } from "./todo.js";

export const startTimer = () => {
    state.timeLeft -= 5;
    showTime(state.timeLeft);

    if(state.timeLeft > 0 && state.isActive) {
        state.timerId = setTimeout(startTimer,1000);
    }

    if(state.timeLeft <= 0) {
        if(state.status === "work") {
            state.activeTodo.pomodoro++
            countPomodoro.textContent = state.activeTodo.pomodoro
            if(state.activeTodo.pomodoro % state.countWork) {
                state.status = "break";
            }else {
                state.status = "relax";
            }      
        }else {
            state.status = "work";
        }
        console.log(state.activeTodo.pomodoro)
        alarm();
        state.timeLeft = state[state.status] * 60;
        changeActiveBtn(state.status);
        startTimer();
        // updateTodo(state.activeTodo,state.activeTodo.pomodoro);
    }
}