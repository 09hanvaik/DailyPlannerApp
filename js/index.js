// Variables
var currentDay = $("#currentDay");
var timeblocksEl = $("#timeSlots");


//Function to find the suffix of the day
const nthNumber = (number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

// DayJs for the current day
var daySuffix = nthNumber(dayjs().format("D"));
var now = dayjs().format("dddd, MMMM D");
currentDay.text(now+daySuffix);

// Time Slots
var timeSlots = [
    "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

function createTimeblock() {
    for (var i = 0; i < timeSlots.length; i++) {
        var side = timeSlots[i];

        var row = $("<div>").addClass("row");
        timeblocksEl.append(row);

        var hour = $("<div>").addClass("hour block");
        hour.html(side);
        row.append(hour);

        var text = $("<textarea>").addClass("description block").attr('id', i);
        row.append(text);

        var save = $("<button>").addClass("saveBtn block").attr("value", i);
        row.append(save);
    }
}

createTimeblock();

// Save function
$(document).on('click', '.saveBtn', function (event) {
    event.preventDefault();
    var SaveBtnValue = $(this).val();
    var description = document.getElementById(SaveBtnValue).value;
    localStorage.setItem(SaveBtnValue, description);
});

// Get slot notes
function slotNotes() {
    for (var i = 0; i < timeSlots.length; i++) {
        var getSlotNotes = localStorage.getItem(i);
        var text = document.getElementById(i);
        if (getSlotNotes !== null) {
            text.append(getSlotNotes);
        }
    }
}
slotNotes();

// Colour time slots
function colourTimeSlots() {
    var descriptions = $('.description');
    
    //Compare the current time to current slot time (in the loop for each slot), and colour using classes.
    descriptions.each(function (i) {
        var currentHour = parseInt(dayjs().format('H'));
        var currentTimeSlot = parseInt(timeSlots[i].slice(0,-3));

        if (currentHour == currentTimeSlot) {
            $(this).addClass('present').removeClass('future past');
        } else if (currentHour < currentTimeSlot) {
            $(this).addClass('future').removeClass('past present');
        } else if (currentHour > currentTimeSlot) {
            $(this).addClass('past').removeClass('future present');
        }
    });
}


colourTimeSlots();
