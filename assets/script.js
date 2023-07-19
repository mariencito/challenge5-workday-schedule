$(function () {
  // current day on the calender
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // updates the color of the blocks
  function updateHourlyBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var hour = parseInt($(this).attr("id").split("-")[1]);

      if (hour < currentHour) {
        $(this).removeClass("future present").addClass("past");
      } else if (hour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // save button
  $(".saveBtn").on("click", function () {
    var hour = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val();
    localStorage.setItem(hour, description);
  });

  // displays the saved notes
  $(".time-block").each(function () {
    var hour = $(this).attr("id");
    var description = localStorage.getItem(hour);

    if (description) {
      $(this).find(".description").val(description);
    }
  });

  
  updateHourlyBlocks();

  // update every minute
  setInterval(updateHourlyBlocks, 60000);
});
