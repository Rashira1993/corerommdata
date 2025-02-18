const scriptUrl = "https://script.google.com/macros/s/AKfycbxmhLetui5s36sj36nJPhNtdCBPez2Hq3Oo0PEilQzM5bTAezniQp7MVs9WzLUpbgfg/exec";

// Timeout settings
let autoLogoutTimer;
const LOGOUT_TIME = 8 * 60 * 1000; // 5 minutes in milliseconds

// Reset the timer on any user interaction
function resetLogoutTimer() {
  clearTimeout(autoLogoutTimer);
  autoLogoutTimer = setTimeout(logout, LOGOUT_TIME);
}

// Perform logout and redirect to the login page
function logout() {
  localStorage.removeItem("email");
  localStorage.removeItem("password");
  window.location.href = "index.html"; // Redirect to login page
}

// Function to check authentication and redirect if necessary
function checkAuthentication() {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  if (!email || !password) {
    window.location.href = "index.html"; // Redirect to login page if no credentials are stored
    return;
  }

  // Verify the credentials with the backend
  fetch(`${scriptUrl}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
    .then((response) => response.json())
    .then((result) => {
      if (!result.success) {
        window.location.href = "index.html"; // Redirect if credentials are invalid
      }
    })
    .catch(() => {
      window.location.href = "index.html"; // Redirect on fetch error
    });
}

// Initialize the auto-logout timer
function initializeAutoLogout() {
  document.addEventListener("mousemove", resetLogoutTimer);
  document.addEventListener("keydown", resetLogoutTimer);
  document.addEventListener("scroll", resetLogoutTimer);
  document.addEventListener("click", resetLogoutTimer);
  resetLogoutTimer(); // Start the initial timer
}

// Call the authentication check and set up auto-logout
checkAuthentication();
initializeAutoLogout();

// Logout button functionality
// document.getElementById("logout-button").addEventListener("click", logout);