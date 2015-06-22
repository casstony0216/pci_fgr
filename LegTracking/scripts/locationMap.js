//information on tihs https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingRequests
//we need to geocode this address, before displaying it,

function locatonMapInitialize(e) {
    var position = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 10,
      center: position,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(
        document.getElementById("map_canvas"),
        myOptions);
 
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title:"This is the place."
    });  
 
    var contentString = 'Hello <strong>World</strong>!';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
 
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

}


  //initialize the google map
    function buildMap(e) {
        var myOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var mapElement = $("#map_canvas");
        var container = e.view.content;

        var map = new google.maps.Map(mapElement[0], myOptions);
    }







