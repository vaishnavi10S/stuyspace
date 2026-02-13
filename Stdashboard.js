const addBtn = document.getElementById("addNoteBtn");
const cardRow = document.querySelector(".album .row");

// Check if user is logged in and is a student
const userRole = localStorage.getItem("userRole");
const userEmail = localStorage.getItem("userEmail");

if (!userEmail || userRole !== "learner") {
  alert("Unauthorized access. Please login as a student.");
  window.location.href = "/login.html";
}


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
