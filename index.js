const form = document.querySelector("form");
const emailInput = document.getElementById("floatingInput");
const passwordInput = document.getElementById("floatingPassword");
// Handle form submission

form?.addEventListener("submit", function (e) {
  e.preventDefault();
// Validation flag
  let isValid = true;

  // EMAIL VALIDATION
  if (!emailInput.value || !emailInput.value.includes("@")) {
    showError(emailInput, "Please enter a valid email address");   
    isValid = false;
  } else {
    clearError(emailInput);
  }

  // PASSWORD VALIDATION
  if (!passwordInput.value || passwordInput.value.length < 6) {
    showError(passwordInput, "Password must be at least 6 characters");
    isValid = false;
  } else {
    clearError(passwordInput);
  }

  if (isValid) {
    // Store user info in localStorage
    localStorage.setItem("userEmail", emailInput.value);
    localStorage.setItem("isLoggedIn", "true");
    
    // Redirect based on page and role
    const userRole = localStorage.getItem("userRole") || "learner";
    const currentPage = window.location.pathname.split("/").pop();
    
    if (currentPage.includes("signup")) {
      // Redirect from signup to appropriate dashboard
      if (userRole === "admin") {
        window.location.href = "./dashboard.html";
      } else {
        window.location.href = "./dashbStd.html";
      }
    } else if (currentPage.includes("login")) {
      // Redirect from login to home (determine role from stored value)
      window.location.href = "./home.html";
    }
  }
});

// Show error message

function showError(input, message) {
  input.classList.add("is-invalid");
  let feedback = input.parentElement.querySelector(".invalid-feedback");

  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    feedback.innerText = message;
    input.parentElement.appendChild(feedback);
  }

  feedback.innerText = message;
}

function clearError(input) {
  input.classList.remove("is-invalid");
  const feedback = input.parentElement.querySelector(".invalid-feedback");
  if (feedback) feedback.remove();
}

// avatar
// Example: save name during signup
// localStorage.setItem("userName", "Vaishnavi");

const userName =
  localStorage.getItem("userName") ||
  (localStorage.getItem("userRole") === "admin" ? "Admin" : "Student");

const avatar = document.getElementById("profileAvatar");
const nameEl = document.querySelector(".profile-name");
const adminBadge = document.querySelector(".admin-badge");

// Set name
nameEl.textContent = userName;

// Set initial
const initial = userName.charAt(0).toUpperCase();
avatar.textContent = initial;

// Soft color palette
const colors = [
  "#e8ecff", "#fbe7f3", "#fff6e5",
  "#e6f7f1", "#f0ecff", "#fde8e8"
];

// Pick color based on initial
const colorIndex = initial.charCodeAt(0) % colors.length;
avatar.style.backgroundColor = colors[colorIndex];

// Admin badge logic
if (localStorage.getItem("userRole") === "admin") {
  adminBadge.classList.remove("d-none");
}

// Role selection function
// Role selection function
function selectRole(role) {
  localStorage.setItem("userRole", role);
  if (role === 'admin') {
    window.location.href = "./login.html";
  } else {
    window.location.href = "./signup.html";
  }
}
