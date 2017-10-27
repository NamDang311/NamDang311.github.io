/** Database -> Set base for set 1/2 */
var countries = ["Australia","Brazil","China","Germany","Great Britain","India","Iran","Kenya","New Zealand","Pakistan","Poland","Russia","South Africa","Ukraine","Vietnam"];
var countriesShuffle = _.shuffle(countries);
var countriesA= countriesShuffle.splice(0,5);
var countriesB= countriesShuffle.splice(6,12);

//Opening Splash
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


$("#startButton").on("click touchstart", function (event) {
    TweenMax.staggerTo(".splashScreen, .splashScreen *", 1, {
        y: "-=100%"
    }, 1);
});

//Set grid
var $grid = $('.grid').isotope({
    getSortData: {
        number: '.number'
    },
    layoutMode: 'fitRows',
    fitRows: {
        gutter: 10
    },
    transitionDuration: '0.2s',
    sortBy: 'random'
});
$grid.isotope('updateSortData').isotope();


//Play sound when when select
var correctTune = new Audio('../sound/correct.mp3');
var incorrectTune = new Audio('../sound/correct.wav');

$(".correct").on("click touchstart", function (event) {
    correctTune.play();
});
$(".incorrect").on("click touchstart", function (event) {
    incorrectTune.play();
});

//****Shuffle randomly
//$grid.isotope('shuffle');

//Load title
$("#country-title").html(countriesA[0]);



//1st - Load correct image
var collectionimg = ["russia","australia","india","south%20africa","china"];
var currentimg = countriesA[0].replace(" ", "%20");
var correctsrc = "url(../images/flags/" + currentimg + ".png)";
$(".correct").css("background-image", correctsrc);
//Load random images
function loadRandomImg (){
for (var i = 0; i < $(".selection-blocks").length ; i++) {
    $(".selection-blocks:eq("+ i +"):not(.correct)").css("background-image", "url(../images/flags/" + collectionimg[i] + ".png)");
}
}
loadRandomImg();