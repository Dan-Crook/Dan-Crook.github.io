  $(document).ready(function () {
    $(".add").click(function () {
      $("<br>").addClass("cloneBreak").appendTo(".slits-and-sizes");
      var newEntry = $(".slits-sizes-entry:first").clone();
      newEntry.appendTo(".slits-and-sizes").find("input[type=number]").val(0);
    });
  });

  $(document).ready(function () {
    $(".minus").click(function () {
      if ($(".slits").length > 1) {
        $(".slits:last").remove();
        $(".sizes:last").remove();
        $(".cloneBreak:last").remove();
      }
    });
  });