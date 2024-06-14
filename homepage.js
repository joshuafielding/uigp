document.getElementById("submit").onclick = function(){
    let username = document.getElementById("username").value;
    localStorage.setItem("username", username)
}