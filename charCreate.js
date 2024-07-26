document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedSlot = urlParams.get('slot');

    if (selectedSlot) {
        localStorage.setItem('selectedSlot', selectedSlot);
        console.log(selectedSlot);
    }
});


const options = {
    hair: ["Side part black", "Side part blonde", "Side part blue", "Side part brown", "Side part green", "Side part orange", "Side part pink", "Side part purple", "Side part red", "Side part silver", "Side part white", 
        "Messy black", "Messy blonde", "Messy blue", "Messy brown", "Messy green", "Messy orange", "Messy pink", "Messy purple", "Messy red", "Messy silver", "Messy white", 
        "Long middle part black", "Long middle part blonde", "Long middle part blue", "Long middle part brown", "Long middle part green", "Long middle part orange", "Long middle part pink", "Long middle part purple", "Long middle part red", "Long middle part silver", "Long middle part white",
        "Short middle part black", "Short middle part blonde", "Short middle part blue", "Short middle part brown", "Short middle part green", "Short middle part orange", "Short middle part pink", "Short middle part purple", "Short middle part red", "Short middle part silver", "Short middle part white",
        "Medium middle part black", "Medium middle part blonde", "Medium middle part blue", "Medium middle part brown", "Medium middle part green", "Medium middle part orange", "Medium middle part pink", "Medium middle part purple", "Medium middle part red", "Medium middle part silver", "Medium middle part white",
        "Mohawk black", "Mohawk blonde", "Mohawk blue", "Mohawk brown", "Mohawk green", "Mohawk orange", "Mohawk pink", "Mohawk purple", "Mohawk red", "Mohawk silver", "Mohawk white"
    ],
    eyebrows: ["angry", "neutral", "sad", "surprised", "sus", "thick"],
    eyes: ["happy", "sad", "Scar black", "Scar blue", "Scar brown", "Scar green", "Scar purple", "Scar red", "Scar silver", "Scar teal", "Scar yellow",
        "Tired black", "Tired blue", "Tired brown", "Tired green", "Tired purple", "Tired red", "Tired silver", "Tired teal", "Tired yellow",
        "Wide black", "Wide brown", "Wide green", "Wide green", "Wide purple", "Wide red", "Wide silver", "Wide teal", "Wide yellow"
    ],
    mouth: ["-", "3 rotated", "3 upside down", "dimple", "dot", "frown", "open mouth", "smile", "smirk", "snicker", "tongue", "two teeth"],
    body: ["Pasty", "White", "Pale", "Orange", "Tan", "Brown", "Dark Brown", "Red", "Green", "Blue", "Purple", "Olive"],
};

let selections = {
    body: "",
    hair: "",
    eyebrows: "",
    eyes: "",
    mouth: ""
};

function openModal(category) {
    const modal = document.getElementById("modal");
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";

    options[category].forEach(option => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(category, option));
        optionsContainer.appendChild(optionElement);
    });

    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function filterOptions() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toLowerCase();
    const options = document.getElementsByClassName("option");

    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (option.textContent.toLowerCase().indexOf(filter) > -1) {
            option.style.display = "";
        } else {
            option.style.display = "none";
        }
    }
}

function selectOption(category, option) {
    let elementId;
    let filePath;

    switch (category) {
        case 'body':
            elementId = 'body';
            filePath = `pic/character/body/${option.replace(/\s/g, '_').toLowerCase()}.png`;
            break;
        case 'hair':
            elementId = 'Hair';
            filePath = `pic/character/hair/${option.replace(/\s/g, '_').toLowerCase()}.png`;
            break;
        case 'eyebrows':
            elementId = 'Brows';
            filePath = `pic/character/brows/${option.replace(/\s/g, '_').toLowerCase()}.png`;
            break;
        case 'eyes':
            elementId = 'Eyes';
            filePath = `pic/character/eyes/${option.replace(/\s/g, '_').toLowerCase()}.png`;
            break;
        case 'mouth':
            elementId = 'Mouth';
            filePath = `pic/character/mouth/${option.replace(/\s/g, '_').toLowerCase()}.png`;
            break;
        default:
            console.error("Invalid category");
            return;
    }

    const element = document.getElementById(elementId);
    if (element) {
        element.src = filePath;
        selections[category] = option; // Save the selection
    } else {
        console.error(`Element with ID ${elementId} not found`);
    }

    closeModal();
}

function saveCharacter() {
    const selectedSlot = localStorage.getItem('selectedSlot');
    const selectedBody = document.getElementById("body").src;
    const selectedHair = document.getElementById("Hair").src;
    const selectedBrows = document.getElementById("Brows").src;
    const selectedEyes = document.getElementById("Eyes").src;
    const selectedMouth = document.getElementById("Mouth").src;
    
    const characterData = {
        body: selectedBody,
        hair: selectedHair,
        brows: selectedBrows,
        eyes: selectedEyes,
        mouth: selectedMouth
    };

    localStorage.setItem(`slot${selectedSlot}Character`, btoa(JSON.stringify(characterData)));

    window.location.href = "loadpage.html";
}

document.getElementById("SaveChar").onclick = saveCharacter;


window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}