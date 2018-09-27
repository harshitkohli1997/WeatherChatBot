 const dictionary = require('./dictionary');
 const moment = require('moment');

let getFeel = temp => {
if(temp < 5){
    return "shivering cold";
} else if(temp >=5 && temp < 15){
    return "pretty cold";
} else if(temp >= 15 && temp < 25){
    return "moderately cold";
} else if(temp >=25 && temp < 32){
    return "quite warm";
} else if(temp >=32 && temp < 40){
    return "very hot";
} else {
    return "super hot";
}
}

let getPrefix = (conditionCode , tense = 'present') => {
    let findPrefix = dictionary[tense].find(item => {
        if(item.codes.indexOf(Number(conditionCode)) >-1 ){
            return true;
        }
    });
    return findPrefix.prefix || "";
}

let currentWeather = response => {
  if(response.query.results){
      let resp = response.query.results.channel;
      let location = `${resp.location.city}, ${resp.location.country}`;

      let {text,temp,code} = resp.item.condition;

      return `Right now, ${getPrefix(code)} ${text.toLowerCase()} in ${location}, it is ${getFeel(Number(temp))} at ${temp} degrees Celsius.`
  }
  else {
      return "I don't seem to know anything about this place...Sorry"
  }
}

let getDate = day => {
let datstr = day.toLowerCase().trim();
switch(datstr){
    case 'tomorrow':
       return moment().add(1,'d').format("DD MM YYYY");
    case 'day after tomorrow':
       return moment().add(2,'d').format("DD MM YYYY");
    default:
       return moment.format("DD MM YYYY");
}
}

let forecastWeather = (response,data) => {
    if(response.query.results){
      let parseDate = getDate(data.time);
      let resp = response.query.results.channel;
      let getForecast = resp.item.forecast.filter(item => {
          return item.date == parseDate;
      })[0];
      let location = `${resp.location.city}, ${resp.location.country}`;
      let regEx = new RegExp(data.weather, "i");
      let testConditions = regEx.test(getForecast.text)
      return `${testConditions ?'Yes':'No'} ,${getPrefix(getForecast.code,'future')} ${getForecast.text} ${data.time} in ${location}`;
    } else {
        return "I don't seem to know anything about this place...Sorry"
    }
}
module.exports = {
    currentWeather,
    forecastWeather
}