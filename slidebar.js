let slideBar = document.getElementsByClassName("slidebar");
for (el of slideBar) {
    el.style.background = "var(---leaf);";
}

let styleform = document.querySelector('[data="test"]');
styleform.innerHTML += "input[type=range]::-webkit-slider-thumb { background: #var(---leaf);";
