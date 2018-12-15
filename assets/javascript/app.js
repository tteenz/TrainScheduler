var config = {
  apiKey: "AIzaSyAJ0mgxNzMUcrk3EXHlVvEbAiClNDgvww0",
  authDomain: "trainscheduler-222820.firebaseapp.com",
  databaseURL: "https://trainscheduler-222820.firebaseio.com/",
  projectId: "trainscheduler-222820",
  storageBucket: "trainscheduler-222820.appspot.com",
  messagingSenderId: "1059702952538"
};
firebase.initializeApp(config);

var database = firebase.database();

var currentTime = moment().format();

console.log("Current Time: " + currentTime);

// Button for adding new Train
$("#add-train").on("click", function (event) {
  event.preventDefault();

  // Grab user input
  var trainName = $("#train-name").val().trim();
  var trainDes = $("#destination").val().trim();
  var trainTime = $("#first-train").val().trim();
  var trainFreq = $("#frequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    des: trainDes,
    time: trainTime,
    freq: trainFreq
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.des);
  console.log(newTrain.time);
  console.log(newTrain.freq);

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var nameTrain = childSnapshot.val().name;
  var desTrain = childSnapshot.val().des;
  var timeTrain = childSnapshot.val().time;
  var freqTrain = childSnapshot.val().freq;

  var newTime = moment(timeTrain, "HH:mm");

  var timeDifference = moment().diff(moment(newTime), "minutes");
  console.log(timeDifference);

  var frequencyMinutes = childSnapshot.val().freq;
  console.log("Frequency Minutes: " + frequencyMinutes);

  var minutesAway = Math.abs(timeDifference % frequencyMinutes);
  console.log("Minutes Away: " + minutesAway);

  var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
  console.log("Next Arrival: " + nextArrival);


  $("#trainScheduleTable > tbody").append("<tr><td>" + nameTrain + "</td><td>" + desTrain +
    "</td><td>" + freqTrain + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

});


