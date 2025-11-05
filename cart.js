console.log("script chargé");

const divTrips = document.querySelector("#tripsDiv");
const divTotal = document.querySelector("#divTotal");
const purchaseButton = document.querySelector("#purchase");

async function fetchCart() {
  const response = await fetch("http://localhost:3000/carts");
  const data = await response.json();
  const filter = data.cartData.filter((ticket) => ticket.booked === false);

  if (filter.length) {
    toggleWithTickets("none");
    divTotal.style.display = "flex";
    destroyListOfTickets();
    createTripTicketList(filter);
    const total = calculateTotal(filter);
    document.querySelector("#totalCost").innerHTML = `${total}€`;
  } else {
    toggleWithTickets("flex");
    divTotal.style.display = "none";
  }
}

function toggleWithTickets(style) {
  const pList = document.querySelectorAll(".paragraphTrips");
  for (const p of pList) {
    p.style.display = style;
  }
}

function createTripTicketList(ticketList) {
  for (const trip of ticketList) {
    const { _id, departure, arrival, date, price } = trip;
    const formatDate = new Date(date);
    const hour = formatDate.getHours();
    const minutes = formatDate.getMinutes();

    const ticketDiv = `
          <div class="ticketDiv">
              <span id="ticketDeparture">${departure} > ${arrival}</span>
              <span id="ticketHours">${hour}:${minutes}</span>
              <span id="ticketPrice">${price}€</span>
              <button class="deleteToCartButton" id="${_id}">X</button>
          </div>
    `;
    divTrips.innerHTML += ticketDiv;
  }
  querySelectorForCartButton();
}

function calculateTotal(cartData) {
  let sum = 0;
  for (const ticket of cartData) {
    sum += ticket.price;
  }
  return sum;
}

function querySelectorForCartButton() {
  const allButtons = document.querySelectorAll(".deleteToCartButton");
  for (const button of allButtons) {
    button.addEventListener("click", async function () {
      const id = this.id;
      const response = await fetch("http://localhost:3000/carts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.result) {
        this.parentNode.remove();
        fetchCart();
      }
    });
  }
}

purchaseButton.addEventListener("click", async function () {
  const allTickets = document.querySelectorAll(".deleteToCartButton");
  const body = [];
  for (const ticket of allTickets) {
    body.push(ticket.id);
  }

  const response = await fetch("http://localhost:3000/carts", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  location.assign("/frontend/bookings.html");
});

function destroyListOfTickets() {
  const listOfTickets = document.querySelectorAll(".ticketDiv");
  for (const ticket of listOfTickets) {
    ticket.remove();
  }
}
fetchCart();
