import { addZero } from "./util.js";

export const showTime = (seconds) => {
    const minutesElem = document.querySelector(".time__minutes");
    const secondsElem = document.querySelector(".time__seconds");
    minutesElem.textContent = addZero(Math.floor(seconds/60));
    secondsElem.textContent = addZero(seconds % 60);
}