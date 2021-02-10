const cinema = document.querySelector('.cinema-ui');
const selectedMovie = document.querySelector('#movie');
const seats = document.querySelectorAll('.hall-row .seat:not(.occupied');
const seatCount = document.querySelector('#count');
const priceTotal = document.querySelector('#total');

// console.log(seats);

populateUI();

let moviePrice = parseInt(selectedMovie.value); // converts the string value to a number. can also attach a plus symbol infront to get the same results

// save selectec movie and price
function setMovieData (movieIndex, moviesPrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviesPrice);
}

// update the number of seats selected
function updateSeatNumber() {
    const selected = document.querySelectorAll('.hall-row .seat.selected')

    // setting and adding localStorage
    const seatsIndex = [...selected].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    // console.log(seatsIndex);

    const selectedSeats = selected.length;

    seatCount.innerHTML = selectedSeats;
    priceTotal.innerHTML = selectedSeats * moviePrice;
}

// use local storage data to updateUI
function populateUI() {
    const seatsSelected = JSON.parse(localStorage.getItem('selectedSeats'));

    if (seatsSelected !== null && seatsSelected.length > 0) {

        seats.forEach((seat, index) => {
            if (seatsSelected.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });

    }
    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        selectedMovie.selectedIndex = selectedMovieIndex;
    }
}


// update price upon movie change
selectedMovie.addEventListener('change', e => {
    
    moviePrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSeatNumber();
});


// add event listener to check for click on seats
cinema.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }

    updateSeatNumber();
});

// initial count and total number
updateSeatNumber();