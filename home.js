// ===== Helper Functions =====
//making using ai reusable function previous commit u can see raw code

// input field থেকে value নেওয়া (number বা text)
function getInputValue(id, isNumber = false) {
    const value = document.getElementById(id).value;
    return isNumber ? parseInt(value) : value;
}

// element থেকে innerText নেওয়া (number সহ)
function getInnerTextValue(id, isNumber = false) {
    const value = document.getElementById(id).innerText;
    return isNumber ? parseInt(value) : value;
}

// element এ innerText সেট করা
function setInnerTextValue(id, value) {
    document.getElementById(id).innerText = value;
}

// toggle show/hide
function toggleSection(showId, hideId) {
    document.getElementById(showId).style.display = "block";
    document.getElementById(hideId).style.display = "none";
}


// ===== Main Functionalities =====

// Add Money
function addMoney() {
    const bank = getInputValue("bank");
    const accountNumber = getInputValue("accountNumber");
    const amount = getInputValue("addAmount", true);
    const pin = getInputValue("addPin");

    const availableBalance = getInnerTextValue("available-balance", true);

    // account number validation
    if (accountNumber.length < 11) {
        alert("Please provide valid account number");
        return;
    }

    const totalNewAvailableBalance = amount + availableBalance;
    setInnerTextValue("available-balance", totalNewAvailableBalance);
}

// Withdraw Money
function withdrawMoney() {
    const amount = getInputValue("withdraw-amount", true);
    const availableBalance = getInnerTextValue("available-balance", true);

    if (amount > availableBalance) {
        alert("Insufficient Balance!");
        return;
    }

    const totalNewAvailableBalance = availableBalance - amount;
    setInnerTextValue("available-balance", totalNewAvailableBalance);
}


// ===== Event Listeners =====
document.getElementById("add-money-btn").addEventListener("click", function (e) {
    e.preventDefault();
    addMoney();
});

document.getElementById("withdrow-btn").addEventListener("click", function (e) {
    e.preventDefault();
    withdrawMoney();
});

document.getElementById("add-button").addEventListener("click", function () {
    toggleSection("add-money-parent", "cash-out-parent");
});

document.getElementById("cash-out-button").addEventListener("click", function () {
    toggleSection("cash-out-parent", "add-money-parent");
});
