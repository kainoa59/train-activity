var config = {
    apiKey: "AIzaSyD_jrQCQ-efAtIkPoup_zagOzYBEPSHKws",
    authDomain: "cdc-demo-2019.firebaseapp.com",
    databaseURL: "https://cdc-demo-2019.firebaseio.com",
    projectId: "cdc-demo-2019",
    storageBucket: "cdc-demo-2019.appspot.com",
    messagingSenderId: "133449894214"
};

firebase.initializeApp(config);

var database = firebase.database();

var currentTime = moment(new Date());
currentTime = moment().format('HH:mm');

$(document).ready(function () {

    $("#submit-train-info").on("click", function (event) {
        event.preventDefault();

        // console.log("hello");

        var newName = $("#input-train-name").val().trim();
        var newDestination = $("#input-train-destination").val().trim();
        var newTime = moment($("#input-train-time").val(), 'HH:mm A').format("HH:mm A");
        var newFrequency = $("#input-train-frequency").val().trim();

        var newTrainInfo = {
            name: newName,
            destination: newDestination,
            time: newTime,
            frequency: newFrequency
        };

        database.ref().push(newTrainInfo);

        // console.log(newTrainInfo.name);

        $("#input-train-name").val("");
        $("#input-train-destination").val("");
        $("#input-train-time").val("");
        $("#input-train-frequency").val("");
    });
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        var newName = childSnapshot.val().name;
        var newDestination = childSnapshot.val().destination;
        var newTime = childSnapshot.val().time;
        var newFrequency = childSnapshot.val().frequency;

        var trainTimeConverted = moment(childSnapshot.val().time, "HH:mm");
        console.log(trainTimeConverted);

        var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
        console.log("time remaining: " + timeDifference);

        var timeRemainder = timeDifference % newFrequency;
        console.log(timeRemainder);

        var minutesAway = newFrequency - timeRemainder;
        console.log(minutesAway);

        var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
        console.log(nextArrival);

        //moment.js stuff
        var newRow = $("<tr>").append(
            $("<td>").text(newName),
            $("<td>").text(newDestination),
            $("<td>").text(newFrequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minutesAway),
        );

        $("#train-table > tbody").append(newRow);
    });
    //  stuff
});