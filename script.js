// loginButton functionality
document.getElementById("loginButton").addEventListener("click",function(e){
    e.preventDefault()
    const mobileNumber = 1632750245;
    const pinNumber = 99566;
    const mobileNumbervalue = document.getElementById("mobile-number").value
    const mobileNumbervalueConverted = parseInt(mobileNumbervalue)

    const pinNumberValue = document.getElementById("pin-number").value
    const pinNumberValueConverted = parseInt(pinNumberValue)

    console.log(mobileNumbervalueConverted, pinNumberValueConverted);

    if(mobileNumbervalueConverted === mobileNumber && pinNumberValueConverted === pinNumber){
        window.location.href="home.html"
    }
    else{
        alert("invalid credentials")
    }
})