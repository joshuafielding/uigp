const backgroundMusic = document.getElementById('background-music');

document.getElementById("volumesubmit").onclick = function(){
    let volumepercentage = document.getElementById("volumeinput").value;
    volumepercentage *= 0.01
    if (volumepercentage < 0){
        document.getElementById("volumeerror").textContent = "The minimum volume is 0"
    }
    else if (volumepercentage > 100){
        document.getElementById("volumeerror").textContent = "The max volume is 100"
    }
    else{
        backgroundMusic.volume = volumepercentage;
        console.log(volumepercentage);
    }
}