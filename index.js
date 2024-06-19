let healthbar = 25;
let previoushealthbar = 25;
let playerdamage = 1;
let saveplayerdamage;
let critchance = 1;
let gold = 0;
let goldgain;
let xp = 0;

// Load saved xp and gold from localStorage
if (localStorage.getItem("xp")) {
    xp = parseInt(localStorage.getItem("xp"), 10);
}
if (localStorage.getItem("gold")) {
    gold = parseInt(localStorage.getItem("gold"), 10);
}

// Update the DOM with saved values
document.getElementById("xp").textContent = xp;
document.getElementById("gold").textContent = gold;

//gets username from homepage
const username = localStorage.getItem("username");
document.getElementById("username").textContent = username;
console.log(username);

//enemy array, can create multiple for different areas.
const enemies = [
    'pic/rat.gif',
    'pic/skel.gif',
    'pic/skelhat.gif',
    'pic/slimesword.gif'
];

//function to get different enemies
function getrandomenemy() {
    const randomIndex = Math.floor(Math.random() * enemies.length);
    return enemies[randomIndex];
}

//calculating critical hit chance:
function calccritchance(){
    let randomchance = Math.ceil(Math.random() * 10) - 1;
    console.log(randomchance);
    return critchance > randomchance;
}

//function for the onclick event
function enemyClickHandler() {
    console.profile();
    if (healthbar > 0) {
        const crithit = calccritchance();

        //if the critical hit chance succeeds, we multiply the playerdamage variable
        if(crithit) {
            document.getElementById("crittext").style.visibility = "visible";
            saveplayerdamage = playerdamage;
            playerdamage *= 3.5;
            healthbar -= playerdamage;
            playerdamage = saveplayerdamage;
        } else {
            healthbar -= playerdamage;
            document.getElementById("crittext").style.visibility = "hidden";
        }

        // Update healthbar display
        document.getElementById("enemyhealth").textContent = Math.trunc(healthbar);
    }
}

//function to handle enemy defeat
function handleEnemyDefeat() {
    if (healthbar <= 0) {
        previoushealthbar *= 1.25;
        healthbar = previoushealthbar;

        // Change the enemy sprite
        const randomenemy = getrandomenemy();
        document.getElementById("enemysprite").src = randomenemy;
        document.getElementById("enemyhealth").textContent = Math.trunc(healthbar);

        // Player gains gold
        goldgain = Math.trunc(Math.random() * 6) + 1;
        gold += goldgain;
        document.getElementById("gold").textContent = gold;
        document.getElementById("goldgain").textContent = "Gold gained: +" + goldgain;

        // Save gold to localStorage
        localStorage.setItem("gold", gold);

        // Player gains xp
        xp += Math.trunc(Math.random() * 3) + 1;
        document.getElementById("xp").textContent = xp;

        // Save xp to localStorage
        localStorage.setItem("xp", xp);
    }
}

//checks if enemy health is below 0
setInterval(handleEnemyDefeat, 100);

// when the player clicks we run this function
document.getElementById("enemysprite").onclick = enemyClickHandler;


document.getElementById("fireball").onclick = function() {
    healthbar -= 50;
    oldsprite = document.getElementById("enemysprite").src;
    document.getElementById("enemysprite").src = 'pic/explosion.gif';
    document.getElementById("enemyhealth").textContent = Math.trunc(healthbar);
}

document.getElementById("frog").onclick = function() {
    healthbar = 1;
    document.getElementById("enemysprite").src = 'pic/frog.png';
    document.getElementById("enemyhealth").textContent = Math.trunc(healthbar);
}
