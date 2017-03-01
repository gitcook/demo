$(document).ready(function(){
    getCity();
});

function getCity() {
    $.get("http://ipinfo.io", function(response) {
        var city = response.city + ',' + response.country;
        getWeather(city);
    }, "jsonp");
}

function getWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=metric&appid=7ea4b733a8554206728d866c1a819088';
    $.get(url, 'jsonp', function(res){
        var weather = res.weather[0].main;
        var temC = Math.round(res.main.temp);
        var temF = Math.round((temC * 9)/5 + 32);
        $('#city').html(res.name + ', ' + res.sys.country);
        $('#temp').html(temC + ' ℃');
        $('#weather').html(weather);
        var icon;
        switch (weather) {
            case 'Clear':
                icon = 'wi-day-sunny';
                break;

            case 'Clouds':
                icon = 'wi-day-cloudy';
                break;

            case 'Rain':
                icon = 'wi-day-rain';
                break;

            case 'Snow':
                icon = 'wi-day-snow';
                break;
        };
        $('.icon i:first').addClass(icon);
    });
}