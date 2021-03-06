$(document).ready(function() {
  
  if (navigator.geolocation) { //get geolocation
    navigator.geolocation.getCurrentPosition(setpos); 
  }

  
  function setpos(position) { //get info from openweathermap.org with position info
    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&units=metric&appid=9477645580b25d97594e05577b9c9188").done(update);
  }
  
  function update(data) { //update html based on data
    $('#weatherMain').html(data.weather[0].main);
    $('#clouds').html(data.clouds.all + '% Cloud');
    $('#tempIcon').html('<img src="https://openweathermap.org/img/w/' + data.weather[0].icon + '.png">');
    $('#city').html(data.name + ', ' + data.sys.country); 
    
    var cels = (data.main.temp).toFixed(1);
    var fahr = ((cels * (9/5)) + 32).toFixed(1);
 
    $('#cels').html(cels + '°C');
    $('#fahr').html(fahr + '°F');
  }
  
  function toggleUnit(unit) {
    
    if (unit === 'C') {
      $('#cels').show();
      $('#fahr').hide();
    } else if (unit === 'F') {
      $('#fahr').show();
      $('#cels').hide();
    }
  }
  
  $('#cels-wrapper').click(function() {
    toggleUnit('C');
  });
  
   $('#fahr-wrapper').click(function() {
    toggleUnit('F');
  });

});


