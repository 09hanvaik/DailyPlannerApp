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
    "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"
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

// Get stored notes
function storedNotes() {
    for (var i = 0; i < timeSlots.length; i++) {
        var getStoredNotes = localStorage.getItem(i);
        var text = document.getElementById(i);
        if (getStoredNotes !== null) {
            text.append(getStoredNotes);
        }
    }
}

storedNotes();