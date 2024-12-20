let stadiumPlayers = []

// show menu buger for phone
let menu = document.getElementById("menu-mobile");
document.getElementById('burger').addEventListener('click',function(){
    menu.classList.toggle('hidden');
})

//  open the popup add players in page players
function openPopup() {
  document.getElementById("playerPopup").classList.remove("hidden");
}

//  close the popup to add players in pageplayers
function closePopup() {
  document.getElementById("playerPopup").classList.add("hidden");
}
// recuperation des donner joueurs 
// document.querySelectorAll
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
      <div class="relative w-72 bg-cover bg-center p-4 text-white" style="background-image: url('bf.png');">
            <div id="rating" class="absolute top-16 left-10   text-4xl font-bold">
              ${element.rating}
            </div>
            <div id="position" class=" absolute top-24 left-10 text-sm font-bold pt-1  text-white px-2 rounded">
            ${element.position}
            </div>
            <div class="flex flex-col items-center mt-12">
              <img id="photo" src="${element.photo}" alt="picture" class="w-44">
              <h1 id="name" class="text-xl font-bold">${element.name}</h1>
              <div class="flex items-center">
                <img id="flag" src="${element.flag}" alt="pays" class="w-5 h-5 mr-2">
                <img id="logo" src="${element.logo}" alt="logo" class="w-5 h-5 mr-2">
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
    <div class="relative w-72 bg-cover bg-center p-4 text-white" style="background-image: url('bf.png');">
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
  const playerName = document.getElementById('playerName');
  const photo = document.getElementById('img'); 
  const playerPosition = document.getElementById('playerPosition');
  const nationality = document.getElementById('Nationaliter');
  const flag = document.getElementById('flag'); 
  const club = document.getElementById('club');
  const logo = document.getElementById('logo'); 
  const rating = document.getElementById('rating');
  const pace = document.getElementById('pace');
  const shooting = document.getElementById('shooting');
  const passing = document.getElementById('passing');
  const dribbling = document.getElementById('dribbling');
  const defending = document.getElementById('defending');
  const physical = document.getElementById('physical');

  if(validate()){
    // Création  d'un nouvel objet joueur
    const newPlayer = {
      id : data.players.length > 0 ? data.players[data.players.length-1].id+1 : 1,
      name: playerName.value,
      position: playerPosition.value,
      nationality: nationality.value,
      club: club.value,
      rating: rating.value,
      photo: photo.value, 
      flag: flag.value, 
      logo: logo.value 
    };

    if(newPlayer.position == 'GK'){
      newPlayer['diving'] = pace.value
      newPlayer['handling'] = shooting.value
      newPlayer['kicking'] = passing.value
      newPlayer['reflexes'] = dribbling.value
      newPlayer['speed'] = defending.value
      newPlayer['positioning'] = physical.value
    }else{
      newPlayer['pace'] = pace.value
      newPlayer['shooting'] = shooting.value
      newPlayer['passing'] = passing.value
      newPlayer['dribbling'] = dribbling.value
      newPlayer['defending'] = defending.value
      newPlayer['physical'] = physical.value
    }
    // ajouter l'objet au liste des players
    data.players.push(newPlayer);
    
    localStorage.setItem('players', JSON.stringify(data));
    displayAllPlayers(data.players);
    closePopup();
    menu.classList.add('hidden');
  }
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



// function qui permet dafficher un modal pour ajouter un joueur au terrain 
function pop(card) {
  // console.log(card)
    if(card.parentElement.id.includes('card')){
    document.getElementById('playerModal').classList.remove('hidden');
    displayPlayersInModal(data.players, card.parentElement.id);
    // if(!card.getAttribute("src")){
    //   stadiumPlayers=stadiumPlayers.filter(item=>item!=card.id)
    // }
          stadiumPlayers=stadiumPlayers.filter(item=>item!=card.id)

  }
}

// close modal 
function closeModal() {
  document.getElementById('playerModal').classList.add('hidden');
}

// afficher les joueur dans le modal
function displayPlayersInModal(players, target) {
  const positions = {
    def: ['CB', 'LB', 'RB'],
    mid: ['CM', 'CDM', 'RM', 'LM'],
    att: ['LW', 'ST', 'RW'],
  } 

  const targetCard = document.getElementById(target)
  let playersClone = [...players]

  if(targetCard.classList.contains('def')){
    playersClone = playersClone.filter(item => positions.def.findIndex(i => i == item.position) != -1)
  }else if(targetCard.classList.contains('mid')){
    playersClone = playersClone.filter(item => positions.mid.findIndex(i => i == item.position) != -1)
  }else if(targetCard.classList.contains('att')){
    playersClone = playersClone.filter(item => positions.att.findIndex(i => i == item.position) != -1)
  }else{
    playersClone = playersClone.filter(item => item.position == 'GK')
  }

  playersClone = playersClone.filter(item => stadiumPlayers.findIndex(i => i == item.id) == -1)
  const container = document.getElementById('playersContainer');
  //console.log(container);
  
  container.innerHTML = ''; 

  playersClone.forEach((player) => {
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
    playerCard.addEventListener('click', (e) => {
      // console.log(e.target);
      
      selectPlayer(player, target)
    });
    container.appendChild(playerCard);
  });
}


// selectionner un player dans le terrain 
function selectPlayer(player, targetCardId) {
  // Récupérer la carte ciblée par son ID
  const targetCard = document.getElementById(targetCardId);
  targetCard.innerHTML = `
    <div class="relative w-24 h-32 bg-cover bg-center p-2 text-white" style="background-image: url('./bf.png');" id="${player.id}" onclick="pop(this)" >
      <div id="rating" class="absolute mt-1 top-3 left-3 text-xs font-semibold">
        ${player.rating}
      </div>
      <div id="position" class="absolute mt-1 top-7 left-3 text-xs font-bold rounded">
        ${player.position}
      </div>
      <div class="flex flex-col items-center mt-1">
        <img id="photo" src="${player.photo}" alt="${player.name}" class="w-16 h-14">
        <h1 id="name" class="text-xs font-semibold text-center">${player.name}</h1>
        <div class="flex justify-center text-xs">${player.nationality}</div>
      </div>
      <button class="absolute top-4 right-2 w-4 h-4 rounded-full bg-red-500 text-black flex items-center justify-center hover:bg-gray-300 hover:text-red-600" onclick="removePlayer('${targetCardId}')">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L6 10M18 18L18 10M4 6H20M9 6V4H15V6" />
        </svg>
      </button>
    </div>
  `;

  stadiumPlayers.push(player.id)
  //console.log(stadiumPlayers)
  closeModal();
}

// supprimer un player dans le terrain
function removePlayer(targetCardId) {
  // Récupérer de carte selon leur id
  const targetCard = document.getElementById(targetCardId);
  
  // Réinitialiser le contenu
  targetCard.innerHTML = `
    <img src="bf.png" alt="Empty Card" class="h-32 w-24 vide" onclick="pop(this)">
  `;
 
}

function validate() {
  // Récupération des valeurs des champs
  const playerName = document.getElementById("playerName").value;
  const photo = document.getElementById("img").value;
  const playerPosition = document.getElementById("playerPosition").value;
  const nationality = document.getElementById("Nationaliter").value;
  const flag = document.getElementById("flag").value;
  const club = document.getElementById("club").value;
  const logo = document.getElementById("logo").value;
  const rating = document.getElementById("rating").value;
  const pace = document.getElementById("pace").value;
  const shooting = document.getElementById("shooting").value;
  const passing = document.getElementById("passing").value;
  const dribbling = document.getElementById("dribbling").value;
  const defending = document.getElementById("defending").value;
  const physical = document.getElementById("physical").value;

  // Validation des champs obligatoires
  if (!playerName || !photo || !playerPosition || !nationality || !flag || !club || !logo) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return false; 
  }

  // Validation des compétences (numériques) pour s'assurer qu'elles ne sont pas égales à 0
  if (!rating || !pace || !shooting || !passing || !dribbling || !defending || !physical) {
      alert("Les valeurs des compétences (note, vitesse, tir, passe, dribble, défense, physique) sont obligatoires.");
      return false;
  }

  if (rating == 0 || pace == 0 || shooting == 0 || passing == 0 || dribbling == 0 || defending == 0 || physical == 0) {
      alert("Les compétences ne peuvent pas être égales à 0.");
      return false;
  }

  
  if (rating < 1 || rating > 100 || pace < 1 || pace > 100 || shooting < 1 || shooting > 100 || 
      passing < 1 || passing > 100 || dribbling < 1 || dribbling > 100 || defending < 1 || defending > 100 || 
      physical < 1 || physical > 100) {
      alert("Les compétences doivent être entre 1 et 100.");
      return flase;
  }

  return true
  
  alert("Le joueur a été ajouté avec succès!");
}

//change label popup
document.getElementById('playerPosition').addEventListener('change', (e) => {
  const pace = document.getElementById('pace')
  const shooting = document.getElementById('shooting')
  const passing = document.getElementById('passing')
  const dribbling = document.getElementById('dribbling')
  const defending = document.getElementById('defending')
  const physical = document.getElementById('physical')

  if(e.target.value == 'GK'){
      pace.previousElementSibling.textContent = 'Diving'
      pace.setAttribute('placeholder', 'Enter player diving')

      shooting.previousElementSibling.textContent = 'Handling'
      shooting.setAttribute('placeholder', 'Enter player handling')

      passing.previousElementSibling.textContent = 'Kicking'
      passing.setAttribute('placeholder', 'Enter player kicking')

      dribbling.previousElementSibling.textContent = 'Reflexes'
      dribbling.setAttribute('placeholder', 'Enter player reflexes')

      defending.previousElementSibling.textContent = 'Speed'
      defending.setAttribute('placeholder', 'Enter player speed')

      physical.previousElementSibling.textContent = 'Positioning'
      physical.setAttribute('placeholder', 'Enter player positioning')
  }else{
      pace.previousElementSibling.textContent = 'Pace'
      pace.setAttribute('placeholder', 'Enter player pace')

      shooting.previousElementSibling.textContent = 'Shooting'
      shooting.setAttribute('placeholder', 'Enter player shooting')

      passing.previousElementSibling.textContent = 'Passing'
      passing.setAttribute('placeholder', 'Enter player passing')

      dribbling.previousElementSibling.textContent = 'Dribbling'
      dribbling.setAttribute('placeholder', 'Enter player dribbling')

      defending.previousElementSibling.textContent = 'Defending'
      defending.setAttribute('placeholder', 'Enter player defending')

      physical.previousElementSibling.textContent = 'Physical'
      physical.setAttribute('placeholder', 'Enter player physical')
  }
})