

$(document).ready(function () {

    const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather';



    var call =  'https://api.openweathermap.org/data/2.5/forecast?lat=33.449339&lon=-83.26209' + '&units=imperial&appid=' + apiKey;


    $.getJSON(call, function (data) {
        //console.log(data);

        var callTime = new Date(data.list[0].dt*1000);
        var currentDescription = data.list[0].weather[0].description;
        //console.log(currentDescription);
        $('#today-description').html(currentDescription.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();}));
        var currentIcon = '<img src="https://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png">';
        $('#today-icon').html(currentIcon);
        var currentTemp = Math.round(data.list[0].main.temp);
        $('#today-temp').html(currentTemp + '\xB0');



        for(var i = 1; i <=4; i++){
            var forecast = getForecast(i);
            //console.log(forecast1);

            $('#day-' + i).html('<b>' + forecast.day + '</b>');
            $('#day-' + i + '-description').html(forecast.overview);
            $('#day-' + i + '-icon').html(forecast.pic);
            $('#day-' + i + '-high').append(forecast.high + '\xB0');
            $('#day-' + i + '-low').append(forecast.low + '\xB0');

        }




    function getForecast(daysOut){
        var maxTemp = -1000;
        var minTemp = 1000;
        var numberOfForecasts = 0;
        var totalRain = 0;
        var totalClouds = 0;
        var description;
        var weatherIcon ='<img src="https://openweathermap.org/img/w/';
        var descriptionIcon = {sunny: '01d.png', mostlySunny: '01d.png', partlyCloudy: '02d.png', cloudy: '04d.png',
            lightRain: '10d.png', rain: '10d.png', heavyRain: '09d.png'};
        var dayOfWeek;

        for(var i = 0; i < data.list.length; i++){
            var forecastTime = new Date(data.list[i].dt*1000);
            //console.log(data.list[i].rain['3h']);
            console.log(data.list[i]);
            //console.log(forcastTime.getDate());
            //console.log(callTime.getDate() + 1);
            if((forecastTime.getDate() === callTime.getDate() + daysOut)  && (forecastTime.getHours() <= 16) &&
                (forecastTime.getHours() >= 6)){
                //console.log(data.list[i].main.temp);
                dayOfWeek = forecastTime.getDay();
                numberOfForecasts++;
                if(data.list[i].main.temp > maxTemp){
                    maxTemp = data.list[i].main.temp
                }
                if(data.list[i].main.temp < minTemp){
                    minTemp = data.list[i].main.temp
                }
                if(data.list[i].rain !== undefined){
                    totalRain += data.list[i].rain['3h'];
                }
                totalClouds += data.list[i].clouds.all;


            }
        }

        maxTemp = Math.round(maxTemp);
        minTemp = Math.round(minTemp);

        if(totalRain/numberOfForecasts/3 >= 7.874){
            description = 'Heavy Rain';
        }else if(totalRain/numberOfForecasts/3 < 7.874 && totalRain/numberOfForecasts/3 >= 2.794){
            description = 'Rain';
        }else if((totalRain/numberOfForecasts/3 < 2.794 && totalRain/numberOfForecasts/3 >= 1.061)){
            description = 'Light Rain';
        }else if(totalClouds/numberOfForecasts >= 60){
            description = 'Cloudy';
        }else if(totalClouds/numberOfForecasts < 60 && totalClouds/numberOfForecasts >= 40){
            description = 'Partly Cloudy';
        }else if(totalClouds/numberOfForecasts < 40 && totalClouds/numberOfForecasts >= 20) {
            description = 'Mostly Sunny';
        }else{
            description = 'Sunny'
        }

        switch (description){
            case 'Heavy Rain':
                weatherIcon += descriptionIcon.heavyRain + '">';
                break;
            case 'Rain':
                weatherIcon += descriptionIcon.rain + '">';
                break;
            case 'Light Rain':
                weatherIcon += descriptionIcon.lightRain + '">';
                break;
            case 'Cloudy':
                weatherIcon += descriptionIcon.cloudy + '">';
                break;
            case 'Partly Cloudy':
                weatherIcon += descriptionIcon.partlyCloudy + '">';
                break;
            case 'Mostly Sunny':
                weatherIcon += descriptionIcon.mostlySunny + '">';
                break;
            case 'Sunny':
                weatherIcon += descriptionIcon.sunny + '">';
                break;

        }

        switch (dayOfWeek){
            case 0:
                dayOfWeek = 'Sunday';
                break;
            case 1:
                dayOfWeek = 'Monday';
                break;
            case 2:
                dayOfWeek = 'Tuesday';
                break;
            case 3:
                dayOfWeek = 'Wednesday';
                break;
            case 4:
                dayOfWeek = 'Thursday';
                break;
            case 5:
                dayOfWeek = 'Friday';
                break;
            case 6:
                dayOfWeek = 'Saturday';
                break;
        }

        var forecast = {high: maxTemp, low: minTemp, overview: description, pic:weatherIcon, day: dayOfWeek};

        return forecast;


    }

    });





});



