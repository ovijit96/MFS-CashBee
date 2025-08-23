using ai making reuseable 


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

    setInnerTextValue("available-balance", availableBalance + amount);
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

    setInnerTextValue("available-balance", availableBalance - amount);
    alert(`Successfully withdrawn ${amount} from your account!`);
}

// ===== Generic Button Setup =====
function setupButton(buttonId, showSectionId, hideSectionIds = [], callback = null) {
    const btn = document.getElementById(buttonId);
    if (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            if (callback) callback();
            toggleSection(showSectionId, ...hideSectionIds);
        });
    }
}

// ===== Setup Buttons =====
const allSections = [
    "add-money-parent",
    "cash-out-parent",
    "transfer-money-parent",
    "get-bonus-parent",
    "pay-bill-parent",
    "transactions-parent"
];

setupButton("add-button", "add-money-parent", allSections.filter(id => id !== "add-money-parent"));
setupButton("cash-out-button", "cash-out-parent", allSections.filter(id => id !== "cash-out-parent"));
setupButton("transfer-button", "transfer-money-parent", allSections.filter(id => id !== "transfer-money-parent"));
setupButton("get-bonus-button", "get-bonus-parent", allSections.filter(id => id !== "get-bonus-parent"));
setupButton("pay-bill-button", "pay-bill-parent", allSections.filter(id => id !== "pay-bill-parent"));
setupButton("transactions-button", "transactions-parent", allSections.filter(id => id !== "transactions-parent"));

// ===== Setup Action Buttons =====
setupButton("add-money-btn", null, null, addMoney);
setupButton("withdrow-btn", null, null, withdrawMoney);
