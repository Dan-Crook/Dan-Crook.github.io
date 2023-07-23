$(document).ready(function () {
    $(".collapsible").click(function () {
      $(this).next().fadeToggle(300);
    });
  });