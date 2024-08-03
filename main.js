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

const savePlayersToStorage = (players) => {
  localStorage.setItem("players", JSON.stringify(players));
};

const players = getPlayersFromStorage();

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

const handleFormSubmit = (event) => {
  event.preventDefault();
  // create a new player object with data from the form state
  const newPlayer = { ...formState };
  // add that player object to the players array
  // TODO when server is set up, instead of pushing to the array, you'll send a POST request with the new player info
  players.push(newPlayer);
  savePlayersToStorage(players);
  // re-render the player rows
  renderPlayerRows(players);
  // clear the form inputs
  formInputs.forEach((input) => {
    input.value = "";
  });
};

/*
 TODO:
 1. create a function to track the data being typed in the form (handleFormInput)
 2. create a function to handle the form submission (handleFormSubmit)
   a. add the new player object to the players array
   b. re-render the player rows
 */

// add change event listeners to all the input elements on the form
const addInputEventListeners = () => {
  formInputs.forEach((input) => {
    input.addEventListener("change", handleInputChange);
  });
};

// add submit event listener to the form
form.addEventListener("submit", handleFormSubmit);

renderPlayerRows(players);
addInputEventListeners();
