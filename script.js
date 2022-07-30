// const quest = [
//   {
//     question: "president",
//     Options: ["buhari", "jonat", "nathan", "segun"],
//     correctAnswer: "buhari",
//     chosenAnswer: "",
//   },
//   {
//     question: "president2",
//     Options: ["buhari2", "jonat2", "nathan2", "segun2"],
//     correctAnswer: "buhari2",
//     chosenAnswer: "",
//   },
//   {
//     question: "president3",
//     Options: ["buhari3", "jonat3", "nathan3", "segun3"],
//     correctAnswer: "buhari3",
//     chosenAnswer: "",
//   },
//   {
//     question: "president4",
//     Options: ["buhari4", "jonat4", "nathan4", "segun4"],
//     correctAnswer: "buhari4",
//     chosenAnswer: "",
//   },
//   {
//     question: "president5",
//     Options: ["buhari5", "jonat5", "nathan5", "segun5"],
//     correctAnswer: "buhari5",
//     chosenAnswer: "",
//   },
// ];

// function store() {
//   localStorage.setItem("question", JSON.stringify(quest));
// }
// store();

// function get() {
//   return localStorage.getItem("question");
// }

// let data = JSON.parse(get());
// console.log(data);

// quest[0].question = "president General";
// store();
// data = JSON.parse(get());
// console.log("2", data);
// localStorage.clear();

let logoDisplay = document.querySelector(".logoD");
let amountGenerated = document.querySelector("#amnt");
let networkProvider = document.querySelector("#network");
let loadPin = document.querySelector("#loading");
let tableR = document.querySelector(".showT");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

let data = [];

function claerStorage() {
  localStorage.clear();
  location.reload();
}

function displayModal(html) {
  modal.innerHTML = "";
  modal.innerHTML = `<div class="close-modal">
  <button onclick="closeModal()">OK</button>
</div>`;
  modal.classList.remove("hidden");
  modal.innerHTML += html;
}

function closeModal() {
  modal.classList.add("hidden");
}

function loadStorageData() {
  let items = localStorage.getItem("cardTable");
  if (items) {
    data = JSON.parse(items);
    displayTable();
  }
}
loadStorageData();

function storeData() {
  localStorage.setItem("cardTable", JSON.stringify(data));
  displayTable();
}

function pinGenerator() {
  const time = new Date();
  let typeCard = networkProvider.value;
  const amount = amountGenerated.value;
  if (!amount || amount < 100 || amount > 500) {
    let html = `<div><h3>Amount must be between 100 and 500 </h3></div>`;
    displayModal(html);
    return;
  }
  let pin = Math.trunc(100000000000 + Math.random() * 900000000000);
  if (typeCard == "mtn") pin = `*556*` + pin + "#";
  if (typeCard == "glo") pin = `*124*` + pin + "#";
  if (typeCard == "airtel") pin = `*126*` + pin + "#";
  if (typeCard == "vodacom") pin = `*444*` + pin + "#";
  const subElement = {
    cardType: typeCard,
    amount: amount,
    pin: pin,
    time: time,
    status: "UNSED",
  };
  data.push(subElement);
  storeData();
}

function displayTable() {
  let k = 0;
  tableR.innerHTML = `<tr>
  <th>S/N</th>
  <th>NETWORK</th>
  <th>AMOUNT</th>
  <th>PIN</th>
  <th>CREATED AT</th>
  <th>STATUS</th>
</tr>`;
  data.forEach((element) => {
    let col =
      element.status == "USED" ? "rgb(238, 127, 127)" : "rgb(193, 240, 123)";
    tableR.innerHTML += `<tr>
  <td>${k + 1}</td>
  <td>${element.cardType}</td>
  <td>${element.amount}</td>
  <td>${element.pin}</td>
  <td>${element.time}</td>
  <td style="background-color:${col} ;">${element.status}</td>
</tr>`;
    k++;
  });
}

function loadCard() {
  let match;
  let onPIn = loadPin.value;
  if (!onPIn) {
    let html = `<div><h3>PLEASE ENTER PIN</h3></div>`;
    displayModal(html);
    return;
  }
  match = data.findIndex((element) => {
    return element.pin === onPIn;
  });
  console.log(match);
  if (match < 0) {
    let html = `<div><h3>INVALID PIN</h3></div>`;
    displayModal(html);
    return;
  }
  if (match >= 0 && data[match].status == "UNSED") {
    let html = `<div><h3>CARD LOADED SUCCESFULLY</h3></div>`;
    displayModal(html);
    data[match].status = "USED";
    storeData();
  } else {
    let html = `<div><h3>CARD HAS ALREADY BEEN USED</h3></div>`;
    displayModal(html);
    return;
  }
}
