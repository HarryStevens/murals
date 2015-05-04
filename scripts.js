$(document).ready(function() {

	//Global variables
	var map;
	var layer_0;

	//Clear the search box
	function clearSearch() {
		$("#searchbox").val('');
	}

	clearSearch();

	//Initialize the Google map according to various parameters
	function initialize() {
		map = new google.maps.Map(document.getElementById('map-canvas'), {
			center : new google.maps.LatLng(40.752460019996185, -73.80477261210937),
			zoom : 10
		});
		var style = [{
			featureType : 'all',
			elementType : 'all',
			stylers : [{
				saturation : -48
			}]
		}, {
			featureType : 'road.highway',
			elementType : 'all',
			stylers : [{
				visibility : 'off'
			}]
		}, {
			featureType : 'road.arterial',
			elementType : 'all',
			stylers : [{
				visibility : 'off'
			}]
		}];
		var styledMapType = new google.maps.StyledMapType(style, {
			map : map,
			name : 'Styled Map'
		});
		map.mapTypes.set('map-style', styledMapType);
		map.setMapTypeId('map-style');
		layer_0 = new google.maps.FusionTablesLayer({
			query : {
				select : "col6",
				from : "1WnTHwF8RViAHJRqXuwqkJYiWqDPmeCIuvXlU3NYS"
			},
			map : map,
			styleId : 2,
			templateId : 2
		});
	}

	//Change the map based on the search input
	function changeMap() {
		var whereClause;
		var searchString = document.getElementById('searchbox').value.replace(/'/g, "\\'");
		console.log(searchString);
		if (searchString != '--Select--') {
			whereClause = "'Rapper' CONTAINS IGNORING CASE '" + searchString + "'";
		}
		layer_0.setOptions({
			query : {
				select : "col6",
				from : "1WnTHwF8RViAHJRqXuwqkJYiWqDPmeCIuvXlU3NYS",
				where : whereClause
			}
		});
		clearSearch();
	}

	//Load the Google Maps
	google.maps.event.addDomListener(window, 'load', initialize);

	//When search box is focused, do stuff
	if ($("#searchbox").focus()){
		//When enter key is pressed, do stuff
		$(document).keypress(function(e) {
			if (e.which == 13) {
				//Change the map based on the search query
				changeMap();
			}
		});		
	}
	
	//When "search" button is clicked, change the map
	$(".search > input[type='button']").click(function() {
		changeMap();
	});

	//jQuery UI for autofill
	$(function() {

		$.getJSON("https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20*%20FROM%201WnTHwF8RViAHJRqXuwqkJYiWqDPmeCIuvXlU3NYS&key=AIzaSyB-QJux9WIJmey5IJYzPImNzg-xP1gpvU8", function(data) {
			
			//create array with names of rappers to plug into autocomplete tags
			var rows = data.rows;
			var names = [];
			for ( i = 0; i < rows.length; i++) {
				var currRow = rows[i];
				var currName = currRow[0];
				names.push(currName);
			}
			//de-duplicate names array
			var uNames = [];
			$.each(names, function(i, el) {
				if ($.inArray(el, uNames) === -1)
					uNames.push(el);
			});
			
			//sorted, de-duplicated names
			var sNames = uNames.sort();
			
			$("#searchbox").autocomplete({
				source : sNames
			});
		});

	});

});
