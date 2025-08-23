// ===== Helper Functions =====
function getInputValue(id, isNumber = false) {
    const value = document.getElementById(id)?.value || "";
    return isNumber ? parseInt(value) : value;
}

function getInnerTextValue(id, isNumber = false) {
    const value = document.getElementById(id)?.innerText || "0";
    return isNumber ? parseInt(value) : value;
}

function setInnerTextValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
}

function toggleSection(showId, ...hideIds) {
    const showEl = document.getElementById(showId);
    if (showEl) showEl.style.display = "block";
    hideIds.forEach(hideId => {
        const hideEl = document.getElementById(hideId);
        if (hideEl) hideEl.style.display = "none";
    });
}

// ===== Active Button Highlight =====
function setActiveButton(activeButtonId, buttonIds) {
    buttonIds.forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        if (id === activeButtonId) {
            btn.classList.add("bg-blue-400", "text-white");
            btn.classList.remove("bg-white", "text-black");
        } else {
            btn.classList.remove("bg-blue-400", "text-white");
            btn.classList.add("bg-white", "text-black");
        }
    });
}

// ===== Transaction Log =====
let transactionLog = [];

function addTransaction(type, amount, balance) {
    const now = new Date();
    transactionLog.unshift({
        time: now.toLocaleString(),
        type,
        amount,
        balance
    });
}

function renderTransactionHistory() {
    const container = document.getElementById("transactions-parent");
    container.innerHTML = `<h1 class="my-5 font-bold">Transactions</h1>`;
    const list = document.createElement("ul");
    list.classList.add("space-y-2", "max-h-64", "overflow-y-auto");
    transactionLog.forEach(tx => {
        const li = document.createElement("li");
        li.classList.add("p-2", "rounded-xl", "text-white", "flex", "justify-between");
        // color code
        switch (tx.type) {
            case "Add Money": li.classList.add("bg-green-500"); break;
            case "Withdraw": li.classList.add("bg-red-500"); break;
            case "Transfer": li.classList.add("bg-orange-500"); break;
            case "Bonus": li.classList.add("bg-blue-500"); break;
            case "Pay Bill": li.classList.add("bg-purple-500"); break;
            default: li.classList.add("bg-gray-500");
        }
        li.innerHTML = `<span>${tx.time} | ${tx.type}:</span> <span>${tx.amount}</span> | Balance: ${tx.balance}</span>`;
        list.appendChild(li);
    });
    container.appendChild(list);
}

// ===== Main Functionalities =====
function addMoney() {
    const accountNumber = getInputValue("accountNumber");
    const amount = getInputValue("addAmount", true);
    const availableBalance = getInnerTextValue("available-balance", true);

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    if (accountNumber.length < 11) {
        alert("Please provide valid account number");
        return;
    }

    const newBalance = availableBalance + amount;
    setInnerTextValue("available-balance", newBalance);
    addTransaction("Add Money", amount, newBalance);
    alert(`Successfully added ${amount} to your account!`);
}

function withdrawMoney() {
    const amount = getInputValue("withdraw-amount", true);
    const availableBalance = getInnerTextValue("available-balance", true);

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    if (amount > availableBalance) {
        alert("Insufficient Balance!");
        return;
    }

    const newBalance = availableBalance - amount;
    setInnerTextValue("available-balance", newBalance);
    addTransaction("Withdraw", amount, newBalance);
    alert(`Successfully withdrawn ${amount} from your account!`);
}

// ===== Sample Features for Bonus, Pay Bill, Transfer =====
function bonusReceived(amount) {
    const availableBalance = getInnerTextValue("available-balance", true);
    const newBalance = availableBalance + amount;
    setInnerTextValue("available-balance", newBalance);
    addTransaction("Bonus", amount, newBalance);
    alert(`You received bonus ${amount}!`);
}

function payBill(amount) {
    const availableBalance = getInnerTextValue("available-balance", true);
    if (amount > availableBalance) {
        alert("Insufficient Balance for Bill!");
        return;
    }
    const newBalance = availableBalance - amount;
    setInnerTextValue("available-balance", newBalance);
    addTransaction("Pay Bill", amount, newBalance);
    alert(`Bill paid: ${amount}`);
}

function transferMoney(amount) {
    const availableBalance = getInnerTextValue("available-balance", true);
    if (amount > availableBalance) {
        alert("Insufficient Balance for Transfer!");
        return;
    }
    const newBalance = availableBalance - amount;
    setInnerTextValue("available-balance", newBalance);
    addTransaction("Transfer", amount, newBalance);
    alert(`Money Transferred: ${amount}`);
}

// ===== All Buttons & Sections =====
const allButtons = [
    "add-button",
    "cash-out-button",
    "transfer-button",
    "get-bonus-button",
    "pay-bill-button",
    "transactions-button"
];

const allSections = [
    "add-money-parent",
    "cash-out-parent",
    "transfer-money-parent",
    "get-bonus-parent",
    "pay-bill-parent",
    "transactions-parent"
];

// ===== Generic Button Setup =====
function setupButton(buttonId, showSectionId, hideSectionIds = [], callback = null) {
    const btn = document.getElementById(buttonId);
    if (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            if (callback) callback();
            if (showSectionId) toggleSection(showSectionId, ...hideSectionIds);
            setActiveButton(buttonId, allButtons);
            if (buttonId === "transactions-button") renderTransactionHistory();
        });
    }
}

// ===== Setup Buttons =====
setupButton("add-button", "add-money-parent", allSections.filter(id => id !== "add-money-parent"));
setupButton("cash-out-button", "cash-out-parent", allSections.filter(id => id !== "cash-out-parent"));
setupButton("transfer-button", "transfer-money-parent", allSections.filter(id => id !== "transfer-money-parent"));
setupButton("get-bonus-button", "get-bonus-parent", allSections.filter(id => id !== "get-bonus-parent"));
setupButton("pay-bill-button", "pay-bill-parent", allSections.filter(id => id !== "pay-bill-parent"));
setupButton("transactions-button", "transactions-parent", allSections.filter(id => id !== "transactions-parent"));

// ===== Action Buttons =====
setupButton("add-money-btn", null, null, addMoney);
setupButton("withdrow-btn", null, null, withdrawMoney);

// ===== Optional: Example Call for Bonus / Pay / Transfer =====
// These can be triggered from forms/buttons in each section
// bonusReceived(500);
// payBill(200);
// transferMoney(1000);
