
function myFunction() {
    const connectScreen = document.getElementById("connectScreen");
    const allData = document.getElementById("allData");
    if (localStorage.getItem("key") !== null) {
      connectScreen.style.display = "none";
      allData.style.display = "grid"
    } 
}
//localStorage.setItem("key", "034fa528ccf9f7ebe825bbbff6f5e98f");
//localStorage.removeItem("key");
myFunction();