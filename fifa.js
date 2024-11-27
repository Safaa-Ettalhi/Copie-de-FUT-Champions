// show menu buger for phone
let menu = document.getElementById("menu-mobile");
document.getElementById('burger').addEventListener('click',function(){
    menu.classList.toggle('hidden');
})

//  open the popup add players
function openPopup() {
  document.getElementById("playerPopup").classList.remove("hidden");
}

//  close the popup
function closePopup() {
  document.getElementById("playerPopup").classList.add("hidden");
}
// open the popup add players in terrain
function pop(tst){
  if(tst.classList.contains('vide')){
    //select a player
    console.log('select a player');
  }else{
    //update player
    document.getElementById("pop_up_ajoute").classList.toggle('hidden');
    let id = tst.parentElement.getAttribute('playerId');
    const player = data.players.find(item => item.id == id);
    if(player){
      updateId.value = player.id
      updateName.value = player.name
      updateClub.value = player.club
      updatePosition.value= player.position
      updateNatio.value= player.nationality
      updatePhoto.value= player.photo
      updatePace.value= player.pace
      updateShooting.value= player.shooting
      updatePassing.value= player.passing
      updateDribbling.value= player.dribbling
      updateDefending.value= player.defending
      updatePhysical.value= player.physical
    }
    
  }
}

function update(){
  const player = {
    'id' : updateId.value,
    'name' : updateName.value,
    'club' : updateClub.value,
    'position' : updatePosition.value,
    'nationality' : updateNatio.value,
    'photo' : updatePhoto.value,
    'pace' : updatePace.value,
    'shooting' : updateShooting.value,
    'passing' : updatePassing.value,
    'dribbling' : updateDribbling.value,
    'defending' : updateDefending.value,
    'physical' : updatePhysical.value,
  }

  const index = data.players.findIndex(item => item.id == player.id)
  if(index != -1){
    data.players[index] = player
    localStorage.setItem("players", JSON.stringify(data));
  }
}

// recuperation des donner joueurs 
document.querySelectorAll
let data = [];

async function fetchPlayers() {
    let storedData = localStorage.getItem('players');
    if (storedData) {
        data = JSON.parse(storedData);
    } else {
        try {
            const response = await fetch('\players.json');
            const fetchedData = await response.json();
            if (fetchedData) {
                data = fetchedData;
                localStorage.setItem("players", JSON.stringify(data));
                displayAllPlayers(fetchedData.players);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            
        }
    }
}

fetchPlayers();

//affichage des joueurs:

let dataplayers = data.players;
let players = document.getElementById("players");

function displayAllPlayers(dataplayers){
  players.innerHTML = ''
    dataplayers.forEach(element => {
        if(element.position != 'GK'){
    players.innerHTML += `
      <div class="relative w-72 bg-cover bg-center p-4 text-white" style="background-image: url('baggef.webp');">
            <div id="rating" class="absolute top-16 left-10   text-4xl font-bold">
              ${element.rating}
            </div>
            <div id="position" class=" absolute top-24 left-10 text-sm font-bold pt-1  text-white px-2 rounded">
            ${element.position}
            </div>
            <div class="flex flex-col items-center mt-12">
              <img id="photo" src="${element.photo}" alt="Lionel Messi" class="w-44">
              <h1 id="name" class="text-xl font-bold">${element.name}</h1>
              <div class="flex items-center">
                <img id="flag" src="${element.flag}" alt="Argentina" class="w-5 h-5 mr-2">
                <img id="logo" src="${element.logo}" alt="Inter Miami" class="w-5 h-5 mr-2">
              </div>
            </div>
            <div class="flex flex-col  items-center space-y-1">
              <div class="flex text-white justify-around w-full px-4">
                <span  class="text-sm ">PAC</span>
                <span  class="text-sm ">SHO</span>
                <span  class="text-sm ">KIC</span>
                <span  class="text-sm ">REF</span>
                <span  class="text-sm ">SPE</span>
                <span  class="text-sm ">POS</span>
              </div>
              <div class="flex justify-around text-white w-full px-4 pb-6">
              <span id="pace" class="text-sm font-bold ">${element.pace}</span>
              <span id="shooting" class="text-sm font-bold ">${element.shooting}</span>
              <span id="passing" class="text-sm font-bold ">${element.passing}</span>
              <span id="dribbling" class="text-sm font-bold ">${element.dribbling}</span>
              <span id="defending" class="text-sm font-bold ">${element.defending}</span>
              <span id="physical" class="text-sm font-bold ">${element.physical}</span>
            </div>
           </div>
    `
  }else{
    players.innerHTML += `
    <div class="relative w-72 bg-cover bg-center p-4 text-white" style="background-image: url('baggef.webp');">
          <div id="rating" class="absolute top-16 left-10   text-4xl font-bold">
            ${element.rating}
          </div>
          <div id="position" class=" absolute top-24 left-10 text-sm font-bold pt-1 px-2 rounded">
          ${element.position}
          </div>
          <div class="flex flex-col items-center mt-12">
            <img id="photo" src="${element.photo}" alt="Lionel Messi" class="w-44">
            <h1 id="name" class="text-xl font-bold">${element.name}</h1>
            <div class="flex items-center">
              <img id="flag" src="${element.flag}" alt="Argentina" class="w-5 h-5 mr-2">
              <img id="logo" src="${element.logo}" alt="Inter Miami" class="w-5 h-5 mr-2">
            </div>
          </div>
          <div class="flex flex-col items-center space-y-1">
            <div class="flex justify-around text-white w-full px-4">
              <span  class="text-sm ">DIV</span>
              <span  class="text-sm ">HAN</span>
              <span  class="text-sm ">PAS</span>
              <span  class="text-sm ">DRI</span>
              <span  class="text-sm ">DEF</span>
              <span  class="text-sm ">PHY</span>
            </div>
            <div class="flex justify-around w-full px-4 pb-6">
                <span id="pace" class="text-sm font-bold ">${element.diving}</span>
                <span id="shooting" class="text-sm font-bold ">${element.handling}</span>
                <span id="passing" class="text-sm font-bold ">${element.kicking}</span>
                <span id="dribbling" class="text-sm font-bold ">${element.reflexes}</span>
                <span id="defending" class="text-sm font-bold ">${element.speed}</span>
                <span id="physical" class="text-sm font-bold ">${element.positioning}</span>
              </div>
         </div>
  `

  }
  });
}
displayAllPlayers(dataplayers);





// Fonction de recherche
function searchPlayer() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase(); 
  const playersDivs = document.querySelectorAll('#players .relative'); 

  playersDivs.forEach(playerDiv => {
      const playerTextContent = playerDiv.textContent.toLowerCase();

      if (playerTextContent.includes(searchInput)) {
          playerDiv.style.display = 'block';
      } else {
          playerDiv.style.display = 'none';
      }
  });
}
