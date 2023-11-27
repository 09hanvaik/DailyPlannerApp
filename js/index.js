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
        save.text("Save");
        row.append(save);
    }
}

createTimeblock();

// Coloured time slots
function colouredTimeblocks() {
    var GetCurrentHR = dayjs().format('h a');
    var CurrentHour = dayjs(GetCurrentHR, 'h a');
    var Descriptions = $('.description'); // Using jQuery to select elements
    
    Descriptions.each(function (i) {
        var TimeBlock = dayjs(timeSlots[i], 'h a');
        if (CurrentHour.isSame(TimeBlock)) {
            $(this).addClass('present').removeClass('future past');
        } else if (CurrentHour.isBefore(TimeBlock)) {
            $(this).addClass('future').removeClass('past present');
        } else if (CurrentHour.isBefore(TimeBlock) === false) {
            $(this).addClass('past').removeClass('future present');
        }
    });
}
