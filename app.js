const fontSize = document.getElementById("font-size");
const fontWeight = document.getElementById("font-weight");
const fontType = document.getElementById("font-type");
const pencil = document.getElementById("mode-pencil");
const circle = document.getElementById("mode-circle");
const rectangle = document.getElementById("mode-rectangle");

const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const textInput = document.getElementById("text");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const saveBtn = document.getElementById("save");
const fileInput = document.getElementById("file");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const info = document.querySelector(".tooltiptext");
const img = document.querySelector(".tomato-img");

canvas.width = 800;
canvas.height = 540;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;
let modePencil = true;
let modeCircle = false;
let modeRectangle = false;

let rectX = 0;
let rectY = 0;

function onMove(event) {
    if (isPainting) {
        if (modePencil) {
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
            return;
        } else if (modeRectangle) {
            const width = event.offsetX - rectX;
            const height = event.offsetY - rectY;
            ctx.beginPath();
            ctx.moveTo(event.offsetX, event.offsetY);
            ctx.fillRect(rectX, rectY, width, height);
        } else if (modeCircle) {
            const circleWidth = event.offsetX - rectX;
            ctx.beginPath();
            ctx.arc(rectX, rectY, circleWidth, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function handlePencil() {
    modePencil = true;
    modeCircle = false;
    modeRectangle = false;
    isFilling = false;
}

function handleCircle() {
    modePencil = false;
    modeCircle = true;
    modeRectangle = false;
    isFilling = false;
}

function handleRectangle() {
    modePencil = false;
    modeCircle = false;
    modeRectangle = true;
    isFilling = false;
}

function onMouseDown() {
    isPainting = true;
    if (modeRectangle) {
        rectX = event.offsetX;
        rectY = event.offsetY;
        ctx.beginPath();
    } else if (modeCircle) {
        rectX = event.offsetX;
        rectY = event.offsetY;
    }
}

function onMouseUp() {
    isPainting = false;
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
    ctx.beginPath();
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
    ctx.beginPath();
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
    ctx.beginPath();
}

function onModeClick(event) {
    isFilling = true;
    modePencil = false;
    modeCircle = false;
    modeRectangle = false;
}

function onCavasClick() {
    if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestoryClick() {
    if (window.confirm("Do you want to initialize the drawing?")) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onEraserClick() {
    modePencil = true;
    ctx.beginPath();
    ctx.strokeStyle = "white";
    isFilling = false;
    modeCircle = false;
    modeRectangle = false;
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
}

function onDoubleClick(event) {
    const text = textInput.value;
    const textSize = fontSize.value;
    const textType = fontType.value;
    const textWeight = fontWeight.value;

    if (text !== "") {
        ctx.save();
        modePencil = false;
        ctx.lineWidth = 1;
        ctx.font = `${textWeight} ${textSize}px ${textType}`;
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
    console.log(textWeight);
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

function onTomatoClick() {
    info.innerText = "Draw anything!";
    info.style.fontSize = "24px";
    info.style.fontWeight = 600;
    info.style.lineHeight = "1.4";
    info.style.padding = "16px";
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
document.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("click", onCavasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestoryClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);

pencil.addEventListener("click", handlePencil);
circle.addEventListener("click", handleCircle);
rectangle.addEventListener("click", handleRectangle);

img.addEventListener("click", onTomatoClick);

const lineRange = document.querySelector(".line-range");
lineRange.addEventListener("input", function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #2c8b0c 0%, #2c8b0c ${value}%, #fff ${value}%, white 100%)`;
});

const fontRange = document.querySelector(".font-range");
fontRange.addEventListener("input", function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #2c8b0c 0%, #2c8b0c ${value}%, #fff ${value}%, white 100%)`;
});
