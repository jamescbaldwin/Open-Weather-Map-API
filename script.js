    //click funciton for search button (call search button by its "id")
    $("#search-button").on("click", function() {
        //event "preventDefault" prevents data from flashing
        event.preventDefault();
        
        //create variables to build url - 
        //1 variable gets value of what is typed in search bar
        var city = $("#citySearch").val();
        //2nd variable builds complete url with base url + city variable + apiKey
        var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=91aa2321b032e187ef5be60685d90a73";
        //ajax function to retrieve a data response, given what was searched
            $.ajax({
                url: queryUrl,
                method: 'GET',
            }).then(function(response) {
                //log response of city searched
                console.log(response);
                var cityName = response.name;
                var cityTemp = response.main.temp;
                var cityFahrenheit = (cityTemp * 1.8) - 459.67
                var cityHumidity = response.main.humidity;
                var cityWind = response.wind.speed;

                $("#cityName").html('<h4>' + cityName + '' + moment().format('L'));
                $("#cityTemp").html('<h4>' + "Temperature(F): " + cityFahrenheit);
                $("#cityHumidity").html('<h4>' + "Humidity: " + cityHumidity);
                $("#cityWind").html('<h4>' + "Wind Speed: " + cityWind + "MPH");
            });

        });