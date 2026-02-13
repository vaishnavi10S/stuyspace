// Remove web-highlighter from login page - it's not needed here
const form = document.querySelector("form");
const emailInput = document.getElementById("floatingInput");
const passwordInput = document.getElementById("floatingPassword");

// Debug helper
function log(msg, data) {
  console.log(`[LOGIN] ${msg}`, data || "");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  log("Form submitted");

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

  if (!isValid) {
    log("Validation failed");
    return;
  }

  log("Validation passed, attempting login");

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    // Try student login first
    log("Trying student login...");
    let response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    log("Student response status:", response.status);
    let data = await response.json();
    log("Student response data:", data);

    // If student login failed, try admin login
    if (!data.success) {
      log("Student login failed, trying admin...");
      response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      log("Admin response status:", response.status);
      data = await response.json();
      log("Admin response data:", data);
    }

    // Handle success
    if (data.success) {
      log("Login successful! User role:", data.userRole);
      
      // Store in localStorage
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("studentId", data.studentId || data.adminId || "");
      localStorage.setItem("userRole", data.userRole);

      alert("Login successful!");
      
      // Clear form
      form.reset();
      
      // Redirect based on role
      setTimeout(() => {
        if (data.userRole === "admin") {
          log("Redirecting to admin dashboard");
          window.location.href = "/dashboard.html";
        } else {
          log("Redirecting to student dashboard");
          window.location.href = "/dashbStd.html";
        }
      }, 500);
    } else {
      log("Login failed:", data.error);
      clearError(passwordInput);
      showError(emailInput, data.error || "Invalid credentials");
    }
  } catch (err) {
    log("ERROR:", err.message);
    clearError(passwordInput);
    showError(emailInput, "Network error: " + err.message);
  }
});

function showError(input, message) {
  input.classList.add("is-invalid");
  let feedback = input.parentElement.querySelector(".invalid-feedback");

  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    feedback.style.display = "block";
    input.parentElement.appendChild(feedback);
  }

  feedback.textContent = message;
  feedback.style.display = "block";
}

function clearError(input) {
  input.classList.remove("is-invalid");
  const feedback = input.parentElement.querySelector(".invalid-feedback");
  if (feedback) {
    feedback.style.display = "none";
  }
}
