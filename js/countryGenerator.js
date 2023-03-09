//TODO: Swap the countries list for JSON
//TODO: use the 2 letter country codes for flags ex. afghanistan is af so https://www.worldometers.info/img/flags/af-flag.gif-->
 
 // Define a global object to store the country code data
 const countryCodes = {};

 // Load the JSON file on page load and store the data in the countryCodes object
 window.addEventListener('load', () => {
   fetch('countryCodes.json')
     .then(response => response.json())
     .then((data) => console.log(data));
 })
     /*   for (let i = 0; i < data.length; i++) {
         countryCodes[data[i].name] = data[i].code;
       }
     })
     .catch(error => {
       console.error(error);
     });
 });
 
 // Later on, you can access the country code data by name using the countryCodes object
 const countryCode = countryCodes["Albania"]; // Returns "AL"
 
 function selectRandomCountry() {
   const randomIndex = Math.floor(Math.random() * countries.length);
   const randomCountry = countries[randomIndex];
   str = randomCountry.replace(/\s+/g, '-').toLowerCase();
   document.getElementById("selectedCountry").innerHTML = randomCountry +countryCode[str];
   document.getElementById("flag").src = "https://www.worldometers.info/img/flags/" + str + "-flag.gif-->"
   document.getElementById("flag").style.display = "inline";
 }
 function imgError(){
   document.getElementById("flag").style.display = "none";
 } */