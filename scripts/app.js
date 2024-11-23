const form = document.getElementById("transaction-form");
const inputName = document.getElementById("transaction-name");
const inputAmount = document.getElementById("transaction-amount");
const listContainer = document.getElementById("transaction-list");
const balanceDisplay = document.getElementById("total-balance");

// 데이터 저장 배열 (Local Storage에서 데이터 로드)
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(event) {
  event.preventDefault();

  const name = inputName.value.trim();
  const amount = parseFloat(inputAmount.value.trim());

  if (!name || isNaN(amount)) {
    alert("항목 이름과 유효한 금액을 입력하세요.");
    return;
  }

  const transaction = {
    id: Date.now(),
    name,
    amount,
  };

  transactions.push(transaction);
  updateUI();
  form.reset();
}

function updateUI() {
  listContainer.innerHTML = "";
  let total = 0;

  transactions.forEach((transaction) => {
    const listItem = document.createElement("li");
    listItem.classList.add(transaction.amount > 0 ? "income" : "expense");
    listItem.innerHTML = `
            ${transaction.name}
            <span>${transaction.amount > 0 ? "+" : ""}$${
      transaction.amount
    }</span>
            <button class="delete-btn" data-id="${transaction.id}">X</button>
        `;

    listContainer.appendChild(listItem);
    total += transaction.amount;
  });

  balanceDisplay.textContent = `${total > 0 ? "+" : ""}$${total}`;

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () =>
      deleteTransaction(button.dataset.id)
    );
  });

  // Local Storage에 데이터 저장
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function deleteTransaction(id) {
  transactions = transactions.filter(
    (transaction) => transaction.id !== parseInt(id)
  );
  updateUI();
}

form.addEventListener("submit", addTransaction);

// 페이지 로드 시 Local Storage에서 데이터 불러오기
updateUI();
