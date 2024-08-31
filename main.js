// Global Variables
const form = document.querySelector("form");
const formInputs = document.querySelectorAll(".form-input");
const sortButtons = document.querySelectorAll("th");

const playerState = {
  players: [],
};

const sortingState = {
  lastName: "desc",
  touchdowns: "asc",
  yards: "asc",
};

const formState = {
  firstName: "",
  lastName: "",
  touchdowns: "",
  yards: "",
  // position: "",
  // school: {
  //   name: "MMHS",
  //   city: "Spring Valley",
  // }
};

const getPlayersFromStorage = () => {
  const playersFromStorage = JSON.parse(localStorage.getItem("players"));
  return playersFromStorage || [];
};

const fetchAllPlayers = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/players");
    console.log(response);
    const players = await response.json();
    console.log(players);
    // return players;
    playerState.players = players;
    renderPlayerRows(players);
  } catch (error) {
    console.error(error);
  }
};

const savePlayersToStorage = (players) => {
  localStorage.setItem("players", JSON.stringify(players));
};

const createPlayerRow = (player, index) => {
  // create the elements
  const tr = document.createElement("tr");
  const nameTd = document.createElement("td");
  const touchdownsTd = document.createElement("td");
  const yardsTd = document.createElement("td");
  const numberP = document.createElement("p");
  const nameDiv = document.createElement("div");
  const nameP = document.createElement("p");
  const schoolP = document.createElement("p");
  const nameA = document.createElement("a");
  const positionSpan = document.createElement("span");

  // add the classes
  nameTd.classList.add("player-cell");
  nameP.classList.add("player-cell-name");
  schoolP.classList.add("player-cell-school");

  // add the text content
  numberP.textContent = index;
  // string concatenation
  // nameA.textContent = player.firstName + " " + player.lastName;
  // string interpolation (template literal)
  nameA.textContent = `${player.firstName} ${player.lastName}`;
  positionSpan.textContent = " QB"; // player.position
  schoolP.textContent = "MMHS (Spring Valley)"; // player.school
  touchdownsTd.textContent = player.touchdowns;
  yardsTd.textContent = player.yards;

  // append the elements
  nameP.append(nameA, positionSpan);
  nameDiv.append(nameP, schoolP);
  nameTd.append(numberP, nameDiv);
  tr.append(nameTd, touchdownsTd, yardsTd);

  return tr;
};

function renderPlayerRows(playerList) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  // playerList.forEach((player) => {
  //   const playerRow = createPlayerRow(player);
  //   tbody.append(playerRow);
  // });
  for (let i = 0; i < playerList.length; i++) {
    const playerRow = createPlayerRow(playerList[i], i + 1);
    tbody.append(playerRow);
  }
}

// function that updates form state on change event
const handleInputChange = (event) => {
  const name = event.target.name; // "firstName", "lastName", "touchdowns", "yards"
  formState[name] = event.target.value;
  console.log(formState);
};

const handleFormSubmit = async (event) => {
  event.preventDefault();
  const newPlayer = { ...formState };
  try {
    const response = await fetch("http://localhost:3000/api/players", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    });
    console.log(response);
    const data = await response.json(); // { message: "Player added" }
    console.log(data);
    fetchAllPlayers();
    formInputs.forEach((input) => {
      input.value = "";
    });
  } catch (error) {
    console.error(error);
  }
};

/*
 TODO:
 1. adding filtering logic
  a. add select dropdowns for position and school filtering
  b. function to returned filtered array
  c. render the filtered array
2. finish sorting logic (asc and desc)
 */

// function that sorts the players array by a given key
const sortPlayers = (param, playerArray) => {
  return playerArray.sort((a, b) => {
    if (a[param] > b[param]) {
      // if the param is asc, return 1 else return
      return param === "lastName" ? 1 : -1;
    }
    if (a[param] < b[param]) {
      return param === "lastName" ? -1 : 1;
    }
    return 0;
  });
};

// function that handles click on sort buttons
const handleSortClick = (event) => {
  console.log(event.target.dataset);
  // find and remove current active class if present as well as active icon
  const currentActive = document.querySelector(".active");
  if (currentActive) {
    currentActive.classList.remove("active");
    const nodeToRemove = currentActive.querySelector("i");
    currentActive.removeChild(nodeToRemove);
  }
  event.target.classList.add("active");
  // adding icon
  const sortIcon = document.createElement("i");
  sortIcon.classList.add("fa-solid", "fa-chevron-up");
  event.target.appendChild(sortIcon);
  // removing current icon:
  const param = event.target.dataset.param;
  sortingState[param] = sortingState[param] === "asc" ? "desc" : "asc";
  const sortedPlayers = sortPlayers(param, playerState.players);
  renderPlayerRows(sortedPlayers);
};

// add change event listeners to all the input elements on the form
const addEventListeners = () => {
  formInputs.forEach((input) => {
    input.addEventListener("change", handleInputChange);
  });
  sortButtons.forEach((button) => {
    button.addEventListener("click", handleSortClick);
  });
};

// add submit event listener to the form
form.addEventListener("submit", handleFormSubmit);

// renderPlayerRows(players);
fetchAllPlayers();
addEventListeners();
