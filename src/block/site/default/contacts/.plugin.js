function initMap() {  
  var map_container_div_id = 'map-google';
  var cont = $('#' + map_container_div_id);  
  var CMS__TPL_PATH = '/wp-content/themes/azbn7theme';  
  if(cont.length) {    
    var map_data = JSON.parse(cont.attr('data-map') || '{}');    
    var coordMapOfficeOne = map_data.center;
    var zoomMapOfficeOne = map_data.zoom,
        styleMapOfficeOne = [{"stylers":[{"hue":"#2c3e50"},{"saturation":250}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":50},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]}],
        optionsMapOfficeOne = {
          zoom: zoomMapOfficeOne, 
          center: new google.maps.LatLng(coordMapOfficeOne[0], coordMapOfficeOne[1]), 
          styles: styleMapOfficeOne
        }, 
      idOfficeOne = document.getElementById(map_container_div_id),
      mapOfficeOne = new google.maps.Map(idOfficeOne, optionsMapOfficeOne), 
      //iconOfficeOne = '/wp-content/themes/azbn7theme/img/default/map-placeholder.png';
      //iconOfficeOne = '/img/default/icon-map.png',
      iconOfficeOne = {   
        //path: "M25,0C12.1,0.5,1.4,10.5,0.1,23.4C-0.1,26,0,28.5,0.5,30.9l0,0c0,0,0,0.3,0.2,0.8c0.4,1.8,1,3.5,1.7,5.1 C5,43,11,53.3,24.5,64.5c0.8,0.7,2,0.7,2.9,0C40.9,53.3,46.9,43,49.5,36.8c0.8-1.6,1.3-3.3,1.7-5.1c0.1-0.5,0.2-0.8,0.2-0.8l0,0 c0.3-1.6,0.5-3.2,0.5-4.9C51.9,11.3,39.7-0.5,25,0z M25.9,38.8c-7,0-12.6-5.6-12.6-12.6S19,13.6,25.9,13.6s12.6,5.6,12.6,12.6     S32.9,38.8,25.9,38.8z", 
        path: "M24,64c0,0,23.8-27,23.8-40.2C47.8,10.7,37.2,0,24,0S0.2,10.7,0.2,23.8S24,64,24,64z M24,7.4 c9.1,0,16.5,7.4,16.5,16.5S33.1,40.3,24,40.3c-9.1,0-16.5-7.4-16.5-16.5S14.9,7.4,24,7.4z", 
        fillColor: '#0a4587',
        strokeColor: '#000000',
        fillOpacity: 1,
        //anchor: new google.maps.Point(26,65),
        anchor: new google.maps.Point(24,64),
        strokeWeight: 0,
        scale: 1,
      }; 
      if(map_data.placemarks.length) {
        for(var i = 0; i < map_data.placemarks.length; i++) {
          var iconCoordOfficeOne = {lat: map_data.placemarks[i].coord[0],  lng: map_data.placemarks[i].coord[1]}, 
          OfficeOne = new google.maps.Marker({
            position: iconCoordOfficeOne,
            map: mapOfficeOne,
            icon: iconOfficeOne,
            title: map_data.placemarks[i].title,
              //animation: google.maps.Animation.DROP
          });
        }
      }

      /*if(map_data.placemarks2.length) {
        for(var i = 0; i < map_data.placemarks2.length; i++) {
          var iconCoordOfficeOne2 = {lat: map_data.placemarks2[i].coord[0],  lng: map_data.placemarks2[i].coord[1]}, 
          OfficeOne = new google.maps.Marker({
            position: iconCoordOfficeOne2,
            map: mapOfficeOne,
            icon: iconOfficeOne,
            title: map_data.placemarks2_title,
          });
        }
      }*/
      
      
      //$(window).on('resize', function() {
      //  google.maps.event.trigger(mapOfficeOne, "resize");
      //  mapOfficeOne.setCenter(OfficeOne);
      //});
      
      $(document.body).on('click.azbn7', '.azbn__office__map__set-center-btn', null, function(event){
        event.preventDefault();
        var btn = $(this);
        var coord = btn.attr('data-coord');
        var coord_arr = coord.split(',');
        console.dir(coord_arr);
        mapOfficeOne.setCenter({
          lat : parseFloat((coord_arr[0] || '').trim()),
          lng : parseFloat((coord_arr[1] || '').trim()),
        });
        
      });
      
    
  }
  
}; 
$(function () {
  $(document.body).on('shown.bs.modal', '.modal', {}, function(event){
    event.preventDefault();
    $(window).trigger('resize');    
  });  
});