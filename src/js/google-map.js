/*function initMap() {     
	var coordMapOfficeOne = {lat: 55.6640, lng: 37.7514},
		zoomMapOfficeOne = 17,
		styleMapOfficeOne = [{"featureType": "landscape.man_made","elementType": "geometry.fill","stylers": [{"color": "#ebe3cd"}]},{"featureType": "landscape.man_made","elementType": "geometry.stroke","stylers": [{"color": "#dfd2ae"}]},{"featureType": "poi","elementType": "geometry.fill","stylers": [{"color": "#dfd2ae"}]},{"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#a79893"}]},{"featureType": "road","elementType": "geometry.fill","stylers": [{"color": "#f5f1e6"}]},{"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#f5f1e6"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#f5f1e6"}]},{"featureType": "road.local","elementType": "labels.text.fill","stylers": [{"color": "#a79893"}]}],
		optionsMapOfficeOne = {
			zoom: zoomMapOfficeOne,
			center: new google.maps.LatLng(coordMapOfficeOne.lat, coordMapOfficeOne.lng),
			//scrollwheel: false,	
			//styles: styleMapOfficeOne
		},
		idOfficeOne = document.getElementById('map-google'),
		mapOfficeOne = new google.maps.Map(idOfficeOne, optionsMapOfficeOne),		
		iconOfficeOne = '/wp-content/themes/azbn7theme/img/default/map-placeholder.png',
		//iconOfficeOne = '/img/default/map-placeholder.png',
		//iconOfficeOne = '/img/default/map-placeholder.png',
		
	    iconCoordOfficeOne = {lat: 55.663960, lng: 37.751826}, 
	    OfficeOne = new google.maps.Marker({
			position: iconCoordOfficeOne,
			map: mapOfficeOne,
			icon: iconOfficeOne
		});

        $(window).on('resize', function() {
			google.maps.event.trigger(mapOfficeOne, "resize");
			mapOfficeOne.setCenter(coordMapOfficeOne);
        });
};
$(function () {
	$(document.body).on('shown.bs.modal', '.modal', {}, function(event){
		event.preventDefault();
		$(window).trigger('resize');      
	});  
});*/


function initMap() {
 	
	
	var map_container_div_id = 'map-google';
	var cont = $('#' + map_container_div_id);
	
	var CMS__TPL_PATH = '/wp-content/themes/azbn7theme';
	
	if(cont.length) {
		
		var map_data = JSON.parse(cont.attr('data-map') || '{}');
		
		var coordMapOfficeOne = map_data.center;
		/*if(screenJS.device()) {			
			coordMapOfficeOne = map_data.center;
		};
		if(screenJS.pc()) {	
			coordMapOfficeOne = map_data.center;
		};*/
		var zoomMapOfficeOne = map_data.zoom,
			styleMapOfficeOne = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"lightness":"0"},{"saturation":"4"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#c7dae2"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7bc3e4"}]}],
			optionsMapOfficeOne = {
				zoom: zoomMapOfficeOne, 
				center: new google.maps.LatLng(coordMapOfficeOne[0], coordMapOfficeOne[1]),
			},
			idOfficeOne = document.getElementById(map_container_div_id),
			mapOfficeOne = new google.maps.Map(idOfficeOne, optionsMapOfficeOne),	
			//iconOfficeOne = '/wp-content/themes/azbn7theme/img/default/map-placeholder.png';
			//iconOfficeOne = '/img/default/icon-map.png',
			iconOfficeOne = {		
				path: "M25,0C12.1,0.5,1.4,10.5,0.1,23.4C-0.1,26,0,28.5,0.5,30.9l0,0c0,0,0,0.3,0.2,0.8c0.4,1.8,1,3.5,1.7,5.1 C5,43,11,53.3,24.5,64.5c0.8,0.7,2,0.7,2.9,0C40.9,53.3,46.9,43,49.5,36.8c0.8-1.6,1.3-3.3,1.7-5.1c0.1-0.5,0.2-0.8,0.2-0.8l0,0 c0.3-1.6,0.5-3.2,0.5-4.9C51.9,11.3,39.7-0.5,25,0z M25.9,38.8c-7,0-12.6-5.6-12.6-12.6S19,13.6,25.9,13.6s12.6,5.6,12.6,12.6 		S32.9,38.8,25.9,38.8z", 
				fillColor: '#a3ba02',
				strokeColor: '#000000',
				fillOpacity: 1,
				anchor: new google.maps.Point(26,65),
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
						title: map_data.placemarks_title,
    					//animation: google.maps.Animation.DROP
					});
				}
			}
			if(map_data.placemarks2.length) {
				for(var i = 0; i < map_data.placemarks2.length; i++) {
					var iconCoordOfficeOne2 = {lat: map_data.placemarks2[i].coord[0],  lng: map_data.placemarks2[i].coord[1]}, 
					OfficeOne = new google.maps.Marker({
						position: iconCoordOfficeOne2,
						map: mapOfficeOne,
						icon: iconOfficeOne,
						title: map_data.placemarks2_title,
					});
				}
			}
			
			
			//$(window).on('resize', function() {
			//	google.maps.event.trigger(mapOfficeOne, "resize");
			//	mapOfficeOne.setCenter(OfficeOne);
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