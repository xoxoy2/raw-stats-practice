// Global Variables
const form = document.querySelector("form");
const formInputs = document.querySelectorAll(".form-input");

console.log(formInputs);

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
    renderPlayerRows(players);
  } catch (error) {
    console.error(error);
  }
};

const savePlayersToStorage = (players) => {
  localStorage.setItem("players", JSON.stringify(players));
};

/*
<tr>
          <td class="player-cell">
            <p>1</p>
            <div>
              <p class="player-cell-name"><a>Matthew Barton</a> <span>QB</span></p>
              <p class="player-cell-school">MMHS (Spring Valley)</p>
            </div>
          </td>
          <td>581</td>
          <td>79,204</td>
        </tr>
*/

const createPlayerRow = (player) => {
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
  numberP.textContent = player.id;
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
  for (let player of playerList) {
    const playerRow = createPlayerRow(player);
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
  // create a new player object with data from the form state
  // add that player object to the players array
  // TODO when server is set up, instead of pushing to the array, you'll send a POST request with the new player info
  // players.push(newPlayer);
  // savePlayersToStorage(players);
  // re-render the player rows
  // renderPlayerRows(players);
  // clear the form inputs
};

/*
 TODO:
 1. Write a js sorting function to sort by different parameters
    a. explore js .sort method for arrays
    b. customize .sort method for sorting function
2. add event listeners for user to click different sort params
 */

// add change event listeners to all the input elements on the form
const addInputEventListeners = () => {
  formInputs.forEach((input) => {
    input.addEventListener("change", handleInputChange);
  });
};

// add submit event listener to the form
form.addEventListener("submit", handleFormSubmit);

// renderPlayerRows(players);
fetchAllPlayers();
addInputEventListeners();
