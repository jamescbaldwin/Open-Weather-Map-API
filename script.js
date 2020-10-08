//  var alert = alert("HAS script.js linked????")

// $(document).ready(function() {

    $("#search-button").click(function() {
        
        
        var apiKey = "91aa2321b032e187ef5be60685d90a73"
        console.log('apiKey:', apiKey)
        var city = $("#city").val();
        var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "units=imperial&appid=91aa2321b032e187ef5be60685d90a73"
            console.log(queryUrl);

        if (city != ''){
            $.ajax({
                queryUrl: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "units=imperial&appid=91aa2321b032e187ef5be60685d90a73",
                method: 'GET',
            }).then(function(response) {
                event.preventDefault();
                console.log(response);
            })

        }else{
            $("#error").html("Must input city name");
        }


    });
     function display(data) {
        return
     }
// });