Drivers = new Mongo.Collection("drivers");

DriverSchema = new SimpleSchema({
  owner: {
    type: String,
  },
  
  driver: {
    type: String,
  }
})