const NPS_URL= 'https://api.nps.gov/api/v1/parks';

const NPS_KEY= 'fmTMScXlzTUKcMdt89Fmnyhl81mqm2xxxZH8Yppq';

const HIKING_URL= 'https://www.hikingproject.com/data/get-trails';

const HIKING_KEY= '200327700-d3521df4d4b42d0d77bf4b4d0ba20637';

const WEATHER_URL= 'https://api.openweathermap.org/data/2.5/weather';

const WEATHER_KEY= '771f6d345b25dcb9c8322ae68cb87192'

function getParkData(parkName){
  query = {
    q: parkName,
    api_key: NPS_KEY,
  }
  return $.getJSON(NPS_URL,query);    
}


function createParkObject(parks){
  let parkObject=''; 
  parks.data.forEach(function(park,index){
    if (park.fullName.toLowerCase().includes(query.q.toLowerCase())) {
      parkObject=park;
    }
  });
  return (parkObject); 
};


function renderParkInfo(parkObject){
  $('main').append(
    `<section class="park">
    <h2>${parkObject.fullName}</h2>
    </section>`)
}


function getLatLon(parkObject){
  let latLon = parkObject.latLong;
  latLon=latLon.split(',');
  return {"lat": latLon[0].trim().slice(4), 
    "lon": latLon[1].trim().slice(5)};
}


function getTrailData(weatherData){
  query={
    'lat': weatherData.coord.lat,
    'lon': weatherData.coord.lon,
    key: HIKING_KEY,
  }
  
  return $.getJSON(HIKING_URL,query)
  .then(function(results){
    results.weather= {temp: weatherData.main.temp,
      conditions: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      wind: weatherData.wind.speed,
       };
      return results;
  })
}


function renderTrailInfo(data){
  data.trails.map(function(trail,index){
    $('main').append(
      `<section class="trail" name="trail-${index+1}">
        <h2>${trail.name}</h2>
        
        <h3>Summary:</h3> 
        <p>${trail.summary}</p> 
          
        <h3>Info:</h3>
        <ul>
          <li>length: ${trail.length} miles</li>
          <li>High: ${trail.high} ft.</li>
          <li>Low: ${trail.low} ft.</li>
          <li>Difficulty: ${trail.difficulty}</li>
          <li>Status: ${trail.conditionStatus}</li>
          <li>Status: ${trail.conditionDetails}</li>
        </ul>
      </section>`
    );
  });
}


function getWeatherData(latLon){
  query={
    'lat': latLon.lat,
    'lon': latLon.lon,
    appid: WEATHER_KEY,
    units: 'imperial',
  }

  return $.getJSON(WEATHER_URL,query);
 
}


function handleUserSearch(){
  $('button').on('click',function(event){
    event.preventDefault();
    let parkName= $('input').val();
    getParkData(parkName)
      .then(createParkObject)
      .done(renderParkInfo)
      .then(getLatLon)
      .then(getWeatherData)
      .done(data=>console.log(data))
      .then(getTrailData)
      .done(data=>console.log(data))
      .done(renderTrailInfo)
      .done(data=>console.log(data));
  });
}


$(handleUserSearch);