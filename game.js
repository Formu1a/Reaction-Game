let $start = document.querySelector("#start");
let $inp = document.querySelector("#game-time");
let $timeHeader = document.querySelector("#time-header");
let $resultHeader = document.querySelector("#result-header");
let $result = document.querySelector("#result");
let $background = document.querySelector("#game");
let $time = document.querySelector("#time");

let isStart = false;
let score = 0;

$inp.addEventListener("input", setGameTime);

function setGameTime() {
    let time = +$inp.value;
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}

$background.addEventListener("click", (e) => {
    if (!isStart) {
        return;
    }

    if (e.target.dataset.box) {
        score++;
        rendBox();
    }
});

$start.addEventListener("click", (e) => {
    $inp.setAttribute("disabled", "true");
    score = 0;
    setGameTime();

    isStart = true;
    hide($start);
    $background.style.backgroundColor = "white";
    let interval = setInterval(() => {
        let time = parseFloat($time.textContent);

        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    rendBox();
});

function show($el) {
    $el.classList.remove("hide");
}

function hide($el) {
    $el.classList.add("hide");
}

function setScore() {
    $result.textContent = score.toString();
}

function endGame() {
    isStart = false;
    setScore();
    show($start);
    $inp.removeAttribute("disabled");
    $background.innerHTML = "";
    $background.style.backgroundColor = "grey";
    hide($timeHeader);
    show($resultHeader);
}

function randomColor() {
    let color = ["red", "green", "yellow", "purple"];
    let num = getRender(0, color.length);
    let userColor = color[num];

    return userColor;
}

function rendBox() {
    $background.innerHTML = "";
    let box = document.createElement("div");
    let boxSize = getRender(30, 100);
    let gameSize = $background.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = boxSize + "px";
    box.style.borderRadius = "50%";
    box.style.position = "absolute";
    box.style.backgroundColor = randomColor() + "";
    box.style.top = getRender(0, maxTop) + "px";
    box.style.left = getRender(0, maxLeft) + "px";
    box.style.cursor = "pointer";
    box.setAttribute("data-box", "true");

    $background.insertAdjacentElement("afterbegin", box);
}

function getRender(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
