import { alarm } from "./alarm.js";
import { changeActiveBtn } from "./control.js";
import { showTime } from "./showTime.js";
import { state } from "./state.js";
import { showToDo, updateTodo } from "./todo.js";
const title = document.title;

export const startTimer = () => {
    const countDown = new Date().getTime() + state.timeLeft * 1000;

    state.timerId = setInterval(() => {
        state.timeLeft -= 1;
        showTime(state.timeLeft);
        document.title = state.timeLeft;

        if(!(state.timeLeft % 5)) {
            const nowTime = new Date().getTime();
            state.timeLeft = Math.floor((countDown - nowTime)/1000);
        }

        if(state.timeLeft > 0 && state.isActive) {
            return
        }

        clearInterval(state.timerId);
        document.title = title;

        if(state.status === "work") {
            state.activeTodo.pomodoro++
            updateTodo(state.activeTodo);

            if(state.activeTodo.pomodoro % state.countWork) {
                state.status = "break";
            }else {
                state.status = "relax";
            }      

        }else {
            state.status = "work";
        }
        alarm();
        state.timeLeft = state[state.status] * 60;
        changeActiveBtn(state.status);
        showToDo();
        startTimer();

    },1000);
};