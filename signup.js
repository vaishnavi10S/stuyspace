// Highlighter not needed for signup


const form = document.querySelector("form");
const emailInput = document.getElementById("floatingInput");
const passwordInput = document.getElementById("floatingPassword");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

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
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value
        })
      });

      const data = await response.json();

      if (data.success) {
        // Store user info in localStorage
        localStorage.setItem("userEmail", data.email || emailInput.value);
        localStorage.setItem("studentId", data.studentId);
        localStorage.setItem("userRole", "learner");

        alert("Signup successful! Redirecting to login...");
        form.reset();
        // Redirect to login page
        window.location.href = "login.html";
      } else {
        showError(emailInput, data.error || "Signup failed");
      }
    } catch (err) {
      showError(emailInput, "Network error: " + err.message);
    }
  }
});

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
