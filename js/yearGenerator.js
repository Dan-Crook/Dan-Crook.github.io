function randomiser(min, max){
    min = Number(min)
    max = Number(max)
    let date =  new Date().getFullYear();
    if(min>max || max> Number(date)){
    alert("Check your dates");
    }
    else{
    let yearPicked = Math.floor(Math.random() * (max - min) + min);
    $('#randomYear').text(yearPicked.toString());
    }
    }