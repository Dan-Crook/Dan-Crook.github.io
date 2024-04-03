//Rock Paper Scissors

let rps_Options = [rock, paper, scissors]

function playGame{
    let aiChoice = rps_Options[randomGen(0,2)];
}

function randomGen(min, max) {
    console.log("random gen started " + min + " " + max);
    let result = Math.floor(Math.random() * (max - min) + min);
    displayResult(result);
  }