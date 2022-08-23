const getWeather = (city) => {
  const key = localStorage.getItem("key");
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      key
  )
    .then((response) => {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data) => display(data));
};

const mod = (num, modulo, str = "") => {
  if (num >= modulo && str != "") {
    let temp = str[0] + (parseInt(str[1]) + 1).toString() + str[2];
    return temp + (+(num % modulo)).toString();
  }
  if (num >= 0) {
    return (+(num % modulo)).toString();
  }
  while (num < 0) {
    num += modulo;
  }
  return num.toString();
};

const format = (str) => {
  if (str.length < 2) {
    str = "0" + str;
  }
  return str;
};

const currTime = (timezone) => {
  timezone /= 3600;
  let gmtHours = new Date().getUTCHours();
  let gmtMinutes = new Date().getUTCMinutes();
  let res = "";
  res += format(mod(gmtHours + Math.trunc(timezone), 24)) + ":";
  if (!Number.isInteger(timezone)) {
    let realminutes = Math.round((timezone % 1) * 100) / 100;
    if (realminutes * 60 + gmtMinutes >= 60) {
      res = format(mod(realminutes * 60 + gmtMinutes, 60, res));
    } else {
      res += format(mod(realminutes * 60 + gmtMinutes, 60));
    }
  } else {
    res += format(gmtMinutes.toString());
  }
  return res;
};

const display = (data) => {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  const { timezone } = data;
  document.querySelector(".cityname").innerText = "Weather in " + name;
  document.querySelector(".temperature").innerText = temp + "°C";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
  document.querySelector(".description").innerText = titleCase(description);

  document.querySelector(".time").innerText = currTime(timezone);

  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";

  document.querySelector(".weatherdata").classList.remove("loading");

  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + name + "')";

  localStorage.setItem("lastSearch", name);
};

const search = () => {
  getWeather(document.querySelector(".search-bar").value);
};

document.querySelector(".search-button").addEventListener("click", function () {
  search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      search();
    }
  });

const titleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

function Toogle() {
  const connectScreen = document.getElementById("connectScreen");
  const allData = document.getElementById("allData");
  connectScreen.style.display = "none";
  allData.style.display = "grid";
}

if (localStorage.getItem("key") !== null) {
  Toogle();
  getWeather(localStorage.getItem("lastSearch"));
}
