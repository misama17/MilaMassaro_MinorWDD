// ************************************
// -------------- CONSTANTS -----------
// ************************************

// ---------- 3D CAROUSEL ----------
const previousButton = document.querySelector('section:nth-of-type(2) button:nth-of-type(1)');
const nextButton = document.querySelector('section:nth-of-type(2) button:nth-of-type(2)');
const carouselContainer = document.querySelector("section:nth-of-type(2) ul");

nextButton.addEventListener("click", toNext);
previousButton.addEventListener("click", toPrev);





// ************************************
// -------------- VARIABLES -----------
// ************************************

// ------------- API: 311 -------------
let base = "https://fdnd.directus.app/items"
let endpoint = "/person/311"
let url = base + endpoint



insertCharacter();

async function insertCharacter() {
    let response = await fetch(url)

    let characterInfo = await response.json();
    console.log(characterInfo.name)

    let characterHTML = 
		`<h2>Sterrenbeeld</h2>
     <h3>Mensen met hetzelfde sterrenbeeld:</h3>
     <p>${characterInfo.fav_animal}</p>
     <img src="" alt="">`
}







// ************************************
// -------------- FUNCTIONS -----------
// ************************************

// ---------- 3D CAROUSEL ----------
function toNext() {
  let curExtra = getComputedStyle(carouselContainer).getPropertyValue("--extra");
  let newExtra = parseInt(curExtra) - 1;  
  carouselContainer.style.setProperty("--extra", newExtra);
}

function toPrev() {
  let curExtra = getComputedStyle(carouselContainer).getPropertyValue("--extra");
  let newExtra = parseInt(curExtra) + 1;  
  carouselContainer.style.setProperty("--extra", newExtra);
}