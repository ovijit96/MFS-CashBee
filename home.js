document.getElementById("add-money-btn").addEventListener("click",function(e){
  e.preventDefault()
//   console.log("add money btn clicked") //check is btn ok. 
 const bank = document.getElementById("bank").value
 const accountNumber = document.getElementById("accountNumber").value
 const amount = parseInt(document.getElementById("addAmount").value)
 const pin = document.getElementById("addPin").value
 const availableBalance = parseInt(document.getElementById("available-balance").innerText)
 console.log(availableBalance);

 const totalNewAvailableBalance = amount + availableBalance

 document.getElementById("available-balance").innerText = totalNewAvailableBalance
})