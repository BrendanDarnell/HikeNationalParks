const NPS_URL= 'https://api.nps.gov/api/v1/parks';

const NPS_KEY= 'fmTMScXlzTUKcMdt89Fmnyhl81mqm2xxxZH8Yppq';

const HIKING_URL= 'https://www.hikingproject.com/data/get-trails';

const HIKING_KEY= '200327700-d3521df4d4b42d0d77bf4b4d0ba20637';


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


function getLatLon(parkObject){
  let latLon = parkObject.latLong;
  latLon=latLon.split(',');
  return latLon;
}


function getTrailData(latLon){
  lat= latLon[0].trim().slice(4);
  lon= latLon[1].trim().slice(5);
  console.log(latLon);
  console.log(lat);
  console.log(lon);
}


function getTrailData(latLon){
  lat= latLon[0].trim().slice(4);
  lon= latLon[1].trim().slice(5);
  console.log(latLon);
  console.log(lat);
  console.log(lon); 
  query={
    'lat': lat,
    'lon': lon,
    key: HIKING_KEY,
  }
  
  return $.getJSON(HIKING_URL,query);
}


function handleUserSearch(){
  $('button').on('click',function(event){
    event.preventDefault();
    getParkData('acadia')
      .then(createParkObject)
      .then(getLatLon)
      .then(getTrailData)
      .done(data=>{console.log(data);});
  });
}


$(handleUserSearch)