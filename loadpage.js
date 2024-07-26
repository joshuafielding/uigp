document.addEventListener("DOMContentLoaded", function() {
    for (let i = 1; i <= 3; i++) {
        const savedCharacter = localStorage.getItem(`slot${i}Character`);
        if (savedCharacter) {
            const characterData = JSON.parse(atob(savedCharacter));
            console.log(`Slot ${i} data:`, characterData);

            const bodyImage = document.getElementById(`body${i}`);
            bodyImage.src = characterData.body;
            const hairImage = document.getElementById(`Hair${i}`);
            hairImage.src = characterData.hair;
            const browsImage = document.getElementById(`Brows${i}`);
            browsImage.src = characterData.brows;
            const eyesImage = document.getElementById(`Eyes${i}`);
            eyesImage.src = characterData.eyes;
            const mouthImage = document.getElementById(`Mouth${i}`);
            mouthImage.src = characterData.mouth;
        }
    }
});

function selectSlot(slotNumber) {
    localStorage.setItem('selectedSlot', slotNumber);
    window.location.href = "character_customization.html";
}

function selectSlot(slotNumber) {
    localStorage.setItem('selectedSlot', slotNumber);
    window.location.href = "character_customization.html";
}

 // When the user clicks on div, open the popup
 function popFunction1() {
    var popup = document.getElementById("myPopup1");
    popup.classList.toggle("show");
}
function popFunction2() {
    var popup = document.getElementById("myPopup2");
    popup.classList.toggle("show");
}

//check if character has been created
function charExist(herosprite, slotNumber) {
    let qCheck = herosprite.includes("questionmark");
    if(qCheck == true){
        window.location.href = `charCreate.html?slot=${slotNumber}`;
    }
    else{
        window.location.href = `uigp.html?slot=${slotNumber}`;
    }
}

document.getElementById("submit1").onclick = function(){
    let herosprite = document.getElementById("body1").src;
    charExist(herosprite, 1);
}
document.getElementById("submit2").onclick = function(){
    let herosprite = document.getElementById("body2").src;
    charExist(herosprite, 2);
}
document.getElementById("submit3").onclick = function(){
    let herosprite = document.getElementById("body3").src;
    charExist(herosprite, 3);
}