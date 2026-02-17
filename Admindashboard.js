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







//claude code for resource management
// Add this function to fetch resources from database
async function loadResources() {
    try {
        const response = await fetch('/api/resources'); // Create this endpoint
        const resources = await response.json();
        displayResources(resources);
    } catch (error) {
        console.error('Error loading resources:', error);
    }
}

// Display resources on the page
function displayResources(resources) {
    const container = document.querySelector('.resources-container'); // Add this class to your container
    
    resources.forEach(resource => {
        const card = createResourceCard(resource);
        container.appendChild(card);
    });
}

// Create individual resource card
function createResourceCard(resource) {
    const card = document.createElement('div');
    card.className = 'resource-card';
    card.innerHTML = `
        <div class="card-header">
            <img src="${resource.thumbnail || 'default-thumbnail.png'}" alt="${resource.title}">
            <h3>${resource.title}</h3>
        </div>
        <div class="card-body">
            <p>${resource.description}</p>
        </div>
        <div class="card-footer">
            <button onclick="viewResource(${resource.id})">View</button>
            <button onclick="editResource(${resource.id})">Edit</button>
            <span class="status">${resource.status || 'Uploaded'}</span>
        </div>
    `;
    return card;
}

// View resource - open PDF in canvas/viewer
function viewResource(resourceId) {
    window.location.href = `/canvas.html?resource=${resourceId}`;
}

// Call on page load
document.addEventListener('DOMContentLoaded', loadResources);