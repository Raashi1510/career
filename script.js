document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission for demonstration

    // Show a loading spinner
    const button = document.querySelector("button");
    button.innerHTML = "Loading...";
    button.disabled = true;

    // Simulate a delay (e.g., fetching recommendations)
    setTimeout(() => {
        button.innerHTML = "Get Recommendations";
        button.disabled = false;
        alert("Recommendations are ready! Check the results page.");
        window.location.href = "/results"; // Redirect to the results page
    }, 2000); // 2-second delay
});