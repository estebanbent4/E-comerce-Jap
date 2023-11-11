
document.addEventListener("DOMContentLoaded", () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const usernameNavItem = document.getElementById("username-nav-item");
  const userUsername = document.getElementById("user-username");
  const logoutLink = document.getElementById("logout-link");

  if (isAuthenticated) {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      userUsername.textContent = storedUsername;
    }
    usernameNavItem.style.display = "flex";
  } else {
    usernameNavItem.style.display = "none";
  }

  logoutLink.addEventListener("click", () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.clear()
    window.location.href = "login.html";
  });

  if (!isAuthenticated) {
    window.location.href = "login.html";
  }
});

