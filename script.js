    var cityHistory = JSON.parse(localStorage.getItem('history')) || []
    
    $("#search-button").on("click", function() {

        // event.preventDefault();
        
        var city = $("#citySearch").val();
        cityForecast(city);
        query3(city);

    });

    function cityForecast(city) {

        var query1 = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=91aa2321b032e187ef5be60685d90a73";

            $.ajax({
                url: query1,
                method: 'GET',
            }).then(function(response1) {
                console.log(response1);

                if (cityHistory.indexOf(city) === -1) {
                    cityHistory.push(city)
                    localStorage.setItem("History: ", JSON.stringify(cityHistory))
                    display()
                }
            var cityName = response1.name;
            var cityTemp = response1.main.temp;
            var cityFahrenheit = (((cityTemp * 1.8) - 459.67).toFixed(1));
            var cityHumidity = response1.main.humidity;
            var cityWind = response1.wind.speed;
            var cityLat = response1.coord.lat;
                console.log('cityLat:', cityLat)
            var cityLon = response1.coord.lon;
                console.log('cityLon:', cityLon)

            $("#cityName").html('<h4>' + cityName + " " + moment().format('LL'));
            $("#cityTemp").html('<h4>' + "Temperature(F): " + cityFahrenheit);
            $("#cityHumidity").html('<h4>' + "Humidity: " + cityHumidity + "%");
            $("#cityWind").html('<h4>' + "Wind Speed: " + cityWind + " MPH");

            var query2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=91aa2321b032e187ef5be60685d90a73";

            $.ajax({
                url: query2,
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
    
        function query3(city) {

            var query3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=91aa2321b032e187ef5be60685d90a73";

            $.ajax({
                url: query3,
                method: 'GET'
            }).then(function (response3) {
                console.log('response3:', response3);
                var cityForecast = "";
      for (let i = 0; i < response3.list.length; i = i + 8) {
        citForecast += `<div class="col forecast bg-primary text-white ml-3 mb-3 rounded">
        ${response3.list[i].dt_txt}
        <p>Temperature: ${response3.list[i].main.temp}</p>
        <img src="https://openweathermap.org/img/wn/${response3.list[i].weather[0].icon}@2x.png" />
        <p>Wind Speed :${response3.list[i].wind.speed}</p>
        <p>Description: ${response3.list[i].weather[0].description}</p>
        </div> `
            }

            $("#cityForecast").html(cityForecast);
            });
        }

        function display() {
        var historyCity = JSON.parse(localStorage.getITem("History")) || []
        var html = ""
        for (var q = 0; q < historyCity.length; q++) {
            html += '<button class="previousCity">${historyCity[q]}</button>'

        }
        console.log(html);
        $("#searchHistory").html(html);
        }

    $('#history').on('click', ".previuosCity", function () {
        var cityInput = $(this).text()
        console.log(cityInput);
        cityForecast(cityInput);
        query3(cityInput);   
      });

      display()

      $("#clearHistory").on("click", function () {
          historyCity.splice(0)
          localStorage.setItem("history", JSON.stringify(historyCity))
          display()
      })