console.log("script chargé");

// Query selectors list
const departureInput = document.querySelector("#departure");
const arrivalInput = document.querySelector("#arrival");
const dateInput = document.querySelector("#date");
const searchBtn = document.querySelector("#search");
const tripsImg = document.querySelector("#trips-img");
const tripsParagraph = document.querySelector("#paragraph-trips");
const divTrips = document.querySelector("#trips");
// --

searchBtn.addEventListener("click", async function () {
  const body = {
    departure: departureInput.value,
    arrival: arrivalInput.value,
    date: dateInput.value,
  };
  const response = await fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const tripData = await response.json();
  if (!tripData.trip.length) {
    console.log("not found");
    destroyListOfTickets();
    tripsImg.style.display = "flex";
    tripsImg.src = "images/notfound.png";
    tripsParagraph.style.display = "flex";
    tripsParagraph.textContent = "No trip found.";
  } else {
    tripsImg.style.display = "none";
    tripsParagraph.style.display = "none";
    createTripTicketList(tripData.trip);
    querySelectorForCartButton();
  }
});

function createTripTicketList(ticketList) {
  for (const trip of ticketList) {
    const { _id, departure, arrival, date, price } = trip;
    const formatDate = new Date(date);
    const hour = formatDate.getHours();
    const minutes = formatDate.getMinutes();

    const ticketDiv = `
          <div class="ticketDiv">
              <span id="ticketDeparture">${departure} > </span>
              <span id="ticketArrival">${arrival}</span>
              <span id="ticketHours">${hour}:${minutes}</span>
              <span id="ticketPrice">${price}€</span>
              <button class="addToCartButton" id="${_id}">Book</button>
          </div>
    `;
    divTrips.innerHTML += ticketDiv;
  }
}

function querySelectorForCartButton() {
  const allButtons = document.querySelectorAll(".addToCartButton");
  for (const button of allButtons) {
    button.addEventListener("click", async function () {
      const id = this.id;
      const response = await fetch("http://localhost:3000/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.result) {
        location.assign("/frontend/cart.html");
      }
    });
  }
}

function destroyListOfTickets() {
  const listOfTickets = document.querySelectorAll(".ticketDiv");
  for (const ticket of listOfTickets) {
    ticket.remove();
  }
}
