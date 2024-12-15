// Client side JS that will be loaded in the browser
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const unitSelector = document.querySelector("#unit"); // <select> dropdown element from index.hbs

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  const unit = unitSelector.value; // Grabs the values m, f, or s from dropdown

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  // Using template literals and interpolation, rather than concatenating like in the video, so add a unit query after location
  //We added this query in the course
  fetch(`/weather?address=boston&unit=${unit}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error; // Error message "unable to find..."
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
