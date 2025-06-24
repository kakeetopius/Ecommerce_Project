document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const newUser = { name, username, email, password };

  // Get existing users
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check for duplicate usernames
  if (existingUsers.some(user => user.username === username)) {
    alert("Username already exists. Please choose another.");
    return;
  }

  existingUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(existingUsers)); // Save array of users

  alert("✅ Signed up successfully! You can now log in.");
  window.location.href = "login.html";
});