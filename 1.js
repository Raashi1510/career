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
  const loginForm = document.querySelector('.form-login');
  const signupForm = document.querySelector('.form-signup');
  const logoutSection = document.getElementById('logout-section');
  const userEmail = document.getElementById('user-email');
  
  // Switch between Login and Signup forms
  document.querySelector('.switcher-login').addEventListener('click', () => {
    document.querySelector('.form-wrapper.is-active').classList.remove('is-active');
    document.querySelector('.form-wrapper').classList.add('is-active');
  });
  
  document.querySelector('.switcher-signup').addEventListener('click', () => {
    document.querySelector('.form-wrapper.is-active').classList.remove('is-active');
    document.querySelector('.form-wrapper + .form-wrapper').classList.add('is-active');
  });
  
  // Sign Up
  document.querySelector('.btn-signup').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-password-confirm').value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
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
  document.querySelector('.btn-login').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("User logged in successfully!");
        console.log("User:", userCredential.user);
  
        // Redirect to a new page after successful login
        window.location.href = "dashboard.html"; // Replace with your desired URL
      })
      .catch((error) => {
        alert("Error logging in: " + error.message);
      });
  });
  
  // Logout
  document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut()
      .then(() => {
        alert("User logged out successfully!");
  
        // Optionally redirect to the login page after logout
        window.location.href = "index.html"; // Replace with your desired URL
      })
      .catch((error) => {
        alert("Error logging out: " + error.message);
      });
  });
  
  // Auth State Listener
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      document.querySelector('.forms-section').style.display = 'none';
      logoutSection.style.display = 'block';
      userEmail.textContent = user.email;
  
      // Redirect to the dashboard if the user is already logged in
      if (!window.location.href.includes("dashboard.html")) {
        window.location.href = "dashboard.html"; // Replace with your desired URL
      }
    } else {
      // User is signed out
      document.querySelector('.forms-section').style.display = 'block';
      logoutSection.style.display = 'none';
    }
  });