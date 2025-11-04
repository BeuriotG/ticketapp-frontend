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
  //   const response = await fetch("http://localhost:3000");
  //   const data = response.json();
  console.log(departureInput.value, arrivalInput.value, dateInput.value);
});
