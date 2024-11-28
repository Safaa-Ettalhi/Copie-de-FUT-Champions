// show menu buger for phone
let menu = document.getElementById("menu-mobile");
document.getElementById('burger').addEventListener('click',function(){
    menu.classList.toggle('hidden');
})

//  open the popup add players in pageplayers
function openPopup() {
  document.getElementById("playerPopup").classList.remove("hidden");
}

//  close the popup to add players in pageplayers
function closePopup() {
  document.getElementById("playerPopup").classList.add("hidden");
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
            <button onclick="deletePlayer(${element.id})" class=" rounded-full bg-red-600 h-8 w-8 text center  hover:bg-red-800">
              <i class="ri-delete-bin-7-line"></i>
            </button>
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
          <button onclick="deletePlayer(${element.id})" class=" rounded-full bg-red-600 h-8 w-8 text center  hover:bg-red-800">
              <i class="ri-delete-bin-7-line"></i>
          </button>
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

// ajouter un joueur 
function AddPlayer() {
  // Récupération des valeurs
  const playerName = document.getElementById('playerName').value;
  const photo = document.getElementById('img').value; 
  const playerPosition = document.getElementById('playerPosition').value;
  const nationality = document.getElementById('Nationaliter').value;
  const flag = document.getElementById('flag').value; 
  const club = document.getElementById('club').value;
  const logo = document.getElementById('logo').value; 
  const rating = document.getElementById('rating').value;
  const pace = document.getElementById('pace').value;
  const shooting = document.getElementById('shooting').value;
  const passing = document.getElementById('passing').value;
  const dribbling = document.getElementById('dribbling').value;
  const defending = document.getElementById('defending').value;
  const physical = document.getElementById('physical').value;

  // Création  d'un nouvel objet joueur
  const newPlayer = {
    id : data.players.length > 0 ? data.players[data.players.length-1].id+1 : 1,
    name: playerName,
    position: playerPosition,
    nationality: nationality,
    club: club,
    rating: rating,
    pace: pace,
    shooting: shooting,
    passing: passing,
    dribbling: dribbling,
    defending: defending,
    physical: physical,
    photo: photo, 
    flag: flag, 
    logo: logo 
  };
  // ajouter l'objet au liste des players
  data.players.push(newPlayer);
  
  localStorage.setItem('players', JSON.stringify(data));
  displayAllPlayers(data.players);
  closePopup();

}

// supression  d-un joueur 
function deletePlayer(playerId) {

  const index = data.players.findIndex(player => player.id === playerId);
 // verification si le player de cette id exict   
  if (index !== -1) {
    
    data.players.splice(index, 1);
    localStorage.setItem("players", JSON.stringify(data));
 
    displayAllPlayers(data.players);

  }
}



// function qui permet dafficher un modal pour ajouter au terrain 
function pop(card) {
    document.getElementById('playerModal').classList.remove('hidden');
    displayPlayersInModal(data.players, card.parentElement.id);  
}

// close modal 
function closeModal() {
  document.getElementById('playerModal').classList.add('hidden');
}

// afficher les joueur dans le modal
function displayPlayersInModal(players, target) {
  // console.log(target); // Vérifiez les données ici
  const container = document.getElementById('playersContainer');
  container.innerHTML = ''; 

  players.forEach((player) => {
    const playerCard = document.createElement('div');
    playerCard.className =
      'flex items-center p-2 border-2 rounded cursor-pointer bg-white hover:bg-gray-200 hover:border-white ';
    playerCard.innerHTML = `
    <div class='flex'>
      <div>
      <img src="${player.photo}" alt="${player.name}" class="w-12 h-12 rounded-full mr-2"></div>
      <div>
        <p class="font-bold">${player.name}</p>
        <div class="flex gap-4">
        <p class="text-sm text-gray-500">${player.rating}</p>
        <p class="text-sm text-gray-500">${player.position}</p></div>
        <p class="text-sm text-gray-500">${player.nationality}</p>
      </div></div>
    `;
    playerCard.addEventListener('click', () => selectPlayer(player, target));
    container.appendChild(playerCard);
  });
}


