
//add money btn

document.getElementById("add-money-btn").addEventListener("click",function(e){
  e.preventDefault()
//   console.log("add money btn clicked") //check is btn ok. 
 const bank = document.getElementById("bank").value

 const accountNumber = document.getElementById("accountNumber").value

 const amount = parseInt(document.getElementById("addAmount").value)

 const pin = document.getElementById("addPin").value

 const availableBalance = parseInt(document.getElementById("available-balance").innerText)

//  console.log(availableBalance);

// if account number is not accuret bank wise and ofcourse total stop .
if(accountNumber.length <11) {
    alert("Please provide valid account number")
    return;
}

// ----------as same in future we add if pin is ok or not ok , bank selection validity like select dbbl but account number provide brac bank .
 const totalNewAvailableBalance = amount + availableBalance

 document.getElementById("available-balance").innerText = totalNewAvailableBalance
})

//cash out money feature

document.getElementById("withdrow-btn").addEventListener("click",function(e){
    e.preventDefault()
    // console.log("withdrow btn clicked")

    const amount = parseInt(document.getElementById("withdraw-amount").value)

    const availableBalance = parseInt(document.getElementById("available-balance").innerText)
    // console.log(availableBalance, amount)
    const totalNewAvailableBalance = availableBalance - amount

    // console.log(totalNewAvailableBalance)

    document.getElementById("available-balance").innerText = totalNewAvailableBalance
})





//toggling features

document.getElementById("add-button").addEventListener("click",function(){
    document.getElementById("cash-out-parent").style.display = "none"

    document.getElementById("add-money-parent").style.display = "block"
    
})


document.getElementById("cash-out-button").addEventListener("click",function(){
    document.getElementById("cash-out-parent").style.display = "block"

    document.getElementById("add-money-parent").style.display = "none"
})