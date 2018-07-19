function initMap() {  
  var map_container_div_id = 'map-google';
  var cont = $('#' + map_container_div_id);  
  var CMS__TPL_PATH = '/wp-content/themes/azbn7theme';  
  if(cont.length) {    
    var map_data = JSON.parse(cont.attr('data-map') || '{}');    
    var coordMapOfficeOne = map_data.center;
    var zoomMapOfficeOne = map_data.zoom,
        styleMapOfficeOne = [{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#e9e5dc"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54},{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"water","elementType":"all","stylers":[{"saturation":43},{"lightness":-11},{"color":"#89cada"}]}],
        optionsMapOfficeOne = {
          zoom: zoomMapOfficeOne, 
          center: new google.maps.LatLng(coordMapOfficeOne[0], coordMapOfficeOne[1]), 
          styles: styleMapOfficeOne
        }, 
      idOfficeOne = document.getElementById(map_container_div_id),
      mapOfficeOne = new google.maps.Map(idOfficeOne, optionsMapOfficeOne),
      iconOfficeOne = {   
        path: "M24.5908 0.0162891C11.8908 0.462443 1.34026 10.3828 0.121372 23.0457C-0.127648 25.5783 0.0165219 28.0321 0.462136 30.381C0.462136 30.381 0.501455 30.6566 0.632518 31.1814C1.02571 32.9398 1.61549 34.6457 2.34944 36.2466C4.90517 42.3091 10.8161 52.4525 24.0797 63.4882C24.8923 64.1706 26.0849 64.1706 26.9106 63.4882C40.1742 52.4656 46.0851 42.3222 48.654 36.2335C49.401 34.6326 49.9777 32.9398 50.3709 31.1683C50.4889 30.6566 50.5413 30.3679 50.5413 30.3679C50.8427 28.7932 51 27.1792 51 25.5258C51 11.1176 39.0864 -0.495476 24.5908 0.0162891ZM25.4952 38.2281C18.6537 38.2281 13.1097 32.6774 13.1097 25.8276C13.1097 18.9778 18.6537 13.4271 25.4952 13.4271C32.3366 13.4271 37.8806 18.9778 37.8806 25.8276C37.8806 32.6774 32.3366 38.2281 25.4952 38.2281Z", 
        fillColor: '#C31846',
        strokeColor: '#000000',
        fillOpacity: 1,
        //anchor: new google.maps.Point(26,65),
        anchor: new google.maps.Point(25,64),
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