let resetBtn = document.querySelector(".reset");
let playBtn = document.querySelector(".play");
let lapBtn = document.querySelector(".lap");
let laps = document.querySelector(".laps");
let clearBtn = document.querySelector(".lap-clear");
let bg = document.querySelector(".outer-circle");

let hours = document.querySelector(".hour");
let minutes = document.querySelector(".min");
let seconds = document.querySelector(".sec");
let mseconds = document.querySelector(".msec");

let isPlay = false;
let hourCnt = 0, minCnt = 0, secCnt = 0, msecCnt = 0;
let timer = null, lapNum = 0;

const showBtn = () => {
    lapBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
}

// Stop function
const stop = () => {
    clearInterval(timer);
    timer = null;
    isPlay = false;
    playBtn.textContent = "Play";
    bg.classList.remove("animation-bg")
}

// Play function for playBtn
const play = () => {
    if(isPlay) {
        stop();
    } else {
        timer = setInterval(() => {
            msecCnt++;
            if(msecCnt === 100) {msecCnt = 0; secCnt++};
            if(secCnt === 60) {secCnt = 0; minCnt++};
            if(minCnt === 60) {minCnt = 0; hourCnt++};
            
            hours.textContent = hourCnt > 0? (hourCnt < 10? "0" + hourCnt : hourCnt) : "";

            minutes.textContent = (minCnt < 10? "0" : "" )+ minCnt + ":";
            seconds.textContent = (secCnt < 10? "0" : "" )+ secCnt + ".";
            mseconds.textContent = msecCnt < 10? "0" + msecCnt : msecCnt;
        }, 10);
        playBtn.innerHTML = "Pause";
        isPlay = true;
        showBtn();
        bg.classList.add("animation-bg");
    }
};

// Reset function for resetBtn
const reset = () => {
    stop();
    clearAll();
    
    lapBtn.classList.add("hidden");
    resetBtn.classList.add("hidden");

    hourCnt = minCnt = secCnt = msecCnt = 0;
    minutes.innerHTML = "";
    minutes.innerHTML = "00:";
    seconds.innerHTML = "00.";
    mseconds.innerHTML = "00";
}

// Adding laps
const lap = () => {
    // Creating elements
    const li = document.createElement("li");
    const num = document.createElement("span");
    const timer = document.createElement("span");
    
    // Setting class name
    li.className = "lap-item";
    num.className = "num";
    timer.className = "timer";

    // Setting content
    num.textContent = `# ${++lapNum}`;
    const hrs = hourCnt > 0 ? `${hourCnt}: ` : "";
    const mins = minCnt < 10 ? "0" + minCnt : minCnt;
    const secs = secCnt < 10 ? "0" + secCnt : secCnt;
    const msecs = msecCnt < 10 ? "0" + msecCnt : msecCnt;

    timer.textContent = `${hrs}${mins}: ${secs}. ${msecs}`;
    // Appending
    li.append(num, timer);
    requestAnimationFrame(() => {
        li.classList.add("lap-animate");
    });
    li.classList.remove("lap-animate")

    laps.prepend(li)

    clearBtn.classList.remove("hidden");
}

const clearAll = () => {
    laps.innerHTML = "";
    laps.append(clearBtn)
    clearBtn.classList.add("hidden");
    lapNum = 0;
}


playBtn.addEventListener("click", play)
resetBtn.addEventListener("click", reset)
lapBtn.addEventListener("click", lap)
clearBtn.addEventListener("click", clearAll)