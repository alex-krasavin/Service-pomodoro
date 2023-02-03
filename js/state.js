const WORK_TIME = 2;
const BREAK_TIME = 1;
const RELAX_TIME = 3;

export const state = {
    work: WORK_TIME,
    break: BREAK_TIME,
    relax:RELAX_TIME,
    status:"work",
    countWork:4,
    timeLeft: WORK_TIME * 60,
    isActive: false,
    timerId: null
}