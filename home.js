

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

