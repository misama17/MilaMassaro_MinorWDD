// ************************************
// -------- */ MARK: CONSTANTS --------
// ************************************

// ---------- 3D CAROUSEL ----------
const previousButton = document.querySelector('section:nth-of-type(2) button:nth-of-type(1)');
const nextButton = document.querySelector('section:nth-of-type(2) button:nth-of-type(2)');
const carouselContainer = document.querySelector("section:nth-of-type(2) ul");

nextButton.addEventListener("click", toNext);
previousButton.addEventListener("click", toPrev);



// ************************************
// ---------*/ MARK: VARIABLES --------
// ************************************
let charms = [
    "fav_hobby",
    "fav_animal",
    "vibe_emoji",
    "fav_season",
    "shoe_size",
    "residency",
    "fav_property"
]

let leerdoelen = [
    "leerdoel 1",
    "leerdoel 2",
    "leerdoel 3"
]

let leerdoelenTekst = [
    "Ik kan een website maken met een goede user experience.",
    "Ik ga leren hoe ik animaties maak en kan inzetten voor unieke websites.",
    "Ik ga ontdekken of webdesign & development mijn toekomstige vakgebied kan zijn."
]


// ------------- API: 311 -------------
async function insertCharacter(charm) {
    let base = "https://fdnd.directus.app/items"
    let endpoint = "/person/311"
    let url = base + endpoint

    let response = await fetch(url)

    let characterInfo = await response.json();

    let valueCharm = characterInfo.data[charm]

    document.querySelector("section:nth-of-type(2) p:nth-of-type(1)").textContent = valueCharm

    return valueCharm
}

let avatarAPI = document.querySelector("img")

async function getMinorMensen(charm, valueCharm) {
    let base = "https://fdnd.directus.app/items"
    let endpoint = "/person?filter[squads][squad_id][tribe][name]=CMD%20Minor%20Web%20Dev&filter[squads][squad_id][cohort]=2526"
    let charmFilter = `&filter[${charm}]=${valueCharm}`
    let nempty = `&filter[avatar][_nempty]`
    let nMila = `&filter[id][_neq]=311`
    let url = base + endpoint + charmFilter + nempty + nMila

    let response = await fetch(url)

    let responseJSON = await response.json();

    let deMinorMensen = responseJSON.data;
    
    let imageWrapper =  document.querySelector("section:nth-of-type(2) p:nth-of-type(2)")  


    imageWrapper.innerHTML = "";

    deMinorMensen.forEach(eenMinorMens => {


        let eenMinorMensHTML =  `<img src = "${eenMinorMens.avatar} alt="${eenMinorMens.name}">`

        // beforeend: hij voegt het voor het einde van de ul toe.
        // afterbegin: als eerste toegevoegd.
        // !!! Je mag nu de HTML weghalen, maar de ul moet blijven staan! dus je hebt een lege ul in je HTML.
        imageWrapper.insertAdjacentHTML("beforeend", eenMinorMensHTML)
    }
    ) 
}





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

async function getInfo(getal) {
    let remainder = getal % 10

    let thema = document.querySelector("h2");
    let medestudenten = document.querySelector("h3");
    let definitie = document.querySelector("section:nth-of-type(2) p:nth-of-type(1)");

    if (remainder < 0 ) {
        remainder = remainder + 10
    }

    let nummer = 9 - remainder

    if  (nummer <= 6) {
        let charm = charms[nummer]
        
        // h2
        let themaText = `<h2>${charm}</h2>`
        thema.innerHTML = themaText;

        let valueCharm = await insertCharacter(charm);

        // h3
        let medestudentenText = `<h3>Mensen met zelfde ${charm}:</h3>`
        medestudenten.innerHTML = medestudentenText;

        // lijstje
        getMinorMensen(charm, valueCharm)
    } 
    else {
        let ldNummer = nummer - 7

        // console.log("leerdoel nummer:" + ldNummer)
        // leerdoelen
        let leerdoel = leerdoelen[ldNummer];
        let leerdoelTekst = leerdoelenTekst[ldNummer];
        
        // h2
        let themaText = `<h2>${leerdoel}</h2>`
        thema.innerHTML = themaText;

        // h3
        let medestudentenText = `<h3></h3>`
        medestudenten.innerHTML = medestudentenText;

        // definitie p
        let definitieText = `<p>${leerdoelTekst}</p>`
        definitie.innerHTML = definitieText;

        // image wrapper
        let imageWrapper =  document.querySelector("section:nth-of-type(2) p:nth-of-type(2)")  
        imageWrapper.innerHTML = "";

        // Avatar
        let avatar = `<img></img>`
    }
}

getInfo(0) 