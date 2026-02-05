const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const type = document.getElementById('type');

let transactions = [];

function updateValues() {
    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, item) => acc + item, 0);
    const inc = amounts.filter(a => a > 0).reduce((acc, a) => acc + a, 0);
    const exp = amounts.filter(a => a < 0).reduce((acc, a) => acc + a, 0) * -1;

    balance.textContent = total.toFixed(2);
    income.textContent = inc.toFixed(2);
    expense.textContent = exp.toFixed(2);
}

function addTransactionDOM(transaction) {
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    const sign = transaction.amount < 0 ? '-' : '+';

    item.innerHTML = `
        ${transaction.text}
        <span>${sign}₹${Math.abs(transaction.amount)}</span>
      `;

    list.appendChild(item);
}

function addTransaction(e) {
    e.preventDefault();

    let value = +amount.value;
    if (type.value === "expense") value = -value;

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    text.value = '';
    amount.value = '';
    type.value = '';
}

form.addEventListener('submit', addTransaction);