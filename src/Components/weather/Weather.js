import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles.css";

const apiKey = "50403a178bcd48009f0a16c0746339a8";
const url = `https://api.openweathermap.org/data/2.5/weather?`;
const furl = "32eedcee923e8c0816a33e51553b4e55";
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?`;

function Weather() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [temp, setTemp] = useState();
  const [image, setImage] = useState();
  const [forecast, setForecast] = useState();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchLocation = async () => {
      await navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    };

    fetchLocation();

    let finalUrl = `${url}lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    // console.log(finalUrl);

    const fetchData = async () => {
      await axios
        .get(finalUrl)
        .then((res) => {
          //   console.log(res.data);
          setCity(res.data.name);
          setCountry(res.data.sys.country);
          setTemp(Number(res.data.main.temp - 273.15).toFixed(2));
          setImage(res.data.weather[0].icon);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();

    let finalForecastUrl = `${forecastUrl}lat=${latitude}&lon=${longitude}&appid=${furl}`;
    // console.log(finalForecastUrl);
    const fetchForecast = async () => {
      await axios
        .get(finalForecastUrl)
        .then((res) => {
          // console.log(res.data);
          setForecast(res.data.list);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchForecast();
  }, [latitude, longitude]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div>
      <div className="mainWeather">
        <div className="mainClimate">
          <p className="header">Weather</p>
          <div className="card">
            <p>
              {new Date().getHours()} : {new Date().getMinutes()}{" "}
            </p>
            <p>
              {months[new Date().getMonth()]},{new Date().getDate()}{" "}
            </p>
            <p>{city} </p>
            <p>{country} </p>
            <p>
              {temp} °C{" "}
              <img
                src={`http://openweathermap.org/img/w/${image}.png`}
                alt=""
              />
            </p>
          </div>
        </div>

        <button
          className="btn"
          onClick={() => {
            setShow(!show);
            setCount(1);
          }}
        >
          {show
            ? "Click to close the dropdown menu"
            : "Click to see upcoming 4 days forecast"}
        </button>
        {show
          ? forecast.map((item, idx) => {
              if (idx % 5 === 0 && (idx / 5) % 2 === 1) {
                function dateFinder(c) {
                  var nextDay = new Date();
                  nextDay.setDate(new Date().getDate() + c);

                  let ans = `${
                    days[nextDay.getDay() - 1 > 0 ? nextDay.getDay() - 1 : 6]
                  }, ${nextDay.getDate()}  ${months[nextDay.getMonth()]},  `;

                  return ans;
                }
                return (
                  <div className="row">
                    <div className="date">{dateFinder((idx + 10) / 10)}</div>
                    <div className="temp">
                      {Number(item.main.temp - 273.15).toFixed(2)} °C
                    </div>

                    <div className="kind">{item.weather[0].description} </div>
                    <div className="img">
                      <img
                        src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                        alt=""
                      />
                    </div>
                  </div>
                );
              }
            })
          : null}
      </div>
    </div>
  );
}

export default Weather;
