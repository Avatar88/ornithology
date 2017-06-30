// JavaScript Document
function Cargar(){
	
	mapboxgl.accessToken = 'pk.eyJ1IjoiNHY0dDRyIiwiYSI6ImNqM3VybGlxdjAxMGczM3IzNWowb2pxZ3IifQ.D28R36MvyhdUPJiWM8lfRw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-74,5],
    zoom: 5.5
});

$.getJSON("https://ebird.org/ws1.1/data/obs/region/recent?r=CO&fmt=json",{},function(respuesta)
	   {
	var estructura=[];	
		
		
		for (var i in respuesta)
		{
			
			estructura.push({
							"type": "Feature",
							"properties": {
								"description": "<h1><strong>Información Avistamiento</strong></h1><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a>"+
								" :<ul class=\"list-group\">"+
  							    	"<li class=\"list-group-item\">Nombre científico : "+respuesta[i].sciName+"</li>"+
								"<li class=\"list-group-item\">Nombre común : "+respuesta[i].comName+"</li>"+
								
  									"<li class=\"list-group-item\">localización: "+respuesta[i].locName+"</li>"+
  									"<li class=\"list-group-item\">Fecha y Hora Observación: "+respuesta[i].obsDt+"</li>"+
								"<li class=\"list-group-item\">Cantidad: "+respuesta[i].howMany+"</li>"+
								"<li class=\"list-group-item\">Longitud: "+respuesta[i].lng+"</li>"+
								"<li class=\"list-group-item\">latitud: "+respuesta[i].lat+"</li>"+
								"</ul> "+
								"</p><button class=\"btn\" >Ir</button>",
								"icon": "star"
							},
							"geometry": {
								"type": "Point",
								"coordinates": [respuesta[i].lng, respuesta[i].lat]
							}
						
							});
		}	
	// holaaa otro comentario 
	map.on('load', function () {
		// Add a layer showing the places.
		map.addLayer({
			"id": "places",
			"type": "symbol",
			"source": {
				"type": "geojson",
				"data": {
					"type": "FeatureCollection",
					"features": estructura
				}
			},
			"layout": {
				"icon-image": "{icon}-15",
				"icon-allow-overlap": true
			}
		});

		// When a click event occurs on a feature in the places layer, open a popup at the
		// location of the feature, with description HTML from its properties.
		map.on('click', 'places', function (e) {
			new mapboxgl.Popup()
				.setLngLat(e.features[0].geometry.coordinates)
				.setHTML(e.features[0].properties.description)
			    
				.addTo(map);
		});

		// Change the cursor to a pointer when the mouse is over the places layer.
		map.on('mouseenter', 'places', function () {
			map.getCanvas().style.cursor = 'pointer';
		});

		// Change it back to a pointer when it leaves.
		map.on('mouseleave', 'places', function () {
			map.getCanvas().style.cursor = '';
		});
	});
	
				
		
		});
	
	
	
}