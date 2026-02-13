const addBtn = document.getElementById("addNoteBtn");
const cardRow = document.querySelector(".album .row");

// Check if user is logged in and is an admin
const userRole = localStorage.getItem("userRole");
const userEmail = localStorage.getItem("userEmail");

if (!userEmail || userRole !== "admin") {
  alert("Unauthorized access. Please login as admin.");
  window.location.href = "/login.html";
}

// Hidden file input
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = ".pdf,.txt";
fileInput.style.display = "none";
document.body.appendChild(fileInput);

// Open file picker
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fileInput.click();
});

// Handle file upload
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const validTypes = ["application/pdf", "text/plain"];
  if (!validTypes.includes(file.type)) {
    alert("Only PDF or TXT files are allowed");
    fileInput.value = "";
    return;
  }

  const fileURL = URL.createObjectURL(file);
  const fileTypeLabel =
    file.type === "application/pdf" ? "PDF Document" : "Text File";

  // Create card
  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `
    <div class="card shadow-sm">
      
      <div class="note-thumb">
        <div>
          <h6>${file.name}</h6>
          <div class="note-type">${fileTypeLabel}</div>
        </div>
      </div>

      <div class="card-body">
        <p class="card-text">
          This note was uploaded by you. Click View to open it.
        </p>

        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-secondary"
              onclick="window.open('${fileURL}', '_blank')">
              View
            </button>
          </div>
          <small class="text-body-secondary">Just now</small>
        </div>
      </div>
    </div>
  `;

  // Add to top
  cardRow.prepend(col);

  fileInput.value = "";
});

//dropdown menu

// toggle
const profileToggle = document.getElementById("profileToggle");
const profileDropdown = document.getElementById("profileDropdown");
const logoutBtn = document.getElementById("logoutBtn");

// Toggle dropdown
profileToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle("show");
});

// Close when clicking outside
document.addEventListener("click", () => {
  profileDropdown.classList.remove("show");
});

// Logout logic
logoutBtn.addEventListener("click", () => {
  localStorage.clear(); // or remove only auth keys
  window.location.href = "login.html";
});
