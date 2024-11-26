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


