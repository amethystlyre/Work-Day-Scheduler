//Use advance format plugin to display date
dayjs.extend(window.dayjs_plugin_advancedFormat)
//initialize empty local storage list
var hourList = [];

$(function () {

  var currentDay = $("#currentDay");
  $(currentDay).text(dayjs().format("dddd, MMM Do, YYYY"));
  var listContainer = $("#hour-list")

  listContainer.on("click", saveRecord);
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

function checkLocalHourList() {
  if (localStorage.hasOwnProperty("hourList")) {
    return hourList = JSON.parse(localStorage.getItem("hourList"));
  }
  else {
    return hourList = [];
  }
}

function saveRecord(event) {
  event.preventDefault();
  if (event.target.matches("i")) {
    let hourId = $(event.target).parent().parent("div").attr("id");
    let userRecord = $(event.target).parent().siblings("textarea").val();

    //console.log(record);
    //console.log(hourRecord);
    //console.log(userRecord);

    if (userRecord != null && userRecord != "") {
      let userEvent = {
        hour: hourId,
        event: userRecord
      }
      checkLocalHourList();

      let findRecordIndex = hourList.findIndex((record) => record.hour === hourId);
      if (findRecordIndex == -1) {
        hourList.push(userEvent);
      } else {
        hourList[findRecordIndex]["event"] = userRecord;
      }

      localStorage.setItem("hourList", JSON.stringify(hourList));
    }
  }
}

function displayRecord() {
  checkLocalHourList();
  

}
