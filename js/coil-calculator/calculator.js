  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      validateForm();
    }
  });


/*
================
Global Variables
================
*/
let lenBool = false;

const prestonOld = `{
        "od": 1600,
        "width": 350,
        "onWeight": 1500,
        "minGauge": 0.3,
        "maxGauge": 1.2,
        "scrap": 5,
        "slits": 13,
        "slitWidth": 9.05,
        "offOD": 970,
        "offWeight": 750
      }`;
const prestonNew = `{
        "od": 1350,
        "width": 470,
        "onWeight": 2500,
        "minGauge": 0.3,
        "maxGauge": 1.2,
        "scrap": 5,
        "slits": 13,
        "slitWidth": 9.05,
        "offOD": 1190,
        "offWeight": 750
      }`;

let machineSpec = [prestonOld, prestonNew];


function validateForm() {
  let errorCount = 0;
  let valForm = [$("#weightOrLength"), $("#width"), $("#gauge")];
  let valFormInt = [$("#coils"), $("#runs")];

  valFormInt.forEach((input) => {
    input.removeClass("inputError");
    let inputValue = Number(input.val());
    if (inputValue === "" || inputValue < 1 || !Number.isInteger(inputValue)) {
      input.addClass("inputError");
      errorCount += 1;
    }
  });

  valForm.forEach((input) => {
    input.removeClass("inputError");
    if (input.val() === "" || Number(input.val()) <= 0) {
      input.addClass("inputError");
      errorCount += 1;
    }
  });

  if (errorCount < 1) {
    calculate();
  }
}


function calculate() {
  /*
==============
CLEAR MESSAGES
==============
*/

  $("#messages").empty();

  /*
==========
VARIABLES
=========
*/

  /*
====================================
CONSTANTS - USER CANNOT CHANGE THESE
====================================
*/
  const coefficient = 1_000_000;
  const metersPerMinute = 9.5;
  const pick = 0.5;
  const onCoil = 0.16;
  const offCoil = 0.16;
  const pack = 0.5;
  const setup = 0.16;
  let slitSizes = [];
  let numSlits = [];

  /*
=========================
VARIABLES FROM USER INPUT
=========================
*/
  let offCoilTime = 0;
  let onCoilTime = 0;

  let runs = $("#runs").val();
  let width = $("#width").val();
  let gauge = $("#gauge").val();
  let coilID = $("#coilID").val();
  let density = $("#density").val();
  let coils = $("#coils").val();
  let machine = $("#machine").val();
  let lengthInput = 1;
  let weight = 0;
  let errorType = JSON.parse(machineSpec[machine]);


  if($("#length-weight").val()=="weight"){
    lenBool = false;
}
else{
    lenBool = true;
};
  if (lenBool == true) {
    lengthInput = $("#weightOrLength").val();
    weight = density * ((width * gauge * lengthInput) / coefficient);
  } else {
    weight = $("#weightOrLength").val();
  }
  /*
======
ERRORS
======
*/
  const errorFeedOD =
    '<li class="message error"> FEED OD: The feed coil OD is over the maximum for the selected machine<br>Max = ' +
    errorType.od +
    "mm</li>";
  const errorFeedWeight =
    '<li class="message error"> FEED WEIGHT: The feed coil weight is over the maximum for the selected machine<br>Max = ' +
    errorType.onWeight +
    "kg</li>";
  const errorRunsWeight =
    '<li class="message error"> PRODUCED WEIGHT: The produced coils weight is over the maximum for the selected machine<br>Max = ' +
    errorType.offWeight +
    "kg</li>";
  const errorRunsOD =
    '<li class="message error"> PRODUCED OD: The produced coils OD is over the maximum for the selected machine<br>Max = ' +
    errorType.offOD +
    "mm</li>";
  const errorFeedWidth =
    '<li class="message error"> FEED WIDTH: The feed coil width is over the maximum for the selected machine<br>Max = ' +
    errorType.width +
    "mm</li>";
  const errorSlits =
    '<li class="message error"> SLITS: There are too many slits for the selected machine to handle at once<br>Max = ' +
    errorType.slits +
    "</li>";
  const errorScrap =
    '<li class="message error"> SCRAP: The scrap width is under the minimum for the selected machine<br>Min = ' +
    errorType.scrap +
    "mm</li>";
  const errorSlitSize =
    '<li class="message error"> SLIT WIDTH: One or more slit widths are under the minimum for the selected machine<br>Min = ' +
    errorType.slitWidth +
    "mm</li>";
  const errorMinGauge =
    '<li class="message error"> GAUGE: The feed coil gauge is under the minimum for the selected machine)<br>Min = ' +
    errorType.minGauge +
    "mm</li>";
  const errorMaxGauge =
    '<li class="message error"> GAUGE: The feed coil gauge is over the maximum for the selected machine<br>Max = ' +
    errorType.maxGauge +
    "mm</li>";
  /*
=====================
FEED COIL INFORMATION
=====================
*/

  let coilWeight = weight / coils || 0;
  let coilWeightPounds = coilWeight * 2.2 || 0;
  let feedLengthTotal =
    Math.round(((weight / density) * coefficient) / (width * gauge)) || 0;
  let feedLength =
    Math.round(
      ((weight / coils / density) * coefficient) / (width * gauge)
    ) || 0;
  let feedCoilOD =
    Math.round(
      Math.sqrt(coilID ** 2 + (4 * feedLength * gauge * 1000) / Math.PI)
    ) || 0;

  $("#coilWeight").text(
    "Feed Coil Weight = " +
      coilWeight.toFixed(0).toString() +
      "kg (" +
      coilWeightPounds.toFixed(1).toString() +
      " lb) per coil"
  );
  $("#feedLength").text(
    "Feed Coil Length = " + feedLength.toString() + "meters per coil"
  );
  $("#feedCoilOD").text(
    "Feed Coil OD = " +
      feedCoilOD.toString() +
      "mm (" +
      (feedCoilOD / 25.4).toFixed(0).toString() +
      '") per coil'
  );

  if (coilWeight > errorType.onWeight) {
    $("#messages").append(errorFeedWeight);
  }
  if (feedCoilOD > errorType.od) {
    $("#messages").append(errorFeedOD);
  }
  if (width > errorType.width) {
    $("#messages").append(errorFeedWidth);
  }
  if (gauge > errorType.maxGauge) {
    $("#messages").append(errorMaxGauge);
  }
  if (gauge < errorType.minGauge) {
    $("#messages").append(errorMinGauge);
  }
  /*
==========================
PRODUCED COILS INFORMATION
==========================
*/

  let runWeight = weight / runs / coils;
  let runWeightPounds = runWeight * 2.2;
  let length =
    Math.round(((runWeight / density) * coefficient) / (width * gauge)) ||
    0;
  let coilOD =
    Math.round(
      Math.sqrt(coilID ** 2 + (4 * length * gauge * 1000) / Math.PI)
    ) || 0;
  let buildUp = runWeight / width || 0;
  let coilODInch = coilOD / 25.4;

  $("#length").text(
    "Coil Length = " + length.toFixed(2).toString() + "meters"
  );
  $("#coilOD").text(
    "Coil OD = " +
      coilOD.toString() +
      "mm (" +
      coilODInch.toFixed(0).toString() +
      '")'
  );
  $("#buildUp").text(
    "Build Up = " + buildUp.toFixed(2).toString() + "mm per coil"
  );
  $("#runWeight").text(
    "Total Weight Per Run = " + runWeight.toFixed(0).toString() + "kg"
  );

  if (runWeight > errorType.offWeight) {
    $("#messages").append(errorRunsWeight);
  }
  if (coilOD > errorType.offOD) {
    $("#messages").append(errorRunsOD);
  }

  /*
======================
CALCULATING SLIT SIZES
======================
*/
$("#slitSizes").empty();
slitSizes = $(".slitWidth");
numSlits = $(".slitNum");
let scrap = width;
let scrapWeight = 0;
let sizeCount = 0;
let sizeError = 0;
for (var i = 0, n = slitSizes.length; i < n; i++) {
  let size = $(slitSizes[i]).val();
  let num = $(numSlits[i]).val();
  if (size > 0 && num > 0) {
    sizeCount = +1;
    if (size < errorType.slitWidth) {
      sizeError = +1;
    }
    let totalSlitWeight = (weight / width) * num * size;
    let numCoils = coils * runs * num;
    let slitWeight = totalSlitWeight / numCoils;
    scrap = scrap - num * size;
    scrapWeight = (weight / width) * scrap;
    $("#slitSizes").append(
      "<li>" +
      $(slitSizes[i]).val() +
      "mm Total: " +
      totalSlitWeight.toFixed(0).toString() +
      "kg <br> " +
      numCoils +
      " coils at " +
      slitWeight.toFixed(0).toString() +
      "kg (" +
      (slitWeight * 2.2).toFixed(1).toString() +
      " lb) each</li><br>"
    );
  }
}
if (sizeError > 0) {
  $("#messages").append(errorSlitSize);
}
if (sizeCount > 0) {
  $("#slitSizes").append(
    "<li>Scrap: " + scrap.toFixed(0) + "mm (" + scrapWeight.toFixed(0) + "kg)</li>"
  );
}
if (scrap < 0) {
  alert("Slit widths exceed the feed coil width");
  $("#slitSizes").addClass("slitError")
  $("#slitSizes").children("*").addClass("slitError")
  $("#messages").append(
    '<li class="message error">Slit widths exceed the Feed coil width</li>'
  );
} else if (scrap < errorType.scrap) {
  $("#messages").append(errorScrap);
  $("#slitSizes").removeClass("slitError")
  $("#slitSizes").children("*").removeClass("slitError")
} else {
  $("#slitSizes").removeClass("slitError")
  $("#slitSizes").children("*").removeClass("slitError")
}
  /*
================
PRODUCTION TIMES
================
*/
  let slits = 0;
  for (var i = 0; i < numSlits.length; i++) {
    slits = slits + Number($(numSlits[i]).val());
  }
  if (slits > errorType.slits) {
    $("#messages").append(errorSlits);
  }
  let time = feedLengthTotal / metersPerMinute / 60;
  let days = time / 7;

  /*
=========================================================================================
IF WEIGHTS ARE LESS THAN 25 THEN THEY CAN BE MANUALLY HANDLES QUICKER SO LESS TIME TO ADD
==========================================================================================
                  */
  onCoilTime = onCoil * coils;
  offCoilTime = offCoil * runs * coils * slits;

  /*
=================================================================================
IF THERE IS NO COIL WEIGHT THEN THERE WILL BE NO MANUAL HANDLING - set TIMES TO 0
=================================================================================
*/
  let handling = 0;
  if (weight > 0) {
    handling = onCoilTime + offCoilTime;
  } else {
    handling = 0;
  }
  let handlingDays = handling / 7;

  let additionalTime = pick + pack + setup * slits;
  let additionalTimeDays = additionalTime / 7;

  let totalTime = time + handling + additionalTime;
  let totalDays = totalTime / 7;

  $("#time").text(
    "Slitting: " +
      time.toFixed(1).toString() +
      " hours (" +
      days.toFixed(1).toString() +
      " working days)"
  );
  $("#handling").text(
    "Handling: " +
      handling.toFixed(1).toString() +
      " hours (" +
      handlingDays.toFixed(1).toString() +
      " working days)"
  );
  $("#additionalTime").text(
    "Setup And Packing: " +
      additionalTime.toFixed(1).toString() +
      " hours (" +
      additionalTimeDays.toFixed(1).toString() +
      " working days)"
  );
  $("#totalTime").text(
    "Total Time: " +
      totalTime.toFixed(1).toString() +
      " hours (" +
      totalDays.toFixed(1).toString() +
      " working days)"
  );

  /*
=======================================
DISPLAY REPORT,  MESSAGES AND SLIT DATA
=======================================
*/
  if ($("#messages").is(":empty")) {
    $("#messageHeader").css("display", "none");
  } else {
    $("#messageHeader").css("display", "block");
  }

  if ($("#slitSizes").is(":empty")) {
    $("#slitSizeHeader").css("display", "none");
  } else {
    $("#slitSizeHeader").css("display", "block");
  }

  report = $("#report");
  report.css("display", "block");
  report[0].scrollIntoView({ behavior: "smooth" });
}