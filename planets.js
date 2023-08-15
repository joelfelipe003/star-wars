let currentPlanetUrl = 'https://swapi.dev/api/planets/';

window.onload = async () => {
 
  try{
    await loadPlanet(currentPlanetUrl);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar Cards dos Planetas!');
  }

  
  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');

  nextButton.addEventListener('click', loadNextPage);
  backButton.addEventListener('click', loadPreviousPage);

};

async function loadPlanet(url) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = ''; // limpar os campos cards e reutiliza 

  try{

    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((planet) => {
      const card = document.createElement("div");
      card.style.backgroundImage = 
      `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')` //cards dinâmicos
      card.className = "cards"

      const planetNameBG = document.createElement("div");
      planetNameBG.className = "character-name-bg";

      const planetName = document.createElement("span");
      planetName.className = "character-name";
      planetName.innerText = `${planet.name}`;

      planetNameBG.appendChild(planetName);
      card.appendChild(planetNameBG);

      /* criando e colocando informações no modal  */

      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility ="visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = '';

        const planetImage = document.createElement("div");
        planetImage.style.backgroundImage =
        `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`;
        planetImage.className = "character-image";

        const name = document.createElement("span");
        name.className = "character-details";
        name.innerText = `Nome: ${planet.name}`;

        const rotation_period = document.createElement("span");
        rotation_period.className = "character-details";
        rotation_period.innerText = `rotacao: ${convertRotation(planet.rotation_period)}`;

        const diameter = document.createElement("span");
        diameter.className = "character-details";
        diameter.innerText = `diamentro: ${planet.diameter}`;

        const climate = document.createElement("span");
        climate.className = "character-details";
        climate.innerText = `Clima: ${convertClimate(planet.climate)}`;

        const population = document.createElement("span");
        population.className = "character-details";
        population.innerText = `populacao: ${convertPopulation(planet.population)}`;

        modalContent.appendChild(planetImage);
        modalContent.appendChild(name);
        modalContent.appendChild(rotation_period);
        modalContent.appendChild(diameter);
        modalContent.appendChild(climate);
        modalContent.appendChild(population);
      }

      mainContent.appendChild(card);
     });

     const nextButton = document.getElementById('next-button');
     const backButton = document.getElementById('back-button');

     nextButton.disabled = !responseJson.next;
     backButton.disabled = !responseJson.previous;

     backButton.style.visibility = responseJson.previous? "visible" : "hidden";
     

     currentPlanetUrl = url; // aqui muda o valor da página

  } catch (error){
    alert('Erro ao carregar os novos planetas');
    console.log(error);
  }
}

async function loadNextPage(){
  if(!currentPlanetUrl) return;

  try{
    const response = await fetch(currentPlanetUrl);
    const responseJson = await response.json();

    await loadPlanet(responseJson.next);

  }catch(error){
    console.log(error);
    alert('Erro ao carregar a próxima página');
  }
}

async function loadPreviousPage(){
  if(!currentPlanetUrl) return;

  try{
    const response = await fetch(currentPlanetUrl);
    const responseJson = await response.json();

    await loadPlanet(responseJson.previous);

  }catch(error){
    console.log(error);
    alert('Erro ao carregar a página anterior');
  }
}

function hideModal(){
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}

function convertClimate(climate){
  const clima = {
    arid: "arido",
    temperate: "termperado",
    tropical: "tropical",
    frozen: "congelado",
    murky: "escuro",
    
  };

  return clima[climate.toLowerCase()] || climate;
}

function convertPopulation(population){
  const populacao = {
    Number:"",
    unknown: "desconhecida",
  };

  return populacao[population.toLowerCase()] || population;
}

function convertRotation(rotationPeriod){
  if(rotationPeriod === ""){
    return Number;
  }
  
}

    