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
    "fav_movie"
]

let leerdoelen = [
    "leerdoel 1",
    "leerdoel 2",
    "leerdoel 3"
]

let leerdoelenTekst = [
    "Ik kan gebruikerservaring vertalen naar bewuste keuzes in HTML-structuur, interactie en visuele hiërarchie, zodat de interface intuïtief aanvoelt zonder uitleg.",
    "Ik wil ontdekken of front-end development mijn toekomstige vakgebied zou kunnen zijn, door ervaring op te doen met HTML, CSS en JavaScript, en te reflecteren op mijn eigen interesse, motivatie en voldoening bij het werken aan websites.",
    "Ik ga experimenteren met animaties met CSS (en JavaScript) en ontdek zo hoe ik unieke, opvallende websites kan maken."
]


// ------------- API: 311 -------------
async function insertCharacter(charm) {
    let base = "https://fdnd.directus.app/items"
    let endpoint = "/person/311"
    let url = base + endpoint

    let response = await fetch(url)

    let characterInfo = await response.json();

    let valueCharm = characterInfo.data[charm]
    document.querySelector("section:nth-of-type(2) p").textContent = valueCharm

    // `<img src="${characterInfo.image}" alt="${characterInfo.name}">`
}



async function getMinorMensen(charm) {
    let base = "https://fdnd.directus.app/items"
    let endpoint = "/person?filter[fav_tag][_nempty]"
    let url = base + endpoint

    let response = await fetch(url)

    let responseJSON = await response.json();

    let deMinorMensen = responseJSON.data;

    deMinorMensen.forEach(eenMinorMens => {
        console.log(eenMinorMens)

        let deMinorMensenHTML = 
        `<li>
        <h2>${eenMinorMens.name}</h2>
        <p>${eenMinorMens.fav_tag}</p>
        <img src = "${eenMinorMens.avatar} alt="${eenMinorMens.name}">
        </li>`

        // beforeend: hij voegt het voor het einde van de ul toe.
        // afterbegin: als eerste toegevoegd.
        // !!! Je mag nu de HTML weghalen, maar de ul moet blijven staan! dus je hebt een lege ul in je HTML.
        deLijst.insertAdjacentHTML("beforeend", deMinorMensenHTML)
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

function getInfo(getal) {
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

        console.log("nummer:" + nummer)
        
        // h2
        let themaText = `<h2>${charm}</h2>`
        thema.innerHTML = themaText;

        insertCharacter(charm);

        // h3
        let medestudentenText = `<h3>Mensen met zelfde ${charm}:</h3>`
        medestudenten.innerHTML = medestudentenText;
    } 
    else {
        let ldNummer = nummer - 7

        console.log("leerdoel nummer:" + ldNummer)
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

        // Avatar
        let avatar = `<img></img>`
    }
}

getInfo(0) 