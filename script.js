    //click funciton for search button (call search button by its "id")
   
    var historyCity = JSON.parse(localStorage.getItem('history')) || []
    
    $("#search-button").on("click", function() {
        //event "preventDefault" prevents data from flashing
        event.preventDefault();
        
        //create variables to build url - 
        //1 variable gets value of what is typed in search bar
        var city = $("#citySearch").val();
        //saving city search to local storage
        localStorage.setItem("city: ", city);
        //2nd variable builds complete url with base url + city variable + apiKey
        var queryUrl1 = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=91aa2321b032e187ef5be60685d90a73";
        //ajax function to retrieve a data response, given what was searched
            $.ajax({
                url: queryUrl1,
                method: 'GET',
            }).then(function(response) {
                //log response of city searched
                console.log(response);
                var cityName = response.name;
                var cityTemp = response.main.temp;
                var cityFahrenheit = (((cityTemp * 1.8) - 459.67).toFixed(1));
                var cityHumidity = response.main.humidity;
                var cityWind = response.wind.speed;

                var cityLat = response.coord.lat;
                console.log('cityLat:', cityLat)

                var cityLon = response.coord.long;
                console.log('cityLon:', cityLon)

                
                $("#cityName").html('<h4>' + cityName + " " + moment().format('LL'));
                $("#cityTemp").html('<h4>' + "Temperature(F): " + cityFahrenheit);
                $("#cityHumidity").html('<h4>' + "Humidity: " + cityHumidity + "%");
                $("#cityWind").html('<h4>' + "Wind Speed: " + cityWind + "MPH");
                // $("#cityUV").html('<h4>' + "UV Index: " + )

                // $("#citySearch").val(localStorage.getItem("city"));
                // localStorage.setItem("lat", lat)
                // localStorage.setItem("lon", lon)
            
               // http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
            //  var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=91aa2321b032e187ef5be60685d90a73";

            // $.ajax({
            //     url: queryURL2,
            //     method: 'GET',
            // }).then(function(response2) {
            //     console.log(queryURL2);
            //     console.log(response2);
            // })
        });
        }); //click funciton