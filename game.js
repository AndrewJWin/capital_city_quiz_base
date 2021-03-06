let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#Answer-result')
let replayButton = document.querySelector("#replay");
// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 


// TODO when the page loads, select an element at random from the countriesAndCodes array

var randomCountry;
var countryData;

async function generateRandomCountry() {
    randomCountry = countriesAndCodes[Math.ceil(Math.random() * countriesAndCodes.length)];
    randomCountryElement.textContent = randomCountry.name;
   
  let response = await fetch(`https://api.worldbank.org/v2/country/${randomCountry["alpha-2"]}?format=json`);
  
  // Check if the status is OK, if not - it's not ok,  Kowalski analysis!
  if(response.status != 200) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
  let data = await response.json();
  countryData = data[1][0];
  }
}

// Generate a random country on page load.
generateRandomCountry();

// Listen for the submit button being clicked.
submitButton.addEventListener("click", () => {
  // Check if the users answer is the same as the capital city, regardless of case.
  if (userAnswerElement.value.toLowerCase() == countryData.capitalCity.toLowerCase()) {
    console.log("Correct")
    resultTextElement.textContent = `Correct! The Capital City of ${countryData.name} is ${countryData.capitalCity}.`
    submitButton.disabled = true;
    resultTextElement.hidden = false;
    replayButton.hidden = false;
  } else {
    console.log("Incorrect");
    submitButton.disabled = true;
    resultTextElement.textContent = `Incorrect, the Capital City of ${countryData.name} was ${countryData.capitalCity}.`
    resultTextElement.hidden = false;
    replayButton.hidden = false;
  }
});

// Then listen for the replay button being clicked.
replayButton.addEventListener("click", () => {
  // In case the fetch task takes long. Make sure the user knows we're loading.
  randomCountryElement.textContent = "Loading Country";
  
  // Force a country generation.
  generateRandomCountry().then(() => {
    userAnswerElement.value = "";
    resultTextElement.textContent = "Were you correct?";
    submitButton.disabled = false;
    replayButton.hidden = true;
  })
})