import { state } from "./state.js";

const audio = {
    break:new Audio("./audio/eralash.mp3"),
    work:new Audio("./audio/ritm.mp3"),
    relax:new Audio("./audio/deep-end.mp3")
} 


export const alarm = () => {
    audio[state.status].play();
}