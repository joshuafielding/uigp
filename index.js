let healthbar = 25;
let previoushealthbar = 25;
let playerdamage = 1;
let saveplayerdamage;
let critchance = 1;
let gold = 0;
let goldgain;
let xp = 0;

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
            document.getElementById("crittext").style.visibility = "visible";
            saveplayerdamage = playerdamage;
            playerdamage *= 3.5;
            healthbar -= playerdamage;
            playerdamage = saveplayerdamage;
        }
        else{
            healthbar -= playerdamage;
            document.getElementById("crittext").style.visibility = "hidden";
        }

        //if the healthbar hits 0 it won't display negative values
        if (healthbar <= 0) {
            
            //wasn't sure how to scale the health so i just have this for now. 
            previoushealthbar *= 1.25;
            healthbar = previoushealthbar;

            //allows for image change
            const randomenemy = getrandomenemy();
            document.getElementById("enemysprite").src = randomenemy;
            document.getElementById("enemyhealth").textContent = Math.trunc(healthbar);

            //player gains gold
            goldgain = Math.trunc(Math.random()*6-1)+1;
            gold += goldgain
            document.getElementById("gold").textContent = gold;
            document.getElementById("goldgain").textContent = "Gold gained: +" + goldgain;

            //player gains xp
            xp += Math.trunc(Math.random()*3-1)+1;
            document.getElementById("xp").textContent = xp;
        } else {
            document.getElementById("enemyhealth").textContent = Math.trunc(healthbar);
        }  
    }/* else {

    }*/
}