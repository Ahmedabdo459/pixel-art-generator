const container = document.querySelector(".container");
const gridButton = document.getElementById("submit-grid");
const clearButton = document.getElementById("clear-grid");
const gridWidth = document.getElementById("width-range");
const gridHeight = document.getElementById("height-range");
const colorPicker = document.getElementById("color-input");
const eraseBtn = document.getElementById("erase-btn");
const paintBtn = document.getElementById("paint-btn");
const widthValue = document.getElementById("width-value");
const heightValue = document.getElementById("height-value");
const downloadBtn = document.getElementById("download-btn");
const toggleModeBtn = document.getElementById("toggle-mode");

let draw = false;
let erase = false;

gridButton.addEventListener("click", () => {
  container.innerHTML = "";
  for (let i = 0; i < gridHeight.value; i++) {
    const row = document.createElement("div");
    row.classList.add("gridRow");
    for (let j = 0; j < gridWidth.value; j++) {
      const col = document.createElement("div");
      col.classList.add("gridCol");

      col.addEventListener("mousedown", () => {
        draw = true;
        col.style.backgroundColor = erase ? "transparent" : colorPicker.value;
      });

      col.addEventListener("mousemove", (e) => {
        if (draw) {
          e.target.style.backgroundColor = erase
            ? "transparent"
            : colorPicker.value;
        }
      });

      col.addEventListener("mouseup", () => (draw = false));
      row.appendChild(col);
    }
    container.appendChild(row);
  }
});

clearButton.addEventListener("click", () => (container.innerHTML = ""));
eraseBtn.addEventListener("click", () => (erase = true));
paintBtn.addEventListener("click", () => (erase = false));

gridWidth.addEventListener("input", () => {
  widthValue.innerText = gridWidth.value.padStart(2, "0");
});
gridHeight.addEventListener("input", () => {
  heightValue.innerText = gridHeight.value.padStart(2, "0");
});

downloadBtn.addEventListener("click", () => {
  if (!container.innerHTML.trim()) {
    alert("Please create and draw something first!");
    return;
  }
  html2canvas(container).then((canvas) => {
    const link = document.createElement("a");
    link.download = "pixel-art.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleModeBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

window.onload = () => {
  gridHeight.value = 0;
  gridWidth.value = 0;
  widthValue.innerText = "00";
  heightValue.innerText = "00";
};
