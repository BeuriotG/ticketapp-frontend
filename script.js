console.log("script chargé");
const date = new Date();

const actualDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
console.log(actualDate);

const departureInput = document.querySelector("#departure");
const arrivalInput = document.querySelector("#arrival");
const dateInput = document.querySelector("#date");
dateInput.value = actualDate;
const searchBtn = document.querySelector("#search");

searchBtn.addEventListener("click", async function () {
  const body = {
    departure: departureInput.value,
    arrival: arrivalInput.value,
    date: "2025-11-04T09:40:05.123+00:00",
  };
  const response = await fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!data.trip.length) {
    document.querySelector("#trips-img").src = "images/notfound.png";
    document.querySelector("#paragraph-trips").textContent = "No trip found.";
  } else {
  }
  console.log(data);
});
