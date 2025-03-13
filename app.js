// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_-RGwYoK0H9PzHRYVDnTIX1M1X5cYq7w",
    authDomain: "myproject-aae1e.firebaseapp.com",
    projectId: "myproject-aae1e",
    storageBucket: "myproject-aae1e.firebasestorage.app",
    messagingSenderId: "637348016976",
    appId: "1:637348016976:web:23e64557a0b96b61f83255",
    measurementId: "G-00XEBG9TY3"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // DOM Elements
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const logoutSection = document.getElementById("logout-section");
  const userEmail = document.getElementById("user-email");
  
  // Sign Up
  document.getElementById("signup-btn").addEventListener("click", () => {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
  
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("User signed up successfully!");
        console.log("User:", userCredential.user);
      })
      .catch((error) => {
        alert("Error signing up: " + error.message);
      });
  });
  
  // Login
  document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("User logged in successfully!");
        console.log("User:", userCredential.user);
      })
      .catch((error) => {
        alert("Error logging in: " + error.message);
      });
  });
  
  // Logout
  document.getElementById("logout-btn").addEventListener("click", () => {
    auth.signOut()
      .then(() => {
        alert("User logged out successfully!");
      })
      .catch((error) => {
        alert("Error logging out: " + error.message);
      });
  });
  
  // Auth State Listener
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      signupForm.style.display = "none";
      loginForm.style.display = "none";
      logoutSection.style.display = "block";
      userEmail.textContent = user.email;
    } else {
      // User is signed out
      signupForm.style.display = "block";
      loginForm.style.display = "block";
      logoutSection.style.display = "none";
    }
  });