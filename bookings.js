console.log("script chargé");

const divTrips = document.querySelector("#tripsDiv");
const toggleWithTicket = document.querySelectorAll(".toggleWithTicket");

async function fetchTickets() {
  const response = await fetch("http://localhost:3000/carts");
  const data = await response.json();
  const filter = data.cartData.filter((ticket) => ticket.booked === true);
  if (filter.length) {
    const pList = document.querySelectorAll("#paragraphTrips");
    for (const p of pList) {
      p.style.display = "none";
    }
    for (const toggle of toggleWithTicket) {
      toggle.style.display = "inline";
    }
    createTripTicketList(filter);
  } else {
    for (const toggle of toggleWithTicket) {
      toggle.style.display = "none";
    }
    const pList = document.querySelectorAll("#paragraphTrips");
    for (const p of pList) {
      p.style.display = "flex";
    }
  }
}
function createTripTicketList(ticketList) {
  for (const trip of ticketList) {
    const { departure, arrival, date, price } = trip;
    const formatDate = new Date(date);
    const day = formatDate.getDate();
    const hour = formatDate.getHours();
    const minutes = formatDate.getMinutes();
    const actualDate = new Date(Date.now());
    const actualHour = actualDate.getHours();
    const actualDay = actualDate.getDate();
    console.log(actualDay);
    const waiting = `<span>Departure in ${day - actualDay} day and ${
      actualHour - hour
    } hours</span>`;

    const ticketDiv = `
          <div class="ticketDiv">
              <span id="ticketDeparture">${departure} > ${arrival}</span>
              <span id="ticketHours">${hour}:${minutes}</span>
              <span id="ticketPrice">${price}€</span>
            <span>Departure in ${waiting} hours</span>
          </div>
    `;
    divTrips.innerHTML += ticketDiv;
  }
}

fetchTickets();
