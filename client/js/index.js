//render Google Map 
var SearchData = new ReactiveVar(null);
var Map = null;
var Markers = [];

var createMap = function() {
  var lat =  51.518875;
  var lng = -0.149895;
  var latlng = new google.maps.LatLng(lat, lng);
  var options = {
    zoom: 14,
    streetViewControl: true,
    scaleControl: false,
    draggable: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: latlng
  };

  Map = new google.maps.Map(document.getElementById("searchMapContainer"),
                            options);
};

//render marker to map
var addMarkersToMap = function(events) {
  if (!Map) {
    console.log("Map not initialized!");
    return;
  }

// Remove existing markers
  Markers.forEach(function(marker) {
    marker.setMap(null);
  });
  Markers = [];

  var center = true;
  events.forEach(function(event) {
    var lat = event.location.lat;
    var lng = event.location.lng;

    if (center) {
      Map.setCenter(new google.maps.LatLng(lat, lng));
      center = false;
    }

    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: Map
    });
    marker.addListener("click", function() {
      console.log("clicked on ", event);
    });
    Markers.push(marker);
  });
};


Template.index.onRendered(function() {
  this.autorun(function() {
    var searchData = SearchData.get();
    if (searchData) {
        //in publishers /server
      Meteor.subscribe("eventSearch", searchData);
    }
  });

    //render map
  this.autorun(function() {
    if (GoogleMaps.loaded()) {
      createMap();
    }
  });

    //render existing events
  this.autorun(function() {
    var Event = Events.find({});
    if (Event.count() > 0) {
      addMarkersToMap(Event.fetch());
    }
  });
});

Template.index.helpers({
  eventSchema: function() {
    return Schemas.Event;
  },
  searchSchema: function() {
    return Schemas.Search;
  },
  events: function() {
    return Events.find({});
  }
});

AutoForm.addHooks("searchEvent", {
  onSubmit: function(insertDoc, updateDoc, currentDoc) {
    check(insertDoc, Schemas.Search);
    SearchData.set(insertDoc);
    this.done();
    return false;
  },

  onSuccess: function(formType, result) {
  },

  onError: function(formType, error) {
    console.log("error", formType, error);
  }
});