let currentVehicleUrl = 'https://swapi.dev/api/vehicles/';

window.onload = async () => {
 
  try{
    await loadVehicle(currentVehicleUrl);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar Cards dos Veículos!');
  }

  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');

  nextButton.addEventListener('click', loadNextPage);
  backButton.addEventListener('click', loadPreviousPage);

};

// retorno da url e criação dos cards dinamicamente pela DOM

async function loadVehicle(url) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = ''; // limpar os campos cards e reutiliza 

  try{

    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((vehicle) => {
      const card = document.createElement("div");
      card.style.backgroundImage =  
      `url('https://starwars-visualguide.com/assets/img/vehicles/${vehicle.url.replace(/\D/g, "")}.jpg')`; //cards dinâmicos
      card.className = "cards"
''
      const vehicleNameBG = document.createElement("div");
      vehicleNameBG.className = "character-name-bg";

      const vehicleName = document.createElement("span");
      vehicleName.className = "character-name";
      vehicleName.innerText = `${vehicle.name}`;

      vehicleNameBG.appendChild(vehicleName);
      card.appendChild(vehicleNameBG);

      /* criando e colocando informações no modal  */

      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility ="visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = '';

        const vehicleImage = document.createElement("div");
        vehicleImage.style.backgroundImage =
        `url('https://starwars-visualguide.com/assets/img/vehicles/${vehicle.url.replace(/\D/g, "")}.jpg')`;
        vehicleImage.className = "character-image";

        const name = document.createElement("span");
        name.className = "character-details";
        name.innerText = `Nome: ${vehicle.name}`;

        const model = document.createElement("span");
        model.className = "character-details";
        model.innerText = `modelo: ${vehicle.model}`;

        const passengers = document.createElement("span");
        passengers.className = "character-details";
        passengers.innerText = `passageiros: ${vehicle.passengers}`;

        const cargo_capacity = document.createElement("span");
        cargo_capacity.className = "character-details";
        cargo_capacity.innerText = `Capacidade máxima: ${vehicle.cargo_capacity}`;

        const vehicle_class = document.createElement("span");
        vehicle_class.className = "character-details";
        vehicle_class.innerText = `populacao: ${vehicle.vehicle_class}`;


        modalContent.appendChild(vehicleImage);
        modalContent.appendChild(name);
        modalContent.appendChild(model);
        modalContent.appendChild(passengers);
        modalContent.appendChild(cargo_capacity);
        modalContent.appendChild(vehicle_class);
      }

      mainContent.appendChild(card);
     });

     const nextButton = document.getElementById('next-button');
     const backButton = document.getElementById('back-button');

     nextButton.disabled = !responseJson.next;
     backButton.disabled = !responseJson.previous;

     backButton.style.visibility = responseJson.previous? "visible" : "hidden";
     

     currentVehicleUrl = url; // aqui muda o valor da página

  } catch (error){
    alert('Erro ao carregar os novos veículos');
    console.log(error);
  }
}

// acima daqui entra os asyncs dos currents
async function loadNextPage(){
  if(!currentVehicleUrl) return;

  try{
    const response = await fetch(currentVehicleUrl);
    const responseJson = await response.json();

    await loadVehicle(responseJson.next);

  }catch(error){
    console.log(error);
    alert('Erro ao carregar a próxima página');
  }
}

async function loadPreviousPage(){
  if(!currentVehicleUrl) return;

  try{
    const response = await fetch(currentVehicleUrl);
    const responseJson = await response.json();

    await loadVehicle(responseJson.previous);

  }catch(error){
    console.log(error);
    alert('Erro ao carregar a página anterior');
  }
}

function hideModal(){
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}

function convertPassagers(passengers){
  if(passengers === ""){
    return Number;
  }
}

function convertCapacity(capacity){
  if(capacity === ""){
    return ("").toString;
  }
}