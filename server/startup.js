
Meteor.startup(function() {
  Events._ensureIndex({"location.geometry": "2dsphere"});
});