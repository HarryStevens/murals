var map;
var layer_0;
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

function changeMap_0() {
	var whereClause;
	var searchString = document.getElementById('search-string_0').value.replace(/'/g, "\\'");
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
}

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function() {
	$(function() {
		var availableTags = ["Big L", "Big Pun", "Gil Scott-Heron", "Jam Master Jay", "MCA", "Notorious B.I.G.", "Ol' Dirty Bastard"];
		$("#search-string_0").autocomplete({
			source : availableTags
		});
	});
});
