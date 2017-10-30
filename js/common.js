/** Apply Bigtext to titles */

/** Database -> Set base for set 1/2 */
var countries = ["Australia", "Brazil", "China", "Germany", "Great Britain", "India", "Iran", "Kenya", "New Zealand", "Pakistan", "Poland", "Russia", "South Africa", "Ukraine", "Vietnam"];
var countriesShuffle = _.shuffle(countries);
var countriesA = countriesShuffle.splice(0, 5);
var countriesB = countriesShuffle.splice(6, 12);

/** Opening Splash Screen */

$(document).ready(function () {
    TweenMax.to(".blockScreen", 0.3, {
        autoAlpha: 0,
        delay: "1"
    });
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
    TweenMax.to(".splashScreen", 0.2, {
        autoAlpha: 0,
        delay: 1
    }, 1);
    TweenMax.to(".guide", 1, {
        autoAlpha: 0,
        delay: 5,
        onComplete: setStage
    }, 1);
});

function setStage() {
    playSetSound();
}


var animation = bodymovin.loadAnimation({
    container: document.getElementById('loadingContainer'), // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'data/loading.json' // the path to the animation json
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


//****Shuffle randomly
//$grid.isotope('shuffle');

//Load title
$(".country-title").html(countriesA[0]);

//1st - Load correct image
var collectionimg = ["russia", "australia", "india", "south%20africa", "china"];
var currentimg = countriesA[0].replace(" ", "%20");
var correctsrc = "url(../images/flags/" + currentimg + ".png)";
$(".correct").css("background-image", correctsrc);

//Load random images
function loadRandomImg() {
    for (var i = 0; i < $(".selection-blocks").length; i++) {
        $(".selection-blocks:eq(" + i + "):not(.correct)").css("background-image", "url(../images/flags/" + collectionimg[i] + ".png)");
    }
}
loadRandomImg();
