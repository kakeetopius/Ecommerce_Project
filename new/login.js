document.addEventListener("DOMContentLoaded", () => {
  // Check if user is already logged in
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    alert("You're already logged in, now proceed to checkout.");
    window.location.href = "index.html"; // Redirect to cart
    return; // stop further code
  }

  // Attach form submit only after DOM is loaded
  const loginForm = document.getElementById("login-form");

  if (!loginForm) {
    alert("Login form not found! Check your HTML.");
    return;
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("✅ Login successful! Redirecting to checkout...");
      window.location.href = "index.html";
    } else {
      alert("❌ Invalid credentials. Please try again.");
    }
  });
});
