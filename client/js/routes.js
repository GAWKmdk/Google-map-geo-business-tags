Router.route("/", {
  name: "index",
  onBeforeAction: function() {
    if (!GoogleMaps.loaded()) {
      GoogleMaps.load({
          
          // verified by settings.json
        key: Meteor.settings.public.google_maps_key,
        
        //see Schema.js /server
        libraries: "geometry,places"
      });
    }
    this.next();
  },
  action: function() {
    this.render("index");
  }
});