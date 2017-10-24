var database = firebase.database();
var path = "/0";
var ref = database.ref(path).child("outware");

var nameArr = [];
ref.on("value", function (snapshot) {
    nameArr.push(snapshot.val());
    rungame();
}, function (error) {
    console.log("Error: " + error.code);
});

//Opening
$(document).ready(function () {
    TweenMax.fromTo("#introTypo", 1, {
        scale: 0,
        y: "+=300px"
    }, {
        scale: 1,
        y: "-=300px",
        delay: "2",
        ease: Power4.easeOut
    });
});

//Start the game
$("#startButton").on("click touchstart", function (event) {
    TweenMax.staggerTo(".splashScreen, .splashScreen *", 1, {
        y: "-=100%"
    }, 1);
});

var $grid = $('.grid').isotope({
    getSortData: {
        number: '.number'
    },
     layoutMode: 'fitRows',
    sortBy: 'random'
});
$grid.isotope('updateSortData').isotope();

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
    setCountryTitle = nameArr[0][randomNumb].country.toString();
    $('#country-title').html(setCountryTitle);
}


//****Next round trigger
var correctTune = new Audio('../sound/correct.mp3');
var incorrectTune = new Audio('../sound/correct.wav');

//Shuffle randomly
setInterval(function () {
    $grid.isotope('updateSortData').isotope();
    $('.grid').isotope({
        sortBy: 'random'
    });
}, 1000);

$(".correct").on("click touchstart", function (event) {
    correctTune.play();
});
$(".incorrect").on("click touchstart", function (event) {
    incorrectTune.play();
});


function changeTitle() {
    randomNumb = getRndInteger(0, 10);
    setCountryTitle = nameArr[0][randomNumb].country.toString();
    TweenLite.to("#country-title", 1, {
        scrambleText: setCountryTitle
    });
}
