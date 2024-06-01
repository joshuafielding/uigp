let healthbar = 25;
let previoushealthbar = 25;
let playerdamage = 1;
let kills = 0;

//enemy array, can create multiple for differnt areas.
const enemies = [
    'pic/rat.gif',
    'pic/skel.gif',
    'pic/skelhat.gif',
    'pic/slimesword.gif'
];

//function to get different enemies
function getrandomenemy() {
    const randomIndex = Math.floor(Math.random() * enemies.length); // Corrected 'images.length' to 'enemies.length'
    return enemies[randomIndex];
}

//the clicking part of the game :D
document.getElementById("enemysprite").onclick = function() {
    if (healthbar > 0) {
        healthbar -= playerdamage;
        
        //if the healthbar hits 0 it won't display negative values
        if (healthbar < 0) {
            document.getElementById("enemyhealth").textContent = "0";
        } else {
            document.getElementById("enemyhealth").textContent = healthbar;
        }  
    } else {

        //wasn't sure how to scale the health so i just have this for now. 
        previoushealthbar *= 1.25;
        healthbar = previoushealthbar;

        //allows for image change
        const randomenemy = getrandomenemy();
        document.getElementById("enemysprite").src = randomenemy;
    }
}
