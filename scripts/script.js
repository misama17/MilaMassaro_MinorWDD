// ************************************
// -------------- CONSTANTS -----------
// ************************************

// ---------- 3D CAROUSEL ----------
const previousButton = document.querySelector('section:nth-of-type(2) button:nth-of-type(1)');
const nextButton = document.querySelector('section:nth-of-type(2) button:nth-of-type(2)');
const carouselContainer = document.querySelector("section:nth-of-type(2) ul");

nextButton.addEventListener("click", toNext);
previousButton.addEventListener("click", toPrev);


let charms = [
    "fav_hobby",
    "fav_animal",
    "vibe_emoji",
    "fav_season",
    "shoe_size",
    "residency",
    "fav_movie"
]

let leerdoelen = [
    "leerdoel 1",
    "leerdoel 2",
    "leerdoel 3"
]



// ************************************
// -------------- VARIABLES -----------
// ************************************

// ------------- API: 311 -------------
let base = "https://fdnd.directus.app/items"
let endpoint = "/person/311"
let url = base + endpoint



// insertCharacter();

// async function insertCharacter() {
//     let response = await fetch(url)

//     let characterInfo = await response.json();
//     // console.log(characterInfo.name)

//     let characterHTML = 
// 		`<h3>Mensen met hetzelfde sterrenbeeld:</h3>
//      <p>${characterInfo.fav_animal}</p>
//      <img src="" alt="">`
// }







// ************************************
// -------- */ MARK: FUNCTIONS --------
// ************************************

// ---------- 3D CAROUSEL ----------
function toNext() {
  let curExtra = getComputedStyle(carouselContainer).getPropertyValue("--extra");
  let newExtra = parseInt(curExtra) - 1;  
  carouselContainer.style.setProperty("--extra", newExtra);

  getInfo(newExtra)
}

function toPrev() {
  let curExtra = getComputedStyle(carouselContainer).getPropertyValue("--extra");
  let newExtra = parseInt(curExtra) + 1;  
  carouselContainer.style.setProperty("--extra", newExtra);

  getInfo(newExtra)
}

function getInfo(getal) {
    let remainder = getal % 10

    let thema = document.querySelector("h2");

    if (remainder < 0 ) {
        remainder = remainder + 10
    }

    let nummer = 9 - remainder

    if  (nummer <= 6) {
        let charm = charms[nummer]

        console.log("nummer:" + nummer)
        
        let themaText = 
        `<h2>${charm}</h2>`

        thema.innerHTML = themaText;
    } 
    else {
        let ldNummer = nummer - 7

        console.log("leerdoel nummer:" + ldNummer)
        // leerdoelen
        let leerdoel = leerdoelen[ldNummer];
        
        let themaText = 
        `<h2>${leerdoel}</h2>`
        
        thema.innerHTML = themaText;
    }
}