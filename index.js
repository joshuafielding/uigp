let healthbar = 10;
let previoushealthbar = 10;
let playerdamage = 1;
let saveplayerdamage;
let critchance = 1;
let gold = 0;
let goldgain;
let xp = 0;
let kills = 0;
let bossSpawned = false;
let questcompleted = false;

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

// Background areas
const areas = [
    'pic/meadow.jpeg',
    'pic/forest.jpeg',
    'pic/sewer.jpg'
];

// Enemies for the meadow area
const meadowenemies = [];

// Enemies for quests
const questenemies = [
    'pic/slime.gif',
    'pic/gobby.gif'
];

// Determines what enemy it should be when opening game
document.addEventListener('DOMContentLoaded', function() {
    let loadedenemy = getrandomenemy();
    document.getElementById("enemysprite").src = loadedenemy;
}, false);

// Global object to store enemies for each area
const enemies = {
    meadowenemies: ['pic/slime.gif', 'pic/gobby.gif'],
    general: ['pic/rat.gif', 'pic/skel.gif', 'pic/skelhat.gif', 'pic/slimesword.gif', 'pic/slime.gif', 'pic/gobby.gif'],
};

// Function to get different enemies
function getrandomenemy() {
    var bodyStyle = window.getComputedStyle(document.body);
    let currentarea = bodyStyle.backgroundImage;
    let currentareasub = currentarea.substring(currentarea.indexOf('pic/') + 4); // Get the part after pic/
    currentareasub = currentareasub.substring(0, currentareasub.lastIndexOf('.')); // Remove the file extension
    
    let enemyindex = currentareasub + 'enemies';
    const enemyArray = enemies[enemyindex]; // Get array from the global object
    
    const randomIndex = Math.floor(Math.random() * enemyArray.length);
    return enemyArray[randomIndex];
}

// Calculating critical hit chance:
function calccritchance() {
    let randomchance = Math.ceil(Math.random() * 10) - 1;
    return critchance > randomchance;
}

// Function for the onclick event
function enemyClickHandler() {
    if (healthbar > 0) {
        const crithit = calccritchance();

        // If the critical hit chance succeeds, we multiply the playerdamage variable
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

        // Update healthbar display
        document.getElementById("enemyhealth").textContent = Math.trunc(healthbar);
    }
}

// Function to handle enemy defeat
function handleEnemyDefeat() {
    if (healthbar <= 0) {
        previoushealthbar *= 1.05;
        healthbar = previoushealthbar;

        // Call quests function and store enemy sprite that was killed.
        let prevenemy = document.getElementById("enemysprite").src;
        let prevenemysub = prevenemy.substring(prevenemy.indexOf('pic')); // This just changes to the relative path
        quests(prevenemysub);

        // Check if a quest has been completed and spawn a bigger enemy if needed
        if (questcompleted === true) {
            spawnBiggerEnemy();
        } else {
            // Change the enemy sprite
            const randomenemy = getrandomenemy();
            document.getElementById("enemysprite").src = randomenemy;
            document.getElementById("enemysprite").classList.remove('bigger'); // Remove the bigger class if it exists
            document.getElementById("enemyhealth").textContent = Math.trunc(healthbar);
        }

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

        // Kill count increases
        kills += 1;
        document.getElementById("kills").textContent = kills;
    }
}

// Function to spawn a bigger enemy with more health
function spawnBiggerEnemy() {
    console.log("Spawning a bigger enemy");
    const biggerEnemy = 'pic/slimesword.gif'; // Replace with the path to your bigger enemy sprite
    previoushealthbar *= 2; // Increase health significantly for the bigger enemy
    healthbar = previoushealthbar;

    // Change the enemy sprite to the bigger enemy and make it larger
    const enemySprite = document.getElementById("enemysprite");
    enemySprite.src = biggerEnemy;
    enemySprite.classList.add('bigger'); // Add the CSS class to make it larger
    document.getElementById("enemyhealth").textContent = Math.trunc(healthbar);
    bossSpawned = true; // Set the flag to indicate the boss has been spawned
}

let prevkillsneeded = 5;
let questnum = 1;
let questkill = 0; // Initialize questkill if not already defined
let questscomplete = 0; // Initialize questscomplete if not already defined
let questenemy = questenemies[0]; // Initial quest enemy

document.addEventListener('DOMContentLoaded', function() {
    quests()
}, false);

// Function to handle quest system
function quests(enemy) {
    questcompleted = false;
    let killsneeded = prevkillsneeded * 2;
    document.getElementById("killsneeded").textContent = killsneeded;

    // Ensure questenemy is set based on questscomplete
    if (questscomplete < questenemies.length) {
        questenemy = questenemies[questscomplete];
    } else {
        questenemy = undefined;
    }

    if (questenemy === undefined) {
        questscomplete = 0;
        questenemy = questenemies[questscomplete]; // Reset to the first enemy
    }

    let questenemyName = questenemy.substring(questenemy.indexOf('pic/') + 4);
    questenemyName = questenemyName.substring(0, questenemyName.lastIndexOf('.'));
    document.getElementById("questenemy").textContent = questenemyName + "s";

    document.getElementById("questnum").textContent = questnum;

    if (questenemy === enemy) {
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

// Checks if enemy health is below 0
setInterval(handleEnemyDefeat, 100);

// When the player clicks we run this function
document.getElementById("enemysprite").onclick = enemyClickHandler;

document.getElementById("fireball").onclick = function() {
    healthbar -= 50;
    document.getElementById("enemyhealth").textContent = Math.trunc(healthbar);
}

document.getElementById("frog").onclick = function() {
    healthbar = 1;
    document.getElementById("enemysprite").src = 'pic/frog.png';
    document.getElementById("enemyhealth").textContent = Math.trunc(healthbar);
}
