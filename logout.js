document.getElementById('logout').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior
  
    // Assuming `auth` is your Firebase authentication object
    auth.signOut()
      .then(() => {
        alert("User logged out successfully!");
  
        // Redirect to the login page after logout
        window.location.href = "1.html"; // Replace with your desired URL
      })
      .catch((error) => {
        alert("Error logging out: " + error.message);
      });
  });