const jokeContainer = document.getElementById("joke");
const categoryButtons = document.querySelectorAll(".category-btn");
const apiUrl = "https://v2.jokeapi.dev/joke";

function fetchJoke(category) {
    const url = category ? `${apiUrl}/${category}` : apiUrl;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.type === "single") {
                jokeContainer.textContent = data.joke;
            } else if (data.type === "twopart") {
                jokeContainer.textContent = `${data.setup}\n${data.delivery}`;
            }
        })
        .catch((error) => {
            jokeContainer.textContent = "Failed to fetch joke. Please try again later.";
            console.error(error);
        });
}

function handleCategoryButtonClick(event) {
    const category = event.target.getAttribute("data-category");
    fetchJoke(category);
}

categoryButtons.forEach((button) => {
    button.addEventListener("click", handleCategoryButtonClick);
});

// Fetch a random joke on page load
fetchJoke();
