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

  const container = document.getElementById("canvasContainer");
  const canvas = document.getElementById("drawCanvas");
  const highlightCanvas = document.getElementById("highlightCanvas");
  if (!canvas || !highlightCanvas) return;

  const ctx = canvas.getContext("2d");
  const highlightCtx = highlightCanvas.getContext("2d");
  
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.7;
  highlightCanvas.width = canvas.width;
  highlightCanvas.height = canvas.height;

  // Get current space name and student email for canvas persistence
  const currentSpaceName = sessionStorage.getItem("currentSpace") || "default";
  const studentEmail = localStorage.getItem("userEmail") || "guest@example.com";

  // Load canvas from database
  async function loadCanvas() {
    try {
      const response = await fetch(`/api/canvas/load/${encodeURIComponent(currentSpaceName)}/${encodeURIComponent(studentEmail)}`);
      const data = await response.json();
      
      if (data.imageData) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = data.imageData;
      }
    } catch (err) {
      console.error("Failed to load canvas:", err);
    }
  }

  // Load canvas on page load
  loadCanvas();

  let drawing = false;
  let color = "#000";
  let lineWidth = 3;
  let tool = "pen";

  let history = [];
  let redoStack = [];

  function saveState() {
    // Save both canvases as a composite
    history.push({
      main: canvas.toDataURL(),
      highlight: highlightCanvas.toDataURL()
    });
    if (history.length > 30) history.shift();
    redoStack = [];
  }

  // Canvas save to database
  async function saveCanvasToDatabase() {
    try {
      const imageData = canvas.toDataURL("image/png");
      const response = await fetch("/api/canvas/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          spaceName: currentSpaceName,
          studentEmail: studentEmail,
          imageData: imageData
        })
      });

      const data = await response.json();
      if (data.success) {
        alert("Canvas saved successfully!");
      } else {
        alert("Failed to save canvas");
      }
    } catch (err) {
      alert("Error saving canvas: " + err.message);
    }
  }

canvas.addEventListener("pointerdown", startDraw);
canvas.addEventListener("pointermove", draw);
canvas.addEventListener("pointerup", stopDraw);
canvas.addEventListener("pointerleave", stopDraw);
highlightCanvas.addEventListener("pointerdown", startDraw);
highlightCanvas.addEventListener("pointermove", draw);
highlightCanvas.addEventListener("pointerup", stopDraw);
highlightCanvas.addEventListener("pointerleave", stopDraw);


function startDraw(e) {
  drawing = true;
  saveState();

  const currentCtx = tool === "highlight" ? highlightCtx : ctx;
  currentCtx.beginPath();
  currentCtx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
  if (!drawing) return;

  const currentCtx = tool === "highlight" ? highlightCtx : ctx;
  currentCtx.strokeStyle = color;
  currentCtx.lineWidth = lineWidth;

  // Highlighter-specific behavior
  if (tool === "highlight") {
    currentCtx.globalAlpha = 0.15;       // translucent
    currentCtx.lineCap = "round";
  } else {
    currentCtx.globalAlpha = 1;
    currentCtx.lineCap = "round";
  }

  currentCtx.lineJoin = "round";

  currentCtx.lineTo(e.offsetX, e.offsetY);
  currentCtx.stroke();
}


function stopDraw() {
  drawing = false;
  const currentCtx = tool === "highlight" ? highlightCtx : ctx;
  currentCtx.beginPath(); // reset path ONCE at the end
}


//switching tools
ctx.globalCompositeOperation = "source-over";
ctx.globalAlpha = 1;
highlightCtx.globalCompositeOperation = "source-over";
highlightCtx.globalAlpha = 0.15;


  

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

  // Reset both canvas states
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  highlightCtx.setTransform(1, 0, 0, 1, 0, 0);
  highlightCtx.globalCompositeOperation = "source-over";
  highlightCtx.globalAlpha = 0.15;

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
    highlightCtx.globalAlpha = 0.15;
    highlightCtx.globalCompositeOperation = "source-over";
    highlightCtx.lineCap = "round";
    highlightCtx.lineJoin = "round";
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

// Save to database button
const saveBtn = document.getElementById("saveBtn");
saveBtn?.addEventListener("click", () => {
  saveCanvasToDatabase();
});

//undo
undoBtn.addEventListener("click", () => {
  if (!history.length) return;

  const currentState = {
    main: canvas.toDataURL(),
    highlight: highlightCanvas.toDataURL()
  };
  redoStack.push(currentState);

  const previousState = history.pop();
  
  const mainImg = new Image();
  const highlightImg = new Image();
  let imagesLoaded = 0;
  
  mainImg.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) applyState();
  };
  
  highlightImg.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) applyState();
  };
  
  function applyState() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    highlightCtx.clearRect(0, 0, highlightCanvas.width, highlightCanvas.height);
    ctx.drawImage(mainImg, 0, 0);
    highlightCtx.drawImage(highlightImg, 0, 0);
  }
  
  mainImg.src = previousState.main;
  highlightImg.src = previousState.highlight;
});

//redo
redoBtn.addEventListener("click", () => {
  if (!redoStack.length) return;

  history.push({
    main: canvas.toDataURL(),
    highlight: highlightCanvas.toDataURL()
  });

  const nextState = redoStack.pop();
  
  const mainImg = new Image();
  const highlightImg = new Image();
  let imagesLoaded = 0;
  
  mainImg.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) applyState();
  };
  
  highlightImg.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) applyState();
  };
  
  function applyState() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    highlightCtx.clearRect(0, 0, highlightCanvas.width, highlightCanvas.height);
    ctx.drawImage(mainImg, 0, 0);
    highlightCtx.drawImage(highlightImg, 0, 0);
  }
  
  mainImg.src = nextState.main;
  highlightImg.src = nextState.highlight;
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

// Clear canvas button
const clearBtn = document.getElementById("clearBtn");
clearBtn?.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  highlightCtx.clearRect(0, 0, highlightCanvas.width, highlightCanvas.height);
  history = [];
  redoStack = [];
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
