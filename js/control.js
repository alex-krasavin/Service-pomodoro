import { showTime } from "./showTime.js";
import { startTimer } from "./startTimer.js";
import { state } from "./state.js";

const btnStart = document.querySelector(".control__btn_start");
const btnStop = document.querySelector(".control__btn_stop");
const btnState = document.querySelectorAll(".navigation__btn");
// const navigationBtns = document.querySelector(".navigation");

export const changeActiveBtn = (stateBtn) => {
    state.status = stateBtn;
    const btn = document.querySelector(`[data-use="${stateBtn}"]`);
    btnState.forEach(btn => btn.classList.remove("navigation__btn_active"));
    btn.classList.add("navigation__btn_active");
}

// const changeActiveBtnByClick = (currentBtn) => {
//     btnState.forEach(btn => btn.classList.remove("navigation__btn_active"));
//     currentBtn.classList.add("navigation__btn_active");
//     state.status = currentBtn.getAttribute("data-use");
//     state.timeLeft = state[state.status] * 60;
//     showTime(state.timeLeft)
// }

const start = () => {
    if(state.isActive) {
        clearInterval(state.timerId)
        state.isActive = false;
        btnStart.textContent = "Старт";
    }else {
        state.isActive = true;
        startTimer();
        btnStart.textContent = "Пауза";
    }
}

export const stop = () => {
    clearInterval(state.timerId)
    state.isActive = false;
    btnStart.textContent = "Старт";
    state.timeLeft = state[state.status] * 60;
    showTime(state.timeLeft)
}

export const initControl = () => {
    btnState.forEach(btn => {
        btn.addEventListener("click",(e)=> {
            changeActiveBtn(e.target.dataset.use)
            stop();
        })
    })
    // navigationBtns.addEventListener("click",(e)=>changeActiveBtnByClick(e.target));
    btnStart.addEventListener("click",start);
    btnStop.addEventListener("click",stop);
    showTime(state.timeLeft);
}