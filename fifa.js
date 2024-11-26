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
  document.getElementById("pop_up_ajoute").classList.toggle('hidden')
}


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
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            
        }
    }
}

fetchPlayers();
