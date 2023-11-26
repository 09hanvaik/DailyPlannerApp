// Variables
var currentDay = $("#currentDay");

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
var now = dayjs().format("dddd, MMMM D - YYYY");
currentDay.text(now);

