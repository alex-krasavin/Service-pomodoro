import { alarm } from "./alarm.js";
import { showTime } from "./showTime.js";
import { state } from "./state.js";

export const startTimer = () => {
    state.timeLeft--;
    showTime(state.timeLeft);

    if(state.timeLeft > 0 && state.isActive) {
        state.timerId = setTimeout(startTimer,1000);
    }

    if(state.timeLeft <= 0) {
        alarm();
    }
}