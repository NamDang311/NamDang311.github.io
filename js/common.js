/** Apply Bigtext to titles */

/** Database -> Set base for set 1/2 */
var countries = ["Australia", "Brazil", "China", "Germany", "Great Britain", "India", "Iran", "Kenya", "New Zealand", "Pakistan", "Poland", "Russia", "South Africa", "Ukraine", "Vietnam"];
var countriesShuffle = _.shuffle(countries);
var countriesA = countriesShuffle.splice(0, 5);
var countriesB = countriesShuffle.splice(6, 12);

/** Check if video is loaded and remove block screen */
window.addEventListener('load', function () {
    var video = document.querySelector('#bgvid');
    var preloader = document.querySelector('.blockScreen');

    function checkLoad() {
        if (video.readyState === 4) {
            TweenMax.to(".blockScreen", 0.3, {
                autoAlpha: 0,
                delay: "1"
            });
        } else {
            setTimeout(checkLoad, 100);
        }
    }
    checkLoad();
}, false);

/** Opening Splash Screen */
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
//setInterval(function () {
//    $grid.isotope('shuffle');;
//}, 1000);

//Load title
$(".country-title").html(countriesA[0]);

//1st - Load correct image
var collectionimg = ["russia", "australia", "india", "south%20africa", "china", "kenya", "ukraine"];
var currentimgName = countriesA[0].replace(" ", "%20");
var correctsrc = "url(../images/flags/" + currentimgName + ".png)";

! function loadCorrectImg() {
    $(".correct").css("background-image", correctsrc);
};


//Load random images
! function loadRandomImg() {
    for (var i = 2; i < 5; i++) {
        $(".selection-blocks-" + i).css("background-image", "url(../images/flags/" + collectionimg[i] + ".png)");
    }
}();

/** Score system */
var blueScore, redScore = 0;

function updateScore() {
    $(".red-score").html(redScore);
    $(".blue-score").html(blueScore);
};

//Load random images -- BLUE : sideNumber = 0, RED : sideNumber = 1  
function checkSide(value, sideNumber) {
    if (value == "true") { //If click correct option
        if (sideNumber == 0) { //On blue side 
            blueScore++;
            updateScore();
            blueIsSelected = !blueIsSelected;
        } else {
            redScore++;
            updateScore();
            redIsSelected = !redIsSelected;
        }
    } else { //If click incorrect option
        if (sideNumber < 3) { //On blue side
            $(".block-area").addClass("top-half");
        } else { //On red side

        }
    }
}

/** Check if team has made selection */
var blueIsSelected = false,
    redIsSelected = false;

setInterval(function () {
    if (blueIsSelected && redIsSelected) { //If both are selected
        resetSelectedStatus()

    }
}, 100);

function resetSelectedStatus() {
    blueIsSelected = false;
    redIsSelected = false;
}
