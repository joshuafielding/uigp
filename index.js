let healthbar = 2;
let previoushealthbar = 2;
let playerdamage = 1;
let saveplayerdamage;
let critchance = 1;
let gold = 1000;
let goldgain;
let xp = 0;
let kills = 0;
let bossSpawned = false;
let questcompleted = false;
let enemyArray;
let randomSlime = 0;
let xpNeeded = 50;
let level = 1;
let passivedamage = 0;
let slot = false;

// Function to get the value of a query parameter by name
function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to initialize the slot number variable and load corresponding data
function initializeSlotNumber() {
    let slotNumber = getQueryParam('slot');
    if (slotNumber !== null) {
        console.log(`Slot number from URL: ${slotNumber}`);
        window.slotNumber = slotNumber;

        // Load saved data from localStorage for the specific slot
        xp = localStorage.getItem(`xp_slot_${slotNumber}`) ? parseInt(localStorage.getItem(`xp_slot_${slotNumber}`), 10) : 0;
        gold = localStorage.getItem(`gold_slot_${slotNumber}`) ? parseInt(localStorage.getItem(`gold_slot_${slotNumber}`), 10) : 0;
        healthbar = localStorage.getItem(`healthbar_slot_${slotNumber}`) ? parseInt(localStorage.getItem(`healthbar_slot_${slotNumber}`), 10) : 2;
        previoushealthbar = localStorage.getItem(`previoushealthbar_slot_${slotNumber}`) ? parseInt(localStorage.getItem(`previoushealthbar_slot_${slotNumber}`), 10) : 2;
        playerdamage = localStorage.getItem(`playerdamage_slot_${slotNumber}`) ? parseInt(localStorage.getItem(`playerdamage_slot_${slotNumber}`), 10) : 1;
        passivedamage = localStorage.getItem(`passivedamage_slot_${slotNumber}`) ? parseInt(localStorage.getItem(`passivedamage_slot_${slotNumber}`), 10) : 0;

        // Log the variables to the console
        console.log(`xp: ${xp}`);
        console.log(`gold: ${gold}`);
        console.log(`healthbar: ${healthbar}`);
        console.log(`previoushealthbar: ${previoushealthbar}`);
        console.log(`playerdamage: ${playerdamage}`);
        console.log(`passivedamage: ${passivedamage}`);

        // Update the DOM with saved values
        document.getElementById("xp").textContent = xp;
        document.getElementById("gold").textContent = gold;
        document.getElementById("healthbar").textContent = healthbar;
        document.getElementById("dmg").textContent = playerdamage;
        document.getElementById("passivedmg").textContent = passivedamage;
    } else {
        console.log('No slot number found in the URL.');
    }
}

// Call the function when the script loads
window.onload = initializeSlotNumber;

// Function to save current state to localStorage for the specific slot
function saveGame() {
    let slotNumber = window.slotNumber;
    if (slotNumber !== null) {
        localStorage.setItem(`xp_slot_${slotNumber}`, xp);
        localStorage.setItem(`gold_slot_${slotNumber}`, gold);
        localStorage.setItem(`healthbar_slot_${slotNumber}`, healthbar);
        localStorage.setItem(`previoushealthbar_slot_${slotNumber}`, previoushealthbar);
        localStorage.setItem(`playerdamage_slot_${slotNumber}`, playerdamage);
        localStorage.setItem(`passivedamage_slot_${slotNumber}`, passivedamage);
    }
}
//removes all chars after the last / and removes all chars after the first .
function enemyStringCleaner(text) {

    let lastSlashPos = text.lastIndexOf('/');    
    
    // If the first slash is not found, return null
    if (lastSlashPos === -1) {
      return null;
    }
    
    // Extract the substring starting from the first slash
    let substring = text.substring(lastSlashPos + 1);
    
    // Find the position of the first period in the substring
    let periodPos = substring.indexOf('.');
    
    // If the period is not found, return null
    if (periodPos === -1) {
      return null;
    }
    
    // Extract the desired string
    let result = substring.substring(0, periodPos).trim();
    
    return result;
  }

  // Update the DOM with saved values
document.getElementById("xp").textContent = xp;
document.getElementById("gold").textContent = gold;
document.getElementById("healthbar").textContent = healthbar;
document.getElementById("dmg").textContent = playerdamage;
document.getElementById("passivedmg").textContent = passivedamage;

function levelUp(lvlxp){
    if(lvlxp >= xpNeeded){
        level++;
        playerdamage++;
        xp = 0;
        xpNeeded *= 1.05;
        xpNeeded = Math.trunc(xpNeeded);
        document.getElementById("level").textContent = level;
        document.getElementById("dmg").textContent = Math.trunc(playerdamage);
    }
}

// Background areas
const areas = [
    'pic/backgrounds/meadow.jpeg',
    'pic/backgrounds/sewer.png',
    'pic/backgrounds/forest.png'
];

// Enemies for quests
const questenemies = [
    'pic/slime/slime.gif',
    'pic/enemies/gobby.gif',
    'pic/enemies/rat.gif'
];

// Enemies for quests
const bossenemies = [
    'pic/slime/slimesword.gif'
]

//mob variations
const slimeEnemies = ['pic/slime/black_slime.gif',
    'pic/slime/blue_slime.gif',
    'pic/slime/orange_slime.gif',
    'pic/slime/pink_slime.gif',
    'pic/slime/purple_slime.gif',
    'pic/slime/red_slime.gif',
    'pic/slime/slime.gif',
    'pic/slime/yellow_slime.gif' 
]

// Global object to store enemies for each area
const enemies = {
    meadowenemies: ['pic/enemies/gobby.gif', slimeEnemies[randomSlime]],
    sewerenemies: ['pic/enemies/rat.gif', 'pic/enemies/skel.gif']
};

function getrandomenemy() {
    var bodyStyle = window.getComputedStyle(document.body);
    let currentarea = bodyStyle.backgroundImage;
    
    //currentarea contains the correct URL format
    if (currentarea.includes('url(')) {
        currentarea = currentarea.slice(currentarea.indexOf('url(') + 4, currentarea.indexOf(')'));
    }
    
    let currentareasub = currentarea.substring(currentarea.lastIndexOf('pic/backgrounds') + 16); //get only the chars after pic/
    currentareasub = currentareasub.substring(0, currentareasub.lastIndexOf('.')); //remove the file extension
    
    let enemyindex = currentareasub + 'enemies';
    let enemyArray = enemies[enemyindex];
    
    if (!enemyArray) {
        console.error(`No enemies found for area: ${enemyindex}`);
        return null;
    }
    
    const randomIndex = Math.floor(Math.random() * enemyArray.length);
    return enemyArray[randomIndex];
}

//determines what enemy it should be when opening game
document.addEventListener('DOMContentLoaded', function() {
    let loadedenemy = getrandomenemy();
    document.getElementById("enemysprite").src = loadedenemy;
}, false);

//opens quests when opening game
document.addEventListener('DOMContentLoaded', function() {
    quests()
}, false);

//calculating critical hit chance:
function calccritchance() {
    let randomchance = Math.ceil(Math.random() * 10) - 1;
    return critchance > randomchance;
}

//function for the onclick event
function enemyClickHandler() {
    saveGame();
    document.getElementById("dmg").textContent = Math.trunc(playerdamage);

    if (healthbar > 0) {
        const crithit = calccritchance();
        localStorage.setItem("playerdamage", playerdamage);
        //if the critical hit chance succeeds, we multiply the playerdamage variable
        if (crithit) {
            document.getElementById("crittext").style.visibility = "visible";
            saveplayerdamage = playerdamage;
            playerdamage *= 3.5;
            healthbar -= playerdamage;
            playerdamage = saveplayerdamage;
        } else {
            healthbar -= playerdamage;
            document.getElementById("crittext").style.visibility = "hidden";
        }

        //if the healthbar decreases past 0 after the click we do this:
        if(healthbar <= 0){
            handleEnemyDefeat();
            document.getElementById("healthbar").textContent = Math.trunc(healthbar);
        }

        //update healthbar display
        document.getElementById("healthbar").textContent = Math.trunc(healthbar);
        
    }
    else{
        console.log("ERROR: enemy health was below 0")
        handleEnemyDefeat();
        document.getElementById("healthbar").textContent = Math.trunc(healthbar);
    }
}

//function to handle enemy defeat
function handleEnemyDefeat() {
    
    randomSlime = Math.floor(Math.random() * slimeEnemies.length);
    enemies.meadowenemies.push(slimeEnemies[randomSlime], 'pic/enemies/gobby.gif');
    
    if (healthbar <= 0) {
        previoushealthbar *= 1.02;
        localStorage.setItem("healthbar", healthbar);
        localStorage.setItem("previoushealthbar", previoushealthbar);
        healthbar = Math.ceil(previoushealthbar);

        //call quests function and store enemy sprite that was killed.
        let prevenemy = document.getElementById("enemysprite").src;
        let prevenemysub = enemyStringCleaner(prevenemy);
        quests(prevenemysub);

        //check if a quest has been completed and spawn a bigger enemy if needed
        if (questcompleted === true) {
            spawnBiggerEnemy();
        } else {
            //change the enemy sprite
            const randomenemy = getrandomenemy();
            document.getElementById("enemysprite").src = randomenemy;
            document.getElementById("enemysprite").classList.remove('bigger'); // Remove the bigger class if it exists
        }

        //player gains gold from enemy (non-slot)
        if(slot == false){
            goldgain = Math.trunc(Math.random() * 6) + 1;
            gold += goldgain;
            document.getElementById("gold").textContent = gold;
            document.getElementById("goldgain").textContent = "Gold gained: +" + goldgain;
        }

        //player gains gold from beating slot machine
        if(slot == true){
            goldgain = 100;
            gold += goldgain;
            document.getElementById("gold").textContent = gold;
            document.getElementById("goldgain").textContent = "Gold gained: +" + goldgain;
            slot = false;

            if(slotFireballCondition == true){
                fireball = true;
                document.getElementById("fireball").style.filter = "brightness(100%)";
            }

            if(slotFrogCondition == true){
                frogs = true;
                document.getElementById("frog").style.filter = "brightness(100%)";
            }

            if(slotStrengthCondition == true){
                strength = true;
                document.getElementById("strength").style.filter = "brightness(100%)";   
            }
        }


        //save gold to localStorage
        localStorage.setItem("gold", gold);

        //player gains xp
        xp += Math.trunc(Math.random() * 3) + 1;
        levelUp(xp);
        document.getElementById("xp").textContent = xp + "/" + xpNeeded;

        //save xp to localStorage
        localStorage.setItem("xp", xp);

        //kill count increases
        kills += 1;
        document.getElementById("kills").textContent = kills;
    }
}

//function to spawn a bigger enemy with more health
function spawnBiggerEnemy() {
    const biggerEnemy = 'pic/slime/slimesword.gif'; // Replace with the path to your bigger enemy sprite
    let bosshealthbar = previoushealthbar*2; // Increase health significantly for the bigger enemy
    healthbar = bosshealthbar;

    //change the enemy sprite to the bigger enemy and make it larger
    const enemySprite = document.getElementById("enemysprite");
    enemySprite.src = biggerEnemy;
    enemySprite.classList.add('bigger'); // CSS class to make it larger
    document.getElementById("healthbar").textContent = Math.trunc(healthbar);
    bossSpawned = true; // indicate the boss has been spawned
}

let prevkillsneeded = 6.5;
let questnum = 1;
let questkill = 0; // Initialize questkill if not already defined
let questscomplete = 0; // Initialize questscomplete if not already defined
let questenemy = questenemies[0]; // Initial quest enemy

// Function to handle quest system
function quests(enemy) {
    questcompleted = false;
    let killsneeded = Math.ceil(prevkillsneeded * 1.5);
    document.getElementById("killsneeded").textContent = killsneeded;
    // Ensure questenemy is set based on questscomplete
    if (questscomplete < questenemies.length) {
        questenemy = enemyStringCleaner(questenemies[questscomplete]);
    } 
    else {
        questenemy = undefined;
    }

    if (questenemy === undefined) {
        questscomplete = 0;
        questenemy = enemyStringCleaner(questenemies[questscomplete]); // Reset to the first enemy
    }

    document.getElementById("questenemy").textContent = questenemy + "s";
    document.getElementById("questenemyname").textContent = questenemy + "s";
    document.getElementById("questkills").textContent = questkill;
    document.getElementById("challengekillsneeded").textContent = killsneeded;
    document.getElementById("questnum").textContent = "#" + questnum + ": ";
    let questEnemyContain = enemy.includes(questenemy);

    if (questEnemyContain === true) {
        questkill++;
        document.getElementById("questkills").textContent = questkill;
    }

    if (questkill == killsneeded) {
        questscomplete++;
        prevkillsneeded = killsneeded;
        questnum++;
        questkill = 0; // Reset questkill for the next quest
        document.getElementById("questkills").textContent = questkill;
        questcompleted = true;
    }
}

// When the player clicks we run this function
document.getElementById("enemysprite").onclick = enemyClickHandler;

// Sets spells to be false / player has to purchase spells 
let fireball = false;
let frogs = false;
let strength = false;
let slots = false;


if(fireball == false){
    document.getElementById("fireball").style.filter = "brightness(0%)";
}

else if(fireball == true){
    document.getElementById("fireball").style.filter = "brightness(100%)";
}



if(frogs == false){
    document.getElementById("frog").style.filter = "brightness(0%)";
}

else if(frogs == true){
    document.getElementById("frog").style.filter = "brightness(100%)";
}



if(strength == false){
    document.getElementById("strength").style.filter = "brightness(0%)";
}

else if(strength == true){
    document.getElementById("strength").style.filter = "brightness(100%)";
}



if(slots == false){
    document.getElementById("slot").style.filter = "brightness(0%)";
}

else if(slots == true){
    document.getElementById("slot").style.filter = "brightness(100%)";
}





function fireballTrue(){
    fireball = true;
    document.getElementById("fireball").style.filter = "brightness(100%)";
}

document.getElementById("fireball").onclick = function() {

    if(fireball == true){
        healthbar -= 50;
        handleEnemyDefeat();
        document.getElementById("healthbar").textContent = Math.trunc(healthbar);
        document.getElementById("fireball").style.filter = "brightness(60%)";
        fireball = false;
        setTimeout(fireballTrue, 5000); //cooldown for the fireball spell
    }

}


function frogTrue(){
    frogs = true;
    document.getElementById("frog").style.filter = "brightness(100%)";
}

document.getElementById("frog").onclick = function() {

    if(frogs == true){
        healthbar = 1;
        prevenemy = document.getElementById("enemysprite").src;
        document.getElementById("enemysprite").src = 'pic/frog.png';
        document.getElementById("healthbar").textContent = Math.trunc(healthbar);
        document.getElementById("frog").style.filter = "brightness(60%)";
        frogs = false;
        setTimeout(frogTrue, 5000); //cooldown for the frog spell
    }
}



//returns player damage to 1 after 10 seconds of using the strength potion
function strengthDone(){
    document.getElementById("strength").style.filter = "brightness(100%)";
    playerdamage /= 2;
    document.getElementById("dmg").textContent = playerdamage;
    strength = true;
}

document.getElementById("strength").onclick = function() {

    if(strength == true){
        playerdamage *= 2;
        document.getElementById("dmg").textContent = playerdamage;
        document.getElementById("strength").style.filter = "brightness(60%)";
        strength = false;
        setTimeout(strengthDone, 10000); //cooldown for the strength spell
    }
}



let slotFireballCondition = false;
let slotFrogCondition = false;
let slotStrengthCondition = false;

function slotTrue(){ //slot potion cooldown ready 
    slots = true;
    document.getElementById("slot").style.filter = "brightness(100%)";
}

document.getElementById("slot").onclick = function(){

    if(slots == true){
        healthbar = healthbar *= 1.5;
        prevenemy = document.getElementById("enemysprite").src;
        document.getElementById("enemysprite").src = 'pic/enemies/moneymachine.gif';
        document.getElementById("healthbar").textContent = Math.trunc(healthbar);
        slot = true;
        slots = false;
        document.getElementById("slot").style.filter = "brightness(60%)";

        //other spells are disabled (temporary)
        if(slot == true){

            if(fireball == true){
                fireball = false;
                document.getElementById("fireball").style.filter = "brightness(60%)";
            }

            if(frogs == true){
                frogs = false;
                document.getElementById("frog").style.filter = "brightness(60%)";
            }

            if(strength == true){
                strength = false;
                document.getElementById("strength").style.filter = "brightness(60%)";
            }
        }
    }

        setTimeout(slotTrue, 120000); //cooldown for the slot spell
}


//sets the shop options to be available
let buyDmg = true;
let buyMem = true;
let buySpell = true;


//function shows popup stating the player doesn't have enough gold for purcahsing
function unblur(){
    document.getElementById("popup").style.visibility = "hidden";
    document.getElementById("spells").style.filter = "blur(0px)";
    document.getElementById("quests").style.filter = "blur(0px)";
    document.getElementById("goldbox").style.filter = "blur(0px)";
    document.getElementById("shop").style.filter = "blur(0px)";


    if(fireball == true){
        document.getElementById("fireball").style.filter = "brightness(100%)";
    }

    if(frogs == true){
        document.getElementById("frog").style.filter = "brightness(100%)";
    }

    if(strength == true){
        document.getElementById("strength").style.filter = "brightness(100%)";
    }

    if(slots == true){
        document.getElementById("slot").style.filter = "brightness(100%)";
    }


    buyDmg = true;
    buyMem = true
    buySpell = true;
}


//function shows the popup for not having enough gold / boxes are blurred
function blurs(){
    document.getElementById("popup").style.visibility = "visible";
    document.getElementById("spells").style.filter = "blur(8px)";
    document.getElementById("quests").style.filter = "blur(8px)";
    document.getElementById("goldbox").style.filter = "blur(8px)";
    document.getElementById("shop").style.filter = "blur(8px)";

    
    if(fireball == true){
        document.getElementById("fireball").style.filter = "brightness(60%)";
    }

    if(frogs == true){
        document.getElementById("frog").style.filter = "brightness(60%)";   
    }

    if(strength == true){
        document.getElementById("strength").style.filter = "brightness(60%)";
    }


    if(slots == true){
        document.getElementById("slot").style.filter = "brightness(60%)";
    }

    buyDmg = false;
    buyMem = false;
    buySpell = false;
}



document.getElementById("buyDamage").onclick = function(){
    if(gold >= 50){
        playerdamage *= 1.5;
        gold -= 50;
        document.getElementById("gold").textContent = gold;
        document.getElementById("dmg").textContent = Math.trunc(playerdamage);
    }

    else if(gold < 50){
        blurs();
        setInterval(unblur, 5000);
    }
}

document.getElementById("hireMember").onclick = function(){
    if(gold >= 250){
        passivedamage += 2;
        localStorage.setItem("passivedamage", passivedamage);
        gold -= 250;
        document.getElementById("gold").textContent = gold;
        document.getElementById("passivedmg").textContent = Math.trunc(passivedamage);
    }

    else if(gold < 50){
        blurs();
        setInterval(unblur, 5000);
    }
}

function decreaseNumber() {
    healthbar -= passivedamage;
    if(healthbar <= 0){
        handleEnemyDefeat();
    }
    document.getElementById("healthbar").innerText = Math.trunc(healthbar);
}

setInterval(decreaseNumber, 1000);


//condition to know if the player has purchased a specific spell
let fireballPurchased = false;
let frogPurchased = false;
let strengthPurchased = false;
let slotPurchased = false;


document.getElementById("buySpell").onclick = function(){

    if(buySpell == true){
        document.getElementById("spellsPopup").style.visibility = "visible";
    }

    else if(buySpell == false){
        document.getElementById("spellsPopup").style.visibility = "hidden";
    }

}


document.getElementById("exit").onclick = function(){
    document.getElementById("spellsPopup").style.visibility = "hidden";
}


//fireball spell purchase
document.getElementById("fireball_buy").onclick = function(){

    if(fireballPurchased == false){
        document.getElementById("spellsPopup").style.visibility = "hidden";
        document.getElementById("spellInfo").style.visibility = "visible";
    
        document.getElementById("spellImg").style.backgroundImage = "url('pic/fireballicon.png')";
        document.getElementById("spellName").textContent = "Fireball Potion";
        document.getElementById("spellDesc").textContent = "The Fireball Potion";
    
        
        document.getElementById("spellPurchase").onclick = function(){
    
    
    
            if(gold < 500){
                document.getElementById("spellInfo").style.visibility = "hidden";
                document.getElementById("popup").style.visibility = "visible";
                blurs();
                setInterval(unblur, 5000);
            }
        
            else if(gold >= 500){
    
                gold -= 500;
                document.getElementById("gold").textContent = gold;
                fireball = true;
                document.getElementById("fireball").style.filter = "brightness(100%)";
                fireballPurchased = true;
                slotFireballCondition = true;
                document.getElementById("fireball_buy").style.filter = "brightness(70%)";
                document.getElementById("fireball_buy").style.cursor = "default";
    
                document.getElementById("spellInfo").style.visibility = "hidden";
                document.getElementById("spellsPopup").style.visibility = "visible"; 
            }
        }
    }
}


//frog spell purchase
document.getElementById("frog_buy").onclick = function(){

    if(frogPurchased == false){
        document.getElementById("spellsPopup").style.visibility = "hidden";
        document.getElementById("spellInfo").style.visibility = "visible";
    
        document.getElementById("spellImg").style.backgroundImage = "url('pic/frogicon.png')";
        document.getElementById("spellName").textContent = "Frog-Into Spell";
        document.getElementById("spellDesc").textContent = "The  Frog-Into Spell";
    
        
        document.getElementById("spellPurchase").onclick = function(){
    
    
            if(gold < 500){
                document.getElementById("spellInfo").style.visibility = "hidden";
                document.getElementById("popup").style.visibility = "visible";
                blurs();
                setInterval(unblur, 5000);
            }
        
            else if(gold >= 500){
    
                gold -= 500;
                document.getElementById("gold").textContent = gold;
                frogs = true;
                document.getElementById("frog").style.filter = "brightness(100%)";
                frogPurchased = true;
                slotFrogCondition = true;
                document.getElementById("frog_buy").style.filter = "brightness(70%)";
                document.getElementById("frog_buy").style.cursor = "default";
    
                document.getElementById("spellInfo").style.visibility = "hidden";
                document.getElementById("spellsPopup").style.visibility = "visible";
            }
        }
    }
}




//strength spell purchase
document.getElementById("strength_buy").onclick = function(){

    if(strengthPurchased == false){
        document.getElementById("spellsPopup").style.visibility = "hidden";
        document.getElementById("spellInfo").style.visibility = "visible";
    
        document.getElementById("spellImg").style.backgroundImage = "url('pic/strengthicon.png')";
        document.getElementById("spellName").textContent = "Strength Potion";
        document.getElementById("spellDesc").textContent = "The  Strengths Potion";
    
        
        document.getElementById("spellPurchase").onclick = function(){
    
    
            if(gold < 500){
                document.getElementById("spellInfo").style.visibility = "hidden";
                document.getElementById("popup").style.visibility = "visible";
                blurs();
                setInterval(unblur, 5000);
            }
        
            else if(gold >= 500){
    
                gold -= 500;
                document.getElementById("gold").textContent = gold;
                strength = true;
                document.getElementById("strength").style.filter = "brightness(100%)";
                strengthPurchased = true;
                slotStrengthCondition = true;
                document.getElementById("strength_buy").style.filter = "brightness(70%)";
                document.getElementById("strength_buy").style.cursor = "default";
    
                document.getElementById("spellInfo").style.visibility = "hidden";
                document.getElementById("spellsPopup").style.visibility = "visible";
            }
        }
    }
}



//slot enemy spell purchase
document.getElementById("slot_buy").onclick = function(){

    if(slotPurchased == false){
        document.getElementById("spellsPopup").style.visibility = "hidden";
        document.getElementById("spellInfo").style.visibility = "visible";
    
        document.getElementById("spellImg").style.backgroundImage = "url('pic/sloticon.png')";
        document.getElementById("spellName").textContent = "Money Time";
        document.getElementById("spellDesc").textContent = "The  Money Time Spell";
    
        
        document.getElementById("spellPurchase").onclick = function(){
    
    
            if(gold < 500){
                document.getElementById("spellInfo").style.visibility = "hidden";
                document.getElementById("popup").style.visibility = "visible";
                blurs();
                setInterval(unblur, 5000);
            }
        
            else if(gold >= 500){
    
                gold -= 500;
                document.getElementById("gold").textContent = gold;
                slots = true;
                document.getElementById("slot").style.filter = "brightness(100%)";
                slotPurchased = true;
                document.getElementById("slot_buy").style.filter = "brightness(70%)";
                document.getElementById("slot_buy").style.cursor = "default";
    
                document.getElementById("spellInfo").style.visibility = "hidden";
                document.getElementById("spellsPopup").style.visibility = "visible";
            }
        }
    }
}

document.getElementById("spellCancel").onclick = function(){
    document.getElementById("spellsPopup").style.visibility = "visible";
    document.getElementById("spellInfo").style.visibility = "hidden";
}

function updateBackground() {
    if(questenemies[0].includes(questenemy) == true){
        backgroundUrl = 'url("pic/backgrounds/meadow.png")';
    }
    else if(questenemies[1].includes(questenemy) == true){
        backgroundUrl = 'url("pic/backgrounds/meadow.png")';
    }
    else if(questenemies[2].includes(questenemy) == true){
        backgroundUrl = 'url("pic/backgrounds/sewer.png")';
    }
    document.body.style.backgroundImage = backgroundUrl;
}

setInterval(updateBackground, 1);