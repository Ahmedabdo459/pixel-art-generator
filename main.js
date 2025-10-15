// Pixel Art Generator - main logic
const container = document.querySelector(".container");
const gridButton = document.getElementById("submit-grid");
const clearGridButton = document.getElementById("clear-grid");
const gridWidth = document.getElementById("width-range");
const gridHeight = document.getElementById("height-range");
const colorButton = document.getElementById("color-input");
const eraseBtn = document.getElementById("erase-btn");
const paintBtn = document.getElementById("paint-btn");
const widthValue = document.getElementById("width-value");
const heightValue = document.getElementById("height-value");
const themeToggle = document.getElementById("theme-toggle");
const downloadBtn = document.getElementById("download-btn");

let draw = false;
let erase = false;
let deviceType = "";

const events = {
  mouse: { down: "mousedown", move: "mousemove", up: "mouseup" },
  touch: { down: "touchstart", move: "touchmove", up: "touchend" },
};

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();

// Create grid
gridButton.addEventListener("click", () => {
  container.innerHTML = "";
  let count = 0;
  for (let i = 0; i < gridHeight.value; i++) {
    count += 2;
    const row = document.createElement("div");
    row.classList.add("gridRow");

    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;
      const col = document.createElement("div");
      col.classList.add("gridCol");
      col.id = `gridCol${count}`;

      col.addEventListener(events[deviceType].down, () => {
        draw = true;
        col.style.backgroundColor = erase ? "transparent" : colorButton.value;
      });

      col.addEventListener(events[deviceType].move, (e) => {
        const elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY
        )?.id;
        checker(elementId);
      });

      col.addEventListener(events[deviceType].up, () => (draw = false));
      row.appendChild(col);
    }
    container.appendChild(row);
  }
});

function checker(id) {
  const cells = document.querySelectorAll(".gridCol");
  cells.forEach((cell) => {
    if (cell.id === id) {
      if (draw && !erase) cell.style.backgroundColor = colorButton.value;
      else if (draw && erase) cell.style.backgroundColor = "transparent";
    }
  });
}

// Buttons
clearGridButton.addEventListener("click", () => (container.innerHTML = ""));
eraseBtn.addEventListener("click", () => (erase = true));
paintBtn.addEventListener("click", () => (erase = false));

// Sliders
gridWidth.addEventListener("input", () => {
  widthValue.textContent = gridWidth.value.padStart(2, "0");
});
gridHeight.addEventListener("input", () => {
  heightValue.textContent = gridHeight.value.padStart(2, "0");
});

// Dark Mode Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? " Light Mode"
    : " Dark Mode";
});

// Download Pixel Art
downloadBtn.addEventListener("click", () => {
  if (container.innerHTML.trim() === "") {
    alert("Please create and draw something before downloading!");
    return;
  }

  html2canvas(container, {
    backgroundColor: document.body.classList.contains("dark") ? "#1e1e1e" : "#ffffff",
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "pixel-art.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

// Default values
window.onload = () => {
  gridHeight.value = 0;
  gridWidth.value = 0;
};
