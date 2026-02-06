document.addEventListener("DOMContentLoaded", () => {

  /*CREATE SPACE MODAL */

  const highlighter = new Highlighter({
    exceptSelectors: ['img', 'button', 'input']
  });

  highlighter.run();

  const openBtn = document.getElementById("createSpaceTrigger");
  const createBtn = document.getElementById("createSpaceBtn");
  const input = document.getElementById("spaceNameInput");
  const error = document.getElementById("spaceError");

  const modalEl = document.getElementById("createSpaceModal");
  if (modalEl && openBtn && createBtn) {
    const modal = new bootstrap.Modal(modalEl);

    openBtn.addEventListener("click", e => {
      e.preventDefault();
      input.value = "";
      error.classList.add("d-none");
      modal.show();
    });

    createBtn.addEventListener("click", () => {
      const spaceName = input.value.trim();
      if (!spaceName) {
        error.classList.remove("d-none");
        return;
      }

      const spaces = JSON.parse(localStorage.getItem("spaces")) || [];
      spaces.push({ name: spaceName, createdAt: new Date().toISOString() });
      localStorage.setItem("spaces", JSON.stringify(spaces));

      modal.hide();
    });
  }

  /* PROFILE DROPDOWN */

  const profileToggle = document.getElementById("profileToggle");
  const profileDropdown = document.getElementById("profileDropdown");

  profileToggle?.addEventListener("click", e => {
    e.stopPropagation();
    profileDropdown.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    profileDropdown?.classList.remove("show");
  });

  /* CANVAS SETUP */

  const canvas = document.getElementById("drawCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.7;

  let drawing = false;
  let color = "#000";
  let lineWidth = 3;
  let tool = "pen";

  let history = [];
  let redoStack = [];

  function saveState() {
    history.push(canvas.toDataURL());
    if (history.length > 30) history.shift();
    redoStack = [];
  }

canvas.addEventListener("pointerdown", startDraw);
canvas.addEventListener("pointermove", draw);
canvas.addEventListener("pointerup", stopDraw);
canvas.addEventListener("pointerleave", stopDraw);


function startDraw(e) {
  drawing = true;
  saveState();

  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
  if (!drawing) return;

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  // Highlighter-specific behavior
  if (tool === "highlight") {
    ctx.globalAlpha = 0.2;       // lighter
    ctx.lineCap = "round";      // real highlighter edge
  } else {
    ctx.globalAlpha = 1;
    ctx.lineCap = "round";
  }

  ctx.lineJoin = "round";

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}


function stopDraw() {
  drawing = false;
  ctx.beginPath(); // reset path ONCE at the end
}


//switching tools
ctx.globalCompositeOperation = "source-over";
ctx.globalAlpha = 1;


  

  /* =========================
     TOOLBAR
  ========================== */

  const penBtn = document.getElementById("penBtn");
  const highlightBtn = document.getElementById("highlightBtn");
  const textBtn = document.getElementById("textBtn");
  const eraserBtn = document.getElementById("eraserBtn");
  const undoBtn = document.getElementById("undoBtn");
  const redoBtn = document.getElementById("redoBtn");
  const palette = document.getElementById("colorPalette");



//setActive tool
function setActiveTool(t) {
  tool = t;

  document.querySelectorAll(".toolbar button")
    .forEach(btn => btn.classList.remove("active"));

  palette.classList.remove("show");

  // Reset canvas state
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = "source-over";

  if (t === "pen") {
    penBtn.classList.add("active");
    palette.classList.add("show");

    lineWidth = 3;
    ctx.globalAlpha = 1;
    ctx.lineCap = "round";
  }

if (t === "highlight") {
  highlightBtn.classList.add("active");
  palette.classList.add("show");

  lineWidth = 18;

  ctx.globalAlpha = 0.15;                 // transparency
  ctx.globalCompositeOperation = "source-over"; //IMPORTANT
  ctx.lineCap = "butt";                  // flat highlighter edge
  ctx.lineJoin = "round";
}


  if (t === "eraser") {
    eraserBtn.classList.add("active");
    ctx.globalCompositeOperation = "destination-out";
    lineWidth = 20;
  }

  if (t === "text") {
    textBtn.classList.add("active");
  }
}







  // default tool
//   setActiveTool("pen");

tool = "pen";
lineWidth = 3;
ctx.globalAlpha = 1;
ctx.globalCompositeOperation = "source-over";


  penBtn?.addEventListener("click", e => { e.stopPropagation(); setActiveTool("pen"); });
  highlightBtn?.addEventListener("click", e => { e.stopPropagation(); setActiveTool("highlight"); });
  eraserBtn?.addEventListener("click", e => { e.stopPropagation(); setActiveTool("eraser"); });
  textBtn?.addEventListener("click", e => { e.stopPropagation(); setActiveTool("text"); });

//undo
undoBtn.addEventListener("click", () => {
  if (!history.length) return;

  redoStack.push(canvas.toDataURL());

  const img = new Image();
  img.src = history.pop();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // // RESET canvas state BEFORE drawing
    // ctx.globalAlpha = 1;
    // ctx.globalCompositeOperation = "source-over";

    ctx.drawImage(img, 0, 0);
  };
});

//redo
redoBtn.addEventListener("click", () => {
  if (!redoStack.length) return;

  history.push(canvas.toDataURL());

  const img = new Image();
  img.src = redoStack.pop();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    ctx.drawImage(img, 0, 0);
  };
});



canvas.addEventListener("click", e => {
  if (tool !== "text") return;

  const text = prompt("Enter text:");
  if (!text) return;

  saveState();

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = color;
  ctx.font = "16px Segoe UI";

  ctx.fillText(text, e.offsetX, e.offsetY);
});



  document.querySelectorAll(".color").forEach(c => {
    c.addEventListener("click", e => {
      e.stopPropagation();
      color = c.dataset.color;
    });
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".toolbar-wrapper")) {
      palette?.classList.remove("show");
    }
  });

});
