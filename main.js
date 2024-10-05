const collegeSelect = new SlimSelect({
  select: "#multi-select",
  placeholder: "Select college(s)",
});

// Global Variables
const form = document.querySelector("form");
const formInputs = document.querySelectorAll(".form-input");
const sortButtons = document.querySelectorAll("th");
const collegeFilterSelect = document.querySelector("#filter-college");
const positionFilterSelect = document.querySelector("#filter-position");

const playerState = {
  players: [],
  filteredPlayers: [],
};

const filterState = {
  college: [],
  position: "",
};

const sortingState = {
  lastName: "desc",
  touchdowns: "asc",
  passingYards: "asc",
  rushingYards: "asc",
  receivingYards: "asc",
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

const getColleges = (players) => {
  const colleges = players
    .map((player) => player.college)
    .sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return;
    });
  return new Set(colleges);
};

const getPositions = (players) => {
  const positions = players.map((player) => player.position).sort();
  return new Set(positions);
};

const createAndAppendOptions = (players) => {
  getColleges(players).forEach((college) => {
    const option = document.createElement("option");
    option.value = college;
    option.textContent = college;
    document.querySelector("#filter-college").append(option);
  });
  getPositions(players).forEach((position) => {
    const option = document.createElement("option");
    option.value = position;
    option.textContent = position;
    document.querySelector("#filter-position").append(option);
  });
  getColleges(players).forEach((college) => {
    const option = document.createElement("option");
    option.value = college;
    option.textContent = college;
    document.querySelector("#multi-select").append(option);
  });
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
    createAndAppendOptions(players);
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
  const pYardsTd = document.createElement("td");
  const ruYardsTd = document.createElement("td");
  const reYardsTd = document.createElement("td");
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
  positionSpan.textContent = ` ${player.position}`; // player.position
  schoolP.textContent = player.college; // player.school
  touchdownsTd.textContent = player.touchdowns;
  pYardsTd.textContent = player.passingYards;
  ruYardsTd.textContent = player.rushingYards;
  reYardsTd.textContent = player.receivingYards;

  // append the elements
  nameP.append(nameA, positionSpan);
  nameDiv.append(nameP, schoolP);
  nameTd.append(numberP, nameDiv);
  tr.append(nameTd, touchdownsTd, pYardsTd, ruYardsTd, reYardsTd);

  return tr;
};

const handleFilterChange = (e) => {
  const name = e.target.name;
  filterState[name] = e.target.value;
  const filteredPlayers = playerState.players.filter((player) => {
    if (filterState.college && filterState.position) {
      return (
        player.college === filterState.college &&
        player.position === filterState.position
      );
    } else if (filterState.college) {
      return player.college === filterState.college;
    } else if (filterState.position) {
      return player.position === filterState.position;
    }
    return player;
  });
  renderPlayerRows(filteredPlayers);
};

const applyMultiSelectFilter = (players) => {
  playerState.filteredPlayers = players.filter((player) => {
    return filterState.college.includes(player.college);
  });
  renderPlayerRows(playerState.filteredPlayers);
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
1. multi select on the position filter dropdowns
2. finalize search button click logic to filter both position and colleges
3. clear filters button and handler function
3. finish setting up controllers on backend with sequelize models
4. test routes with postman
 */

// function that sorts the players array by a given key
const sortPlayers = (param, playerArray) => {
  return playerArray.sort((a, b) => {
    const order = sortingState[param];
    if (order === "asc") {
      return a[param] < b[param] ? -1 : a[param] > b[param] ? 1 : 0;
    } else {
      return a[param] > b[param] ? -1 : a[param] < b[param] ? 1 : 0;
    }
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
  console.log(sortingState);
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

collegeFilterSelect.addEventListener("change", handleFilterChange);
positionFilterSelect.addEventListener("change", handleFilterChange);

// renderPlayerRows(players);
fetchAllPlayers();
addEventListeners();

document.getElementById("multi-select").addEventListener("change", (e) => {
  filterState.college = collegeSelect.selected();
  console.log(filterState);
});

document.getElementById("apply-filters").addEventListener("click", (e) => {
  applyMultiSelectFilter(playerState.players);
});
