const NPS_URL= 'https://api.nps.gov/api/v1/parks';

const NPS_KEY= 'fmTMScXlzTUKcMdt89Fmnyhl81mqm2xxxZH8Yppq';

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