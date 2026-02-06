import Highlighter from 'web-highlighter';
(new Highlighter()).run();





const form = document.querySelector("form");
const emailInput = document.getElementById("floatingInput");
const passwordInput = document.getElementById("floatingPassword");

form.addEventListener("submit", function (e) {
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
    alert("Login successful (demo)");
    form.reset();
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

// avatar
localStorage.setItem("userName", fullNameInput.value.trim());
