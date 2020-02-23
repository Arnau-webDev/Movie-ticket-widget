
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const movieSelect = document.querySelector("#movie");
const countDisplay = document.querySelector("#count");
const totalDisplay = document.querySelector("#total");

populateUI();

let ticketPrice = parseInt(movieSelect.value);

container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");

        updateSelectedCount();
    }
});

movieSelect.addEventListener("change", (e) => {
    ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    
    //Maps the selectedSeats nodeList into an array with the index of the element(selectedSeat) in the 'seats' nodeList which contains all the 47 seats across all the rows
    const seatsIndex = [...selectedSeats].map(selectedSeat => {
        return [...seats].indexOf(selectedSeat);
    });

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    countDisplay.innerText = selectedSeatsCount;
    totalDisplay.innerText = selectedSeatsCount * ticketPrice + "$";
}

function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}


// Get data from localStorage and populate the UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        }) 
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Initial count and total
updateSelectedCount();





