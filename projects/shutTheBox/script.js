const num_Dice = 2;
let diceTotal = 0;
let SelectedTotal = 0;
let NumbersArray = [];

function play(num_cards) {
  console.log("game started");
  empty_game_area();
  $(".play").text("RESTART");
  $(".hidden_on_load").css("display", "inline-block");
  $(".endGame").css("display", "none");
  $(".submit").css("display", "inline-block");
  for (var i = 1; i < num_cards; i++) {
    $(".cards").append(
      '<p class="card" onclick="getNumber($(this))">' + i + "</P>"
    );
    NumbersArray.push(i);
  }
  roll(1, 7);
}
function roll(min, max) {
  $(".dice_results").empty();
  for (var i = 0; i < num_Dice; i++) {
    const rolled = Math.floor(Math.random() * (max - min) + min);
    $(".dice_results").append("<p>" + rolled + "</P>");
    diceTotal = diceTotal + rolled;
  }
  $(document).ready(getSubsets(NumbersArray, diceTotal));
}
function empty_game_area() {
  $(".cards ").empty();
  $(".dice_results").empty();
  diceTotal = 0;
  SelectedTotal = 0;
  NumbersArray = [];
}
function getNumber(cardSelected) {
  if (!cardSelected.hasClass("selected")) {
    cardSelected.addClass("selected");
    SelectedTotal = SelectedTotal + parseInt(cardSelected.text());
  } else {
    $(cardSelected).removeClass("selected");
    SelectedTotal = SelectedTotal - parseInt(cardSelected.text());
  }
}
function submitAnswer() {
  if (SelectedTotal == diceTotal && diceTotal != 0) {
    $(".selected").each(function () {
      $(this).removeClass("selected");
      $(this).addClass("closed");
      var index = NumbersArray.indexOf(parseInt($(this).text()));
      if (index > -1) {
        NumbersArray.splice(index, 1);
      }
    });
    SelectedTotal = 0;
    diceTotal = 0;
    $(".dice_results").empty();
    checkWin();
  }
}
function checkWin() {
  cardCount = $(".card").length;
  closedCount = $(".closed").length;
  if (closedCount == cardCount) {
    empty_game_area();
    $(".submit").css("display", "none");
    $(".endGame").text("Congratulations, You Win!");
    $(".endGame").css("display", "block");
  } else {
    roll(1, 7);
  }
}
function getSubsets(array, sum) {
  function fork(i = 0, s = 0, t = []) {
    if (s === sum) {
      result.push(t);
      return;
    }
    if (i === array.length) {
      return;
    }
    if (s + array[i] <= sum) {
      // shout circuit for positive numbers only
      fork(i + 1, s + array[i], t.concat(array[i]));
    }
    fork(i + 1, s, t);
  }
  var result = [];
  fork();
  console.log(result.length);
  if (result.length < 1) {
    console.log("Game Over");
    $(".submit").css("display", "none");
    $(".endGame").text("Game Over: You Lose!");
    $(".endGame").css("display", "block");
  }
  return result;
}
