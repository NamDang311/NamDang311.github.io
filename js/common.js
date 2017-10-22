var database = firebase.database();
var path = "/0"
var ref = database.ref(path).child("outware");

var nameArr = [];
ref.on("value", function (snapshot) {
    nameArr.push(snapshot.val());
    rungame();
}, function (error) {
    console.log("Error: " + error.code);
});

function rungame() {
    pickRandom();
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var setCountryTitle;
var randomNumb;

function pickRandom() {
    randomNumb = getRndInteger(0, 10);
    setCountryTitle = nameArr[0][randomNumb].country.toString()
    $('#country-title').html(setCountryTitle);
}


//Next round
var correctTune = new Audio('../sound/correct.mp3');
var incorrectTune = new Audio('../sound/correct.wav');
$(".correct").on("click touchstart", function (event) {
    correctTune.play();
})
$(".incorrect").on("click touchstart", function (event) {
    incorrectTune.play();
})


function changeTitle() {
    randomNumb = getRndInteger(0, 10);
    setCountryTitle = nameArr[0][randomNumb].country.toString()
    TweenLite.to("#country-title", 1, {
        scrambleText: setCountryTitle
    });
}

var Shuffle = window.Shuffle;

var myShuffle = new Shuffle(document.querySelector('.my-shuffle'), {
  itemSelector: '.selection-blocks',
  sizer: '.my-sizer-element',
  buffer: 1,
});