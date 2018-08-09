const NPS_URL= 'https://api.nps.gov/api/v1/parks';

const NPS_KEY= 'fmTMScXlzTUKcMdt89Fmnyhl81mqm2xxxZH8Yppq';

const HIKING_URL= 'https://www.hikingproject.com/data/get-trails';

const HIKING_KEY= '200327700-d3521df4d4b42d0d77bf4b4d0ba20637';

// const WEATHER_URL= 'https://samples.openweathermap.org/data/2.5/weather';

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
  return latLon;
}


function getTrailData(latLon){
  lat= latLon[0].trim().slice(4);
  lon= latLon[1].trim().slice(5);
  
  query={
    'lat': lat,
    'lon': lon,
    key: HIKING_KEY,
  }
  
  return $.getJSON(HIKING_URL,query);
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


// function getWeatherData(LatLon)


function handleUserSearch(){
  $('button').on('click',function(event){
    event.preventDefault();
    let parkName= $('input').val();
    getParkData(parkName)
      .then(createParkObject)
      .done(renderParkInfo)
      .done(data=>console.log(data))
      .then(getLatLon)
      .done(data=>console.log(data))
      .then(getTrailData)
      .done(renderTrailInfo)
      .done(data=>console.log(data));
  });
}


$(handleUserSearch)