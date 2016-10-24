Schemas = {};

Schemas.Address = new SimpleSchema({
  fullAddress: {
    type: String
  },
  lat: {
    type: Number,
    decimal: true
  },
  lng: {
    type: Number,
    decimal: true
  },
  geometry: {
    type: Object,
    blackbox: true
  },
  placeId: {
    type: String
  },
  street: {
    type: String,
    max: 100
  },
  city: {
    type: String,
    max: 50
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  country: {
    type: String
  }
});

Schemas.Event = new SimpleSchema({
  title: {
    type: String,
    autoform: {
      label: false,
      placeholder: "Activity Title"
    }
  },
  location: {
    type: Schemas.Address,
    autoform: {
      label: false,
      placeholder: "Address"
    }
  }
});

Schemas.Search = new SimpleSchema({
  location: {
    type: Schemas.Address,
    autoform: {
      label: false,
      placeholder: "Address"
    }
  },
  radius: {
    type: Number,
    autoform: {
      label: false,
      placeholder: "Radius (km)"
    }
  }
});

Events = new Mongo.Collection("events");

Events.attachSchema(Schemas.Event);