Meteor.methods({
  addEvent: function(event) {
    check(event, Schemas.Event);
    Events.insert(event);
  }
});