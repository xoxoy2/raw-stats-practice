// GLOBAL DOM ELEMENTS
const form = document.querySelector("form");
const formInputs = document.querySelectorAll(".form-input");
const sortButtons = document.querySelectorAll("th");
const collegeFilterSelect = document.querySelector("#filter-college");
const positionFilterSelect = document.querySelector("#filter-position");

//----------------------------
// SLIM SELECT
//----------------------------

const collegeSelect = new SlimSelect({
  select: "#college-select",
  placeholder: "Select college(s)",
});

const positionSelect = new SlimSelect({
  select: "#position-select",
  placeholder: "Select position",
});

const nameSelect = new SlimSelect({
  select: "#name-select",
  placeholder: "Select Player Name",
});

//----------------------------
// STATE MANAGEMENT
//----------------------------

const playerState = {
  players: [],
  filteredPlayers: [],
};

const filterState = {
  college: [],
  position: [],
  name: [],
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

//----------------------------
// HELPER FUNCTIONS
//----------------------------

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

const getNames = (players) => {
  const names = players
    .map((player) => `${player.firstName} ${player.lastName}`)
    .sort();
  return new Set(names);
};

//----------------------------
// API AND DATA MANAGEMENT FUNCTIONS
//----------------------------

const getPlayersFromStorage = () => {
  const playersFromStorage = JSON.parse(localStorage.getItem("players"));
  return playersFromStorage || [];
};

const savePlayersToStorage = (players) => {
  localStorage.setItem("players", JSON.stringify(players));
};

const fetchAllPlayers = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/players");
    console.log(response);
    const players = await response.json();
    console.log(players);
    // return players;
    playerState.players = players;
    playerState.filteredPlayers = players;
    createAndAppendOptions(players);
    renderPlayerRows(players);
  } catch (error) {
    console.error(error);
  }
};

//----------------------------
// DOM MANIPULATION FUNCTIONS
//----------------------------

const showNoResultsMessage = () => {
  const tbody = document.querySelector("tbody");
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  td.innerHTML = `No exact matches found. <span class="no-results"><i>Show partial matches?</i></span>`;
  tr.append(td);
  tbody.append(tr);
};

const createAndAppendOptions = (players) => {
  getColleges(players).forEach((college) => {
    const option = document.createElement("option");
    option.value = college;
    option.textContent = college;
    document.querySelector("#college-select").append(option);
  });
  getPositions(players).forEach((position) => {
    const option = document.createElement("option");
    option.value = position;
    option.textContent = position;
    document.querySelector("#position-select").append(option);
  });
  getNames(players).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    document.querySelector("#name-select").append(option);
  });
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

//--------------------------------
// FILTERING AND SORTING FUNCTIONS
//--------------------------------

const applyMultiSelectFilter = (players) => {
  playerState.filteredPlayers = players.filter((player) => {
    return (
      (filterState.college.length === 0 ||
        filterState.college.includes(player.college)) &&
      (filterState.position.length === 0 ||
        filterState.position.includes(player.position)) &&
      (filterState.name.length === 0 ||
        filterState.name.includes(`${player.firstName} ${player.lastName}`))
    );
  });
  renderPlayerRows(playerState.filteredPlayers);
  // check if there are no results, and if not, show a message with a button/link to show partial matches
  if (playerState.filteredPlayers.length === 0) {
    showNoResultsMessage();
    // show partial matches click event
    document.querySelector(".no-results").addEventListener("click", () => {
      showPartialMatches(playerState.players);
    });
  }
};

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

//---------------------------
// EVENT HANDLER FUNCTIONS
//---------------------------

// function that updates form state on change event
const handleInputChange = (event) => {
  const name = event.target.name; // "firstName", "lastName", "touchdowns", "yards"
  formState[name] = event.target.value;
  console.log(formState);
};

const showPartialMatches = (players) => {
  playerState.filteredPlayers = players.filter((player) => {
    return (
      filterState.college.includes(player.college) ||
      filterState.position.includes(player.position) ||
      filterState.name.includes(`${player.firstName} ${player.lastName}`)
    );
  });

  renderPlayerRows(playerState.filteredPlayers);
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
  const sortedPlayers = sortPlayers(param, playerState.filteredPlayers);
  renderPlayerRows(sortedPlayers);
};

//---------------------------
// EVENT LISTENERS ADDED
//---------------------------

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

document.getElementById("college-select").addEventListener("change", (e) => {
  filterState.college = collegeSelect.selected();
  console.log(filterState);
});

document.getElementById("position-select").addEventListener("change", (e) => {
  filterState.position = positionSelect.selected();
  console.log(filterState);
});
document.getElementById("name-select").addEventListener("change", (e) => {
  filterState.name = nameSelect.selected();
  console.log(filterState);
});

document.getElementById("apply-filters").addEventListener("click", (e) => {
  applyMultiSelectFilter(playerState.players);
});

document.getElementById("clear-filters").addEventListener("click", (e) => {
  filterState.college = [];
  filterState.position = [];
  filterState.name = [];
  collegeSelect.set([]);
  positionSelect.set([]);
  nameSelect.set([]);
  renderPlayerRows(playerState.players);
});

//---------------------------
// INITIALIZE APP
//---------------------------

fetchAllPlayers();
addEventListeners();

/*
 TODO:
1. On Joshua's screen, connect database
2. update player controllers
3. test routes with postman
 */

// GRAVEYARD

/*
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
*/
