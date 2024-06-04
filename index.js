let healthbar = 25;
let previoushealthbar = 25;
let playerdamage = 1;
let saveplayerdamage;
let kills = 0;
let critchance = 1;

//enemy array, can create multiple for differnt areas.
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
    let randomchance = Math.ceil(Math.random() * 10)-1
    console.log(randomchance);
    if (critchance > randomchance){
        return true;
    }
    else{
        return false;
    }
}


//the clicking part of the game :D
document.getElementById("enemysprite").onclick = function() {
    if (healthbar > 0) {
        
        const crithit = calccritchance();

        //if the critical hit chance succeeds, we multiply the playerdamage variable
        if(crithit == true){
            document.getElementById("crittext").style.display = "inline";
            saveplayerdamage = playerdamage;
            playerdamage *= 3.5;
            healthbar -= playerdamage;
            playerdamage = saveplayerdamage;
        }
        else{
            healthbar -= playerdamage;
            document.getElementById("crittext").style.display = "none";
        }

        //if the healthbar hits 0 it won't display negative values
        if (healthbar < 0) {
            document.getElementById("enemyhealth").textContent = "0";
        } else {
            document.getElementById("enemyhealth").textContent = Math.trunc(healthbar);
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
