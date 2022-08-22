function Toogle() {
  const connectScreen = document.getElementById("connectScreen");
  const allData = document.getElementById("allData");
  connectScreen.style.display = "none";
  allData.style.display = "grid";
}

document.querySelector(".key-bar").addEventListener("keyup", function (event) {
  const currkey = document.querySelector(".key-bar").value;
  if (event.key == "Enter") {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric&appid=" +
        currkey
    ).then((response) => {
      if (!response.ok) {
        alert("Your key is not valid");
        throw new Error("Your key is not valid");
      }
      localStorage.setItem("key", currkey);
      Toogle();
      getWeather("Paris");
    });
  }
});

//localStorage.removeItem("key");
