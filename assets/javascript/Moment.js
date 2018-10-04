  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAsJk_huQ39c3TTbasv7qmyX953VUCg95U",
    authDomain: "trainschedule-c8a5b.firebaseapp.com",
    databaseURL: "https://trainschedule-c8a5b.firebaseio.com",
    projectId: "trainschedule-c8a5b",
    storageBucket: "trainschedule-c8a5b.appspot.com",
    messagingSenderId: "978922231281"
  };
  firebase.initializeApp(config);

  // creating a variable to access firebase from
  var database = firebase.database();

  $("#submit").on("click", function(event){
    // prevent the form from submitting
    event.preventDefault();

    // get the input values
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var frequency = parseInt($("#frequency").val().trim());

    // save the input values to the database
    database.ref().set({
      name: trainName,
      destination: destination,
      "Starting Time": trainTime,
      frequency: frequency
    });

    // clear all of the text boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
  });

  // create a firebase event for adding a train schedule to the database
  // also add a row in the html once the user adds to the database
  database.ref().on("child_added", function(snapshot) {
    // store all data in a variable
    var trainName = snapshot.val().name,
        destination = snapshot.val().destination,
        trainTime = snapshot.val()["Starting Time"],
        frequency = snapshot.val().frequency;
    
    // create a new row and append the data to it
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(trainTime),
      $("<td>").text(frequency)
    );

    // append the new row to the table
    $("#train-schedule > tbody").append(newRow);
  });
