$(document).ready(function buttonClicks() {
  $("#generate").click(function () {
    console.log("user clicked generate");
    checkInputs(Number($("#yearStart").val()), Number($("#yearEnd").val()));
  });
});

function checkInputs(min, max) {
  console.log("yearGen Started " + min + " " + max);
  let date = new Date().getFullYear();
  if (min > max || max > Number(date)) {
    alert(
      "Check your dates\nYour earliest year cannot be higher than your latest year"
    );
  } else {
    randomGen(min, max);
  }

  function randomGen(min, max) {
    console.log("random gen started " + min + " " + max);
    let result = Math.floor(Math.random() * (max - min) + min);
    displayResult(result);
  }
}
function displayResult(result) {
  console.log("result started " + result);
  $("#randomYear").text(result.toString());
}
