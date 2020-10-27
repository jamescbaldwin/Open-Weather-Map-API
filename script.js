var cityHistory = JSON.parse(localStorage.getItem('history')) || []
    
$("#search-button").on("click", function () {
    
    event.preventDefault();
    var city = $("#citySearch").val();
    cityForecast(city);
    weeklyWeather(city);
    // $("#cityName").html(city)

})

function cityForecast(city) {

    var url1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=91aa2321b032e187ef5be60685d90a73";

        $.ajax({
            url: url1,
            method: 'GET',
        }).then(function(response1) {
            console.log(response1);

            if (cityHistory.indexOf(city) === -1) {
            cityHistory.push(city)
            localStorage.setItem("history", JSON.stringify(cityHistory))
            
            display()
            }
        var cityName = response1.name
        console.log(cityName)
        var cityTemp = response1.main.temp
        var cityFahrenheit = (((cityTemp * 1.8) - 459.67).toFixed(1))
        var cityHumidity = response1.main.humidity
        var cityWind = response1.wind.speed
        let cityLat = response1.coord.lat
            // console.log('cityLat:', cityLat)
        let cityLon = response1.coord.lon
            // console.log('cityLon:', cityLon)

        $("#cityName").html('<h4>' + cityName + " " + moment().format('LL'))
        $("#cityTemp").html('<h4>' + "Temperature(F): " + cityFahrenheit)
        $("#cityHumidity").html('<h4>' + "Humidity: " + cityHumidity + "%")
        $("#cityWind").html('<h4>' + "Wind Speed: " + cityWind + " MPH")

        var url2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=91aa2321b032e187ef5be60685d90a73";

        $.ajax({
            url: url2,
            method: 'GET'
        }).then(function(response2) {
            console.log(response2);
            var cityUV = response2.value;
            var uvColor = $("#cityUV").html('<h4>' + "UV Level: " + cityUV);

            if (cityUV > 7) {
                uvColor.css('background-color', 'purple')
                uvColor.css('color', 'white')
            } else if (cityUV <= 3) {
                uvColor.css('background-color', 'red')
                uvColor.css('color', 'black')
            } else {
                uvColor.css('background-color', 'yellow')
                uvColor.css('color', 'black')
             }
        });
    });
};
    
function weeklyWeather(city) {

    var url3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=91aa2321b032e187ef5be60685d90a73&units=imperial";

        $.ajax({
            url: url3,
            method: 'GET'
        }).then(function(response3){
            let day_number = 0; 
            
            //iterate through the 40 weather data sets
            for(let i=0; i< response3.list.length; i++){
                
                //split function to isolate the time from the time/data aspect of weather data, and only select weather reports for 3pm
                if(response3.list[i].dt_txt.split(" ")[1] == "15:00:00")
                {
                    //if time of report is 3pm, populate text areas accordingly
                    let day = response3.list[i].dt_txt.split("-")[2].split(" ")[0];
                    let month = response3.list[i].dt_txt.split("-")[1];
                    let year = response3.list[i].dt_txt.split("-")[0];
                    $("#" + day_number + "date").text(month + "/" + day + "/" + year); 
                    let temp = Math.round(((response3.list[i].main.temp - 273.15) *9/5+32));
                    $("#" + day_number + "day-temp").text("Temp: " + temp + String.fromCharCode(176)+"F");
                    $("#" + day_number + "day-humidity").text("Humidity: " + response3.list[i].main.humidity);
                    $("#" + day_number + "day-icon").attr("src", "http://openweathermap.org/img/w/" + response3.list[i].weather[0].icon + ".png");
                    console.log(response3.list[i].dt_txt.split("-"));
                    console.log(day_number);
                    console.log(response3.list[i].main.temp);
                    day_number++; 
                            }   
            }
        });

    function display() {
        var cityHistory = JSON.parse(localStorage.getItem("history")) || []
        var html = ""
        for (var q = 0; q < cityHistory.length; q++) {
            html += `<button class="previousCity">${cityHistory[q]}</button>`
        }
        console.log(html);
        $("#searchHistory").html(html);
        }

    $('#history').on('click', ".previuosCity", function () {
        var city = $(this).text()
        console.log(city);
        cityForecast(city);
        weeklyWeather(city);   
      });

    display()

      $("#clearHistory").on("click", function () {
          cityHistory.splice(0)
          localStorage.setItem("history", JSON.stringify(cityHistory))
          display()
      })
    };