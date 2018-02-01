var map;
var service;
var infowindow;

function geoLocationSuccess(pos) {
  var crd = pos.coords;

  var location = {lat: crd.latitude, lng: crd.longitude};

  searcher(crd.latitude, crd.longitude);

  // var map = new google.maps.Map(document.getElementById('map'), {
  //         zoom: 8,
  //         center: location
  //  });

  // var marker = new google.maps.Marker({
  //         position: location,
  //         map: map
  //       });

  // console.log('Your current position is:');
  // console.log(`Latitude : ${crd.latitude}`);
  // console.log(`Longitude: ${crd.longitude}`);
  // console.log(`More or less ${crd.accuracy} meters.`);
};

function geoLocationError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};
var options = {
  enableHighAccuracy: true,
  maximumAge: 0
};
navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError, options);

function searcher(lat, long) {
  var pyrmont = new google.maps.LatLng(lat, long);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 10
    });

  var request = {
    location: pyrmont,
    radius: '50000',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, searcherSuccess);
}

function searcherSuccess(results, status) {
  console.log(results);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);

    }
  }
}

function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }



