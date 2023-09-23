$(function () {
  //Use advance format plugin to display date
  dayjs.extend(window.dayjs_plugin_advancedFormat)
  //initialize empty local storage list
  var hourList = [];
  //display schedule from previous local records
  displayRecord();

  //Get today's date information using dayjs
  var today = $("#currentDay");
  today.text(dayjs().format("dddd, MMM Do, YYYY"));
  
  //Get current time information using dayjs
  var timeContainer = $("#hour-list");
  timeContainer.on("click", saveRecord);
  //update background color based on current time
  updateTimeColor();

  //get the delement to display alert banner
  var alertDisplay = $(".alert");

  //check local storage for previous saved records
  function checkLocalHourList() {
    if (localStorage.hasOwnProperty("hourList")) {
      return hourList = JSON.parse(localStorage.getItem("hourList"));
    }
    else {
      return hourList = [];
    }
  }

  //Update time events in scheduler
  function saveRecord(event) {
    event.preventDefault();
    if (event.target.matches("i")) {
      let hourId = $(event.target).parent().parent("div").attr("id");
      let userRecord = $(event.target).parent().siblings("textarea").val();

      //appointment added or updated
      if (userRecord != null && userRecord != "") {
        updateLocalHourList(hourId,userRecord);
        updateAlertMsg("Appointment added to ");
        alertDisplay.fadeIn().delay(5000).fadeOut();
      }
      //appointment cleared
      else{
        updateLocalHourList(hourId,userRecord);
        updateAlertMsg("Appointment removed from ");
        alertDisplay.fadeIn().delay(5000).fadeOut();
      }
    }
    displayRecord();
  }

  //render events on work day schedule
  function displayRecord() {
    checkLocalHourList();

    for (let i in hourList) {
      let recordId = "#" + hourList[i].hour;
      $(recordId).children("textarea").val(hourList[i].event);
    }
  }

  //update color for past, present and future time blocks
  function updateTimeColor() {
    let currentTime = dayjs().hour();
    if (currentTime < 9) {
      timeContainer.children().addClass("future");
    } else if (currentTime > 17) {
      timeContainer.children().addClass("past");
    }
    else {
      let timeId = "#hour-" + currentTime.toString();
      $(timeId).addClass("present");
      $(timeId).prevAll().addClass("past");
      $(timeId).nextAll().addClass("future");
    }
  }

  //update data stored in local storage
  function updateLocalHourList(hourId,userRecord){
    let userEvent = {
      hour: hourId,
      event: userRecord
    }
    checkLocalHourList();

    //check if hour ID already exists in storage list
    //if hour ID already exists, then update existing userEvent object
    //if hour ID doesn't exist then add a new userEvent object to the list
    let findRecordIndex = hourList.findIndex((record) => record.hour === hourId);
    if (findRecordIndex == -1) {
      hourList.push(userEvent);
    } else {
      hourList[findRecordIndex].event = userRecord;
    }
    localStorage.setItem("hourList", JSON.stringify(hourList));
  }
  
  //a helper function for updating alert text message
  function updateAlertMsg(msg){
      let alert = $("#alert-text");
      alert.text(msg);
  }

});

