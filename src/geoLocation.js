var geolat;
var geoLong;

function success(position){
    console.log(position);
    geolat = position.coords.latitude;
    geoLong = position.coords.longitude;
    
};

function error(err){
    console.warn(err);
}

let options ={
    enablehighAccuracy: true,
    timeout: 5000,
    maximunAge:0
}

function getLocationData(){
    //Navigator
    navigator.geolocation.getCurrentPosition(success,error,options)
    
}

export default getLocationData;

export { geolat, geoLong};
