const key = 'be288bff8bd85a54d936b1e447023513';

const getWeather = (city) => {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +"&units=metric&appid=" + key
      ).then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => display(data));
}

const display = (data) => {
    const { name } = data;
    //const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    //const { speed } = data.wind;
    document.querySelector(".cityname").innerText = 'Weather in ' + name;
    document.querySelector(".temperature").innerText = temp + '°C';
    document.querySelector(".humidity").innerText = humidity + '%';
}

const search = () => {
    getWeather(document.querySelector(".search-bar").value);
}

document.querySelector(".search-button").addEventListener("click", function () {
    search();
  });