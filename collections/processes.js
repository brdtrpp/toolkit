Processes = new Mongo.Collection("processes");

if (Meteor.isServer) {
 Meteor.publish('processes', function() {
    return Processes.find({"owner.owner": this.userId});
  });
}

// Define the schema for processes
ProcessSchema = new SimpleSchema({
  owner: {
    type: OwnerSchema,
    autoform: {
      omit: true,
    }
  },

  name: {
    type: String,
    label: "What is the name of the process under review?",
    max: 75
  },

  app: {
    type: [Object],
    label: "What applications are in this Process?",
    minCount: 1,
    maxCount: 4
    },
  "app.$.name": {
    type: String,
  },

//   app: {
//     type: [Object],
//     max: 75,
//     minCount: 1,
//     maxCount: 10
//   },

//   "app.$.name": {
//     type: String,
//     label: "What applications are in this Process?",
//   }

// Removed Driver From the process collection.
//   driver: {
//     type: String,
//     label: "Who pays for the application under review?",
//     autoform: {
//       type: "select",
//       options: function () {
//         var a = [];

//         if (Meteor.isServer) {
//           var ds = Drivers.find({'owner.owner': this.userId}).fetch();
//           _.map(ds, function(i){
//             a.push(i.driver);
//           })
//         } else {
//           var dc = Drivers.find({'owner.owner': Meteor.userId()}).fetch();
//           _.map(dc, function(i){
//             a.push(i.driver);
//           })
//         }
//         return _.map(a, function (c) {

//           return {label: c, value: c};

//         });
//       }
//     }
//   },

  timeperiod: {
    type: Number,
    label: "What is the time period under review? (in minutes)",
  },
  
  downtime: {
    type: Number,
    label: "What is the downtime cost for this activity? (in $/hr)"
  }

//   currentName: {
//     type: String,
//     label: "What is the name of the CURRENT STATE item (product or service) under review?"
//   },

//   futureName: {
//     type: FutureSchema,
//     label: "Future States",
//     maxCount: 3,
//     minCount: 1
//   },

});

Processes.attachSchema(ProcessSchema);