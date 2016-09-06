Drivers = new Mongo.Collection("drivers");

if (Meteor.isServer) {
  Meteor.publish('drivers', function() {
    return Drivers.find({owner: this.userId});
  })
}

DriverSchema = new SimpleSchema({
  owner: {
    type: String,
    autoValue: function() {
      console.log(this.userId);
      return this.userId;
    },
    autoform: {
      omit: true,
    }
  },

  driver: {
    type: String,
  }
});

Drivers.attachSchema(DriverSchema);