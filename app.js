let balance = document.querySelector(".balance");
let totalIncome = document.querySelector(".total-income");
let totalExpense = document.querySelector(".total-expense");
let list = document.querySelector(".list");
let form = document.querySelector("#form");
let text = document.querySelector("#text");
let amount = document.querySelector("#amount");

// fetch json array from localStorage and convert to normal js array
let localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

// transactions is an array
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// this function is called when add transaction button/ enter(key in keyboard) is clicked
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    let transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

// this function is used to generate random id for each transaction object
function generateID() {
  return Math.round(Math.random() * 100000000);
}

// this function is used to show transactions in the history section
function addTransactionDOM(transaction) {
  let sign = transaction.amount < 0 ? "-" : "+";

  let item = document.createElement("li");
  item.classList.add(
    transaction.amount < 0 ? "minus" : "plus",
    "transaction-history"
  );
  item.innerHTML = `
    <button type="button" class="delete-btn" onclick="removeItem(${
      transaction.id
    })">&#10005;</button>
    <p class="transaction-title">${transaction.text}</p>
    <p class="transaction-price">${sign}${Math.abs(transaction.amount)}</p>
    `;
  list.appendChild(item);
}

function removeItem(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  initializeApp();
}

function updateValues() {
  let allAmounts = transactions.map((transaction) => transaction.amount);
  let totalBalance = allAmounts
    .reduce((acc, num) => (acc += num), 0)
    .toFixed(2);
  let totalIncomeBalance = allAmounts
    .filter((amount) => amount >= 0)
    .reduce((acc, num) => (acc += num), 0)
    .toFixed(2);
  let totalExpenseBalance = (
    allAmounts
      .filter((amount) => amount < 0)
      .reduce((acc, num) => (acc += num), 0) * -1
  ).toFixed(2);

  balance.innerText = `$${totalBalance}`;
  totalIncome.innerText = `$${totalIncomeBalance}`;
  totalExpense.innerText = `$${totalExpenseBalance}`;
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function initializeApp() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

initializeApp();

form.addEventListener("submit", addTransaction);
