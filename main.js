const formState = {
  firstName: "",
  lastName: "",
  touchdowns: "",
  yards: "",
};

const players = [
  {
    firstName: "Josh",
    lastName: "Allen",
    touchdowns: 35,
    yards: 4544,
    id: 1,
  },
  {
    firstName: "Patrick",
    lastName: "Mahomes",
    touchdowns: 38,
    yards: 4740,
    id: 2,
  },
  {
    firstName: "Dak",
    lastName: "Prescott",
    touchdowns: 27,
    yards: 4035,
    id: 3,
  },
  {
    firstName: "Tom",
    lastName: "Brady",
    touchdowns: 40,
    yards: 4633,
    id: 4,
  },
  {
    firstName: "Joe",
    lastName: "Burrow",
    touchdowns: 34,
    yards: 4166,
    id: 5,
  },
];

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
  positionSpan.textContent = "QB";
  schoolP.textContent = "MMHS (Spring Valley)";
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

/*
 TODO:
 1. create a function to track the data being typed in the form (handleFormInput)
 2. create a function to handle the form submission (handleFormSubmit)
   a. add the new player object to the players array
   b. re-render the player rows
 */

renderPlayerRows(players);
