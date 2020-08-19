const maxSelectable = 2;
const updateUserSelectedSeat = (bus, screen) => {
  const isBusDisabled = bus.classList.contains("disabled");
  const selectedSeats = bus.querySelectorAll(".seat.selected.editable");

  const selectedSeatsNumbers = [];
  if (selectedSeats && selectedSeats.length) {
    selectedSeats.forEach((seat) => {
      selectedSeatsNumbers.push(seat.textContent);
    });
  }

  screen.textContent = selectedSeatsNumbers.join(", ");
  if (selectedSeatsNumbers.length < maxSelectable) {
    if (isBusDisabled) {
      bus.classList.remove("disabled");
    }
  } else {
    if (!isBusDisabled) {
      bus.classList.add("disabled");
    }
  }
};

const selectSeat = (seat) => {
  seat.classList.add("selected", "editable");
};

const deselectSeat = (seat) => {
  seat.classList.remove("selected", "editable");
};

window.addEventListener("load", () => {
  const bus = document.querySelector(".bus");
  const screen = document.querySelector(".screen > .value");

  if (bus && screen) {
    bus.addEventListener("click", (e) => {
      const classList = e.target.classList;
      if (classList.contains("seat")) {
        const isBusDisabled = bus.classList.contains("disabled");
        const seat = e.target;

        if (!classList.contains("disabled")) {
          if (classList.contains("selected")) {
            if (!classList.contains("editable")) {
              return alert(
                `seat number ${seat.textContent} is already taken`
              );
            } else {
              deselectSeat(seat);
            }
          } else {
            if (!isBusDisabled) {
              selectSeat(seat);
            }
          }

          updateUserSelectedSeat(bus, screen);
        }
      }
    });
  }
});