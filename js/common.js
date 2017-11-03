let currentRound = 1;
var blueScore = 0;
var redScore = 0;
var blueIsSelected = false,
    redIsSelected = false;

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

var readyGoText = new TimelineMax({});

function setStage() {
    playSetSound();
    readyGoText.to("#readyTitle", 0.4, {
        transform: "translateZ(0)"
    }).to("#readyTitle", 0.2, {
        opacity: 0
    }, "+=1").to("#goTitle", 0.4, {
        transform: "translateZ(0)"
    }).to("#goTitle", 0.4, {
        opacity: 0,
        onComplete: function () {
            TweenMax.to(".readyStage", 0.3, {
                autoAlpha: 0
            });
        }
    }, "+=1");
}
readyGoText.set(".readyStage", {
    perspective: 1000
}).set("#readyTitle", {
    transform: "translateZ(3700px)"
}).set("#goTitle", {
    transform: "translateZ(3700px)"
});


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
setInterval(function () {
    $grid.isotope('shuffle');
}, 1000);

//Load title
$(".country-title").html(countriesA[0]);

//1st - Load correct image
var collectionimg = ["Russia", "Australia", "India", "South%20Africa", "China", "Kenya", "Ukraine"];
var currentimgName = countriesA[currentRound].replace(" ", "%20");

function loadCorrectImg() {
    $(".correct").css("background-image", "url(../images/flags/" + currentimgName + ".png)");
}
loadCorrectImg();

//Load random images
! function loadRandomImg() {
    for (var i = 2; i < 5; i++) {
        $(".selection-blocks-" + i).css("background-image", "url(../images/flags/" + collectionimg[i] + ".png)");
    }
}();

/** Score system */


function updateScore() {
    $(".red-score").html(redScore);
    $(".blue-score").html(blueScore);
};

//Load random images -- BLUE : sideNumber = 0, RED : sideNumber = 1  
function checkSide(value, sideNumber) {
    if (value == "true") { //If click correct option
        if (sideNumber === 0) { //On blue side 
            // Add score
            blueScore++;
            updateScore();
            blueIsSelected = !blueIsSelected;
            
            //
            $(".block-area-top img").attr("src","../images/correct/#{currentRound}.gif")
            $(".block-area-top").addClass("top-half");
        } else {
            // Add score
            redScore++;
            updateScore();
            redIsSelected = !redIsSelected;
        }
    } else { //If click incorrect option
        if (sideNumber < 3) { //On blue side
//            $(".block-area").addClass("top-half");
        } else { //On red side
//            $(".block-area").addClass("bottom-half");
        }
    }
}



/** Check if team has made selection */
var roundDeclare = new TimelineMax({
    paused: true
});
TweenMax.set(".roundAnnouncement", {
    autoAlpha: 0
});
roundDeclare.to(".roundAnnouncement", 0.4, {
    autoAlpha: 1
}).from(".roundAnnouncement span", 0.2, {
    y: "-=500"
}).to(".roundAnnouncement span", 0.2, {
    y: "+=500"
}, "+=1").to(".roundAnnouncement", 0.4, {
    autoAlpha: 0
});


setInterval(function () {
    //Check if one of the selections is correct
    if (blueIsSelected || redIsSelected) {
        //
        

        //Trigger annoucement
        currentRound++;
        $(".roundAnnouncement span").html("Round " + currentRound);
        //        roundDeclare.play(0);
        setNextRound();
    }
}, 100);

function setNextRound() {
    currentimgName = countriesA[currentRound].replace(" ", "%20");
    loadCorrectImg();
    resetSelectedStatus();
}

function resetSelectedStatus() {
    blueIsSelected = false;
    redIsSelected = false;
}
