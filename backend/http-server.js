const http = require("http");
const port = 3001;

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

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/players") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(players));
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
